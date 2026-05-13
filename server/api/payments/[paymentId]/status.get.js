import { useDatabase } from '../../../utils/database.js'
import {
  getOrderPayment,
  updateOrderPaymentStatus
} from '../../../utils/order-payment.js'
import {
  getPaymentStatusFromVtbQr,
  getVtbDynamicQrStatus
} from '../../../utils/vtb-payment.js'

export default defineEventHandler(async (event) => {
  const paymentId = Number(getRouterParam(event, 'paymentId'))

  if (!Number.isInteger(paymentId) || paymentId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid payment id',
      message: 'Некорректный идентификатор платежа'
    })
  }

  const database = useDatabase()
  const payment = await getOrderPayment(database, paymentId)

  if (!payment) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Payment not found',
      message: 'Платеж не найден'
    })
  }

  if (payment.status === 'paid' || payment.status === 'failed' || payment.status === 'cancelled') {
    return { payment }
  }

  if (payment.expires_at && new Date(payment.expires_at).getTime() < Date.now()) {
    await updateOrderPaymentStatus(database, paymentId, 'expired')
    return {
      payment: {
        ...payment,
        status: 'expired'
      }
    }
  }

  if (!payment.vtb_md_order || !payment.vtb_qr_id) {
    return { payment }
  }

  const statusResponse = await getVtbDynamicQrStatus({
    mdOrder: payment.vtb_md_order,
    qrId: payment.vtb_qr_id
  })

  const status = getPaymentStatusFromVtbQr(
    statusResponse.qrStatus ?? statusResponse.status,
    statusResponse.transactionState
  )

  await updateOrderPaymentStatus(database, paymentId, status, {
    vtb_qr_status: statusResponse.qrStatus ?? statusResponse.status ?? null,
    vtb_transaction_state: statusResponse.transactionState ?? null,
    vtb_status_response: JSON.stringify(statusResponse)
  })

  const updatedPayment = await getOrderPayment(database, paymentId)

  return {
    payment: updatedPayment
  }
})

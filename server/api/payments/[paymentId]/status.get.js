import { useDatabase } from '../../../utils/database.js'
import {
  getSiteOrderPaymentState,
  updateSiteOrderPaymentStatus
} from '../../../utils/order-payment.js'
import { refreshVtbPaymentStatus } from '../../../utils/vtb-payment-status.js'

export default defineEventHandler(async (event) => {
  // Public route remains /payments/:paymentId for backwards compatibility;
  // internally the id is site_orders.id because payment state is stored on the order.
  const siteOrderId = Number(getRouterParam(event, 'paymentId'))

  if (!Number.isInteger(siteOrderId) || siteOrderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order id',
      message: 'Некорректный идентификатор заказа'
    })
  }

  const database = useDatabase()
  const siteOrder = await getSiteOrderPaymentState(database, siteOrderId)

  if (!siteOrder) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Order not found',
      message: 'Заказ не найден'
    })
  }

  const paymentStatus = siteOrder.payment_status ?? siteOrder.status

  if (['paid', 'failed', 'expired', 'cancelled'].includes(paymentStatus)) {
    return { payment: { ...siteOrder, status: paymentStatus } }
  }

  if (siteOrder.expires_at && new Date(siteOrder.expires_at).getTime() < Date.now()) {
    await updateSiteOrderPaymentStatus(database, siteOrderId, 'expired')
    return {
      payment: {
        ...siteOrder,
        payment_status: 'expired',
        status: 'expired'
      }
    }
  }

  const { siteOrder: refreshedSiteOrder } = await refreshVtbPaymentStatus(database, siteOrder)

  return { payment: refreshedSiteOrder }
})

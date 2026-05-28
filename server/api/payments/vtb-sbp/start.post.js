import { useDatabase } from '../../../utils/database.js'
import {
  createPendingSiteOrderPayment,
  saveVtbQr,
  saveVtbRegistration
} from '../../../utils/order-payment.js'
import {
  createSiteOrder,
  createSiteOrderNumber,
  getOwnedSiteOrder,
  getSiteOrderItemsAmount,
  normalizeSiteOrderItems
} from '../../../utils/site-orders.js'
import {
  getVtbDynamicQr,
  getVtbQrExpiresAt,
  registerVtbOrder
} from '../../../utils/vtb-payment.js'

async function resolveOrder(event, database, body, items, amount) {
  const orderId = Number(body?.orderId)

  if (!Number.isInteger(orderId) || orderId <= 0) {
    const order = await createSiteOrder(database, event, { items, amount })
    return order.id
  }

  const order = await getOwnedSiteOrder(database, event, orderId, body?.accessToken)
  return Number(order.id)
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const items = normalizeSiteOrderItems(body?.items)
  const bodyAmount = Number(body?.amount)
  const itemsAmount = getSiteOrderItemsAmount(items)
  const amount = Number.isFinite(bodyAmount) && bodyAmount > 0 ? Math.round(bodyAmount * 100) / 100 : itemsAmount

  if (!amount) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid payment amount',
      message: 'Не передана сумма оплаты'
    })
  }

  const database = useDatabase()
  const orderId = await resolveOrder(event, database, body, items, amount)
  const existingOrder = await database
    .selectFrom('site_orders')
    .select(['order_number'])
    .where('id', '=', orderId)
    .executeTakeFirst()
  const orderNumber = existingOrder?.order_number || createSiteOrderNumber(orderId)
  const paymentId = await createPendingSiteOrderPayment(database, {
    siteOrderId: orderId,
    orderNumber,
    amount
  })

  try {
    const amountMinor = Math.round(amount * 100)
    const registration = await registerVtbOrder({
      orderNumber,
      amountMinor,
      description: `Заказ Indigo #${orderId}`,
      ip: getRequestIP(event, { xForwardedFor: true })
    })

    await saveVtbRegistration(database, paymentId, registration)

    const qr = await getVtbDynamicQr(registration.orderId)
    const expiresAt = getVtbQrExpiresAt()
    await saveVtbQr(database, paymentId, qr, expiresAt)

    return {
      payment: {
        id: paymentId,
        orderId,
        orderNumber,
        status: 'pending',
        amount,
        expiresAt,
        qrId: qr.qrId,
        qrPayload: qr.payload ?? null,
        qrImage: qr.renderedQr ?? null
      }
    }
  } catch (error) {
    await database
      .updateTable('site_orders')
      .set({
        payment_status: 'failed',
        payload: JSON.stringify({
          errorCode: error?.data?.errorCode ? String(error.data.errorCode) : null,
          errorMessage: error?.data?.errorMessage || error?.message || 'VTB payment failed'
        }),
        updated_at: new Date()
      })
      .where('id', '=', paymentId)
      .execute()

    throw error
  }
})

import { useDatabase } from '../../../utils/database.js'
import {
  markSiteOrderPaymentPending,
  mergeVtbPaymentPayload,
  saveSiteOrderVtbQr
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
  getVtbQrExpiresAt
} from '../../../utils/vtb-sbp-api.js'

async function resolveOrder(event, database, body, items, amount) {
  const orderId = Number(body?.orderId)

  if (!Number.isInteger(orderId) || orderId <= 0) {
    const order = await createSiteOrder(database, event, {
      items,
      amount,
      checkout: body?.checkout
    })
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
    .selectAll()
    .where('id', '=', orderId)
    .executeTakeFirst()
  const orderNumber = existingOrder?.order_number || createSiteOrderNumber(orderId)
  const siteOrderId = await markSiteOrderPaymentPending(database, {
    siteOrderId: orderId,
    orderNumber,
    amount
  })

  try {
    const description = `Заказ Indigo #${orderId}`
    const qr = await getVtbDynamicQr(orderNumber, { amount, description })
    const expiresAt = getVtbQrExpiresAt()
    await saveSiteOrderVtbQr(database, siteOrderId, qr, expiresAt)

    return {
      payment: {
        id: siteOrderId,
        orderId,
        orderNumber,
        status: 'pending',
        amount,
        expiresAt,
        qrId: qr.qrId,
        qrPayload: qr.payload ?? null,
        qrImage: qr.renderedQr ?? null,
        testAmountOverride: qr.testAmountOverride ?? null
      }
    }
  } catch (error) {
    const order = await database
      .selectFrom('site_orders')
      .select(['payload'])
      .where('id', '=', siteOrderId)
      .executeTakeFirst()

    await database
      .updateTable('site_orders')
      .set({
        payment_status: 'failed',
        payload: mergeVtbPaymentPayload(order?.payload, {
          lastError: {
            errorCode: error?.data?.errorCode ? String(error.data.errorCode) : null,
            errorMessage: error?.data?.errorMessage || error?.message || 'VTB payment failed',
            response: error?.data || null
          }
        }),
        updated_at: new Date()
      })
      .where('id', '=', siteOrderId)
      .execute()

    throw error
  }
})

import { useDatabase } from '../../../utils/database.js'
import {
  createPendingOrderPayment,
  saveVtbQr,
  saveVtbRegistration
} from '../../../utils/order-payment.js'
import {
  getVtbDynamicQr,
  getVtbQrExpiresAt,
  registerVtbOrder
} from '../../../utils/vtb-payment.js'

const MAX_ITEMS = 100

function normalizeAmount(value) {
  const amount = Number(value)

  if (!Number.isFinite(amount) || amount <= 0) {
    return null
  }

  return Math.round(amount * 100) / 100
}

function normalizeItems(items) {
  if (!Array.isArray(items)) {
    return []
  }

  return items.slice(0, MAX_ITEMS).map((item, index) => {
    const quantity = Math.max(1, Number.parseInt(item?.quantity, 10) || 1)
    const unitPrice = normalizeAmount(item?.unitPrice) ?? 0
    const designPrice = normalizeAmount(item?.designPrice) ?? 0
    const name = String(item?.name || `Позиция ${index + 1}`).slice(0, 255)
    const description = String(item?.description || '').trim()

    return {
      name,
      description,
      quantity,
      unitPrice,
      designPrice,
      total: Math.round((unitPrice * quantity + designPrice) * 100) / 100
    }
  }).filter(item => item.total > 0)
}

function getItemsAmount(items) {
  return Math.round(items.reduce((sum, item) => sum + item.total, 0) * 100) / 100
}

function createOrderNumber(orderId) {
  const suffix = Date.now().toString(36).toUpperCase()
  return `SITE-${orderId}-${suffix}`.slice(0, 36)
}

async function createSiteOrder(database, items, amount) {
  const now = new Date()
  const result = await database
    .insertInto('orders')
    .values({
      name: 'Заказ с сайта',
      sum: String(amount),
      status: '0',
      info: JSON.stringify({ source: 'site', items }),
      created_at: now,
      updated_at: now
    })
    .executeTakeFirst()

  const orderId = Number(result.insertId)

  if (!orderId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Order was not created',
      message: 'Не удалось создать заказ'
    })
  }

  if (items.length) {
    await database
      .insertInto('order_positions')
      .values(items.map(item => ({
        order_id: orderId,
        name: [item.name, item.description].filter(Boolean).join(', ').slice(0, 255),
        status: 0,
        created_at: now,
        updated_at: now
      })))
      .execute()
  }

  return orderId
}

async function resolveOrder(database, body, items, amount) {
  const orderId = Number(body?.orderId)

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return createSiteOrder(database, items, amount)
  }

  const order = await database
    .selectFrom('orders')
    .select(['id', 'sum'])
    .where('id', '=', orderId)
    .executeTakeFirst()

  if (!order) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Order not found',
      message: 'Заказ не найден'
    })
  }

  return Number(order.id)
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const items = normalizeItems(body?.items)
  const bodyAmount = normalizeAmount(body?.amount)
  const itemsAmount = getItemsAmount(items)
  const amount = bodyAmount ?? itemsAmount

  if (!amount) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid payment amount',
      message: 'Не передана сумма оплаты'
    })
  }

  const database = useDatabase()
  const orderId = await resolveOrder(database, body, items, amount)
  const orderNumber = createOrderNumber(orderId)
  const paymentId = await createPendingOrderPayment(database, {
    orderId,
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
      .updateTable('order_payments')
      .set({
        status: 'failed',
        vtb_error_code: error?.data?.errorCode ? String(error.data.errorCode) : null,
        vtb_error_message: error?.data?.errorMessage || error?.message || 'VTB payment failed',
        updated_at: new Date()
      })
      .where('id', '=', paymentId)
      .execute()

    throw error
  }
})

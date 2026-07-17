import {
  createVtbRefund,
  getVtbPaymentDetails,
  getVtbRefundDetails,
  getVtbOrder
} from './vtb-sbp-api.js'

const COMPLETED_REFUND_STATUSES = new Set(['COMPLETED', 'CONFIRMED', 'RECONCILED', 'REFUNDED', 'SUCCESS', 'SUCCEEDED'])
const FAILED_REFUND_STATUSES = new Set(['FAILED', 'DECLINED', 'REJECTED', 'CANCELLED', 'CANCELED'])
const RESERVED_REFUND_STATUSES = ['sending', 'pending', 'completed']

function roundMoney(value) {
  return Math.round(Number(value) * 100) / 100
}

function parseJson(value) {
  if (!value) return {}
  if (typeof value === 'object') return value

  try {
    return JSON.parse(value) || {}
  } catch {
    return {}
  }
}

function getRefundStatus(refund) {
  return refund?.status?.value || refund?.status || refund?.state?.value || refund?.state || ''
}

export function normalizeVtbRefundStatus(status) {
  const normalized = String(status || '').toUpperCase()

  if (COMPLETED_REFUND_STATUSES.has(normalized)) return 'completed'
  if (FAILED_REFUND_STATUSES.has(normalized)) return 'failed'
  return 'pending'
}

function createRefundId() {
  return `REF-${crypto.randomUUID()}`
}

async function reserveRefund(database, order, { attemptId, refundId, paymentId, amount, currency, refundableAmount }) {
  return database.transaction().execute(async (trx) => {
    const lockedOrder = await trx
      .selectFrom('site_orders')
      .select(['id', 'payment_status'])
      .where('id', '=', order.id)
      .forUpdate()
      .executeTakeFirst()

    if (lockedOrder?.payment_status !== 'paid') {
      throw createError({
        statusCode: 409,
        statusMessage: 'Order is not paid',
        message: 'Возврат доступен только для оплаченного заказа'
      })
    }

    const reserved = await trx
      .selectFrom('site_order_refunds')
      .select(({ fn }) => fn.coalesce(fn.sum('amount'), 0).as('amount'))
      .where('site_order_id', '=', order.id)
      .where('status', 'in', RESERVED_REFUND_STATUSES)
      .executeTakeFirst()
    const reservedAmount = roundMoney(reserved?.amount || 0)

    if (roundMoney(reservedAmount + amount) > refundableAmount) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Refund amount exceeds payment',
        message: `Доступно к возврату ${roundMoney(refundableAmount - reservedAmount).toFixed(2)} RUB`
      })
    }

    const result = await trx
      .insertInto('site_order_refunds')
      .values({
        site_order_id: order.id,
        payment_attempt_id: attemptId,
        refund_id: refundId,
        vtb_payment_id: paymentId,
        amount,
        currency,
        status: 'sending',
        requested_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      })
      .executeTakeFirst()

    return Number(result.insertId)
  })
}

export async function requestSiteOrderRefund(database, order, requestedAmount, requestedRefundId = '') {
  if (order?.payment_status !== 'paid') {
    throw createError({
      statusCode: 409,
      statusMessage: 'Order is not paid',
      message: 'Возврат доступен только для оплаченного заказа'
    })
  }

  const paymentAttempt = await database
    .selectFrom('site_order_payment_attempts')
    .selectAll()
    .where('site_order_id', '=', Number(order.id))
    .where('status', '=', 'paid')
    .orderBy('paid_at', 'desc')
    .orderBy('id', 'desc')
    .executeTakeFirst()

  if (!paymentAttempt?.bank_order_id) {
    throw createError({
      statusCode: 409,
      statusMessage: 'VTB payment attempt is missing',
      message: 'У заказа отсутствует подтверждённая попытка оплаты ВТБ'
    })
  }

  const amount = roundMoney(requestedAmount)
  if (!Number.isFinite(amount) || amount <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid refund amount',
      message: 'Сумма возврата должна быть больше нуля'
    })
  }

  const orderData = await getVtbOrder(paymentAttempt.bank_order_id)
  const payment = getVtbPaymentDetails(orderData)
  const payload = parseJson(order.payload)
  const paymentId = payment.paymentId || String(paymentAttempt.payment_id || order.vtb_payment_id || '').trim()
  const refundableAmount = roundMoney(
    payment.amount
    || paymentAttempt.charged_amount
    || payload?.payment?.vtb?.chargedAmount
    || 0
  )
  const currency = String(payment.currency || order.currency || 'RUB').toUpperCase()

  if (!paymentId || !refundableAmount) {
    throw createError({
      statusCode: 409,
      statusMessage: 'VTB payment is missing',
      message: 'ВТБ не вернул paymentId или сумму платежа'
    })
  }

  if (amount > refundableAmount) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Refund amount exceeds payment',
      message: `Сумма возврата не может превышать ${refundableAmount.toFixed(2)} RUB`
    })
  }

  const refundId = String(requestedRefundId || '').trim() || createRefundId()
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(refundId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid refund id',
      message: 'refundId должен содержать только латинские буквы, цифры, _ или -'
    })
  }

  const existingRefund = await database
    .selectFrom('site_order_refunds')
    .selectAll()
    .where('refund_id', '=', refundId)
    .executeTakeFirst()

  if (existingRefund) {
    if (Number(existingRefund.site_order_id) === Number(order.id) && roundMoney(existingRefund.amount) === amount) {
      return existingRefund
    }

    throw createError({
      statusCode: 409,
      statusMessage: 'Refund id already exists',
      message: 'Возврат с таким refundId уже существует'
    })
  }

  const rowId = await reserveRefund(database, order, {
    attemptId: Number(paymentAttempt.id),
    refundId,
    paymentId,
    amount,
    currency,
    refundableAmount
  })

  try {
    const response = await createVtbRefund({ refundId, paymentId, amount, currency })
    const refund = response?.object && typeof response.object === 'object' ? response.object : response
    const status = normalizeVtbRefundStatus(getRefundStatus(refund))

    await database
      .updateTable('site_order_refunds')
      .set({
        status,
        provider_status: String(getRefundStatus(refund) || ''),
        completed_at: status === 'completed' ? new Date() : null,
        payload: JSON.stringify({ request: { refundId, paymentId, amount, currency }, response }),
        updated_at: new Date()
      })
      .where('id', '=', rowId)
      .execute()

    return database.selectFrom('site_order_refunds').selectAll().where('id', '=', rowId).executeTakeFirst()
  } catch (error) {
    await database
      .updateTable('site_order_refunds')
      .set({
        status: 'failed',
        payload: JSON.stringify({
          request: { refundId, paymentId, amount, currency },
          error: error?.data || { message: error?.message || 'VTB refund failed' }
        }),
        updated_at: new Date()
      })
      .where('id', '=', rowId)
      .execute()

    throw error
  }
}

export async function refreshSiteOrderRefund(database, order, refundRow) {
  const paymentAttempt = refundRow.payment_attempt_id
    ? await database
        .selectFrom('site_order_payment_attempts')
        .selectAll()
        .where('id', '=', Number(refundRow.payment_attempt_id))
        .where('site_order_id', '=', Number(order.id))
        .executeTakeFirst()
    : null
  const bankOrderId = paymentAttempt?.bank_order_id || order.order_number
  const orderData = await getVtbOrder(bankOrderId)
  const refund = getVtbRefundDetails(orderData, refundRow.refund_id)

  if (!refund) return refundRow

  const status = normalizeVtbRefundStatus(getRefundStatus(refund))
  await database
    .updateTable('site_order_refunds')
    .set({
      status,
      provider_status: String(getRefundStatus(refund) || ''),
      completed_at: status === 'completed' ? (refundRow.completed_at || new Date()) : null,
      payload: JSON.stringify({
        ...parseJson(refundRow.payload),
        lastStatus: refund,
        checkedAt: new Date().toISOString()
      }),
      updated_at: new Date()
    })
    .where('id', '=', refundRow.id)
    .execute()

  return database.selectFrom('site_order_refunds').selectAll().where('id', '=', refundRow.id).executeTakeFirst()
}

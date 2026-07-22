import { enqueueSaleFiscalReceipt } from './fiscal-receipts.js'
import { getPaymentStatusFromVtbQr } from './vtb-payment-status-mapper.js'
import {
  createVtbCardPayment,
  getVtbDynamicQr,
  getVtbDynamicQrStatus,
  getVtbPaymentExpiresAt,
  getVtbQrExpiresAt
} from './vtb-sbp-api.js'

const ACTIVE_ATTEMPT_STATUSES = ['creating', 'pending']
const TERMINAL_ATTEMPT_STATUSES = new Set(['paid', 'failed', 'expired', 'cancelled'])

function parseJson(value, fallback = {}) {
  if (!value) return fallback
  if (typeof value === 'object') return value

  try {
    return JSON.parse(value) || fallback
  } catch {
    return fallback
  }
}

function createBankOrderId(siteOrderId, method = 'sbp') {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()
  return `${method.toUpperCase()}-${siteOrderId}-${timestamp}-${random}`.slice(0, 36)
}

function getStartPayload(attempt) {
  return parseJson(attempt?.provider_payload).start || {}
}

function getChargedAmount(response, requestedAmount) {
  const amount = Number(response?.testAmountOverride?.sentAmount ?? requestedAmount)
  return Number.isFinite(amount) && amount > 0 ? Math.round(amount * 100) / 100 : null
}

function getCallbackSummary(callback) {
  const source = callback?.object && typeof callback.object === 'object' ? callback.object : callback || {}

  return {
    orderId: String(source.orderId || source.sbpParams?.requestId || '').trim() || null,
    qrId: String(source.sbpParams?.qrcId || source.qrcId || '').trim() || null,
    paymentId: String(source.paymentId || '').trim() || null,
    status: source.status?.value || source.status || null,
    receivedAt: new Date().toISOString()
  }
}

export function serializePaymentAttempt(attempt) {
  const start = getStartPayload(attempt)

  return {
    id: Number(attempt.id),
    orderId: Number(attempt.site_order_id),
    method: attempt.method,
    status: attempt.status === 'creating' ? 'pending' : attempt.status,
    amount: Number(attempt.requested_amount),
    currency: attempt.currency,
    expiresAt: attempt.expires_at || null,
    paidAt: attempt.paid_at || null,
    qrId: attempt.qr_id || null,
    qrPayload: start.payload ?? null,
    qrImage: start.renderedQr ?? null,
    payUrl: start.payUrl ?? null,
    testAmountOverride: start.testAmountOverride ?? null
  }
}

export async function getPaymentAttempt(database, attemptId) {
  return database
    .selectFrom('site_order_payment_attempts')
    .selectAll()
    .where('id', '=', Number(attemptId))
    .executeTakeFirst()
}

export async function startSbpPaymentAttempt(database, siteOrderId) {
  const orderId = Number(siteOrderId)
  const reservation = await database.transaction().execute(async (trx) => {
    const order = await trx
      .selectFrom('site_orders')
      .selectAll()
      .where('id', '=', orderId)
      .forUpdate()
      .executeTakeFirst()

    if (!order) {
      throw createError({ statusCode: 404, statusMessage: 'Order not found', message: 'Заказ не найден' })
    }

    if (order.payment_status === 'paid') {
      throw createError({ statusCode: 409, statusMessage: 'Order is already paid', message: 'Заказ уже оплачен' })
    }

    if (['cancelled', 'partially_refunded', 'refunded'].includes(order.payment_status)) {
      throw createError({ statusCode: 409, statusMessage: 'Order cannot be paid', message: 'Этот заказ нельзя оплатить' })
    }

    const activeAttempt = await trx
      .selectFrom('site_order_payment_attempts')
      .selectAll()
      .where('site_order_id', '=', orderId)
      .where('method', '=', 'sbp')
      .where('status', 'in', ACTIVE_ATTEMPT_STATUSES)
      .orderBy('id', 'desc')
      .executeTakeFirst()

    if (activeAttempt) {
      const expiresAt = activeAttempt.expires_at ? new Date(activeAttempt.expires_at).getTime() : null
      const createdAt = new Date(activeAttempt.created_at).getTime()
      const creatingIsFresh = activeAttempt.status === 'creating' && createdAt > Date.now() - 2 * 60 * 1000
      const pendingIsActive = activeAttempt.status === 'pending' && (!expiresAt || expiresAt > Date.now())

      if (creatingIsFresh || pendingIsActive) {
        return { attempt: activeAttempt, created: false, order }
      }

      await trx
        .updateTable('site_order_payment_attempts')
        .set({ status: activeAttempt.status === 'creating' ? 'failed' : 'expired', failed_at: new Date(), updated_at: new Date() })
        .where('id', '=', activeAttempt.id)
        .execute()
    }

    const amount = Math.round(Number(order.amount) * 100) / 100
    if (!Number.isFinite(amount) || amount <= 0) {
      throw createError({ statusCode: 409, statusMessage: 'Invalid order amount', message: 'У заказа отсутствует сумма к оплате' })
    }

    const now = new Date()
    const inserted = await trx
      .insertInto('site_order_payment_attempts')
      .values({
        site_order_id: orderId,
        provider: 'vtb',
        method: 'sbp',
        bank_order_id: createBankOrderId(orderId),
        requested_amount: amount,
        currency: order.currency || 'RUB',
        status: 'creating',
        created_at: now,
        updated_at: now
      })
      .executeTakeFirst()
    const attempt = await trx
      .selectFrom('site_order_payment_attempts')
      .selectAll()
      .where('id', '=', Number(inserted.insertId))
      .executeTakeFirstOrThrow()

    await trx
      .updateTable('site_orders')
      .set({
        payment_provider: 'vtb_sbp',
        payment_status: 'pending',
        expires_at: null,
        updated_at: now
      })
      .where('id', '=', orderId)
      .execute()

    return { attempt, created: true, order }
  })

  if (!reservation.created) return reservation.attempt

  const { attempt } = reservation

  try {
    const response = await getVtbDynamicQr(attempt.bank_order_id, {
      amount: Number(attempt.requested_amount),
      description: `Заказ Indigo #${orderId}`
    })
    const expiresAt = getVtbQrExpiresAt()
    const providerStatus = response.status?.value || response.status || 'CREATED'

    await database.transaction().execute(async (trx) => {
      await trx
        .updateTable('site_order_payment_attempts')
        .set({
          payment_id: response.paymentId || null,
          qr_id: response.qrId || null,
          charged_amount: getChargedAmount(response, attempt.requested_amount),
          status: 'pending',
          provider_status: String(providerStatus),
          provider_payload: JSON.stringify({ start: response }),
          expires_at: expiresAt,
          updated_at: new Date()
        })
        .where('id', '=', attempt.id)
        .where('status', '=', 'creating')
        .execute()

      await trx
        .updateTable('site_orders')
        .set({
          vtb_qr_id: response.qrId || null,
          vtb_payment_id: response.paymentId || null,
          expires_at: expiresAt,
          updated_at: new Date()
        })
        .where('id', '=', orderId)
        .execute()
    })

    return getPaymentAttempt(database, attempt.id)
  } catch (error) {
    await database
      .updateTable('site_order_payment_attempts')
      .set({
        status: 'failed',
        failed_at: new Date(),
        provider_payload: JSON.stringify({
          error: {
            code: error?.data?.errorCode ? String(error.data.errorCode) : null,
            message: error?.data?.errorMessage || error?.message || 'VTB payment failed'
          }
        }),
        updated_at: new Date()
      })
      .where('id', '=', attempt.id)
      .execute()

    await updateOrderAggregate(database, orderId, attempt.id, 'failed')
    throw error
  }
}

export async function startCardPaymentAttempt(database, siteOrderId) {
  const orderId = Number(siteOrderId)
  const reservation = await database.transaction().execute(async (trx) => {
    const order = await trx.selectFrom('site_orders').selectAll().where('id', '=', orderId).forUpdate().executeTakeFirst()

    if (!order) throw createError({ statusCode: 404, statusMessage: 'Order not found', message: 'Заказ не найден' })
    if (order.payment_status === 'paid') {
      throw createError({ statusCode: 409, statusMessage: 'Order is already paid', message: 'Заказ уже оплачен' })
    }
    if (['cancelled', 'partially_refunded', 'refunded'].includes(order.payment_status)) {
      throw createError({ statusCode: 409, statusMessage: 'Order cannot be paid', message: 'Заказ отменён или по нему оформлен возврат' })
    }

    const activeAttempt = await trx
      .selectFrom('site_order_payment_attempts')
      .selectAll()
      .where('site_order_id', '=', orderId)
      .where('method', '=', 'card')
      .where('status', 'in', ACTIVE_ATTEMPT_STATUSES)
      .orderBy('id', 'desc')
      .executeTakeFirst()

    if (activeAttempt) {
      const expiresAt = activeAttempt.expires_at ? new Date(activeAttempt.expires_at).getTime() : null
      const createdAt = new Date(activeAttempt.created_at).getTime()
      if (
        (activeAttempt.status === 'creating' && createdAt > Date.now() - 2 * 60 * 1000)
        || (activeAttempt.status === 'pending' && (!expiresAt || expiresAt > Date.now()))
      ) return { attempt: activeAttempt, created: false }

      await trx
        .updateTable('site_order_payment_attempts')
        .set({ status: activeAttempt.status === 'creating' ? 'failed' : 'expired', failed_at: new Date(), updated_at: new Date() })
        .where('id', '=', activeAttempt.id)
        .execute()
    }

    const amount = Math.round(Number(order.amount) * 100) / 100
    if (!Number.isFinite(amount) || amount <= 0) {
      throw createError({ statusCode: 409, statusMessage: 'Invalid order amount', message: 'У заказа отсутствует сумма к оплате' })
    }

    const now = new Date()
    const inserted = await trx
      .insertInto('site_order_payment_attempts')
      .values({
        site_order_id: orderId,
        provider: 'vtb',
        method: 'card',
        bank_order_id: createBankOrderId(orderId, 'card'),
        requested_amount: amount,
        currency: order.currency || 'RUB',
        status: 'creating',
        created_at: now,
        updated_at: now
      })
      .executeTakeFirst()
    const attempt = await trx
      .selectFrom('site_order_payment_attempts')
      .selectAll()
      .where('id', '=', Number(inserted.insertId))
      .executeTakeFirstOrThrow()

    await trx
      .updateTable('site_orders')
      .set({ payment_provider: 'vtb_card', payment_status: 'pending', expires_at: null, updated_at: now })
      .where('id', '=', orderId)
      .execute()

    return { attempt, created: true }
  })

  if (!reservation.created) return reservation.attempt

  const { attempt } = reservation
  try {
    const response = await createVtbCardPayment(attempt.bank_order_id, {
      amount: Number(attempt.requested_amount),
      description: `Заказ Indigo #${orderId}`
    })
    const expiresAt = getVtbPaymentExpiresAt()

    await database
      .updateTable('site_order_payment_attempts')
      .set({
        charged_amount: getChargedAmount(response, attempt.requested_amount),
        status: 'pending',
        provider_status: String(response.status || 'CREATED'),
        provider_payload: JSON.stringify({ start: response }),
        expires_at: expiresAt,
        updated_at: new Date()
      })
      .where('id', '=', attempt.id)
      .where('status', '=', 'creating')
      .execute()

    await database.updateTable('site_orders').set({ expires_at: expiresAt, updated_at: new Date() }).where('id', '=', orderId).execute()
    return getPaymentAttempt(database, attempt.id)
  } catch (error) {
    await database
      .updateTable('site_order_payment_attempts')
      .set({
        status: 'failed',
        failed_at: new Date(),
        provider_payload: JSON.stringify({ error: { message: error?.message || 'VTB card payment failed' } }),
        updated_at: new Date()
      })
      .where('id', '=', attempt.id)
      .execute()

    await updateOrderAggregate(database, orderId, attempt.id, 'failed', {}, 'card')
    throw error
  }
}

async function updateOrderAggregate(database, siteOrderId, attemptId, status, patch = {}, method = 'sbp') {
  const latestAttempt = await database
    .selectFrom('site_order_payment_attempts')
    .select(['id'])
    .where('site_order_id', '=', Number(siteOrderId))
    .orderBy('id', 'desc')
    .executeTakeFirst()

  if (status !== 'paid' && Number(latestAttempt?.id) !== Number(attemptId)) return

  const now = new Date()
  await database
    .updateTable('site_orders')
    .set({
      ...patch,
      payment_provider: method === 'card' ? 'vtb_card' : 'vtb_sbp',
      payment_status: status,
      ...(status === 'paid' ? { paid_at: now } : {}),
      updated_at: now
    })
    .where('id', '=', Number(siteOrderId))
    .where('payment_status', 'not in', ['paid', 'partially_refunded', 'refunded'])
    .execute()
}

export async function refreshSbpPaymentAttempt(database, attempt, options = {}) {
  if (!attempt || TERMINAL_ATTEMPT_STATUSES.has(attempt.status)) return attempt

  const response = await getVtbDynamicQrStatus({
    requestId: attempt.bank_order_id,
    qrId: attempt.qr_id
  })
  let status = getPaymentStatusFromVtbQr(response.qrStatus, response.transactionState)

  if (status === 'pending' && attempt.expires_at && new Date(attempt.expires_at).getTime() <= Date.now()) {
    status = 'expired'
  }

  const existingPayload = parseJson(attempt.provider_payload)
  const callbacks = options.callback
    ? [...(Array.isArray(existingPayload.callbacks) ? existingPayload.callbacks : []), getCallbackSummary(options.callback)].slice(-20)
    : existingPayload.callbacks
  const now = new Date()

  await database
    .updateTable('site_order_payment_attempts')
    .set({
      payment_id: response.paymentId || attempt.payment_id || null,
      charged_amount: response.amount || attempt.charged_amount || null,
      status,
      provider_status: String(response.transactionState || response.qrStatus || ''),
      provider_payload: JSON.stringify({
        ...existingPayload,
        lastStatus: response.raw || response,
        checkedAt: now.toISOString(),
        ...(callbacks ? { callbacks } : {})
      }),
      ...(status === 'paid' ? { paid_at: attempt.paid_at || now } : {}),
      ...(['failed', 'expired'].includes(status) ? { failed_at: attempt.failed_at || now } : {}),
      updated_at: now
    })
    .where('id', '=', attempt.id)
    .execute()

  await updateOrderAggregate(database, attempt.site_order_id, attempt.id, status, {
    vtb_qr_id: attempt.qr_id || null,
    vtb_payment_id: response.paymentId || attempt.payment_id || null,
    expires_at: attempt.expires_at || null
  }, attempt.method)

  if (status === 'paid' && attempt.status !== 'paid') {
    await enqueueSaleFiscalReceipt(database, attempt.site_order_id, attempt.id)
  }

  return getPaymentAttempt(database, attempt.id)
}

export async function findPaymentAttemptByVtbCallback(database, { bankOrderId, qrId, paymentId }) {
  const conditions = []

  if (bankOrderId) conditions.push(['bank_order_id', bankOrderId])
  if (qrId) conditions.push(['qr_id', qrId])
  if (paymentId) conditions.push(['payment_id', paymentId])
  if (!conditions.length) return null

  return database
    .selectFrom('site_order_payment_attempts')
    .selectAll()
    .where(eb => eb.or(conditions.map(([column, value]) => eb(column, '=', value))))
    .orderBy('id', 'desc')
    .executeTakeFirst()
}

import { enqueueSaleFiscalReceipt } from './fiscal-receipts.js'

const DEFAULT_PAYMENT_PROVIDER = 'vtb_sbp'

function parseSiteOrderPayload(value) {
  if (!value) return {}
  if (typeof value === 'object') return value

  try {
    return JSON.parse(value) || {}
  } catch {
    return {}
  }
}

function asObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
}

export function mergeVtbPaymentPayload(payload, patch = {}) {
  const base = parseSiteOrderPayload(payload)
  const payment = asObject(base.payment)
  const vtb = asObject(payment.vtb)
  const { callback, provider = payment.provider || DEFAULT_PAYMENT_PROVIDER, ...vtbPatch } = patch
  const callbacks = callback
    ? [...(Array.isArray(vtb.callbacks) ? vtb.callbacks : []), callback].slice(-20)
    : vtb.callbacks

  return JSON.stringify({
    ...base,
    payment: {
      ...payment,
      provider,
      vtb: {
        ...vtb,
        ...vtbPatch,
        ...(callbacks ? { callbacks } : {})
      }
    }
  })
}

export function normalizePaymentStatus(status) {
  return ['pending', 'paid', 'failed', 'expired', 'cancelled'].includes(status) ? status : 'pending'
}

export async function getSiteOrderPaymentState(database, siteOrderId) {
  return database
    .selectFrom('site_orders')
    .selectAll()
    .where('id', '=', siteOrderId)
    .executeTakeFirst()
}

export async function updateSiteOrderPaymentStatus(database, siteOrderId, status, patch = {}) {
  const normalizedStatus = normalizePaymentStatus(status)
  const now = new Date()

  const update = {
    ...patch,
    payment_status: normalizedStatus,
    updated_at: now
  }

  if (normalizedStatus === 'paid' && !patch.paid_at) {
    update.paid_at = now
  }

  await database
    .updateTable('site_orders')
    .set(update)
    .where('id', '=', siteOrderId)
    .execute()
}

export async function settleSiteOrderPayment(database, siteOrderId, status, patch = {}) {
  await updateSiteOrderPaymentStatus(database, siteOrderId, status, patch)

  const siteOrder = await getSiteOrderPaymentState(database, siteOrderId)
  if (siteOrder?.payment_status === 'paid') {
    await enqueueSaleFiscalReceipt(database, siteOrder.id)
  }

  return siteOrder
}

export async function saveSiteOrderVtbPayment(database, siteOrderId, response, expiresAt, provider = DEFAULT_PAYMENT_PROVIDER) {
  const siteOrder = await getSiteOrderPaymentState(database, siteOrderId)

  await database
    .updateTable('site_orders')
    .set({
      vtb_qr_id: response.qrId || null,
      expires_at: expiresAt,
      payload: mergeVtbPaymentPayload(siteOrder?.payload, {
        provider,
        ...(response.qrId ? { qr: response } : { card: response })
      }),
      updated_at: new Date()
    })
    .where('id', '=', siteOrderId)
    .execute()
}

export async function markSiteOrderPaymentPending(database, { siteOrderId, orderNumber, amount, provider = DEFAULT_PAYMENT_PROVIDER }) {
  await database
    .updateTable('site_orders')
    .set({
      order_number: orderNumber,
      payment_provider: provider,
      payment_status: 'pending',
      amount,
      currency: 'RUB',
      updated_at: new Date()
    })
    .where('id', '=', siteOrderId)
    .execute()

  return Number(siteOrderId)
}

import { sendFiscalReceiptForPaidOrder } from './rarus-kkt.js'

const PAYMENT_PROVIDER = 'vtb_sbp'

export function normalizePaymentStatus(status) {
  return ['pending', 'paid', 'failed', 'expired', 'cancelled'].includes(status) ? status : 'pending'
}

export async function getOrderPayment(database, paymentId) {
  return database
    .selectFrom('site_orders')
    .selectAll()
    .where('id', '=', paymentId)
    .executeTakeFirst()
}

export async function updateOrderPaymentStatus(database, paymentId, status, patch = {}) {
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
    .where('id', '=', paymentId)
    .execute()
}

export async function settleOrderPayment(database, paymentId, status, patch = {}) {
  await updateOrderPaymentStatus(database, paymentId, status, patch)

  const payment = await getOrderPayment(database, paymentId)
  if (payment?.payment_status === 'paid') {
    sendFiscalReceiptForPaidOrder(database, payment).catch((error) => {
      console.error('[rarus-kkt] Async fiscal receipt failed:', error)
    })
  }

  return payment
}

export async function saveVtbRegistration(database, paymentId, response) {
  await database
    .updateTable('site_orders')
    .set({
      vtb_md_order: response.orderId,
      updated_at: new Date()
    })
    .where('id', '=', paymentId)
    .execute()
}

export async function saveVtbQr(database, paymentId, response, expiresAt) {
  await database
    .updateTable('site_orders')
    .set({
      vtb_qr_id: response.qrId,
      expires_at: expiresAt,
      updated_at: new Date()
    })
    .where('id', '=', paymentId)
    .execute()
}

export async function createPendingSiteOrderPayment(database, { siteOrderId, orderNumber, amount }) {
  await database
    .updateTable('site_orders')
    .set({
      order_number: orderNumber,
      payment_provider: PAYMENT_PROVIDER,
      payment_status: 'pending',
      amount,
      currency: 'RUB',
      updated_at: new Date()
    })
    .where('id', '=', siteOrderId)
    .execute()

  return Number(siteOrderId)
}

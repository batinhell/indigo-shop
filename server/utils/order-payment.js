const PAYMENT_PROVIDER = 'vtb_sbp'

function toJson(value) {
  return JSON.stringify(value ?? null)
}

export function normalizePaymentStatus(status) {
  return ['pending', 'paid', 'failed', 'expired', 'cancelled'].includes(status) ? status : 'pending'
}

export async function getOrderPayment(database, paymentId) {
  return database
    .selectFrom('order_payments')
    .selectAll()
    .where('id', '=', paymentId)
    .executeTakeFirst()
}

export async function updateOrderPaymentStatus(database, paymentId, status, patch = {}) {
  const normalizedStatus = normalizePaymentStatus(status)
  const now = new Date()

  const update = {
    ...patch,
    status: normalizedStatus,
    last_checked_at: now,
    updated_at: now
  }

  if (normalizedStatus === 'paid' && !patch.paid_at) {
    update.paid_at = now
  }

  await database
    .updateTable('order_payments')
    .set(update)
    .where('id', '=', paymentId)
    .execute()
}

export async function saveVtbRegistration(database, paymentId, response) {
  await database
    .updateTable('order_payments')
    .set({
      vtb_md_order: response.orderId,
      vtb_form_url: response.formUrl ?? null,
      vtb_register_response: toJson(response),
      updated_at: new Date()
    })
    .where('id', '=', paymentId)
    .execute()
}

export async function saveVtbQr(database, paymentId, response, expiresAt) {
  await database
    .updateTable('order_payments')
    .set({
      vtb_qr_id: response.qrId,
      vtb_qr_payload: response.payload ?? null,
      vtb_qr_image: response.renderedQr ?? null,
      vtb_qr_status: response.qrStatus ?? response.status ?? null,
      vtb_qr_response: toJson(response),
      expires_at: expiresAt,
      updated_at: new Date()
    })
    .where('id', '=', paymentId)
    .execute()
}

export async function createPendingOrderPayment(database, { orderId, orderNumber, amount }) {
  const result = await database
    .insertInto('order_payments')
    .values({
      order_id: orderId,
      provider: PAYMENT_PROVIDER,
      status: 'pending',
      amount,
      currency: 'RUB',
      order_number: orderNumber
    })
    .executeTakeFirst()

  return Number(result.insertId)
}

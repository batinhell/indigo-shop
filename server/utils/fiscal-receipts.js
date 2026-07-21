const SALE_RECEIPT_TYPE = 'sale'
const RETURN_RECEIPT_TYPE = 'return'

function createSaleDocumentId(siteOrderId) {
  return `INDIGO-ORDER-${String(siteOrderId).padStart(20, '0')}`.slice(0, 40)
}

function createReturnDocumentId(refundId) {
  return `INDIGO-REFUND-${String(refundId).padStart(20, '0')}`.slice(0, 40)
}

function parseJson(value, fallback = null) {
  if (!value) return fallback
  if (typeof value === 'object') return value

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

async function enqueueFiscalReceiptJob(trx, receipt, options = {}) {
  const idempotencyKey = `fiscal:${receipt.id}:send`
  const existingJob = await trx
    .selectFrom('site_order_jobs')
    .select(['id'])
    .where('idempotency_key', '=', idempotencyKey)
    .executeTakeFirst()

  if (!existingJob && !['completed', 'sending'].includes(receipt.status)) {
    const now = new Date()
    await trx
      .insertInto('site_order_jobs')
      .values({
        job_type: 'send_fiscal_receipt',
        idempotency_key: idempotencyKey,
        site_order_id: Number(receipt.site_order_id),
        payment_attempt_id: options.paymentAttemptId ? Number(options.paymentAttemptId) : null,
        refund_id: options.refundId ? Number(options.refundId) : null,
        fiscal_receipt_id: Number(receipt.id),
        status: 'pending',
        attempts: 0,
        max_attempts: 20,
        next_attempt_at: now,
        created_at: now,
        updated_at: now
      })
      .execute()
  }
}

export async function enqueueSaleFiscalReceipt(database, siteOrderId, paymentAttemptId = null) {
  const orderId = Number(siteOrderId)

  return database.transaction().execute(async (trx) => {
    const order = await trx
      .selectFrom('site_orders')
      .selectAll()
      .where('id', '=', orderId)
      .forUpdate()
      .executeTakeFirst()

    if (!order || order.payment_status !== 'paid') return null

    const documentId = createSaleDocumentId(orderId)
    let receipt = await trx
      .selectFrom('site_order_fiscal_receipts')
      .selectAll()
      .where('document_id', '=', documentId)
      .executeTakeFirst()

    if (!receipt) {
      const items = await trx
        .selectFrom('site_order_items')
        .select(['id', 'product_id', 'name', 'description', 'quantity', 'unit_price', 'design_price', 'total', 'payload'])
        .where('site_order_id', '=', orderId)
        .orderBy('id')
        .execute()
      const now = new Date()
      const inserted = await trx
        .insertInto('site_order_fiscal_receipts')
        .values({
          site_order_id: orderId,
          refund_id: null,
          receipt_type: SALE_RECEIPT_TYPE,
          document_id: documentId,
          status: 'queued',
          amount: order.amount,
          currency: order.currency || 'RUB',
          items_snapshot: JSON.stringify(items.map(item => ({
            ...item,
            payload: parseJson(item.payload)
          }))),
          created_at: now,
          updated_at: now
        })
        .executeTakeFirst()

      receipt = await trx
        .selectFrom('site_order_fiscal_receipts')
        .selectAll()
        .where('id', '=', Number(inserted.insertId))
        .executeTakeFirst()
    }

    await enqueueFiscalReceiptJob(trx, receipt, { paymentAttemptId })

    return receipt
  })
}

export async function enqueueReturnFiscalReceipt(database, refundId) {
  const normalizedRefundId = Number(refundId)

  return database.transaction().execute(async (trx) => {
    const refund = await trx
      .selectFrom('site_order_refunds')
      .selectAll()
      .where('id', '=', normalizedRefundId)
      .forUpdate()
      .executeTakeFirst()

    if (!refund || refund.status !== 'completed') return null

    const documentId = createReturnDocumentId(refund.id)
    let receipt = await trx
      .selectFrom('site_order_fiscal_receipts')
      .selectAll()
      .where('document_id', '=', documentId)
      .executeTakeFirst()

    if (!receipt) {
      const now = new Date()
      const inserted = await trx
        .insertInto('site_order_fiscal_receipts')
        .values({
          site_order_id: Number(refund.site_order_id),
          refund_id: Number(refund.id),
          receipt_type: RETURN_RECEIPT_TYPE,
          document_id: documentId,
          status: 'queued',
          amount: refund.amount,
          currency: refund.currency || 'RUB',
          items_snapshot: refund.items_snapshot,
          created_at: now,
          updated_at: now
        })
        .executeTakeFirst()

      receipt = await trx
        .selectFrom('site_order_fiscal_receipts')
        .selectAll()
        .where('id', '=', Number(inserted.insertId))
        .executeTakeFirst()
    }

    await enqueueFiscalReceiptJob(trx, receipt, {
      paymentAttemptId: refund.payment_attempt_id,
      refundId: refund.id
    })

    return receipt
  })
}

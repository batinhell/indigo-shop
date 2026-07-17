import {
  refreshFiscalReceiptStatus,
  sendFiscalReceiptForPaidOrder
} from './rarus-kkt.js'

const DEFAULT_BATCH_SIZE = 10
const LOCK_TIMEOUT_MS = 5 * 60 * 1000
const MAX_RETRY_DELAY_SECONDS = 15 * 60

function getRetryDelaySeconds(attempts) {
  return Math.min(15 * (2 ** Math.max(0, attempts - 1)), MAX_RETRY_DELAY_SECONDS)
}

async function claimNextJob(database, workerId) {
  return database.transaction().execute(async (trx) => {
    const staleBefore = new Date(Date.now() - LOCK_TIMEOUT_MS)
    const job = await trx
      .selectFrom('site_order_jobs')
      .selectAll()
      .where(eb => eb.or([
        eb.and([
          eb('status', 'in', ['pending', 'retry']),
          eb('next_attempt_at', '<=', new Date())
        ]),
        eb.and([
          eb('status', '=', 'processing'),
          eb('locked_at', '<=', staleBefore)
        ])
      ]))
      .whereRef('attempts', '<', 'max_attempts')
      .orderBy('next_attempt_at')
      .orderBy('id')
      .forUpdate()
      .skipLocked()
      .executeTakeFirst()

    if (!job) return null

    await trx
      .updateTable('site_order_jobs')
      .set({
        status: 'processing',
        attempts: Number(job.attempts) + 1,
        locked_at: new Date(),
        locked_by: workerId,
        updated_at: new Date()
      })
      .where('id', '=', job.id)
      .execute()

    return { ...job, attempts: Number(job.attempts) + 1 }
  })
}

async function mirrorLegacyFiscalState(database, receiptId, order) {
  if (!order) return null

  const status = String(order.fiscal_receipt_status || 'queued')
  await database
    .updateTable('site_order_fiscal_receipts')
    .set({
      operation_id: order.fiscal_receipt_operation_id || null,
      status,
      response_payload: order.fiscal_receipt_payload || null,
      error: order.fiscal_receipt_error || null,
      sent_at: order.fiscal_receipt_sent_at || null,
      ...(status === 'completed' ? { completed_at: new Date() } : {}),
      updated_at: new Date()
    })
    .where('id', '=', Number(receiptId))
    .execute()

  return status
}

async function processFiscalReceiptJob(database, job) {
  const receipt = await database
    .selectFrom('site_order_fiscal_receipts')
    .selectAll()
    .where('id', '=', Number(job.fiscal_receipt_id))
    .executeTakeFirst()
  let order = await database
    .selectFrom('site_orders')
    .selectAll()
    .where('id', '=', Number(job.site_order_id))
    .executeTakeFirst()

  if (!receipt || !order) return { completed: true }
  if (receipt.status === 'completed') return { completed: true }
  if (receipt.receipt_type !== 'sale') {
    throw new Error(`Unsupported fiscal receipt type: ${receipt.receipt_type}`)
  }

  if (order.fiscal_receipt_operation_id) {
    await refreshFiscalReceiptStatus(database, order)
  } else {
    await sendFiscalReceiptForPaidOrder(database, order)
  }

  order = await database
    .selectFrom('site_orders')
    .selectAll()
    .where('id', '=', Number(job.site_order_id))
    .executeTakeFirst()
  const status = await mirrorLegacyFiscalState(database, receipt.id, order)

  if (status === 'completed') return { completed: true }
  if (status === 'failed') throw new Error(order?.fiscal_receipt_error || 'Fiscal receipt failed')

  return { completed: false, delaySeconds: order?.fiscal_receipt_operation_id ? 15 : 60 }
}

async function executeJob(database, job) {
  if (job.job_type === 'send_fiscal_receipt') {
    return processFiscalReceiptJob(database, job)
  }

  throw new Error(`Unsupported site order job type: ${job.job_type}`)
}

async function completeJob(database, jobId) {
  await database
    .updateTable('site_order_jobs')
    .set({
      status: 'completed',
      locked_at: null,
      locked_by: null,
      last_error: null,
      completed_at: new Date(),
      updated_at: new Date()
    })
    .where('id', '=', Number(jobId))
    .execute()
}

async function rescheduleJob(database, job, error = null, delaySeconds = null) {
  const exhausted = Number(job.attempts) >= Number(job.max_attempts)
  const delay = delaySeconds ?? getRetryDelaySeconds(Number(job.attempts))

  await database
    .updateTable('site_order_jobs')
    .set({
      status: exhausted ? 'failed' : 'retry',
      next_attempt_at: new Date(Date.now() + delay * 1000),
      locked_at: null,
      locked_by: null,
      last_error: error ? String(error?.message || error).slice(0, 65535) : null,
      updated_at: new Date()
    })
    .where('id', '=', Number(job.id))
    .execute()
}

export async function processPendingSiteOrderJobs(database, options = {}) {
  const requestedLimit = Number(options.limit || DEFAULT_BATCH_SIZE)
  const limit = Math.min(Math.max(1, requestedLimit), 50)
  const workerId = String(options.workerId || `shop-${process.pid}-${crypto.randomUUID()}`).slice(0, 128)
  const result = { processed: 0, completed: 0, retried: 0, failed: 0 }

  while (result.processed < limit) {
    const job = await claimNextJob(database, workerId)
    if (!job) break

    result.processed += 1

    try {
      const outcome = await executeJob(database, job)

      if (outcome.completed) {
        await completeJob(database, job.id)
        result.completed += 1
      } else {
        await rescheduleJob(database, job, null, outcome.delaySeconds)
        result.retried += 1
      }
    } catch (error) {
      await rescheduleJob(database, job, error)
      if (Number(job.attempts) >= Number(job.max_attempts)) result.failed += 1
      else result.retried += 1
    }
  }

  return result
}

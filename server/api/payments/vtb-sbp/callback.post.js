import { useDatabase } from '../../../utils/database.js'
import {
  findPaymentAttemptByVtbCallback,
  refreshSbpPaymentAttempt
} from '../../../utils/payment-attempts.js'

function getCallbackObject(body) {
  return body?.object && typeof body.object === 'object' ? body.object : body
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const callback = getCallbackObject(body)
  const bankOrderId = String(callback?.orderId || callback?.sbpParams?.requestId || '').trim()
  const qrId = String(callback?.sbpParams?.qrcId || callback?.qrcId || '').trim()
  const paymentId = String(callback?.paymentId || '').trim()

  if (!bankOrderId && !qrId && !paymentId) return { ok: true }

  const database = useDatabase()
  const attempt = await findPaymentAttemptByVtbCallback(database, { bankOrderId, qrId, paymentId })

  if (!attempt) return { ok: true }

  await refreshSbpPaymentAttempt(database, attempt, { callback: body })

  return { ok: true }
})

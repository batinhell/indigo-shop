import { useDatabase } from '../../../utils/database.js'
import {
  getPaymentAttempt,
  refreshSbpPaymentAttempt,
  serializePaymentAttempt
} from '../../../utils/payment-attempts.js'
import { getOwnedSiteOrder } from '../../../utils/site-orders.js'

export default defineEventHandler(async (event) => {
  const attemptId = Number(getRouterParam(event, 'paymentId'))

  if (!Number.isInteger(attemptId) || attemptId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid payment id',
      message: 'Некорректный идентификатор платежа'
    })
  }

  const database = useDatabase()
  const attempt = await getPaymentAttempt(database, attemptId)

  if (!attempt) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Payment not found',
      message: 'Платёж не найден'
    })
  }

  const accessToken = String(
    getHeader(event, 'x-order-access-token')
    || getQuery(event).accessToken
    || ''
  ).trim()
  await getOwnedSiteOrder(database, event, Number(attempt.site_order_id), accessToken)
  const refreshedAttempt = await refreshSbpPaymentAttempt(database, attempt)

  return { payment: serializePaymentAttempt(refreshedAttempt) }
})

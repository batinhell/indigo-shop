import { useDatabase } from '../../../utils/database.js'
import {
  serializePaymentAttempt,
  startSbpPaymentAttempt
} from '../../../utils/payment-attempts.js'
import { getOwnedSiteOrder } from '../../../utils/site-orders.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const orderId = Number(body?.orderId)

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order id',
      message: 'Некорректный идентификатор заказа'
    })
  }

  const database = useDatabase()
  await getOwnedSiteOrder(database, event, orderId, body?.accessToken)
  const attempt = await startSbpPaymentAttempt(database, orderId)

  return { payment: serializePaymentAttempt(attempt) }
})

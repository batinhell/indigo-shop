import { useDatabase } from '../../../../../utils/database.js'
import { assertInternalShopToken } from '../../../../../utils/internal-api.js'

export default defineEventHandler(async (event) => {
  assertInternalShopToken(event)

  const orderId = Number(getRouterParam(event, 'orderId'))
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order id',
      message: 'Некорректный идентификатор заказа'
    })
  }

  const database = useDatabase()
  const refunds = await database
    .selectFrom('site_order_refunds')
    .selectAll()
    .where('site_order_id', '=', orderId)
    .orderBy('requested_at', 'desc')
    .execute()

  return { refunds }
})

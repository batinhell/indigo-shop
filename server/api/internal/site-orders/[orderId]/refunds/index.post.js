import { useDatabase } from '../../../../../utils/database.js'
import { assertInternalShopToken } from '../../../../../utils/internal-api.js'
import { requestSiteOrderRefund } from '../../../../../utils/vtb-refunds.js'

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

  const body = await readBody(event)
  const database = useDatabase()
  const order = await database
    .selectFrom('site_orders')
    .selectAll()
    .where('id', '=', orderId)
    .executeTakeFirst()

  if (!order) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Order not found',
      message: 'Заказ не найден'
    })
  }

  const refund = await requestSiteOrderRefund(database, order, body?.amount, body?.refundId)

  return { refund }
})

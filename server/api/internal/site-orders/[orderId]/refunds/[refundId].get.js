import { useDatabase } from '../../../../../utils/database.js'
import { assertInternalShopToken } from '../../../../../utils/internal-api.js'
import { refreshSiteOrderRefund } from '../../../../../utils/vtb-refunds.js'

export default defineEventHandler(async (event) => {
  assertInternalShopToken(event)

  const orderId = Number(getRouterParam(event, 'orderId'))
  const refundId = String(getRouterParam(event, 'refundId') || '').trim()

  if (!Number.isInteger(orderId) || orderId <= 0 || !refundId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid refund request',
      message: 'Некорректный идентификатор заказа или возврата'
    })
  }

  const database = useDatabase()
  const [order, refund] = await Promise.all([
    database.selectFrom('site_orders').selectAll().where('id', '=', orderId).executeTakeFirst(),
    database
      .selectFrom('site_order_refunds')
      .selectAll()
      .where('site_order_id', '=', orderId)
      .where('refund_id', '=', refundId)
      .executeTakeFirst()
  ])

  if (!order || !refund) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Refund not found',
      message: 'Возврат не найден'
    })
  }

  if (['completed', 'failed'].includes(refund.status)) {
    return { refund }
  }

  return { refund: await refreshSiteOrderRefund(database, order, refund) }
})

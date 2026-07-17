import { enqueueSaleFiscalReceipt } from '../../../../utils/fiscal-receipts.js'
import { useDatabase } from '../../../../utils/database.js'
import { assertInternalShopToken } from '../../../../utils/internal-api.js'

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
  const order = await database
    .selectFrom('site_orders')
    .select(['id', 'payment_status'])
    .where('id', '=', orderId)
    .executeTakeFirst()

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Order not found', message: 'Заказ не найден' })
  }

  if (order.payment_status === 'paid') {
    await enqueueSaleFiscalReceipt(database, orderId)
  }

  const receipts = await database
    .selectFrom('site_order_fiscal_receipts')
    .selectAll()
    .where('site_order_id', '=', orderId)
    .orderBy('created_at', 'desc')
    .execute()

  return { fiscalReceipts: receipts }
})

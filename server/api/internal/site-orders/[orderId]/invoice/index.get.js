import { useDatabase } from '../../../../../utils/database.js'
import { assertInternalShopToken } from '../../../../../utils/internal-api.js'
import { serializeInvoice } from '../../../../../utils/invoice-serializer.js'
import { getInvoiceByOrderId } from '../../../../../utils/invoices.js'

export default defineEventHandler(async (event) => {
  assertInternalShopToken(event)

  const orderId = Number(getRouterParam(event, 'orderId'))
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid order id', message: 'Некорректный номер заказа' })
  }

  const database = useDatabase()
  const [order, invoice] = await Promise.all([
    database.selectFrom('site_orders').selectAll().where('id', '=', orderId).executeTakeFirst(),
    getInvoiceByOrderId(database, orderId)
  ])

  if (!order || !invoice) {
    throw createError({ statusCode: 404, statusMessage: 'Invoice not found', message: 'Счёт не найден' })
  }

  return { invoice: serializeInvoice(invoice, order) }
})

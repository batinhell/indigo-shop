import { useDatabase } from '../../../../../utils/database.js'
import { assertInternalShopToken } from '../../../../../utils/internal-api.js'
import { getInvoiceByOrderId, sendInvoicePdf } from '../../../../../utils/invoices.js'

export default defineEventHandler(async (event) => {
  assertInternalShopToken(event)

  const orderId = Number(getRouterParam(event, 'orderId'))
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid order id', message: 'Некорректный номер заказа' })
  }

  const database = useDatabase()
  const invoice = await getInvoiceByOrderId(database, orderId)

  if (!invoice) {
    throw createError({ statusCode: 404, statusMessage: 'Invoice not found', message: 'Счёт не найден' })
  }

  return sendInvoicePdf(event, invoice)
})

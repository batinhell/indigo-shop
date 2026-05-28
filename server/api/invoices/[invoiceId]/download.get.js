import { useDatabase } from '../../../utils/database.js'
import { sendInvoicePdf } from '../../../utils/invoices.js'
import { getOwnedSiteOrder } from '../../../utils/site-orders.js'

export default defineEventHandler(async (event) => {
  const invoiceId = Number(getRouterParam(event, 'invoiceId'))

  if (!Number.isInteger(invoiceId) || invoiceId <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid invoice id', message: 'Некорректный номер счёта' })
  }

  const database = useDatabase()
  const invoice = await database
    .selectFrom('site_order_invoices')
    .selectAll()
    .where('id', '=', invoiceId)
    .executeTakeFirst()

  if (!invoice) {
    throw createError({ statusCode: 404, statusMessage: 'Invoice not found', message: 'Счёт не найден' })
  }

  await getOwnedSiteOrder(database, event, Number(invoice.site_order_id), getQuery(event).accessToken)
  return sendInvoicePdf(event, invoice)
})

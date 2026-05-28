import { useDatabase } from '../../../utils/database.js'
import { sendInvoiceEmail } from '../../../utils/invoice-email.js'
import { serializeInvoice } from '../../../utils/invoice-serializer.js'
import { createOrGetInvoice } from '../../../utils/invoices.js'
import { getOwnedSiteOrder } from '../../../utils/site-orders.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const orderId = Number(body?.orderId)

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid order id', message: 'Некорректный номер заказа' })
  }

  const accessToken = String(body?.accessToken || '').trim()
  const database = useDatabase()
  const order = await getOwnedSiteOrder(database, event, orderId, accessToken)
  const { invoice, created } = await createOrGetInvoice(database, event, order)

  if (created) {
    sendInvoiceEmail(database, event, invoice, order, accessToken).catch((error) => {
      console.error('[invoice/email] Async delivery failed:', error)
    })
  }

  return {
    invoice: serializeInvoice(invoice, order, accessToken)
  }
})

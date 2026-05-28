import { sendNotificoreEmail } from './notificore.js'
import { getInvoiceDownloadUrl } from './invoices.js'
import { INVOICE_EMAIL_STATUS } from '~~/shared/utils/invoice-email-status.js'

function money(value) {
  return Number(value || 0).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

async function updateInvoiceEmailStatus(database, invoiceId, status, error = null) {
  await database
    .updateTable('site_order_invoices')
    .set({
      email_status: status,
      email_error: error,
      updated_at: new Date()
    })
    .where('id', '=', invoiceId)
    .execute()
}

export async function sendInvoiceEmail(database, event, invoice, order, accessToken = '') {
  const origin = getRequestURL(event).origin
  const downloadUrl = `${origin}${getInvoiceDownloadUrl(invoice, accessToken || order.access_token || '')}`

  try {
    await updateInvoiceEmailStatus(database, invoice.id, INVOICE_EMAIL_STATUS.SENDING)

    await sendNotificoreEmail({
      to: [invoice.customer_email],
      subject: `Счёт на оплату ${invoice.invoice_number}`,
      templateContent: {
        invoiceNumber: invoice.invoice_number,
        orderNumber: order.order_number || `SITE-${order.id}`,
        amount: `${money(invoice.amount)} ₽`,
        downloadUrl,
        confirmationUrl: downloadUrl,
        profileUrl: downloadUrl
      }
    })

    await updateInvoiceEmailStatus(database, invoice.id, INVOICE_EMAIL_STATUS.SENT)
  } catch (error) {
    await updateInvoiceEmailStatus(
      database,
      invoice.id,
      INVOICE_EMAIL_STATUS.FAILED,
      error?.message || 'Email failed'
    )
  }
}

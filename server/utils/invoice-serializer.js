import { INVOICE_SELLER, INVOICE_VAT } from './invoice-config.js'
import { getInvoiceDownloadUrl } from './invoices.js'
import { isInvoiceEmailSent } from '~~/shared/utils/invoice-email-status.js'

function parseJson(value, fallback = null) {
  if (!value) return fallback
  if (typeof value === 'object') return value

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export function serializeInvoice(invoice, order, accessToken = '') {
  return {
    id: Number(invoice.id),
    number: invoice.invoice_number,
    date: invoice.created_at,
    amount: Number(invoice.amount || 0),
    orderId: Number(order.id),
    orderNumber: order.order_number || `SITE-${order.id}`,
    downloadUrl: getInvoiceDownloadUrl(invoice, accessToken),
    emailSent: isInvoiceEmailSent(invoice.email_status),
    emailFallbackUsed: false,
    emailStatus: invoice.email_status,
    customerEmail: invoice.customer_email,
    seller: parseJson(invoice.seller_snapshot, INVOICE_SELLER),
    payer: parseJson(invoice.payer_snapshot, {}),
    vat: INVOICE_VAT
  }
}

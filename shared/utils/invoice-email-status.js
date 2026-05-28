export const INVOICE_EMAIL_STATUS = {
  QUEUED: 'queued',
  SENDING: 'sending',
  SENT: 'sent',
  FAILED: 'failed',
  NOT_SENT: 'not_sent'
}

export function isInvoiceEmailPending(status) {
  return [
    INVOICE_EMAIL_STATUS.QUEUED,
    INVOICE_EMAIL_STATUS.SENDING,
    INVOICE_EMAIL_STATUS.NOT_SENT
  ].includes(status)
}

export function isInvoiceEmailSent(status) {
  return status === INVOICE_EMAIL_STATUS.SENT
}

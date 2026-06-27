const PAID_QR_STATUSES = new Set(['ACCEPTED', 'ACWP', 'OK', 'RECONCILED'])
const FAILED_QR_STATUSES = new Set(['REJECTED', 'RJCT', 'REJECTED_BY_USER', 'CANCELED', 'CANCELLED'])

export function getPaymentStatusFromVtbQr(qrStatus, transactionState) {
  const normalizedQrStatus = String(qrStatus || '').toUpperCase()
  const normalizedTransactionState = String(transactionState || '').toUpperCase()

  if (PAID_QR_STATUSES.has(normalizedQrStatus) || normalizedTransactionState === 'DEPOSITED') {
    return 'paid'
  }

  if (FAILED_QR_STATUSES.has(normalizedQrStatus)) {
    return 'failed'
  }

  return 'pending'
}

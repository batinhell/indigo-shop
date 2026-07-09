const PAID_QR_STATUSES = new Set(['ACCEPTED', 'ACWP', 'OK', 'RECONCILED', 'PAID', 'CONFIRMED'])
const FAILED_QR_STATUSES = new Set(['REJECTED', 'RJCT', 'REJECTED_BY_USER', 'CANCELED', 'CANCELLED', 'DECLINED'])

export function getPaymentStatusFromVtbQr(qrStatus, transactionState) {
  const normalizedQrStatus = String(qrStatus || '').toUpperCase()
  const normalizedTransactionState = String(transactionState || '').toUpperCase()

  if (PAID_QR_STATUSES.has(normalizedQrStatus) || PAID_QR_STATUSES.has(normalizedTransactionState) || normalizedTransactionState === 'DEPOSITED') {
    return 'paid'
  }

  if (FAILED_QR_STATUSES.has(normalizedQrStatus) || FAILED_QR_STATUSES.has(normalizedTransactionState)) {
    return 'failed'
  }

  return 'pending'
}

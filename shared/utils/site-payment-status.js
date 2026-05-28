export const SITE_PAYMENT_STATUS_META = {
  pending: { label: 'Ожидает оплаты', tone: 'secondary', group: 'review' },
  paid: { label: 'Оплачен', tone: 'purple', group: 'review' },
  failed: { label: 'Оплата не прошла', tone: 'danger', group: 'review' },
  expired: { label: 'Оплата истекла', tone: 'danger', group: 'review' },
  cancelled: { label: 'Отменен', tone: 'secondary', group: 'finished' }
}

const DEFAULT_SITE_PAYMENT_STATUS_META = SITE_PAYMENT_STATUS_META.pending

export function getSitePaymentStatusMeta(status) {
  return SITE_PAYMENT_STATUS_META[status] || DEFAULT_SITE_PAYMENT_STATUS_META
}

export function getSitePaymentStatusLabel(status) {
  return getSitePaymentStatusMeta(status).label
}

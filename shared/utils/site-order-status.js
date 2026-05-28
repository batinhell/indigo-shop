export const SITE_ORDER_STATUS = {
  WORK_IN_PROGRESS: '0',
  WAIT: '1',
  SHIPPED: '2',
  ON_APPROVAL: '3',
  READY: '5'
}

export const SITE_ORDER_STATUS_LABELS = {
  [SITE_ORDER_STATUS.WORK_IN_PROGRESS]: 'В работе',
  [SITE_ORDER_STATUS.WAIT]: 'Ждёт',
  [SITE_ORDER_STATUS.SHIPPED]: 'Отгружен',
  [SITE_ORDER_STATUS.ON_APPROVAL]: 'На утверждении',
  [SITE_ORDER_STATUS.READY]: 'Готов'
}

export function normalizeSiteOrderStatus(status) {
  return String(status ?? SITE_ORDER_STATUS.WAIT)
}

export function getSiteOrderStatusLabel(status) {
  return SITE_ORDER_STATUS_LABELS[normalizeSiteOrderStatus(status)] || SITE_ORDER_STATUS_LABELS[SITE_ORDER_STATUS.WAIT]
}

export function isSiteOrderInWork(status) {
  return normalizeSiteOrderStatus(status) === SITE_ORDER_STATUS.WORK_IN_PROGRESS
}

import {
  mergeVtbPaymentPayload,
  settleSiteOrderPayment
} from './order-payment.js'
import { getPaymentStatusFromVtbQr } from './vtb-payment-status-mapper.js'
import { getVtbDynamicQrStatus } from './vtb-sbp-api.js'

const FINAL_PAYMENT_STATUSES = new Set(['paid', 'failed', 'expired', 'cancelled'])

export async function refreshVtbPaymentStatus(database, siteOrder, options = {}) {
  const currentStatus = siteOrder?.payment_status ?? siteOrder?.status ?? 'pending'

  if (!siteOrder || FINAL_PAYMENT_STATUSES.has(currentStatus)) {
    return {
      siteOrder: siteOrder ? { ...siteOrder, status: currentStatus } : null,
      status: currentStatus,
      statusResponse: null
    }
  }

  if (!siteOrder.order_number) {
    return {
      siteOrder: { ...siteOrder, status: currentStatus },
      status: currentStatus,
      statusResponse: null
    }
  }

  const statusResponse = await getVtbDynamicQrStatus({
    requestId: siteOrder.order_number,
    qrId: siteOrder.vtb_qr_id
  })
  const status = getPaymentStatusFromVtbQr(statusResponse.qrStatus, statusResponse.transactionState)
  const settledSiteOrder = await settleSiteOrderPayment(database, siteOrder.id, status, {
    ...(statusResponse.paymentId ? { vtb_payment_id: statusResponse.paymentId } : {}),
    payload: mergeVtbPaymentPayload(siteOrder.payload, {
      ...options.payloadPatch,
      lastStatus: statusResponse.raw || statusResponse,
      ...(statusResponse.amount ? { chargedAmount: statusResponse.amount } : {})
    })
  })

  return {
    siteOrder: {
      ...settledSiteOrder,
      status: settledSiteOrder?.payment_status ?? status
    },
    status,
    statusResponse
  }
}

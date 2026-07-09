import QRCode from 'qrcode'

import {
  getMockPaymentStatus,
  getVtbPaymentConfig,
  isVtbPaymentMockEnabled
} from './vtb-config.js'
import { requestVtbEcommerce } from './vtb-http-client.js'

function createVtbQrExpiresAt(config) {
  return new Date(Date.now() + config.qrTtlSeconds * 1000)
}

export function getVtbQrExpiresAt() {
  const config = getVtbPaymentConfig()
  return createVtbQrExpiresAt(config)
}

export async function getVtbDynamicQr(requestId, options = {}) {
  if (isVtbPaymentMockEnabled()) {
    return {
      qrId: `MOCK-QR-${Date.now()}`,
      payload: `https://example.local/mock-payment/${encodeURIComponent(requestId)}`,
      renderedQr: null,
      qrStatus: 'PENDING',
      mock: true
    }
  }

  const config = getVtbPaymentConfig()
  const data = await requestVtbEcommerce('orders', {
    method: 'POST',
    body: {
      orderId: requestId,
      orderName: String(options.description || `Заказ Indigo #${requestId}`).slice(0, 255),
      expire: createVtbQrExpiresAt(config).toISOString(),
      amount: {
        value: Number(options.amount || 0),
        code: 'RUB'
      },
      returnPaymentData: 'sbp',
      returnUrl: config.returnUrl || undefined
    }
  })
  const order = data?.object || {}
  const sbpPayment = Array.isArray(order.preparedPayments)
    ? order.preparedPayments.find(payment => String(payment?.type || '').toLowerCase() === 'sbp')
    : null
  const paymentUrl = sbpPayment?.object?.url || sbpPayment?.url

  if (!order.orderId || !paymentUrl) {
    throw createError({
      statusCode: 502,
      statusMessage: 'VTB SBP payment url is missing',
      message: 'ВТБ не вернул ссылку для оплаты СБП',
      data
    })
  }

  const renderedQr = await QRCode.toString(paymentUrl, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 512
  })

  return {
    qrId: sbpPayment?.object?.qrcId || order.orderCode || order.orderId,
    payload: paymentUrl,
    renderedQr,
    qrStatus: order.status?.value || 'CREATED',
    raw: data
  }
}

export async function getVtbDynamicQrStatus({ requestId, qrId }) {
  if (isVtbPaymentMockEnabled()) {
    const status = getMockPaymentStatus()

    return {
      requestId,
      qrId,
      qrStatus: status === 'paid' ? 'ACCEPTED' : status === 'failed' ? 'REJECTED' : 'PENDING',
      transactionState: status === 'paid' ? 'DEPOSITED' : null,
      mock: true
    }
  }

  const data = await requestVtbEcommerce(`orders/${encodeURIComponent(requestId)}`, {
    method: 'GET'
  })
  const order = data?.object || {}
  const payments = Array.isArray(order.transactions?.payments) ? order.transactions.payments : []
  const sbpPayment = payments.find(payment => String(payment?.object?.paymentData?.type || '').toLowerCase() === 'sbp')?.object
    || payments[0]?.object

  return {
    requestId,
    qrId,
    qrStatus: order.status?.value,
    transactionState: sbpPayment?.status?.value,
    raw: data
  }
}

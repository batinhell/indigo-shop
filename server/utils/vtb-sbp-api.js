import {
  getMockPaymentStatus,
  getVtbPaymentConfig,
  isVtbPaymentMockEnabled
} from './vtb-config.js'
import { requestVtbSbp } from './vtb-http-client.js'

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
  const data = await requestVtbSbp('qr/dynamics', {
    requestId,
    qrTtl: String(Math.max(1, Math.min(129600, Math.ceil(config.qrTtlSeconds / 60)))),
    amount: Number(options.amount || 0),
    currency: 'RUB',
    purpose: String(options.description || `Заказ Indigo #${requestId}`).slice(0, 140),
    redirectUrl: config.returnUrl || undefined
  })
  const qr = data?.data || {}

  if (!qr.qrcId || !qr.payload) {
    throw createError({
      statusCode: 502,
      statusMessage: 'VTB QR payload is missing',
      message: 'ВТБ не вернул данные QR-кода СБП',
      data
    })
  }

  return {
    qrId: qr.qrcId,
    payload: qr.payload,
    renderedQr: null,
    qrStatus: qr.status || 'CREATED',
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

  const data = await requestVtbSbp('qr/dynamics/info', { qrcId: qrId })

  return {
    requestId,
    qrId,
    qrStatus: data.state,
    transactionState: data.state,
    raw: data
  }
}

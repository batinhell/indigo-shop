import QRCode from 'qrcode'

import {
  getMockPaymentStatus,
  getVtbPaymentConfig,
  isVtbPaymentMockEnabled
} from './vtb-config.js'
import { requestVtbEcommerce } from './vtb-http-client.js'

function createVtbPaymentExpiresAt(config) {
  return new Date(Date.now() + config.qrTtlSeconds * 1000)
}

function getVtbOrderObject(data) {
  return data?.object && typeof data.object === 'object' ? data.object : data || {}
}

function getVtbPayments(order) {
  return Array.isArray(order?.transactions?.payments) ? order.transactions.payments : []
}

function getVtbPaymentObject(payment) {
  return payment?.object && typeof payment.object === 'object' ? payment.object : payment || {}
}

function getVtbRefunds(order) {
  const refunds = order?.transactions?.refunds
  return Array.isArray(refunds) ? refunds : []
}

export function getVtbPaymentDetails(data) {
  const order = getVtbOrderObject(data)
  const payment = getVtbPaymentObject(getVtbPayments(order)[0])

  return {
    order,
    paymentId: String(payment?.paymentId || '').trim(),
    paymentStatus: payment?.status?.value || payment?.status || '',
    orderStatus: order?.status?.value || order?.status || '',
    amount: Number(payment?.amount?.value ?? payment?.paymentData?.amount?.value ?? order?.amount?.value ?? 0) || 0,
    currency: String(payment?.amount?.code || payment?.paymentData?.amount?.code || order?.amount?.code || 'RUB')
  }
}

export function getVtbRefundDetails(data, refundId = '') {
  const order = getVtbOrderObject(data)
  const normalizedRefundId = String(refundId || '').trim()
  const refund = getVtbRefunds(order)
    .map(getVtbPaymentObject)
    .find(item => !normalizedRefundId || String(item?.refundId || item?.id || '') === normalizedRefundId)

  return refund || null
}

function getTestAmountOverride(config, amount) {
  const overrideAmount = Number(process.env.VTB_PAYMENT_TEST_AMOUNT_OVERRIDE)

  if (!Number.isFinite(overrideAmount) || overrideAmount <= 0) return null
  if (!config.ecommerceBaseUrl.includes('test3.api.vtb.ru')) return null

  return {
    originalAmount: Number(amount || 0),
    sentAmount: Math.round(overrideAmount * 100) / 100
  }
}

export function getVtbPaymentExpiresAt() {
  const config = getVtbPaymentConfig()
  return createVtbPaymentExpiresAt(config)
}

export const getVtbQrExpiresAt = getVtbPaymentExpiresAt

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
  const amount = Number(options.amount || 0)
  const testAmountOverride = getTestAmountOverride(config, amount)
  const paymentAmount = testAmountOverride?.sentAmount ?? amount
  const description = String(options.description || `Заказ Indigo #${requestId}`)
  const orderName = testAmountOverride
    ? `${description} TEST amount override: original ${testAmountOverride.originalAmount}`
    : description
  const data = await requestVtbEcommerce('orders', {
    method: 'POST',
    body: {
      orderId: requestId,
      orderName: orderName.slice(0, 255),
      expire: createVtbPaymentExpiresAt(config).toISOString(),
      amount: {
        value: paymentAmount,
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
    ...(testAmountOverride ? { testAmountOverride } : {}),
    raw: data
  }
}

export async function createVtbCardPayment(requestId, options = {}) {
  if (isVtbPaymentMockEnabled()) {
    return {
      orderId: requestId,
      payUrl: `https://example.local/mock-card-payment/${encodeURIComponent(requestId)}`,
      status: 'CREATED',
      mock: true
    }
  }

  const config = getVtbPaymentConfig()
  const amount = Number(options.amount || 0)
  const testAmountOverride = getTestAmountOverride(config, amount)
  const paymentAmount = testAmountOverride?.sentAmount ?? amount
  const description = String(options.description || `Заказ Indigo #${requestId}`)
  const data = await requestVtbEcommerce('orders', {
    method: 'POST',
    body: {
      orderId: requestId,
      orderName: description.slice(0, 255),
      expire: createVtbPaymentExpiresAt(config).toISOString(),
      amount: {
        value: paymentAmount,
        code: 'RUB'
      },
      returnUrl: config.returnUrl || undefined
    }
  })
  const order = getVtbOrderObject(data)
  const payUrl = order.payUrl || order.paymentUrl || order.paymentData?.payUrl || data?.payUrl

  if (!order.orderId || !payUrl) {
    throw createError({
      statusCode: 502,
      statusMessage: 'VTB card payment url is missing',
      message: 'ВТБ не вернул ссылку для оплаты картой',
      data
    })
  }

  return {
    orderId: order.orderId,
    payUrl,
    status: order.status?.value || 'CREATED',
    ...(testAmountOverride ? { testAmountOverride } : {}),
    raw: data
  }
}

export async function getVtbOrder(requestId) {
  if (isVtbPaymentMockEnabled()) {
    return {
      object: {
        orderId: requestId,
        status: { value: getMockPaymentStatus() === 'paid' ? 'CONFIRMED' : 'CREATED' },
        transactions: { payments: [] }
      },
      mock: true
    }
  }

  return requestVtbEcommerce(`orders/${encodeURIComponent(requestId)}`, {
    method: 'GET'
  })
}

export async function createVtbRefund({ refundId, paymentId, amount, currency = 'RUB' }) {
  if (isVtbPaymentMockEnabled()) {
    return {
      object: {
        refundId,
        paymentId,
        amount: { value: amount, code: currency },
        status: { value: 'CONFIRMED' }
      },
      mock: true
    }
  }

  return requestVtbEcommerce('refunds', {
    method: 'POST',
    body: {
      refundId,
      paymentId,
      amount: {
        value: amount,
        code: currency
      }
    }
  })
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

  const data = await getVtbOrder(requestId)
  const order = getVtbOrderObject(data)
  const payments = getVtbPayments(order)
  const payment = getVtbPaymentObject(
    payments.find(item => String(getVtbPaymentObject(item)?.paymentData?.type || '').toLowerCase() === 'sbp')
    || payments[0]
  )

  return {
    requestId,
    qrId,
    qrStatus: order.status?.value,
    transactionState: payment?.status?.value || payment?.status,
    paymentId: String(payment?.paymentId || '').trim() || null,
    amount: Number(payment?.amount?.value ?? payment?.paymentData?.amount?.value ?? order.amount?.value ?? 0) || null,
    raw: data
  }
}

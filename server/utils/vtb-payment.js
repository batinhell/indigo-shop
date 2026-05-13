const DEFAULT_BASE_URL = 'https://vtb.rbsuat.com/payment/rest/'
const DEFAULT_QR_TTL_SECONDS = 900
const PAID_QR_STATUSES = new Set(['ACCEPTED', 'ACWP'])
const FAILED_QR_STATUSES = new Set(['REJECTED', 'RJCT', 'REJECTED_BY_USER'])

const readEnv = name => process.env[name]?.trim() ?? ''

function readConfigValue(config, key, envName) {
  return readEnv(envName) || config.vtbPayment?.[key] || ''
}

function getVtbPaymentConfig() {
  const config = useRuntimeConfig()
  const baseUrl = readConfigValue(config, 'baseUrl', 'VTB_PAYMENT_BASE_URL') || DEFAULT_BASE_URL
  const qrTtlSeconds = Number(readConfigValue(config, 'qrTtlSeconds', 'VTB_PAYMENT_QR_TTL_SECONDS'))

  return {
    baseUrl: baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`,
    token: readConfigValue(config, 'token', 'VTB_PAYMENT_TOKEN'),
    userName: readConfigValue(config, 'userName', 'VTB_PAYMENT_USERNAME'),
    password: readConfigValue(config, 'password', 'VTB_PAYMENT_PASSWORD'),
    returnUrl: readConfigValue(config, 'returnUrl', 'VTB_PAYMENT_RETURN_URL'),
    failUrl: readConfigValue(config, 'failUrl', 'VTB_PAYMENT_FAIL_URL'),
    callbackUrl: readConfigValue(config, 'callbackUrl', 'VTB_PAYMENT_CALLBACK_URL'),
    qrTtlSeconds: Number.isFinite(qrTtlSeconds) && qrTtlSeconds > 0 ? qrTtlSeconds : DEFAULT_QR_TTL_SECONDS
  }
}

function getAuthParams(config) {
  if (config.token) {
    return { token: config.token }
  }

  return getPasswordAuthParams(config)
}

function getPasswordAuthParams(config) {
  if (config.userName && config.password) {
    return {
      userName: config.userName,
      password: config.password
    }
  }

  throw createError({
    statusCode: 500,
    statusMessage: 'VTB payment is not configured',
    message: 'Не настроены реквизиты ВТБ для оплаты'
  })
}

function assertReturnUrls(config) {
  if (!config.returnUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'VTB return URL is not configured',
      message: 'Не настроен VTB_PAYMENT_RETURN_URL'
    })
  }
}

async function requestVtb(method, params, options = {}) {
  const config = getVtbPaymentConfig()
  const body = new URLSearchParams()
  const authParams = options.requirePasswordAuth
    ? getPasswordAuthParams(config)
    : getAuthParams(config)

  for (const [key, value] of Object.entries({ ...authParams, ...params })) {
    if (value !== undefined && value !== null && value !== '') {
      body.append(key, String(value))
    }
  }

  const response = await fetch(`${config.baseUrl}${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  })

  const text = await response.text()
  let data

  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    data = { raw: text }
  }

  if (!response.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: 'VTB request failed',
      message: `ВТБ вернул HTTP ${response.status}`,
      data
    })
  }

  return data
}

function assertVtbSuccess(data, fallbackMessage) {
  const hasErrorCode = data?.errorCode !== undefined && data?.errorCode !== null
  const isError = data?.success === false || (hasErrorCode && String(data.errorCode) !== '0')

  if (isError) {
    throw createError({
      statusCode: 502,
      statusMessage: 'VTB payment failed',
      message: data?.errorMessage || fallbackMessage,
      data
    })
  }
}

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

export function getVtbQrExpiresAt() {
  const config = getVtbPaymentConfig()
  return new Date(Date.now() + config.qrTtlSeconds * 1000)
}

export async function registerVtbOrder({ orderNumber, amountMinor, description, ip }) {
  const config = getVtbPaymentConfig()
  assertReturnUrls(config)

  const data = await requestVtb('register.do', {
    orderNumber,
    amount: amountMinor,
    currency: '643',
    returnUrl: config.returnUrl,
    failUrl: config.failUrl,
    dynamicCallbackUrl: config.callbackUrl,
    description,
    language: 'ru',
    ip
  })

  assertVtbSuccess(data, 'Не удалось зарегистрировать заказ в ВТБ')

  if (!data.orderId) {
    throw createError({
      statusCode: 502,
      statusMessage: 'VTB order id is missing',
      message: 'ВТБ не вернул идентификатор заказа',
      data
    })
  }

  return data
}

export async function getVtbDynamicQr(mdOrder) {
  const data = await requestVtb('sbp/c2b/qr/dynamic/get.do', {
    mdOrder,
    qrHeight: 512,
    qrWidth: 512,
    qrFormat: 'image'
  }, {
    requirePasswordAuth: true
  })

  assertVtbSuccess(data, 'Не удалось получить QR-код СБП')

  if (!data.qrId || (!data.renderedQr && !data.payload)) {
    throw createError({
      statusCode: 502,
      statusMessage: 'VTB QR payload is missing',
      message: 'ВТБ не вернул данные QR-кода',
      data
    })
  }

  return data
}

export async function getVtbDynamicQrStatus({ mdOrder, qrId }) {
  const data = await requestVtb('sbp/c2b/qr/status.do', {
    mdOrder,
    qrId
  }, {
    requirePasswordAuth: true
  })

  assertVtbSuccess(data, 'Не удалось получить статус QR-кода СБП')

  return data
}

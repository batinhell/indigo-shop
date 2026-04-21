const DEFAULT_API_BASE_URL = 'https://one-api.notificore.ru'
const DEFAULT_AUTH_TIMEOUT_MS = 20000
const DEFAULT_OTP_TIMEOUT_MS = 30000
const DEFAULT_VERIFY_TIMEOUT_MS = 20000

const readEnv = name => process.env[name]?.trim() ?? ''

const readNumber = (value, fallback) => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : fallback
}

const readPositiveNumber = (value, fallback) => {
  const numberValue = readNumber(value, fallback)
  return numberValue > 0 ? numberValue : fallback
}

const getRuntimeString = value => (
  typeof value === 'string' ? value.trim() : ''
)

const getNotificoreConfig = () => {
  const config = useRuntimeConfig()
  const notificore = config.notificore ?? {}

  const apiKey = getRuntimeString(notificore.apiKey) || readEnv('NOTIFICORE_API_KEY')
  const sender = getRuntimeString(notificore.sender) || readEnv('NOTIFICORE_OTP_SENDER')
  const otpTemplateId = getRuntimeString(notificore.otpTemplateId) || readEnv('NOTIFICORE_OTP_TEMPLATE_ID')
  const templateId = readNumber(otpTemplateId, Number.NaN)
  const apiBaseUrl = (
    getRuntimeString(notificore.apiBaseUrl)
    || readEnv('NOTIFICORE_API_BASE_URL')
    || DEFAULT_API_BASE_URL
  ).replace(/\/$/, '')

  if (!apiKey || !sender || !Number.isInteger(templateId)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Notificore is not configured',
      message: 'Missing NOTIFICORE_API_KEY, NOTIFICORE_OTP_SENDER or integer NOTIFICORE_OTP_TEMPLATE_ID'
    })
  }

  return {
    apiKey,
    apiBaseUrl,
    sender,
    otpTemplateId: templateId,
    codeDigits: readNumber(notificore.codeDigits || readEnv('NOTIFICORE_OTP_CODE_DIGITS'), 5),
    codeLifetime: readNumber(notificore.codeLifetime || readEnv('NOTIFICORE_OTP_CODE_LIFETIME'), 300),
    codeMaxTries: readNumber(notificore.codeMaxTries || readEnv('NOTIFICORE_OTP_CODE_MAX_TRIES'), 3),
    authTimeout: readPositiveNumber(
      notificore.authTimeout || readEnv('NOTIFICORE_AUTH_TIMEOUT_MS'),
      DEFAULT_AUTH_TIMEOUT_MS
    ),
    otpTimeout: readPositiveNumber(
      notificore.otpTimeout || readEnv('NOTIFICORE_OTP_TIMEOUT_MS'),
      DEFAULT_OTP_TIMEOUT_MS
    ),
    verifyTimeout: readPositiveNumber(
      notificore.verifyTimeout || readEnv('NOTIFICORE_VERIFY_TIMEOUT_MS'),
      DEFAULT_VERIFY_TIMEOUT_MS
    )
  }
}

const fetchNotificoreBearer = async (config) => {
  const response = await $fetch(`${config.apiBaseUrl}/api/auth/login`, {
    method: 'POST',
    timeout: config.authTimeout,
    body: {
      api_key: config.apiKey
    }
  })

  if (!response.bearer) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Notificore auth failed',
      message: 'Notificore did not return bearer token'
    })
  }

  return response.bearer
}

export const sendNotificoreOtp = async ({ phone }) => {
  const config = getNotificoreConfig()
  const bearer = await fetchNotificoreBearer(config)

  return await $fetch(`${config.apiBaseUrl}/api/2fa/authentications/otp`, {
    method: 'POST',
    timeout: config.otpTimeout,
    headers: {
      Authorization: `Bearer ${bearer}`
    },
    body: {
      recipient: phone,
      channel: 'sms',
      sender: config.sender,
      template_id: config.otpTemplateId,
      code_digits: config.codeDigits,
      code_lifetime: config.codeLifetime,
      code_max_tries: config.codeMaxTries
    }
  })
}

export const verifyNotificoreOtp = async ({ authenticationId, code }) => {
  const config = getNotificoreConfig()
  const bearer = await fetchNotificoreBearer(config)

  return await $fetch(
    `${config.apiBaseUrl}/api/2fa/authentications/otp/${encodeURIComponent(authenticationId)}/verify`,
    {
      method: 'POST',
      timeout: config.verifyTimeout,
      headers: {
        Authorization: `Bearer ${bearer}`
      },
      body: {
        access_code: code
      }
    }
  )
}

export const isNotificoreTimeoutError = error => (
  error?.name === 'TimeoutError'
  || error?.code === 23
  || error?.cause?.name === 'TimeoutError'
  || error?.cause?.code === 23
)

const DEFAULT_API_BASE_URL = 'https://api.notificore.ru'
const DEFAULT_ONE_API_BASE_URL = 'https://one-api.notificore.ru'
const DEFAULT_EMAIL_API_BASE_URL = DEFAULT_ONE_API_BASE_URL
const DEFAULT_AUTH_TIMEOUT_MS = 20000
const DEFAULT_OTP_TIMEOUT_MS = 30000
const DEFAULT_VERIFY_TIMEOUT_MS = 20000
const DEFAULT_EMAIL_TIMEOUT_MS = 20000

const stripWrappingQuotes = value => (
  value.length >= 2 && (
    (value.startsWith('"') && value.endsWith('"'))
    || (value.startsWith('\'') && value.endsWith('\''))
  )
    ? value.slice(1, -1).trim()
    : value
)

const readEnv = name => stripWrappingQuotes(process.env[name]?.trim() ?? '')

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

const normalizeOneApiBaseUrl = value => value
  .replace(/^http:\/\/one-api\.notificore\.ru/i, 'https://one-api.notificore.ru')
  .replace(/\/$/, '')

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
  const oneApiBaseUrl = normalizeOneApiBaseUrl(
    getRuntimeString(notificore.oneApiBaseUrl)
    || readEnv('NOTIFICORE_ONE_API_BASE_URL')
    || DEFAULT_ONE_API_BASE_URL
  )

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Notificore is not configured',
      message: 'Missing NOTIFICORE_API_KEY'
    })
  }

  if (!sender || !Number.isInteger(templateId)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Notificore is not configured',
      message: 'Missing NOTIFICORE_OTP_SENDER or integer NOTIFICORE_OTP_TEMPLATE_ID'
    })
  }

  return {
    apiKey,
    apiBaseUrl,
    oneApiBaseUrl,
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

const fetchNotificoreBearer = async ({ apiKey, apiBaseUrl, timeout, scope }) => {
  const response = await $fetch(`${apiBaseUrl}/api/auth/login`, {
    method: 'POST',
    timeout,
    body: {
      api_key: apiKey
    }
  })

  if (!response.bearer) {
    throw createError({
      statusCode: 502,
      statusMessage: `Notificore ${scope} auth failed`,
      message: `Notificore ${scope} auth did not return bearer token`
    })
  }

  return response.bearer
}

const parseMaybeJson = (value) => {
  if (typeof value !== 'string') {
    return value
  }

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export const getNotificoreAuthenticationPayload = (result) => {
  const parsedResult = parseMaybeJson(result)
  return parseMaybeJson(parsedResult?.data ?? parsedResult?.result ?? parsedResult) ?? {}
}

export const getNotificoreAuthenticationId = data => (
  data.id
  ?? data.authenticationId
  ?? data.authentication_id
  ?? data.authId
  ?? data.auth_id
  ?? data.uuid
  ?? null
)

export const assertSuccessfulNotificoreOtpResponse = (data) => {
  const error = String(data.error ?? '').trim()

  if (error && error !== '0') {
    throw createError({
      statusCode: 502,
      statusMessage: 'Notificore request failed',
      message: data.errorDescription || data.error_description || 'Не удалось отправить код подтверждения'
    })
  }

  if (!getNotificoreAuthenticationId(data)) {
    console.error('[notificore/otp] Authentication id is missing in response:', data)

    throw createError({
      statusCode: 502,
      statusMessage: 'Notificore request failed',
      message: 'Не удалось получить код подтверждения'
    })
  }
}

const buildNotificoreOtpBody = ({ config, recipient, stringifyValues = false }) => {
  const formatValue = value => stringifyValues ? String(value) : value

  return {
    recipient,
    channel: 'sms',
    sender: config.sender,
    template_id: formatValue(config.otpTemplateId),
    code_digits: formatValue(config.codeDigits),
    code_lifetime: formatValue(config.codeLifetime),
    code_max_tries: formatValue(config.codeMaxTries)
  }
}

const sendNotificoreOneApiOtp = async ({ config, recipient }) => {
  const bearer = await fetchNotificoreBearer({
    apiKey: config.apiKey,
    apiBaseUrl: config.oneApiBaseUrl,
    timeout: config.authTimeout,
    scope: 'otp'
  })
  const url = `${config.oneApiBaseUrl}/api/2fa/authentications/otp`
  const body = buildNotificoreOtpBody({ config, recipient })

  console.info('[notificore/otp/one-api] Request:', {
    method: 'POST',
    url,
    headers: {
      Authorization: 'Bearer <redacted>',
      ContentType: 'application/json'
    },
    body
  })

  try {
    const response = await $fetch.raw(url, {
      method: 'POST',
      timeout: config.otpTimeout,
      headers: {
        'Authorization': `Bearer ${bearer}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body
    })
    const headers = Object.fromEntries(response.headers.entries())

    console.info('[notificore/otp/one-api] Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: {
        contentType: headers['content-type'],
        contentLength: headers['content-length']
      },
      data: response._data
    })

    return response._data
  } catch (error) {
    console.error('[notificore/otp/one-api] Response error:', {
      status: error?.status || error?.statusCode,
      statusMessage: error?.statusMessage,
      data: error?.data
    })

    throw error
  }
}

const sendNotificoreLegacyOtp = async ({ config, recipient }) => {
  const url = `${config.apiBaseUrl}/api/2fa/authentications/otp`
  const body = buildNotificoreOtpBody({ config, recipient, stringifyValues: true })

  console.info('[notificore/otp] Request:', {
    method: 'POST',
    url,
    headers: {
      'X-API-KEY': config.apiKey,
      'ContentType': 'application/json'
    },
    body
  })

  try {
    const response = await $fetch.raw(url, {
      method: 'POST',
      timeout: config.otpTimeout,
      headers: {
        'X-API-KEY': config.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body
    })
    const headers = Object.fromEntries(response.headers.entries())

    console.info('[notificore/otp] Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: {
        contentType: headers['content-type'],
        contentLength: headers['content-length']
      },
      data: response._data
    })

    return response._data
  } catch (error) {
    console.error('[notificore/otp] Response error:', {
      status: error?.status || error?.statusCode,
      statusMessage: error?.statusMessage,
      data: error?.data
    })

    throw error
  }
}

export const sendNotificoreOtp = async ({ phone }) => {
  const config = getNotificoreConfig()
  const recipient = String(phone ?? '').replace(/\D/g, '')

  try {
    return await sendNotificoreOneApiOtp({ config, recipient })
  } catch (error) {
    console.error('[notificore/otp] One API failed, falling back to legacy API:', {
      status: error?.status || error?.statusCode,
      statusMessage: error?.statusMessage,
      data: error?.data
    })
  }

  return await sendNotificoreLegacyOtp({ config, recipient })
}

export const verifyNotificoreOtp = async ({ authenticationId, code }) => {
  const config = getNotificoreConfig()

  try {
    const bearer = await fetchNotificoreBearer({
      apiKey: config.apiKey,
      apiBaseUrl: config.oneApiBaseUrl,
      timeout: config.authTimeout,
      scope: 'otp'
    })

    return await $fetch(
      `${config.oneApiBaseUrl}/api/2fa/authentications/otp/${encodeURIComponent(authenticationId)}/verify`,
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
  } catch (error) {
    console.error('[notificore/otp/one-api/verify] Response error, falling back to legacy API:', {
      status: error?.status || error?.statusCode,
      statusMessage: error?.statusMessage,
      data: error?.data
    })
  }

  return await $fetch(
    `${config.apiBaseUrl}/api/2fa/authentications/otp/${encodeURIComponent(authenticationId)}/verify`,
    {
      method: 'POST',
      timeout: config.verifyTimeout,
      headers: {
        'X-API-KEY': config.apiKey
      },
      body: {
        access_code: code
      }
    }
  )
}

const getNotificoreEmailConfig = () => {
  const config = useRuntimeConfig()
  const notificore = config.notificore ?? {}

  const apiKey = (
    getRuntimeString(notificore.emailApiKey)
    || readEnv('NOTIFICORE_EMAIL_API_KEY')
    || getRuntimeString(notificore.apiKey)
    || readEnv('NOTIFICORE_API_KEY')
  )
  const from = getRuntimeString(notificore.emailFrom) || readEnv('NOTIFICORE_EMAIL_FROM')
  const emailTemplateId = (
    getRuntimeString(notificore.confirmationEmailTemplateId)
    || readEnv('NOTIFICORE_CONFIRMATION_EMAIL_TEMPLATE_ID')
    || getRuntimeString(notificore.emailTemplateId)
    || readEnv('NOTIFICORE_EMAIL_TEMPLATE_ID')
  )
  const templateId = readNumber(emailTemplateId, Number.NaN)
  const apiBaseUrl = (
    getRuntimeString(notificore.emailApiBaseUrl)
    || readEnv('NOTIFICORE_EMAIL_API_BASE_URL')
    || DEFAULT_EMAIL_API_BASE_URL
  )

  if (!apiKey || !from || !Number.isInteger(templateId)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Notificore email is not configured',
      message: 'Missing NOTIFICORE_EMAIL_API_KEY/NOTIFICORE_API_KEY, NOTIFICORE_EMAIL_FROM or integer NOTIFICORE_CONFIRMATION_EMAIL_TEMPLATE_ID'
    })
  }

  return {
    apiKey,
    from,
    templateId,
    apiBaseUrl: normalizeOneApiBaseUrl(apiBaseUrl),
    emailTimeout: readPositiveNumber(
      notificore.emailTimeout || readEnv('NOTIFICORE_EMAIL_TIMEOUT_MS'),
      DEFAULT_EMAIL_TIMEOUT_MS
    )
  }
}

export const sendNotificoreEmail = async ({ to, subject, templateContent = {}, inlines = [] }) => {
  const config = getNotificoreEmailConfig()
  const bearer = await fetchNotificoreBearer({
    apiKey: config.apiKey,
    apiBaseUrl: config.apiBaseUrl,
    timeout: config.emailTimeout,
    scope: 'email'
  })
  const recipients = Array.isArray(to) ? to : [to]
  const payload = {
    to: recipients,
    from: config.from,
    template_id: config.templateId,
    subject,
    template_content: templateContent
  }

  if (inlines.length) {
    payload.inlines = inlines
  }

  const url = `${config.apiBaseUrl}/api/email/send-template-emails`
  console.info('[notificore/email] Send request:', {
    method: 'POST',
    url,
    headers: {
      Authorization: 'Bearer <redacted>'
    },
    body: payload
  })

  let response

  try {
    response = await $fetch.raw(url, {
      method: 'POST',
      timeout: config.emailTimeout,
      headers: {
        Authorization: `Bearer ${bearer}`
      },
      body: payload
    })
  } catch (error) {
    console.error('[notificore/email] Send failed:', {
      status: error?.status || error?.statusCode,
      statusMessage: error?.statusMessage,
      data: error?.data,
      request: {
        method: 'POST',
        url,
        headers: {
          Authorization: 'Bearer <redacted>'
        },
        body: payload
      }
    })

    throw error
  }

  return {
    status: response.status,
    statusText: response.statusText,
    data: response._data,
    to: recipients,
    from: config.from,
    templateId: config.templateId
  }
}

export const isNotificoreTimeoutError = error => (
  error?.name === 'TimeoutError'
  || error?.code === 23
  || error?.cause?.name === 'TimeoutError'
  || error?.cause?.code === 23
)

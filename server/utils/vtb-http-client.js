import { getVtbPaymentConfig } from './vtb-config.js'

let cachedAccessToken = null
let cachedAccessTokenExpiresAt = 0

function assertVtbCredentials(config) {
  if (config.clientId && config.clientSecret && config.headerClientId) return

  throw createError({
    statusCode: 500,
    statusMessage: 'VTB payment is not configured',
    message: 'Не настроены OAuth-реквизиты ВТБ для оплаты'
  })
}

async function parseFetchResponse(response) {
  const text = await response.text()

  try {
    return text ? JSON.parse(text) : {}
  } catch {
    return { raw: text }
  }
}

async function getVtbAccessToken(config) {
  assertVtbCredentials(config)

  if (cachedAccessToken && cachedAccessTokenExpiresAt > Date.now() + 10_000) {
    return cachedAccessToken
  }

  const body = new URLSearchParams()
  body.append('grant_type', 'client_credentials')
  body.append('client_id', config.clientId)
  body.append('client_secret', config.clientSecret)

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  })
  const data = await parseFetchResponse(response)

  if (!response.ok || !data?.access_token) {
    throw createError({
      statusCode: 502,
      statusMessage: 'VTB token request failed',
      message: data?.error_description || data?.error || `ВТБ не выдал access_token (HTTP ${response.status})`,
      data
    })
  }

  const expiresIn = Number(data.expires_in) || 170
  cachedAccessToken = data.access_token
  cachedAccessTokenExpiresAt = Date.now() + Math.max(30, expiresIn - 15) * 1000

  return cachedAccessToken
}

function buildVtbHeaders(config, accessToken) {
  const headers = {
    'X-IBM-Client-Id': config.headerClientId,
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }

  if (config.merchantAuthorization) {
    headers['Merchant-Authorization'] = config.merchantAuthorization
  }

  return headers
}

export async function requestVtbSbp(path, body) {
  const config = getVtbPaymentConfig()
  const accessToken = await getVtbAccessToken(config)
  const response = await fetch(`${config.sbpBaseUrl}${path.replace(/^\/+/, '')}`, {
    method: 'POST',
    headers: buildVtbHeaders(config, accessToken),
    body: JSON.stringify(body)
  })
  const data = await parseFetchResponse(response)

  if (!response.ok) {
    if (response.status === 401) {
      cachedAccessToken = null
      cachedAccessTokenExpiresAt = 0
    }

    throw createError({
      statusCode: 502,
      statusMessage: 'VTB request failed',
      message: data?.message || data?.errorMessage || `ВТБ вернул HTTP ${response.status}`,
      data
    })
  }

  return data
}

import { readFileSync } from 'node:fs'
import { request as httpsRequest } from 'node:https'

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

function getVtbTlsOptions() {
  const caPath = process.env.VTB_PAYMENT_CA_CERTS_PATH || process.env.NODE_EXTRA_CA_CERTS
  const allowPartialTrustChain = ['1', 'true', 'yes'].includes(String(process.env.VTB_PAYMENT_TLS_ALLOW_PARTIAL_CHAIN || '').toLowerCase())

  if (!caPath && !allowPartialTrustChain) return null

  return {
    ...(caPath ? { ca: readFileSync(caPath) } : {}),
    ...(allowPartialTrustChain ? { allowPartialTrustChain: true } : {})
  }
}

function requestVtbWithHttps(url, options, tlsOptions) {
  return new Promise((resolve, reject) => {
    const body = options?.body == null ? null : String(options.body)
    const headers = { ...(options?.headers || {}) }

    if (body && !headers['Content-Length']) {
      headers['Content-Length'] = Buffer.byteLength(body)
    }

    const request = httpsRequest(url, {
      method: options?.method || 'GET',
      headers,
      ...tlsOptions
    }, (response) => {
      const chunks = []

      response.on('data', chunk => chunks.push(chunk))
      response.on('end', () => {
        const responseHeaders = new Headers()

        for (const [key, value] of Object.entries(response.headers)) {
          if (Array.isArray(value)) {
            for (const item of value) responseHeaders.append(key, item)
          } else if (value != null) {
            responseHeaders.set(key, String(value))
          }
        }

        resolve(new Response(Buffer.concat(chunks), {
          status: response.statusCode || 0,
          statusText: response.statusMessage || '',
          headers: responseHeaders
        }))
      })
    })

    request.on('error', reject)
    request.end(body)
  })
}

async function fetchVtb(url, options, fallbackMessage) {
  try {
    const tlsOptions = getVtbTlsOptions()

    return tlsOptions ? await requestVtbWithHttps(url, options, tlsOptions) : await fetch(url, options)
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: 'VTB network request failed',
      message: `${fallbackMessage}: ${error?.cause?.message || error?.message || 'network error'}`,
      data: {
        url,
        code: error?.cause?.code || error?.code || null
      }
    })
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

  const response = await fetchVtb(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  }, 'Не удалось подключиться к OAuth ВТБ')
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

async function requestVtbApi(baseUrl, path, options = {}) {
  const config = getVtbPaymentConfig()
  const accessToken = await getVtbAccessToken(config)
  const method = options.method || 'POST'
  const body = options.body === undefined ? undefined : JSON.stringify(options.body)
  const url = `${baseUrl}${path.replace(/^\/+/, '')}`
  const response = await fetchVtb(url, {
    method,
    headers: buildVtbHeaders(config, accessToken),
    ...(body === undefined ? {} : { body })
  }, 'Не удалось подключиться к API ВТБ')
  const data = await parseFetchResponse(response)

  if (!response.ok) {
    if (response.status === 401) {
      cachedAccessToken = null
      cachedAccessTokenExpiresAt = 0
    }

    throw createError({
      statusCode: 502,
      statusMessage: 'VTB request failed',
      message: data?.message || data?.errorMessage || data?.error?.description || data?.error || `ВТБ вернул HTTP ${response.status}`,
      data
    })
  }

  return data
}

export async function requestVtbSbp(path, body) {
  const config = getVtbPaymentConfig()
  return requestVtbApi(config.sbpBaseUrl, path, { method: 'POST', body })
}

export async function requestVtbEcommerce(path, options = {}) {
  const config = getVtbPaymentConfig()
  return requestVtbApi(config.ecommerceBaseUrl, path, options)
}

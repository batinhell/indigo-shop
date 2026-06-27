const DEFAULT_SBP_BASE_URL = 'https://test3.api.vtb.ru:8443/openapi/smb/efcp/sbp-gateway/v1/'
const DEFAULT_TOKEN_URL = 'https://epa-ift-sbp.vtb.ru:443/passport/oauth2/token'
const DEFAULT_QR_TTL_SECONDS = 1200

const readEnv = name => process.env[name]?.trim() ?? ''

function readConfigValue(config, key, envName) {
  return readEnv(envName) || config.vtbPayment?.[key] || ''
}

function normalizeBaseUrl(value) {
  return value.endsWith('/') ? value : `${value}/`
}

function getVtbHeaderClientId(clientId) {
  return String(clientId || '')
    .trim()
    .toLowerCase()
    .replace(/@ext\.vtb\.ru$/i, '')
}

export function isVtbPaymentMockEnabled() {
  const mode = readEnv('VTB_PAYMENT_MODE').toLowerCase()
  const mock = readEnv('VTB_PAYMENT_MOCK').toLowerCase()

  return mode === 'mock' || ['1', 'true', 'yes', 'on'].includes(mock)
}

export function getMockPaymentStatus() {
  const status = readEnv('VTB_PAYMENT_MOCK_STATUS').toLowerCase()
  return ['pending', 'paid', 'failed'].includes(status) ? status : 'pending'
}

export function getVtbPaymentConfig() {
  const config = useRuntimeConfig()
  const sbpBaseUrl = readConfigValue(config, 'sbpBaseUrl', 'VTB_PAYMENT_SBP_BASE_URL') || DEFAULT_SBP_BASE_URL
  const tokenUrl = readConfigValue(config, 'tokenUrl', 'VTB_PAYMENT_TOKEN_URL') || DEFAULT_TOKEN_URL
  const clientId = readConfigValue(config, 'clientId', 'VTB_PAYMENT_CLIENT_ID')
  const headerClientId = readConfigValue(config, 'headerClientId', 'VTB_PAYMENT_HEADER_CLIENT_ID') || getVtbHeaderClientId(clientId)
  const qrTtlSeconds = Number(readConfigValue(config, 'qrTtlSeconds', 'VTB_PAYMENT_QR_TTL_SECONDS'))

  return {
    sbpBaseUrl: normalizeBaseUrl(sbpBaseUrl),
    tokenUrl,
    clientId,
    clientSecret: readConfigValue(config, 'clientSecret', 'VTB_PAYMENT_CLIENT_SECRET'),
    headerClientId,
    merchantAuthorization: readConfigValue(config, 'merchantAuthorization', 'VTB_PAYMENT_MERCHANT_AUTHORIZATION'),
    returnUrl: readConfigValue(config, 'returnUrl', 'VTB_PAYMENT_RETURN_URL'),
    qrTtlSeconds: Number.isFinite(qrTtlSeconds) && qrTtlSeconds > 0 ? qrTtlSeconds : DEFAULT_QR_TTL_SECONDS
  }
}

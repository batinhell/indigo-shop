const FISCAL_RECEIPT_STATUS = {
  SENDING: 'sending',
  FAILED: 'failed',
  QUEUED: 'queued'
}

const DEFAULT_BASE_URL = 'https://kkm.rarus-cloud.ru'
const DEFAULT_API_VERSION = '1.1.7'
const DEFAULT_INN = '6234117358'
const DEFAULT_TAX_SYSTEM = 'OSN'
const DEFAULT_TAX = 'none'
const DEFAULT_SIGN_METHOD_CALCULATION = 'full_prepayment'
const DEFAULT_SIGN_CALCULATION_OBJECT = 'commodity'
const DEFAULT_TAG_1011 = 2

const readEnv = name => process.env[name]?.trim() ?? ''

function readConfigValue(config, key, envName) {
  return readEnv(envName) || config.rarusKkt?.[key] || ''
}

function getRarusKktConfig() {
  const config = useRuntimeConfig()
  const baseUrl = readConfigValue(config, 'baseUrl', 'RARUS_KKT_BASE_URL') || DEFAULT_BASE_URL
  const apiVersion = readConfigValue(config, 'apiVersion', 'RARUS_KKT_API_VERSION') || DEFAULT_API_VERSION

  return {
    baseUrl: baseUrl.replace(/\/+$/, ''),
    apiVersion,
    apiKey: readConfigValue(config, 'apiKey', 'RARUS_KKT_API_KEY'),
    inn: readConfigValue(config, 'inn', 'RARUS_KKT_INN') || DEFAULT_INN,
    taxSystem: readConfigValue(config, 'taxSystem', 'RARUS_KKT_TAX_SYSTEM') || DEFAULT_TAX_SYSTEM,
    tax: readConfigValue(config, 'tax', 'RARUS_KKT_TAX') || DEFAULT_TAX,
    paymentAddress: readConfigValue(config, 'paymentAddress', 'RARUS_KKT_PAYMENT_ADDRESS'),
    paymentPlace: readConfigValue(config, 'paymentPlace', 'RARUS_KKT_PAYMENT_PLACE'),
    senderEmail: readConfigValue(config, 'senderEmail', 'RARUS_KKT_SENDER_EMAIL'),
    signMethodCalculation: readConfigValue(config, 'signMethodCalculation', 'RARUS_KKT_SIGN_METHOD_CALCULATION') || DEFAULT_SIGN_METHOD_CALCULATION,
    signCalculationObject: readConfigValue(config, 'signCalculationObject', 'RARUS_KKT_SIGN_CALCULATION_OBJECT') || DEFAULT_SIGN_CALCULATION_OBJECT,
    tag1011: Number(readConfigValue(config, 'tag1011', 'RARUS_KKT_TAG_1011')) || DEFAULT_TAG_1011,
    enabled: !['0', 'false', 'no', 'off'].includes(readEnv('RARUS_KKT_ENABLED').toLowerCase())
  }
}

function parseJson(value) {
  if (!value) return null
  if (typeof value === 'object') return value

  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function normalizePhone(value) {
  const raw = String(value || '').trim()
  if (!raw) return ''

  const digits = raw.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('8')) return `+7${digits.slice(1)}`
  if (digits.length === 11 && digits.startsWith('7')) return `+${digits}`
  if (digits.length === 10) return `+7${digits}`
  if (raw.startsWith('+') && digits.length >= 10) return `+${digits}`

  return ''
}

function getReceiptContact(order) {
  const payload = parseJson(order.payload) || {}
  const checkout = payload.checkout || {}
  const email = String(checkout.customer?.email || '').trim()

  if (email) {
    return { email }
  }

  const phone = normalizePhone(checkout.customer?.phone || checkout.recipient?.phone)
  return phone ? { phone } : {}
}

function createReceiptId(order) {
  return `INDIGO-ORDER-${order.id}`.slice(0, 40)
}

function toMoney(value) {
  const amount = Number(value)
  return Number.isFinite(amount) && amount > 0 ? Math.round(amount * 100) / 100 : 0
}

async function getReceiptItems(database, orderId, config) {
  const items = await database
    .selectFrom('site_order_items')
    .select(['name', 'quantity', 'unit_price', 'design_price', 'total'])
    .where('site_order_id', '=', orderId)
    .execute()

  if (!items.length) {
    return []
  }

  return items.flatMap((item) => {
    const quantity = Math.max(1, Number(item.quantity) || 1)
    const unitPrice = toMoney(item.unit_price)
    const designPrice = toMoney(item.design_price)
    const rows = []

    if (unitPrice) {
      rows.push({
        name: String(item.name || 'Товар').slice(0, 128),
        price: unitPrice,
        quantity,
        sum: toMoney(unitPrice * quantity),
        tax: config.tax,
        sign_method_calculation: config.signMethodCalculation,
        sign_calculation_object: config.signCalculationObject
      })
    }

    if (designPrice) {
      rows.push({
        name: `Дизайн: ${String(item.name || 'позиция').slice(0, 120)}`,
        price: designPrice,
        quantity: 1,
        sum: designPrice,
        tax: config.tax,
        sign_method_calculation: config.signMethodCalculation,
        sign_calculation_object: 'service'
      })
    }

    return rows
  })
}

async function requestRarusKkt(config, receipt) {
  const response = await fetch(`${config.baseUrl}/${config.apiVersion}/document`, {
    method: 'POST',
    headers: {
      'API-KEY': config.apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(receipt)
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
      statusMessage: 'Rarus KKT request failed',
      message: `Rarus KKT вернул HTTP ${response.status}`,
      data
    })
  }

  return data
}

async function claimFiscalReceipt(database, orderId) {
  const result = await database
    .updateTable('site_orders')
    .set({
      fiscal_receipt_status: FISCAL_RECEIPT_STATUS.SENDING,
      fiscal_receipt_error: null,
      updated_at: new Date()
    })
    .where('id', '=', orderId)
    .where('fiscal_receipt_operation_id', 'is', null)
    .where((eb) => eb.or([
      eb('fiscal_receipt_status', 'is', null),
      eb('fiscal_receipt_status', '=', ''),
      eb('fiscal_receipt_status', '=', FISCAL_RECEIPT_STATUS.FAILED)
    ]))
    .executeTakeFirst()

  return Number(result.numUpdatedRows ?? 0) > 0
}

async function saveFiscalReceiptFailure(database, orderId, error) {
  await database
    .updateTable('site_orders')
    .set({
      fiscal_receipt_status: FISCAL_RECEIPT_STATUS.FAILED,
      fiscal_receipt_error: error?.data ? JSON.stringify(error.data) : error?.message || 'Fiscal receipt failed',
      updated_at: new Date()
    })
    .where('id', '=', orderId)
    .where('fiscal_receipt_status', '=', FISCAL_RECEIPT_STATUS.SENDING)
    .execute()
}

export async function sendFiscalReceiptForPaidOrder(database, order) {
  if (!order || order.payment_status !== 'paid') return null
  if (order.fiscal_receipt_operation_id) return null
  if (order.fiscal_receipt_status && order.fiscal_receipt_status !== FISCAL_RECEIPT_STATUS.FAILED) return null

  const config = getRarusKktConfig()
  if (!config.enabled || !config.apiKey) return null

  const orderId = Number(order.id)
  if (!await claimFiscalReceipt(database, orderId)) return null

  try {
    const contact = getReceiptContact(order)
    if (!contact.email && !contact.phone) {
      throw new Error('Missing customer email or phone for fiscal receipt')
    }

    const items = await getReceiptItems(database, orderId, config)
    const total = toMoney(order.amount)

    if (!items.length || !total) {
      throw new Error('Missing fiscal receipt items or amount')
    }

    const timestamp = Math.floor(Date.now() / 1000)
    const receipt = {
      id: createReceiptId(order),
      doc_type: 'sale',
      timestamp_utc: timestamp,
      timestamp_local: timestamp,
      ...contact,
      tax_system: config.taxSystem,
      inn: config.inn,
      payment_address: config.paymentAddress || undefined,
      payment_place: config.paymentPlace || undefined,
      senderEmail: config.senderEmail || undefined,
      tag_1125: 1,
      tag_1011: config.tag1011,
      items,
      total
    }

    const data = await requestRarusKkt(config, receipt)
    const operation = data?.operation || {}

    await database
      .updateTable('site_orders')
      .set({
        fiscal_receipt_status: operation.status || FISCAL_RECEIPT_STATUS.QUEUED,
        fiscal_receipt_operation_id: operation.operation_id || null,
        fiscal_receipt_sent_at: new Date(),
        fiscal_receipt_error: null,
        updated_at: new Date()
      })
      .where('id', '=', orderId)
      .where('fiscal_receipt_status', '=', FISCAL_RECEIPT_STATUS.SENDING)
      .execute()

    return data
  } catch (error) {
    await saveFiscalReceiptFailure(database, orderId, error)
    return null
  }
}

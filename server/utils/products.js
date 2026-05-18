const ACTIVE_STATUS = 'active'
const SUPPORTED_RULE_TYPES = new Set([
  'base_price',
  'tier_price',
  'discount',
  'fixed_option',
  'percent_option',
  'multiplier'
])

function toNullableString(value) {
  return value == null ? null : String(value)
}

function parseJsonValue(value) {
  if (value == null || value === '') return null
  if (typeof value === 'object') return value

  try {
    return JSON.parse(String(value))
  } catch {
    return null
  }
}

function parseDecimalToMinorUnits(value) {
  if (value == null || value === '') {
    return null
  }

  const normalized = String(value).trim().replace(',', '.')

  if (!/^-?\d+(\.\d{1,4})?$/.test(normalized)) {
    return null
  }

  return Math.round(Number(normalized) * 100)
}

function parseFactor(value) {
  if (value == null || value === '') {
    return null
  }

  const parsed = Number(String(value).trim().replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : null
}

function toMoneyResponse(minorUnits) {
  const amount = minorUnits / 100
  return Number.isInteger(amount) ? amount : Number(amount.toFixed(2))
}

function assertProductsTableExists(error) {
  const tableMissingCodes = new Set(['ER_NO_SUCH_TABLE', 'ER_BAD_TABLE_ERROR'])

  if (tableMissingCodes.has(error?.code)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Products table is not configured',
      message: 'В базе ещё нет таблиц products/product_price_rules. Примените migration 003_create_product_tables.sql.'
    })
  }

  throw error
}

function mapPriceRule(rule) {
  return {
    id: Number(rule.id),
    type: rule.type,
    key: toNullableString(rule.key),
    label: rule.label,
    size: toNullableString(rule.size),
    conditions: parseJsonValue(rule.conditions),
    min_quantity: rule.min_quantity == null ? null : Number(rule.min_quantity),
    max_quantity: rule.max_quantity == null ? null : Number(rule.max_quantity),
    price: rule.price == null ? null : String(rule.price),
    percent: rule.percent == null ? null : String(rule.percent),
    factor: rule.factor == null ? null : String(rule.factor),
    amount_scope: toNullableString(rule.amount_scope) ?? 'per_unit',
    is_active: Boolean(rule.is_active ?? true),
    sort: Number(rule.sort ?? 0)
  }
}

function mapProduct(product, priceRules) {
  return {
    id: Number(product.id),
    category: product.category,
    name: product.name,
    slug: product.slug,
    status: product.status,
    online_order_enabled: Boolean(product.online_order_enabled),
    calculator_type: toNullableString(product.calculator_type) ?? 'none',
    sort: Number(product.sort ?? 0),
    price_from: toNullableString(product.price_from),
    price_unit: toNullableString(product.price_unit),
    min_circulation: toNullableString(product.min_circulation),
    production_time: toNullableString(product.production_time),
    formats_sizes: toNullableString(product.formats_sizes),
    materials: toNullableString(product.materials),
    additional_options: toNullableString(product.additional_options),
    short_description: toNullableString(product.short_description),
    photo_url: toNullableString(product.photo_url),
    seo: {
      title: toNullableString(product.seo_title),
      description: toNullableString(product.seo_description)
    },
    price_rules: priceRules.map(mapPriceRule)
  }
}

async function listProductRules(database, productIds) {
  if (!productIds.length) {
    return new Map()
  }

  const rows = await database
    .selectFrom('product_price_rules')
    .select([
      'id',
      'product_id',
      'type',
      'key',
      'label',
      'size',
      'conditions',
      'min_quantity',
      'max_quantity',
      'price',
      'percent',
      'factor',
      'amount_scope',
      'is_active',
      'sort'
    ])
    .where('is_active', '=', true)
    .where('product_id', 'in', productIds)
    .orderBy('product_id', 'asc')
    .orderBy('sort', 'asc')
    .orderBy('id', 'asc')
    .execute()

  const grouped = new Map()

  for (const row of rows) {
    const key = Number(row.product_id)
    const current = grouped.get(key) ?? []
    current.push(row)
    grouped.set(key, current)
  }

  return grouped
}

export async function getProducts(database, category) {
  try {
    let query = database
      .selectFrom('products')
      .select([
        'id',
        'category',
        'name',
        'slug',
        'status',
        'online_order_enabled',
        'calculator_type',
        'sort',
        'price_from',
        'price_unit',
        'min_circulation',
        'production_time',
        'formats_sizes',
        'materials',
        'additional_options',
        'short_description',
        'photo_url',
        'seo_title',
        'seo_description'
      ])
      .where('status', '=', ACTIVE_STATUS)

    if (category) {
      query = query.where('category', '=', category)
    }

    const products = await query
      .orderBy('category', 'asc')
      .orderBy('name', 'asc')
      .execute()

    const productIds = products.map(product => Number(product.id))
    const rulesByProductId = await listProductRules(database, productIds)

    return products.map(product => mapProduct(
      product,
      rulesByProductId.get(Number(product.id)) ?? []
    ))
  } catch (error) {
    assertProductsTableExists(error)
  }
}

export async function getProductBySlug(database, slug) {
  try {
    const product = await database
      .selectFrom('products')
      .select([
        'id',
        'category',
        'name',
        'slug',
        'status',
        'online_order_enabled',
        'calculator_type',
        'sort',
        'price_from',
        'price_unit',
        'min_circulation',
        'production_time',
        'formats_sizes',
        'materials',
        'additional_options',
        'short_description',
        'photo_url',
        'seo_title',
        'seo_description'
      ])
      .where('slug', '=', slug)
      .where('status', '=', ACTIVE_STATUS)
      .executeTakeFirst()

    if (!product) {
      return null
    }

    const rulesByProductId = await listProductRules(database, [Number(product.id)])
    return mapProduct(
      product,
      rulesByProductId.get(Number(product.id)) ?? []
    )
  } catch (error) {
    assertProductsTableExists(error)
  }
}

function matchesQuantity(rule, quantity) {
  const min = rule.min_quantity == null ? null : Number(rule.min_quantity)
  const max = rule.max_quantity == null ? null : Number(rule.max_quantity)

  if (min != null && quantity < min) {
    return false
  }

  if (max != null && quantity > max) {
    return false
  }

  return true
}

function getPayloadOptionValues(payload, size) {
  const values = { size }
  const options = payload?.options

  if (Array.isArray(options)) {
    for (const key of options) {
      values[String(key)] = true
    }
  } else if (options && typeof options === 'object') {
    for (const [key, value] of Object.entries(options)) {
      values[key] = value
    }
  }

  return values
}

function matchesConditions(rule, optionValues) {
  const conditions = rule.conditions

  if (!conditions || typeof conditions !== 'object' || Array.isArray(conditions)) {
    return true
  }

  return Object.entries(conditions).every(([key, expected]) => {
    const actual = optionValues[key]

    if (typeof expected === 'boolean') {
      return Boolean(actual) === expected
    }

    return String(actual ?? '') === String(expected)
  })
}

function hasConditions(rule) {
  const conditions = rule.conditions
  return Boolean(
    conditions
    && typeof conditions === 'object'
    && !Array.isArray(conditions)
    && Object.keys(conditions).length
  )
}

function pickBasePriceRule(priceRules, quantity, size, optionValues) {
  const baseRules = priceRules.filter(rule => (
    rule.type === 'base_price'
    && matchesConditions(rule, optionValues)
  ))
  const tierRules = priceRules.filter(rule => (
    rule.type === 'tier_price'
    && matchesConditions(rule, optionValues)
  ))

  const hasSizedBaseRules = baseRules.some(rule => rule.size)
  let selectedBaseRule = null

  if (hasSizedBaseRules) {
    if (!size) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing product size',
        message: 'Для расчёта этого товара нужно передать size'
      })
    }

    selectedBaseRule = baseRules.find(rule => rule.size === size) ?? null
  } else {
    selectedBaseRule = baseRules[0] ?? null
  }

  if (!selectedBaseRule) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing base price rule',
      message: 'Для товара не настроена базовая цена'
    })
  }

  const basePrice = parseDecimalToMinorUnits(selectedBaseRule.price)

  if (basePrice == null) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid base price rule',
      message: 'У товара указано некорректное правило базовой цены'
    })
  }

  const matchingTierRules = tierRules.filter((rule) => {
    if (rule.size && rule.size !== size) {
      return false
    }

    if (rule.key && selectedBaseRule.key && rule.key !== selectedBaseRule.key) {
      return false
    }

    return matchesQuantity(rule, quantity)
  })

  const selectedTierRule = matchingTierRules.sort((left, right) => {
    const leftMin = left.min_quantity == null ? -1 : Number(left.min_quantity)
    const rightMin = right.min_quantity == null ? -1 : Number(right.min_quantity)

    if (leftMin !== rightMin) {
      return rightMin - leftMin
    }

    return Number(left.sort ?? 0) - Number(right.sort ?? 0)
  })[0] ?? null

  const tierPrice = selectedTierRule ? parseDecimalToMinorUnits(selectedTierRule.price) : null
  const unitPrice = tierPrice ?? basePrice
  const effectiveRule = selectedTierRule ?? selectedBaseRule

  return {
    effectiveRule,
    unitPrice
  }
}

function getSelectedOptionRules(priceRules, optionKeys, optionValues) {
  const selectedKeys = new Set(optionKeys)

  return priceRules.filter((rule) => {
    if (!['fixed_option', 'percent_option', 'multiplier'].includes(rule.type)) {
      return false
    }

    if (hasConditions(rule) && matchesConditions(rule, optionValues)) {
      return true
    }

    return selectedKeys.has(rule.key)
  })
}

function assertKnownOptions(selectedOptionRules, optionKeys) {
  const configuredKeys = new Set(selectedOptionRules.map(rule => rule.key))
  const unknownKeys = optionKeys.filter(key => !configuredKeys.has(key))

  if (unknownKeys.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Unknown product options',
      message: `Неизвестные опции: ${unknownKeys.join(', ')}`
    })
  }
}

export function calculateProductPrice(product, payload) {
  const quantity = Number(payload?.quantity)
  const size = payload?.size == null ? null : String(payload.size)
  const optionKeys = Array.isArray(payload?.options)
    ? payload.options.map(option => String(option))
    : []
  const optionValues = getPayloadOptionValues(payload, size)

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid quantity',
      message: 'quantity должен быть целым числом больше 0'
    })
  }

  const unsupportedRule = product.price_rules.find(rule => !SUPPORTED_RULE_TYPES.has(rule.type))

  if (unsupportedRule) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Unsupported price rule type',
      message: `Неподдерживаемый тип правила цены: ${unsupportedRule.type}`
    })
  }

  const { effectiveRule, unitPrice } = pickBasePriceRule(product.price_rules, quantity, size, optionValues)
  const lines = []
  let subtotal = unitPrice * quantity

  lines.push({
    label: effectiveRule.label,
    amount: toMoneyResponse(subtotal)
  })

  const selectedOptionRules = getSelectedOptionRules(product.price_rules, optionKeys, optionValues)
  assertKnownOptions(selectedOptionRules, optionKeys)

  const fixedOptionRules = selectedOptionRules.filter(rule => rule.type === 'fixed_option')
  const percentOptionRules = selectedOptionRules.filter(rule => rule.type === 'percent_option')
  const multiplierRules = selectedOptionRules.filter(rule => rule.type === 'multiplier')
  const discountRules = product.price_rules.filter(rule => (
    rule.type === 'discount'
    && matchesQuantity(rule, quantity)
    && matchesConditions(rule, optionValues)
  ))

  for (const rule of fixedOptionRules) {
    const optionPrice = parseDecimalToMinorUnits(rule.price)

    if (optionPrice == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid fixed option rule',
        message: `У опции "${rule.label}" не указана цена`
      })
    }

    const amount = rule.amount_scope === 'per_order' ? optionPrice : optionPrice * quantity
    subtotal += amount
    lines.push({
      label: rule.label,
      amount: toMoneyResponse(amount)
    })
  }

  for (const rule of percentOptionRules) {
    const percent = parseFactor(rule.percent)

    if (percent == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid percent option rule',
        message: `У опции "${rule.label}" не указан процент`
      })
    }

    const amount = Math.round(subtotal * (percent / 100))
    subtotal += amount
    lines.push({
      label: rule.label,
      amount: toMoneyResponse(amount)
    })
  }

  for (const rule of multiplierRules) {
    const factor = parseFactor(rule.factor)

    if (factor == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid multiplier rule',
        message: `У опции "${rule.label}" не указан множитель`
      })
    }

    const amount = Math.round(subtotal * (factor - 1))
    subtotal += amount
    lines.push({
      label: rule.label,
      amount: toMoneyResponse(amount)
    })
  }

  for (const rule of discountRules) {
    const percent = parseFactor(rule.percent)

    if (percent == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid discount rule',
        message: `У скидки "${rule.label}" не указан процент`
      })
    }

    const amount = -Math.round(subtotal * (percent / 100))
    subtotal += amount
    lines.push({
      label: rule.label,
      amount: toMoneyResponse(amount)
    })
  }

  return {
    total: toMoneyResponse(subtotal),
    unit_price: toMoneyResponse(Math.round(subtotal / quantity)),
    quantity,
    currency: 'RUB',
    lines
  }
}

export async function getProductsCategories(database) {
  try {
    const rows = await database
      .selectFrom('products')
      .select('category')
      .distinct()
      .where('status', '=', ACTIVE_STATUS)
      .orderBy('category', 'asc')
      .execute()

    return rows.map(row => row.category)
  } catch (error) {
    assertProductsTableExists(error)
  }
}

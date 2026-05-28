import { auth } from './auth.js'
import { ensureSiteClient } from './site-client.js'
import { isSiteOrderInWork, normalizeSiteOrderStatus } from '~~/shared/utils/site-order-status.js'

const MAX_ITEMS = 100

function normalizeAmount(value) {
  const amount = Number(value)

  if (!Number.isFinite(amount) || amount <= 0) {
    return null
  }

  return Math.round(amount * 100) / 100
}

export function normalizeSiteOrderItems(items) {
  if (!Array.isArray(items)) {
    return []
  }

  return items.slice(0, MAX_ITEMS).map((item, index) => {
    const quantity = Math.max(1, Number.parseInt(item?.quantity, 10) || 1)
    const unitPrice = normalizeAmount(item?.unitPrice) ?? 0
    const designPrice = normalizeAmount(item?.designPrice) ?? 0
    const productId = Number.parseInt(item?.productId, 10)
    const name = String(item?.name || `Позиция ${index + 1}`).slice(0, 255)
    const description = String(item?.description || '').trim()

    return {
      name,
      productId: Number.isInteger(productId) && productId > 0 ? productId : null,
      description,
      quantity,
      unitPrice,
      designPrice,
      total: Math.round((unitPrice * quantity + designPrice) * 100) / 100,
      customerComment: String(item?.customerComment || '').trim(),
      config: item?.config && typeof item.config === 'object' ? item.config : null
    }
  }).filter(item => item.total > 0)
}

export function getSiteOrderItemsAmount(items) {
  return Math.round(items.reduce((sum, item) => sum + item.total, 0) * 100) / 100
}

async function getOptionalSiteUser(event) {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  })

  return session?.user?.id ? session.user : null
}

function createAccessToken() {
  return crypto.randomUUID().replaceAll('-', '') + crypto.randomUUID().replaceAll('-', '')
}

export function createSiteOrderNumber(orderId) {
  const suffix = Date.now().toString(36).toUpperCase()
  return `SITE-${orderId}-${suffix}`.slice(0, 36)
}

export async function getCurrentSiteUser(event) {
  const user = await getOptionalSiteUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Для просмотра заказов нужно войти в аккаунт'
    })
  }

  return user
}

export function parseSiteOrderPayload(value, fallback = {}) {
  if (!value) return fallback
  if (typeof value === 'object') return value

  try {
    return JSON.parse(value) || fallback
  } catch {
    return fallback
  }
}

export function getSiteOrderWorkflowStatus(order, payload = parseSiteOrderPayload(order?.payload)) {
  // These workflow fields are owned by the shared admin database schema. They are
  // intentionally read here even though this shop project only creates the base
  // site_orders columns in its local migrations.
  return normalizeSiteOrderStatus(
    order?.workflow_status
    || order?.production_status
    || order?.status
    || payload.workflowStatus
    || payload.productionStatus
    || payload.orderStatus
    || ''
  ).trim()
}

function normalizeCheckout(checkout) {
  if (!checkout || typeof checkout !== 'object') return {}

  return {
    customer: checkout.customer && typeof checkout.customer === 'object' ? checkout.customer : {},
    recipient: checkout.recipient && typeof checkout.recipient === 'object' ? checkout.recipient : {},
    organization: checkout.organization && typeof checkout.organization === 'object' ? checkout.organization : null,
    payment: checkout.payment && typeof checkout.payment === 'object' ? checkout.payment : {}
  }
}

function buildOrderDescription(checkout, items) {
  const lines = ['Источник: сайт']

  if (checkout.customer?.name || checkout.customer?.phone || checkout.customer?.email) {
    lines.push(`Клиент: ${[checkout.customer?.name, checkout.customer?.phone, checkout.customer?.email].filter(Boolean).join(', ')}`)
  }

  if (checkout.customer?.additionalContact) {
    lines.push(`Доп. контакт: ${checkout.customer.additionalContact}`)
  }

  if (checkout.recipient?.name || checkout.recipient?.phone) {
    lines.push(`Получатель: ${[checkout.recipient?.name, checkout.recipient?.phone].filter(Boolean).join(', ')}`)
  }

  if (checkout.organization?.name || checkout.organization?.inn) {
    lines.push(`Организация: ${[checkout.organization?.name, checkout.organization?.inn ? `ИНН ${checkout.organization.inn}` : ''].filter(Boolean).join(', ')}`)
  }

  if (checkout.payment?.payerType) {
    lines.push(`Плательщик: ${checkout.payment.payerType === 'legal' ? 'юрлицо' : 'физлицо'}`)
  }

  if (items.length) {
    lines.push(`Позиций: ${items.length}`)
  }

  return lines.join('\n')
}

export async function createSiteOrder(database, event, { items, amount, checkout }) {
  const user = await getOptionalSiteUser(event)
  const clientId = user ? await ensureSiteClient(database, user) : null
  const siteUserId = user?.id ? String(user.id) : null
  const accessToken = createAccessToken()
  const now = new Date()
  const normalizedCheckout = normalizeCheckout(checkout)
  const productIds = [...new Set(items.map(item => item.productId).filter(Boolean))]
  const existingProductIds = productIds.length
    ? new Set((await database
        .selectFrom('products')
        .select(['id'])
        .where('id', 'in', productIds)
        .execute()).map(product => Number(product.id)))
    : new Set()

  return database.transaction().execute(async (trx) => {
    const result = await trx
      .insertInto('site_orders')
      .values({
        client_id: clientId,
        site_user_id: siteUserId,
        access_token: accessToken,
        amount,
        currency: 'RUB',
        payment_status: 'pending',
        payload: JSON.stringify({
          source: 'site',
          checkout: normalizedCheckout,
          orderDescription: buildOrderDescription(normalizedCheckout, items),
          items
        }),
        created_at: now,
        updated_at: now
      })
      .executeTakeFirst()

    const orderId = Number(result.insertId)

    if (!orderId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Order was not created',
        message: 'Не удалось создать заказ'
      })
    }

    const orderNumber = createSiteOrderNumber(orderId)

    await trx
      .updateTable('site_orders')
      .set({
        order_number: orderNumber,
        updated_at: now
      })
      .where('id', '=', orderId)
      .execute()

    if (items.length) {
      await trx
        .insertInto('site_order_items')
        .values(items.map(item => ({
          site_order_id: orderId,
          product_id: existingProductIds.has(item.productId) ? item.productId : null,
          name: item.name,
          description: item.description || null,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          design_price: item.designPrice,
          total: item.total,
          payload: JSON.stringify(item),
          created_at: now,
          updated_at: now
        })))
        .execute()
    }

    return { id: orderId, orderNumber, amount, siteUserId, accessToken }
  })
}

export async function updateSiteOrderRecipient(database, event, orderId, recipientPatch) {
  const order = await getOwnedSiteOrder(database, event, orderId)
  const payload = parseSiteOrderPayload(order.payload)
  const workflowStatus = getSiteOrderWorkflowStatus(order, payload)

  if (!isSiteOrderInWork(workflowStatus)) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Order recipient is locked',
      message: 'Получателя можно изменить только пока заказ в работе'
    })
  }

  const checkout = payload.checkout && typeof payload.checkout === 'object' ? payload.checkout : {}
  const recipient = {
    ...(checkout.recipient && typeof checkout.recipient === 'object' ? checkout.recipient : {}),
    type: 'another',
    ...recipientPatch
  }
  const nextPayload = {
    ...payload,
    checkout: {
      ...checkout,
      recipient
    }
  }

  await database
    .updateTable('site_orders')
    .set({
      payload: JSON.stringify(nextPayload),
      updated_at: new Date()
    })
    .where('id', '=', orderId)
    .execute()

  return recipient
}

export async function getOwnedSiteOrder(database, event, orderId, accessToken = '') {
  const user = await getOptionalSiteUser(event)
  const normalizedToken = String(accessToken || '').trim()

  const order = await database
    .selectFrom('site_orders')
    .selectAll()
    .where('id', '=', orderId)
    .where((eb) => {
      const conditions = []

      if (user?.id) {
        conditions.push(eb('site_user_id', '=', String(user.id)))
      }

      if (normalizedToken) {
        conditions.push(eb('access_token', '=', normalizedToken))
      }

      return conditions.length ? eb.or(conditions) : eb('id', '=', -1)
    })
    .executeTakeFirst()

  if (!order) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Order not found',
      message: 'Заказ не найден'
    })
  }

  return order
}

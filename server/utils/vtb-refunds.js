import { enqueueReturnFiscalReceipt } from './fiscal-receipts.js'
import {
  createVtbRefund,
  getVtbPaymentDetails,
  getVtbRefundAmount,
  getVtbRefundDetails,
  getVtbOrder
} from './vtb-sbp-api.js'

const COMPLETED_REFUND_STATUSES = new Set(['COMPLETED', 'CONFIRMED', 'RECONCILED', 'REFUNDED', 'SUCCESS', 'SUCCEEDED'])
const FAILED_REFUND_STATUSES = new Set(['FAILED', 'DECLINED', 'REJECTED', 'CANCELLED', 'CANCELED'])
const RESERVED_REFUND_STATUSES = ['sending', 'pending', 'completed']
const REFUND_TYPES = new Set(['full', 'partial'])
const REFUNDABLE_PAYMENT_STATUSES = new Set(['paid', 'partially_refunded'])

function roundMoney(value) {
  return Math.round(Number(value) * 100) / 100
}

function parseJson(value, fallback = {}) {
  if (!value) return fallback
  if (typeof value === 'object') return value

  try {
    return JSON.parse(value) || fallback
  } catch {
    return fallback
  }
}

function getRefundStatus(refund) {
  return refund?.status?.value || refund?.status || refund?.state?.value || refund?.state || ''
}

export function normalizeVtbRefundStatus(status) {
  const normalized = String(status || '').toUpperCase()

  if (COMPLETED_REFUND_STATUSES.has(normalized)) return 'completed'
  if (FAILED_REFUND_STATUSES.has(normalized)) return 'failed'
  return 'pending'
}

function createRefundId() {
  return `REF-${crypto.randomUUID()}`
}

function normalizeRefundRequest(request = {}) {
  const type = String(request.type || '').trim().toLowerCase()
  const refundId = String(request.refundId || '').trim() || createRefundId()
  const requestedBy = String(request.requestedBy || '').trim().slice(0, 128)
  const reason = String(request.reason || '').trim().slice(0, 65535)

  if (!REFUND_TYPES.has(type)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid refund type',
      message: 'Тип возврата должен быть full или partial'
    })
  }

  if (!requestedBy) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing refund manager',
      message: 'Не указан менеджер, инициировавший возврат'
    })
  }

  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(refundId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid refund id',
      message: 'refundId должен содержать только латинские буквы, цифры, _ или -'
    })
  }

  const items = Array.isArray(request.items)
    ? request.items.map(item => ({
        orderItemId: Number(item?.orderItemId),
        quantity: Number(item?.quantity)
      }))
    : []

  if (type === 'partial' && !items.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing refund items',
      message: 'Для частичного возврата выберите позиции и количество'
    })
  }

  return { type, refundId, requestedBy, reason, items }
}

function getPreviouslyRefundedQuantities(refunds) {
  const quantities = new Map()

  for (const refund of refunds) {
    const snapshot = parseJson(refund.items_snapshot, [])
    if (!Array.isArray(snapshot)) continue

    for (const item of snapshot) {
      if (item.kind === 'design') continue
      const itemId = Number(item.orderItemId)
      quantities.set(itemId, (quantities.get(itemId) || 0) + Number(item.quantity || 0))
    }
  }

  return quantities
}

export function normalizeSelectedRefundQuantities(request, orderItems, refundedQuantities) {
  const selected = new Map()

  if (request.type === 'full') {
    for (const item of orderItems) {
      const available = Number(item.quantity) - (refundedQuantities.get(Number(item.id)) || 0)
      if (available > 0) selected.set(Number(item.id), available)
    }
    return selected
  }

  for (const item of request.items) {
    if (!Number.isInteger(item.orderItemId) || item.orderItemId <= 0 || !Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid refund item',
        message: 'Количество возвращаемой позиции должно быть целым числом больше нуля'
      })
    }

    if (selected.has(item.orderItemId)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Duplicate refund item',
        message: 'Одна позиция не должна передаваться несколько раз'
      })
    }

    selected.set(item.orderItemId, item.quantity)
  }

  return selected
}

export function createRefundItemsSnapshot(orderItems, selected, refundedQuantities) {
  const orderItemsById = new Map(orderItems.map(item => [Number(item.id), item]))
  const snapshot = []

  for (const [itemId, quantity] of selected) {
    const item = orderItemsById.get(itemId)
    if (!item) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Unknown refund item',
        message: `Позиция заказа ${itemId} не найдена`
      })
    }

    const originalQuantity = Number(item.quantity)
    const alreadyRefunded = refundedQuantities.get(itemId) || 0
    const available = originalQuantity - alreadyRefunded

    if (quantity > available) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Refund quantity exceeds available',
        message: `Для позиции «${item.name}» доступно к возврату: ${Math.max(0, available)}`
      })
    }

    const unitPrice = roundMoney(item.unit_price)
    const productTotal = roundMoney(unitPrice * quantity)
    snapshot.push({
      kind: 'product',
      orderItemId: itemId,
      productId: item.product_id ? Number(item.product_id) : null,
      name: String(item.name || 'Товар'),
      description: String(item.description || ''),
      quantity,
      unitPrice,
      total: productTotal,
      calculationObject: 'commodity'
    })

    const completesItemRefund = alreadyRefunded + quantity === originalQuantity
    const designPrice = roundMoney(item.design_price)
    if (completesItemRefund && designPrice > 0) {
      snapshot.push({
        kind: 'design',
        orderItemId: itemId,
        productId: null,
        name: `Дизайн: ${String(item.name || 'позиция')}`,
        description: '',
        quantity: 1,
        unitPrice: designPrice,
        total: designPrice,
        calculationObject: 'service'
      })
    }
  }

  return snapshot
}

export async function enqueueRefundStatusJob(database, refund) {
  if (!refund || !['sending', 'pending'].includes(refund.status)) return

  await database
    .insertInto('site_order_jobs')
    .values({
      job_type: 'poll_refund',
      idempotency_key: `refund:${refund.id}:poll`,
      site_order_id: Number(refund.site_order_id),
      payment_attempt_id: refund.payment_attempt_id ? Number(refund.payment_attempt_id) : null,
      refund_id: Number(refund.id),
      fiscal_receipt_id: null,
      status: 'pending',
      attempts: 0,
      max_attempts: 40,
      next_attempt_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    })
    .onDuplicateKeyUpdate({ updated_at: new Date() })
    .execute()
}

async function updateOrderRefundStatus(database, orderId) {
  const [order, completedRefunds] = await Promise.all([
    database.selectFrom('site_orders').select(['id', 'amount']).where('id', '=', Number(orderId)).executeTakeFirst(),
    database.selectFrom('site_order_refunds').select(['amount']).where('site_order_id', '=', Number(orderId)).where('status', '=', 'completed').execute()
  ])
  if (!order) return

  const refundedAmount = roundMoney(completedRefunds.reduce((sum, refund) => sum + Number(refund.amount || 0), 0))
  const paymentStatus = refundedAmount >= roundMoney(order.amount) ? 'refunded' : 'partially_refunded'
  await database.updateTable('site_orders').set({ payment_status: paymentStatus, updated_at: new Date() }).where('id', '=', Number(orderId)).execute()
}

async function reserveRefund(database, order, request, payment) {
  return database.transaction().execute(async (trx) => {
    const lockedOrder = await trx
      .selectFrom('site_orders')
      .select(['id', 'payment_status'])
      .where('id', '=', Number(order.id))
      .forUpdate()
      .executeTakeFirst()

    if (!REFUNDABLE_PAYMENT_STATUSES.has(lockedOrder?.payment_status)) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Order is not paid',
        message: 'Возврат доступен только для оплаченного заказа'
      })
    }

    const existingRefund = await trx
      .selectFrom('site_order_refunds')
      .selectAll()
      .where('refund_id', '=', request.refundId)
      .executeTakeFirst()

    if (existingRefund) {
      if (Number(existingRefund.site_order_id) === Number(order.id)) {
        return { existing: existingRefund }
      }

      throw createError({
        statusCode: 409,
        statusMessage: 'Refund id already exists',
        message: 'Возврат с таким refundId уже существует'
      })
    }

    const [orderItems, refunds] = await Promise.all([
      trx
        .selectFrom('site_order_items')
        .select(['id', 'product_id', 'name', 'description', 'quantity', 'unit_price', 'design_price', 'total'])
        .where('site_order_id', '=', Number(order.id))
        .orderBy('id')
        .execute(),
      trx
        .selectFrom('site_order_refunds')
        .select(['amount', 'items_snapshot'])
        .where('site_order_id', '=', Number(order.id))
        .where('status', 'in', RESERVED_REFUND_STATUSES)
        .execute()
    ])

    if (!orderItems.length) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Order items are missing',
        message: 'У заказа отсутствует состав для возврата'
      })
    }

    const refundedQuantities = getPreviouslyRefundedQuantities(refunds)
    const selected = normalizeSelectedRefundQuantities(request, orderItems, refundedQuantities)
    const itemsSnapshot = createRefundItemsSnapshot(orderItems, selected, refundedQuantities)
    const amount = roundMoney(itemsSnapshot.reduce((sum, item) => sum + item.total, 0))

    if (!itemsSnapshot.length || amount <= 0) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Nothing to refund',
        message: 'Нет доступных позиций для возврата'
      })
    }

    const reservedAmount = roundMoney(refunds.reduce((sum, refund) => sum + Number(refund.amount || 0), 0))
    if (roundMoney(reservedAmount + amount) > payment.refundableAmount) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Refund amount exceeds payment',
        message: `Доступно к возврату ${roundMoney(payment.refundableAmount - reservedAmount).toFixed(2)} RUB`
      })
    }

    const result = await trx
      .insertInto('site_order_refunds')
      .values({
        site_order_id: Number(order.id),
        payment_attempt_id: Number(payment.attemptId),
        refund_id: request.refundId,
        vtb_payment_id: payment.paymentId,
        amount,
        currency: payment.currency,
        refund_type: request.type,
        reason: request.reason || null,
        items_snapshot: JSON.stringify(itemsSnapshot),
        requested_by: request.requestedBy,
        status: 'sending',
        requested_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      })
      .executeTakeFirst()

    return {
      rowId: Number(result.insertId),
      amount,
      itemsSnapshot
    }
  })
}

export async function requestSiteOrderRefund(database, order, input = {}) {
  if (!REFUNDABLE_PAYMENT_STATUSES.has(order?.payment_status)) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Order is not paid',
      message: 'Возврат доступен только для оплаченного заказа'
    })
  }

  const request = normalizeRefundRequest(input)
  const paymentAttempt = await database
    .selectFrom('site_order_payment_attempts')
    .selectAll()
    .where('site_order_id', '=', Number(order.id))
    .where('status', '=', 'paid')
    .orderBy('paid_at', 'desc')
    .orderBy('id', 'desc')
    .executeTakeFirst()

  if (!paymentAttempt?.bank_order_id) {
    throw createError({
      statusCode: 409,
      statusMessage: 'VTB payment attempt is missing',
      message: 'У заказа отсутствует подтверждённая попытка оплаты ВТБ'
    })
  }

  const orderData = await getVtbOrder(paymentAttempt.bank_order_id)
  const paymentDetails = getVtbPaymentDetails(orderData)
  const payload = parseJson(order.payload)
  const paymentId = paymentDetails.paymentId || String(paymentAttempt.payment_id || order.vtb_payment_id || '').trim()
  const refundableAmount = roundMoney(
    paymentAttempt.requested_amount
    || order.amount
    || paymentDetails.amount
    || payload?.payment?.vtb?.chargedAmount
    || 0
  )
  const currency = String(paymentDetails.currency || order.currency || 'RUB').toUpperCase()

  if (!paymentId || !refundableAmount) {
    throw createError({
      statusCode: 409,
      statusMessage: 'VTB payment is missing',
      message: 'ВТБ не вернул paymentId или сумму платежа'
    })
  }

  const reservation = await reserveRefund(database, order, request, {
    attemptId: Number(paymentAttempt.id),
    paymentId,
    refundableAmount,
    currency
  })

  if (reservation.existing) {
    await enqueueRefundStatusJob(database, reservation.existing)
    return reservation.existing
  }

  const { rowId, amount, itemsSnapshot } = reservation
  const providerAmount = getVtbRefundAmount(amount, Number(order.amount))

  try {
    const response = await createVtbRefund({ refundId: request.refundId, paymentId, amount: providerAmount, currency })
    const providerRefund = response?.object && typeof response.object === 'object' ? response.object : response
    const status = normalizeVtbRefundStatus(getRefundStatus(providerRefund))

    await database
      .updateTable('site_order_refunds')
      .set({
        status,
        provider_status: String(getRefundStatus(providerRefund) || ''),
        completed_at: status === 'completed' ? new Date() : null,
        payload: JSON.stringify({
          request: { refundId: request.refundId, paymentId, amount, providerAmount, currency, items: itemsSnapshot },
          response
        }),
        updated_at: new Date()
      })
      .where('id', '=', rowId)
      .execute()

    const refund = await database.selectFrom('site_order_refunds').selectAll().where('id', '=', rowId).executeTakeFirst()
    if (status === 'completed') {
      await updateOrderRefundStatus(database, order.id)
      await enqueueReturnFiscalReceipt(database, rowId)
    } else if (status === 'pending') {
      await enqueueRefundStatusJob(database, refund)
    }

    return refund
  } catch (error) {
    await database
      .updateTable('site_order_refunds')
      .set({
        status: 'failed',
        payload: JSON.stringify({
          request: { refundId: request.refundId, paymentId, amount, providerAmount, currency, items: itemsSnapshot },
          error: error?.data || { message: error?.message || 'VTB refund failed' }
        }),
        updated_at: new Date()
      })
      .where('id', '=', rowId)
      .execute()

    throw error
  }
}

export async function refreshSiteOrderRefund(database, order, refundRow) {
  const paymentAttempt = refundRow.payment_attempt_id
    ? await database
        .selectFrom('site_order_payment_attempts')
        .selectAll()
        .where('id', '=', Number(refundRow.payment_attempt_id))
        .where('site_order_id', '=', Number(order.id))
        .executeTakeFirst()
    : null
  const bankOrderId = paymentAttempt?.bank_order_id || order.order_number
  const orderData = await getVtbOrder(bankOrderId)
  const providerRefund = getVtbRefundDetails(orderData, refundRow.refund_id)

  if (!providerRefund) return refundRow

  const status = normalizeVtbRefundStatus(getRefundStatus(providerRefund))
  await database
    .updateTable('site_order_refunds')
    .set({
      status,
      provider_status: String(getRefundStatus(providerRefund) || ''),
      completed_at: status === 'completed' ? (refundRow.completed_at || new Date()) : null,
      payload: JSON.stringify({
        ...parseJson(refundRow.payload),
        lastStatus: providerRefund,
        checkedAt: new Date().toISOString()
      }),
      updated_at: new Date()
    })
    .where('id', '=', refundRow.id)
    .execute()

  if (status === 'completed') {
    await updateOrderRefundStatus(database, order.id)
    await enqueueReturnFiscalReceipt(database, refundRow.id)
  }

  return database.selectFrom('site_order_refunds').selectAll().where('id', '=', refundRow.id).executeTakeFirst()
}

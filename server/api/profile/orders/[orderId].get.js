import { useDatabase } from '../../../utils/database.js'
import { getOwnedSiteOrder } from '../../../utils/site-orders.js'

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString('ru-RU')} ₽`
}

function getStatusLabel(status) {
  return {
    pending: 'Ожидает оплаты',
    paid: 'Оплачен',
    failed: 'Оплата не прошла',
    expired: 'Оплата истекла',
    cancelled: 'Отменен'
  }[status] || 'Ожидает оплаты'
}

function parsePayload(value) {
  if (!value) return null
  if (typeof value === 'object') return value

  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export default defineEventHandler(async (event) => {
  const orderId = Number(getRouterParam(event, 'orderId'))

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order id',
      message: 'Некорректный номер заказа'
    })
  }

  const database = useDatabase()
  const order = await getOwnedSiteOrder(database, event, orderId)
  const orderPayload = parsePayload(order.payload) || {}
  const checkout = orderPayload.checkout || {}
  const items = await database
    .selectFrom('site_order_items')
    .selectAll()
    .where('site_order_id', '=', orderId)
    .orderBy('id', 'asc')
    .execute()

  return {
    order: {
      id: Number(order.id),
      publicNumber: order.order_number || `SITE-${order.id}`,
      titleLabel: `Заказ ${order.order_number || `SITE-${order.id}`}`,
      status: order.payment_status,
      statusLabel: getStatusLabel(order.payment_status),
      paymentStatus: order.payment_status,
      createdAt: order.created_at,
      totalPrice: Number(order.amount || 0),
      totalPriceLabel: formatMoney(order.amount),
      delivery: {
        type: 'Самовывоз',
        address: 'ДНР, Донецк, ул. Постышева, дом 60'
      },
      recipient: {
        name: checkout.recipient?.name || checkout.customer?.name || '',
        phone: checkout.recipient?.phone || checkout.customer?.phone || '',
        type: checkout.recipient?.type || 'self'
      },
      items: items.map((item) => {
        const payload = parsePayload(item.payload) || {}

        return {
          id: Number(item.id),
          productId: item.product_id ? Number(item.product_id) : null,
          title: item.name,
          description: item.description,
          quantity: Number(item.quantity || 1),
          quantityLabel: `${Number(item.quantity || 1)} шт.`,
          unitPrice: Number(item.unit_price || 0),
          unitPriceLabel: formatMoney(item.unit_price),
          designPrice: Number(item.design_price || 0),
          customerComment: payload.customerComment || '',
          totalPrice: Number(item.total || 0),
          totalPriceLabel: formatMoney(item.total),
          config: payload.config || {}
        }
      }),
      summary: {
        title: 'Итого',
        itemsCount: items.length,
        total: Number(order.amount || 0),
        totalLabel: formatMoney(order.amount)
      },
      canCancel: ['pending', 'failed', 'expired'].includes(order.payment_status),
      canRepeat: true
    }
  }
})

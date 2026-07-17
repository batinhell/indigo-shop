import { useDatabase } from '../../utils/database.js'
import {
  createSiteOrder,
  getSiteOrderItemsAmount,
  normalizeSiteOrderItems
} from '../../utils/site-orders.js'
import { calculateProductPrice, getProductById } from '../../utils/products.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const sourceItems = Array.isArray(body?.items) ? body.items : []

  if (!sourceItems.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order',
      message: 'Не переданы позиции заказа'
    })
  }

  const database = useDatabase()
  const pricedItems = await Promise.all(sourceItems.map(async (item) => {
    const productId = Number.parseInt(item?.productId, 10)
    const quantity = Number.parseInt(item?.quantity, 10)

    if (!Number.isInteger(productId) || productId <= 0 || !Number.isInteger(quantity) || quantity <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid order item',
        message: 'Не удалось определить товар или количество'
      })
    }

    const product = await getProductById(database, productId)

    if (!product || !product.online_order_enabled) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Product is unavailable',
        message: 'Один из товаров недоступен для онлайн-заказа'
      })
    }

    const config = item?.config && typeof item.config === 'object' ? item.config : {}
    const price = calculateProductPrice(product, {
      ...config,
      quantity,
      options: config
    })

    return {
      ...item,
      name: product.name,
      productId,
      quantity,
      unitPrice: price.unit_price,
      designPrice: 0,
      serverTotal: price.total,
      config
    }
  }))
  const items = normalizeSiteOrderItems(pricedItems).map((item, index) => ({
    ...item,
    total: pricedItems[index].serverTotal
  }))
  const amount = getSiteOrderItemsAmount(items)

  if (!items.length || !amount) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order price',
      message: 'Не удалось рассчитать стоимость заказа'
    })
  }

  const order = await createSiteOrder(database, event, {
    items,
    amount,
    checkout: body?.checkout
  })

  return {
    order: {
      id: order.id,
      orderNumber: order.orderNumber,
      accessToken: order.accessToken,
      amount: order.amount,
      status: 'pending'
    }
  }
})

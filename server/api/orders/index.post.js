import { useDatabase } from '../../utils/database.js'
import {
  createSiteOrder,
  getSiteOrderItemsAmount,
  normalizeSiteOrderItems
} from '../../utils/site-orders.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const items = normalizeSiteOrderItems(body?.items)
  const itemsAmount = getSiteOrderItemsAmount(items)
  const amount = itemsAmount || Number(body?.amount)

  if (!items.length || !amount) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order',
      message: 'Не переданы позиции заказа'
    })
  }

  const database = useDatabase()
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

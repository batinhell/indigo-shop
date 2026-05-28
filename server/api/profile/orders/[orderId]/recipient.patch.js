import { useDatabase } from '../../../../utils/database.js'
import { updateSiteOrderRecipient } from '../../../../utils/site-orders.js'

export default defineEventHandler(async (event) => {
  const orderId = Number(getRouterParam(event, 'orderId'))

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order id',
      message: 'Некорректный номер заказа'
    })
  }

  const body = await readBody(event)
  const name = String(body?.recipient?.name || '').trim()
  const phone = String(body?.recipient?.phone || '').trim()

  if (!name || !phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid recipient',
      message: 'Укажите имя и телефон получателя'
    })
  }

  const database = useDatabase()
  const recipient = await updateSiteOrderRecipient(database, event, orderId, { name, phone })

  return { recipient }
})

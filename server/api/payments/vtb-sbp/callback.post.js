import { useDatabase } from '../../../utils/database.js'
import { refreshVtbPaymentStatus } from '../../../utils/vtb-payment-status.js'

function getCallbackObject(body) {
  return body?.object && typeof body.object === 'object' ? body.object : body
}

async function findSiteOrderByVtbCallback(database, { requestId, qrId }) {
  return database
    .selectFrom('site_orders')
    .selectAll()
    .where((eb) => {
      const conditions = []

      if (requestId) {
        conditions.push(eb('order_number', '=', requestId))
      }

      if (qrId) {
        conditions.push(eb('vtb_qr_id', '=', qrId))
      }

      return conditions.length ? eb.or(conditions) : eb('id', '=', -1)
    })
    .executeTakeFirst()
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const callback = getCallbackObject(body)
  const requestId = String(callback?.orderId || callback?.sbpParams?.requestId || '').trim()
  const qrId = String(callback?.sbpParams?.qrcId || callback?.qrcId || '').trim()

  if (!requestId && !qrId) {
    return { ok: true }
  }

  const database = useDatabase()
  const siteOrder = await findSiteOrderByVtbCallback(database, { requestId, qrId })

  if (!siteOrder?.vtb_qr_id) {
    return { ok: true }
  }

  await refreshVtbPaymentStatus(database, siteOrder, {
    payloadPatch: { callback: body }
  })

  return { ok: true }
})

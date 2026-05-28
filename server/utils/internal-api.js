export function assertInternalShopToken(event) {
  const config = useRuntimeConfig()
  const expected = String(config.shopApi?.token || process.env.SHOP_API_TOKEN || '').trim()
  const header = getHeader(event, 'authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''

  if (!expected || token !== expected) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized', message: 'Недостаточно прав' })
  }
}

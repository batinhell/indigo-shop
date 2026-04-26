import { getProductBySlug } from '../../utils/products.js'
import { useDatabase } from '../../utils/database.js'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing product slug',
      message: 'Не передан slug товара'
    })
  }

  const database = useDatabase()
  const product = await getProductBySlug(database, slug)

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found',
      message: 'Товар не найден'
    })
  }

  return product
})

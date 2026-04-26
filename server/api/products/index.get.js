import { getProducts } from '../../utils/products.js'
import { useDatabase } from '../../utils/database.js'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = typeof query.category === 'string' ? query.category.trim() : ''
  const database = useDatabase()

  const products = await getProducts(database, category || null)

  return {
    products
  }
})

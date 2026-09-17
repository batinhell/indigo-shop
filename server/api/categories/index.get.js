import { getCategories } from '../../utils/products.js'
import { useDatabase } from '../../utils/database.js'

export default defineEventHandler(async () => {
  const database = useDatabase()
  const categories = await getCategories(database)

  return {
    categories
  }
})

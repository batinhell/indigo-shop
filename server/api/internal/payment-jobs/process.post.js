import { assertInternalShopToken } from '../../../utils/internal-api.js'
import { useDatabase } from '../../../utils/database.js'
import { processPendingSiteOrderJobs } from '../../../utils/site-order-jobs.js'

export default defineEventHandler(async (event) => {
  assertInternalShopToken(event)

  const body = await readBody(event)
  const result = await processPendingSiteOrderJobs(useDatabase(), {
    limit: body?.limit
  })

  return { jobs: result }
})

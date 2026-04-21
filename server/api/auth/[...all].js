import { defineEventHandler, sendWebResponse, toWebRequest } from 'h3'

import { auth } from '../../utils/auth.js'

export default defineEventHandler(async (event) => {
  const response = await auth.handler(toWebRequest(event))

  return sendWebResponse(event, response)
})

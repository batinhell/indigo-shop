import { suggestDadataParties } from '../../utils/dadata.js'

const isInternalConfigError = error => (
  error?.statusMessage === 'DaData is not configured'
)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const query = String(body.query ?? '').trim()

  if (query.length < 3) {
    return {
      suggestions: []
    }
  }

  try {
    const suggestions = await suggestDadataParties({
      query,
      count: 5
    })

    return {
      suggestions
    }
  } catch (error) {
    console.error('[dadata/party-suggest] DaData error:', error)

    if (isInternalConfigError(error)) {
      throw error
    }

    throw createError({
      statusCode: 502,
      statusMessage: 'DaData request failed',
      message: 'Не удалось получить данные организации'
    })
  }
})

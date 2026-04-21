const DEFAULT_SUGGEST_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'

const readEnv = name => process.env[name]?.trim() ?? ''
const getRuntimeString = value => (
  typeof value === 'string' ? value.trim() : ''
)

const getDadataConfig = () => {
  const config = useRuntimeConfig()
  const dadata = config.dadata ?? {}
  const apiKey = getRuntimeString(dadata.apiKey) || readEnv('DADATA_API_KEY')
  const suggestUrl = getRuntimeString(dadata.suggestUrl) || readEnv('DADATA_SUGGEST_URL') || DEFAULT_SUGGEST_URL

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'DaData is not configured',
      message: 'Missing DADATA_API_KEY'
    })
  }

  return {
    apiKey,
    suggestUrl
  }
}

const mapPartySuggestion = (suggestion) => {
  const data = suggestion.data ?? {}
  const name = data.name ?? {}
  const address = data.address ?? {}
  const state = data.state ?? {}

  return {
    value: suggestion.value ?? '',
    unrestrictedValue: suggestion.unrestricted_value ?? '',
    name: name.short_with_opf || name.full_with_opf || suggestion.value || '',
    inn: data.inn ?? '',
    kpp: data.kpp ?? '',
    ogrn: data.ogrn ?? '',
    address: address.value ?? '',
    type: data.type ?? '',
    stateStatus: state.status ?? ''
  }
}

export const suggestDadataParties = async ({ query, count = 5 }) => {
  const config = getDadataConfig()

  const response = await $fetch(config.suggestUrl, {
    method: 'POST',
    timeout: 10000,
    headers: {
      'authorization': `Token ${config.apiKey}`,
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: {
      query,
      count
    }
  })

  return (response.suggestions ?? []).map(mapPartySuggestion)
}

import { normalizeAuthIdentifier } from '~~/shared/utils/auth-identifier.js'
import { useDatabase } from '../utils/database.js'

const LOOKUP_TIMEOUT = 5000

const assertValidIdentifier = (identifier) => {
  if (!identifier.isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid identifier',
      message: identifier.type === 'phone'
        ? 'Введите корректный номер телефона'
        : 'Введите корректную почту'
    })
  }
}

const withLookupTimeout = (promise) => {
  let timeoutId

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(createError({
        statusCode: 504,
        statusMessage: 'Auth identifier lookup timeout',
        message: 'Не удалось проверить пользователя. База данных не ответила вовремя'
      }))
    }, LOOKUP_TIMEOUT)
  })

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId)
  })
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const identifier = normalizeAuthIdentifier(body.identifier)

  assertValidIdentifier(identifier)

  const field = identifier.type === 'phone' ? 'phoneNumber' : 'email'

  const user = await withLookupTimeout(
    useDatabase()
      .selectFrom('user')
      .select('id')
      .where(field, '=', identifier.value)
      .executeTakeFirst()
  )

  return {
    exists: Boolean(user),
    type: identifier.type
  }
})

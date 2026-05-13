import { auth } from '../utils/auth.js'
import { useDatabase } from '../utils/database.js'

const normalizeName = value => String(value ?? '').trim()
const normalizeOptionalString = (value) => {
  const normalized = String(value ?? '').trim()
  return normalized || null
}

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  })

  if (!session?.user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Войдите, чтобы сохранить профиль'
    })
  }

  const body = await readBody(event)
  const name = normalizeName(body.name)
  const additionalContact = normalizeOptionalString(body.additionalContact)

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing name',
      message: 'Введите имя'
    })
  }

  const database = useDatabase()

  await database
    .updateTable('user')
    .set({
      name,
      additionalContact,
      updatedAt: new Date()
    })
    .where('id', '=', session.user.id)
    .execute()

  const user = await database
    .selectFrom('user')
    .select([
      'id',
      'name',
      'email',
      'emailVerified',
      'phoneNumber',
      'phoneNumberVerified',
      'additionalContact'
    ])
    .where('id', '=', session.user.id)
    .executeTakeFirst()

  return {
    user: user ?? null
  }
})

import { getRegistrationEmailError } from '~~/shared/utils/auth-identifier.js'
import { auth } from '../../utils/auth.js'
import { useDatabase } from '../../utils/database.js'

const isDuplicateEntryError = error => (
  error?.code === 'ER_DUP_ENTRY'
  || String(error?.message ?? '').includes('Duplicate entry')
)

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  })

  if (!session?.user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Войдите, чтобы изменить почту'
    })
  }

  const body = await readBody(event)
  const email = String(body.email ?? '').trim().toLowerCase()

  if (getRegistrationEmailError(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email',
      message: 'Введите корректную почту'
    })
  }

  const database = useDatabase()

  try {
    await database
      .updateTable('user')
      .set({
        email,
        emailVerified: false,
        updatedAt: new Date()
      })
      .where('id', '=', session.user.id)
      .execute()
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Email already exists',
        message: 'Эта почта уже используется'
      })
    }

    throw error
  }

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

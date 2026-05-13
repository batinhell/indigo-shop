import { auth } from '../utils/auth.js'
import { useDatabase } from '../utils/database.js'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  })

  if (!session?.user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Войдите, чтобы открыть профиль'
    })
  }

  const database = useDatabase()
  const userId = session.user.id

  const [user, organizations, recipients] = await Promise.all([
    database
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
      .where('id', '=', userId)
      .executeTakeFirst(),
    database
      .selectFrom('userOrganization')
      .select([
        'id',
        'name',
        'inn',
        'kpp',
        'ogrn',
        'type',
        'address',
        'isActive',
        'createdAt',
        'updatedAt'
      ])
      .where('userId', '=', userId)
      .orderBy('isActive', 'desc')
      .orderBy('updatedAt', 'desc')
      .execute(),
    database
      .selectFrom('userRecipient')
      .select([
        'id',
        'name',
        'phoneNumber',
        'createdAt',
        'updatedAt'
      ])
      .where('userId', '=', userId)
      .orderBy('createdAt', 'asc')
      .execute()
  ])

  return {
    profile: {
      user: user ?? null,
      organizations,
      recipients
    }
  }
})

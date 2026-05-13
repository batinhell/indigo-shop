import { auth } from '../../../utils/auth.js'
import { useDatabase } from '../../../utils/database.js'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  })

  if (!session?.user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Войдите, чтобы выбрать организацию'
    })
  }

  const organizationId = String(event.context.params?.organizationId ?? '').trim()

  if (!organizationId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing organization id',
      message: 'Организация не найдена'
    })
  }

  const database = useDatabase()
  const userId = session.user.id
  const now = new Date()

  await database.transaction().execute(async (trx) => {
    const organization = await trx
      .selectFrom('userOrganization')
      .select('id')
      .where('id', '=', organizationId)
      .where('userId', '=', userId)
      .executeTakeFirst()

    if (!organization) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Organization not found',
        message: 'Организация не найдена'
      })
    }

    await trx
      .updateTable('userOrganization')
      .set({ isActive: false })
      .where('userId', '=', userId)
      .execute()

    await trx
      .updateTable('userOrganization')
      .set({
        isActive: true,
        updatedAt: now
      })
      .where('id', '=', organizationId)
      .where('userId', '=', userId)
      .execute()
  })

  return {
    success: true
  }
})

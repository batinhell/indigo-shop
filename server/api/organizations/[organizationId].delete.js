import { auth } from '../../utils/auth.js'
import { useDatabase } from '../../utils/database.js'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  })

  if (!session?.user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Войдите, чтобы удалить организацию'
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

  await database.transaction().execute(async (trx) => {
    const organization = await trx
      .selectFrom('userOrganization')
      .select(['id', 'isActive'])
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
      .deleteFrom('userOrganization')
      .where('id', '=', organizationId)
      .where('userId', '=', userId)
      .execute()

    if (!organization.isActive) {
      return
    }

    const nextOrganization = await trx
      .selectFrom('userOrganization')
      .select('id')
      .where('userId', '=', userId)
      .orderBy('updatedAt', 'desc')
      .executeTakeFirst()

    if (!nextOrganization) {
      return
    }

    await trx
      .updateTable('userOrganization')
      .set({ isActive: true })
      .where('id', '=', nextOrganization.id)
      .where('userId', '=', userId)
      .execute()
  })

  return {
    success: true
  }
})

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
      message: 'Войдите, чтобы удалить получателя'
    })
  }

  const recipientId = String(event.context.params?.recipientId ?? '').trim()

  if (!recipientId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing recipient id',
      message: 'Получатель не найден'
    })
  }

  const database = useDatabase()
  const result = await database
    .deleteFrom('userRecipient')
    .where('id', '=', recipientId)
    .where('userId', '=', session.user.id)
    .executeTakeFirst()

  if (!Number(result.numDeletedRows)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Recipient not found',
      message: 'Получатель не найден'
    })
  }

  return {
    success: true
  }
})

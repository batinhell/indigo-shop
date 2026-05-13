import { randomUUID } from 'node:crypto'

import { formatAuthPhone, isAuthPhone } from '~~/shared/utils/auth-identifier.js'
import { auth } from '../../utils/auth.js'
import { useDatabase } from '../../utils/database.js'

const normalizeString = value => String(value ?? '').trim()
const normalizeNullablePhone = (value) => {
  const normalized = formatAuthPhone(value)
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
      message: 'Войдите, чтобы сохранить получателя'
    })
  }

  const body = await readBody(event)
  const recipient = body.recipient ?? {}
  const name = normalizeString(recipient.name)
  const phoneNumber = normalizeNullablePhone(recipient.phoneNumber ?? recipient.phone)

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing recipient name',
      message: 'Введите имя получателя'
    })
  }

  if (phoneNumber && !isAuthPhone(phoneNumber)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid recipient phone number',
      message: 'Введите корректный номер получателя'
    })
  }

  const database = useDatabase()
  const userId = session.user.id
  const recipientId = normalizeString(recipient.id)
  const now = new Date()

  let savedRecipientId = recipientId

  if (recipientId) {
    const existingRecipient = await database
      .selectFrom('userRecipient')
      .select('id')
      .where('id', '=', recipientId)
      .where('userId', '=', userId)
      .executeTakeFirst()

    if (!existingRecipient) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Recipient not found',
        message: 'Получатель не найден'
      })
    }

    await database
      .updateTable('userRecipient')
      .set({
        name,
        phoneNumber,
        updatedAt: now
      })
      .where('id', '=', recipientId)
      .where('userId', '=', userId)
      .execute()
  } else {
    savedRecipientId = randomUUID()

    await database
      .insertInto('userRecipient')
      .values({
        id: savedRecipientId,
        userId,
        name,
        phoneNumber,
        createdAt: now,
        updatedAt: now
      })
      .execute()
  }

  const savedRecipient = await database
    .selectFrom('userRecipient')
    .select([
      'id',
      'name',
      'phoneNumber',
      'createdAt',
      'updatedAt'
    ])
    .where('id', '=', savedRecipientId)
    .where('userId', '=', userId)
    .executeTakeFirst()

  return {
    recipient: savedRecipient
  }
})

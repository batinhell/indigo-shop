import { createHash } from 'node:crypto'
import { useDatabase } from '../../../utils/database.js'

const hashToken = token => createHash('sha256').update(token).digest('hex')

const getRedirectUrl = (event, status) => {
  const origin = getRequestURL(event).origin
  return `${origin}/profile?emailConfirmed=${status}`
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const token = String(query.t || query.token || '').trim()

  if (!token) {
    return sendRedirect(event, getRedirectUrl(event, 'invalid'), 302)
  }

  const database = useDatabase()
  const tokenHash = hashToken(token)
  const tokenRecord = await database
    .selectFrom('userEmailConfirmationToken')
    .select(['id', 'userId', 'email', 'expiresAt', 'usedAt'])
    .where('tokenHash', '=', tokenHash)
    .executeTakeFirst()

  if (!tokenRecord || tokenRecord.usedAt || new Date(tokenRecord.expiresAt).getTime() < Date.now()) {
    return sendRedirect(event, getRedirectUrl(event, 'invalid'), 302)
  }

  const now = new Date()

  const result = await database
    .updateTable('user')
    .set({
      emailVerified: true,
      updatedAt: now
    })
    .where('id', '=', tokenRecord.userId)
    .where('email', '=', tokenRecord.email)
    .executeTakeFirst()

  await database
    .updateTable('userEmailConfirmationToken')
    .set({
      usedAt: now
    })
    .where('id', '=', tokenRecord.id)
    .execute()

  if (Number(result.numUpdatedRows ?? 0) === 0) {
    return sendRedirect(event, getRedirectUrl(event, 'invalid'), 302)
  }

  return sendRedirect(event, getRedirectUrl(event, 'success'), 302)
})

import { createHash, randomBytes, randomUUID } from 'node:crypto'
import { auth } from '../../../utils/auth.js'
import { useDatabase } from '../../../utils/database.js'
import { sendNotificoreEmail, isNotificoreTimeoutError } from '../../../utils/notificore.js'

const TOKEN_TTL_MS = 60 * 60 * 1000
const DEFAULT_SUPPORT_EMAIL = 'info@indigo-mail.ru'
const DEFAULT_EMAIL_LOGO_PATH = '/email/logo-indigo.png'
const DEFAULT_EMAIL_AVATAR_PATH = '/email/avatar-indigo.png'

const createToken = () => randomBytes(32).toString('base64url')

const hashToken = token => createHash('sha256').update(token).digest('hex')

const readEnv = name => process.env[name]?.trim() || ''

const getRuntimeString = value => (
  typeof value === 'string' ? value.trim() : ''
)

const buildPublicUrl = (origin, value) => {
  const url = String(value ?? '').trim()

  if (!url) return ''
  if (/^https?:\/\//i.test(url) || /^mailto:/i.test(url)) return url

  return new URL(url.startsWith('/') ? url : `/${url}`, origin).href
}

const getTemplateAssetUrl = (origin, configValue, envName, fallbackPath) => (
  buildPublicUrl(origin, getRuntimeString(configValue) || readEnv(envName) || fallbackPath)
)

const getFormattedEmailTime = date => new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'Europe/Moscow',
  hour: '2-digit',
  minute: '2-digit'
}).format(date)

const getDisplayName = user => (
  String(user?.name ?? '').trim()
  || String(user?.email ?? '').trim()
  || 'Клиент Индиго'
)

const getNotificoreErrorMessage = (error) => {
  const validationMessages = Object.values(error?.data?.errors ?? {})
    .flat()
    .filter(Boolean)

  if (validationMessages.length) {
    return validationMessages.join('; ')
  }

  return (
    error?.data?.errorDescription
    || error?.data?.message
    || error?.data?.error
    || (typeof error?.data === 'string' ? error.data : '')
    || error?.message
    || 'Не удалось отправить письмо подтверждения'
  )
}

const getNotificoreErrorDetails = error => ({
  status: error?.status || error?.statusCode,
  statusMessage: error?.statusMessage,
  data: error?.data
})

const getNotificoreStatusCode = (error) => {
  const statusCode = error?.statusCode || error?.status || 502

  return statusCode >= 500 ? 502 : statusCode
}

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  })

  if (!session?.user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Войдите, чтобы подтвердить почту'
    })
  }

  const database = useDatabase()
  const user = await database
    .selectFrom('user')
    .select(['email', 'emailVerified', 'name'])
    .where('id', '=', session.user.id)
    .executeTakeFirst()

  const email = String(user?.email ?? '').trim().toLowerCase()

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing email',
      message: 'Укажите почту перед подтверждением'
    })
  }

  const origin = getRequestURL(event).origin
  const token = createToken()
  const confirmationUrl = `${origin}/api/profile/email/confirm?t=${encodeURIComponent(token)}`
  const now = new Date()
  const expiresAt = new Date(now.getTime() + TOKEN_TTL_MS)
  const runtimeConfig = useRuntimeConfig()
  const notificoreConfig = runtimeConfig.notificore ?? {}
  const supportEmail = getRuntimeString(notificoreConfig.supportEmail)
    || readEnv('NOTIFICORE_EMAIL_SUPPORT_EMAIL')
    || DEFAULT_SUPPORT_EMAIL
  const supportUrl = buildPublicUrl(
    origin,
    getRuntimeString(notificoreConfig.supportUrl)
    || readEnv('NOTIFICORE_EMAIL_SUPPORT_URL')
    || `mailto:${supportEmail}`
  )
  const logoUrl = getTemplateAssetUrl(
    origin,
    notificoreConfig.emailLogoUrl,
    'NOTIFICORE_EMAIL_LOGO_URL',
    DEFAULT_EMAIL_LOGO_PATH
  )
  const avatarUrl = getTemplateAssetUrl(
    origin,
    notificoreConfig.emailAvatarUrl,
    'NOTIFICORE_EMAIL_AVATAR_URL',
    DEFAULT_EMAIL_AVATAR_PATH
  )
  const userName = getDisplayName(user)
  const headerTime = getFormattedEmailTime(now)

  await database
    .updateTable('userEmailConfirmationToken')
    .set({
      usedAt: now
    })
    .where('userId', '=', session.user.id)
    .where('email', '=', email)
    .where('usedAt', 'is', null)
    .execute()

  await database
    .insertInto('userEmailConfirmationToken')
    .values({
      id: randomUUID(),
      userId: session.user.id,
      email,
      tokenHash: hashToken(token),
      expiresAt,
      usedAt: null,
      createdAt: now
    })
    .execute()

  try {
    const result = await sendNotificoreEmail({
      to: [email],
      subject: 'Подтверждение почты Индиго',
      templateContent: {
        confirmationUrl,
        supportUrl,
        supportEmail,
        logoUrl,
        avatarUrl,
        userName,
        userEmail: email,
        headerTime
      }
    })

    console.info('[profile/email/confirmation] Notificore response:', result)
  } catch (error) {
    const details = getNotificoreErrorDetails(error)

    console.error('[profile/email/confirmation] Notificore error:', details)

    if (error?.statusMessage === 'Notificore email is not configured') {
      throw error
    }

    if (isNotificoreTimeoutError(error)) {
      throw createError({
        statusCode: 504,
        statusMessage: 'Notificore timeout',
        message: 'Сервис email не ответил вовремя. Попробуйте ещё раз.'
      })
    }

    throw createError({
      statusCode: getNotificoreStatusCode(error),
      statusMessage: 'Notificore email failed',
      message: getNotificoreErrorMessage(error),
      data: details.data
    })
  }

  return { ok: true }
})

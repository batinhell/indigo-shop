import { formatAuthPhone, normalizePhoneDigits } from '~~/shared/utils/auth-identifier.js'
import { auth } from '../../utils/auth.js'
import { isNotificoreTimeoutError, verifyNotificoreOtp } from '../../utils/notificore.js'
import { useDatabase } from '../../utils/database.js'

const isHttpError = error => (
  typeof error === 'object'
  && error !== null
  && 'statusCode' in error
)

const isInternalConfigError = error => (
  error?.statusMessage === 'Notificore is not configured'
  || error?.statusMessage === 'Notificore auth failed'
)

const getUpstreamStatus = error => (
  error?.statusCode
  ?? error?.status
  ?? error?.response?.status
  ?? 0
)

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
      message: 'Войдите, чтобы изменить номер телефона'
    })
  }

  const body = await readBody(event)
  const authenticationId = String(body.authenticationId ?? '').trim()
  const code = String(body.code ?? '').replace(/\D/g, '')
  const phoneDigits = normalizePhoneDigits(body.phone)
  const phoneNumber = formatAuthPhone(phoneDigits)

  if (phoneDigits.length !== 11) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid phone',
      message: 'Введите полный номер телефона'
    })
  }

  if (!authenticationId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing authentication id',
      message: 'Отправьте код повторно'
    })
  }

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing code',
      message: 'Введите код из СМС'
    })
  }

  try {
    const result = await verifyNotificoreOtp({ authenticationId, code })
    const recipientDigits = normalizePhoneDigits(result?.data?.recipient ?? result?.recipient ?? '')

    if (recipientDigits && recipientDigits !== phoneDigits) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Phone mismatch',
        message: 'Код подтверждения не подходит для этого номера'
      })
    }
  } catch (error) {
    console.error('[profile/phone] Notificore error:', error)

    if (isNotificoreTimeoutError(error)) {
      throw createError({
        statusCode: 504,
        statusMessage: 'Notificore timeout',
        message: 'Сервис СМС не ответил вовремя. Попробуйте ещё раз.'
      })
    }

    if (isHttpError(error) && isInternalConfigError(error)) {
      throw error
    }

    if (isHttpError(error) && error.statusCode === 400) {
      throw error
    }

    const upstreamStatus = getUpstreamStatus(error)

    throw createError({
      statusCode: upstreamStatus === 422 ? 400 : 502,
      statusMessage: 'Notificore verify failed',
      message: upstreamStatus === 422
        ? 'Неверный код из СМС'
        : 'Код не подошел :( Проверьте его или получите повторно через 60 секунд'
    })
  }

  const database = useDatabase()

  try {
    await database
      .updateTable('user')
      .set({
        phoneNumber,
        phoneNumberVerified: true,
        updatedAt: new Date()
      })
      .where('id', '=', session.user.id)
      .execute()
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Phone already exists',
        message: 'Этот номер уже используется'
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

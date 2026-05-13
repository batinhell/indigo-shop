import {
  assertSuccessfulNotificoreOtpResponse,
  getNotificoreAuthenticationId,
  getNotificoreAuthenticationPayload,
  isNotificoreTimeoutError,
  sendNotificoreOtp
} from '../../../utils/notificore.js'
import { assertRateLimit } from '../../../utils/rate-limit.js'
import { formatAuthPhone, normalizePhoneDigits } from '~~/shared/utils/auth-identifier.js'
import { useDatabase } from '../../../utils/database.js'

const isHttpError = error => (
  typeof error === 'object'
  && error !== null
  && 'statusCode' in error
)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const phone = formatAuthPhone(body.phone)

  if (normalizePhoneDigits(phone).length !== 11) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid phone',
      message: 'Введите полный номер телефона'
    })
  }

  const user = await useDatabase()
    .selectFrom('user')
    .select('id')
    .where('phoneNumber', '=', phone)
    .executeTakeFirst()

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
      message: 'Пользователь с таким телефоном не найден'
    })
  }

  assertRateLimit(`password-recovery-otp:${phone}`, 60000)

  try {
    const result = await sendNotificoreOtp({ phone })
    const data = getNotificoreAuthenticationPayload(result)
    assertSuccessfulNotificoreOtpResponse(data)

    setResponseStatus(event, 201)

    return {
      authenticationId: getNotificoreAuthenticationId(data),
      status: data.status ?? 'pending',
      recipient: data.recipient ?? phone,
      expiredAt: data.expired_at ?? null
    }
  } catch (error) {
    console.error('[password-recovery/request-code] Notificore error:', error)

    if (isNotificoreTimeoutError(error)) {
      throw createError({
        statusCode: 504,
        statusMessage: 'Notificore timeout',
        message: 'Сервис СМС не ответил вовремя. Попробуйте отправить код ещё раз.'
      })
    }

    if (isHttpError(error)) {
      throw error
    }

    throw createError({
      statusCode: 502,
      statusMessage: 'Notificore request failed',
      message: 'Не удалось отправить код подтверждения'
    })
  }
})

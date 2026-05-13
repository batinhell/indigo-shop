import {
  assertSuccessfulNotificoreOtpResponse,
  getNotificoreAuthenticationId,
  getNotificoreAuthenticationPayload,
  isNotificoreTimeoutError,
  sendNotificoreOtp
} from '../../utils/notificore.js'
import { normalizePhoneDigits } from '~~/shared/utils/auth-identifier.js'
import { assertRateLimit } from '../../utils/rate-limit.js'

const isHttpError = error => (
  typeof error === 'object'
  && error !== null
  && 'statusCode' in error
)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const phone = normalizePhoneDigits(body.phone)

  if (phone.length !== 11) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid phone',
      message: 'Введите полный номер телефона'
    })
  }

  if (!body.isPersonalDataAccepted || !body.isUserAgreementAccepted) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Required agreements are not accepted',
      message: 'Необходимо принять политику обработки персональных данных и пользовательское соглашение'
    })
  }

  assertRateLimit(`otp:${phone}`, 60000)

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
    console.error('[request-code] Notificore error:', error)

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

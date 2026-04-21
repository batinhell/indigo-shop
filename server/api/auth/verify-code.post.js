import { isNotificoreTimeoutError, verifyNotificoreOtp } from '../../utils/notificore.js'

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

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const authenticationId = String(body.authenticationId ?? '').trim()
  const code = String(body.code ?? '').replace(/\D/g, '')

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
    const data = result.data ?? {}

    return {
      authenticationId: data.id ?? authenticationId,
      status: data.status ?? 'verified',
      recipient: data.recipient ?? null,
      expiredAt: data.expired_at ?? null,
      verified: true
    }
  } catch (error) {
    console.error('[verify-code] Notificore error:', error)

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

    const upstreamStatus = getUpstreamStatus(error)

    throw createError({
      statusCode: upstreamStatus === 422 ? 400 : 502,
      statusMessage: 'Notificore verify failed',
      message: upstreamStatus === 422
        ? 'Неверный код из СМС'
        : 'Не удалось проверить код подтверждения'
    })
  }
})

const attempts = new Map()
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()

  if (now - lastCleanup < CLEANUP_INTERVAL_MS) {
    return
  }

  const cutoff = now - CLEANUP_INTERVAL_MS

  for (const [key, timestamp] of attempts) {
    if (timestamp < cutoff) {
      attempts.delete(key)
    }
  }

  lastCleanup = now
}

export function assertRateLimit(key, windowMs = 60000) {
  cleanup()

  const now = Date.now()
  const last = attempts.get(key)

  if (last && now - last < windowMs) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests',
      message: 'Отправка кода возможна не чаще раза в минуту'
    })
  }

  attempts.set(key, now)
}

import { defineEventHandler, sendWebResponse, toWebRequest } from 'h3'

import { auth } from '../../utils/auth.js'

const EMAIL_EXISTS_MESSAGE = 'Пользователь с такой почтой уже есть. Проверьте пароль или используйте другую почту.'
const EMAIL_ALREADY_EXISTS_CODES = new Set([
  'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL',
  'USER_ALREADY_EXISTS',
  'EMAIL_ALREADY_EXISTS'
])

function extractErrorCode(payload) {
  if (!payload || typeof payload !== 'object') {
    return ''
  }

  return String(
    payload.code
    || payload.error?.code
    || payload.data?.code
    || ''
  ).toUpperCase()
}

async function normalizeSignUpEmailError(response) {
  if (response.status < 400) {
    return response
  }

  const payload = await response.clone().json().catch(() => null)
  const errorCode = extractErrorCode(payload)
  if (!EMAIL_ALREADY_EXISTS_CODES.has(errorCode)) {
    return response
  }

  const headers = new Headers(response.headers)
  headers.set('content-type', 'application/json; charset=utf-8')
  headers.delete('content-length')

  return new Response(JSON.stringify({
    code: 'EMAIL_ALREADY_EXISTS',
    message: EMAIL_EXISTS_MESSAGE
  }), {
    status: 409,
    statusText: 'Conflict',
    headers
  })
}

export default defineEventHandler(async (event) => {
  const request = toWebRequest(event)
  let response = await auth.handler(request)

  const requestPath = new URL(request.url).pathname
  const isSignUpEmailRequest = request.method === 'POST' && requestPath.endsWith('/sign-up/email')

  if (isSignUpEmailRequest) {
    response = await normalizeSignUpEmailError(response)
  }

  return sendWebResponse(event, response)
})

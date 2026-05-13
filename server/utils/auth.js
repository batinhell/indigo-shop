import { betterAuth } from 'better-auth'
import { phoneNumber } from 'better-auth/plugins'

import { isAuthPhone } from '~~/shared/utils/auth-identifier.js'
import { useDatabase } from './database.js'
import { sendNotificoreEmail } from './notificore.js'

const runtimeConfig = useRuntimeConfig()
const betterAuthUrl = runtimeConfig.betterAuth?.url || ''
const betterAuthSecret = runtimeConfig.betterAuth?.secret || ''

export const auth = betterAuth({
  database: {
    db: useDatabase(),
    type: 'mysql'
  },
  basePath: '/api/auth',
  baseURL: betterAuthUrl || undefined,
  secret: betterAuthSecret || undefined,
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      const resetUrl = new URL('/profile', url)
      resetUrl.searchParams.set('passwordReset', '1')
      resetUrl.searchParams.set('token', token)

      await sendNotificoreEmail({
        to: [user.email],
        subject: 'Восстановление пароля Индиго',
        templateContent: {
          confirmationUrl: resetUrl.href,
          profileUrl: resetUrl.href
        }
      })
    }
  },
  plugins: [
    phoneNumber({
      requireVerification: false,
      phoneNumberValidator: isAuthPhone,
      sendOTP: async () => {}
    })
  ],
  user: {
    deleteUser: {
      enabled: true
    },
    additionalFields: {
      phoneNumber: {
        type: 'string',
        required: false,
        unique: true,
        returned: true,
        input: true
      },
      phoneNumberVerified: {
        type: 'boolean',
        required: false,
        defaultValue: false,
        returned: true,
        input: false
      }
    }
  }
})

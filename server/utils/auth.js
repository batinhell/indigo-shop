import { betterAuth } from 'better-auth'
import { phoneNumber } from 'better-auth/plugins'

import { isAuthPhone } from '~~/shared/utils/auth-identifier.js'
import { useDatabase } from './database.js'
import { sendNotificoreEmail } from './notificore.js'

const runtimeConfig = useRuntimeConfig()
const readEnv = name => process.env[name]?.trim() || ''
const betterAuthUrl = runtimeConfig.betterAuth?.url || readEnv('BETTER_AUTH_URL')
const betterAuthSecret = runtimeConfig.betterAuth?.secret || readEnv('BETTER_AUTH_SECRET')
const betterAuthTrustedOrigins = [
  'https://ra-indigo.com',
  String(runtimeConfig.betterAuth?.trustedOrigins || ''),
  readEnv('BETTER_AUTH_TRUSTED_ORIGINS')
]
  .join(',')
  .split(',')
  .map(origin => origin.trim().replace(/\/$/, ''))
  .filter(Boolean)

export const auth = betterAuth({
  database: {
    db: useDatabase(),
    type: 'mysql'
  },
  basePath: '/api/auth',
  baseURL: betterAuthUrl || undefined,
  secret: betterAuthSecret || undefined,
  trustedOrigins: betterAuthTrustedOrigins,
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

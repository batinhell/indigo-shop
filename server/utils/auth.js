import { betterAuth } from 'better-auth'
import { phoneNumber } from 'better-auth/plugins'

import { isAuthPhone } from '~~/shared/utils/auth-identifier.js'
import { useDatabase } from './database.js'

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
    enabled: true
  },
  plugins: [
    phoneNumber({
      requireVerification: false,
      phoneNumberValidator: isAuthPhone,
      sendOTP: async () => {}
    })
  ],
  user: {
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

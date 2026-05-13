// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    notificore: {
      apiKey: '',
      apiBaseUrl: 'https://api.notificore.ru',
      oneApiBaseUrl: 'https://one-api.notificore.ru',
      sender: '',
      otpTemplateId: '',
      emailApiKey: '',
      emailApiBaseUrl: 'https://one-api.notificore.ru',
      emailFrom: '',
      confirmationEmailTemplateId: '',
      codeDigits: 4,
      codeLifetime: 60,
      codeMaxTries: 3,
      emailTimeout: 20000
    },
    dadata: {
      apiKey: '',
      suggestUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'
    },
    vtbPayment: {
      baseUrl: 'https://vtb.rbsuat.com/payment/rest/',
      token: '',
      userName: '',
      password: '',
      returnUrl: '',
      failUrl: '',
      callbackUrl: '',
      qrTtlSeconds: 900
    },
    betterAuth: {
      url: '',
      secret: ''
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    preset: 'node-server'
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables" as *;\n'
        }
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})

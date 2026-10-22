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
        { rel: 'icon', href: '/favicon/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  vue: {
    compilerOptions: {
      // TresJS: примитивы <Tres*> обрабатывает свой рендерер, Vue их не резолвит.
      // TresCanvas — обычный компонент, его исключаем.
      isCustomElement: (tag: string) => tag.startsWith('Tres') && tag !== 'TresCanvas'
    }
  },

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
      emailLogoUrl: '',
      emailAvatarUrl: '',
      supportEmail: '',
      supportUrl: '',
      codeDigits: 4,
      codeLifetime: 60,
      codeMaxTries: 3,
      emailTimeout: 20000
    },
    dadata: {
      apiKey: '',
      suggestUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'
    },
    crmApi: {
      baseUrl: '',
      token: ''
    },
    shopApi: {
      token: ''
    },
    vtbPayment: {
      sbpBaseUrl: 'https://test3.api.vtb.ru:8443/openapi/smb/efcp/sbp-gateway/v1/',
      tokenUrl: 'https://epa-ift-sbp.vtb.ru:443/passport/oauth2/token',
      clientId: '',
      clientSecret: '',
      headerClientId: '',
      merchantAuthorization: '',
      returnUrl: '',
      callbackUrl: '',
      qrTtlSeconds: 1200
    },
    rarusKkt: {
      baseUrl: 'https://kkm.rarus-cloud.ru',
      apiVersion: '1.1.7',
      apiKey: '',
      inn: '6234117358',
      taxSystem: 'OSN',
      tax: 'none',
      paymentAddress: '',
      paymentPlace: '',
      senderEmail: '',
      signMethodCalculation: 'full_prepayment',
      signCalculationObject: 'commodity',
      tag1011: 2
    },
    betterAuth: {
      url: '',
      secret: '',
      trustedOrigins: 'https://ra-indigo.com'
    }
  },

  // Главная на этой ветке — статический макет в кадре, данных ей не нужно.
  // Предрендер снят: он поднимал подключение к базе на этапе сборки, а собираем мы локально,
  // где .env с доступами к общей с продом базе нет и быть не должно.
  routeRules: {},

  // Серверные sourcemaps не нужны в проде стенда и утяжеляют сборку Nitro
  // (на сервере без swap она падала по OOM на этом шаге).
  sourcemap: {
    server: false
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
    preset: 'node-server',
    // Минификация серверного бандла — главный пожиратель памяти на сборке Nitro
    // (сервер стенда 3.8 ГБ без swap, падало по OOM). На сервере не нужна.
    minify: false
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
  },

  fonts: {
    provider: 'local',
    families: [
      { name: 'Manrope', provider: 'none' }
    ]
  },

  icon: {
    // simple-icons в коде не используются; не зашиваем их в server-бандл (~4.7 МБ),
    // иначе сборка Nitro упирается в память на стенде без swap. Нужен только lucide.
    serverBundle: {
      collections: ['lucide']
    }
  }
})

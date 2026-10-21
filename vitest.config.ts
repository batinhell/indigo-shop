import { defineConfig } from 'vitest/config'

// Юнит-тесты ядра конструктора. Тесты чистые (без Vue/Nuxt/DOM),
// поэтому окружение node и среда Nuxt не нужны.
export default defineConfig({
  test: {
    include: ['app/configurator/**/*.test.ts'],
    environment: 'node'
  },
  // Не читаем проектный tsconfig: он ссылается на сгенерированный Nuxt'ом
  // .nuxt/tsconfig.*, которого нет до сборки (и в CI тоже). Тестам он не нужен.
  esbuild: {
    tsconfigRaw: '{}'
  }
})

<script setup>
const title = 'Типография Индиго'
const description = 'Печать флагов, текстиля, фотоальбомов и корпоративной продукции.'

// Метка сборки в адресе кадра: без неё браузер показывает страницу из кэша,
// потому что сам кадр при обычном обновлении не перезагружается
const config = useRuntimeConfig()
const landingSrc = computed(() => `/landing/index.html?v=${config.app?.buildId ?? 'dev'}`)

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <!-- Макет главной лежит статикой в public/landing и подключается кадром:
       у страницы своя вёрстка и свои имена классов, поэтому её стили
       намеренно изолированы от остального сайта -->
  <iframe
    class="landing-frame"
    :src="landingSrc"
    title="Главная страница типографии Индиго"
  />
</template>

<style scoped>
.landing-frame {
  border: 0;
  display: block;
  height: 100%;
  inset: 0;
  position: fixed;
  width: 100%;
}
</style>

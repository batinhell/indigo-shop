<script setup>
const title = 'Indigo — Печать флагов на заказ'
const description = 'Типография Indigo: печать флагов любых размеров и конфигураций. Конструктор флагов, быстрый заказ, доставка по России.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>

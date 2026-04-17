<script setup>
const title = 'Indigo — Печать флагов на заказ'
const description = 'Типография Indigo: печать флагов любых размеров и конфигураций. Конструктор флагов, быстрый заказ, доставка по России.'
const route = useRoute()

const isGridEnabled = computed(() => {
  if (!import.meta.dev) {
    return false
  }

  const value = route.query.grid
  const normalized = Array.isArray(value) ? value[0] : value

  return normalized === '1' || normalized === 'true'
})

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
    <DevGridOverlay v-if="isGridEnabled" />

    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { authClient } from '~/utils/auth-client.js'

const title = 'Indigo — Печать флагов на заказ'
const description = 'Типография Indigo: печать флагов любых размеров и конфигураций. Конструктор флагов, быстрый заказ, доставка по России.'
const route = useRoute()
const isCartOpen = ref(false)
const session = authClient.useSession()
const profileStore = useProfileStore()
const { isLoaded: isProfileLoaded } = storeToRefs(profileStore)

const sessionUser = computed(() => session.value?.data?.user ?? null)

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

function openCart() {
  isCartOpen.value = true
}

function continueShopping() {
  isCartOpen.value = false
  navigateTo('/catalog')
}

watch(
  sessionUser,
  (user) => {
    if (!user) {
      profileStore.clearProfile()
      return
    }

    if (!isProfileLoaded.value) {
      profileStore.fetchProfileOnce().catch(() => {})
    }
  },
  { immediate: true }
)
</script>

<template>
  <UApp>
    <DevGridOverlay v-if="isGridEnabled" />

    <AppHeader @open-cart="openCart" />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />

    <CartModal
      v-model="isCartOpen"
      @continue-shopping="continueShopping"
    />
  </UApp>
</template>

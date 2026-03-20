<script setup lang="ts">
const navigation = [
  { label: 'Главная', to: '/' },
  { label: 'Конструктор', to: '/constructor' }
]
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="text-xl font-bold text-primary">Indigo</span>
      </NuxtLink>
    </template>

    <template #center>
      <UNavigationMenu :items="navigation" />
    </template>

    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>

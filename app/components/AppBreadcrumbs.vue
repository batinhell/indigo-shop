<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <nav
    class="breadcrumbs"
    aria-label="Хлебные крошки"
  >
    <template
      v-for="(item, index) in items"
      :key="`${item.label}-${index}`"
    >
      <NuxtLink
        v-if="item.to"
        :to="item.to"
        class="breadcrumbs__link"
      >
        {{ item.label }}
      </NuxtLink>
      <span
        v-else
        class="breadcrumbs__link breadcrumbs__link_current"
      >
        {{ item.label }}
      </span>
      <span
        v-if="index < items.length - 1"
        class="breadcrumbs__separator"
        aria-hidden="true"
      >
        /
      </span>
    </template>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 2rem;
}

.breadcrumbs__link,
.breadcrumbs__separator {
  color: rgba(4, 18, 27, 0.52);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
}

.breadcrumbs__link {
  padding-left: 0.125rem;
  text-decoration: none;
  transition: color 0.15s;
}

.breadcrumbs__link:not(.breadcrumbs__link_current):hover {
  color: #04121b;
}

.breadcrumbs__link:not(.breadcrumbs__link_current):active {
  color: rgba(4, 18, 27, 0.72);
}

.breadcrumbs__link:not(.breadcrumbs__link_current):focus-visible {
  border-radius: 0.25rem;
  outline: 2px solid rgba(201, 37, 255, 0.45);
  outline-offset: 0.125rem;
}

.breadcrumbs__link_current {
  cursor: default;
}

@media (max-width: 720px) {
  .breadcrumbs {
    margin-top: 1.5rem;
  }
}
</style>

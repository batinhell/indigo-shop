<script setup>
const props = defineProps({
  discount: {
    type: String,
    default: '-15%'
  },
  text: {
    type: String,
    default: 'На сайте дешевле'
  }
})
</script>

<template>
  <div class="product-badge">
    <div class="product-badge-item product-badge-item--discount">
      <div class="product-badge-item__main">{{ props.discount }}</div>
      <div class="product-badge-item__bottom" />
    </div>

    <div class="product-badge-item product-badge-item--label">
      <div class="product-badge-item__main">{{ props.text }}</div>
      <div class="product-badge-item__bottom" />
    </div>
  </div>
</template>

<style scoped>
.product-badge {
  display: inline-flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 0.25rem;
  overflow: visible;
  width: fit-content;
}

.product-badge-item {
  display: inline-flex;
  flex-direction: column;
  gap: 0;
  overflow: visible;
  width: fit-content;
}

.product-badge-item__main {
  align-items: center;
  background: #0abd5d;
  border-radius: 0.125rem 0.125rem 0.4375rem 0.4375rem;
  color: #e1ffed;
  display: inline-flex;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
  font-size: 0.75rem;
  font-weight: 600;
  justify-content: center;
  line-height: 1.1;
  min-height: 1.0625rem;
  padding: 0.125rem 0.3125rem 0.0625rem;
  white-space: nowrap;
}

.product-badge-item__bottom {
  background: #0abd5d;
  border-radius: 0.4375rem 0.4375rem 0.125rem 0.125rem;
  height: 0.1875rem;
  width: 100%;
}
</style>

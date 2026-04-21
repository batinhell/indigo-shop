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
      <span class="product-badge-item__text">
        {{ props.discount }}
      </span>
    </div>

    <div class="product-badge-item product-badge-item--label">
      <span class="product-badge-item__text">
        {{ props.text }}
      </span>
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
  align-items: center;
  display: inline-flex;
  height: 1.25rem;
  justify-content: center;
  padding: 0 0.3125rem;
  position: relative;
  width: fit-content;
}

.product-badge-item::before,
.product-badge-item::after {
  background: #0abd5d;
  border-radius: 0.25rem;
  content: '';
  height: 50%;
  left: 0;
  position: absolute;
  right: 0;
}

.product-badge-item::before {
  top: 0;
}

.product-badge-item::after {
  bottom: 0;
}

.product-badge-item__text {
  color: #e1ffed;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  position: relative;
  white-space: nowrap;
  z-index: 1;
}
</style>

<script setup>
const props = defineProps({
  price: {
    type: String,
    default: 'от 8888 ₽'
  },
  oldPrice: {
    type: String,
    default: '9999 ₽'
  },
  sale: {
    type: Boolean,
    default: false
  }
})

const hasSale = computed(() => props.sale && Boolean(props.oldPrice))
</script>

<template>
  <div class="product-price-row" :class="{ 'product-price-row--sale': hasSale }">
    <span class="product-price-row__current">{{ price }}</span>
    <span v-if="hasSale" class="product-price-row__old">{{ oldPrice }}</span>
  </div>
</template>

<style scoped>
.product-price-row {
  align-items: center;
  color: #a339c0;
  display: inline-flex;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
  font-size: 1.25rem;
  font-weight: 700;
  gap: 0.5rem;
  line-height: 1.5rem;
  white-space: nowrap;
  width: fit-content;
}

.product-price-row--sale {
  color: #0abd5d;
}

.product-price-row__current {
  display: inline-block;
}

.product-price-row__old {
  color: rgba(4, 18, 27, 0.24);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  text-decoration-line: line-through;
  text-decoration-skip-ink: none;
}
</style>

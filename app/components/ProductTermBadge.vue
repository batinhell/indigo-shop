<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'от 2 дней'
  },
  timing: {
    type: String,
    default: 'short',
    validator: value => ['short', 'medium', 'low'].includes(value)
  }
})

const iconName = computed(() => `term-${props.timing}`)
</script>

<template>
  <span
    class="product-term-badge"
    :class="`product-term-badge--${props.timing}`"
  >
    <AppIcon
      :name="iconName"
      :size="12"
      class="product-term-badge__icon"
    />
    <span class="product-term-badge__text">
      {{ props.text }}
    </span>
  </span>
</template>

<style scoped>
.product-term-badge {
  align-items: center;
  border-radius: 0.375rem;
  display: inline-flex;
  flex-shrink: 0;
  gap: 0.25rem;
  justify-content: center;
  padding: 0.25rem 0.375rem;
  width: fit-content;
}

.product-term-badge--short {
  background: #dbffde;
  color: #0abd5d;
}

.product-term-badge--medium {
  background: #fff2e0;
  color: #d27714;
}

.product-term-badge--low {
  background: #ffebed;
  color: #ed5c68;
}

.product-term-badge__icon {
  color: currentColor;
  flex-shrink: 0;
  height: 0.75rem;
  width: 0.75rem;
}

.product-term-badge__text {
  font-feature-settings: 'lnum' 1, 'pnum' 1;
  font-size: 0.625rem;
  font-weight: 600;
  line-height: 0.75rem;
  white-space: nowrap;
}
</style>

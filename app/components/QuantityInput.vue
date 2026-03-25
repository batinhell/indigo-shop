<script setup>
const model = defineModel({ type: Number, default: 1 })

const props = defineProps({
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 10000
  },
  suffix: {
    type: String,
    default: 'шт'
  }
})

const canDecrement = computed(() => model.value > props.min)
const canIncrement = computed(() => model.value < props.max)

function decrement() {
  if (canDecrement.value) {
    model.value = model.value - 1
  }
}

function increment() {
  if (canIncrement.value) {
    model.value = model.value + 1
  }
}
</script>

<template>
  <div class="qty-input">
    <button
      type="button"
      :class="['qty-input__btn', { 'qty-input__btn--disabled': !canDecrement }]"
      :disabled="!canDecrement"
      aria-label="Уменьшить количество"
      @click="decrement"
    >
      <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>
    <span class="qty-input__value">
      {{ model }} {{ suffix }}
    </span>
    <button
      type="button"
      :class="['qty-input__btn', { 'qty-input__btn--disabled': !canIncrement }]"
      :disabled="!canIncrement"
      aria-label="Увеличить количество"
      @click="increment"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.qty-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
  padding: 0.125rem;
  background: $color-input-bg;
  border-radius: $radius-control;
  overflow: hidden;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 0.625rem;
    flex-shrink: 0;
    color: $color-base;
    cursor: pointer;
    transition: background-color 0.15s;

    &:hover {
      background: rgba($color-base, 0.06);
    }

    &:active {
      background: rgba($color-base, 0.1);
    }

    &--disabled {
      color: rgba($color-base, 0.24);
      pointer-events: none;
    }
  }

  &__value {
    font-size: 1rem;
    font-weight: 600;
    color: $color-base;
    white-space: nowrap;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }
}
</style>

<script setup>
const model = defineModel({ type: Boolean, default: false })

defineProps({
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

function toggle() {
  model.value = !model.value
}
</script>

<template>
  <label
    :class="[
      'app-checkbox',
      { 'app-checkbox--checked': model, 'app-checkbox--disabled': disabled }
    ]"
  >
    <input
      v-model="model"
      type="checkbox"
      class="app-checkbox__input"
      :disabled="disabled"
    >
    <span class="app-checkbox__box">
      <svg
        v-if="model"
        class="app-checkbox__icon"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M3.5 8.5L6.5 11.5L12.5 5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span v-if="label" class="app-checkbox__label">{{ label }}</span>
    <span v-else class="app-checkbox__label">
      <slot />
    </span>
  </label>
</template>

<style lang="scss" scoped>
$color-base: #04121b;

.app-checkbox {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  user-select: none;

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  &__box {
    width: 1rem;
    height: 1rem;
    border-radius: 0.25rem;
    border: 2px solid rgba($color-base, 0.24);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: background-color 0.15s, border-color 0.15s;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    color: white;
  }

  &__label {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    color: $color-base;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  // Hover
  &:hover &__box {
    border-color: rgba($color-base, 0.36);
  }

  // Checked
  &--checked &__box {
    background: #c925ff;
    border-color: #c925ff;
  }

  &--checked:hover &__box {
    background: #e38fff;
    border-color: #e38fff;
  }

  // Disabled
  &--disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  &--disabled &__box {
    border-color: rgba($color-base, 0.12);
  }

  &--disabled &__label {
    color: rgba($color-base, 0.24);
  }

  &--disabled#{&}--checked &__box {
    background: rgba($color-base, 0.12);
    border-color: rgba($color-base, 0.12);
  }
}
</style>

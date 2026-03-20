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
</script>

<template>
  <label
    :class="[
      'app-switch',
      { 'app-switch--active': model, 'app-switch--disabled': disabled }
    ]"
  >
    <input
      v-model="model"
      type="checkbox"
      class="app-switch__input"
      :disabled="disabled"
    >
    <span class="app-switch__track">
      <span class="app-switch__thumb" />
    </span>
    <span v-if="label" class="app-switch__label">{{ label }}</span>
    <span v-else class="app-switch__label">
      <slot />
    </span>
  </label>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$track-w: 2.125rem;  // 34px
$track-h: 1.25rem;   // 20px
$thumb-size: 1rem;    // 16px
$thumb-offset: 0.125rem; // 2px

.app-switch {
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

  &__track {
    width: $track-w;
    height: $track-h;
    border-radius: calc($track-h / 2);
    background: rgba($color-base, 0.16);
    flex-shrink: 0;
    position: relative;
    transition: background-color 0.2s;
  }

  &__thumb {
    position: absolute;
    top: $thumb-offset;
    left: $thumb-offset;
    width: $thumb-size;
    height: $thumb-size;
    border-radius: 50%;
    background: white;
    transition: left 0.2s;
  }

  &__label {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    color: $color-base;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  // Active state
  &--active &__track {
    background: #c925ff;
  }

  &--active &__thumb {
    left: calc(#{$track-w} - #{$thumb-size} - #{$thumb-offset});
  }

  // Hover
  &:hover &__track {
    background: rgba($color-base, 0.24);
  }

  &--active:hover &__track {
    background: #e38fff;
  }

  // Disabled
  &--disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  &--disabled &__track {
    opacity: 0.4;
  }

  &--disabled &__label {
    color: rgba($color-base, 0.24);
  }
}
</style>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'ghost'].includes(v)
  },
  size: {
    type: String,
    default: 'lg',
    validator: (v) => ['md', 'lg'].includes(v)
  },
  icon: {
    type: String,
    default: null
  },
  iconOnly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'button'
  }
})

defineEmits(['click'])
</script>

<template>
  <component
    :is="tag"
    :class="[
      'app-button',
      `app-button--${variant}`,
      `app-button--${size}`,
      { 'app-button--icon-only': iconOnly, 'app-button--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <UIcon v-if="icon" :name="icon" class="app-button__icon" />
    <span v-if="!iconOnly" class="app-button__content">
      <slot />
    </span>
  </component>
</template>

<style lang="scss" scoped>
$color-base: #04121b;

.app-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  overflow: hidden;
  border-radius: 0.75rem;
  font-weight: 700;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;

  // --- Sizes ---

  &--lg {
    height: 3.25rem;
    padding: 0 1.125rem;
    font-size: 1.25rem;
    line-height: 1.5rem;
  }

  &--md {
    height: 2.5rem;
    padding: 0 0.875rem;
    font-size: 1rem;
    line-height: 1.25rem;
  }

  // --- Variants ---

  &--primary {
    background: #c925ff;
    color: white;

    &:hover {
      background: #e38fff;
    }

    &:active {
      background: #c000ff;
    }
  }

  &--ghost {
    background: rgba($color-base, 0.04);
    color: $color-base;

    &:hover {
      background: rgba($color-base, 0.08);
    }
  }

  // --- Icon-only ---

  &--icon-only {
    width: 3.25rem;
    padding: 0;
    flex-shrink: 0;

    &.app-button--md {
      width: 2.5rem;
    }
  }

  // --- Disabled ---

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  // --- Children ---

  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;

    .app-button--md & {
      width: 1rem;
      height: 1rem;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
}
</style>

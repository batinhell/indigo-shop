<script setup>
import { resolveComponent } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: v => ['primary', 'secondary', 'ghost', 'negative'].includes(v)
  },
  size: {
    type: String,
    default: 'l',
    validator: v => ['s', 'sm', 'md', 'm', 'lg', 'l'].includes(v)
  },
  tone: {
    type: String,
    default: 'regular',
    validator: v => ['regular', 'inverted'].includes(v)
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
  },
  type: {
    type: String,
    default: 'button'
  }
})

defineEmits(['click'])

const normalizedVariant = computed(() => {
  return props.variant === 'ghost' ? 'secondary' : props.variant
})

const normalizedSize = computed(() => {
  if (props.size === 'lg') return 'l'
  if (props.size === 'md') return 'm'
  return props.size
})

const componentTag = computed(() => {
  return props.tag === 'NuxtLink' ? resolveComponent('NuxtLink') : props.tag
})

const nativeButtonType = computed(() => {
  return props.tag === 'button' ? props.type : undefined
})
</script>

<template>
  <component
    :is="componentTag"
    :class="[
      'app-button',
      `app-button--${normalizedVariant}`,
      `app-button--${normalizedSize}`,
      `app-button--${tone}`,
      { 'app-button--icon-only': iconOnly, 'app-button--disabled': disabled }
    ]"
    :disabled="disabled"
    :type="nativeButtonType"
    @click="$emit('click', $event)"
  >
    <UIcon
      v-if="icon"
      :name="icon"
      class="app-button__icon"
    />
    <span
      v-if="!iconOnly"
      class="app-button__content"
    >
      <slot />
    </span>
  </component>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-purple: #de7aff;

.app-button {
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.75rem;
  color: #fff;
  font-family: inherit;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;

  // --- Sizes ---

  &--l {
    gap: 0.75rem;
    height: 3.25rem;
    padding: 0 1.125rem;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.5rem;
  }

  &--m {
    gap: 0.375rem;
    height: 2.5rem;
    padding: 0.5rem 1.125rem 0.5625rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
  }

  &--sm {
    gap: 0.25rem;
    height: 2rem;
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
  }

  &--s {
    gap: 0.25rem;
    height: 1.5rem;
    padding: 0.125rem 0.375rem;
    border-radius: 0.375rem;
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.0375rem;
    line-height: 0.75rem;
    text-transform: uppercase;
  }

  // --- Variants ---

  &--primary {
    background: $color-purple;
    color: white;

    &:not(:disabled):not(.app-button--disabled):hover {
      background: #e38fff;
    }

    &:not(:disabled):not(.app-button--disabled):active {
      background: #c925ff;
    }
  }

  &--secondary {
    background: #fcf3ff;
    color: $color-purple;

    &:not(:disabled):not(.app-button--disabled):hover {
      background: rgba(201, 37, 255, 0.1);
    }

    &:not(:disabled):not(.app-button--disabled):active {
      background: rgba(222, 122, 255, 0.3);
    }
  }

  &--negative {
    background: #ffebed;
    color: #ed5c68;

    &:not(:disabled):not(.app-button--disabled):hover {
      background: #ffe4e0;
    }

    &:not(:disabled):not(.app-button--disabled):active {
      background: #ffd9d6;
      color: #e12e3c;
    }
  }

  &--inverted.app-button--primary {
    background: #fff;
    color: $color-purple;

    &:not(:disabled):not(.app-button--disabled):hover {
      background: rgba(255, 255, 255, 0.8);
    }

    &:not(:disabled):not(.app-button--disabled):active {
      background: rgba(255, 255, 255, 0.64);
    }
  }

  &--inverted.app-button--secondary {
    background: rgba(255, 255, 255, 0.28);
    color: #fff;

    &:not(:disabled):not(.app-button--disabled):hover {
      background: rgba(255, 255, 255, 0.36);
    }

    &:not(:disabled):not(.app-button--disabled):active {
      background: rgba(255, 255, 255, 0.24);
    }
  }

  // --- Icon-only ---

  &--icon-only {
    width: 3.25rem;
    padding-inline: 0;
    flex-shrink: 0;

    &.app-button--m {
      width: 2.5rem;
    }

    &.app-button--sm {
      width: 2rem;
    }

    &.app-button--s {
      width: 1.5rem;
    }
  }

  // --- Disabled ---

  &--disabled {
    --fill-0: rgba(4, 18, 27, 0.24);

    background: rgba($color-base, 0.04);
    color: rgba($color-base, 0.24);
    cursor: not-allowed;
    pointer-events: none;
  }

  &--disabled :deep([fill='#ED5C68']) {
    fill: rgba($color-base, 0.24);
  }

  // --- Children ---

  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;

    .app-button--m & {
      width: 1rem;
      height: 1rem;
    }

    .app-button--sm & {
      width: 0.75rem;
      height: 0.75rem;
    }

    .app-button--s & {
      width: 0.75rem;
      height: 0.75rem;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
}
</style>

<script setup>
defineOptions({
  inheritAttrs: false
})

const model = defineModel({ default: '' })
const inputRef = ref(null)
const attrs = useAttrs()
let maskInstance = null

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: null
  },
  suffix: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  min: {
    type: Number,
    default: undefined
  },
  max: {
    type: Number,
    default: undefined
  },
  mask: {
    type: String,
    default: null
  }
})

const wrapperAttributes = computed(() => ({
  class: attrs.class,
  style: attrs.style
}))

const inputAttributes = computed(() => {
  const {
    class: _class,
    style: _style,
    ...rest
  } = attrs

  return rest
})

onMounted(async () => {
  if (inputRef.value && props.mask) {
    const { MaskInput } = await import('maska')
    maskInstance = new MaskInput(inputRef.value, { mask: props.mask })
  }
})

onBeforeUnmount(() => {
  maskInstance?.destroy()
})
</script>

<template>
  <div
    class="app-input-wrapper"
    :class="wrapperAttributes.class"
    :style="wrapperAttributes.style"
  >
    <div
      :class="[
        'app-input',
        { 'app-input--disabled': disabled }
      ]"
    >
      <UIcon v-if="icon" :name="icon" class="app-input__icon" />
      <input
        ref="inputRef"
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="min"
        :max="max"
        class="app-input__field"
        v-bind="inputAttributes"
      >
      <slot name="suffix" />
      <span v-if="suffix" class="app-input__suffix">{{ suffix }}</span>
    </div>
    <p v-if="description" class="app-input-description">
      {{ description }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-base-secondary: rgba($color-base, 0.64);
$color-input-bg: #f4f5f6;

.app-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.app-input {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  height: 2.5rem;
  padding: 0 0.875rem;
  background: $color-input-bg;
  border: 2px solid transparent;
  border-radius: 0.75rem;
  overflow: hidden;
  box-sizing: border-box;
  transition: background-color 0.15s, border-color 0.15s;

  &:focus-within {
    background: white;
    border-color: #de7aff;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: $color-base-secondary;
  }

  &__field {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    font-family: 'Manrope', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.2;
    color: $color-base;
    font-feature-settings: 'lnum' 1, 'pnum' 1;

    &::placeholder {
      color: $color-base-secondary;
      font-weight: 500;
    }

    &:not(:placeholder-shown) {
      font-weight: 600;
    }

    // Hide number input spinners
    &[type='number'] {
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  &__suffix {
    flex-shrink: 0;
    font-size: 1rem;
    font-weight: 600;
    color: $color-base-secondary;
  }

  &--disabled {
    pointer-events: none;
  }

  &--disabled &__field {
    color: rgba($color-base, 0.24);

    &::placeholder {
      color: rgba($color-base, 0.24);
    }
  }
}

.app-input-description {
  padding: 0 0.125rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  color: rgba($color-base, 0.48);
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}
</style>

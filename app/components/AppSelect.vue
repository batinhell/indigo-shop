<script setup>
const model = defineModel({ default: '' })

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)
const selectRef = ref(null)

const selectedLabel = computed(() => {
  const item = props.items.find(i => i.value === model.value)
  return item ? item.label : ''
})

function toggle() {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

function select(value) {
  model.value = value
  isOpen.value = false
}

function onClickOutside(e) {
  if (selectRef.value && !selectRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside, true)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside, true)
})
</script>

<template>
  <div
    ref="selectRef"
    :class="[
      'app-select',
      {
        'app-select--open': isOpen,
        'app-select--filled': !!selectedLabel,
        'app-select--disabled': disabled
      }
    ]"
  >
    <button
      type="button"
      class="app-select__trigger"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="app-select__value">
        {{ selectedLabel || placeholder }}
      </span>
      <svg
        class="app-select__chevron"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="app-select__dropdown">
        <button
          v-for="item in items"
          :key="item.value"
          type="button"
          :class="[
            'app-select__item',
            { 'app-select__item--selected': item.value === model }
          ]"
          @click="select(item.value)"
        >
          {{ item.label }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-base-secondary: rgba($color-base, 0.64);
$color-input-bg: #f4f5f6;
$color-dropdown-bg: #f6f6f6;

.app-select {
  position: relative;

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2.5rem;
    padding: 0 0.875rem;
    background: $color-input-bg;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    box-sizing: border-box;
    cursor: pointer;
    transition: border-color 0.15s, background-color 0.15s;
  }

  &__value {
    font-family: 'Manrope', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    color: $color-base-secondary;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__chevron {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: $color-base-secondary;
    transition: transform 0.2s;
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 0.125rem);
    left: 0;
    width: 100%;
    background: $color-dropdown-bg;
    border-radius: 0.75rem;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    z-index: 10;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 0.375rem 1rem;
    font-family: 'Manrope', sans-serif;
    font-size: 0.9375rem;
    font-weight: 600;
    color: $color-base-secondary;
    letter-spacing: -0.044rem;
    cursor: pointer;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    transition: background-color 0.1s;

    &:hover {
      background: rgba($color-base, 0.04);
    }

    &--selected {
      color: $color-base;
    }
  }

  // Filled state
  &--filled &__value {
    color: $color-base;
  }

  // Open state
  &--open &__trigger {
    border-color: #de7aff;
    background: white;
  }

  &__trigger:focus-visible {
    background: white;
    border-color: #de7aff;
    outline: none;
  }

  &--open &__chevron {
    transform: rotate(180deg);
  }

  // Disabled
  &--disabled &__trigger {
    pointer-events: none;
  }

  &--disabled &__value,
  &--disabled &__chevron {
    color: rgba($color-base, 0.24);
  }
}

// Dropdown transition
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-0.25rem);
}
</style>

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

const isEditing = ref(false)
const editValue = ref('')

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

function startEdit() {
  isEditing.value = true
  editValue.value = String(model.value)
}

function commitEdit() {
  isEditing.value = false
  const parsed = parseInt(editValue.value, 10)
  if (!Number.isNaN(parsed)) {
    model.value = Math.min(props.max, Math.max(props.min, parsed))
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
    <input
      v-if="isEditing"
      v-model="editValue"
      class="qty-input__input"
      type="text"
      inputmode="numeric"
      @blur="commitEdit"
      @keydown.enter="$event.target.blur()"
      @keydown.escape="isEditing = false"
      @vue:mounted="$event.el.focus(); $event.el.select()"
    >
    <span v-else class="qty-input__value" @click="startEdit">
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
  width: 9.6875rem;
  height: 2.5rem;
  padding: 0.125rem;
  background: $color-input-bg;
  border: 2px solid transparent;
  border-radius: $radius-control;
  overflow: hidden;
  transition: border-color 0.15s, background-color 0.15s;

  &:focus-within {
    border-color: #de7aff;
    background: white;
  }

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
    cursor: text;
  }

  &__input {
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    color: $color-base;
    background: transparent;
    border: none;
    outline: none;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }
}
</style>

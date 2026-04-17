<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  defaultActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:active', 'change', 'click'])

const isActive = ref(props.active || props.defaultActive)

watch(() => props.active, (value) => {
  isActive.value = value
})

function onToggle(event) {
  const nextValue = !isActive.value
  isActive.value = nextValue

  emit('update:active', nextValue)
  emit('change', nextValue)
  emit('click', nextValue, event)
}
</script>

<template>
  <button
    type="button"
    class="app-favorite-button"
    :class="{ 'app-favorite-button--active': isActive }"
    :aria-pressed="isActive ? 'true' : 'false'"
    aria-label="Добавить в избранное"
    @click="onToggle"
  >
    <AppIcon
      name="favorite"
      class="app-favorite-button__icon"
    />
  </button>
</template>

<style scoped>
.app-favorite-button {
  align-items: center;
  background: rgba(4, 18, 27, 0.08);
  border: 0;
  border-radius: 0.5rem;
  color: #a8afb3;
  cursor: pointer;
  display: inline-flex;
  height: 1.5rem;
  justify-content: center;
  padding: 0;
  transition: background-color 0.15s ease, color 0.15s ease;
  width: 1.5rem;
}

.app-favorite-button:hover {
  background: rgba(4, 18, 27, 0.12);
}

.app-favorite-button:active {
  background: rgba(4, 18, 27, 0.16);
}

.app-favorite-button--active {
  background: rgba(255, 235, 245, 0.5);
  color: #ff6bbf;
}

.app-favorite-button--active:hover {
  background: rgba(255, 224, 240, 0.5);
}

.app-favorite-button--active:active {
  background: rgba(255, 214, 235, 0.6);
}

.app-favorite-button:focus-visible {
  outline: 0.125rem solid rgba(201, 37, 255, 0.45);
  outline-offset: 0.125rem;
}

.app-favorite-button__icon {
  height: 0.875rem;
  width: 1rem;
}
</style>

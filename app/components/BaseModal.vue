<script setup>
const isOpen = defineModel({ required: true })

defineProps({
  title: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: String,
    default: '56.25rem'
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  overlayClass: {
    type: String,
    default: 'bg-[rgba(35,8,43,0.18)] backdrop-blur-[3px]'
  },
  wrapperClass: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :overlay="true"
    :close="false"
    :scrollable="true"
    :ui="{
      content: 'w-auto max-w-none bg-transparent ring-0 shadow-none p-0 rounded-none',
      overlay: overlayClass
    }"
  >
    <template #content>
      <div
        :class="['modal-wrapper', wrapperClass]"
        :style="{ '--modal-max-w': maxWidth }"
      >
        <!-- Header -->
        <div v-if="showHeader" class="modal-header">
          <div class="modal-header__left">
            <slot name="header-left" />
            <h2 v-if="title" class="modal-title">{{ title }}</h2>
          </div>
          <button class="close-btn" @click="isOpen = false">
            <svg class="close-btn__icon" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.46967 3.46967C3.76256 3.17678 4.23744 3.17678 4.53033 3.46967L8 6.93934L11.4697 3.46967C11.7626 3.17678 12.2374 3.17678 12.5303 3.46967C12.8232 3.76256 12.8232 4.23744 12.5303 4.53033L9.06066 8L12.5303 11.4697C12.8232 11.7626 12.8232 12.2374 12.5303 12.5303C12.2374 12.8232 11.7626 12.8232 11.4697 12.5303L8 9.06066L4.53033 12.5303C4.23744 12.8232 3.76256 12.8232 3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L6.93934 8L3.46967 4.53033C3.17678 4.23744 3.17678 3.76256 3.46967 3.46967Z" fill="currentColor" /></svg>
          </button>
        </div>

        <!-- Body -->
        <slot />
      </div>
    </template>
  </UModal>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$radius-outer: 2.25rem;
$radius-control: 0.75rem;

.modal-wrapper {
  width: min(calc(100dvw - 2rem), var(--modal-max-w, 56.25rem));
  max-width: 100%;
  margin: 0 auto;
  background: rgba(232, 236, 243, 0.92);
  backdrop-filter: blur(10px);
  padding: 0.4rem;
  border-radius: $radius-outer;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.375rem 1.375rem 0;
  border-radius: $radius-outer $radius-outer 0 0;

  &__left {
    display: flex;
    flex-direction: column;
  }
}

.modal-title {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.6;
  color: $color-base;
}

.close-btn {
  padding: 0.25rem;
  border-radius: $radius-control;
  color: rgba($color-base, 0.64);
  cursor: pointer;
  transition: background-color 0.2s, color 0.15s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: $color-base;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    display: block;
  }
}
</style>

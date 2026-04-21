<script setup>
const emit = defineEmits(['close'])

const flow = inject('authFlow')
const successTitle = flow.successTitle
const successDescription = flow.successDescription

function goToShopping() {
  emit('close')
  navigateTo('/catalog')
}
</script>

<template>
  <button
    type="button"
    class="auth-entry__success-close"
    aria-label="Закрыть окно регистрации"
    @click="$emit('close')"
  >
    <AppIcon
      name="close"
      :size="16"
      class="auth-entry__success-close-icon"
    />
  </button>

  <div class="auth-entry__success-content">
    <div class="auth-entry__success-main">
      <div class="auth-entry__success-header">
        <span class="auth-entry__success-mark" />

        <h2 class="auth-entry__success-title">
          {{ successTitle }}
        </h2>
      </div>

      <p class="auth-entry__success-description">
        {{ successDescription }}
      </p>
    </div>

    <button
      type="button"
      class="auth-entry__success-button"
      @click="goToShopping"
    >
      К покупкам
    </button>
  </div>
</template>

<style lang="scss" scoped>
.auth-entry__success-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.25rem;
  color: $color-base-secondary;
  border-radius: $radius-control;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;

  &:hover {
    color: $color-base;
    background: rgba($color-base, 0.04);
  }

  &:focus-visible {
    outline: 0.125rem solid rgba($color-primary, 0.45);
    outline-offset: 0.125rem;
  }
}

.auth-entry__success-close-icon {
  display: block;
  width: 1rem;
  height: 1rem;
}

.auth-entry__success-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding-right: 1.5rem;
}

.auth-entry__success-main {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.auth-entry__success-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.auth-entry__success-mark {
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba($color-base, 0.24);
  border-radius: 0.75rem;
}

.auth-entry__success-title {
  color: $color-base;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0;
}

.auth-entry__success-description {
  color: $color-base;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.43;
  letter-spacing: 0;
}

.auth-entry__success-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 7.75rem;
  height: 2.5rem;
  padding: 0.5rem 1.125rem 0.5625rem;
  color: #fff;
  background: #de7aff;
  border-radius: 0.75rem;
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:hover:not(:disabled) {
    background: #e38fff;
  }

  &:active:not(:disabled) {
    background: $color-primary;
  }

  &:disabled {
    cursor: wait;
    background: rgba(222, 122, 255, 0.56);
  }

  &:focus-visible {
    outline: 0.125rem solid rgba($color-primary, 0.45);
    outline-offset: 0.125rem;
  }
}
</style>

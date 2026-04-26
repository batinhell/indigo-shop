<script setup>
defineEmits(['close'])
</script>

<template>
  <div class="auth-entry__sent-actions">
    <button
      type="button"
      class="auth-entry__sent-button"
      @click="$emit('close')"
    >
      Хорошо
    </button>
  </div>
</template>

<style lang="scss" scoped>
.auth-entry__sent-actions {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 0;
}

.auth-entry__sent-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 7.125rem;
  height: 3.25rem;
  padding: 0.875rem 1.125rem;
  color: #fff;
  background: #de7aff;
  border-radius: 0.75rem;
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:hover {
    background: #e38fff;
  }

  &:active {
    background: $color-primary;
  }

  &:focus-visible {
    outline: 0.125rem solid rgba($color-primary, 0.45);
    outline-offset: 0.125rem;
  }
}
</style>

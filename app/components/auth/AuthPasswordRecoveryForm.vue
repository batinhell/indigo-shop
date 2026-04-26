<script setup>
const flow = inject('authFlow')
const passwordRecoveryEmail = flow.passwordRecoveryEmail
const visiblePasswordRecoveryEmailError = flow.visiblePasswordRecoveryEmailError
const passwordRecoveryRequestError = flow.passwordRecoveryRequestError
const passwordRecoveryRequestMessage = flow.passwordRecoveryRequestMessage
const isPasswordRecoveryRequestPending = flow.isPasswordRecoveryRequestPending
</script>

<template>
  <div class="auth-entry__recovery-fields">
    <div
      class="auth-entry__field"
      :class="{ 'auth-entry__field--invalid': visiblePasswordRecoveryEmailError }"
    >
      <label
        class="auth-entry__label"
        for="auth-entry-password-recovery-email"
      >
        Почта или телефон
      </label>

      <input
        id="auth-entry-password-recovery-email"
        v-model="passwordRecoveryEmail"
        class="auth-entry__input"
        type="text"
        placeholder="Почта или телефон"
        autocomplete="username"
        inputmode="email"
        :aria-invalid="Boolean(visiblePasswordRecoveryEmailError)"
        :aria-describedby="visiblePasswordRecoveryEmailError ? 'auth-entry-password-recovery-email-error' : undefined"
        @input="flow.onPasswordRecoveryEmailInput"
      >

      <p
        v-if="visiblePasswordRecoveryEmailError"
        id="auth-entry-password-recovery-email-error"
        class="auth-entry__error"
      >
        {{ visiblePasswordRecoveryEmailError }}
      </p>
    </div>
  </div>

  <p
    v-if="passwordRecoveryRequestError || passwordRecoveryRequestMessage"
    class="auth-entry__request-status"
    :class="{ 'auth-entry__request-status--error': passwordRecoveryRequestError }"
  >
    {{ passwordRecoveryRequestError || passwordRecoveryRequestMessage }}
  </p>

  <div class="auth-entry__recovery-actions">
    <button
      type="button"
      class="auth-entry__secondary-button"
      @click="flow.backToLoginFromPasswordRecovery"
    >
      Назад
    </button>

    <button
      type="submit"
      class="auth-entry__primary-button"
      :disabled="isPasswordRecoveryRequestPending"
    >
      {{ isPasswordRecoveryRequestPending ? 'Отправляем' : 'Продолжить' }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.auth-entry__recovery-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.auth-entry__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.auth-entry__label {
  padding: 0 0.125rem;
  color: $color-base;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.2;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  .auth-entry__field--invalid & {
    color: #e12e3c;
  }
}

.auth-entry__input {
  width: 100%;
  height: 3.25rem;
  padding: 0 0.875rem;
  color: $color-base;
  background: $color-input-bg;
  border: 0.125rem solid transparent;
  border-radius: $radius-control;
  outline: none;
  font-family: 'Manrope', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  .auth-entry__field--invalid & {
    color: #2e0509;
    background: #ffebed;
  }

  &::placeholder {
    color: $color-base-secondary;
  }

  &:focus {
    border-color: #de7aff;
  }
}

.auth-entry__error,
.auth-entry__request-status {
  padding: 0 0.125rem;
  color: #e12e3c;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__request-status {
  margin-top: -0.5rem;
  color: $color-base-secondary;
}

.auth-entry__request-status--error {
  color: #e12e3c;
}

.auth-entry__recovery-actions {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  margin-top: auto;
}

.auth-entry__primary-button,
.auth-entry__secondary-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.25rem;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:focus-visible {
    outline: 0.125rem solid rgba($color-primary, 0.45);
    outline-offset: 0.125rem;
  }
}

.auth-entry__primary-button {
  min-width: 10.125rem;
  color: #fff;
  background: #de7aff;

  &:hover:not(:disabled) {
    background: #e38fff;
  }

  &:disabled {
    cursor: wait;
    background: rgba(222, 122, 255, 0.56);
  }
}

.auth-entry__secondary-button {
  min-width: 6.0625rem;
  color: #de7aff;
  background: #f8edfc;

  &:hover {
    background: #f3defb;
  }
}
</style>

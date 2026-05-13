<script setup>
const flow = inject('authFlow')
const visibleError = flow.visibleError
const identifier = flow.identifier
const inputMode = flow.inputMode
const password = flow.password
const passwordInputType = flow.passwordInputType
const visibleLoginPasswordError = flow.visibleLoginPasswordError
const isPasswordVisible = flow.isPasswordVisible
const loginRequestError = flow.loginRequestError
const isLoginRequestPending = flow.isLoginRequestPending
</script>

<template>
  <div class="auth-entry__login-fields">
    <div
      class="auth-entry__field auth-entry__field--compact auth-entry__login-identifier-field"
      :class="{ 'auth-entry__field--invalid': visibleError }"
    >
      <label
        class="auth-entry__label"
        for="auth-entry-login-identifier"
      >
        Email или телефон
      </label>

      <AppInput
        id="auth-entry-login-identifier"
        v-model="identifier"
        class="auth-entry__input auth-entry__input--compact"
        type="text"
        placeholder="Email или телефон"
        autocomplete="username"
        :inputmode="inputMode"
        :aria-invalid="Boolean(visibleError)"
        :aria-describedby="visibleError ? 'auth-entry-login-error' : undefined"
        @input="flow.onIdentifierInput"
        @blur="flow.onIdentifierBlur"
      />

      <p
        v-if="visibleError"
        id="auth-entry-login-error"
        class="auth-entry__error"
      >
        {{ visibleError }}
      </p>
    </div>

    <div
      class="auth-entry__field auth-entry__field--compact auth-entry__password-field"
      :class="{ 'auth-entry__field--invalid': visibleLoginPasswordError }"
    >
      <label
        class="auth-entry__label"
        for="auth-entry-login-password"
      >
        Пароль
      </label>

      <AppInput
        id="auth-entry-login-password"
        v-model="password"
        class="auth-entry__input auth-entry__input--compact auth-entry__input--password"
        :type="passwordInputType"
        placeholder="Введите пароль"
        autocomplete="current-password"
        :aria-invalid="Boolean(visibleLoginPasswordError)"
        :aria-describedby="visibleLoginPasswordError || loginRequestError ? 'auth-entry-login-password-error' : undefined"
        @input="flow.onPasswordInput"
      >
        <template #suffix>
          <button
            type="button"
            class="auth-entry__password-toggle"
            :aria-label="isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
            @click="isPasswordVisible = !isPasswordVisible"
          >
            <AppIcon
              :name="isPasswordVisible ? 'password-hide' : 'password-show'"
              :size="16"
              class="auth-entry__password-toggle-icon"
            />
          </button>
        </template>
      </AppInput>

      <p
        v-if="visibleLoginPasswordError || loginRequestError"
        id="auth-entry-login-password-error"
        class="auth-entry__error"
      >
        {{ visibleLoginPasswordError || loginRequestError }}
      </p>

      <button
        type="button"
        class="auth-entry__forgot-password"
        @click="flow.startPasswordRecovery"
      >
        Забыли пароль?
      </button>
    </div>
  </div>

  <div class="auth-entry__login-actions">
    <button
      type="submit"
      class="auth-entry__login-button"
      :disabled="isLoginRequestPending"
    >
      {{ isLoginRequestPending ? 'Входим' : 'Войти' }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.auth-entry__login-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.auth-entry__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.auth-entry__field--compact {
  gap: 0.25rem;
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

.auth-entry__login-identifier-field,
.auth-entry__password-field {
  width: min(16.6875rem, 100%);
}

.auth-entry__input {
  width: 100%;

  :deep(.app-input) {
    height: 3.25rem;
  }

  :deep(.app-input__field) {
    font-size: 1.125rem;
    line-height: 1.5rem;
  }

  .auth-entry__field--invalid & {
    :deep(.app-input) {
      --app-input-background: #ffebed;
      --app-input-color: #2e0509;

      background: #ffebed;
    }
  }
}

.auth-entry__input--compact {
  :deep(.app-input) {
    height: 2.5rem;
  }

  :deep(.app-input__field) {
    font-size: 1rem;
    line-height: 1.2;
  }
}

.auth-entry__input--password {
  :deep(.app-input) {
    padding-right: 0.875rem;
  }
}

.auth-entry__password-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  color: $color-base-secondary;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: color 0.15s, background-color 0.15s;

  &:hover {
    color: $color-base;
    background: rgba($color-base, 0.04);
  }

  &:focus-visible {
    outline: 0.125rem solid rgba($color-primary, 0.45);
    outline-offset: 0.125rem;
  }
}

.auth-entry__password-toggle-icon {
  display: block;
  width: 1rem;
  height: 1rem;
}

.auth-entry__error {
  margin-top: -0.25rem;
  padding: 0 0.125rem;
  color: #e12e3c;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__forgot-password {
  align-self: flex-start;
  padding: 0.125rem;
  color: #de7aff;
  text-decoration: underline;
  text-decoration-thickness: 0.0625rem;
  text-underline-offset: 0.125rem;
  border-radius: 0.375rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  cursor: pointer;
  transition: color 0.15s, background-color 0.15s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:hover {
    color: #e38fff;
  }

  &:focus-visible {
    outline: 0.125rem solid rgba($color-primary, 0.45);
    outline-offset: 0.125rem;
  }
}

.auth-entry__request-status {
  margin-top: -0.5rem;
  padding: 0 0.125rem;
  color: $color-base-secondary;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__request-status--error {
  color: #e12e3c;
}

.auth-entry__login-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.875rem;
  width: 100%;
  margin-top: auto;
}

.auth-entry__login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  min-width: 6rem;
  height: 3.25rem;
  margin-top: auto;
  padding: 0.875rem 1rem;
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

<script setup>
const flow = inject('authFlow')

defineEmits(['close'])

const isPasswordRecoveryPhone = flow.isPasswordRecoveryPhone
const passwordRecoveryPhone = flow.passwordRecoveryPhone
const smsCode = flow.smsCode
const smsCodePlaceholder = flow.smsCodePlaceholder
const SMS_CODE_LENGTH = flow.SMS_CODE_LENGTH
const canResendCode = flow.canResendCode
const resendButtonText = flow.resendButtonText
const passwordRecoveryRequestError = flow.passwordRecoveryRequestError
const passwordRecoveryCodeError = flow.passwordRecoveryCodeError
const isCodeVerifyPending = flow.isCodeVerifyPending
</script>

<template>
  <div
    v-if="isPasswordRecoveryPhone"
    class="auth-entry__phone-recovery"
  >
    <div class="auth-entry__phone-recovery-fields">
      <div class="auth-entry__field auth-entry__phone-field">
        <label
          class="auth-entry__label"
          for="auth-entry-password-recovery-phone"
        >
          Номер телефона
        </label>

        <AppInput
          id="auth-entry-password-recovery-phone"
          :model-value="passwordRecoveryPhone"
          class="auth-entry__input auth-entry__input--phone auth-entry__input--readonly"
          type="tel"
          readonly
        />
      </div>

      <div
        class="auth-entry__field auth-entry__sms-code-field"
        :class="{ 'auth-entry__field--invalid': passwordRecoveryCodeError }"
      >
        <label
          class="auth-entry__label"
          for="auth-entry-password-recovery-sms-code"
        >
          Код из СМС
        </label>

        <AppInput
          id="auth-entry-password-recovery-sms-code"
          :model-value="smsCode"
          class="auth-entry__input auth-entry__input--sms-code"
          type="text"
          :placeholder="smsCodePlaceholder"
          autocomplete="one-time-code"
          inputmode="numeric"
          :maxlength="SMS_CODE_LENGTH"
          :disabled="isCodeVerifyPending"
          :aria-invalid="Boolean(passwordRecoveryCodeError)"
          :aria-describedby="passwordRecoveryCodeError ? 'auth-entry-password-recovery-code-error' : undefined"
          @input="flow.onSmsCodeInput"
        />
      </div>
    </div>

    <p
      v-if="passwordRecoveryCodeError"
      id="auth-entry-password-recovery-code-error"
      class="auth-entry__error"
    >
      {{ passwordRecoveryCodeError }}
    </p>

    <p
      v-if="passwordRecoveryRequestError"
      class="auth-entry__error"
    >
      {{ passwordRecoveryRequestError }}
    </p>

    <button
      type="button"
      class="auth-entry__resend"
      :class="{ 'auth-entry__resend--active': canResendCode }"
      :disabled="!canResendCode"
      @click="flow.requestPasswordRecovery"
    >
      {{ resendButtonText }}
    </button>
  </div>

  <div
    v-else
    class="auth-entry__sent-actions"
  >
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
.auth-entry__phone-recovery {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.auth-entry__phone-recovery-fields {
  display: flex;
  align-items: flex-end;
  gap: 0.625rem;
  width: 100%;
}

.auth-entry__field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.auth-entry__phone-field {
  flex: 1 1 auto;
}

.auth-entry__sms-code-field {
  flex: 0 0 5.875rem;
  width: 5.875rem;
}

.auth-entry__label {
  padding: 0 0.125rem;
  color: $color-base;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  .auth-entry__field--invalid & {
    color: #e12e3c;
  }
}

.auth-entry__input {
  width: 100%;

  :deep(.app-input) {
    height: 2.5rem;
  }

  :deep(.app-input__field) {
    font-size: 1rem;
    line-height: 1.25rem;
  }
}

.auth-entry__input--readonly {
  :deep(.app-input__field) {
    color: $color-base-secondary;
  }
}

.auth-entry__input--sms-code {
  :deep(.app-input) {
    --app-input-background: #fff;

    border-color: #de7aff;
  }

  :deep(.app-input__field) {
    font-feature-settings: 'lnum' 1, 'tnum' 1;
  }

  .auth-entry__field--invalid & {
    :deep(.app-input) {
      --app-input-background: #ffebed;
      --app-input-color: #2e0509;

      border-color: transparent;
      background: #ffebed;
    }
  }
}

.auth-entry__error {
  padding: 0 0.125rem;
  color: #e12e3c;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__resend {
  align-self: flex-start;
  padding: 0 0.125rem;
  color: $color-base-secondary;
  border-radius: 0.375rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  text-align: left;
  cursor: default;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:disabled {
    cursor: default;
  }
}

.auth-entry__resend--active {
  color: #de7aff;
  text-decoration: underline;
  text-decoration-thickness: 0.0625rem;
  text-underline-offset: 0.125rem;
  cursor: pointer;

  &:hover {
    color: #e38fff;
  }
}

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

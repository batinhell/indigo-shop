<script setup>
const flow = inject('authFlow')

const fullName = flow.fullName
const isSmsCodeConfirmed = flow.isSmsCodeConfirmed
const isPhoneConfirmed = flow.isPhoneConfirmed
const registrationPhone = flow.registrationPhone
const isSmsCodeInvalid = flow.isSmsCodeInvalid
const smsCode = flow.smsCode
const smsCodePlaceholder = flow.smsCodePlaceholder
const SMS_CODE_LENGTH = flow.SMS_CODE_LENGTH
const canResendCode = flow.canResendCode
const resendButtonText = flow.resendButtonText
const codeRequestError = flow.codeRequestError
const codeVerifyError = flow.codeVerifyError
const isCodeVerifyPending = flow.isCodeVerifyPending
const registrationEmail = flow.registrationEmail
const visibleRegistrationEmailError = flow.visibleRegistrationEmailError
const password = flow.password
const passwordInputType = flow.passwordInputType
const visiblePasswordError = flow.visiblePasswordError
const isPasswordVisible = flow.isPasswordVisible
const registrationRequestError = flow.registrationRequestError
const isRegistrationRequestPending = flow.isRegistrationRequestPending
const isLegalRepresentative = flow.isLegalRepresentative

watch(isPhoneConfirmed, (confirmed) => {
  if (confirmed) {
    flow.stopResendTimer()
    nextTick(() => {
      document.getElementById('auth-entry-email')?.focus()
    })
  }
})
</script>

<template>
  <div class="auth-entry__registration-fields">
    <div class="auth-entry__field auth-entry__field--compact auth-entry__name-field">
      <label
        class="auth-entry__label"
        for="auth-entry-code-name"
      >
        Имя и фамилия
      </label>

      <AppInput
        id="auth-entry-code-name"
        v-model="fullName"
        class="auth-entry__input auth-entry__input--compact"
        type="text"
        placeholder="Иван Иванов"
        autocomplete="name"
        @input="flow.onFullNameInput"
      />
    </div>

    <div class="auth-entry__code-fields">
      <div
        v-if="isSmsCodeConfirmed"
        class="auth-entry__registration-phone auth-entry__registration-phone--confirmed"
      >
        <div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field auth-entry__phone-field--confirmed">
          <label
            class="auth-entry__label"
            for="auth-entry-confirmed-phone"
          >
            Номер телефона
          </label>

          <AppInput
            id="auth-entry-confirmed-phone"
            v-model="registrationPhone"
            class="auth-entry__input auth-entry__input--compact auth-entry__input--phone auth-entry__input--confirmed"
            type="tel"
            autocomplete="tel"
            readonly
          />
        </div>

        <div class="auth-entry__confirmed-badge">
          Подтверждён
        </div>
      </div>

      <template v-else>
        <div class="auth-entry__registration-phone auth-entry__registration-phone--code">
          <div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field">
            <label
              class="auth-entry__label"
              for="auth-entry-code-phone"
            >
              Номер телефона
            </label>

            <AppInput
              id="auth-entry-code-phone"
              v-model="registrationPhone"
              class="auth-entry__input auth-entry__input--compact auth-entry__input--phone"
              type="tel"
              placeholder="+7(999)-999-99-99"
              autocomplete="tel"
              inputmode="tel"
              readonly
            />
          </div>

          <div
            class="auth-entry__field auth-entry__field--compact auth-entry__sms-code-field"
            :class="{ 'auth-entry__sms-code-field--invalid': isSmsCodeInvalid }"
          >
            <label
              class="auth-entry__label"
              for="auth-entry-sms-code"
            >
              Код из СМС
            </label>

            <span class="auth-entry__sms-code-box">
              <input
                id="auth-entry-sms-code"
                :value="smsCode"
                class="auth-entry__input auth-entry__input--compact auth-entry__input--sms-code"
                type="text"
                :placeholder="smsCodePlaceholder"
                autocomplete="one-time-code"
                inputmode="numeric"
                :maxlength="SMS_CODE_LENGTH"
                :aria-invalid="isSmsCodeInvalid"
                @input="flow.onSmsCodeInput"
              >

              <AppIcon
                v-if="isSmsCodeInvalid"
                name="reset"
                :size="16"
                class="auth-entry__sms-code-error-icon"
              />
            </span>
          </div>
        </div>

        <button
          type="button"
          class="auth-entry__resend"
          :class="{ 'auth-entry__resend--active': canResendCode }"
          :disabled="!canResendCode"
          @click="flow.requestCode"
        >
          {{ resendButtonText }}
        </button>

        <p
          v-if="codeRequestError || codeVerifyError"
          class="auth-entry__request-status auth-entry__request-status--error"
        >
          {{ codeRequestError || codeVerifyError }}
        </p>
      </template>
    </div>

    <Transition name="auth-entry-profile">
      <div
        v-if="isSmsCodeConfirmed"
        class="auth-entry__profile-fields"
      >
        <div
          class="auth-entry__field auth-entry__field--compact auth-entry__email-field"
          :class="{ 'auth-entry__field--invalid': visibleRegistrationEmailError }"
        >
          <label
            class="auth-entry__label"
            for="auth-entry-email"
          >
            Электронная почта
          </label>

          <AppInput
            id="auth-entry-email"
            v-model="registrationEmail"
            class="auth-entry__input auth-entry__input--compact"
            type="text"
            placeholder="mail@example.com"
            autocomplete="email"
            inputmode="email"
            :aria-invalid="Boolean(visibleRegistrationEmailError)"
            :aria-describedby="visibleRegistrationEmailError ? 'auth-entry-email-error' : undefined"
            @input="flow.onRegistrationEmailInput"
          />

          <p
            v-if="visibleRegistrationEmailError"
            id="auth-entry-email-error"
            class="auth-entry__error"
          >
            {{ visibleRegistrationEmailError }}
          </p>
        </div>

        <div
          class="auth-entry__field auth-entry__field--compact auth-entry__password-field"
          :class="{ 'auth-entry__field--invalid': visiblePasswordError }"
        >
          <label
            class="auth-entry__label"
            for="auth-entry-password"
          >
            Пароль
          </label>

          <AppInput
            id="auth-entry-password"
            v-model="password"
            class="auth-entry__input auth-entry__input--compact auth-entry__input--password"
            :type="passwordInputType"
            placeholder="Введите пароль"
            autocomplete="new-password"
            :aria-invalid="Boolean(visiblePasswordError)"
            :aria-describedby="visiblePasswordError ? 'auth-entry-password-error' : undefined"
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
            v-if="visiblePasswordError"
            id="auth-entry-password-error"
            class="auth-entry__error"
          >
            {{ visiblePasswordError }}
          </p>
        </div>
      </div>
    </Transition>
  </div>

  <div class="auth-entry__checkboxes auth-entry__checkboxes--code">
    <AppCheckbox
      v-model="isLegalRepresentative"
      class="auth-entry__checkbox"
    >
      <span class="auth-entry__checkbox-text">
        Я представитель юрлица или ИП
      </span>
    </AppCheckbox>
  </div>

  <p
    v-if="registrationRequestError"
    class="auth-entry__request-status auth-entry__request-status--error"
  >
    {{ registrationRequestError }}
  </p>

  <Transition name="auth-entry-profile">
    <button
      v-if="isSmsCodeConfirmed"
      type="submit"
      class="auth-entry__register-button"
      :disabled="isRegistrationRequestPending"
    >
      {{ isRegistrationRequestPending ? 'Регистрируем' : 'Зарегистрироваться' }}
    </button>
  </Transition>
</template>

<style lang="scss" scoped>
.auth-entry__registration-fields {
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

.auth-entry__name-field {
  width: min(16.3125rem, 100%);
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

.auth-entry__input--phone {
  width: fit-content;
  min-width: auto;

  :deep(.app-input) {
    width: fit-content;
    padding-left: 0.875rem;
    padding-right: 0.875rem;
  }

  :deep(.app-input__field) {
    flex: 0 0 auto;
    width: 15.5ch;
    font-feature-settings: 'lnum' 1, 'tnum' 1;
  }
}

.auth-entry__input--confirmed {
  :deep(.app-input) {
    background: #dbffde;
    border-color: transparent;
  }

  :deep(.app-input__field) {
    color: #062108;
  }
}

.auth-entry__registration-phone {
  display: flex;
  align-items: flex-end;
  gap: 0.625rem;
  width: 100%;
}

.auth-entry__registration-phone--code {
  align-items: flex-end;
}

.auth-entry__registration-phone--confirmed {
  align-items: flex-end;
}

.auth-entry__phone-field {
  width: fit-content;
}

.auth-entry__phone-field--confirmed .auth-entry__label {
  color: #008a0b;
}

.auth-entry__code-fields {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.auth-entry__sms-code-field {
  flex: 0 0 6.875rem;
  width: 6.875rem;
}

.auth-entry__sms-code-field--invalid .auth-entry__label {
  color: #e12e3c;
}

.auth-entry__sms-code-box {
  position: relative;
  display: flex;
  width: 100%;
}

.auth-entry__input--sms-code {
  color: $color-base;
  background: #fff;
  border-color: #de7aff;

  &::placeholder {
    color: $color-base-secondary;
  }

  &:focus {
    border-color: #de7aff;
  }

  .auth-entry__sms-code-field--invalid & {
    padding-right: 2rem;
    color: #2e0509;
    background: #ffebed;
    border-color: transparent;
  }
}

.auth-entry__sms-code-error-icon {
  position: absolute;
  top: 50%;
  right: 0.875rem;
  width: 1rem;
  height: 1rem;
  color: #30010b;
  pointer-events: none;
  transform: translateY(-50%);
}

.auth-entry__resend {
  width: 100%;
  padding: 0 0 0 0.125rem;
  color: $color-base-secondary;
  text-align: left;
  border-radius: 0.375rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  cursor: pointer;
  transition: color 0.15s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:hover:not(:disabled) {
    color: #e38fff;
  }

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
}

.auth-entry__confirmed-badge {
  display: flex;
  flex: 0 0 9.125rem;
  align-items: center;
  justify-content: center;
  width: 9.125rem;
  height: 2.5rem;
  padding: 0.5rem 1.125rem 0.5625rem;
  color: #008a0b;
  text-align: center;
  background: #dbffde;
  border-radius: $radius-control;
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  white-space: nowrap;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__profile-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.auth-entry__email-field,
.auth-entry__password-field {
  width: min(16.6875rem, 100%);
}

.auth-entry__password-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  color: #04121b;
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

.auth-entry__checkboxes {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: 100%;
}

.auth-entry__checkboxes--code {
  margin-top: 0.25rem;
}

.auth-entry__checkbox {
  width: 100%;
}

.auth-entry__checkbox--top {
  align-items: flex-start;

  :deep(.app-checkbox__box) {
    margin-top: 0.25rem;
  }
}

.auth-entry__checkbox-text {
  min-width: 0;
  color: $color-base;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__register-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(15.375rem, 100%);
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

.auth-entry-profile-enter-active,
.auth-entry-profile-leave-active {
  overflow: hidden;
  transition: max-height 0.26s ease, opacity 0.22s ease, transform 0.26s ease;
}

.auth-entry-profile-enter-from,
.auth-entry-profile-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-0.5rem);
}

.auth-entry-profile-enter-to,
.auth-entry-profile-leave-from {
  max-height: 14rem;
  opacity: 1;
  transform: translateY(0);
}
</style>

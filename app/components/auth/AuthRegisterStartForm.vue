<script setup>
const flow = inject('authFlow')
const fullName = flow.fullName
const registrationPhone = flow.registrationPhone
const canRequestCode = flow.canRequestCode
const isCodeRequestPending = flow.isCodeRequestPending
const codeButtonText = flow.codeButtonText
const codeRequestError = flow.codeRequestError
const isCodeRequestSent = flow.isCodeRequestSent
const isLegalRepresentative = flow.isLegalRepresentative
const isPersonalDataAccepted = flow.isPersonalDataAccepted
const isUserAgreementAccepted = flow.isUserAgreementAccepted
</script>

<template>
  <div class="auth-entry__registration-fields">
    <div class="auth-entry__field auth-entry__field--compact auth-entry__name-field">
      <label
        class="auth-entry__label"
        for="auth-entry-name"
      >
        Имя и фамилия
      </label>

      <AppInput
        id="auth-entry-name"
        v-model="fullName"
        class="auth-entry__input auth-entry__input--compact"
        type="text"
        placeholder="Иван Иванов"
        autocomplete="name"
        @input="flow.onFullNameInput"
      />
    </div>

    <div class="auth-entry__registration-phone">
      <div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field">
        <label
          class="auth-entry__label"
          for="auth-entry-phone"
        >
          Номер телефона
        </label>

        <AppInput
          id="auth-entry-phone"
          v-model="registrationPhone"
          class="auth-entry__input auth-entry__input--compact auth-entry__input--phone"
          type="tel"
          placeholder="+7(999)-999-99-99"
          autocomplete="tel"
          inputmode="tel"
          @input="flow.onRegistrationPhoneInput"
        />
      </div>

      <button
        type="button"
        class="auth-entry__code-button"
        :disabled="!canRequestCode || isCodeRequestPending"
        @click="flow.requestCode"
      >
        {{ codeButtonText }}
      </button>
    </div>

    <p class="auth-entry__hint">
      Отправим вам смс с кодом подтверждения, после того как ознакомитесь с Политиками
    </p>

    <p
      v-if="codeRequestError"
      class="auth-entry__request-status auth-entry__request-status--error"
    >
      {{ codeRequestError }}
    </p>

    <p
      v-else-if="isCodeRequestSent"
      class="auth-entry__request-status"
    >
      Код отправлен
    </p>
  </div>

  <div class="auth-entry__checkboxes">
    <AppCheckbox
      v-model="isLegalRepresentative"
      class="auth-entry__checkbox"
    >
      <span class="auth-entry__checkbox-text">
        Я представитель юрлица или ИП
      </span>
    </AppCheckbox>

    <AppCheckbox
      v-model="isPersonalDataAccepted"
      class="auth-entry__checkbox auth-entry__checkbox--top"
    >
      <span class="auth-entry__checkbox-text">
        Я ознакомлен и согласен
        <span class="auth-entry__checkbox-link-line">
          <NuxtLink
            to="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            class="auth-entry__link"
            @click.stop
          >
            с Политикой обработки персональных данных
          </NuxtLink>
        </span>
      </span>
    </AppCheckbox>

    <AppCheckbox
      v-model="isUserAgreementAccepted"
      class="auth-entry__checkbox auth-entry__checkbox--top"
    >
      <span class="auth-entry__checkbox-text">
        Я ознакомлен и согласен
        <span class="auth-entry__checkbox-link-line">
          <NuxtLink
            to="/user-agreement"
            target="_blank"
            rel="noopener noreferrer"
            class="auth-entry__link"
            @click.stop
          >
            с Пользовательским соглашением
          </NuxtLink>
        </span>
      </span>
    </AppCheckbox>
  </div>
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

.auth-entry__registration-phone {
  display: flex;
  align-items: flex-end;
  gap: 0.625rem;
  width: 100%;
}

.auth-entry__phone-field {
  width: fit-content;
}

.auth-entry__hint {
  color: $color-base-secondary;
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

.auth-entry__checkbox-link-line {
  display: block;
}

.auth-entry__link {
  color: #de7aff;
  text-decoration: underline;
  text-decoration-thickness: 0.0625rem;
  text-underline-offset: 0.125rem;
}

.auth-entry__code-button {
  display: flex;
  flex: 0 0 8.75rem;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 2.5rem;
  padding: 0.5rem 0.875rem 0.5625rem;
  color: #de7aff;
  background: rgba(227, 143, 255, 0.1);
  border-radius: $radius-control;
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:hover:not(:disabled) {
    background: rgba(227, 143, 255, 0.16);
  }

  &:active:not(:disabled) {
    color: $color-primary;
    background: rgba(227, 143, 255, 0.22);
  }

  &:disabled {
    color: rgba(222, 122, 255, 0.44);
    cursor: not-allowed;
    background: rgba(227, 143, 255, 0.08);
  }
}
</style>

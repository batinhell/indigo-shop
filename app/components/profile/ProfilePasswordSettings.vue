<script setup>
import { authClient } from '~/utils/auth-client.js'

const props = defineProps({
  email: {
    type: String,
    default: ''
  },
  resetToken: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['reset-token-handled'])

const isChangingPassword = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const submittedPasswordChange = ref(false)
const passwordChangePending = ref(false)
const passwordChangeError = ref('')
const currentPasswordServerError = ref('')
const newPasswordServerError = ref('')
const passwordChangeMessage = ref('')
const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const arePasswordFieldsReadonly = ref(false)
const isPasswordRecoveryPending = ref(false)
const isPasswordRecoverySentOpen = ref(false)
const passwordRecoveryError = ref('')
const isPasswordResetOpen = ref(false)
const isPasswordResetSuccessOpen = ref(false)

const currentPasswordError = computed(() => Boolean(currentPasswordServerError.value) || (submittedPasswordChange.value && !currentPassword.value.trim()))
const newPasswordError = computed(() => Boolean(newPasswordServerError.value) || (submittedPasswordChange.value && !newPassword.value.trim()))
const currentPasswordDescription = computed(() => currentPasswordServerError.value || (submittedPasswordChange.value && !currentPassword.value.trim() ? 'Заполните поле' : ''))
const newPasswordDescription = computed(() => newPasswordServerError.value || (submittedPasswordChange.value && !newPassword.value.trim() ? 'Заполните поле' : ''))
const currentPasswordInputType = computed(() => isCurrentPasswordVisible.value ? 'text' : 'password')
const newPasswordInputType = computed(() => isNewPasswordVisible.value ? 'text' : 'password')
const normalizedEmail = computed(() => props.email.trim().toLowerCase())

watch(
  () => props.resetToken,
  (token) => {
    isPasswordResetOpen.value = Boolean(token)
  },
  { immediate: true }
)

function startPasswordChange() {
  isChangingPassword.value = true
  submittedPasswordChange.value = false
  passwordChangeError.value = ''
  currentPasswordServerError.value = ''
  newPasswordServerError.value = ''
  passwordChangeMessage.value = ''
  isCurrentPasswordVisible.value = false
  isNewPasswordVisible.value = false
  arePasswordFieldsReadonly.value = true
}

function unlockPasswordFields() {
  arePasswordFieldsReadonly.value = false
}

function clearCurrentPassword() {
  currentPassword.value = ''
  currentPasswordServerError.value = ''
  passwordChangeError.value = ''
}

function clearNewPassword() {
  newPassword.value = ''
  newPasswordServerError.value = ''
  passwordChangeError.value = ''
}

function getPasswordChangeErrorMessage(error) {
  const message = error?.message || error?.data?.message || error?.statusMessage || ''
  const code = error?.code || error?.data?.code || error?.status || ''
  const errorText = `${code} ${message}`

  if (/password.*too.*short|too.*short|PASSWORD_TOO_SHORT/i.test(errorText)) {
    return 'Пароль слишком короткий'
  }

  if (/invalid password|incorrect password|wrong password|password is incorrect|INVALID_PASSWORD/i.test(errorText)) {
    return 'Неверный пароль'
  }

  if (/unauthorized|UNAUTHORIZED/i.test(errorText)) {
    return 'Необходимо войти в аккаунт'
  }

  if (/network|fetch|failed to fetch/i.test(errorText)) {
    return 'Ошибка соединения. Попробуйте ещё раз'
  }

  return 'Не удалось изменить пароль'
}

function getPasswordRecoveryErrorMessage(error) {
  const message = error?.message || error?.data?.message || error?.statusMessage || ''
  const code = error?.code || error?.data?.code || error?.status || ''
  const errorText = `${code} ${message}`

  if (/not.*configured|RESET_PASSWORD_DISABLED/i.test(errorText)) {
    return 'Отправка писем восстановления не настроена'
  }

  if (/network|fetch|failed to fetch/i.test(errorText)) {
    return 'Ошибка соединения. Попробуйте ещё раз'
  }

  return 'Не удалось отправить письмо'
}

async function requestPasswordRecovery() {
  if (isPasswordRecoveryPending.value) {
    return
  }

  passwordRecoveryError.value = ''

  if (!normalizedEmail.value) {
    passwordRecoveryError.value = 'Укажите почту в личных данных'
    return
  }

  isPasswordRecoveryPending.value = true

  try {
    const redirectTo = `${window.location.origin}/profile?passwordReset=1`
    const payload = {
      email: normalizedEmail.value,
      redirectTo
    }
    const result = typeof authClient.requestPasswordReset === 'function'
      ? await authClient.requestPasswordReset(payload)
      : await $fetch('/api/auth/request-password-reset', {
          method: 'POST',
          body: payload
        })

    if (result?.error) {
      throw result.error
    }

    isPasswordRecoverySentOpen.value = true
  } catch (error) {
    passwordRecoveryError.value = getPasswordRecoveryErrorMessage(error)
  } finally {
    isPasswordRecoveryPending.value = false
  }
}

function handlePasswordResetClose() {
  emit('reset-token-handled')
}

function handlePasswordResetSaved() {
  passwordChangeMessage.value = 'Сохранено'
  isPasswordResetSuccessOpen.value = true
  emit('reset-token-handled')
}

async function savePassword() {
  submittedPasswordChange.value = true
  passwordChangeError.value = ''
  currentPasswordServerError.value = ''
  newPasswordServerError.value = ''
  passwordChangeMessage.value = ''

  if (currentPasswordError.value || newPasswordError.value || passwordChangePending.value) {
    return
  }

  passwordChangePending.value = true

  const abortController = new AbortController()
  const timeoutId = window.setTimeout(() => abortController.abort(), 10000)

  try {
    const verifyResult = await authClient.verifyPassword(
      {
        password: currentPassword.value
      },
      {
        signal: abortController.signal
      }
    )

    if (verifyResult?.error) {
      throw verifyResult.error
    }

    const result = await authClient.changePassword(
      {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        revokeOtherSessions: false
      },
      {
        signal: abortController.signal
      }
    )

    if (result?.error) {
      throw result.error
    }

    submittedPasswordChange.value = false
    isCurrentPasswordVisible.value = false
    isNewPasswordVisible.value = false
    arePasswordFieldsReadonly.value = false
    passwordChangeMessage.value = 'Сохранено'
  } catch (error) {
    if (error?.name === 'AbortError') {
      passwordChangeError.value = 'Сервер не ответил. Попробуйте ещё раз'
      return
    }

    const errorMessage = getPasswordChangeErrorMessage(error)

    if (errorMessage === 'Неверный пароль') {
      currentPasswordServerError.value = errorMessage
      return
    }

    if (errorMessage === 'Пароль слишком короткий') {
      newPasswordServerError.value = errorMessage
      return
    }

    passwordChangeError.value = errorMessage
  } finally {
    window.clearTimeout(timeoutId)
    passwordChangePending.value = false
  }
}
</script>

<template>
  <section class="profile-password app-card">
    <h2 class="profile-password__title">
      Пароль
    </h2>

    <div class="profile-password__content">
      <div
        v-if="isChangingPassword"
        class="profile-password-change"
      >
        <div class="profile-password-change__field-group">
          <div class="profile-password-row__label-wrap">
            <span class="profile-password-row__label">Изменение пароля</span>
          </div>

          <AppInput
            v-model="currentPassword"
            class="profile-password-change__input"
            :class="{ 'profile-password-change__input--error': currentPasswordError }"
            :type="currentPasswordInputType"
            placeholder="Текущий пароль"
            autocomplete="off"
            :readonly="arePasswordFieldsReadonly"
            :disabled="passwordChangePending"
            :description="currentPasswordDescription"
            @focus="unlockPasswordFields"
          >
            <template #suffix>
              <button
                v-if="currentPasswordError && currentPassword"
                type="button"
                class="profile-password-change__password-toggle profile-password-change__password-toggle--clear"
                aria-label="Очистить текущий пароль"
                @click="clearCurrentPassword"
              >
                <AppIcon
                  name="reset"
                  :size="16"
                  class="profile-password-change__password-toggle-icon"
                />
              </button>
              <button
                v-else
                type="button"
                class="profile-password-change__password-toggle"
                :aria-label="isCurrentPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
                @click="isCurrentPasswordVisible = !isCurrentPasswordVisible"
              >
                <AppIcon
                  :name="isCurrentPasswordVisible ? 'password-hide' : 'password-show'"
                  :size="16"
                  class="profile-password-change__password-toggle-icon"
                />
              </button>
            </template>
          </AppInput>
        </div>

        <AppInput
          v-model="newPassword"
          class="profile-password-change__input"
          :class="{ 'profile-password-change__input--error': newPasswordError }"
          :type="newPasswordInputType"
          placeholder="Новый пароль"
          autocomplete="off"
          :readonly="arePasswordFieldsReadonly"
          :disabled="passwordChangePending"
          :description="newPasswordDescription"
          @focus="unlockPasswordFields"
        >
          <template #suffix>
            <button
              v-if="newPasswordError && newPassword"
              type="button"
              class="profile-password-change__password-toggle profile-password-change__password-toggle--clear"
              aria-label="Очистить новый пароль"
              @click="clearNewPassword"
            >
              <AppIcon
                name="reset"
                :size="16"
                class="profile-password-change__password-toggle-icon"
              />
            </button>
            <button
              v-else
              type="button"
              class="profile-password-change__password-toggle"
              :aria-label="isNewPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
              @click="isNewPasswordVisible = !isNewPasswordVisible"
            >
              <AppIcon
                :name="isNewPasswordVisible ? 'password-hide' : 'password-show'"
                :size="16"
                class="profile-password-change__password-toggle-icon"
              />
            </button>
          </template>
        </AppInput>

        <div
          v-if="passwordChangeMessage"
          class="profile-password__saved"
        >
          {{ passwordChangeMessage }}
        </div>
        <button
          v-else
          type="button"
          class="profile-password__button profile-password__button--save"
          :disabled="passwordChangePending"
          @click="savePassword"
        >
          {{ passwordChangePending ? 'Сохраняем' : 'Сохранить' }}
        </button>
      </div>

      <div
        v-else
        class="profile-password-row profile-password-row--current"
      >
        <div class="profile-password-row__label-wrap">
          <span class="profile-password-row__label">Текущий пароль</span>
        </div>
        <button
          type="button"
          class="profile-password__button"
          @click="startPasswordChange"
        >
          Изменить
        </button>
      </div>

      <p
        v-if="passwordChangeError"
        class="profile-password__status profile-password__status--error"
      >
        {{ passwordChangeError }}
      </p>

      <div class="profile-password-row profile-password-row--recovery">
        <div class="profile-password-row__label-wrap">
          <span class="profile-password-row__label">Забыли пароль?</span>
        </div>
        <button
          type="button"
          class="profile-password__button"
          :disabled="isPasswordRecoveryPending"
          @click="requestPasswordRecovery"
        >
          {{ isPasswordRecoveryPending ? 'Отправляем' : 'Восстановить' }}
        </button>
      </div>

      <p
        v-if="passwordRecoveryError"
        class="profile-password__status profile-password__status--error"
      >
        {{ passwordRecoveryError }}
      </p>
    </div>

    <ProfilePasswordRecoverySentModal
      v-model="isPasswordRecoverySentOpen"
      :email="normalizedEmail"
    />

    <ProfilePasswordResetModal
      v-model="isPasswordResetOpen"
      :token="resetToken"
      @close="handlePasswordResetClose"
      @saved="handlePasswordResetSaved"
    />

    <ProfilePasswordResetSuccessModal v-model="isPasswordResetSuccessOpen" />
  </section>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-brand: #de7aff;
$color-error: #e12e3c;
$color-error-bg: #ffebed;

.profile-password {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: flex-start;
  max-width: calc(100vw - 2rem);
  width: 51.25rem;
  padding: 2rem 1.5rem;

  &__title {
    width: 100%;
    margin: 0;
    color: $color-base;
    font-family: 'Manrope', sans-serif;
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.75rem;
    letter-spacing: -0.0325rem;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    width: 100%;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1.125rem 0.5625rem;
    border: 0;
    border-radius: 0.75rem;
    background: rgba(227, 143, 255, 0.1);
    color: $color-brand;
    font-family: 'Manrope', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    white-space: nowrap;
    cursor: pointer;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
    transition: background-color 0.15s ease, color 0.15s ease;

    &--save {
      flex: 1 0 0;
    }

    &:hover {
      background: rgba(227, 143, 255, 0.16);
    }

    &:active {
      background: rgba(227, 143, 255, 0.22);
    }

    &:disabled {
      cursor: default;
      opacity: 0.64;
    }

    &:focus-visible {
      outline: 0.125rem solid rgba(201, 37, 255, 0.45);
      outline-offset: 0.125rem;
    }
  }

  &__saved {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1.125rem 0.5625rem;
    border-radius: 0.75rem;
    color: #008a0b;
    font-family: 'Manrope', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    white-space: nowrap;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__status {
    margin: 0;
    padding-left: 15.25rem;
    color: $color-brand;
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.125rem;

    &--error {
      color: #ed5c68;
    }
  }
}

.profile-password-change {
  display: flex;
  gap: 0.625rem;
  align-items: flex-start;
  min-height: 4rem;
  width: 100%;

  &__field-group {
    display: grid;
    grid-template-columns: 15.0625rem 11.625rem;
    gap: 0.375rem;
    align-items: flex-start;
    flex-shrink: 0;
  }

  &__input {
    width: 11.625rem;

    :deep(.app-input) {
      gap: 0.75rem;
      padding: 0 0.875rem;
    }

    :deep(.app-input__field) {
      font-weight: 600;
      line-height: 1.25rem;
    }

    :deep(.app-input__field[type='password']) {
      font-size: 1rem;
    }

    :deep(.app-input-description) {
      padding: 0 0.125rem;
      color: #ed5c68;
      font-size: 0.75rem;
      font-weight: 600;
      line-height: 1.125rem;
    }

    &--error {
      :deep(.app-input) {
        background: $color-error-bg;
      }

      :deep(.app-input__field) {
        color: $color-error;

        &::placeholder {
          color: $color-error;
        }
      }
    }
  }

  &__password-toggle {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    padding: 0;
    border: 0;
    background: transparent;
    color: rgba($color-base, 0.64);
    cursor: pointer;
  }

  &__password-toggle--clear {
    color: $color-error;
  }

  &__password-toggle-icon {
    display: block;
    width: 1rem;
    height: 1rem;
  }
}

.profile-password-row {
  display: flex;
  gap: 0.25rem;
  align-items: flex-start;
  overflow: hidden;

  &--current {
    width: min(100%, 22.5rem);
    min-height: 4rem;
  }

  &--recovery {
    width: min(100%, 30.5rem);
  }

  &__label-wrap {
    display: flex;
    align-items: center;
    width: 15.125rem;
    padding: 0.65625rem 0.125rem 0;
    overflow: hidden;
  }

  &__label {
    min-width: 0;
    overflow: hidden;
    color: $color-base;
    font-family: 'Manrope', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
  }
}

@media (max-width: 720px) {
  .profile-password {
    gap: 2rem;
    min-height: auto;
    padding: 1.5rem 1rem;
    width: 100%;
  }

  .profile-password-change {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    min-height: auto;

    &__field-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    &__input {
      width: 100%;
    }
  }

  .profile-password__button--save {
    flex: none;
  }

  .profile-password__status {
    margin-top: 0;
    padding-left: 0;
  }

  .profile-password-row,
  .profile-password-row--recovery {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    min-height: auto;
  }

  .profile-password-row__label-wrap {
    width: 100%;
    padding: 0;
  }
}
</style>

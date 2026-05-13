<script setup>
import { authClient } from '~/utils/auth-client.js'

const isOpen = defineModel({ type: Boolean, required: true })

const props = defineProps({
  token: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['saved', 'close'])

const password = ref('')
const repeatedPassword = ref('')
const submitted = ref(false)
const pending = ref(false)
const errorMessage = ref('')
const isPasswordVisible = ref(false)
const isRepeatedPasswordVisible = ref(false)

const passwordType = computed(() => isPasswordVisible.value ? 'text' : 'password')
const repeatedPasswordType = computed(() => isRepeatedPasswordVisible.value ? 'text' : 'password')
const isPasswordMatchSuccess = computed(() => (
  Boolean(password.value)
  && Boolean(repeatedPassword.value)
  && password.value === repeatedPassword.value
))
const passwordError = computed(() => submitted.value && !password.value.trim())
const repeatedPasswordError = computed(() => {
  if (!submitted.value) return false
  return !repeatedPassword.value.trim() || password.value !== repeatedPassword.value
})
const passwordDescription = computed(() => passwordError.value ? 'Заполните поле' : '')
const repeatedPasswordDescription = computed(() => {
  if (!repeatedPasswordError.value) return ''
  return !repeatedPassword.value.trim()
    ? 'Заполните поле'
    : 'Пароли не совпадают :(\nПроверьте их, и попробуйте еще раз'
})

function resetState() {
  password.value = ''
  repeatedPassword.value = ''
  submitted.value = false
  pending.value = false
  errorMessage.value = ''
  isPasswordVisible.value = false
  isRepeatedPasswordVisible.value = false
}

function closeModal() {
  isOpen.value = false
  emit('close')
}

function getResetErrorMessage(error) {
  const message = error?.message || error?.data?.message || error?.statusMessage || ''
  const code = error?.code || error?.data?.code || error?.status || ''
  const errorText = `${code} ${message}`

  if (/password.*too.*short|too.*short|PASSWORD_TOO_SHORT/i.test(errorText)) {
    return 'Пароль слишком короткий'
  }

  if (/invalid.*token|expired|INVALID_TOKEN/i.test(errorText)) {
    return 'Ссылка недействительна или устарела'
  }

  if (/network|fetch|failed to fetch/i.test(errorText)) {
    return 'Ошибка соединения. Попробуйте ещё раз'
  }

  return 'Не удалось сохранить пароль'
}

async function savePassword() {
  if (pending.value) {
    return
  }

  submitted.value = true
  errorMessage.value = ''

  if (passwordError.value || repeatedPasswordError.value) {
    return
  }

  pending.value = true

  try {
    const payload = {
      newPassword: password.value,
      token: props.token
    }
    const result = typeof authClient.resetPassword === 'function'
      ? await authClient.resetPassword(payload)
      : await $fetch('/api/auth/reset-password', {
          method: 'POST',
          body: payload
        })

    if (result?.error) {
      throw result.error
    }

    emit('saved')
    isOpen.value = false
  } catch (error) {
    errorMessage.value = getResetErrorMessage(error)
  } finally {
    pending.value = false
  }
}

watch(isOpen, (value) => {
  if (!value) {
    resetState()
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
      overlay: 'bg-[rgba(4,18,27,0.74)]'
    }"
  >
    <template #content>
      <form
        class="password-reset-modal"
        @submit.prevent="savePassword"
      >
        <header class="password-reset-modal__header">
          <div class="password-reset-modal__title-block">
            <h2 class="password-reset-modal__title">
              Восстановление<br>
              пароля
            </h2>
            <p class="password-reset-modal__subtitle">
              Введите новый пароль для учётной записи
            </p>
          </div>

          <button
            type="button"
            class="password-reset-modal__close"
            aria-label="Закрыть восстановление пароля"
            @click="closeModal"
          >
            <AppIcon
              name="close"
              :size="16"
              class="password-reset-modal__close-icon"
            />
          </button>
        </header>

        <div class="password-reset-modal__fields">
          <div class="password-reset-modal__field">
            <label
              class="password-reset-modal__label"
              :class="{ 'password-reset-modal__label--success': isPasswordMatchSuccess }"
              for="profile-password-reset-password"
            >
              Пароль
            </label>
            <AppInput
              id="profile-password-reset-password"
              v-model="password"
              class="password-reset-modal__input"
              :class="{
                'password-reset-modal__input--error': passwordError,
                'password-reset-modal__input--success': isPasswordMatchSuccess
              }"
              :type="passwordType"
              placeholder="Введите пароль"
              autocomplete="new-password"
              :disabled="pending"
              :description="passwordDescription"
            >
              <template #suffix>
                <button
                  v-if="!isPasswordMatchSuccess"
                  type="button"
                  class="password-reset-modal__password-toggle"
                  :aria-label="isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
                  @click="isPasswordVisible = !isPasswordVisible"
                >
                  <AppIcon
                    :name="isPasswordVisible ? 'password-hide' : 'password-show'"
                    :size="16"
                    class="password-reset-modal__password-toggle-icon"
                  />
                </button>
                <AppIcon
                  v-else
                  name="check"
                  :width="9.75"
                  :height="7.55"
                  class="password-reset-modal__check-icon"
                />
              </template>
            </AppInput>
          </div>

          <AppInput
            id="profile-password-reset-repeat"
            v-model="repeatedPassword"
            class="password-reset-modal__input"
            :class="{
              'password-reset-modal__input--error': repeatedPasswordError,
              'password-reset-modal__input--success': isPasswordMatchSuccess
            }"
            :type="repeatedPasswordType"
            placeholder="Повторите пароль"
            autocomplete="new-password"
            :disabled="pending"
            :description="repeatedPasswordDescription"
          >
            <template #suffix>
              <button
                v-if="!isPasswordMatchSuccess"
                type="button"
                class="password-reset-modal__password-toggle"
                :aria-label="isRepeatedPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
                @click="isRepeatedPasswordVisible = !isRepeatedPasswordVisible"
              >
                <AppIcon
                  :name="isRepeatedPasswordVisible ? 'password-hide' : 'password-show'"
                  :size="16"
                  class="password-reset-modal__password-toggle-icon"
                />
              </button>
              <AppIcon
                v-else
                name="check"
                :width="9.75"
                :height="7.55"
                class="password-reset-modal__check-icon"
              />
            </template>
          </AppInput>
        </div>

        <p
          v-if="errorMessage"
          class="password-reset-modal__error"
        >
          {{ errorMessage }}
        </p>

        <AppButton
          type="submit"
          :disabled="pending"
        >
          {{ pending ? 'Сохраняем' : 'Сохранить' }}
        </AppButton>
      </form>
    </template>
  </UModal>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-error: #e12e3c;
$color-error-bg: #ffebed;

.password-reset-modal {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  width: min(calc(100dvw - 2rem), 24.375rem);
  padding: 2rem 1.5rem 3.5rem;
  overflow: hidden;
  background: #ffffff;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.12);
}

.password-reset-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
}

.password-reset-modal__title-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 18.9375rem;
  color: $color-base;
}

.password-reset-modal__title {
  margin: 0;
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.0325rem;
}

.password-reset-modal__subtitle {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.password-reset-modal__close {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.25rem;
  border: 0;
  border-radius: 0.75rem;
  background: transparent;
  color: rgba($color-base, 0.64);
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;

  &:hover {
    color: $color-base;
    background: rgba($color-base, 0.04);
  }

  &:focus {
    outline: none;
  }
}

.password-reset-modal__close-icon {
  display: block;
  width: 1rem;
  height: 1rem;
}

.password-reset-modal__fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.password-reset-modal__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.password-reset-modal__label {
  padding: 0 0.125rem;
  color: $color-base;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
}

.password-reset-modal__label--success {
  color: #008a0b;
}

.password-reset-modal__input {
  width: 100%;

  :deep(.app-input) {
    height: 3.25rem;
    gap: 0.75rem;
  }

  :deep(.app-input__field) {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.5rem;
  }

  :deep(.app-input-description) {
    white-space: pre-line;
    color: $color-error;
    font-size: 0.75rem;
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

  &--success {
    :deep(.app-input) {
      background: #dbffde;
    }

    :deep(.app-input__field) {
      color: #062108;
    }
  }
}

.password-reset-modal__password-toggle {
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

.password-reset-modal__password-toggle-icon {
  display: block;
  width: 1rem;
  height: 1rem;
}

.password-reset-modal__check-icon {
  --fill-0: #000000;

  display: block;
  color: #000000;
}

.password-reset-modal__error {
  margin: -1rem 0 0;
  color: $color-error;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
}
</style>

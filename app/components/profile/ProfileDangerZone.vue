<script setup>
import { authClient } from '~/utils/auth-client.js'
import { getRussianSecondsWord } from '~~/shared/utils/time.js'

const CONFIRM_DELAY_SECONDS = 10

const step = ref('idle')
const secondsLeft = ref(0)
const isDeleteModalOpen = ref(false)
const isDeleting = ref(false)
const deleteError = ref('')

let countdownTimer = null

const isCountdown = computed(() => step.value === 'countdown')
const isConfirming = computed(() => step.value === 'confirm')
const isDeleteButtonDisabled = computed(() => isCountdown.value || isDeleting.value)
const secondsWord = computed(() => getRussianSecondsWord(secondsLeft.value))

function clearCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
}

function startDeleteCountdown() {
  clearCountdown()
  deleteError.value = ''
  step.value = 'countdown'
  secondsLeft.value = CONFIRM_DELAY_SECONDS

  countdownTimer = setInterval(() => {
    secondsLeft.value -= 1

    if (secondsLeft.value <= 0) {
      clearCountdown()
      step.value = 'confirm'
    }
  }, 1000)
}

function cancelDelete() {
  clearCountdown()
  step.value = 'idle'
  secondsLeft.value = 0
  deleteError.value = ''
  isDeleteModalOpen.value = false
}

function openDeleteModal() {
  deleteError.value = ''
  isDeleteModalOpen.value = true
}

function getDeleteErrorMessage(error) {
  const message = error?.message || error?.data?.message || error?.statusMessage || ''
  const code = error?.code || error?.data?.code || error?.status || ''
  const errorText = `${code} ${message}`

  if (/SESSION_EXPIRED|session.*expired/i.test(errorText)) {
    return 'Сессия устарела. Войдите заново и повторите удаление'
  }

  if (/network|fetch|failed to fetch/i.test(errorText)) {
    return 'Ошибка соединения. Попробуйте ещё раз'
  }

  return 'Не удалось удалить аккаунт'
}

async function deleteAccount() {
  if (isDeleting.value) {
    return
  }

  isDeleting.value = true
  deleteError.value = ''

  try {
    const result = typeof authClient.deleteUser === 'function'
      ? await authClient.deleteUser()
      : await $fetch('/api/auth/delete-user', {
          method: 'POST',
          body: {}
        })

    if (result?.error) {
      throw result.error
    }

    await navigateTo('/')
  } catch (error) {
    deleteError.value = getDeleteErrorMessage(error)
  } finally {
    isDeleting.value = false
  }
}

onBeforeUnmount(clearCountdown)
</script>

<template>
  <section class="profile-danger">
    <h2 class="profile-danger__title">
      Опасная зона
    </h2>

    <div class="profile-danger__body">
      <div class="profile-danger__copy">
        <span class="profile-danger__action-title">Удалить аккаунт</span>
        <span class="profile-danger__text">
          Все данные и история заказов будут удалены безвозвратно
        </span>
      </div>

      <div
        v-if="isConfirming"
        class="profile-danger__confirm-actions"
      >
        <AppButton
          variant="negative"
          size="sm"
          @click="cancelDelete"
        >
          Отмена
        </AppButton>
        <AppButton
          variant="negative"
          size="sm"
          @click="openDeleteModal"
        >
          <AppIcon
            name="profile-trash"
            size="12"
            class="profile-danger__button-icon"
          />
          <span>Удалить</span>
        </AppButton>
      </div>

      <div
        v-else
        class="profile-danger__pending"
      >
        <AppButton
          variant="negative"
          size="sm"
          :disabled="isDeleteButtonDisabled"
          @click="startDeleteCountdown"
        >
          <AppIcon
            name="profile-trash"
            size="12"
            class="profile-danger__button-icon"
          />
          <span>Удалить</span>
        </AppButton>

        <p
          v-if="isCountdown"
          class="profile-danger__hint"
        >
          Подтвердить удаление аккаунта<br>
          можно будет через {{ secondsLeft }} {{ secondsWord }}
        </p>
      </div>
    </div>

    <UModal
      v-model:open="isDeleteModalOpen"
      :overlay="true"
      :close="false"
      :scrollable="true"
      :ui="{
        content: 'w-auto max-w-none bg-transparent ring-0 shadow-none p-0 rounded-none',
        overlay: 'bg-[rgba(4,18,27,0.74)]'
      }"
    >
      <template #content>
        <section class="delete-account-modal">
          <header class="delete-account-modal__header">
            <div class="delete-account-modal__title-block">
              <h2 class="delete-account-modal__title">
                Удаление аккаунта
              </h2>
              <p class="delete-account-modal__text">
                Вы уверены, что хотите удалить Ваш аккаунт? Все данные и история заказов будут удалены безвозвратно. Вам будет необходимо регистрироваться заново.
              </p>
            </div>

            <button
              type="button"
              class="delete-account-modal__close"
              aria-label="Закрыть удаление аккаунта"
              @click="isDeleteModalOpen = false"
            >
              <AppIcon
                name="close"
                :size="16"
                class="delete-account-modal__close-icon"
              />
            </button>
          </header>

          <p
            v-if="deleteError"
            class="delete-account-modal__error"
          >
            {{ deleteError }}
          </p>

          <div class="delete-account-modal__actions">
            <AppButton
              variant="secondary"
              size="sm"
              :disabled="isDeleting"
              @click="isDeleteModalOpen = false"
            >
              Отмена
            </AppButton>
            <AppButton
              variant="negative"
              size="sm"
              :disabled="isDeleting"
              @click="deleteAccount"
            >
              <AppIcon
                v-if="!isDeleting"
                name="profile-trash"
                size="12"
                class="delete-account-modal__button-icon"
              />
              <span>{{ isDeleting ? 'Удаляем' : 'Удалить' }}</span>
            </AppButton>
          </div>
        </section>
      </template>
    </UModal>
  </section>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-negative: #ed5c68;

.profile-danger {
  width: 100%;
  padding: 2rem 1.5rem;
  border-radius: 2rem;
  background: #ffffff;

  &__title {
    min-width: 100%;
    margin: 0;
    color: $color-base;
    font-family: 'Manrope', sans-serif;
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.75rem;
    letter-spacing: -0.0325rem;
  }

  &__body {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: min(100%, 25.4375rem);
    margin-top: 3rem;
  }

  &__copy {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 14.75rem;
    min-width: 5.875rem;
    padding-top: 0.125rem;
    font-weight: 600;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__action-title {
    color: $color-negative;
    font-size: 1rem;
    line-height: 1.25rem;
    white-space: nowrap;
  }

  &__text {
    color: rgba(46, 5, 9, 0.64);
    font-size: 0.875rem;
    line-height: 1.125rem;
  }

  &__pending {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
    width: 17.25rem;
  }

  &__confirm-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  &__button-icon {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
  }

  &__hint {
    margin: 0;
    color: rgba($color-base, 0.24);
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }
}

.delete-account-modal {
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

.delete-account-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
}

.delete-account-modal__title-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 18.9375rem;
  color: $color-base;
}

.delete-account-modal__title {
  margin: 0;
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.0325rem;
  white-space: nowrap;
}

.delete-account-modal__text {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.delete-account-modal__close {
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

.delete-account-modal__close-icon {
  display: block;
  width: 1rem;
  height: 1rem;
}

.delete-account-modal__error {
  margin: -1rem 0 0;
  color: $color-negative;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
}

.delete-account-modal__actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.delete-account-modal__button-icon {
  width: 0.75rem;
  height: 0.75rem;
  flex-shrink: 0;
}

@media (max-width: 720px) {
  .profile-danger {
    min-height: auto;
    padding: 1.5rem 1rem;

    &__body {
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
    }

    &__pending {
      width: 100%;
    }
  }
}
</style>

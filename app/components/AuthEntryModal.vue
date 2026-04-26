<script setup>
import { useAuthEntryFlow } from '~/composables/useAuthEntryFlow.js'

const isOpen = defineModel({ type: Boolean, required: true })
const emit = defineEmits(['request-code', 'complete-login', 'complete-registration'])

const flow = useAuthEntryFlow({
  onRequestCode: payload => emit('request-code', payload),
  onCompleteLogin: payload => emit('complete-login', payload),
  onCompleteRegistration: payload => emit('complete-registration', payload)
})

provide('authFlow', flow)

const step = flow.step
const modalTitle = flow.modalTitle
const isLegalRegistrationStep = flow.isLegalRegistrationStep
const passwordRecoveryDescription = flow.passwordRecoveryDescription
const passwordRecoverySentDescription = flow.passwordRecoverySentDescription
const passwordRecoverySentHint = flow.passwordRecoverySentHint
const onFormSubmit = flow.onFormSubmit
const stopResendTimer = flow.stopResendTimer
const stopOrganizationSuggestTimer = flow.stopOrganizationSuggestTimer
const resetAuthFlow = flow.resetAuthFlow
const smsCode = flow.smsCode
const SMS_CODE_LENGTH = flow.SMS_CODE_LENGTH
const isSmsCodeConfirmed = flow.isSmsCodeConfirmed
const verifyCode = flow.verifyCode

watch(isOpen, (open) => {
  if (!open) {
    stopResendTimer()
    stopOrganizationSuggestTimer()
    return
  }
  resetAuthFlow()
  nextTick(() => {
    document.getElementById('auth-entry-identifier')?.focus()
  })
})

watch(smsCode, (value) => {
  if (value.length === SMS_CODE_LENGTH && !isSmsCodeConfirmed.value) {
    verifyCode()
  }
})

onBeforeUnmount(() => {
  stopResendTimer()
  stopOrganizationSuggestTimer()
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
        class="auth-entry"
        :class="{
          'auth-entry--login': step === 'login',
          'auth-entry--password-recovery': step === 'password-recovery',
          'auth-entry--password-recovery-sent': step === 'password-recovery-sent',
          'auth-entry--registration': step === 'registration' || step === 'code',
          'auth-entry--legal-details': step === 'legal-details',
          'auth-entry--legal-confirmation': step === 'legal-confirmation',
          'auth-entry--success': step === 'success'
        }"
        @submit.prevent="onFormSubmit"
      >
        <AuthSuccessView
          v-if="step === 'success'"
          @close="isOpen = false"
        />

        <template v-else>
          <header class="auth-entry__header">
            <div class="auth-entry__title-block">
              <h2 class="auth-entry__title">
                {{ modalTitle }}
              </h2>

              <p
                v-if="isLegalRegistrationStep"
                class="auth-entry__subtitle"
              >
                Укажите ИНН организации или ИП, остальные данные заполнятся автоматически
              </p>

              <p
                v-else-if="step === 'password-recovery'"
                class="auth-entry__subtitle"
              >
                {{ passwordRecoveryDescription }}
              </p>

              <p
                v-else-if="step === 'password-recovery-sent'"
                class="auth-entry__subtitle"
              >
                <template
                  v-for="line in passwordRecoverySentDescription.split('\n')"
                  :key="line"
                >
                  {{ line }}<br>
                </template>
                <br>
                {{ passwordRecoverySentHint }}
              </p>
            </div>

            <button
              type="button"
              class="auth-entry__close"
              aria-label="Закрыть окно входа или регистрации"
              @click="isOpen = false"
            >
              <AppIcon
                name="close"
                :size="16"
                class="auth-entry__close-icon"
              />
            </button>
          </header>

          <AuthEntryForm v-if="step === 'entry'" />
          <AuthLoginForm v-else-if="step === 'login'" />
          <AuthPasswordRecoveryForm v-else-if="step === 'password-recovery'" />
          <AuthPasswordRecoverySentView
            v-else-if="step === 'password-recovery-sent'"
            @close="isOpen = false"
          />
          <AuthRegisterStartForm v-else-if="step === 'registration'" />
          <AuthRegisterCompleteForm v-else-if="step === 'code'" />
          <AuthLegalForm v-else-if="step === 'legal-details' || step === 'legal-confirmation'" />
        </template>
      </form>
    </template>
  </UModal>
</template>

<style lang="scss" scoped>
.auth-entry {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: min(calc(100dvw - 2rem), 24.375rem);
  padding: 2rem 1.5rem 3.5rem;
  overflow: hidden;
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.12);
}

.auth-entry--registration {
  padding-bottom: 2rem;
}

.auth-entry--login {
  min-height: 29.3125rem;
  gap: 0;
  padding-bottom: 2rem;
}

.auth-entry--password-recovery {
  min-height: 25.1875rem;
  padding-bottom: 3.5rem;
}

.auth-entry--password-recovery-sent {
  min-height: 19.75rem;
  padding-bottom: 3.5rem;
}

.auth-entry--legal-details {
  padding-bottom: 3.5rem;
}

.auth-entry--legal-confirmation {
  padding-bottom: 2rem;
}

.auth-entry--success {
  gap: 2rem;
  padding: 2rem 1.5rem;
}

.auth-entry__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.auth-entry__title-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: min(18.9375rem, 100%);
}

.auth-entry__title {
  color: $color-base;
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: 0;
}

.auth-entry__subtitle {
  color: $color-base;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  letter-spacing: 0;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__close {
  display: flex;
  flex: 0 0 auto;
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

.auth-entry__close-icon {
  display: block;
  width: 1rem;
  height: 1rem;
}

.auth-entry--login .auth-entry__header {
  margin-bottom: 2rem;
}

.auth-entry--password-recovery .auth-entry__header {
  margin-bottom: 0;
}

.auth-entry--password-recovery-sent .auth-entry__header {
  margin-bottom: 1.25rem;
}

@media (max-width: 420px) {
  .auth-entry {
    width: calc(100dvw - 1.5rem);
    padding: 1.75rem 1.25rem 3rem;
    border-radius: 1.75rem;
  }

  .auth-entry__title {
    font-size: 1.5rem;
    line-height: 1.625rem;
  }
}
</style>

<script setup>
import { formatCompactPhone, normalizePhoneDigits } from '~~/shared/utils/auth-identifier.js'

const isOpen = defineModel({ type: Boolean, required: true })

const props = defineProps({
  currentPhone: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['saved'])

const phone = ref('')
const smsCode = ref('')
const authenticationId = ref('')
const isCodeRequestPending = ref(false)
const codeRequestError = ref('')
const isCodeRequestSent = ref(false)
const isCodeVerifyPending = ref(false)
const codeVerifyError = ref('')
const isPhoneConfirmed = ref(false)
const resendSeconds = ref(0)

const phoneInputId = 'profile-phone-edit-phone'
const smsCodeInputId = 'profile-phone-edit-code'
const phoneInputRef = ref(null)
const smsCodeInputRef = ref(null)

const SMS_CODE_LENGTH = 5

let resendTimerId

const canRequestCode = computed(() => (
  normalizePhoneDigits(phone.value).length === 11
  && !isCodeRequestPending.value
))

const canResendCode = computed(() => (
  resendSeconds.value === 0
  && !isCodeRequestPending.value
  && !isCodeVerifyPending.value
))

const isSmsCodeInvalid = computed(() => Boolean(codeVerifyError.value))
const smsCodePlaceholder = computed(() => Array.from({ length: SMS_CODE_LENGTH }, () => '—').join(' '))
const resendCountdownText = computed(() => (
  `Получить повторно можно через ${resendSeconds.value} ${getSecondsWord(resendSeconds.value)}`
))
const resendButtonText = computed(() => (
  canResendCode.value ? 'Отправить повторно' : resendCountdownText.value
))

const resetState = () => {
  phone.value = props.currentPhone || ''
  smsCode.value = ''
  authenticationId.value = ''
  isCodeRequestPending.value = false
  codeRequestError.value = ''
  isCodeRequestSent.value = false
  isCodeVerifyPending.value = false
  codeVerifyError.value = ''
  isPhoneConfirmed.value = false
  resendSeconds.value = 0
}

const stopResendTimer = () => {
  if (resendTimerId) {
    clearInterval(resendTimerId)
    resendTimerId = undefined
  }
}

const startResendTimer = () => {
  stopResendTimer()
  resendSeconds.value = 60

  resendTimerId = setInterval(() => {
    if (resendSeconds.value <= 1) {
      stopResendTimer()
      resendSeconds.value = 0
      return
    }

    resendSeconds.value -= 1
  }, 1000)
}

const getSecondsWord = (value) => {
  const absoluteValue = Math.abs(value)
  const lastTwo = absoluteValue % 100

  if (lastTwo >= 11 && lastTwo <= 14) {
    return 'секунд'
  }

  const lastDigit = absoluteValue % 10

  if (lastDigit === 1) {
    return 'секунду'
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'секунды'
  }

  return 'секунд'
}

const onPhoneInput = (event) => {
  phone.value = formatCompactPhone(event.target.value)
  codeRequestError.value = ''
  codeVerifyError.value = ''
  isCodeRequestSent.value = false
  authenticationId.value = ''
  smsCode.value = ''
  isPhoneConfirmed.value = false
  stopResendTimer()
  resendSeconds.value = 0
}

const onSmsCodeInput = (event) => {
  smsCode.value = event.target.value.replace(/\D/g, '').slice(0, SMS_CODE_LENGTH)
  codeVerifyError.value = ''
}

const requestCode = async () => {
  if (!canRequestCode.value) {
    return
  }

  isCodeRequestPending.value = true
  codeRequestError.value = ''
  codeVerifyError.value = ''
  authenticationId.value = ''
  smsCode.value = ''
  isCodeRequestSent.value = false

  try {
    const result = await $fetch('/api/profile/phone/request-code', {
      method: 'POST',
      timeout: 40000,
      body: {
        phone: phone.value.trim()
      }
    })

    authenticationId.value = result.authenticationId ?? ''
    isCodeRequestSent.value = true
    startResendTimer()

    await nextTick()
    smsCodeInputRef.value?.focus()
  } catch (error) {
    codeRequestError.value = error?.data?.message || error?.message || 'Не удалось отправить код подтверждения'
  } finally {
    isCodeRequestPending.value = false
  }
}

const savePhone = async () => {
  if (
    isCodeVerifyPending.value
    || isPhoneConfirmed.value
    || !authenticationId.value
    || smsCode.value.length !== SMS_CODE_LENGTH
  ) {
    return
  }

  isCodeVerifyPending.value = true
  codeVerifyError.value = ''

  try {
    const result = await $fetch('/api/profile/phone', {
      method: 'PATCH',
      timeout: 10000,
      body: {
        phone: phone.value.trim(),
        authenticationId: authenticationId.value,
        code: smsCode.value
      }
    })

    const savedUser = result?.user

    if (!savedUser?.phoneNumber) {
      throw new Error('Не удалось сохранить номер телефона')
    }

    phone.value = formatCompactPhone(savedUser.phoneNumber)
    isPhoneConfirmed.value = true
    stopResendTimer()
    resendSeconds.value = 0

    emit('saved', savedUser)
  } catch (error) {
    codeVerifyError.value = error?.data?.message || error?.message || 'Неверный код из СМС'
  } finally {
    isCodeVerifyPending.value = false
  }
}

watch(isOpen, async (open) => {
  if (!open) {
    stopResendTimer()
    return
  }

  resetState()

  await nextTick()
  phoneInputRef.value?.$el?.querySelector('input')?.focus()
})

watch(smsCode, (value) => {
  if (value.length === SMS_CODE_LENGTH && !isPhoneConfirmed.value) {
    savePhone()
  }
})

onBeforeUnmount(() => {
  stopResendTimer()
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
      <section class="auth-entry auth-entry--profile-phone">
        <header class="auth-entry__header">
          <div class="auth-entry__title-block">
            <h2 class="auth-entry__title">
              Изменение номера
            </h2>
          </div>

          <button
            type="button"
            class="auth-entry__close"
            aria-label="Закрыть изменение номера"
            @click="isOpen = false"
          >
            <AppIcon
              name="close"
              :size="16"
              class="auth-entry__close-icon"
            />
          </button>
        </header>

        <div class="auth-entry__code-fields">
          <div
            v-if="isPhoneConfirmed"
            class="auth-entry__registration-phone auth-entry__registration-phone--confirmed"
          >
            <div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field auth-entry__phone-field--confirmed">
              <label
                class="auth-entry__label"
                :for="phoneInputId"
              >
                Номер телефона
              </label>

              <AppInput
                :id="phoneInputId"
                v-model="phone"
                class="auth-entry__input auth-entry__input--compact auth-entry__input--phone auth-entry__input--confirmed"
                type="tel"
                autocomplete="tel"
                readonly
              />
            </div>

            <div class="auth-entry__confirmed-badge">
              Сохранен
            </div>
          </div>

          <template v-else-if="isCodeRequestSent">
            <div class="auth-entry__registration-phone auth-entry__registration-phone--code">
              <div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field">
                <label
                  class="auth-entry__label"
                  :for="phoneInputId"
                >
                  Номер телефона
                </label>

                <AppInput
                  :id="phoneInputId"
                  v-model="phone"
                  class="auth-entry__input auth-entry__input--compact auth-entry__input--phone"
                  type="tel"
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
                  :for="smsCodeInputId"
                >
                  Код из СМС
                </label>

                <span class="auth-entry__sms-code-box">
                  <input
                    :id="smsCodeInputId"
                    ref="smsCodeInputRef"
                    :value="smsCode"
                    class="auth-entry__input auth-entry__input--compact auth-entry__input--sms-code"
                    type="text"
                    :placeholder="smsCodePlaceholder"
                    autocomplete="one-time-code"
                    inputmode="numeric"
                    :maxlength="SMS_CODE_LENGTH"
                    :aria-invalid="isSmsCodeInvalid"
                    @input="onSmsCodeInput"
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
              @click="requestCode"
            >
              {{ resendButtonText }}
            </button>
          </template>

          <template v-else>
            <div class="auth-entry__registration-phone">
              <div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field">
                <label
                  class="auth-entry__label"
                  :for="phoneInputId"
                >
                  Номер телефона
                </label>

                <AppInput
                  :id="phoneInputId"
                  ref="phoneInputRef"
                  v-model="phone"
                  class="auth-entry__input auth-entry__input--compact auth-entry__input--phone"
                  type="tel"
                  placeholder="+7(999)-999-99-99"
                  autocomplete="tel"
                  inputmode="tel"
                  mask="+7(###)-###-##-##"
                  @input="onPhoneInput"
                />
              </div>

              <button
                type="button"
                class="auth-entry__code-button"
                :disabled="!canRequestCode || isCodeRequestPending"
                @click="requestCode"
              >
                {{ isCodeRequestPending ? 'Отправляем' : 'Получить код' }}
              </button>
            </div>

            <p class="auth-entry__hint">
              Отправим вам смс с кодом подтверждения
            </p>
          </template>

          <p
            v-if="codeRequestError || codeVerifyError"
            class="auth-entry__request-status auth-entry__request-status--error"
          >
            {{ codeRequestError || codeVerifyError }}
          </p>

          <p
            v-else-if="isCodeRequestSent && !isPhoneConfirmed"
            class="auth-entry__request-status"
          >
            Код отправлен
          </p>
        </div>
      </section>
    </template>
  </UModal>
</template>

<style lang="scss" scoped>
.auth-entry {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: min(calc(100dvw - 2rem), 30.375rem);
  padding: 2rem 1.5rem 2rem;
  overflow: hidden;
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.12);
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

.auth-entry__code-fields {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

.auth-entry__phone-field {
  width: fit-content;
}

.auth-entry__phone-field--confirmed .auth-entry__label {
  color: #008a0b;
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
  width: 100%;
  height: 2.5rem;
  padding: 0 0.875rem;
  color: $color-base;
  background: #fff;
  border: 0.125rem solid #de7aff;
  border-radius: $radius-control;
  outline: none;
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

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

.auth-entry__hint {
  color: $color-base-secondary;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__request-status {
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

@media (max-width: 560px) {
  .auth-entry {
    width: calc(100dvw - 1.5rem);
    padding: 1.75rem 1.25rem;
    border-radius: 1.75rem;
  }

  .auth-entry__registration-phone {
    flex-direction: column;
    align-items: stretch;
  }

  .auth-entry__phone-field,
  .auth-entry__sms-code-field,
  .auth-entry__code-button,
  .auth-entry__confirmed-badge {
    width: 100%;
    flex-basis: auto;
  }

  .auth-entry__input--phone {
    width: 100%;

    :deep(.app-input) {
      width: 100%;
    }

    :deep(.app-input__field) {
      width: 100%;
      flex: 1 1 auto;
    }
  }
}
</style>

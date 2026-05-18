<script setup>
import { formatAuthPhone, formatCompactPhone } from '~~/shared/utils/auth-identifier.js'

const props = defineProps({
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  recipients: {
    type: Array,
    default: () => []
  }
})

const name = defineModel('name', { type: String, default: '' })
const phone = defineModel('phone', { type: String, default: '' })
const email = defineModel('email', { type: String, default: '' })
const additionalContact = defineModel('additionalContact', { type: String, default: '' })

const recipientName = defineModel('recipientName', { type: String, default: '' })
const recipientPhone = defineModel('recipientPhone', { type: String, default: '' })
const showRecipient = defineModel('showRecipient', { type: Boolean, default: true })
const emit = defineEmits(['updated'])

const phoneMask = '+7(###)-###-##-##'
const RECIPIENT_SAVE_NOTICE_DELAY = 4000
const isPhoneModalOpen = ref(false)
const isEmailConfirmModalOpen = ref(false)
const savedEmail = ref(email.value)
const isEmailEditing = ref(false)
const isEmailSaving = ref(false)
const isEmailConfirmationSending = ref(false)
const emailConfirmationError = ref('')
const isEmailModelSyncing = ref(false)

let nextRecipientId = 0
const recipientTimers = new Map()

const createRecipientForm = (initialValue = {}) => ({
  id: ++nextRecipientId,
  serverId: initialValue.id || null,
  name: initialValue.name || '',
  phone: formatCompactPhone(initialValue.phoneNumber || initialValue.phone || ''),
  lastSavedName: initialValue.name || '',
  lastSavedPhone: formatCompactPhone(initialValue.phoneNumber || initialValue.phone || ''),
  isSaveNoticeVisible: false,
  isSaving: false,
  isDeleting: false
})

const recipientForms = ref([])

const buildRecipientForms = (recipients = []) => {
  if (recipients.length > 0) {
    return recipients.map(createRecipientForm)
  }

  if (showRecipient.value || recipientName.value || recipientPhone.value) {
    return [createRecipientForm({
      name: recipientName.value,
      phone: recipientPhone.value
    })]
  }

  return []
}

const addRecipient = () => {
  recipientForms.value.push(createRecipientForm())
}

const isEmailDirty = computed(() => email.value.trim() !== savedEmail.value.trim())
const showEmailActions = computed(() => isEmailEditing.value || isEmailDirty.value)

function syncSavedEmail(value) {
  isEmailModelSyncing.value = true
  savedEmail.value = value || ''
  isEmailEditing.value = false

  nextTick(() => {
    isEmailModelSyncing.value = false
  })
}

const onEmailEdit = () => {
  isEmailEditing.value = true
}

const cancelEmailEdit = () => {
  email.value = savedEmail.value
  isEmailEditing.value = false
}

const saveEmail = async () => {
  if (!isEmailDirty.value || isEmailSaving.value) {
    isEmailEditing.value = false
    return
  }

  isEmailSaving.value = true

  try {
    const response = await $fetch('/api/profile/email', {
      method: 'PATCH',
      body: { email: email.value }
    })

    const updatedUser = response?.user

    if (updatedUser?.email) {
      email.value = updatedUser.email
      savedEmail.value = updatedUser.email
      isEmailEditing.value = false
      emit('updated', updatedUser)
    }
  } finally {
    isEmailSaving.value = false
  }
}

const onConfirmEmail = async () => {
  if (isEmailConfirmationSending.value) {
    return
  }

  isEmailConfirmationSending.value = true
  emailConfirmationError.value = ''

  try {
    await $fetch('/api/profile/email/confirmation', {
      method: 'POST',
      timeout: 25000
    })
    isEmailConfirmModalOpen.value = true
  } catch (error) {
    emailConfirmationError.value = error?.data?.message || error?.message || 'Не удалось отправить письмо'
  } finally {
    isEmailConfirmationSending.value = false
  }
}

const onIconClick = () => {
  // Placeholder для будущих действий редактирования/подтверждения
}

const onPhoneEditClick = () => {
  isPhoneModalOpen.value = true
}

const onPhoneSaved = (user) => {
  if (!user?.phoneNumber) {
    return
  }

  phone.value = formatCompactPhone(user.phoneNumber)
  isPhoneModalOpen.value = false
  emit('updated', user)
}

const isRecipientDirty = recipient => (
  recipient.name !== recipient.lastSavedName
  || recipient.phone !== recipient.lastSavedPhone
)

const canSaveRecipient = recipient => (
  recipient.name.trim().length > 0
  && isRecipientDirty(recipient)
  && !recipient.isSaveNoticeVisible
  && !recipient.isSaving
  && !recipient.isDeleting
)

const clearRecipientTimer = (recipientId) => {
  const timerId = recipientTimers.get(recipientId)
  if (timerId) {
    clearTimeout(timerId)
    recipientTimers.delete(recipientId)
  }
}

const syncPrimaryRecipient = () => {
  recipientForms.value.forEach((recipient) => {
    if (recipient.isSaveNoticeVisible && isRecipientDirty(recipient)) {
      clearRecipientTimer(recipient.id)
      recipient.isSaveNoticeVisible = false
    }
  })

  const [firstRecipient] = recipientForms.value

  recipientName.value = firstRecipient?.name || ''
  recipientPhone.value = firstRecipient?.phone || ''
  showRecipient.value = recipientForms.value.length > 0
}

const saveRecipient = async (recipient) => {
  if (!recipient.name.trim()) {
    return
  }

  recipient.isSaving = true

  try {
    const response = await $fetch('/api/profile/recipients', {
      method: 'POST',
      body: {
        recipient: {
          id: recipient.serverId,
          name: recipient.name,
          phoneNumber: formatAuthPhone(recipient.phone)
        }
      }
    })

    const savedRecipient = response?.recipient

    if (!savedRecipient) {
      return
    }

    recipient.serverId = savedRecipient.id
    recipient.name = savedRecipient.name || ''
    recipient.phone = formatCompactPhone(savedRecipient.phoneNumber || '')
    recipient.lastSavedName = recipient.name
    recipient.lastSavedPhone = recipient.phone
    emit('updated')
  } finally {
    recipient.isSaving = false
  }

  clearRecipientTimer(recipient.id)
  recipient.isSaveNoticeVisible = true
  syncPrimaryRecipient()

  const timerId = setTimeout(() => {
    recipient.isSaveNoticeVisible = false
    recipientTimers.delete(recipient.id)
  }, RECIPIENT_SAVE_NOTICE_DELAY)

  recipientTimers.set(recipient.id, timerId)
}

const removeRecipient = async (recipient) => {
  if (recipient.serverId) {
    recipient.isDeleting = true

    try {
      await $fetch(`/api/profile/recipients/${recipient.serverId}`, {
        method: 'DELETE'
      })
    } finally {
      recipient.isDeleting = false
    }
  }

  clearRecipientTimer(recipient.id)
  recipientForms.value = recipientForms.value.filter(item => item.id !== recipient.id)
  syncPrimaryRecipient()
  emit('updated')
}

watch(
  () => props.recipients,
  (recipients) => {
    recipientTimers.forEach(timerId => clearTimeout(timerId))
    recipientTimers.clear()
    recipientForms.value = buildRecipientForms(recipients)
    syncPrimaryRecipient()
  },
  { immediate: true }
)

watch(recipientForms, syncPrimaryRecipient, { deep: true })

watch(email, (value) => {
  if (isEmailModelSyncing.value) {
    return
  }

  if (value.trim() !== savedEmail.value.trim()) {
    isEmailEditing.value = true
  }
})

watch(
  () => props.isEmailVerified,
  (value) => {
    if (value) {
      isEmailEditing.value = false
    }
  }
)

defineExpose({
  syncSavedEmail
})

onBeforeUnmount(() => {
  recipientTimers.forEach(timerId => clearTimeout(timerId))
  recipientTimers.clear()
})
</script>

<template>
  <section class="profile-personal app-card">
    <ProfilePhoneEditModal
      v-model="isPhoneModalOpen"
      :current-phone="phone"
      @saved="onPhoneSaved"
    />

    <ProfileEmailConfirmModal
      v-model="isEmailConfirmModalOpen"
      :email="email"
    />

    <h2 class="profile-personal__title">
      Данные пользователя
    </h2>

    <div class="profile-personal__body">
      <div class="profile-personal__fields">
        <div class="profile-field">
          <label
            class="profile-field__label"
          >
            Имя
          </label>
          <AppInput
            id="profile-name"
            v-model="name"
            class="profile-field__control"
            type="text"
            autocomplete="name"
          />
        </div>

        <div class="profile-field profile-field--phone">
          <label
            class="profile-field__label"
          >
            Номер телефона
          </label>
          <AppInput
            id="profile-phone"
            v-model="phone"
            class="profile-field__control profile-field__control--phone"
            type="tel"
            placeholder="+7(___)-___-__-__"
            mask="+7(###)-###-##-##"
            autocomplete="tel"
            inputmode="tel"
          >
            <template #suffix>
              <button
                type="button"
                class="profile-field__icon-button"
                aria-label="Редактировать номер телефона"
                @click="onPhoneEditClick"
              >
                <AppIcon
                  name="profile-edit"
                  size="12"
                  class="profile-field__icon"
                />
              </button>
            </template>
          </AppInput>
        </div>

        <div class="profile-personal__email-row">
          <div class="profile-field">
            <label
              class="profile-field__label"
            >
              Электронная почта
            </label>
            <AppInput
              id="profile-email"
              v-model="email"
              class="profile-field__control"
              type="email"
              autocomplete="email"
            >
              <template #suffix>
                <button
                  type="button"
                  class="profile-field__icon-button"
                  aria-label="Редактировать почту"
                  @click="onEmailEdit"
                >
                  <AppIcon
                    name="profile-edit"
                    size="12"
                    class="profile-field__icon"
                  />
                </button>
              </template>
            </AppInput>
          </div>

          <div
            v-if="showEmailActions"
            class="profile-personal__email-actions"
          >
            <button
              type="button"
              class="profile-personal__email-save"
              :disabled="isEmailSaving"
              @click="saveEmail"
            >
              Сохранить
            </button>
            <button
              type="button"
              class="profile-personal__email-cancel"
              :disabled="isEmailSaving"
              @click="cancelEmailEdit"
            >
              Отменить
            </button>
          </div>

          <button
            v-else-if="email && !isEmailVerified"
            type="button"
            class="profile-personal__confirm"
            :disabled="isEmailConfirmationSending"
            @click="onConfirmEmail"
          >
            {{ isEmailConfirmationSending ? 'Отправляем' : 'Подтвердить' }}
          </button>

          <span
            v-else-if="email && isEmailVerified"
            class="profile-personal__verified"
          >
            Подтверждена
          </span>

          <p
            v-if="emailConfirmationError"
            class="profile-personal__email-error"
          >
            {{ emailConfirmationError }}
          </p>
        </div>

        <div class="profile-field">
          <label
            class="profile-field__label"
          >
            Дополнительный контакт
          </label>
          <AppInput
            id="profile-additional-contact"
            v-model="additionalContact"
            class="profile-field__control"
            type="text"
            placeholder="Телеграм, ВКонтакте..."
            autocomplete="off"
          />
        </div>
      </div>

      <div class="profile-recipient">
        <div class="profile-recipient__header">
          <h3 class="profile-recipient__title">
            Получатель
          </h3>
          <p class="profile-recipient__subtitle">
            Человек, который получит заказ
          </p>
        </div>

        <div
          v-if="recipientForms.length"
          class="profile-recipient__forms"
        >
          <article
            v-for="recipient in recipientForms"
            :key="recipient.id"
            class="profile-recipient-form"
          >
            <div class="profile-field">
              <label
                class="profile-field__label"
              >
                Имя
              </label>
              <AppInput
                :id="`profile-recipient-name-${recipient.id}`"
                v-model="recipient.name"
                class="profile-field__control"
                type="text"
                autocomplete="off"
              >
                <template #suffix>
                  <button
                    type="button"
                    class="profile-field__icon-button"
                    aria-label="Редактировать имя получателя"
                    @click="onIconClick"
                  >
                    <AppIcon
                      name="profile-edit"
                      size="12"
                      class="profile-field__icon"
                    />
                  </button>
                </template>
              </AppInput>
            </div>

            <div class="profile-field profile-field--phone">
              <label
                class="profile-field__label"
              >
                Номер телефона
              </label>
              <AppInput
                :id="`profile-recipient-phone-${recipient.id}`"
                v-model="recipient.phone"
                class="profile-field__control profile-field__control--phone"
                type="tel"
                placeholder="+7(___)-___-__-__"
                :mask="phoneMask"
                autocomplete="off"
                inputmode="tel"
              >
                <template #suffix>
                  <button
                    type="button"
                    class="profile-field__icon-button"
                    aria-label="Редактировать номер получателя"
                    @click="onIconClick"
                  >
                    <AppIcon
                      name="profile-edit"
                      size="12"
                      class="profile-field__icon"
                    />
                  </button>
                </template>
              </AppInput>
            </div>

            <div class="profile-recipient-form__actions">
              <button
                type="button"
                class="profile-recipient-form__remove"
                @click="removeRecipient(recipient)"
              >
                <AppIcon
                  name="profile-trash"
                  size="12"
                  class="profile-recipient-form__action-icon"
                />
                <span>Удалить</span>
              </button>

              <button
                v-if="canSaveRecipient(recipient)"
                type="button"
                class="profile-recipient-form__save"
                @click="saveRecipient(recipient)"
              >
                Сохранить
              </button>

              <span
                v-else-if="recipient.isSaveNoticeVisible"
                class="profile-recipient-form__saved"
              >
                Сохранен
              </span>
            </div>
          </article>
        </div>

        <div class="profile-recipient__toggle">
          <div class="profile-recipient__toggle-copy">
            <span class="profile-recipient__toggle-title">Добавить получателя</span>
            <span class="profile-recipient__toggle-text">
              Добавьте людей, которые могут&nbsp;получить заказ за вас
            </span>
          </div>

          <button
            type="button"
            class="profile-recipient__add"
            @click="addRecipient"
          >
            <AppIcon
              name="profile-plus"
              size="10"
              class="profile-recipient__button-icon"
            />
            <span>Добавить</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-purple: #de7aff;

.profile-personal {
  width: 100%;
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

  &__body {
    margin-top: 3rem;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: min(100%, 40.25rem);
  }

  &__email-row {
    display: flex;
    align-items: stretch;
    gap: 0.5rem;
    width: min(100%, 43.25rem);

    .profile-field {
      flex: 0 0 30.5rem;
      width: min(100%, 30.5rem);
    }
  }

  &__email-actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__verified {
    align-self: center;
    color: #008a0b;
    font-family: 'Manrope', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    white-space: nowrap;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__email-save,
  &__email-cancel,
  &__confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    padding: 0.5rem 1.125rem 0.5625rem;
    border: 0;
    border-radius: 0.75rem;
    background: #fff2e0;
    color: #a05900;
    font-family: 'Manrope', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.15s, color 0.15s;
    font-feature-settings: 'lnum' 1, 'pnum' 1;

    &:disabled {
      cursor: default;
      opacity: 0.62;
    }

    &:focus-visible {
      outline-offset: 0.125rem;
    }
  }

  &__email-save {
    background: $color-purple;
    color: #ffffff;

    &:hover:not(:disabled) {
      background: #e38fff;
    }

    &:active:not(:disabled) {
      background: #c000ff;
    }

    &:focus-visible {
      outline: 0.125rem solid rgba(201, 37, 255, 0.28);
    }
  }

  &__email-cancel {
    background: #f2f3f4;
    color: rgba($color-base, 0.64);

    &:hover:not(:disabled) {
      background: #e8ebed;
    }

    &:active:not(:disabled) {
      background: #dde1e4;
      color: $color-base;
    }

    &:focus-visible {
      outline: 0.125rem solid rgba($color-base, 0.12);
    }
  }

  &__confirm {
    background: #fff2e0;
    color: #a05900;

    &:hover:not(:disabled) {
      background: #ffe7c5;
    }

    &:active:not(:disabled) {
      background: #ffd9a8;
      color: #8a4d00;
    }

    &:focus-visible {
      outline: 0.125rem solid rgba(160, 89, 0, 0.2);
    }
  }

  &__email-error {
    align-self: center;
    margin: 0;
    color: #ed5c68;
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
  }
}

.profile-field {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 0.25rem;
  width: min(100%, 30.5rem);
  min-height: 2.5rem;

  &__label {
    align-self: start;
    padding: 0.65625rem 0.125rem 0;
    overflow: hidden;
    color: $color-base;
    font-family: 'Manrope', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
  }

  &__control {
    min-width: 0;

    :deep(.app-input-wrapper) {
      width: 100%;
    }

    :deep(.app-input) {
      height: 2.5rem;
    }

    :deep(.app-input__field) {
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.25rem;
      font-feature-settings: 'lnum' 1, 'pnum' 1;
    }
  }

  &__control--phone {
    justify-self: start;
    width: min(100%, 13.75rem);

    :deep(.app-input) {
      width: 100%;
    }
  }

  &__icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    padding: 0;
    border: 0;
    border-radius: 0.25rem;
    background: transparent;
    cursor: pointer;
    transition: background-color 0.15s, opacity 0.15s;

    &:hover {
      background: rgba($color-base, 0.06);
    }

    &:active {
      background: rgba($color-base, 0.12);
    }

    &:focus-visible {
      outline: 0.125rem solid rgba(201, 37, 255, 0.28);
      outline-offset: 0.125rem;
    }

    &:hover {
      opacity: 0.76;
    }
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
}

.profile-recipient {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: min(100%, 30.5rem);
  margin-top: 2rem;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    width: 14.75rem;
  }

  &__title {
    margin: 0;
    color: #23082b;
    font-family: 'Manrope', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.5rem;
  }

  &__subtitle {
    margin: 0;
    color: rgba($color-base, 0.64);
    font-family: 'Manrope', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__forms {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  &__add {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    height: 2rem;
    padding: 0.375rem 0.75rem;
    border: 0;
    border-radius: 0.375rem;
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.15s, color 0.15s;

    &:focus-visible {
      outline: 0.125rem solid rgba(201, 37, 255, 0.28);
      outline-offset: 0.125rem;
    }
  }

  &__toggle {
    display: flex;
    align-items: flex-start;
    gap: 0.625rem;
    width: min(100%, 21.4375rem);
  }

  &__toggle-copy {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 14.75rem;
    padding-top: 0.125rem;
    font-family: 'Manrope', sans-serif;
    font-weight: 600;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__toggle-title {
    color: $color-base;
    font-size: 1rem;
    line-height: 1.25rem;
  }

  &__toggle-text {
    color: rgba($color-base, 0.64);
    font-size: 0.875rem;
    line-height: 1.125rem;
  }

  &__add {
    background: rgba(227, 143, 255, 0.1);
    color: $color-purple;

    &:hover {
      background: rgba(227, 143, 255, 0.16);
    }

    &:active {
      color: #c000ff;
      background: rgba(227, 143, 255, 0.22);
    }
  }

  &__button-icon {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
    transition: opacity 0.15s, transform 0.15s;
  }
}

.profile-recipient-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    min-height: 2rem;
    padding-left: 15.375rem;
  }

  &__remove,
  &__save {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    height: 2rem;
    padding: 0.375rem 0.75rem;
    border: 0;
    border-radius: 0.375rem;
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.15s, color 0.15s, opacity 0.15s;

    &:focus-visible {
      outline-offset: 0.125rem;
    }
  }

  &__remove {
    background: #ffebed;
    color: #ed5c68;

    &:hover {
      background: #ffd8dc;
    }

    &:active {
      background: #ffc5cb;
      color: #e12e3c;
    }

    &:focus-visible {
      outline: 0.125rem solid rgba(237, 92, 104, 0.24);
    }
  }

  &__save {
    background: $color-purple;
    color: #ffffff;

    &:hover {
      background: #e38fff;
    }

    &:active {
      background: #c000ff;
    }

    &:focus-visible {
      outline: 0.125rem solid rgba(201, 37, 255, 0.28);
    }
  }

  &__saved {
    display: inline-flex;
    align-items: center;
    height: 2rem;
    padding: 0.375rem 0;
    color: #008a0b;
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
  }

  &__action-icon {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
  }
}

@media (max-width: 720px) {
  .profile-personal {
    min-height: auto;
    padding: 1.5rem 1rem;

    &__email-row {
      flex-direction: column;

      .profile-field {
        flex-basis: auto;
        width: 100%;
      }
    }
  }

  .profile-field {
    grid-template-columns: 1fr;
    gap: 0.375rem;

    &__label {
      padding-top: 0;
    }

    &__control--phone {
      width: 100%;
    }
  }

  .profile-recipient {
    &__toggle {
      flex-direction: column;
      width: 100%;
    }
  }

  .profile-recipient-form {
    &__actions {
      padding-left: 0;
      flex-wrap: wrap;
    }
  }
}
</style>

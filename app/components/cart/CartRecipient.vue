<script setup>
import { storeToRefs } from 'pinia'
import { nextTick } from 'vue'
import { getRegistrationEmailError } from '~~/shared/utils/auth-identifier.js'

const profileStore = useProfileStore()
const { user, organizations } = storeToRefs(profileStore)

const userName = ref('')
const userPhone = ref('')
const userEmail = ref('')
const isUserEmailTouched = ref(false)
const userContact = ref('')
const anotherPerson = ref(false)
const anotherName = ref('')
const anotherPhone = ref('')
const payAsLegal = defineModel('payAsLegal', { type: Boolean, default: false })
const selectedOrganizationId = ref('')
const organizationInn = ref('')
const organizationSuggestions = ref([])
const organizationSuggestError = ref('')
const isOrganizationSuggestPending = ref(false)
const isOrganizationSuggestionsOpen = ref(false)
const isAddOrganizationMode = ref(false)
const isOrganizationSavePending = ref(false)
const addOrganizationInput = ref(null)

const ORGANIZATION_SUGGEST_DELAY = 350

let organizationSuggestTimerId
let organizationSuggestRequestId = 0

const isAuthenticated = computed(() => Boolean(user.value))
const userEmailError = computed(() => {
  if (!isUserEmailTouched.value || !userEmail.value.trim()) {
    return ''
  }

  return getRegistrationEmailError(userEmail.value)
})

const displayOrganizations = computed(() => {
  const hasExplicitActive = organizations.value.some(organization => organization.isActive)

  return organizations.value.map((organization, index) => ({
    ...organization,
    active: hasExplicitActive ? Boolean(organization.isActive) : index === 0,
    innLabel: organization.inn ? `ИНН ${organization.inn}` : ''
  }))
})

const shouldShowOrganizationList = computed(() => (
  isAuthenticated.value && displayOrganizations.value.length > 0
))

const shouldShowOrganizationSuggestions = computed(() => (
  isOrganizationSuggestionsOpen.value
  && (
    isOrganizationSuggestPending.value
    || Boolean(organizationSuggestError.value)
    || organizationSuggestions.value.length > 0
  )
))

watch(
  displayOrganizations,
  (items) => {
    if (!items.length) {
      selectedOrganizationId.value = ''
      return
    }

    if (!items.some(organization => organization.id === selectedOrganizationId.value)) {
      selectedOrganizationId.value = items.find(organization => organization.active)?.id ?? items[0].id
    }
  },
  { immediate: true }
)

const resetAddOrganizationState = () => {
  organizationInn.value = ''
  organizationSuggestions.value = []
  organizationSuggestError.value = ''
  isOrganizationSuggestPending.value = false
  isOrganizationSuggestionsOpen.value = false
}

const stopOrganizationSuggestTimer = () => {
  if (organizationSuggestTimerId) {
    clearTimeout(organizationSuggestTimerId)
    organizationSuggestTimerId = undefined
  }
}

const getOrganizationSuggestErrorMessage = (error) => {
  if (error?.data?.message) {
    return error.data.message
  }

  if (error?.message) {
    return error.message
  }

  return 'Не удалось получить данные организации'
}

const openAddOrganization = async () => {
  isAddOrganizationMode.value = true
  resetAddOrganizationState()

  await nextTick()
  addOrganizationInput.value?.$el?.querySelector('input')?.focus()
}

const closeAddOrganization = () => {
  isAddOrganizationMode.value = false
  resetAddOrganizationState()
  stopOrganizationSuggestTimer()
}

const fetchOrganizationSuggestions = async () => {
  const query = organizationInn.value

  if (query.length < 3) {
    organizationSuggestions.value = []
    return
  }

  const requestId = organizationSuggestRequestId + 1
  organizationSuggestRequestId = requestId
  isOrganizationSuggestPending.value = true
  organizationSuggestError.value = ''

  try {
    const result = await $fetch('/api/dadata/party-suggest', {
      method: 'POST',
      timeout: 10000,
      body: { query }
    })

    if (requestId !== organizationSuggestRequestId) {
      return
    }

    organizationSuggestions.value = result.suggestions ?? []
    isOrganizationSuggestionsOpen.value = true
  } catch (error) {
    if (requestId !== organizationSuggestRequestId) {
      return
    }

    organizationSuggestions.value = []
    organizationSuggestError.value = getOrganizationSuggestErrorMessage(error)
  } finally {
    if (requestId === organizationSuggestRequestId) {
      isOrganizationSuggestPending.value = false
    }
  }
}

const scheduleOrganizationSuggest = () => {
  stopOrganizationSuggestTimer()

  if (organizationInn.value.length < 3) {
    organizationSuggestions.value = []
    isOrganizationSuggestPending.value = false
    return
  }

  organizationSuggestTimerId = setTimeout(fetchOrganizationSuggestions, ORGANIZATION_SUGGEST_DELAY)
}

const onOrganizationInnInput = (value) => {
  organizationInn.value = String(value ?? '').replace(/\D/g, '').slice(0, 12)
  organizationSuggestError.value = ''
  isOrganizationSuggestionsOpen.value = true
  scheduleOrganizationSuggest()
}

const onOrganizationInnFocus = () => {
  if (organizationSuggestions.value.length > 0 || organizationInn.value.length >= 3) {
    isOrganizationSuggestionsOpen.value = true
  }
}

const onOrganizationInnBlur = () => {
  setTimeout(() => {
    isOrganizationSuggestionsOpen.value = false
  }, 120)
}

const selectOrganization = async (organization) => {
  if (isOrganizationSavePending.value) {
    return
  }

  isOrganizationSavePending.value = true
  organizationSuggestError.value = ''

  try {
    await $fetch('/api/organizations', {
      method: 'POST',
      timeout: 10000,
      body: { organization }
    })

    closeAddOrganization()
    await profileStore.refreshProfile()
  } catch (error) {
    organizationSuggestError.value = getOrganizationSuggestErrorMessage(error)
  } finally {
    isOrganizationSavePending.value = false
  }
}

onBeforeUnmount(() => {
  stopOrganizationSuggestTimer()
})
</script>

<template>
  <div class="personal-data-card app-card">
    <div class="personal-data-card__inner">
      <p class="section-title">
        Данные пользователя
      </p>

      <div class="personal-data-form">
        <div class="field-list">
          <div class="field-row">
            <label class="field-label">Имя</label>
            <AppInput v-model="userName" />
          </div>

          <div class="field-row">
            <label class="field-label">Номер телефона</label>
            <AppInput
              v-model="userPhone"
              class="field-input field-input--phone"
              mask="+7(###)-###-##-##"
            />
          </div>

          <div class="field-row">
            <label class="field-label">Электронная почта</label>
            <div class="field-control">
              <AppInput
                v-model="userEmail"
                type="text"
                placeholder="mail@example.com"
                autocomplete="email"
                inputmode="email"
                :aria-invalid="Boolean(userEmailError)"
                :aria-describedby="userEmailError ? 'cart-user-email-error' : undefined"
                @blur="isUserEmailTouched = true"
              />
              <p
                v-if="userEmailError"
                id="cart-user-email-error"
                class="field-error"
              >
                {{ userEmailError }}
              </p>
            </div>
          </div>

          <div class="field-row">
            <label class="field-label">Дополнительный контакт</label>
            <AppInput v-model="userContact" />
          </div>
        </div>

        <div class="switch-row">
          <span class="switch-row__label">Заберёт другой человек</span>
          <AppSwitch v-model="anotherPerson" />
        </div>

        <div
          v-if="anotherPerson"
          class="field-list"
        >
          <div class="field-row">
            <label class="field-label">Имя</label>
            <AppInput v-model="anotherName" />
          </div>

          <div class="field-row">
            <label class="field-label">Номер телефона</label>
            <AppInput
              v-model="anotherPhone"
              class="field-input field-input--phone"
              mask="+7(###)-###-##-##"
            />
          </div>
        </div>

        <div class="switch-row">
          <span class="switch-row__label">Оплатить как Юрлицо</span>
          <AppSwitch v-model="payAsLegal" />
        </div>

        <div
          v-if="payAsLegal"
          class="legal-section"
        >
          <div
            v-if="shouldShowOrganizationList"
            class="organization-row"
          >
            <p class="field-label organization-row__label">
              Выбрать организацию
            </p>
            <div class="organization-list">
              <label
                v-for="organization in displayOrganizations"
                :key="organization.id"
                class="organization-option"
                :class="{ 'organization-option--active': selectedOrganizationId === organization.id }"
              >
                <input
                  v-model="selectedOrganizationId"
                  class="organization-option__input"
                  type="radio"
                  :value="organization.id"
                >
                <span class="organization-option__top">
                  <span class="organization-option__radio" />
                  <button
                    class="organization-option__remove"
                    type="button"
                  >
                    Удалить
                  </button>
                </span>
                <span class="organization-option__content">
                  <span class="organization-option__name">
                    {{ organization.name }}
                  </span>
                  <span class="organization-option__meta">
                    {{ organization.innLabel }}
                  </span>
                  <span
                    v-if="organization.address"
                    class="organization-option__meta"
                  >
                    {{ organization.address }}
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div class="add-organization">
            <div class="add-organization__text">
              <p class="add-organization__title">
                Добавить организацию
              </p>
              <p class="add-organization__subtitle">
                Чтобы платить безналом<br>
                и пользоваться ЭДО
              </p>
            </div>
            <button
              v-if="!isAddOrganizationMode"
              class="add-button"
              type="button"
              @click="openAddOrganization"
            >
              <span class="add-button__icon">+</span>
              <span>Добавить</span>
            </button>

            <div
              v-else
              class="add-organization__control"
            >
              <AppInput
                ref="addOrganizationInput"
                :model-value="organizationInn"
                type="text"
                placeholder="Введите ИНН компании"
                autocomplete="off"
                inputmode="numeric"
                maxlength="12"
                @update:model-value="onOrganizationInnInput"
                @focus="onOrganizationInnFocus"
                @blur="onOrganizationInnBlur"
              />

              <div
                v-if="shouldShowOrganizationSuggestions"
                class="add-organization__options"
              >
                <p
                  v-if="isOrganizationSuggestPending"
                  class="add-organization__status"
                >
                  Ищем организацию
                </p>

                <p
                  v-else-if="organizationSuggestError"
                  class="add-organization__status add-organization__status--error"
                >
                  {{ organizationSuggestError }}
                </p>

                <template v-else>
                  <button
                    v-for="suggestion in organizationSuggestions"
                    :key="suggestion.inn || suggestion.value"
                    type="button"
                    class="add-organization__option"
                    @mousedown.prevent
                    @click="selectOrganization(suggestion)"
                  >
                    <span class="add-organization__option-name">
                      {{ suggestion.name }}
                    </span>
                    <span
                      v-if="suggestion.inn"
                      class="add-organization__option-meta"
                    >
                      ИНН {{ suggestion.inn }}
                    </span>
                    <span
                      v-if="suggestion.address"
                      class="add-organization__option-meta"
                    >
                      {{ suggestion.address }}
                    </span>
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personal-data-card {
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 2rem 1.5rem;
  }
}

.section-title {
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: $color-base;
  text-box: cap alphabetic;
}

.personal-data-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 30.5rem;
  max-width: 100%;
}

.field-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.25rem;
  min-height: 2.5rem;
  align-items: center;
}

.field-label {
  padding: 0 0.125rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  color: $color-base;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.field-input--phone {
  justify-self: start;
  width: 14.5rem;
}

.field-control {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field-error {
  padding: 0 0.125rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  color: #e12e3c;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.switch-row {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;

  &__label {
    width: 13.3125rem;
    padding-top: 0.125rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25rem;
    color: $color-base;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }
}

.legal-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.organization-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.25rem;
  align-items: start;

  &__label {
    padding-top: 0;
  }
}

.organization-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.organization-option {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background: #f4f5f6;
  border-radius: $radius-control;
  cursor: pointer;

  &--active {
    background: #faf5ff;
  }

  &__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__radio {
    width: 1rem;
    height: 1rem;
    border: 0.125rem solid rgba($color-base, 0.24);
    border-radius: 50%;
  }

  &--active &__radio {
    border: 0.3125rem solid #de7aff;
  }

  &__remove {
    font-size: 0.625rem;
    font-weight: 600;
    line-height: 0.75rem;
    color: rgba($color-base, 0.24);
    cursor: pointer;
  }

  &--active &__remove {
    color: #de7aff;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.1875rem;
    padding: 0.25rem 0;
  }

  &__name {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
    color: $color-base;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__meta {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: $color-base-secondary;
  }
}

.add-organization {
  display: flex;
  gap: 0.625rem;
  align-items: flex-start;

  &__text {
    width: 14.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-top: 0.125rem;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25rem;
    color: $color-base;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__subtitle {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
    color: $color-base-secondary;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__control {
    position: relative;
    width: 16.9375rem;
  }

  &__options {
    position: absolute;
    top: calc(100% + 0.375rem);
    left: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    width: 100%;
    padding: 0.5rem 0;
    overflow: hidden;
    background: #f6f6f6;
    border-radius: 0.75rem;
  }

  &__option {
    display: flex;
    flex-direction: column;
    gap: 0.1875rem;
    width: 100%;
    padding: 0.25rem 0.875rem;
    text-align: left;
    background: transparent;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background: rgba($color-base, 0.04);
      outline: none;
    }
  }

  &__option-name {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
    color: $color-base;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__option-meta,
  &__status {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: $color-base-secondary;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__status {
    padding: 0.25rem 0.875rem;
  }

  &__status--error {
    color: #e12e3c;
  }
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  height: 2rem;
  padding: 0.375rem 0.75rem;
  background: rgba(227, 143, 255, 0.1);
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  color: #de7aff;
  cursor: pointer;

  &__icon {
    font-size: 1rem;
    line-height: 1rem;
  }
}
</style>

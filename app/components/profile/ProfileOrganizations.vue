<script setup>
import { nextTick } from 'vue'

const props = defineProps({
  organizations: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['updated'])

const organizationInn = ref('')
const organizationSuggestions = ref([])
const organizationSuggestError = ref('')
const isOrganizationSuggestPending = ref(false)
const isOrganizationSuggestionsOpen = ref(false)
const isAddMode = ref(false)
const isOrganizationSavePending = ref(false)
const pendingDeleteId = ref('')
const pendingActiveId = ref('')
const addInput = ref(null)

const ORGANIZATION_SUGGEST_DELAY = 350

let organizationSuggestTimerId
let organizationSuggestRequestId = 0

const displayOrganizations = computed(() => {
  const hasExplicitActive = props.organizations.some(organization => organization.isActive)

  return props.organizations.map((organization, index) => ({
    ...organization,
    active: hasExplicitActive ? Boolean(organization.isActive) : index === 0,
    innLabel: organization.inn ? `ИНН ${organization.inn}` : ''
  }))
})

const shouldShowOrganizationSuggestions = computed(() => (
  isOrganizationSuggestionsOpen.value
  && (
    isOrganizationSuggestPending.value
    || Boolean(organizationSuggestError.value)
    || organizationSuggestions.value.length > 0
  )
))

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
  isAddMode.value = true
  resetAddOrganizationState()

  await nextTick()
  addInput.value?.$el?.querySelector('input')?.focus()
}

const closeAddOrganization = () => {
  isAddMode.value = false
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
      body: {
        organization
      }
    })

    closeAddOrganization()
    emit('updated')
  } catch (error) {
    organizationSuggestError.value = getOrganizationSuggestErrorMessage(error)
  } finally {
    isOrganizationSavePending.value = false
  }
}

const setActiveOrganization = async (organizationId) => {
  if (!organizationId || pendingActiveId.value === organizationId) {
    return
  }

  pendingActiveId.value = organizationId

  try {
    await $fetch(`/api/organizations/${organizationId}/active`, {
      method: 'PATCH'
    })

    emit('updated')
  } finally {
    pendingActiveId.value = ''
  }
}

const removeOrganization = async (organizationId) => {
  if (!organizationId || pendingDeleteId.value === organizationId) {
    return
  }

  pendingDeleteId.value = organizationId

  try {
    await $fetch(`/api/organizations/${organizationId}`, {
      method: 'DELETE'
    })

    emit('updated')
  } finally {
    pendingDeleteId.value = ''
  }
}

onBeforeUnmount(() => {
  stopOrganizationSuggestTimer()
})
</script>

<template>
  <section class="profile-organizations app-card">
    <h2 class="profile-organizations__title">
      Организации
    </h2>

    <div class="profile-organizations__body">
      <div
        v-if="displayOrganizations.length"
        class="profile-organizations__list"
      >
        <article
          v-for="organization in displayOrganizations"
          :key="organization.id"
          class="profile-organization"
          :class="{ 'profile-organization--active': organization.active }"
        >
          <div class="profile-organization__top">
            <span
              class="profile-organization__radio-wrap"
            >
              <button
                type="button"
                class="profile-organization__radio"
                :class="{ 'profile-organization__radio--active': organization.active }"
                :disabled="pendingActiveId === organization.id"
                :aria-pressed="organization.active"
                :aria-label="organization.active ? 'Активная организация' : 'Сделать организацию активной'"
                @click="setActiveOrganization(organization.id)"
              />
            </span>
            <button
              type="button"
              class="profile-organization__delete"
              :disabled="pendingDeleteId === organization.id"
              @click="removeOrganization(organization.id)"
            >
              {{ pendingDeleteId === organization.id ? 'Удаляем' : 'Удалить' }}
            </button>
          </div>

          <div class="profile-organization__content">
            <h3 class="profile-organization__name">
              {{ organization.name }}
            </h3>
            <p
              v-if="organization.innLabel"
              class="profile-organization__meta"
            >
              {{ organization.innLabel }}
            </p>
            <p
              v-if="organization.address"
              class="profile-organization__meta"
            >
              {{ organization.address }}
            </p>
          </div>
        </article>
      </div>

      <div class="profile-organizations__add-row">
        <div class="profile-organizations__add-copy">
          <span class="profile-organizations__add-title">Добавить организацию</span>
          <span class="profile-organizations__add-text">
            Чтобы платить безналом и&nbsp;пользоваться ЭДО
          </span>
        </div>

        <div class="profile-organizations__add-control">
          <button
            v-if="!isAddMode"
            type="button"
            class="profile-organizations__add"
            @click="openAddOrganization"
          >
            <AppIcon
              name="profile-plus"
              size="10"
              class="profile-organizations__add-icon"
            />
            <span>Добавить</span>
          </button>

          <div
            v-else
            class="profile-organizations__add-input-wrap"
          >
            <AppInput
              ref="addInput"
              :model-value="organizationInn"
              class="profile-organizations__input"
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
              class="profile-organizations__options"
            >
              <p
                v-if="isOrganizationSuggestPending"
                class="profile-organizations__status"
              >
                Ищем организацию
              </p>

              <p
                v-else-if="organizationSuggestError"
                class="profile-organizations__status profile-organizations__status--error"
              >
                {{ organizationSuggestError }}
              </p>

              <template v-else>
                <button
                  v-for="suggestion in organizationSuggestions"
                  :key="suggestion.inn || suggestion.value"
                  type="button"
                  class="profile-organizations__option"
                  @mousedown.prevent
                  @click="selectOrganization(suggestion)"
                >
                  <span class="profile-organizations__option-name">
                    {{ suggestion.name }}
                  </span>

                  <span
                    v-if="suggestion.inn"
                    class="profile-organizations__option-meta"
                  >
                    <span class="profile-organizations__option-prefix">ИНН</span>
                    {{ suggestion.inn }}
                  </span>

                  <span
                    v-if="suggestion.address"
                    class="profile-organizations__option-meta"
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
  </section>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-purple: #de7aff;

.profile-organizations {
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-top: 3rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: min(100%, 30.5rem);
  }

  &__add-row {
    display: flex;
    align-items: flex-start;
    gap: 0.625rem;
    width: min(100%, 32rem);
  }

  &__add-copy {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 14.75rem;
    padding-top: 0.125rem;
    font-family: 'Manrope', sans-serif;
    font-weight: 600;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__add-title {
    color: $color-base;
    font-size: 1rem;
    line-height: 1.25rem;
  }

  &__add-text {
    color: rgba($color-base, 0.64);
    font-size: 0.875rem;
    line-height: 1.125rem;
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
    background: rgba(227, 143, 255, 0.1);
    color: $color-purple;
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.15s, color 0.15s, opacity 0.15s;

    &:hover {
      background: rgba(227, 143, 255, 0.16);
    }

    &:active {
      color: #c000ff;
      background: rgba(227, 143, 255, 0.22);
    }

    &:focus-visible {
      outline: 0.125rem solid rgba(201, 37, 255, 0.28);
      outline-offset: 0.125rem;
    }
  }

  &__add-icon {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
    transition: opacity 0.15s, transform 0.15s;
  }

  &__add-control {
    position: relative;
    width: min(100%, 16.9375rem);
    min-height: 2rem;
  }

  &__add-input-wrap {
    position: relative;
    width: 100%;
  }

  &__input {
    width: 100%;

    :deep(.app-input) {
      width: 100%;
      height: 2.5rem;
    }

    :deep(.app-input__field) {
      font-family: 'Manrope', sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.125rem;
      font-feature-settings: 'lnum' 1, 'pnum' 1;
    }
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
    border: 0;
    background: transparent;
    cursor: pointer;
    transition: background-color 0.15s;

    &:hover,
    &:focus-visible {
      background: rgba($color-base, 0.04);
    }

    &:focus-visible {
      outline: none;
    }
  }

  &__option-name {
    color: $color-base;
    font-family: 'Manrope', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__option-meta,
  &__status {
    color: rgba($color-base, 0.64);
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__option-prefix {
    margin-right: 0.25rem;
  }

  &__status {
    padding: 0.25rem 0.875rem;
  }

  &__status--error {
    color: #e12e3c;
  }
}

.profile-organization {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 15.125rem;
  min-height: 7rem;
  margin-left: 15.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 0.75rem;
  background: #f4f5f6;
  overflow: hidden;

  &--active {
    background: #faf5ff;
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 1.5rem;
  }

  &__radio-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
  }

  &__radio {
    width: 1rem;
    height: 1rem;
    padding: 0;
    border: 0.125rem solid rgba($color-base, 0.24);
    background: transparent;
    border: 0.125rem solid rgba($color-base, 0.24);
    border-radius: 50%;
    cursor: pointer;
    transition: border-color 0.15s, background-color 0.15s, opacity 0.15s;

    &--active {
      border: 0.3125rem solid $color-purple;
    }

    &:hover:not(:disabled) {
      border-color: rgba($color-purple, 0.72);
    }

    &:focus-visible {
      outline: 0.125rem solid rgba(201, 37, 255, 0.28);
      outline-offset: 0.125rem;
    }

    &:disabled {
      cursor: wait;
      opacity: 0.72;
    }
  }

  &__delete {
    padding: 0;
    border: 0;
    background: transparent;
    color: rgba($color-base, 0.24);
    font-family: 'Manrope', sans-serif;
    font-size: 0.625rem;
    font-weight: 600;
    line-height: 0.75rem;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.15s, opacity 0.15s;

    &:not(:disabled) {
      color: $color-purple;

      &:hover {
        color: #c925ff;
      }

      &:active {
        color: #c000ff;
      }

      &:focus-visible {
        outline: 0.125rem solid rgba(201, 37, 255, 0.28);
        outline-offset: 0.125rem;
        border-radius: 0.25rem;
      }
    }

    &:disabled {
      cursor: wait;
      opacity: 0.72;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.1875rem;
    padding: 0.25rem 0;
    overflow: hidden;
    font-family: 'Manrope', sans-serif;
    font-weight: 600;
  }

  &__name {
    margin: 0;
    color: $color-base;
    font-size: 0.875rem;
    line-height: 1.125rem;
    font-weight: 600;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__meta {
    margin: 0;
    color: rgba($color-base, 0.64);
    font-size: 0.75rem;
    line-height: 1rem;
  }
}

@media (max-width: 720px) {
  .profile-organizations {
    padding: 1.5rem 1rem;

    &__add-row {
      flex-direction: column;
      width: 100%;
    }

    &__add-control {
      width: 100%;
    }
  }

  .profile-organization {
    width: 100%;
    margin-left: 0;
  }
}
</style>

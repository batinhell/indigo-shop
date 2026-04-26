<script setup>
const flow = inject('authFlow')

const step = flow.step
const organizationInn = flow.organizationInn
const shouldShowOrganizationSuggestions = flow.shouldShowOrganizationSuggestions
const isOrganizationSuggestPending = flow.isOrganizationSuggestPending
const organizationSuggestError = flow.organizationSuggestError
const organizationSuggestions = flow.organizationSuggestions
const selectedOrganization = flow.selectedOrganization
const isOrganizationSavePending = flow.isOrganizationSavePending
const organizationSaveError = flow.organizationSaveError
</script>

<template>
  <div
    v-if="step === 'legal-details'"
    class="auth-entry__field auth-entry__field--legal-inn"
  >
    <label
      class="auth-entry__label"
      for="auth-entry-organization-inn"
    >
      ИНН
    </label>

    <input
      id="auth-entry-organization-inn"
      :value="organizationInn"
      class="auth-entry__input"
      type="text"
      placeholder="Введите ИНН компании"
      autocomplete="off"
      inputmode="numeric"
      maxlength="12"
      @input="flow.onOrganizationInnInput"
      @focus="flow.onOrganizationInnFocus"
      @blur="flow.onOrganizationInnBlur"
    >

    <div
      v-if="shouldShowOrganizationSuggestions"
      class="auth-entry__organization-options"
    >
      <p
        v-if="isOrganizationSuggestPending"
        class="auth-entry__organization-status"
      >
        Ищем организацию
      </p>

      <p
        v-else-if="organizationSuggestError"
        class="auth-entry__organization-status auth-entry__organization-status--error"
      >
        {{ organizationSuggestError }}
      </p>

      <template v-else>
        <button
          v-for="suggestion in organizationSuggestions"
          :key="suggestion.inn || suggestion.value"
          type="button"
          class="auth-entry__organization-option"
          @mousedown.prevent
          @click="flow.selectOrganization(suggestion)"
        >
          <span class="auth-entry__organization-name">
            {{ suggestion.name }}
          </span>

          <span
            v-if="suggestion.inn"
            class="auth-entry__organization-inn"
          >
            <span class="auth-entry__organization-inn-prefix">ИНН</span>
            {{ suggestion.inn }}
          </span>

          <span
            v-if="suggestion.address"
            class="auth-entry__organization-address"
          >
            {{ suggestion.address }}
          </span>
        </button>
      </template>
    </div>
  </div>

  <div v-else-if="step === 'legal-confirmation'">
    <div
      v-if="selectedOrganization"
      class="auth-entry__organization-confirm-card"
    >
      <p class="auth-entry__organization-confirm-name">
        {{ selectedOrganization.name }}
      </p>

      <p
        v-if="selectedOrganization.inn"
        class="auth-entry__organization-confirm-meta"
      >
        ИНН {{ selectedOrganization.inn }}
      </p>

      <p
        v-if="selectedOrganization.address"
        class="auth-entry__organization-confirm-meta"
      >
        {{ selectedOrganization.address }}
      </p>
    </div>

    <button
      type="submit"
      class="auth-entry__organization-confirm-button"
      :disabled="isOrganizationSavePending"
    >
      {{ isOrganizationSavePending ? 'Добавляем' : 'Добавить организацию' }}
    </button>

    <p
      v-if="organizationSaveError"
      class="auth-entry__request-status auth-entry__request-status--error"
    >
      {{ organizationSaveError }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.auth-entry__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.auth-entry__field--legal-inn {
  width: 100%;
}

.auth-entry__label {
  padding: 0 0.125rem;
  color: $color-base;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.2;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__input {
  width: 100%;
  height: 3.25rem;
  padding: 0 0.875rem;
  color: $color-base;
  background: $color-input-bg;
  border: 0.125rem solid transparent;
  border-radius: $radius-control;
  outline: none;
  font-family: 'Manrope', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &::placeholder {
    color: $color-base-secondary;
  }

  &:focus {
    border-color: #de7aff;
  }
}

.auth-entry__organization-options {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  width: 100%;
  padding: 0.5rem 0;
  overflow: hidden;
  background: #f6f6f6;
  border-radius: 0.75rem;
}

.auth-entry__organization-option {
  display: flex;
  flex-direction: column;
  gap: 0.1875rem;
  width: 100%;
  padding: 0.25rem 0.875rem;
  text-align: left;
  border-radius: 0;
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

.auth-entry__organization-confirm-card + .auth-entry__organization-confirm-button {
  margin-top: 2rem;
}

.auth-entry__organization-name {
  color: $color-base;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__organization-inn,
.auth-entry__organization-address,
.auth-entry__organization-status {
  color: $color-base-secondary;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__organization-inn-prefix {
  margin-right: 0.25rem;
}

.auth-entry__organization-address {
  display: block;
}

.auth-entry__organization-status {
  padding: 0.25rem 0.875rem;
}

.auth-entry__organization-status--error {
  color: #e12e3c;
}

.auth-entry__organization-confirm-card {
  display: flex;
  flex-direction: column;
  gap: 0.1875rem;
  width: 100%;
  padding: 0.75rem 0.875rem;
  overflow: hidden;
  background: #faf5ff;
  border-radius: 0.75rem;
}

.auth-entry__organization-confirm-name {
  color: #23082b;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__organization-confirm-meta {
  color: #705a77;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.auth-entry__organization-confirm-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(16.9375rem, 100%);
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
</style>

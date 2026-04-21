<script setup>
const flow = inject('authFlow')
const visibleError = flow.visibleError
const hasIdentifier = flow.hasIdentifier
const isEntryRequestPending = flow.isEntryRequestPending
const inputMode = flow.inputMode
const identifier = flow.identifier
const entryRequestError = flow.entryRequestError
</script>

<template>
  <div
    class="auth-entry__field"
    :class="{ 'auth-entry__field--invalid': visibleError }"
  >
    <label
      class="auth-entry__label"
      for="auth-entry-identifier"
    >
      Почта или телефон
    </label>

    <span class="auth-entry__input-row">
      <span class="auth-entry__input-box">
        <input
          id="auth-entry-identifier"
          :value="identifier"
          class="auth-entry__input"
          type="text"
          placeholder="Email или телефон"
          autocomplete="username"
          :inputmode="inputMode"
          :aria-invalid="Boolean(visibleError)"
          :aria-describedby="visibleError ? 'auth-entry-error' : undefined"
          @input="flow.onIdentifierInput"
          @blur="flow.onIdentifierBlur"
        >

        <button
          v-if="visibleError"
          type="button"
          class="auth-entry__reset"
          aria-label="Сбросить поле"
          @mousedown.prevent
          @click="flow.resetIdentifier"
        >
          <AppIcon
            name="reset"
            :size="16"
            class="auth-entry__reset-icon"
          />
        </button>
      </span>

      <button
        v-if="hasIdentifier"
        type="submit"
        class="auth-entry__submit"
        :disabled="isEntryRequestPending"
        :aria-label="isEntryRequestPending ? 'Проверяем' : 'Продолжить'"
      >
        <AppIcon
          name="arrow-right-line"
          :size="24"
          class="auth-entry__submit-icon"
        />
      </button>
    </span>

    <p
      v-if="visibleError || entryRequestError"
      id="auth-entry-error"
      class="auth-entry__error"
    >
      {{ visibleError || entryRequestError }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.auth-entry__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

.auth-entry__input-row {
  display: flex;
  gap: 0.625rem;
  width: 100%;
}

.auth-entry__input-box {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
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

  .auth-entry__field--invalid & {
    padding-right: 2.5rem;
    color: #2e0509;
    background: #ffebed;
  }

  &::placeholder {
    color: $color-base-secondary;
  }

  &:focus {
    border-color: transparent;
  }
}

.auth-entry__reset {
  position: absolute;
  top: 50%;
  right: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  color: #2e0509;
  border-radius: 0.5rem;
  cursor: pointer;
  transform: translateY(-50%);
  transition: background-color 0.15s;

  &:hover {
    background: rgba(#2e0509, 0.06);
  }
}

.auth-entry__reset-icon {
  display: block;
  width: 1rem;
  height: 1rem;
}

.auth-entry__submit {
  display: flex;
  flex: 0 0 3.25rem;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  color: #fff;
  background: #de7aff;
  border-radius: $radius-control;
  cursor: pointer;
  transition: background-color 0.15s, opacity 0.15s;

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
}

.auth-entry__submit-icon {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
}

.auth-entry__error {
  margin-top: -0.25rem;
  padding: 0 0.125rem;
  color: #e12e3c;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}
</style>

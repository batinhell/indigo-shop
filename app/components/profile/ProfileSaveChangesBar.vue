<script setup>
defineProps({
  pending: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['cancel', 'save'])
</script>

<template>
  <section class="profile-save-bar">
    <p
      class="profile-save-bar__status"
      :class="{ 'profile-save-bar__status--error': error }"
    >
      {{ error || 'Изменения не сохранены' }}
    </p>

    <div class="profile-save-bar__actions">
      <button
        type="button"
        class="profile-save-bar__cancel"
        :disabled="pending"
        @click="$emit('cancel')"
      >
        Отмена
      </button>

      <button
        type="button"
        class="profile-save-bar__save"
        :disabled="pending"
        @click="$emit('save')"
      >
        <AppIcon
          v-if="!pending"
          name="profile-check"
          size="10"
          class="profile-save-bar__save-icon"
        />
        <span>{{ pending ? 'Сохраняем' : 'Сохранить изменения' }}</span>
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-purple: #de7aff;

.profile-save-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem;
  border-radius: 2rem;
  background: #ffffff;

  &__status {
    margin: 0;
    color: rgba($color-base, 0.52);
    font-family: 'Manrope', sans-serif;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.125rem;
    white-space: nowrap;
    font-feature-settings: 'lnum' 1, 'pnum' 1;

    &--error {
      color: #ed5c68;
    }
  }

  &__actions {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  &__cancel,
  &__save {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    padding: 0.5rem 1.125rem 0.5625rem;
    border: 0;
    border-radius: 0.75rem;
    font-family: 'Manrope', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.15s, color 0.15s, opacity 0.15s;
    font-feature-settings: 'lnum' 1, 'pnum' 1;

    &:focus-visible {
      outline: 0.125rem solid rgba(201, 37, 255, 0.28);
      outline-offset: 0.125rem;
    }

    &:disabled {
      cursor: default;
      opacity: 0.64;
    }
  }

  &__cancel {
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

  &__save {
    gap: 0.375rem;
    background: $color-purple;
    color: #ffffff;

    &:hover {
      background: #e38fff;
    }

    &:active {
      background: #c000ff;
    }
  }

  &__save-icon {
    width: 0.625rem;
    height: 0.625rem;
    flex-shrink: 0;
    transition: opacity 0.15s, transform 0.15s;
  }
}

@media (max-width: 720px) {
  .profile-save-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    min-height: auto;
    padding: 1.5rem 1rem;

    &__status {
      white-space: normal;
    }

    &__actions {
      flex-wrap: wrap;
    }
  }
}
</style>

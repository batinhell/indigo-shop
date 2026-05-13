<script setup>
const emailNotifications = ref(false)
const smsNotifications = ref(false)
</script>

<template>
  <section class="profile-notifications">
    <h2 class="profile-notifications__title">
      Настройка уведомлений
    </h2>

    <div class="profile-notifications__body">
      <div class="profile-notifications__items">
        <div class="profile-notification">
          <div class="profile-notification__copy">
            <span class="profile-notification__title">Email-уведомления</span>
            <span class="profile-notification__text">
              Будем сообщать<br>
              об изменении статуса заказа
            </span>
          </div>

          <AppSwitch
            v-model="emailNotifications"
            class="profile-notification__switch"
            disabled
          />
        </div>

        <div class="profile-notification">
          <div class="profile-notification__copy">
            <span class="profile-notification__title">СМС-уведомления</span>
            <span class="profile-notification__text">
              Будем сообщать<br>
              о готовности заказа
            </span>
          </div>

          <AppSwitch
            v-model="smsNotifications"
            class="profile-notification__switch"
            disabled
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
$color-base: #04121b;

.profile-notifications {
  width: 100%;
  padding: 2rem 1.5rem;
  border-radius: 2rem;
  background: #ffffff;

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
    width: 100%;
    margin-top: 3rem;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
}

.profile-notification {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;

  &__copy {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 14.75rem;
    min-width: 5.875rem;
    padding-top: 0.125rem;
    font-family: 'Manrope', sans-serif;
    font-weight: 600;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__title {
    color: $color-base;
    font-size: 1rem;
    line-height: 1.25rem;
    white-space: nowrap;
  }

  &__text {
    color: rgba($color-base, 0.64);
    font-size: 0.875rem;
    line-height: 1.125rem;
  }

  &__switch {
    height: 1.5rem;
    padding-top: 0.1875rem;
    opacity: 0.72;

    :deep(.app-switch__track) {
      background: #f4f5f6;
    }

    :deep(.app-switch__label) {
      display: none;
    }

    :deep(.app-switch__thumb) {
      box-shadow: 0 0 0 0.0625rem rgba($color-base, 0.02);
    }

    &:deep(.app-switch--active) {
      .app-switch__track {
        background: #de7aff;
      }
    }
  }
}

@media (max-width: 720px) {
  .profile-notifications {
    min-height: auto;
    padding: 1.5rem 1rem;
  }
}
</style>

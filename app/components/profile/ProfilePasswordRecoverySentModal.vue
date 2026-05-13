<script setup>
const isOpen = defineModel({ type: Boolean, required: true })

defineProps({
  email: {
    type: String,
    default: ''
  }
})

const supportEmail = 'Info@indigo-mail.ru'
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
      <section class="password-recovery-sent-modal">
        <header class="password-recovery-sent-modal__header">
          <div class="password-recovery-sent-modal__title-block">
            <h2 class="password-recovery-sent-modal__title">
              Проверьте почту
            </h2>

            <div class="password-recovery-sent-modal__text">
              <p>
                Мы отправили письмо со ссылкой для&nbsp;сброса пароля на почту {{ email }}.
              </p>
              <p>
                Если вы его не получили,<br>
                проверьте папку Спам или<br>
                напишите нам
                <a
                  class="password-recovery-sent-modal__link"
                  :href="`mailto:${supportEmail}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >на&nbsp;{{ supportEmail }}</a>
              </p>
            </div>
          </div>

          <button
            type="button"
            class="password-recovery-sent-modal__close"
            aria-label="Закрыть уведомление о восстановлении пароля"
            @click="isOpen = false"
          >
            <AppIcon
              name="close"
              :size="16"
              class="password-recovery-sent-modal__close-icon"
            />
          </button>
        </header>

        <AppButton @click="isOpen = false">
          Хорошо
        </AppButton>
      </section>
    </template>
  </UModal>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-purple: #de7aff;

.password-recovery-sent-modal {
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

.password-recovery-sent-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
}

.password-recovery-sent-modal__title-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 18.9375rem;
  color: $color-base;
}

.password-recovery-sent-modal__title {
  margin: 0;
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.0325rem;
  white-space: nowrap;
}

.password-recovery-sent-modal__text {
  width: 100%;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  p {
    margin: 0;
  }

  p + p {
    margin-top: 0.875rem;
  }
}

.password-recovery-sent-modal__link {
  color: $color-purple;
  text-decoration: underline;
  text-decoration-skip-ink: none;

  &:hover {
    color: #c000ff;
  }
}

.password-recovery-sent-modal__close {
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
}

.password-recovery-sent-modal__close-icon {
  display: block;
  width: 1rem;
  height: 1rem;
}
</style>

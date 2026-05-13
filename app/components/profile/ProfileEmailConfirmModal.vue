<script setup>
const isOpen = defineModel({ type: Boolean, required: true })

const props = defineProps({
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
      <section class="email-confirm-modal">
        <header class="email-confirm-modal__header">
          <div class="email-confirm-modal__title-block">
            <h2 class="email-confirm-modal__title">
              Проверьте почту
            </h2>

            <div class="email-confirm-modal__text">
              <p>
                Мы отправили письмо со ссылкой для&nbsp;подтверждения на почту {{ email }}.
              </p>
              <p>
                Если вы его не получили,<br>
                проверьте папку Спам или<br>
                напишите нам
                <a
                  class="email-confirm-modal__link"
                  :href="`mailto:${supportEmail}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >на&nbsp;{{ supportEmail }}</a>
              </p>
            </div>
          </div>

          <button
            type="button"
            class="email-confirm-modal__close"
            aria-label="Закрыть подтверждение почты"
            @click="isOpen = false"
          >
            <AppIcon
              name="close"
              :size="16"
              class="email-confirm-modal__close-icon"
            />
          </button>
        </header>

        <button
          type="button"
          class="email-confirm-modal__button"
          @click="isOpen = false"
        >
          Хорошо
        </button>
      </section>
    </template>
  </UModal>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-purple: #de7aff;

.email-confirm-modal {
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

.email-confirm-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
}

.email-confirm-modal__title-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 18.9375rem;
  color: $color-base;
}

.email-confirm-modal__title {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.0325rem;
  white-space: nowrap;
}

.email-confirm-modal__text {
  width: 100%;
  font-family: 'Manrope', sans-serif;
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

.email-confirm-modal__link {
  color: $color-purple;
  text-decoration: underline;
  text-decoration-skip-ink: none;
  transition: color 0.15s;

  &:hover {
    color: #c000ff;
  }
}

.email-confirm-modal__close {
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

  &:focus-visible {
    outline: 0.125rem solid rgba(201, 37, 255, 0.28);
    outline-offset: 0.125rem;
  }
}

.email-confirm-modal__close-icon {
  display: block;
  width: 1rem;
  height: 1rem;
}

.email-confirm-modal__button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.25rem;
  padding: 0.875rem 1.125rem;
  border: 0;
  border-radius: 0.75rem;
  background: $color-purple;
  color: #ffffff;
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.15s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:hover {
    background: #e38fff;
  }

  &:active {
    background: #c000ff;
  }

  &:focus-visible {
    outline: 0.125rem solid rgba(201, 37, 255, 0.28);
    outline-offset: 0.125rem;
  }
}
</style>

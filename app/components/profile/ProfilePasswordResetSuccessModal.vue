<script setup>
const isOpen = defineModel({ type: Boolean, required: true })

function closeModal() {
  isOpen.value = false
}

function goShopping() {
  isOpen.value = false
  navigateTo('/catalog')
}
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
      <section class="password-reset-success-modal">
        <button
          type="button"
          class="password-reset-success-modal__close"
          aria-label="Закрыть сообщение об успешном сохранении пароля"
          @click="closeModal"
        >
          <AppIcon
            name="close"
            :size="16"
            class="password-reset-success-modal__close-icon"
          />
        </button>

        <div class="password-reset-success-modal__content">
          <div
            class="password-reset-success-modal__icon"
            aria-hidden="true"
          />

          <div class="password-reset-success-modal__text-block">
            <h2 class="password-reset-success-modal__title">
              Ура, мы сохранили<br>
              новый пароль!
            </h2>
            <p class="password-reset-success-modal__text">
              Теперь самое время отправиться<br>
              за покупками!
            </p>
          </div>
        </div>

        <AppButton
          size="m"
          @click="goShopping"
        >
          К покупкам
        </AppButton>
      </section>
    </template>
  </UModal>
</template>

<style lang="scss" scoped>
$color-base: #04121b;

.password-reset-success-modal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  width: min(calc(100dvw - 2rem), 23.8125rem);
  padding: 2rem 1.5rem;
  overflow: hidden;
  background: #ffffff;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.12);
}

.password-reset-success-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
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

.password-reset-success-modal__close-icon {
  display: block;
  width: 1rem;
  height: 1rem;
}

.password-reset-success-modal__content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  padding-right: 1.5rem;
}

.password-reset-success-modal__icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: rgba($color-base, 0.24);
}

.password-reset-success-modal__text-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: $color-base;
}

.password-reset-success-modal__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2.25rem;
}

.password-reset-success-modal__text {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.43;
}
</style>

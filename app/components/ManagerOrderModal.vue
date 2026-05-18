<script setup>
const isOpen = defineModel({ type: Boolean, required: true })

const props = defineProps({
  productTitle: {
    type: String,
    default: ''
  }
})

const phone = '+7 (949) 131-45-44'
const phoneHref = 'tel:+79491314544'
const email = 'info@indigo-mail.ru'

const normalizedProductTitle = computed(() => {
  if (!props.productTitle) {
    return 'товар'
  }

  return props.productTitle.charAt(0).toLowerCase() + props.productTitle.slice(1)
})
</script>

<template>
  <BaseModal
    v-model="isOpen"
    :show-header="false"
    max-width="22.125rem"
    wrapper-class="modal-wrapper--fit"
  >
    <div class="manager-order-modal">
      <div class="manager-order-modal__content">
        <div class="manager-order-modal__text">
          <h2 class="manager-order-modal__title">
            <span>Чтобы заказать {{ normalizedProductTitle }}, позвоните менеджеру:</span>
            <a :href="phoneHref">{{ phone }}</a>
          </h2>

          <p class="manager-order-modal__description">
            Если не смогли дозвониться, напишите в&nbsp;поддержку:
            <a :href="`mailto:${email}`">{{ email }}</a>
          </p>
        </div>

        <AppButton
          size="m"
          class="manager-order-modal__button"
          @click="isOpen = false"
        >
          Хорошо!
        </AppButton>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.manager-order-modal {
  background: #fff;
  border-radius: 2rem;
  overflow: hidden;
  padding: 2.5rem 2rem;
  width: min(calc(100dvw - 2rem), 22.125rem);
}

.manager-order-modal__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.manager-order-modal__text {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.manager-order-modal__title {
  color: #04121b;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: 700;
  gap: 0.25rem;
  line-height: 1.875rem;
  margin: 0;
}

.manager-order-modal__title a {
  color: #de7aff;
  text-decoration: none;
  white-space: nowrap;
}

.manager-order-modal__description {
  color: #04121b;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 0;
}

.manager-order-modal__description a {
  color: #de7aff;
  text-decoration: underline;
  text-underline-position: from-font;
}

.manager-order-modal__button {
  align-self: flex-start;
}
</style>

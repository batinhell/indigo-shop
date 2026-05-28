<script setup>
import { isInvoiceEmailPending } from '~~/shared/utils/invoice-email-status.js'

const isOpen = defineModel({ type: Boolean, required: true })

const props = defineProps({
  invoice: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['download'])

const seller = computed(() => props.invoice?.seller || {})
const payer = computed(() => props.invoice?.payer || {})
const emailStatusPrefix = computed(() => {
  if (!props.invoice) return ''
  if (props.invoice.emailSent) {
    return `Счёт отправлен на ${props.invoice.customerEmail || 'email'} и доступен `
  }
  if (isInvoiceEmailPending(props.invoice.emailStatus)) {
    return `Счёт отправляем на ${props.invoice.customerEmail || 'email'}. Он уже доступен `
  }
  return 'Счёт не удалось отправить на почту, скачайте PDF вручную. Он также доступен '
})
</script>

<template>
  <BaseModal
    v-model="isOpen"
    :show-header="false"
    max-width="22.125rem"
    wrapper-class="modal-wrapper--fit invoice-modal-wrapper"
    overlay-class="bg-[rgba(4,18,27,0.74)]"
  >
    <section
      v-if="invoice"
      class="invoice-card"
    >
      <div class="invoice-card__top">
        <div class="invoice-card__icon">
          <AppIcon
            name="invoice-time"
            size="24"
            class="invoice-card__icon-svg"
          />
        </div>
        <p class="invoice-card__term">
          Срок поступления средств 1-3 дня
        </p>
      </div>

      <h2 class="invoice-card__title">
        Счёт <span>№{{ invoice.number }}</span> сформирован и&nbsp;ожидает оплаты
      </h2>

      <div class="invoice-card__preview">
        <div class="invoice-card__row">
          <p class="invoice-card__label">
            Поставщик:
          </p>
          <p class="invoice-card__value">
            {{ seller.name }}<br>
            ИНН {{ seller.inn }}
          </p>
        </div>
        <div class="invoice-card__row">
          <p class="invoice-card__label">
            Покупатель:
          </p>
          <p class="invoice-card__value">
            {{ payer.name }}<br>
            ИНН {{ payer.inn }}
          </p>
        </div>
        <div class="invoice-card__divider" />
        <div class="invoice-card__row">
          <p class="invoice-card__label">
            К оплате:
          </p>
          <p class="invoice-card__value">
            {{ Number(invoice.amount || 0).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }} ₽,<br>
            без НДС
          </p>
        </div>
      </div>

      <AppButton
        class="invoice-card__button"
        size="m"
        @click="emit('download')"
      >
        Скачать счёт в PDF
      </AppButton>

      <p class="invoice-card__note">
        {{ emailStatusPrefix }}
        <NuxtLink
          to="/profile?tab=orders"
          class="invoice-card__note-link"
        >
          в Личном кабинете
        </NuxtLink>
      </p>
    </section>
  </BaseModal>
</template>

<style lang="scss" scoped>
.invoice-card {
  width: 22.125rem;
  max-width: calc(100dvw - 2rem);
  padding: 2rem;
  border-radius: 2rem;
  background: #fff;
  color: #04121b;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.invoice-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
}

.invoice-card__icon {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background: #fff2e0;
  display: grid;
  place-items: center;
}

.invoice-card__icon-svg {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
}

.invoice-card__term {
  width: 10.3125rem;
  text-align: right;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  color: rgba(4, 18, 27, 0.52);
  opacity: 0.4;
}

.invoice-card__title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.75rem;

  span {
    color: #de7aff;
  }
}

.invoice-card__preview {
  padding: 1rem;
  border-radius: 0.5rem;
  background: #f4f5f6;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.invoice-card__row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.invoice-card__label {
  width: 4.9375rem;
  flex-shrink: 0;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  color: rgba(4, 18, 27, 0.64);
}

.invoice-card__value {
  min-width: 0;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  color: #04121b;
}

.invoice-card__divider {
  height: 1px;
  background: rgba(4, 18, 27, 0.12);
}

.invoice-card__button {
  align-self: flex-start;
}

.invoice-card__note {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
}

.invoice-card__note-link {
  color: #de7aff;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.125rem;
}
</style>

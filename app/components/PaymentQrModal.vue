<script setup>
import lockIcon from '~/assets/payment/lock.svg'
import qrPlaceholder from '~/assets/payment/qr-base.svg'
import vtbLogo from '~/assets/payment/vtb-logo.svg'

const isOpen = defineModel({ type: Boolean, required: true })

const props = defineProps({
  amount: {
    type: Number,
    default: 13900
  },
  expiresIn: {
    type: String,
    default: '14:32'
  },
  qrImage: {
    type: String,
    default: ''
  },
  qrPayload: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'idle'
  },
  error: {
    type: String,
    default: ''
  }
})

const formattedAmount = computed(() => `${new Intl.NumberFormat('ru-RU').format(props.amount)} ₽`)
const isLoading = computed(() => props.status === 'loading')
const isPaid = computed(() => props.status === 'paid')
const isFailed = computed(() => ['failed', 'expired'].includes(props.status))
const qrSource = computed(() => {
  const value = props.qrImage.trim()

  if (!value) return qrPlaceholder
  if (value.startsWith('data:image') || value.startsWith('http')) return value
  if (value.startsWith('<svg')) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(value)}`

  return `data:image/png;base64,${value}`
})
const statusText = computed(() => {
  if (isLoading.value) return 'Готовим QR-код'
  if (isPaid.value) return 'Оплата получена'
  if (props.status === 'expired') return 'QR-код истёк'
  if (props.status === 'failed') return 'Оплата не прошла'
  return 'Наведите камеру телефона на QR-код'
})
</script>

<template>
  <BaseModal
    v-model="isOpen"
    :show-header="false"
    max-width="22.125rem"
    wrapper-class="modal-wrapper--fit payment-modal-wrapper"
  >
    <section class="payment-qr-card">
      <div class="payment-qr-card__top">
        <div class="payment-qr-card__amount">
          <p class="payment-qr-card__label">
            Итого к оплате:
          </p>
          <p class="payment-qr-card__price">
            {{ formattedAmount }}
          </p>
        </div>
        <p class="payment-qr-card__timer">
          Осталось {{ expiresIn }}
        </p>
      </div>

      <div class="payment-qr-card__qr-block">
        <p class="payment-qr-card__hint">
          {{ statusText }}
        </p>
        <div class="payment-qr-card__qr-frame">
          <div
            v-if="isLoading"
            class="payment-qr-card__loader"
          />
          <img
            v-else
            :src="qrSource"
            alt="QR-код для оплаты"
            class="payment-qr-card__qr"
          >
        </div>
        <a
          v-if="qrPayload && !isPaid && !isFailed"
          :href="qrPayload"
          class="payment-qr-card__pay-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Открыть в банковском приложении
        </a>
        <p
          v-if="error"
          class="payment-qr-card__error"
        >
          {{ error }}
        </p>
      </div>

      <div class="payment-qr-card__footer">
        <div
          class="payment-qr-card__lock"
          aria-hidden="true"
        >
          <img
            :src="lockIcon"
            alt=""
          >
        </div>
        <p class="payment-qr-card__secure-text">
          Платежи обрабатывает ВТБ.<br>
          Мы не получаем и не храним ваши банковские данные.
        </p>
        <img
          :src="vtbLogo"
          alt="ВТБ"
          class="payment-qr-card__vtb"
        >
      </div>
    </section>
  </BaseModal>
</template>

<style lang="scss" scoped>
.payment-qr-card {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 22.125rem;
  padding: 2.5rem 2rem;
  border-radius: 2rem;
  background: #fff;
  color: #04121b;
  font-family: 'Manrope', sans-serif;

  &__top,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }

  &__amount {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__label,
  &__timer,
  &__hint {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__price {
    margin: 0;
    font-size: 2rem;
    font-weight: 800;
    line-height: 2.25rem;
  }

  &__qr-block {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
    width: 100%;
  }

  &__hint,
  &__secure-text,
  &__error,
  &__pay-link {
    color: rgba(9, 30, 42, 0.48);
    text-align: center;
  }

  &__qr-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13.75rem;
    height: 13.75rem;
    background: #fff;
  }

  &__qr {
    display: block;
    width: 13.75rem;
    height: 13.75rem;
    object-fit: contain;
  }

  &__loader {
    width: 2rem;
    height: 2rem;
    border: 0.1875rem solid rgba(9, 30, 42, 0.12);
    border-top-color: #0a63ff;
    border-radius: 50%;
    animation: payment-qr-spin 0.8s linear infinite;
  }

  &__pay-link {
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.125rem;
    color: #0a63ff;
  }

  &__error {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: #e12e3c;
  }

  &__lock {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: #dbffde;
    color: #008a0b;

    img {
      display: block;
      width: 0.75rem;
      height: 1rem;
    }
  }

  &__secure-text {
    width: 9.875rem;
    margin: 0;
    font-size: 0.625rem;
    font-weight: 600;
    line-height: 0.75rem;
    text-align: left;
  }

  &__vtb {
    display: block;
    width: 5rem;
    height: 1.810375rem;
  }
}

@keyframes payment-qr-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 420px) {
  .payment-qr-card {
    width: calc(100dvw - 2rem);
    padding: 2rem 1.25rem;
  }
}
</style>

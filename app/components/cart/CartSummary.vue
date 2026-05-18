<script setup>
import helpMailIcon from '~/assets/icons/cart-help-mail.svg'
import helpPhoneIcon from '~/assets/icons/cart-help-phone.svg'
import { formatPriceRaw } from '~/utils/format'

const emit = defineEmits(['pay'])

const props = defineProps({
  totalItems: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  payDisabled: { type: Boolean, default: false },
  payAsLegal: { type: Boolean, default: false }
})

const payButtonLabel = computed(() => props.payAsLegal ? 'Оплатить по счету' : 'Оплатить по СБП')
</script>

<template>
  <div class="sidebar-sticky">
    <!-- Summary Card -->
    <div
      v-if="totalItems === 0"
      class="summary-card summary-card--empty app-card"
    >
      <p class="section-title">
        Пусто
      </p>

      <button
        class="pay-btn pay-btn--empty"
        type="button"
        disabled
      >
        Оплатить заказ
      </button>
    </div>

    <div
      v-else
      class="summary-card app-card"
    >
      <p class="section-title">
        Товары
      </p>

      <div class="summary-rows">
        <div class="summary-row">
          <span class="summary-row__label">Товары ({{ totalItems }})</span>
          <span class="summary-row__value">{{ formatPriceRaw(totalPrice) }} &#8381;</span>
        </div>
        <div class="summary-row">
          <span class="summary-row__label">Доставка</span>
          <span class="summary-row__value">Самовывоз</span>
        </div>
      </div>

      <div class="summary-divider" />

      <div class="summary-total">
        <span class="summary-total__label">К оплате</span>
        <span class="summary-total__value">{{ formatPriceRaw(totalPrice) }} &#8381;</span>
      </div>

      <button
        class="pay-btn"
        :disabled="payDisabled"
        @click="emit('pay')"
      >
        {{ payButtonLabel }}
      </button>

      <p class="summary-consent">
        Нажимая на кнопку, вы соглашаетесь
        <NuxtLink
          to="/privacy-policy"
          class="summary-consent__link"
        >
          с Условиями обработки персональных данных,
        </NuxtLink>
        а также
        <NuxtLink
          to="/user-agreement"
          class="summary-consent__link"
        >
          с Пользовательским соглашением
        </NuxtLink>
      </p>
    </div>

    <!-- Help Card -->
    <div class="help-card app-card">
      <div class="help-card__info">
        <div class="help-card__text">
          <p class="help-card__title">
            Нужна помощь с заказом?
          </p>
          <p class="help-card__subtitle">
            Напишите нам на почту или позвоните администратору
          </p>
        </div>
      </div>
      <div class="help-card__actions">
        <a
          href="mailto:info@indigo-mail.ru"
          class="help-card__action help-card__action--mail"
          aria-label="Написать на почту"
        >
          <img
            :src="helpMailIcon"
            class="help-card__icon"
            alt=""
            aria-hidden="true"
          >
        </a>
        <a
          href="tel:+79491314544"
          class="help-card__action help-card__action--phone"
          aria-label="Позвонить администратору"
        >
          <img
            :src="helpPhoneIcon"
            class="help-card__icon"
            alt=""
            aria-hidden="true"
          >
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-sticky {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.section-title {
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: $color-base;
}

.summary-card {
  padding: 2rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &--empty {
    justify-content: center;
  }
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: -0.01em;

  &__label { color: $color-base-secondary; }
  &__value { color: $color-base; }
}

.summary-divider {
  height: 1px;
  background: rgba($color-base, 0.08);
}

.summary-total {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  &__label {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    letter-spacing: -0.01em;
    color: $color-base-secondary;
  }

  &__value {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.75rem;
    letter-spacing: -0.02em;
    color: $color-base;
  }
}

.promo-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.promo-row {
  display: flex;
  gap: 0.25rem;

  :deep(.app-input-wrapper) {
    flex: 1;
    min-width: 0;
  }
}

.promo-btn {
  flex-shrink: 0;
  height: 2.5rem;
  padding: 0 1.125rem;
  background: $color-primary-bg;
  border-radius: $radius-control;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: $color-primary;
  cursor: pointer;
  transition: background-color 0.15s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:hover { background: rgba($color-primary, 0.15); }
}

.pay-btn {
  width: 100%;
  height: 3.25rem;
  background: #de7aff;
  border-radius: $radius-control;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:not(:disabled):hover { background: #e38fff; }
  &:not(:disabled):active { background: #c000ff; }

  &:disabled {
    background: rgba($color-primary, 0.32);
    cursor: not-allowed;
  }

  &--empty,
  &--empty:disabled {
    background: rgba($color-base, 0.04);
    color: rgba($color-base, 0.24);
  }
}

.summary-consent {
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  color: rgba($color-base, 0.52);
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &__link {
    color: #de7aff;
    text-decoration: underline;
    text-decoration-thickness: 0.0625rem;
    text-underline-offset: 0.125rem;
    transition: color 0.15s;

    &:hover {
      color: #c925ff;
    }
  }
}

.trust-badges {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.trust-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &__icon {
    width: 1rem;
    height: 1rem;
    color: #d8d8d8;
    flex-shrink: 0;
  }

  &__text {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: $color-base-secondary;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }
}

.help-card {
  padding: 1.5rem 1.25rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;

  &__info {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    align-items: center;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__title {
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.25rem;
    letter-spacing: -0.01em;
    color: $color-base;
    text-box: cap alphabetic;
  }

  &__subtitle {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: rgba($color-base, 0.38);
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  &__action {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $radius-control;
    transition: background-color 0.15s;
  }

  &__action--mail {
    background: rgba(222, 122, 255, 0.3);
    color: #de7aff;

    &:hover {
      background: rgba(222, 122, 255, 0.38);
    }
  }

  &__action--phone {
    background: #de7aff;
    color: white;

    &:hover {
      background: #e38fff;
    }
  }

  &__icon {
    width: 1rem;
    height: 1rem;
  }
}
</style>

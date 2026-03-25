<script setup>
import { formatPriceRaw } from '~/utils/format'

defineProps({
  totalItems: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  payDisabled: { type: Boolean, default: false }
})

const emit = defineEmits(['pay'])

const promoCode = ref('')
</script>

<template>
  <div class="sidebar-sticky">
    <!-- Summary Card -->
    <div class="summary-card">
      <p class="section-title">Товары</p>

      <div class="summary-rows">
        <div class="summary-row">
          <span class="summary-row__label">Товары ({{ totalItems }} шт)</span>
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

      <!-- Promo Code -->
      <div class="promo-section">
        <div class="promo-row">
          <AppInput v-model="promoCode" placeholder="Введите промокод" />
          <button class="promo-btn">Применить</button>
        </div>
      </div>

      <!-- Pay Button -->
      <button class="pay-btn" :disabled="payDisabled" @click="emit('pay')">
        Оплатить заказ
      </button>

      <!-- Trust Badges -->
      <div class="trust-badges">
        <div class="trust-badge">
          <svg class="trust-badge__icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" fill="currentColor" fill-opacity="0.64" /></svg>
          <span class="trust-badge__text">Безопасная оплата</span>
        </div>
        <div class="trust-badge">
          <svg class="trust-badge__icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" fill="currentColor" fill-opacity="0.64" /></svg>
          <span class="trust-badge__text">Оплата СБП или по счёту</span>
        </div>
        <div class="trust-badge">
          <svg class="trust-badge__icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" fill="currentColor" fill-opacity="0.64" /></svg>
          <span class="trust-badge__text">Самовывоз из Донецка</span>
        </div>
      </div>
    </div>

    <!-- Help Card -->
    <div class="help-card">
      <div class="help-card__info">
        <div class="help-card__avatar" />
        <div class="help-card__text">
          <p class="help-card__title">Нужна помощь?</p>
          <p class="help-card__subtitle">Позвоните в поддержку.</p>
        </div>
      </div>
      <a href="tel:+78001234567" class="help-card__call-btn" aria-label="Позвонить в поддержку">
        <svg class="help-card__call-icon" viewBox="0 0 23 9" fill="none"><path d="M18.187 0H19.5458C19.9537 0 20.1577 0 20.3219 0.0181341C21.8931 0.191675 23.06 1.55458 22.9896 3.13374C22.9822 3.29873 22.9508 3.50026 22.888 3.90328L22.888 3.90341C22.8643 4.0556 22.9236 3.67511 22.8733 3.89107C22.5263 5.3836 20.4307 7.7069 18.9818 8.20556C18.7721 8.27771 19.9455 7.96861 19.4761 8.09225C17.7018 8.55968 15.0794 9 11.4963 9C7.91323 9 5.29085 8.55968 3.51648 8.09225C3.04715 7.96861 4.22048 8.27771 4.01084 8.20556C2.56189 7.7069 0.466323 5.3836 0.119262 3.89107C0.069047 3.67512 0.128344 4.0556 0.104625 3.90341C0.0418033 3.5003 0.0103925 3.29875 0.00302911 3.13374C-0.0674374 1.55458 1.09952 0.191675 2.67069 0.0181341C2.83487 0 3.03886 0 3.44683 0H4.80565C6.05418 0 7.15861 0.809421 7.53458 2C7.91055 3.19058 9.01498 4 10.2635 4H12.7291C13.9776 4 15.0821 3.19058 15.458 2C15.834 0.809421 16.9384 0 18.187 0Z" fill="currentColor" /></svg>
      </a>
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
  background: white;
  border-radius: $radius-main;
  padding: 3rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
  background: $color-primary;
  border-radius: $radius-control;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:hover { background: #e38fff; }
  &:active { background: #c000ff; }

  &:disabled {
    background: rgba($color-primary, 0.32);
    cursor: not-allowed;
  }

  &:disabled:hover,
  &:disabled:active {
    background: rgba($color-primary, 0.32);
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
  background: white;
  border-radius: $radius-main;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__avatar {
    width: 2.5rem;
    height: 2.5rem;
    background: #d8d8d8;
    flex-shrink: 0;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__title {
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.5rem;
    letter-spacing: -0.01em;
    color: $color-base;
  }

  &__subtitle {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.125rem;
    color: rgba($color-base, 0.45);
  }

  &__call-btn {
    width: 2.5rem;
    height: 2.5rem;
    background: $color-primary-bg;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: $color-primary;
    transition: background-color 0.15s;

    &:hover { background: rgba($color-primary, 0.15); }
  }

  &__call-icon {
    width: 1.25rem;
    height: 0.5rem;
    transform: rotate(45deg);
  }
}
</style>

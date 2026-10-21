<script setup>
// Правая колонка конструктора v2: шаблон для макета + блок цены и кнопки.
// Экспорт шаблона (PDF/AI/DXF) — Этап 4, пока кнопки выключены.
defineProps({
  fabricGenitive: { type: String, default: '' },
  quantity: { type: Number, default: 0 },
  hasFringe: { type: Boolean, default: false },
  doubleSided: { type: Boolean, default: false },
  orderDesign: { type: Boolean, default: false },
  basePrice: { type: String, default: '0 ₽' },
  fringePrice: { type: String, default: '0 ₽' },
  doubleSidedPrice: { type: String, default: '0 ₽' },
  designPrice: { type: String, default: '0 ₽' },
  totalPrice: { type: String, default: '0 ₽' }
})

defineEmits(['pay', 'add-to-cart'])

const templateFormats = ['PDF', 'AI', 'DXF']
</script>

<template>
  <div class="template-card">
    <div class="template-card__template">
      <p class="template-card__title">
        Шаблон для макета
      </p>
      <p class="template-card__subtitle">
        Развёртка в точных размерах с вылетами, карманом и безопасной зоной
      </p>
      <div class="template-card__formats">
        <button
          v-for="format in templateFormats"
          :key="format"
          type="button"
          class="template-card__format"
          disabled
          title="Скоро"
        >
          {{ format }}
        </button>
      </div>
    </div>

    <div class="template-card__prices">
      <div class="price-row">
        <span class="price-row__label">Флаг из {{ fabricGenitive }}</span>
        <div class="price-row__value">
          <span class="price-row__qty">{{ quantity }}</span>
          <span class="price-row__sep">&times;</span>
          <span class="price-row__amount">{{ basePrice }}</span>
        </div>
      </div>

      <div
        v-if="hasFringe"
        class="price-row"
      >
        <span class="price-row__label">Бахрома</span>
        <div class="price-row__value">
          <span class="price-row__qty">{{ quantity }}</span>
          <span class="price-row__sep">&times;</span>
          <span class="price-row__amount">{{ fringePrice }}</span>
        </div>
      </div>

      <div
        v-if="doubleSided"
        class="price-row"
      >
        <span class="price-row__label">Двухсторонняя печать</span>
        <div class="price-row__value">
          <span class="price-row__qty">{{ quantity }}</span>
          <span class="price-row__sep">&times;</span>
          <span class="price-row__amount">{{ doubleSidedPrice }}</span>
        </div>
      </div>

      <div
        v-if="orderDesign"
        class="price-row"
      >
        <span class="price-row__label">Услуги дизайнера</span>
        <div class="price-row__value">
          <span class="price-row__qty">1</span>
          <span class="price-row__sep">&times;</span>
          <span class="price-row__amount">{{ designPrice }}</span>
        </div>
      </div>

      <div class="template-card__divider" />

      <div class="total-row">
        <span class="total-row__label">К оплате</span>
        <span class="total-row__value">{{ totalPrice }}</span>
      </div>
    </div>

    <div class="template-card__actions">
      <button
        class="buy-btn"
        type="button"
        @click="$emit('pay')"
      >
        <span class="buy-btn__label">Купить</span>
      </button>
      <button
        class="cart-btn"
        type="button"
        @click="$emit('add-to-cart')"
      >
        <span class="cart-btn__text">Добавить в корзину</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.template-card {
  background: white;
  border-radius: $radius-main;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 0;
  align-self: flex-start;

  &__template {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    color: $color-base;
    line-height: 1.6;
  }

  &__subtitle {
    font-size: 0.75rem;
    font-weight: 600;
    color: $color-base-secondary;
    opacity: 0.8;
    line-height: 1.35;
  }

  &__formats {
    display: flex;
    gap: 0.375rem;
  }

  &__format {
    flex: 1;
    height: 2.5rem;
    border-radius: $radius-control;
    background: $color-primary-bg;
    color: $color-primary;
    font-family: 'Manrope', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__prices {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__divider {
    height: 1px;
    background: rgba($color-base, 0.08);
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
  }
}

.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: -0.01em;

  &__label {
    color: $color-base-secondary;
    white-space: nowrap;
  }

  &__value {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    justify-content: flex-end;
    color: $color-base;
    white-space: nowrap;
  }

  &__qty {
    min-width: 1.25rem;
    text-align: right;
  }

  &__amount {
    min-width: 4.5rem;
    text-align: right;
  }
}

.total-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  &__label {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    color: $color-base-secondary;
    letter-spacing: -0.01em;
  }

  &__value {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.75rem;
    color: $color-base;
    letter-spacing: -0.02em;
  }
}

.buy-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.25rem;
  padding: 0 1.125rem;
  background: $color-primary;
  border-radius: $radius-control;
  cursor: pointer;
  transition: background-color 0.2s;

  &__label {
    font-family: 'Manrope', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.5rem;
    color: white;
    white-space: nowrap;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &:hover {
    background: $color-purple-hover;
  }

  &:active {
    background: #c000ff;
  }
}

.cart-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.25rem;
  padding: 0 1.125rem;
  background: $color-primary-light;
  border-radius: $radius-control;
  color: $color-primary;
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5rem;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:hover {
    background: #f6e0ff;
  }

  &:active {
    background: #f2d6ff;
  }
}
</style>

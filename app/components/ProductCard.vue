<script setup>
defineProps({
  image: {
    type: String,
    default: ''
  },
  fabricLabel: {
    type: String,
    default: ''
  },
  sizeLabel: {
    type: String,
    default: ''
  },
  quantity: {
    type: Number,
    default: 0
  },
  hasFringe: {
    type: Boolean,
    default: false
  },
  doubleSided: {
    type: Boolean,
    default: false
  },
  orderDesign: {
    type: Boolean,
    default: false
  },
  basePrice: {
    type: String,
    default: '0 ₽'
  },
  fringePrice: {
    type: String,
    default: '0 ₽'
  },
  doubleSidedPrice: {
    type: String,
    default: '0 ₽'
  },
  designPrice: {
    type: String,
    default: '0 ₽'
  },
  totalPrice: {
    type: String,
    default: '0 ₽'
  }
})

defineEmits(['pay', 'add-to-cart'])
</script>

<template>
  <div class="product-card">
    <div class="product-card__image">
      <img v-if="image" :src="image" alt="Флаг" class="product-card__image-img">
      <UIcon v-else name="i-lucide-flag" class="product-card__image-placeholder" />
    </div>

    <div class="product-card__prices">
      <div class="price-row">
        <div class="price-row__name">
          <span>Флаг</span>
          <span> из {{ fabricLabel }}</span>
          <span>{{ sizeLabel }}</span>
        </div>
        <div class="price-row__value">
          <span class="price-row__qty">{{ quantity }}</span>
          <span>×</span>
          <span class="price-row__amount">{{ basePrice }}</span>
        </div>
      </div>

      <div class="price-row" :class="{ 'price-row--inactive': !hasFringe }">
        <span>Бахрома</span>
        <div class="price-row__value">
          <span class="price-row__qty">{{ quantity }}</span>
          <span>×</span>
          <span class="price-row__amount">{{ fringePrice }}</span>
        </div>
      </div>

      <div class="price-row" :class="{ 'price-row--inactive': !doubleSided }">
        <span>Двухсторонняя печать</span>
        <div class="price-row__value">
          <span class="price-row__qty">{{ quantity }}</span>
          <span>×</span>
          <span class="price-row__amount">{{ doubleSidedPrice }}</span>
        </div>
      </div>

      <div class="price-row" :class="{ 'price-row--inactive': !orderDesign }">
        <span>Разработка макета</span>
        <div class="price-row__value">
          <span class="price-row__amount">{{ designPrice }}</span>
        </div>
      </div>
    </div>

    <div class="product-card__actions">
      <AppButton variant="primary" class="product-card__pay-btn" @click="$emit('pay')">
        <span>К оплате:</span>
        <span>{{ totalPrice }}</span>
      </AppButton>
      <AppButton variant="ghost" icon="i-lucide-shopping-cart" icon-only @click="$emit('add-to-cart')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-base-secondary: rgba($color-base, 0.64);
$color-input-bg: #f4f5f6;

.product-card {
  background: white;
  border-radius: 2rem;
  overflow: hidden;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 0;
  align-self: flex-start;

  &__image {
    aspect-ratio: 750 / 500;
    background: $color-input-bg;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba($color-base, 0.1);
  }

  &__image-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__image-placeholder {
    width: 6rem;
    height: 6rem;
  }

  &__prices {
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem 0;
  }

  &__pay-btn {
    flex: 1;
    justify-content: space-between;
  }
}

.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: $color-base-secondary;
  line-height: 1.2;

  &--inactive {
    opacity: 0.2;
  }

  &__name {
    display: flex;
    gap: 0.25rem;
    white-space: nowrap;
  }

  &__value {
    display: flex;
    flex: 1;
    gap: 0.25rem;
    align-items: center;
    justify-content: flex-end;
  }

  &__qty {
    width: 1.75rem;
    text-align: right;
  }

  &__amount {
    width: 5.25rem;
    text-align: right;
  }
}
</style>

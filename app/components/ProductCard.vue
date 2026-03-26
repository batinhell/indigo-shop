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
  fabricGenitive: {
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
      <img v-if="image" :src="image" :alt="`Флаг из ${fabricGenitive}, ${sizeLabel}`" class="product-card__image-img">
      <UIcon v-else name="i-lucide-flag" class="product-card__image-placeholder" />
    </div>

    <div class="product-card__body">
      <div class="product-card__prices">
        <div class="price-row">
          <span class="price-row__label">Флаг из {{ fabricGenitive }}</span>
          <div class="price-row__value">
            <span class="price-row__qty">{{ quantity }}</span>
            <span class="price-row__sep">&times;</span>
            <span class="price-row__amount">{{ basePrice }}</span>
          </div>
        </div>

        <div v-if="hasFringe" class="price-row">
          <span class="price-row__label">Бахрома</span>
          <div class="price-row__value">
            <span class="price-row__qty">{{ quantity }}</span>
            <span class="price-row__sep">&times;</span>
            <span class="price-row__amount">{{ fringePrice }}</span>
          </div>
        </div>

        <div v-if="doubleSided" class="price-row">
          <span class="price-row__label">Двухсторонняя печать</span>
          <div class="price-row__value">
            <span class="price-row__qty">{{ quantity }}</span>
            <span class="price-row__sep">&times;</span>
            <span class="price-row__amount">{{ doubleSidedPrice }}</span>
          </div>
        </div>

        <div v-if="orderDesign" class="price-row">
          <span class="price-row__label">Услуги дизайнера</span>
          <div class="price-row__value">
            <span class="price-row__qty">1</span>
            <span class="price-row__sep">&times;</span>
            <span class="price-row__amount">{{ designPrice }}</span>
          </div>
        </div>

        <div class="product-card__divider" />

        <div class="total-row">
          <span class="total-row__label">К оплате</span>
          <span class="total-row__value">{{ totalPrice }}</span>
        </div>
      </div>
    </div>

    <div class="product-card__actions">
      <button class="buy-btn" type="button" @click="$emit('pay')">
        <span class="buy-btn__label">Купить<span class="buy-btn__extra">&nbsp;сразу</span></span>
        <span class="buy-btn__payment">
          <span class="buy-btn__payment-text">Оплата СБП</span>
          <!-- СБП icon -->
          <svg class="buy-btn__payment-icon" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.254.093C5.257.062 5.247.024 5.272 0l.008.02c.028.084.078.157.12.234.294.527.59 1.055.885 1.582.14.259.294.51.427.773.002.551-.003 1.103.003 1.656.001.569-.002 1.138.002 1.707v.058c-.488-.297-.975-.596-1.463-.894V.093Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.28.02c.437.256.866.527 1.3.788 1.432.875 2.868 1.744 4.298 2.623-1.387.847-2.773 1.695-4.161 2.54-.005-.568-.001-1.138-.002-1.707.452-.273.901-.55 1.351-.824-.037-.041-.09-.062-.135-.092-.406-.246-.813-.492-1.219-.738-.133-.263-.286-.514-.427-.773-.295-.527-.59-1.054-.885-1.582A1.86 1.86 0 0 1 5.28.02Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.124 2.61c.004.004.011.013.015.017.018.057.043.111.075.16.343.609.684 1.218 1.026 1.826.116.201.223.409.345.606v1.57a7.16 7.16 0 0 1-.256.446c-.384.682-.766 1.366-1.15 2.047-.016.03-.026.062-.038.093l-.017.017c-.003-2.261-.003-4.522 0-6.784Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.214 2.787a.627.627 0 0 1-.075-.161c.479.283.95.58 1.426.867.896.548 1.793 1.096 2.69 1.644.487.298.975.596 1.463.894 1.384.846 2.769 1.692 4.153 2.537-.933.008-1.868 0-2.802.005-.45-.275-.9-.55-1.35-.826-.483-.298-.972-.588-1.452-.892-.338-.216-.684-.42-1.026-.631a12.37 12.37 0 0 1-.37-.222c-.431-.255-.856-.522-1.285-.782-.122-.198-.231-.405-.348-.605a59.42 59.42 0 0 1-1.025-1.826Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.87 6c.127.068.247.15.37.222.342.211.688.415 1.026.631l-.01.011c-.736.452-1.474.9-2.21 1.351-.636.386-1.267.779-1.905 1.16.012-.032.023-.064.037-.094.385-.681.766-1.365 1.15-2.047a2.24 2.24 0 0 1 .256-.447c.428-.264.858-.522 1.285-.787Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.266 6.854c.48.304.969.593 1.452.892-.002.549.001 1.098-.001 1.647-.404.714-.804 1.43-1.206 2.144-.08.15-.175.293-.243.45L5.261 12c-.015-.192-.003-.384-.007-.577.001-1.52-.001-3.039.001-4.558l.01-.011Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.068 8.572c.935-.005 1.869.002 2.803-.005-.319.206-.647.397-.969.597-1.476.901-2.951 1.802-4.427 2.703-.069.04-.134.088-.207.12.068-.157.163-.3.243-.45.403-.714.803-1.43 1.205-2.144.452-.272.904-.544 1.352-.821Z" fill="white"/>
          </svg>
        </span>
      </button>
      <button class="cart-btn" type="button" @click="$emit('add-to-cart')">
        <!-- Cart icon (visible only on hover) -->
        <svg class="cart-btn__icon" viewBox="0 0 22.786 22.783" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.258 15.777L2.372 3.125S1.485 3.04.99 3.028C-.02 3.004-.508.353.76.282 1.146.26 4.357 0 4.357 0l1.256 5.1 17.173.921-2.083 9.283-14.445.474ZM6.56 17.294c3.531 0 3.618 5.394.245 5.394-4.002.008-3.71-5.394-.245-5.394Zm11.916.097c3.53 0 3.62 5.392.245 5.392-4.002 0-3.707-5.392-.245-5.392Z" fill="currentColor" />
        </svg>
        <span class="cart-btn__text">Добавить в корзину</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  background: white;
  border-radius: $radius-main;
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

  &__body {
    display: flex;
    flex-direction: column;
  }

  &__prices {
    padding: 0 1.5rem;
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
    padding: 0.75rem 1.5rem 0;
  }
}

// -- Buy button --

.buy-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.25rem;
  padding: 0 1.125rem;
  background: $color-primary;
  border-radius: $radius-control;
  overflow: hidden;
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

  &__extra {
    display: inline-block;
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    vertical-align: bottom;
    transition: max-width 0.35s ease, opacity 0.25s ease;
  }

  &__payment {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    max-width: 0;
    margin-left: 0;
    opacity: 0;
    overflow: hidden;
    white-space: nowrap;
    transition: max-width 0.35s ease, opacity 0.25s ease;
  }

  &__payment-text {
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1.5rem;
    color: white;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__payment-icon {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
  }
}

// -- Hover states (triggered only by buy button hover) --

.buy-btn:hover {
  background: #e38fff;

  .buy-btn__extra {
    max-width: 4rem;
    opacity: 1;
  }

  .buy-btn__payment {
    max-width: 10rem;
    margin-left: auto;
    opacity: 0.8;
  }

  & ~ .cart-btn {
    padding: 0 0.875rem;

    .cart-btn__text {
      max-width: 0;
      opacity: 0;
    }

    .cart-btn__icon {
      width: 1.5rem;
      opacity: 1;
    }
  }
}

.buy-btn:active {
  background: #c000ff;
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

.cart-btn {
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
  overflow: hidden;
  transition: background-color 0.2s, padding 0.35s ease;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:hover {
    background: #f6e0ff;
  }

  &:active {
    background: #f2d6ff;
  }

  &__icon {
    width: 0;
    height: 1.5rem;
    flex-shrink: 0;
    opacity: 0;
    overflow: hidden;
    transition: width 0.35s ease, opacity 0.25s ease;
  }

  &__text {
    max-width: 15rem;
    opacity: 1;
    overflow: hidden;
    transition: max-width 0.35s ease, opacity 0.25s ease;
  }
}
</style>

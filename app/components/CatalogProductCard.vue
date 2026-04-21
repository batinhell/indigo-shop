<script setup>
import { useThrottleFn } from '@vueuse/core'

const props = defineProps({
  image: {
    type: String,
    default: ''
  },
  images: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'Название товара в две-три строки, две-три строки'
  },
  price: {
    type: String,
    default: 'от 8888 ₽'
  },
  oldPrice: {
    type: String,
    default: '9999 ₽'
  },
  discount: {
    type: String,
    default: '-15%'
  },
  badgeText: {
    type: String,
    default: 'На сайте дешевле'
  },
  showBadge: {
    type: Boolean,
    default: false
  },
  deliveryText: {
    type: String,
    default: '4-5 дней'
  },
  pickupText: {
    type: String,
    default: 'Самовывоз из Донецка'
  },
  typeText: {
    type: String,
    default: 'Онлайн-заказ'
  }
})

defineEmits(['select', 'toggle-favorite'])

const imageSectionCount = 5
const activeImageIndex = ref(0)

const productImages = computed(() => {
  const images = props.images.filter(Boolean)

  if (images.length > 0) {
    return images.slice(0, imageSectionCount)
  }

  return props.image ? [props.image] : []
})

const activeImage = computed(() => productImages.value[activeImageIndex.value] || '')
const hasImageSlider = computed(() => productImages.value.length > 1)

watch(productImages, (images) => {
  if (activeImageIndex.value < images.length) {
    return
  }

  activeImageIndex.value = 0
})

function setActiveImage(index) {
  activeImageIndex.value = Math.min(index, productImages.value.length - 1)
}

const throttledHandleMediaMouseMove = useThrottleFn((event) => {
  if (!hasImageSlider.value) {
    return
  }

  const { left, width } = event.currentTarget.getBoundingClientRect()

  if (width <= 0) {
    return
  }

  const cursorOffset = Math.min(Math.max(event.clientX - left, 0), width - 1)
  const sectionIndex = Math.floor((cursorOffset / width) * imageSectionCount)

  setActiveImage(sectionIndex)
}, 80)

function resetActiveImage() {
  activeImageIndex.value = 0
}
</script>

<template>
  <article class="catalog-product-card">
    <div
      class="catalog-product-card__media"
      @mousemove="throttledHandleMediaMouseMove"
      @mouseleave="resetActiveImage"
    >
      <img
        v-if="activeImage"
        :src="activeImage"
        :alt="title"
        class="catalog-product-card__image"
      >
      <div
        v-else
        class="catalog-product-card__image catalog-product-card__image--empty"
      >
        <UIcon name="i-lucide-image" />
      </div>

      <div class="catalog-product-card__edge catalog-product-card__edge--left" />
      <div class="catalog-product-card__edge catalog-product-card__edge--right" />

      <div class="catalog-product-card__media-content">
        <div class="catalog-product-card__media-top">
          <AppFavoriteButton @change="$emit('toggle-favorite', $event)" />
        </div>

        <div class="catalog-product-card__media-bottom">
          <ProductBadge
            v-if="showBadge"
            :discount="discount"
            :text="badgeText"
          />

          <div
            class="catalog-product-card__dots"
            aria-hidden="true"
          >
            <span
              v-for="(sliderImage, index) in productImages"
              :key="`${sliderImage}-${index}`"
              class="catalog-product-card__dot"
              :class="{ 'catalog-product-card__dot--active': index === activeImageIndex }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="catalog-product-card__content">
      <div class="catalog-product-card__main">
        <h3 class="catalog-product-card__title">
          {{ title }}
        </h3>

        <ProductPriceRow
          sale
          :price="price"
          :old-price="oldPrice"
        />
      </div>

      <div class="catalog-product-card__meta">
        <span class="catalog-product-card__meta-item">
          {{ deliveryText }}
        </span>
        <span class="catalog-product-card__meta-item">
          {{ pickupText }}
        </span>
        <span class="catalog-product-card__meta-item">
          {{ typeText }}
        </span>
      </div>
    </div>

    <button
      type="button"
      class="catalog-product-card__action"
      @click="$emit('select')"
    >
      Выбрать параметры
    </button>
  </article>
</template>

<style scoped>
.catalog-product-card {
  background: #fff;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: 0.875rem;
  width: 16.25rem;
}

.catalog-product-card:hover {
  box-shadow: 0 0 1.5rem rgba(201, 37, 255, 0.1);
}

.catalog-product-card:active {
  box-shadow: inset 0 0 1.5rem rgba(4, 18, 27, 0.04);
}

.catalog-product-card__media {
  border-radius: 1.5rem;
  cursor: pointer;
  height: 16.25rem;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.catalog-product-card__image {
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.catalog-product-card__image--empty {
  align-items: center;
  background: rgba(4, 18, 27, 0.08);
  color: rgba(4, 18, 27, 0.3);
  display: flex;
  justify-content: center;
}

.catalog-product-card__edge {
  bottom: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 27.31%;
}

.catalog-product-card__edge--left {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 93.662%);
  left: 0;
}

.catalog-product-card__edge--right {
  background: linear-gradient(270deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 93.662%);
  right: 0;
}

.catalog-product-card__media-content {
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  left: 1rem;
  position: absolute;
  right: 1rem;
  top: 1.5rem;
}

.catalog-product-card__media-top {
  display: flex;
  justify-content: flex-end;
}

.catalog-product-card__media-bottom {
  min-height: 0.5rem;
  position: relative;
}

.catalog-product-card__media-bottom :deep(.product-badge) {
  display: inline-flex;
  flex-shrink: 0;
}

.catalog-product-card__dots {
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
  gap: 0.3125rem;
  position: absolute;
  right: 0;
  bottom: 0;
}

.catalog-product-card__dot {
  background: rgba(255, 255, 255, 0.24);
  border-radius: 50%;
  height: 0.25rem;
  width: 0.25rem;
}

.catalog-product-card__dot--active {
  background: rgba(255, 255, 255, 0.64);
  height: 0.5rem;
  width: 0.5rem;
}

.catalog-product-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
}

.catalog-product-card__main {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.catalog-product-card__title {
  color: #04121b;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.125rem;
  margin: 0;
}

.catalog-product-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
}

.catalog-product-card__meta-item {
  align-items: center;
  color: rgba(4, 18, 27, 0.52);
  display: inline-flex;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
  font-size: 0.625rem;
  font-weight: 600;
  gap: 0.25rem;
  line-height: 0.875rem;
  white-space: nowrap;
}

.catalog-product-card__meta-item::before {
  background: #c3c6c8;
  border-radius: 0.5625rem;
  content: '';
  flex-shrink: 0;
  height: 0.75rem;
  width: 0.75rem;
}

.catalog-product-card__action {
  align-items: center;
  background: #de7aff;
  border-radius: 0.75rem;
  color: #fff;
  display: flex;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
  font-size: 1rem;
  font-weight: 600;
  height: 2.5rem;
  justify-content: center;
  line-height: 1.5rem;
  margin: 0 1rem;
  transition: background-color 0.15s ease;
}

.catalog-product-card__action:hover {
  background: #e38fff;
}

.catalog-product-card__action:active {
  background: #c925ff;
}

.catalog-product-card__action:focus-visible {
  outline: 0.125rem solid rgba(201, 37, 255, 0.45);
  outline-offset: 0.125rem;
}
</style>

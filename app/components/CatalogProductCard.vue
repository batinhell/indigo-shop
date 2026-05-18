<script setup>
import onlineOrderIcon from '~/assets/icons/catalog-online-order.svg'

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
  subtitle: {
    type: String,
    default: ''
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
  deliveryTiming: {
    type: String,
    default: 'short'
  },
  pickupText: {
    type: String,
    default: 'Самовывоз из Донецка'
  },
  typeText: {
    type: String,
    default: ''
  },
  isFavorite: {
    type: Boolean,
    default: false
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
</script>

<template>
  <article
    class="catalog-product-card"
    role="button"
    tabindex="0"
    @click="$emit('select')"
    @keydown.enter="$emit('select')"
    @keydown.space.prevent="$emit('select')"
  >
    <div class="catalog-product-card__media">
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

      <div class="catalog-product-card__media-content">
        <div class="catalog-product-card__media-top">
          <AppFavoriteButton
            :active="isFavorite"
            @click.stop
            @change="$emit('toggle-favorite', $event)"
          />
        </div>

        <div class="catalog-product-card__media-bottom">
          <div class="catalog-product-card__bottom-left">
            <ProductBadge
              v-if="showBadge"
              :discount="discount"
              text=""
            />
          </div>

          <div
            v-if="hasImageSlider"
            class="catalog-product-card__dots"
            aria-hidden="true"
          >
            <button
              v-for="(sliderImage, index) in productImages"
              :key="`${sliderImage}-${index}`"
              type="button"
              class="catalog-product-card__dot"
              :class="{ 'catalog-product-card__dot--active': index === activeImageIndex }"
              tabindex="-1"
              @click.stop
              @mouseenter="setActiveImage(index)"
              @focus="setActiveImage(index)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="catalog-product-card__content">
      <div class="catalog-product-card__badges">
        <ProductTermBadge
          :text="deliveryText"
          :timing="deliveryTiming"
        />

        <div
          v-if="typeText"
          class="catalog-product-card__type-badge"
        >
          <img
            :src="onlineOrderIcon"
            alt=""
            class="catalog-product-card__type-icon"
            aria-hidden="true"
          >
          <span>{{ typeText }}</span>
        </div>
      </div>

      <div class="catalog-product-card__main">
        <h3 class="catalog-product-card__title">
          {{ title }}
        </h3>

        <p
          v-if="subtitle"
          class="catalog-product-card__subtitle"
        >
          {{ subtitle }}
        </p>

        <ProductPriceRow
          :price="price"
          :old-price="oldPrice"
        />
      </div>
    </div>
  </article>
</template>

<style scoped>
.catalog-product-card {
  background: #fff;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 16.25rem;
}

.catalog-product-card:hover {
  box-shadow: 0 0 1.5rem rgba(201, 37, 255, 0.1);
}

.catalog-product-card:active {
  box-shadow: inset 0 0 1.5rem rgba(4, 18, 27, 0.04);
}

.catalog-product-card {
  cursor: pointer;
}

.catalog-product-card:focus-visible {
  outline: 0.125rem solid rgba(102, 54, 255, 0.45);
  outline-offset: 0.1875rem;
}

.catalog-product-card__media {
  border-radius: 1.5rem;
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
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  min-height: 1.25rem;
  position: relative;
}

.catalog-product-card__bottom-left {
  align-items: flex-start;
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
}

.catalog-product-card__bottom-left :deep(.product-badge) {
  display: inline-flex;
  flex-shrink: 0;
}

.catalog-product-card__dots {
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
  gap: 0.3125rem;
}

.catalog-product-card__dot {
  background: rgba(255, 255, 255, 0.24);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  height: 0.25rem;
  padding: 0;
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
  padding: 1rem 1rem 1.5rem;
}

.catalog-product-card__badges {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.catalog-product-card__type-badge {
  align-items: center;
  background: #efeaff;
  border-radius: 0.375rem;
  color: #6636ff;
  display: inline-flex;
  flex-shrink: 0;
  gap: 0.25rem;
  justify-content: center;
  padding: 0.25rem 0.375rem;
}

.catalog-product-card__type-badge span {
  font-feature-settings: 'lnum' 1, 'pnum' 1;
  font-size: 0.625rem;
  font-weight: 600;
  line-height: 0.75rem;
  white-space: nowrap;
}

.catalog-product-card__type-icon {
  display: block;
  flex-shrink: 0;
  height: 0.75rem;
  width: 0.75rem;
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

.catalog-product-card__subtitle {
  color: rgba(4, 18, 27, 0.64);
  font-feature-settings: 'lnum' 1, 'pnum' 1;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  margin: 0;
  min-height: 2rem;
}

.catalog-product-card__main :deep(.product-price-row) {
  color: #de7aff;
  font-size: 1.25rem;
  line-height: 1.5rem;
}
</style>

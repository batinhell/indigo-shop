<script setup>
import progressSmile from '~/assets/icons/landing-progress-smile.svg'
import { catalogCategoryItems, catalogProducts } from '~/constants/catalog-products.js'

const title = 'Каталог — Indigo'
const description = 'Каталог флагов: популярные форматы, материалы и готовые конфигурации.'
const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Каталог', to: '' }
]

const categorySections = computed(() => {
  return catalogCategoryItems.map(category => ({
    ...category,
    products: catalogProducts.filter(item => item.category === category.id)
  }))
})

const collapsedCategories = reactive(
  Object.fromEntries(catalogCategoryItems.map(category => [category.id, false]))
)

const isConstructorOpen = ref(false)
const isManagerOrderOpen = ref(false)
const selectedManagerOrderProduct = ref(null)
const { isFavorite, toggleItem } = useFavorites()
const { addItem } = useCart()

function normalizeFavoriteProduct(product) {
  return {
    id: product.id,
    category: product.category,
    images: product.images,
    title: product.title,
    subtitle: product.subtitle,
    price: product.price,
    discount: product.discount,
    deliveryText: product.deliveryText,
    deliveryTiming: product.deliveryTiming
  }
}

function toggleFavorite(product) {
  toggleItem(normalizeFavoriteProduct(product))
}

function toggleCategory(categoryId) {
  collapsedCategories[categoryId] = !collapsedCategories[categoryId]
}

function openConstructor(product) {
  if (product.orderType === 'online') {
    isConstructorOpen.value = true
    return
  }

  selectedManagerOrderProduct.value = product
  isManagerOrderOpen.value = true
}

function addConstructorItemToCart(item) {
  addItem(item)
  isConstructorOpen.value = false
}

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <main class="catalog-page">
    <div class="catalog-page__container">
      <AppBreadcrumbs
        :items="breadcrumbs"
        class="catalog-page__breadcrumbs"
      />

      <h1 class="catalog-page__title">
        Каталог
      </h1>

      <section
        v-for="category in categorySections"
        :id="`category-${category.id}`"
        :key="category.id"
        class="catalog-page__subcategory"
        :class="{ 'catalog-page__subcategory--collapsed': collapsedCategories[category.id] }"
        :aria-label="`Подкатегория ${category.label}`"
      >
        <div class="catalog-page__subcategory-header">
          <div class="catalog-page__subcategory-content">
            <h2 class="catalog-page__subcategory-title">
              {{ category.label }}
            </h2>
            <p class="catalog-page__subcategory-description">
              {{ category.description }}
            </p>
          </div>

          <button
            type="button"
            class="catalog-page__subcategory-toggle"
            :aria-expanded="collapsedCategories[category.id] ? 'false' : 'true'"
            :aria-controls="`category-grid-${category.id}`"
            :aria-label="`${collapsedCategories[category.id] ? 'Развернуть' : 'Свернуть'} раздел ${category.label}`"
            @click="toggleCategory(category.id)"
          >
            <AppIcon
              name="chevron"
              :size="16"
              class="catalog-page__subcategory-toggle-icon"
              :class="{ 'catalog-page__subcategory-toggle-icon--collapsed': collapsedCategories[category.id] }"
            />
          </button>
        </div>

        <div
          v-show="!collapsedCategories[category.id]"
          :id="`category-grid-${category.id}`"
          class="catalog-page__grid"
          aria-label="Товары"
        >
          <CatalogProductCard
            v-for="item in category.products"
            :key="item.id"
            :images="item.images"
            :title="item.title"
            :subtitle="item.subtitle"
            :price="item.price"
            :discount="item.discount"
            :delivery-text="item.deliveryText"
            :delivery-timing="item.deliveryTiming"
            :type-text="item.orderType === 'online' ? 'Онлайн-заказ' : ''"
            :show-badge="Boolean(item.discount)"
            :is-favorite="isFavorite(item.id)"
            @select="openConstructor(item)"
            @toggle-favorite="toggleFavorite(item)"
          />
        </div>

        <div
          v-show="!collapsedCategories[category.id]"
          class="catalog-page__placeholder"
          aria-label="Разделы каталога в разработке"
        >
          <div
            class="catalog-page__placeholder-grid"
            aria-hidden="true"
          >
            <div
              v-for="index in 8"
              :key="index"
              class="catalog-page__skeleton-card"
            >
              <div class="catalog-page__skeleton-image" />
              <div class="catalog-page__skeleton-content">
                <div class="catalog-page__skeleton-line catalog-page__skeleton-line--full" />
                <div class="catalog-page__skeleton-line catalog-page__skeleton-line--medium" />
                <div class="catalog-page__skeleton-line catalog-page__skeleton-line--small" />
                <div class="catalog-page__skeleton-line catalog-page__skeleton-line--price" />
                <div class="catalog-page__skeleton-button" />
              </div>
            </div>
          </div>

          <div class="catalog-page__notice">
            <h2 class="catalog-page__notice-title">
              Мы еще работаем<br>
              над наполнением каталога
            </h2>
            <p class="catalog-page__notice-description">
              Скоро тут появятся: корпоративная продукция, товары для свадеб и&nbsp;оформления магазинов, фотоальбомы и&nbsp;товары для&nbsp;художников
            </p>
            <img
              :src="progressSmile"
              alt=""
              class="catalog-page__notice-arrow"
              aria-hidden="true"
            >
          </div>
        </div>
      </section>
    </div>

    <ConstructorModal
      v-model="isConstructorOpen"
      @pay="addConstructorItemToCart"
      @add-to-cart="addConstructorItemToCart"
    />

    <ManagerOrderModal
      v-model="isManagerOrderOpen"
      :product-title="selectedManagerOrderProduct?.title"
    />
  </main>
</template>

<style lang="scss" scoped>
.catalog-page {
  padding: 0 0 2rem;
}

.catalog-page__container {
  margin: 0 auto;
  max-width: 1106px;
  width: calc(100% - 32px);
}

.catalog-page__breadcrumbs {
  margin-bottom: 1.25rem;
}

.catalog-page__title {
  color: #04121b;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.5rem;
  margin: 0 0 1.5rem;
}

.catalog-page__subcategory {
  margin-bottom: 2.25rem;
}

.catalog-page__subcategory-header {
  align-items: center;
  display: flex;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
}

.catalog-page__subcategory--collapsed .catalog-page__subcategory-header {
  margin-bottom: 0;
}

.catalog-page__subcategory-content {
  color: #04121b;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  gap: 0.625rem;
  min-width: 0;
}

.catalog-page__subcategory-title {
  font-size: 1.625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.75rem;
  margin: 0;
}

.catalog-page__subcategory-description {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.375rem;
  margin: 0;
}

.catalog-page__subcategory-toggle {
  align-items: center;
  background: #f9ebff;
  border-radius: 0.75rem;
  display: inline-flex;
  height: 2.5rem;
  justify-content: center;
  transition: background-color 0.15s ease;
  width: 2.5rem;
}

.catalog-page__subcategory-toggle:hover {
  background: #f6e0ff;
}

.catalog-page__subcategory-toggle:active {
  background: #f2d6ff;
}

.catalog-page__subcategory-toggle:focus-visible {
  outline: 0.125rem solid rgba(201, 37, 255, 0.45);
  outline-offset: 0.125rem;
}

.catalog-page__subcategory-toggle-icon {
  color: #de7aff;
  transition: transform 0.15s ease;
}

.catalog-page__subcategory-toggle-icon--collapsed {
  transform: rotate(-90deg);
}

.catalog-page__grid {
  display: grid;
  gap: 1.375rem;
  grid-template-columns: repeat(auto-fill, 16.25rem);
  justify-items: start;
}

.catalog-page__placeholder {
  margin-top: 3rem;
  min-height: 65.75rem;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.catalog-page__placeholder-grid {
  display: grid;
  gap: 1.375rem;
  grid-template-columns: repeat(auto-fill, 16.25rem);
}

.catalog-page__skeleton-card {
  background: #ffffff;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 27rem;
  overflow: hidden;
  width: 16.25rem;
}

.catalog-page__skeleton-image {
  background: #faf5ff;
  border-radius: 1.5rem;
  height: 16.25rem;
  margin: 0.625rem;
}

.catalog-page__skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.375rem 1rem 1.5rem;
}

.catalog-page__skeleton-line,
.catalog-page__skeleton-button {
  background: #faf5ff;
  border-radius: 0.25rem;
}

.catalog-page__skeleton-line--full {
  height: 1rem;
  width: 100%;
}

.catalog-page__skeleton-line--medium {
  height: 1rem;
  width: 8.75rem;
}

.catalog-page__skeleton-line--small {
  height: 0.75rem;
  margin-top: 0.25rem;
  width: 11.25rem;
}

.catalog-page__skeleton-line--price {
  height: 1.5rem;
  margin-top: 0.25rem;
  width: 6.25rem;
}

.catalog-page__skeleton-button {
  border-radius: 1.28125rem;
  height: 2.25rem;
  margin-top: 1rem;
  width: 100%;
}

.catalog-page__placeholder::after {
  backdrop-filter: blur(1.9px);
  background: linear-gradient(180deg, rgba(250, 245, 255, 0.1) 27.06%, rgba(250, 245, 255, 0.8) 96.78%);
  content: '';
  inset: 0;
  pointer-events: none;
  position: absolute;
}

.catalog-page__notice {
  align-items: center;
  color: rgba(35, 8, 43, 0.64);
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
  left: 50%;
  max-width: 32.625rem;
  position: absolute;
  text-align: center;
  top: 7.625rem;
  transform: translateX(-50%);
  width: min(100%, 32.625rem);
  z-index: 1;
}

.catalog-page__notice-title {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.045rem;
  line-height: 2.75rem;
  margin: 0;
}

.catalog-page__notice-description {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.03rem;
  line-height: 2rem;
  margin: 0;
}

.catalog-page__notice-arrow {
  display: block;
  height: 2.5rem;
  width: 3.9375rem;
}

@media (max-width: 960px) {
  .catalog-page__grid {
    grid-template-columns: repeat(auto-fill, 16.25rem);
  }
}

@media (max-width: 720px) {
  .catalog-page {
    padding-top: 0;
  }

  .catalog-page__container {
    width: calc(100% - 24px);
  }

  .catalog-page__title {
    font-size: 1.75rem;
    line-height: 2.25rem;
    margin-bottom: 1rem;
  }

  .catalog-page__subcategory {
    margin-bottom: 1.5rem;
  }

  .catalog-page__subcategory-title {
    font-size: 1.375rem;
    line-height: 1.625rem;
  }

  .catalog-page__subcategory-description {
    font-size: 0.875rem;
    line-height: 1.125rem;
  }

  .catalog-page__grid,
  .catalog-page__placeholder-grid {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .catalog-page__placeholder {
    min-height: 44rem;
  }

  .catalog-page__notice {
    top: 5rem;
    width: calc(100% - 2rem);
  }

  .catalog-page__notice-title {
    font-size: 1.75rem;
    letter-spacing: -0.035rem;
    line-height: 2.125rem;
  }

  .catalog-page__notice-description {
    font-size: 1rem;
    letter-spacing: 0;
    line-height: 1.375rem;
  }
}
</style>

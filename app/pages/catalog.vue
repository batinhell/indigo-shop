<script setup>
import denseImage from '~/assets/images/dense_polyester_grommets_60x90_single.png'
import meshImage from '~/assets/images/mesh_sleeve_90x135_double.png'
import polyesterImage from '~/assets/images/polyester_grommets_90x135_double.png'
import satinImage from '~/assets/images/satin_sleeve_60x90_single.png'

const title = 'Каталог — Indigo'
const description = 'Каталог флагов: популярные форматы, материалы и готовые конфигурации.'
const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Каталог', to: '' }
]

const categoryItems = [
  {
    id: 'artists',
    label: 'Художникам',
    description: 'Стикеры, постеры, скетчбуки и портфолио для творческих людей'
  },
  {
    id: 'wedding',
    label: 'Свадебное',
    description: 'Полиграфия и сувениры в едином свадебном стиле'
  },
  {
    id: 'albums',
    label: 'Фотоальбомы',
    description: 'Ручная сборка фотокниг под разные поводы'
  },
  {
    id: 'textile',
    label: 'Текстиль',
    description: 'Нанесение на футболки, шопперы, кепки, флаги, нашивки'
  },
  {
    id: 'retail',
    label: 'Оформление магазинов',
    description: 'Баннеры, стенды, таблички, вывески и витринная плёнка'
  },
  {
    id: 'gifts',
    label: 'Подарки близким',
    description: 'Персонализированные сувениры с фото и гравировкой'
  },
  {
    id: 'corporate',
    label: 'Корпоративная продукция',
    description: 'Имиджевая и рабочая полиграфия для бизнеса'
  },
  {
    id: 'events',
    label: 'К мероприятию',
    description: 'Бейджи, браслеты, блокноты и фотозоны под событие'
  }
]

const products = [
  {
    id: 1,
    category: 'artists',
    image: meshImage,
    title: 'Название товара в две-три строки, две-три строки',
    price: 'от 8 888 ₽',
    oldPrice: '9999 ₽',
    discount: '-15%',
    badgeText: 'На сайте дешевле'
  },
  {
    id: 2,
    category: 'wedding',
    image: satinImage,
    title: 'Название товара в две-три строки, две-три строки',
    price: 'от 7 550 ₽',
    oldPrice: '8999 ₽',
    discount: '-10%',
    badgeText: 'На сайте выгоднее'
  },
  {
    id: 3,
    category: 'albums',
    image: polyesterImage,
    title: 'Название товара в две-три строки, две-три строки',
    price: 'от 9 240 ₽',
    oldPrice: '10999 ₽',
    discount: '-20%',
    badgeText: 'На сайте дешевле'
  },
  {
    id: 4,
    category: 'textile',
    image: denseImage,
    title: 'Название товара в две-три строки, две-три строки',
    price: 'от 6 990 ₽',
    oldPrice: '7999 ₽',
    discount: '-8%',
    badgeText: 'Акция'
  },
  {
    id: 5,
    category: 'retail',
    image: meshImage,
    title: 'Название товара в две-три строки, две-три строки',
    price: 'от 10 900 ₽',
    oldPrice: '12999 ₽',
    discount: '-16%',
    badgeText: 'На сайте дешевле'
  },
  {
    id: 6,
    category: 'gifts',
    image: satinImage,
    title: 'Название товара в две-три строки, две-три строки',
    price: 'от 5 490 ₽',
    oldPrice: '6499 ₽',
    discount: '-12%',
    badgeText: 'Акция'
  },
  {
    id: 7,
    category: 'corporate',
    image: polyesterImage,
    title: 'Название товара в две-три строки, две-три строки',
    price: 'от 11 990 ₽',
    oldPrice: '14999 ₽',
    discount: '-20%',
    badgeText: 'На сайте выгоднее'
  },
  {
    id: 8,
    category: 'events',
    image: denseImage,
    title: 'Название товара в две-три строки, две-три строки',
    price: 'от 4 990 ₽',
    oldPrice: '5799 ₽',
    discount: '-9%',
    badgeText: 'На сайте дешевле'
  }
]

const categorySections = computed(() => {
  return categoryItems.map(category => ({
    ...category,
    products: products.filter(item => item.category === category.id)
  }))
})

const collapsedCategories = reactive(
  Object.fromEntries(categoryItems.map(category => [category.id, false]))
)

function toggleCategory(categoryId) {
  collapsedCategories[categoryId] = !collapsedCategories[categoryId]
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
          :id="`category-grid-${category.id}`"
          v-show="!collapsedCategories[category.id]"
          class="catalog-page__grid"
          aria-label="Товары"
        >
          <CatalogProductCard
            v-for="item in category.products"
            :key="item.id"
            :image="item.image"
            :title="item.title"
            :price="item.price"
            :old-price="item.oldPrice"
            :discount="item.discount"
            :badge-text="item.badgeText"
          />
        </div>
      </section>
    </div>
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
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(16.25rem, 1fr));
  justify-items: start;
}

@media (max-width: 960px) {
  .catalog-page__grid {
    grid-template-columns: repeat(auto-fill, minmax(16.25rem, 1fr));
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
}
</style>

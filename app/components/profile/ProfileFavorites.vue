<script setup>
import { catalogProducts } from '~/constants/catalog-products.js'

const { items, removeItem, clearItems } = useFavorites()

const currentCatalogProductsById = new Map(catalogProducts.map(product => [product.id, product]))

const favoriteProducts = computed(() => (
  items.value.map(item => ({
    ...item,
    ...currentCatalogProductsById.get(item.id)
  }))
))
</script>

<template>
  <section class="profile-favorites">
    <div class="profile-favorites__header">
      <h2 class="profile-favorites__title">
        Избранное
      </h2>
      <button
        v-if="items.length"
        type="button"
        class="profile-favorites__clear"
        @click="clearItems"
      >
        Очистить
      </button>
    </div>

    <div
      v-if="favoriteProducts.length"
      class="profile-favorites__grid"
    >
      <ProfileFavoriteCard
        v-for="item in favoriteProducts"
        :key="item.id"
        :images="item.images"
        title="Город Верных Сердец"
        @remove="removeItem(item.id)"
      />
    </div>

    <div
      v-else-if="items.length"
      class="profile-favorites__grid"
    >
      <ProfileFavoriteCard
        v-for="item in items"
        :key="item.id"
        :images="item.images"
        title="Город Верных Сердец"
        @remove="removeItem(item.id)"
      />
    </div>

    <div
      v-else
      class="profile-favorites__empty"
    >
      <AppIcon
        name="favorite"
        class="profile-favorites__empty-icon"
      />
      <div class="profile-favorites__empty-copy">
        <h3 class="profile-favorites__empty-title">
          Пока ничего нет
        </h3>
        <p class="profile-favorites__empty-text">
          Добавляйте товары из каталога, чтобы быстро вернуться к ним позже.
        </p>
      </div>
      <NuxtLink
        to="/catalog"
        class="profile-favorites__empty-link"
      >
        Перейти в каталог
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.profile-favorites {
  width: 100%;
  padding: 2rem 1.5rem;
  border-radius: $radius-main $radius-main $radius-card $radius-card;
  background: #ffffff;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  &__title {
    margin: 0;
    color: $color-base;
    font-size: 1.625rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.75rem;
  }

  &__clear {
    align-items: center;
    background: #ffebed;
    border-radius: 0.375rem;
    color: #ed5c68;
    display: inline-flex;
    font-size: 0.75rem;
    font-weight: 600;
    height: 2rem;
    justify-content: center;
    line-height: 1rem;
    padding: 0.375rem 0.75rem;
    white-space: nowrap;
    transition: background-color 0.15s, color 0.15s;

    &:hover {
      background: #ffd8dc;
    }

    &:active {
      background: #ffc5cb;
      color: #e12e3c;
    }

    &:focus-visible {
      outline: 0.125rem solid rgba(237, 92, 104, 0.24);
      outline-offset: 0.125rem;
    }
  }

  &__grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    justify-items: start;
  }

  &__empty {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 7rem;
    padding: 1rem;
    border-radius: $radius-card;
    background: $color-input-bg;
  }

  &__empty-icon {
    flex-shrink: 0;
    width: 2rem;
    height: 1.8rem;
    color: #ff6bbf;
  }

  &__empty-copy {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }

  &__empty-title {
    margin: 0;
    color: $color-base;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  &__empty-text {
    margin: 0;
    color: $color-base-secondary;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
  }

  &__empty-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.5rem;
    padding: 0.5rem 1.125rem;
    border-radius: $radius-control;
    background: $color-primary;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    text-decoration: none;
    white-space: nowrap;
    transition: background-color 0.15s;

    &:hover {
      background: #e38fff;
    }

    &:active {
      background: #c925ff;
    }

    &:focus-visible {
      outline: 0.125rem solid rgba(201, 37, 255, 0.45);
      outline-offset: 0.125rem;
    }
  }
}

@media (max-width: 720px) {
  .profile-favorites {
    padding: 1.5rem 1rem;

    &__header,
    &__empty {
      align-items: flex-start;
      flex-direction: column;
    }

    &__grid {
      grid-template-columns: repeat(auto-fill, minmax(9.875rem, 1fr));
    }
  }
}
</style>

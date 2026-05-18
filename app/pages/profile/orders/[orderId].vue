<script setup>
import productImage from '~/assets/images/mesh_sleeve_90x135_single_fringe.png'

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const orderNumber = computed(() => String(route.params.orderId || '97194154-0050'))

const orderItems = [
  {
    id: 'tirage-1',
    image: productImage,
    title: 'Флаг из флажной сетки',
    description: 'Флажная сетка, под древко, 90×135 см, бахрома, печать с двух сторон',
    quantity: '10 000 шт',
    price: '4 800 ₽',
    unitPrice: '2 400 ₽ / шт'
  },
  {
    id: 'tirage-2',
    image: productImage,
    title: 'Флаг из флажной сетки',
    description: 'Флажная сетка, под древко, 90×135 см, бахрома, печать с двух сторон',
    quantity: '10 000 шт',
    price: '4 800 ₽',
    unitPrice: '2 400 ₽ / шт'
  }
]

function backToOrders() {
  navigateTo('/profile?tab=orders')
}
</script>

<template>
  <main class="order-page">
    <div class="order-page__container">
      <button
        type="button"
        class="order-page__back"
        @click="backToOrders"
      >
        <AppIcon
          name="chevron"
          class="order-page__back-icon"
        />
        <span>Продолжить покупки</span>
      </button>

      <h1 class="order-page__title">
        Заказ от 23 марта №{{ orderNumber }}
      </h1>

      <div class="order-page__layout">
        <div class="order-page__main">
          <section class="order-info app-card">
            <article class="order-info__card">
              <div class="order-info__card-header">
                <h2 class="order-info__card-title">
                  Самовывоз
                </h2>
                <button
                  type="button"
                  class="order-info__small-button"
                >
                  Карта
                </button>
              </div>
              <p class="order-info__text">
                ДНР, Донецк,<br>
                ул. Постышева, дом 60
              </p>
            </article>

            <article class="order-info__card">
              <div class="order-info__card-header">
                <h2 class="order-info__card-title">
                  Получатель
                </h2>
                <button
                  type="button"
                  class="order-info__small-button"
                >
                  Изменить
                </button>
              </div>
              <p class="order-info__text">
                Имя<br>
                Номер телефона
              </p>
            </article>
          </section>

          <section class="order-items app-card">
            <article
              v-for="item in orderItems"
              :key="item.id"
              class="order-item-row"
            >
              <div class="order-item-row__image-wrap">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="order-item-row__image"
                >
              </div>

              <div class="order-item-row__content">
                <h2 class="order-item-row__title">
                  {{ item.title }}
                </h2>
                <p class="order-item-row__description">
                  {{ item.description }}
                </p>
                <p class="order-item-row__quantity">
                  {{ item.quantity }}
                </p>
              </div>

              <div class="order-item-row__price">
                <span class="order-item-row__price-value">
                  {{ item.price }}
                </span>
                <span class="order-item-row__price-caption">
                  {{ item.unitPrice }}
                </span>
              </div>
            </article>
          </section>
        </div>

        <aside class="order-page__sidebar">
          <section class="order-summary app-card">
            <h2 class="order-summary__title">
              Оплачено
            </h2>

            <div class="order-summary__rows">
              <div class="order-summary__row">
                <span>2 тиража</span>
                <strong>13 900 ₽</strong>
              </div>
              <div class="order-summary__row order-summary__row--muted">
                <span>Доставка</span>
                <span>Самовывоз</span>
              </div>
            </div>

            <div class="order-summary__divider" />

            <button
              type="button"
              class="order-summary__repeat"
            >
              Повторить заказ
            </button>

            <a
              href="#"
              class="order-summary__receipt"
              @click.prevent
            >
              Чек об оплате
            </a>
          </section>

          <section class="order-side-card app-card">
            <div class="order-side-card__copy">
              <h2 class="order-side-card__title">
                Нужна помощь с заказом?
              </h2>
              <p class="order-side-card__text">
                Напишите нам на почту или позвоните администратору
              </p>
            </div>
            <div class="order-side-card__actions">
              <button
                type="button"
                class="order-side-card__icon-button order-side-card__icon-button--secondary"
                aria-label="Написать на почту"
              >
                <UIcon name="i-lucide-mail" />
              </button>
              <button
                type="button"
                class="order-side-card__icon-button order-side-card__icon-button--primary"
                aria-label="Позвонить"
              >
                <UIcon name="i-lucide-phone" />
              </button>
            </div>
          </section>

          <section class="order-side-card app-card">
            <div class="order-side-card__copy">
              <h2 class="order-side-card__title">
                Хотите отменить заказ?
              </h2>
              <p class="order-side-card__text">
                Вы можете отменить заказ пока мы не начали работать над ним.
                <a
                  href="#"
                  @click.prevent
                >Подробнее о возврате и обмене товара</a>
              </p>
            </div>
            <button
              type="button"
              class="order-side-card__icon-button order-side-card__icon-button--danger"
              aria-label="Отменить заказ"
            >
              <UIcon name="i-lucide-x" />
            </button>
          </section>
        </aside>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.order-page {
  padding: 1rem 0 4rem;

  &__container {
    margin: 0 auto;
    max-width: 1106px;
    width: calc(100% - 32px);
  }

  &__back {
    align-items: center;
    color: rgba($color-base, 0.52);
    cursor: pointer;
    display: inline-flex;
    font-size: 0.75rem;
    font-weight: 600;
    gap: 0.375rem;
    line-height: 1rem;
    margin-bottom: 0.25rem;
  }

  &__back-icon {
    height: 1rem;
    transform: rotate(90deg);
    width: 1rem;
  }

  &__title {
    color: $color-base;
    font-size: 2rem;
    font-weight: 800;
    line-height: 3.25rem;
    margin: 0 0 1.5rem;
  }

  &__layout {
    align-items: flex-start;
    display: grid;
    gap: 0.375rem;
    grid-template-columns: minmax(0, 1fr) 20.75rem;
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    min-width: 0;
  }

  &__sidebar {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    min-width: 0;
  }
}

.order-info {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 1.75rem 1.5rem 1rem;

  &__card {
    background: $color-input-bg;
    border-radius: $radius-control;
    min-height: 5rem;
    padding: 0.75rem;
  }

  &__card-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  &__card-title {
    color: $color-base;
    font-size: 0.875rem;
    font-weight: 800;
    line-height: 1.25rem;
    margin: 0;
  }

  &__small-button {
    background: rgba(227, 143, 255, 0.1);
    border-radius: 0.375rem;
    color: #de7aff;
    cursor: pointer;
    font-size: 0.625rem;
    font-weight: 700;
    height: 1.5rem;
    line-height: 0.75rem;
    padding: 0.125rem 0.375rem;
    text-transform: uppercase;
    transition: background-color 0.15s, color 0.15s;

    &:hover {
      background: rgba(227, 143, 255, 0.16);
    }

    &:active {
      background: rgba(227, 143, 255, 0.22);
      color: #c000ff;
    }
  }

  &__text {
    color: $color-base-tertiary;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
    margin: 0;
  }
}

.order-items {
  padding: 1.5rem;
}

.order-item-row {
  align-items: center;
  background: $color-input-bg;
  border-radius: $radius-card;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 10rem minmax(0, 1fr) 7rem;
  min-height: 10rem;
  padding: 1rem 1.5rem;

  & + & {
    margin-top: 0.25rem;
  }

  &__image-wrap {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &__image {
    display: block;
    height: 6rem;
    object-fit: contain;
    width: 8rem;
  }

  &__content {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 0.25rem 0;
  }

  &__title {
    color: $color-base;
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.5rem;
    margin: 0 0 0.25rem;
  }

  &__description {
    color: $color-base-secondary;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    margin: 0;
    max-width: 17.5rem;
  }

  &__quantity {
    color: $color-base;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    margin: auto 0 0;
  }

  &__price {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: right;
  }

  &__price-value {
    color: $color-base;
    font-size: 1.625rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.75rem;
    white-space: nowrap;
  }

  &__price-caption {
    color: $color-base-tertiary;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    white-space: nowrap;
  }
}

.order-summary,
.order-side-card {
  width: 100%;
}

.order-summary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;

  &__title {
    color: $color-base;
    font-size: 1.625rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.75rem;
    margin: 0;
  }

  &__rows {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__row {
    align-items: center;
    color: rgba($color-base, 0.52);
    display: flex;
    font-size: 0.875rem;
    font-weight: 600;
    justify-content: space-between;
    line-height: 1.125rem;

    strong {
      color: $color-base;
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.75rem;
    }
  }

  &__divider {
    background: rgba($color-base, 0.06);
    height: 1px;
    width: 100%;
  }

  &__repeat {
    background: #de7aff;
    border-radius: $radius-control;
    color: #ffffff;
    cursor: pointer;
    font-size: 1.25rem;
    font-weight: 700;
    height: 3.25rem;
    line-height: 1.5rem;
    transition: background-color 0.15s;

    &:hover {
      background: #e38fff;
    }

    &:active {
      background: #c000ff;
    }
  }

  &__receipt {
    align-self: center;
    color: #de7aff;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
    text-decoration: underline;
    text-decoration-skip-ink: none;
  }
}

.order-side-card {
  align-items: flex-start;
  display: flex;
  gap: 1rem;
  padding: 1.5rem 1.25rem;

  &__copy {
    flex: 1;
    min-width: 0;
  }

  &__title {
    color: $color-base;
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    line-height: 1.25rem;
    margin: 0 0 0.25rem;
  }

  &__text {
    color: $color-base-tertiary;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    margin: 0;

    a {
      color: inherit;
      text-decoration: underline;
      text-decoration-skip-ink: none;
    }
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
  }

  &__icon-button {
    align-items: center;
    border-radius: $radius-control;
    cursor: pointer;
    display: inline-flex;
    height: 2.5rem;
    justify-content: center;
    transition: background-color 0.15s, color 0.15s;
    width: 2.5rem;
  }

  &__icon-button--secondary {
    background: rgba(222, 122, 255, 0.3);
    color: #de7aff;

    &:hover {
      background: rgba(222, 122, 255, 0.36);
    }

    &:active {
      background: rgba(222, 122, 255, 0.42);
      color: #c000ff;
    }
  }

  &__icon-button--primary {
    background: #de7aff;
    color: #ffffff;

    &:hover {
      background: #e38fff;
    }

    &:active {
      background: #c000ff;
    }
  }

  &__icon-button--danger {
    background: #ffebeb;
    color: #ed5c68;
    flex-shrink: 0;

    &:hover {
      background: #ffd8dc;
    }

    &:active {
      background: #ffc5cb;
      color: #e12e3c;
    }
  }
}

@media (max-width: 960px) {
  .order-page {
    &__layout {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 720px) {
  .order-page {
    &__container {
      width: calc(100% - 24px);
    }

    &__title {
      font-size: 1.75rem;
      line-height: 2.25rem;
    }
  }

  .order-info,
  .order-item-row {
    grid-template-columns: 1fr;
  }

  .order-item-row {
    gap: 1rem;

    &__content,
    &__price {
      align-items: flex-start;
      text-align: left;
    }
  }
}
</style>

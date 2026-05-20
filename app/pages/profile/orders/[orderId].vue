<script setup>
import productImage from '~/assets/images/mesh_sleeve_90x135_single_fringe.png'
import { resolveCartItemImage } from '~/composables/useCart.js'

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const orderId = computed(() => String(route.params.orderId || ''))
const { data, pending, error } = await useFetch(() => `/api/profile/orders/${orderId.value}`, {
  default: () => ({ order: null })
})

const order = computed(() => data.value?.order || null)
const orderNumber = computed(() => order.value?.publicNumber || orderId.value)
const orderItems = computed(() => order.value?.items || [])
const { addExistingItem } = useCart()
const titleLabel = computed(() => order.value?.titleLabel || `Заказ №${orderNumber.value}`)
const summary = computed(() => order.value?.summary || {})
const isMapOpen = ref(false)
const recipientName = computed(() => order.value?.recipient?.name || 'Получатель не указан')
const recipientPhone = computed(() => order.value?.recipient?.phone || 'Телефон не указан')
const summaryTitle = computed(() => {
  if (order.value?.paymentStatus === 'paid') return 'Оплачено'
  if (order.value?.paymentStatus === 'failed') return 'Оплата не прошла'
  if (order.value?.paymentStatus === 'expired') return 'Оплата истекла'
  if (order.value?.paymentStatus === 'cancelled') return 'Отменен'
  return 'Ожидает оплаты'
})
function getItemImage(item) {
  return resolveCartItemImage(item?.config) || productImage
}

const itemCountLabel = computed(() => {
  const count = Number(summary.value.itemsCount || orderItems.value.length || 0)
  return `${count} ${count === 1 ? 'позиция' : 'поз.'}`
})

useSeoMeta({
  title: () => `${titleLabel.value} | Indigo`,
  description: () => `Детали заказа ${orderNumber.value}`
})

function backToOrders() {
  navigateTo('/profile?tab=orders')
}

function repeatOrder() {
  if (!orderItems.value.length) return

  orderItems.value.forEach((item) => {
    addExistingItem({
      productId: item.productId ?? null,
      name: item.title,
      description: item.description || '',
      quantity: item.quantity || 1,
      unitPrice: item.unitPrice || 0,
      designPrice: item.designPrice || 0,
      customerComment: item.customerComment || '',
      config: item.config || {}
    })
  })

  navigateTo('/cart')
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
        {{ titleLabel }}
      </h1>

      <p
        v-if="pending"
        class="order-page__state"
      >
        Загружаем заказ…
      </p>
      <p
        v-else-if="error || !order"
        class="order-page__state order-page__state--error"
      >
        Не удалось загрузить заказ
      </p>

      <div
        v-else
        class="order-page__layout"
      >
        <div class="order-page__main">
          <section class="order-info app-card">
            <article class="order-info__card">
              <div class="order-info__card-header">
                <h2 class="order-info__card-title">
                  {{ order.delivery?.type || 'Самовывоз' }}
                </h2>
                <button
                  type="button"
                  class="order-info__small-button"
                  @click="isMapOpen = true"
                >
                  Карта
                </button>
              </div>
              <p class="order-info__text">
                {{ order.delivery?.address || 'ДНР, Донецк, ул. Постышева, дом 60' }}
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
                  disabled
                >
                  Изменить
                </button>
              </div>
              <p class="order-info__text">
                {{ recipientName }}<br>
                {{ recipientPhone }}
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
                  :src="getItemImage(item)"
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
                  {{ item.quantityLabel }}
                </p>
              </div>

              <div class="order-item-row__price">
                <span class="order-item-row__price-value">
                  {{ item.totalPriceLabel }}
                </span>
                <span class="order-item-row__price-caption">
                  {{ item.unitPriceLabel }}
                </span>
              </div>
            </article>
          </section>
        </div>

        <aside class="order-page__sidebar">
          <section class="order-summary app-card">
            <h2 class="order-summary__title">
              {{ summaryTitle }}
            </h2>

            <div class="order-summary__rows">
              <div class="order-summary__row">
                <span>{{ itemCountLabel }}</span>
                <strong>{{ summary.totalLabel || order.totalPriceLabel }}</strong>
              </div>
              <div class="order-summary__row order-summary__row--muted">
                <span>Доставка</span>
                <span>{{ order.delivery?.type || 'Самовывоз' }}</span>
              </div>
            </div>

            <div class="order-summary__divider" />

            <button
              v-if="order.canRepeat"
              type="button"
              class="order-summary__repeat"
              @click="repeatOrder"
            >
              Повторить заказ
            </button>

            <a
              v-if="order.receiptUrl"
              :href="order.receiptUrl"
              class="order-summary__receipt"
              target="_blank"
              rel="noopener noreferrer"
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

          <section
            v-if="order.canCancel"
            class="order-side-card app-card"
          >
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

    <BaseModal
      v-model="isMapOpen"
      title="Пункт самовывоза"
      max-width="42rem"
    >
      <section class="pickup-map-modal">
        <div class="pickup-map-modal__map">
          <iframe
            title="Пункт самовывоза Indigo"
            src="https://yandex.ru/map-widget/v1/?ll=37.802850%2C48.015884&z=16&pt=37.802850,48.015884,pm2rdm"
            loading="lazy"
          />
        </div>
        <p class="pickup-map-modal__address">
          {{ order?.delivery?.address || 'ДНР, Донецк, ул. Постышева, дом 60' }}
        </p>
      </section>
    </BaseModal>
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

  &__state {
    color: rgba($color-base, 0.52);
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 1.5rem;

    &--error {
      color: #ed5c68;
    }
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

.pickup-map-modal {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.5rem 1.5rem;

  &__map {
    border-radius: 1rem;
    height: 24rem;
    overflow: hidden;
    width: 100%;

    iframe {
      border: 0;
      height: 100%;
      width: 100%;
    }
  }

  &__address {
    color: $color-base;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    margin: 0;
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

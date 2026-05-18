<script setup>
import { authClient } from '~/utils/auth-client.js'

const title = 'Корзина — Indigo'
const description = 'Корзина заказов типографии Indigo.'

const { items: cartItems, updateQuantity, removeItems, updateItem } = useCart()
const session = authClient.useSession()

const selectedItems = computed(() => cartItems.value.filter(item => item.selected))
const sessionUser = computed(() => session.value?.data?.user ?? null)
const isSessionPending = computed(() => session.value?.isPending ?? true)
const isAuthEntryOpen = ref(false)
const payAsLegal = ref(false)

const allSelected = computed({
  get: () => cartItems.value.length > 0 && cartItems.value.every(i => i.selected),
  set: (val) => {
    cartItems.value = cartItems.value.map(i => ({ ...i, selected: val }))
  }
})

const selectedTotalItems = computed(() =>
  selectedItems.value.reduce((sum, item) => sum + item.quantity, 0)
)

const selectedTotalPrice = computed(() =>
  selectedItems.value.reduce((sum, item) => sum + item.unitPrice * item.quantity + item.designPrice, 0)
)

function toggleItem(item) {
  cartItems.value = cartItems.value.map(i =>
    i.id === item.id ? { ...i, selected: !i.selected } : i
  )
}

function deleteSelected() {
  const ids = cartItems.value.filter(i => i.selected).map(i => i.id)
  removeItems(ids)
}

const editingId = ref(null)

function startEdit(itemId) {
  editingId.value = itemId
}

function cancelEdit() {
  editingId.value = null
}

function confirmEdit(itemId, config) {
  updateItem(itemId, config)
  editingId.value = null
}

function pluralItems(n) {
  const mod100 = n % 100
  const mod10 = n % 10
  if (mod100 >= 11 && mod100 <= 19) return 'тиражей'
  if (mod10 === 1) return 'тираж'
  if (mod10 >= 2 && mod10 <= 4) return 'тиража'
  return 'тиражей'
}

function continueShopping() {
  navigateTo('/catalog')
}

function onPay() {
  if (selectedItems.value.length === 0) return
}

async function refreshSession() {
  await session.value?.refetch?.()
}

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <main class="cart-page">
    <div class="cart-page__container">
      <div class="cart-page__header">
        <button
          class="back-link"
          type="button"
          @click="continueShopping"
        >
          <svg
            class="back-link__icon"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="back-link__text">Продолжить покупки</span>
        </button>

        <h1 class="cart-page__title">
          Корзина
        </h1>
      </div>

      <div class="cart-page__content">
        <div class="left-column">
          <div
            v-if="!sessionUser && !isSessionPending"
            class="auth-prompt app-card"
          >
            <p class="auth-prompt__title">
              Войдите или зарегистрируйтесь
            </p>
            <p class="auth-prompt__text">
              Вы сможете отслеживать статус заказа<br>
              и пользоваться преимуществами личного кабинета
            </p>
            <button
              class="auth-prompt__button"
              type="button"
              @click="isAuthEntryOpen = true"
            >
              Вход или регистрация
            </button>
          </div>

          <div
            v-if="cartItems.length === 0"
            class="card app-card"
            :class="!sessionUser && !isSessionPending ? 'card--mid' : 'card--top'"
          >
            <div class="card__inner empty-state">
              <p class="empty-state__title">
                Корзина пуста
              </p>
              <p class="empty-state__subtitle">
                Воспользуйтесь каталогом, чтобы найти всё что нужно
              </p>
              <button
                class="empty-state__btn"
                type="button"
                @click="continueShopping"
              >
                Начать покупки
              </button>
            </div>
          </div>

          <div
            v-else
            class="card app-card"
            :class="!sessionUser && !isSessionPending ? 'card--mid' : 'card--top'"
          >
            <div class="card__inner">
              <p class="section-title">
                Товары
              </p>

              <div class="items-header">
                <div class="items-header__left">
                  <AppCheckbox v-model="allSelected" />
                  <span class="items-header__count">{{ cartItems.length }} {{ pluralItems(cartItems.length) }}</span>
                </div>
                <button
                  class="items-header__delete"
                  aria-label="Удалить выбранные тиражи"
                  @click="deleteSelected"
                >
                  <svg
                    class="items-header__delete-icon"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M2 7H14L13.4744 11.7301C13.3067 13.24 13.2228 13.995 12.8745 14.5647C12.5677 15.0666 12.1201 15.4672 11.5874 15.7168C10.9826 16 10.223 16 8.70379 16H7.29621C5.77697 16 5.01735 16 4.41263 15.7168C3.87993 15.4672 3.43233 15.0666 3.12552 14.5647C2.77722 13.995 2.69333 13.24 2.52556 11.7301L2 7Z"
                      fill="currentColor"
                      fill-opacity="0.64"
                    />
                    <path
                      d="M1 3.5C1 2.67157 1.67157 2 2.5 2C3.32843 2 3.97177 1.24281 4.53657 0.636766C4.90168 0.244995 5.42223 0 6 0H10C10.5778 0 11.0983 0.244995 11.4634 0.636766C12.0282 1.24281 12.6716 2 13.5 2C14.3284 2 15 2.67157 15 3.5C15 4.32843 14.3284 5 13.5 5H2.5C1.67157 5 1 4.32843 1 3.5Z"
                      fill="currentColor"
                      fill-opacity="0.64"
                    />
                  </svg>
                  <span>Удалить</span>
                </button>
              </div>

              <div class="items-list">
                <CartItemRow
                  v-for="item in cartItems"
                  :key="item.id"
                  :item="item"
                  :editing="editingId === item.id"
                  @toggle="toggleItem(item)"
                  @start-edit="startEdit(item.id)"
                  @cancel-edit="cancelEdit"
                  @confirm-edit="(config) => confirmEdit(item.id, config)"
                  @update-quantity="(qty) => updateQuantity(item.id, qty)"
                />
              </div>
            </div>
          </div>

          <CartRecipient
            v-if="cartItems.length > 0"
            v-model:pay-as-legal="payAsLegal"
          />
          <CartPickup v-if="cartItems.length > 0" />
        </div>

        <div class="right-column">
          <CartSummary
            :total-items="selectedTotalItems"
            :total-price="selectedTotalPrice"
            :pay-as-legal="payAsLegal"
            :pay-disabled="selectedItems.length === 0"
            @pay="onPay"
          />
        </div>
      </div>
    </div>

    <AuthEntryModal
      v-model="isAuthEntryOpen"
      @complete-login="refreshSession"
      @complete-registration="refreshSession"
    />
  </main>
</template>

<style lang="scss" scoped>
.cart-page {
  padding: 3.75rem 0 2rem;
}

.cart-page__container {
  margin: 0 auto;
  max-width: 1106px;
  width: calc(100% - 32px);
}

.cart-page__header {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.cart-page__title {
  color: $color-base;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.5rem;
  margin: 0;
}

.cart-page__content {
  display: flex;
  gap: 0.375rem;
}

.auth-prompt {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1.5rem;

  &__title {
    color: $color-base;
    font-size: 1.625rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.75rem;
    text-box: cap alphabetic;
  }

  &__text {
    color: $color-base-secondary;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.5rem;
    text-box: cap alphabetic;
  }

  &__button {
    background: #de7aff;
    border-radius: $radius-control;
    color: white;
    cursor: pointer;
    font-family: 'Manrope', sans-serif;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
    font-size: 1rem;
    font-weight: 600;
    height: 2.5rem;
    line-height: 1.5rem;
    padding: 0.5rem 1.125rem 0.5625rem;
    text-align: center;
    transition: background-color 0.15s;

    &:hover {
      background: #e38fff;
    }

    &:active {
      background: #c925ff;
    }
  }
}

.empty-state {
  &__title {
    color: $color-base;
    font-size: 1.625rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.75rem;
    text-box: cap alphabetic;
  }

  &__subtitle {
    color: $color-base-secondary;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.5rem;
  }

  &__btn {
    align-self: flex-start;
    background: $color-primary-light;
    border-radius: $radius-control;
    color: $color-primary;
    cursor: pointer;
    font-family: 'Manrope', sans-serif;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
    font-size: 1rem;
    font-weight: 600;
    height: 2.5rem;
    line-height: 1.5rem;
    padding: 0 1.125rem;
    transition: background-color 0.15s;

    &:hover {
      background: #f6e0ff;
    }

    &:active {
      background: #f2d6ff;
    }
  }
}

.back-link {
  align-items: center;
  color: rgba($color-base, 0.5);
  cursor: pointer;
  display: flex;
  gap: 0.375rem;
  padding: 0.125rem 0;
  transition: color 0.15s;

  &:hover {
    color: $color-base;
  }

  &__icon {
    height: 1rem;
    width: 1rem;
  }

  &__text {
    font-feature-settings: 'lnum' 1, 'pnum' 1;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
  }
}

.left-column {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.right-column {
  flex-shrink: 0;
  width: 22.5rem;
}

.card {
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 1.5rem;
  }
}

.section-title {
  color: $color-base;
  font-size: 1.625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.75rem;
}

.items-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 0.75rem;

  &__left {
    align-items: center;
    display: flex;
    gap: 0.625rem;
  }

  &__count {
    color: $color-base;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
  }

  &__delete {
    align-items: center;
    color: $color-base-secondary;
    cursor: pointer;
    display: flex;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
    font-size: 1rem;
    font-weight: 600;
    gap: 0.625rem;
    line-height: 1.5rem;
    transition: color 0.15s;

    &:hover {
      color: #e12e3c;
    }
  }

  &__delete-icon {
    height: 1rem;
    width: 1rem;
  }
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

@media (max-width: 960px) {
  .cart-page__content {
    flex-direction: column;
  }

  .right-column {
    width: 100%;
  }
}

@media (max-width: 720px) {
  .cart-page {
    padding-top: 1.875rem;
  }

  .cart-page__container {
    width: calc(100% - 24px);
  }

  .cart-page__title {
    font-size: 1.75rem;
    line-height: 2.25rem;
  }

  .auth-prompt__text {
    br {
      display: none;
    }
  }
}
</style>

<script setup>
const isOpen = defineModel({ required: true })

const imageModules = import.meta.glob('~/assets/images/*.png', { eager: true, import: 'default' })

function getImage(filename) {
  const key = Object.keys(imageModules).find(k => k.endsWith(`/${filename}`))
  return key ? imageModules[key] : ''
}

// Mock cart items
const cartItems = ref([
  {
    id: 1,
    name: 'Флаг из флажной сетки',
    description: 'Флажная сетка, под древко, 90×135 см, бахрома, печать с двух сторон, услуги дизайнера',
    image: getImage('mesh_sleeve_90x135_double_fringe.png'),
    quantity: 2,
    unitPrice: 2400,
    selected: false
  },
  {
    id: 2,
    name: 'Флаг из флажной сетки',
    description: 'Флажная сетка, под древко, 90×135 см, бахрома, печать с двух сторон, услуги дизайнера',
    image: getImage('mesh_sleeve_90x135_double.png'),
    quantity: 2,
    unitPrice: 2400,
    selected: false
  },
  {
    id: 3,
    name: 'Флаг из флажной сетки',
    description: 'Флажная сетка, под древко, 90×135 см, бахрома, печать с двух сторон, услуги дизайнера',
    image: getImage('mesh_grommets_90x135_double_fringe.png'),
    quantity: 2,
    unitPrice: 2400,
    selected: false
  }
])

// Recipient form
const recipientName = ref('')
const recipientPhone = ref('')
const recipientEmail = ref('')
const anotherPerson = ref(false)
const anotherName = ref('')
const anotherPhone = ref('')

// Promo code
const promoCode = ref('')

// Computed
const totalItems = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0))
const totalPrice = computed(() => cartItems.value.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0))

function formatPrice(value) {
  return value.toLocaleString('ru-RU')
}

function incrementQuantity(item) {
  item.quantity = item.quantity + 1
}

function decrementQuantity(item) {
  if (item.quantity > 1) {
    item.quantity = item.quantity - 1
  }
}
</script>

<template>
  <BaseModal v-model="isOpen" title="Корзина" max-width="70rem">
    <template #header-left>
      <button class="back-link" @click="isOpen = false">
        <svg class="back-link__icon" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <span class="back-link__text">Продолжить покупки</span>
      </button>
    </template>

    <div class="modal-content">
          <!-- Left Column -->
          <div class="left-column">
            <!-- Products Section -->
            <div class="card card--top">
              <div class="card__inner">
                <p class="section-title">Товары</p>
                <div class="items-list">
                  <div
                    v-for="item in cartItems"
                    :key="item.id"
                    class="item-row"
                  >
                    <AppCheckbox v-model="item.selected" />
                    <div class="item-row__product">
                      <div class="item-row__image-wrap">
                        <img :src="item.image" :alt="item.name" class="item-row__image">
                      </div>
                      <div class="item-row__details">
                        <div class="item-row__top">
                          <div class="item-row__info">
                            <p class="item-row__name">{{ item.name }}</p>
                            <p class="item-row__desc">{{ item.description }}</p>
                          </div>
                          <div class="item-row__actions">
                            <button class="item-action" title="Редактировать">
                              <!-- Edit / Writing 4 icon (from Figma) -->
                              <svg class="item-action__icon" viewBox="0 0 24.2635 24.2635" fill="none">
                                <rect width="24.2635" height="24.2635" rx="6" fill="#F9EBFF" />
                                <path d="M14.6058 6.12135L14.9594 5.76779C15.9356 4.79152 17.5186 4.79159 18.4949 5.76779C19.4712 6.7441 19.4712 8.32701 18.4949 9.30333L18.1413 9.65688L14.6058 6.12135ZM5.76835 18.4957C5.54747 18.2748 5.45159 17.9582 5.51285 17.6519L6.00313 15.2005C6.08056 14.8133 6.27086 14.4577 6.55003 14.1785L13.193 7.53556L16.7285 11.0711L10.0856 17.714C9.80637 17.9932 9.45073 18.1835 9.06357 18.2609L6.61218 18.7512C6.30588 18.8125 5.98922 18.7166 5.76835 18.4957Z" fill="#DE7AFF" />
                              </svg>
                            </button>
                            <button class="item-action item-action--delete" title="Удалить">
                              <!-- Trash Bin icon (from Figma) -->
                              <svg class="item-action__icon item-action__icon--sm" viewBox="0 0 16 16" fill="none">
                                <path d="M2 7H14L13.4744 11.7301C13.3067 13.24 13.2228 13.995 12.8745 14.5647C12.5677 15.0666 12.1201 15.4672 11.5874 15.7168C10.9826 16 10.223 16 8.70379 16H7.29621C5.77697 16 5.01735 16 4.41263 15.7168C3.87993 15.4672 3.43233 15.0666 3.12552 14.5647C2.77722 13.995 2.69333 13.24 2.52556 11.7301L2 7Z" fill="#DE7AFF" />
                                <path d="M1 3.5C1 2.67157 1.67157 2 2.5 2C3.32843 2 3.97177 1.24281 4.53657 0.636766C4.90168 0.244995 5.42223 0 6 0H10C10.5778 0 11.0983 0.244995 11.4634 0.636766C12.0282 1.24281 12.6716 2 13.5 2C14.3284 2 15 2.67157 15 3.5C15 4.32843 14.3284 5 13.5 5H2.5C1.67157 5 1 4.32843 1 3.5Z" fill="#DE7AFF" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div class="item-row__bottom">
                          <div class="quantity-control">
                            <button class="quantity-control__btn" @click="decrementQuantity(item)">
                              <!-- Minus icon (from Figma) -->
                              <svg class="quantity-control__icon" viewBox="0 0 16 16" fill="none"><path d="M13.8225 7.95007L1.82251 7.95007" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
                            </button>
                            <div class="quantity-control__value">
                              <span>{{ item.quantity }}</span>
                              <span class="quantity-control__unit">шт</span>
                            </div>
                            <button class="quantity-control__btn" @click="incrementQuantity(item)">
                              <!-- Plus icon (from Figma) -->
                              <svg class="quantity-control__icon" viewBox="0 0 16 16" fill="none"><path d="M7.82251 1.95007V13.9501M13.8225 7.95007L1.82251 7.95007" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
                            </button>
                          </div>
                          <div class="item-row__price">
                            <p class="item-row__total">{{ formatPrice(item.unitPrice * item.quantity) }} ₽</p>
                            <p class="item-row__unit-price">{{ formatPrice(item.unitPrice) }} ₽ / шт</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recipient Section -->
            <div class="card card--mid">
              <div class="card__inner">
                <div class="recipient-header">
                  <p class="section-title">Данные получателя</p>
                  <div class="recipient-links">
                    <a href="#" class="ext-link ext-link--muted">
                      Добавить организацию
                      <!-- External link icon muted (from Figma) -->
                      <svg class="ext-link__icon" viewBox="0 0 12 12" fill="none"><path d="M2.619 6.261a.804.804 0 0 1-1.17 0 .805.805 0 0 1-.001-.826L5.526 1.698H2.95a.569.569 0 0 1-.568-.572c.002-.312.256-.564.568-.564h4.288c.138 0 .25.112.25.25v4.285a.571.571 0 0 1-1.142 0l.007-2.572L2.619 6.26Z" fill="currentColor" /></svg>
                    </a>
                    <a href="#" class="ext-link ext-link--muted">
                      Добавить получателя
                      <svg class="ext-link__icon" viewBox="0 0 12 12" fill="none"><path d="M2.619 6.261a.804.804 0 0 1-1.17 0 .805.805 0 0 1-.001-.826L5.526 1.698H2.95a.569.569 0 0 1-.568-.572c.002-.312.256-.564.568-.564h4.288c.138 0 .25.112.25.25v4.285a.571.571 0 0 1-1.142 0l.007-2.572L2.619 6.26Z" fill="currentColor" /></svg>
                    </a>
                  </div>
                </div>

                <div class="form-fields">
                  <div class="field-row">
                    <label class="field-label">Имя</label>
                    <AppInput v-model="recipientName" placeholder="Иван" />
                  </div>
                  <div class="field-row">
                    <label class="field-label">Номер телефона</label>
                    <AppInput v-model="recipientPhone" mask="+7(###)-###-##-##" placeholder="+7(___)-___-__-__" />
                  </div>
                  <div class="field-row">
                    <label class="field-label">Электропочта</label>
                    <AppInput v-model="recipientEmail" placeholder="mail@example.com" />
                  </div>
                </div>

                <AppSwitch v-model="anotherPerson" label="Заберёт другой человек" />

                <div v-if="anotherPerson" class="form-fields">
                  <div class="field-row">
                    <label class="field-label">Имя</label>
                    <AppInput v-model="anotherName" placeholder="Иван" />
                  </div>
                  <div class="field-row">
                    <label class="field-label">Номер телефона</label>
                    <AppInput v-model="anotherPhone" mask="+7(###)-###-##-##" placeholder="+7(___)-___-__-__" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Pickup Section -->
            <div class="card card--bottom">
              <div class="card__inner">
                <div class="pickup-header">
                  <p class="section-title">Откуда забрать заказ</p>
                  <div class="pickup-address">
                    <a
                      href="https://yandex.ru/maps/-/CHEbFD2T"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="ext-link"
                    >
                      ДНР, Донецк, ул. Постышева, дом 60
                      <!-- External link icon purple (from Figma) -->
                      <svg class="ext-link__icon" viewBox="0 0 12 12" fill="none"><path d="M2.619 6.261a.804.804 0 0 1-1.17 0 .805.805 0 0 1-.001-.826L5.526 1.698H2.95a.569.569 0 0 1-.568-.572c.002-.312.256-.564.568-.564h4.288c.138 0 .25.112.25.25v4.285a.571.571 0 0 1-1.142 0l.007-2.572L2.619 6.26Z" fill="currentColor" /></svg>
                    </a>
                    <p class="pickup-schedule">Пн–Пт 9:00–18:00, Сб 10:00–15:00</p>
                  </div>
                </div>

                <div class="map-container">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=37.802556%2C48.002076&z=12&pt=37.802556%2C48.002076%2Cpm2rdm"
                    class="map-iframe"
                    allowfullscreen
                  />
                </div>

                <p class="pickup-note">
                  Для онлайн заказов доступна только доставка самовывозом. Мы работаем над тем чтобы организовать курьерскую доставку.
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column (Sidebar) -->
          <div class="right-column">
            <div class="sidebar-sticky">
              <!-- Summary Card -->
              <div class="summary-card">
                <p class="section-title">Товары</p>

                <div class="summary-rows">
                  <div class="summary-row">
                    <span class="summary-row__label">Товары ({{ totalItems }} шт)</span>
                    <span class="summary-row__value">{{ formatPrice(totalPrice) }} ₽</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-row__label">Доставка</span>
                    <span class="summary-row__value">Самовывоз</span>
                  </div>
                </div>

                <div class="summary-divider" />

                <div class="summary-total">
                  <span class="summary-total__label">К оплате</span>
                  <span class="summary-total__value">{{ formatPrice(totalPrice) }} ₽</span>
                </div>

                <!-- Promo Code -->
                <div class="promo-section">
                  <label class="promo-label">Промокод</label>
                  <div class="promo-row">
                    <AppInput v-model="promoCode" placeholder="Введите промокод" />
                    <button class="promo-btn">Применить</button>
                  </div>
                </div>

                <!-- Pay Button -->
                <button class="pay-btn">
                  Оплатить заказ
                </button>

                <!-- Trust Badges -->
                <div class="trust-badges">
                  <div class="trust-badge">
                    <!-- Shield / circle icon (from Figma) -->
                    <svg class="trust-badge__icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" fill="currentColor" fill-opacity="0.64" /></svg>
                    <span class="trust-badge__text">Безопасная оплата</span>
                  </div>
                  <div class="trust-badge">
                    <svg class="trust-badge__icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" fill="currentColor" fill-opacity="0.64" /></svg>
                    <span class="trust-badge__text">Оплата СБП или по счёту</span>
                  </div>
                  <div class="trust-badge">
                    <svg class="trust-badge__icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" fill="currentColor" fill-opacity="0.64" /></svg>
                    <span class="trust-badge__text">Самовывоз из Донецка</span>
                  </div>
                </div>
              </div>

              <!-- Help Card -->
              <div class="help-card">
                <div class="help-card__info">
                  <div class="help-card__avatar" />
                  <div class="help-card__text">
                    <p class="help-card__title">Нужна помощь?</p>
                    <p class="help-card__subtitle">Позвоните в поддержку.</p>
                  </div>
                </div>
                <a href="tel:+78001234567" class="help-card__call-btn">
                  <!-- Phone icon (from Figma) -->
                  <svg class="help-card__call-icon" viewBox="0 0 23 9" fill="none"><path d="M18.187 0H19.5458C19.9537 0 20.1577 0 20.3219 0.0181341C21.8931 0.191675 23.06 1.55458 22.9896 3.13374C22.9822 3.29873 22.9508 3.50026 22.888 3.90328L22.888 3.90341C22.8643 4.0556 22.9236 3.67511 22.8733 3.89107C22.5263 5.3836 20.4307 7.7069 18.9818 8.20556C18.7721 8.27771 19.9455 7.96861 19.4761 8.09225C17.7018 8.55968 15.0794 9 11.4963 9C7.91323 9 5.29085 8.55968 3.51648 8.09225C3.04715 7.96861 4.22048 8.27771 4.01084 8.20556C2.56189 7.7069 0.466323 5.3836 0.119262 3.89107C0.069047 3.67512 0.128344 4.0556 0.104625 3.90341C0.0418033 3.5003 0.0103925 3.29875 0.00302911 3.13374C-0.0674374 1.55458 1.09952 0.191675 2.67069 0.0181341C2.83487 0 3.03886 0 3.44683 0H4.80565C6.05418 0 7.15861 0.809421 7.53458 2C7.91055 3.19058 9.01498 4 10.2635 4H12.7291C13.9776 4 15.0821 3.19058 15.458 2C15.834 0.809421 16.9384 0 18.187 0Z" fill="currentColor" /></svg>
                </a>
              </div>
            </div>
          </div>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-base-secondary: rgba($color-base, 0.64);
$color-base-tertiary: rgba($color-base, 0.38);
$color-base-disabled: rgba($color-base, 0.24);
$color-primary: #c925ff;
$color-primary-bg: #f9ebff;
$color-input-bg: #f4f5f6;
$color-item-bg: #fcfcfc;
$radius-outer: 2.25rem;
$radius-main: 2rem;
$radius-card: 1rem;
$radius-control: 0.75rem;

.back-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.125rem 0;
  color: rgba($color-base, 0.5);
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: $color-base;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
  }

  &__text {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }
}

// ── Content layout ──
.modal-content {
  display: flex;
  gap: 0.375rem;
  margin-top: 1.5rem;
}

.left-column {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.right-column {
  width: 22.5rem;
  flex-shrink: 0;
}

.sidebar-sticky {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

// ── Cards ──
.card {
  background: white;

  &--top {
    border-radius: $radius-main $radius-main $radius-card $radius-card;
  }

  &--mid {
    border-radius: $radius-card;
  }

  &--bottom {
    border-radius: $radius-card $radius-card $radius-main $radius-main;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 1.5rem;
  }
}

.section-title {
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: $color-base;
}

// ── Items list ──
.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  background: $color-item-bg;
  border-radius: $radius-card;
  padding: 1rem 1.5rem 1rem 0.75rem;

  &__product {
    flex: 1;
    display: flex;
    gap: 1.5rem;
    min-width: 0;
  }

  &__image-wrap {
    width: 8rem;
    aspect-ratio: 1;
    flex-shrink: 0;
    border-radius: 0.875rem;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__details {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    min-width: 0;
  }

  &__name {
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.5rem;
    letter-spacing: -0.01em;
    color: $color-base;
  }

  &__desc {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: $color-base-secondary;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
    padding-right: 3rem;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-shrink: 0;
  }

  &__bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__total {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.75rem;
    letter-spacing: -0.02em;
    color: $color-base;
  }

  &__unit-price {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: $color-base-tertiary;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }
}

.item-action {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.7;
  }

  &--delete {
    background: $color-primary-bg;
    border-radius: 0.375rem;
    padding: 0.25rem;
  }

  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    display: block;

    &--sm {
      width: 1rem;
      height: 1rem;
    }
  }
}

// ── Quantity control ──
.quantity-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 9.6875rem;
  height: 2.5rem;
  background: $color-input-bg;
  border-radius: $radius-control;
  padding: 0 0.875rem;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #81888d;
    transition: color 0.15s;

    &:hover {
      color: $color-base;
    }
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    display: block;
  }

  &__value {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.2;
    color: $color-base;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__unit {
    color: $color-base;
  }
}

// ── Recipient section ──
.recipient-header {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.recipient-links {
  display: flex;
  gap: 0.625rem;
}

.ext-link {
  display: flex;
  align-items: flex-start;
  gap: 0.125rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: -0.01em;
  color: $color-primary;
  padding-left: 0.125rem;

  &--muted {
    color: $color-base-disabled;
  }

  &__icon {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 27.6875rem;
}

.field-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
  align-items: center;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: $color-base;
  padding: 0 0.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

// ── Pickup section ──
.pickup-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pickup-address {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.pickup-schedule {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: -0.01em;
  color: $color-base-secondary;
}

.map-container {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: $radius-card;
  overflow: hidden;
}

.map-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.pickup-note {
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  color: $color-base-secondary;
  opacity: 0.8;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

// ── Summary card ──
.summary-card {
  background: white;
  border-radius: $radius-main;
  padding: 3rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: -0.01em;

  &__label {
    color: $color-base-secondary;
  }

  &__value {
    color: $color-base;
  }
}

.summary-divider {
  height: 1px;
  background: rgba($color-base, 0.08);
}

.summary-total {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  &__label {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    letter-spacing: -0.01em;
    color: $color-base-secondary;
  }

  &__value {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.75rem;
    letter-spacing: -0.02em;
    color: $color-base;
  }
}

// ── Promo code ──
.promo-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.promo-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: $color-base;
  padding: 0.65625rem 0.125rem 0;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.promo-row {
  display: flex;
  gap: 0.25rem;

  :deep(.app-input-wrapper) {
    flex: 1;
    min-width: 0;
  }
}

.promo-btn {
  flex-shrink: 0;
  height: 2.5rem;
  padding: 0 1.125rem;
  background: $color-primary-bg;
  border-radius: $radius-control;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: $color-primary;
  cursor: pointer;
  transition: background-color 0.15s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:hover {
    background: rgba($color-primary, 0.15);
  }
}

// ── Pay button ──
.pay-btn {
  width: 100%;
  height: 3.25rem;
  background: $color-primary;
  border-radius: $radius-control;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &:hover {
    background: #e38fff;
  }

  &:active {
    background: #c000ff;
  }
}

// ── Trust badges ──
.trust-badges {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.trust-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &__icon {
    width: 1rem;
    height: 1rem;
    color: #d8d8d8;
    flex-shrink: 0;
  }

  &__text {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: $color-base-secondary;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }
}

// ── Help card ──
.help-card {
  background: white;
  border-radius: $radius-main;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__avatar {
    width: 2.5rem;
    height: 2.5rem;
    background: #d8d8d8;
    flex-shrink: 0;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__title {
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.5rem;
    letter-spacing: -0.01em;
    color: $color-base;
  }

  &__subtitle {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.125rem;
    color: rgba($color-base, 0.45);
  }

  &__call-btn {
    width: 2.5rem;
    height: 2.5rem;
    background: $color-primary-bg;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: $color-primary;
    transition: background-color 0.15s;

    &:hover {
      background: rgba($color-primary, 0.15);
    }
  }

  &__call-icon {
    width: 1.25rem;
    height: 0.5rem;
    transform: rotate(45deg);
  }
}
</style>

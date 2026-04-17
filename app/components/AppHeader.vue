<script setup>
import headerLogoBg1 from '~/assets/icons/header-logo-bg-1.svg'
import headerLogoBg2 from '~/assets/icons/header-logo-bg-2.svg'
import headerLogoBg3 from '~/assets/icons/header-logo-bg-3.svg'
import headerLogoBg4 from '~/assets/icons/header-logo-bg-4.svg'
import headerLogoText from '~/assets/icons/header-logo-text.svg'

const navLinks = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'О нас', to: '' },
  { label: 'Примеры работ', to: '' },
  { label: 'Оплата', to: '/payment' },
  { label: 'Доставка', to: '/delivery' }
]

const actionItems = [
  {
    key: 'favorites',
    label: 'Избранное',
    icon: 'favorite',
    iconClass: 'header-action__icon_favorite',
    counter: '99+',
    kind: 'favorite'
  },
  {
    key: 'orders',
    label: 'Заказы',
    icon: 'orders',
    iconClass: 'header-action__icon_orders',
    counter: '99+',
    kind: 'secondary'
  },
  {
    key: 'cart',
    label: 'Корзина',
    icon: 'cart',
    iconClass: 'header-action__icon_cart',
    counter: '99+',
    kind: 'secondary'
  },
  {
    key: 'account',
    label: 'Войти',
    icon: 'account',
    iconClass: 'header-action__icon_account',
    counter: '',
    kind: 'secondary'
  }
]

</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__inner">
        <NuxtLink
          to="/"
          class="header__logo"
          aria-label="Индиго"
        >
          <div class="header__logo-cloud">
            <img
              :src="headerLogoBg1"
              alt=""
              class="header__logo-bg1"
            >
            <img
              :src="headerLogoBg2"
              alt=""
              class="header__logo-bg2"
            >
            <img
              :src="headerLogoBg3"
              alt=""
              class="header__logo-bg3"
            >
            <img
              :src="headerLogoBg4"
              alt=""
              class="header__logo-bg4"
            >
          </div>
          <img
            :src="headerLogoText"
            alt="Индиго"
            class="header__logo-text"
          >
        </NuxtLink>

        <nav
          class="header__nav"
          aria-label="Основная навигация"
        >
          <template
            v-for="item in navLinks"
            :key="item.label"
          >
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              class="header__nav-link"
            >
              {{ item.label }}
            </NuxtLink>
            <a
              v-else
              href="#"
              class="header__nav-link"
              aria-disabled="true"
              @click.prevent
            >
              {{ item.label }}
            </a>
          </template>
        </nav>

        <div class="header__actions">
          <button
            v-for="item in actionItems"
            :key="item.key"
            type="button"
            class="header-action"
            :class="`header-action--${item.kind}`"
          >
            <span class="header-action__icon-wrap">
              <AppIcon
                :name="item.icon"
                class="header-action__icon"
                :class="item.iconClass"
              />
              <span
                v-if="item.counter"
                class="header-action__counter"
              >
                {{ item.counter }}
              </span>
            </span>
            <span class="header-action__label">{{ item.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding-top: 1rem;
}

.header__container {
  margin: 0 auto;
  max-width: 1106px;
  width: calc(100% - 32px);
}

.header__inner {
  align-items: center;
  background: #fff;
  border-radius: 2rem;
  display: flex;
  height: 64px;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 1.5rem 0 2rem;
  position: relative;
}

.header__logo {
  display: block;
  flex-shrink: 0;
  height: 48px;
  position: relative;
  width: 130px;
}

.header__logo-cloud {
  height: 191px;
  left: -4.8125rem;
  pointer-events: none;
  position: absolute;
  top: -5.125rem;
  width: 264px;
}

.header__logo-cloud img {
  display: block;
  position: absolute;
}

.header__logo-bg1 {
  height: 164px;
  left: 0;
  top: 0;
  width: 199px;
}

.header__logo-bg2 {
  height: 145px;
  left: 3.8125rem;
  top: 2.125rem;
  transform: rotate(43.7deg);
  width: 163px;
}

.header__logo-bg3 {
  height: 122px;
  left: 0.875rem;
  top: 3.8125rem;
  width: 116px;
}

.header__logo-bg4 {
  height: 100px;
  left: 9.375rem;
  top: 4.8125rem;
  transform: rotate(22.2deg);
  width: 100px;
}

.header__logo-text {
  display: block;
  height: 44px;
  left: 0.0625rem;
  position: absolute;
  top: 0;
  width: 117px;
}

.header__nav {
  align-items: center;
  border-radius: 2rem;
  display: flex;
  gap: 0.875rem;
  padding: 0 2rem;
}

.header__nav-link {
  color: rgba(4, 18, 27, 0.64);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.375rem;
  text-decoration: none;
  transition: color 0.15s;
}

.header__nav-link:hover {
  color: #04121b;
}

.header__nav-link:active {
  color: rgba(4, 18, 27, 0.72);
}

.header__actions {
  align-items: center;
  column-gap: 0.5rem;
  display: flex;
  flex-shrink: 0;
}

.header-action {
  align-items: center;
  background: transparent;
  border-radius: 0.625rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 0.25rem 0.25rem 0.125rem;
}

.header-action__icon-wrap {
  border-radius: 0.5rem;
  display: flex;
  height: 24px;
  justify-content: center;
  position: relative;
  width: 24px;
}

.header-action--secondary .header-action__icon-wrap {
  background: #f9ebff;
  color: #de7aff;
  transition: background-color 0.15s, color 0.15s;
}

.header-action--secondary:hover .header-action__icon-wrap {
  background: #f6e0ff;
}

.header-action--secondary:active .header-action__icon-wrap {
  background: #f2d6ff;
  color: #c925ff;
}

.header-action--favorite .header-action__icon-wrap {
  background: rgba(255, 235, 245, 0.5);
  color: #ff6bbf;
  transition: background-color 0.15s;
}

.header-action--favorite:hover .header-action__icon-wrap {
  background: rgba(255, 224, 240, 0.5);
}

.header-action--favorite:active .header-action__icon-wrap {
  background: rgba(255, 214, 235, 0.6);
}

.header-action__icon {
  display: block;
}

.header-action__icon_favorite {
  height: 14px;
  margin-top: 0.3125rem;
  width: 16px;
}

.header-action__icon_orders {
  height: 13px;
  margin-top: 0.3125rem;
  width: 15px;
}

.header-action__icon_cart {
  height: 13px;
  margin-top: 0.3125rem;
  width: 16px;
}

.header-action__icon_account {
  height: 16px;
  margin-top: 0.25rem;
  width: 16px;
}

.header-action__counter {
  align-items: center;
  border: 1px solid #fff;
  border-radius: 0.5rem;
  color: #fff;
  display: inline-flex;
  font-size: 0.5rem;
  font-weight: 600;
  height: 12px;
  justify-content: center;
  line-height: 1rem;
  min-width: 23px;
  padding: 0 0.25rem;
  position: absolute;
  right: -0.25rem;
  top: -0.25rem;
}

.header-action--secondary .header-action__counter {
  background: #de7aff;
  transition: background-color 0.15s;
}

.header-action--secondary:hover .header-action__counter {
  background: #e38fff;
}

.header-action--secondary:active .header-action__counter {
  background: #c925ff;
}

.header-action--favorite .header-action__counter {
  background: #ff6bbf;
}

.header-action__label {
  color: #04121b;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
}

.header__nav-link:focus-visible,
.header-action:focus-visible,
.header__logo:focus-visible {
  outline: 2px solid rgba(201, 37, 255, 0.45);
  outline-offset: 0.125rem;
}

@media (max-width: 1120px) {
  .header__inner {
    padding: 0 1.25rem;
  }

  .header__nav {
    padding: 0 0.75rem;
  }
}

@media (max-width: 960px) {
  .header__nav {
    display: none;
  }
}

@media (max-width: 720px) {
  .header {
    padding-top: 0.75rem;
  }

  .header__container {
    width: calc(100% - 24px);
  }

  .header__inner {
    border-radius: 1.5rem;
    height: 60px;
    padding: 0 0.875rem;
  }

  .header__logo {
    width: 112px;
  }

  .header__logo-cloud {
    left: -5.5rem;
    top: -5.5rem;
    transform: scale(0.86);
    transform-origin: top left;
  }

  .header__logo-text {
    top: 0.125rem;
    width: 102px;
  }

  .header-action {
    padding-left: 0.125rem;
    padding-right: 0.125rem;
  }

  .header-action__label {
    display: none;
  }
}
</style>

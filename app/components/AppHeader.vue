<script setup>
import headerLogoBg1 from '~/assets/icons/header-logo-bg-1.svg'
import headerLogoBg2 from '~/assets/icons/header-logo-bg-2.svg'
import headerLogoBg3 from '~/assets/icons/header-logo-bg-3.svg'
import headerLogoBg4 from '~/assets/icons/header-logo-bg-4.svg'
import headerLogoText from '~/assets/icons/header-logo-text.svg'
import { authClient } from '~/utils/auth-client.js'

const navLinks = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'О нас', to: '', hidden: true },
  { label: 'Примеры работ', to: '', hidden: true },
  { label: 'Оплата', to: '/payment' },
  { label: 'Доставка', to: '/delivery' }
]

const visibleNavLinks = computed(() => navLinks.filter(item => !item.hidden))

const session = authClient.useSession()

const isSessionPending = computed(() => session.value?.isPending ?? true)
const sessionUser = computed(() => session.value?.data?.user ?? null)
const accountLabel = computed(() => {
  if (!sessionUser.value) {
    return 'Войти'
  }

  return sessionUser.value.name
})
const { totalItems: cartTotalItems } = useCart()
const { totalItems: favoriteTotalItems } = useFavorites()
const profileStore = useProfileStore()

const baseActionItems = computed(() => [
  {
    key: 'favorites',
    label: 'Избранное',
    icon: 'favorite',
    iconClass: 'header-action__icon_favorite',
    counter: favoriteTotalItems.value,
    kind: 'favorite'
  },
  {
    key: 'orders',
    label: 'Заказы',
    icon: 'orders',
    iconClass: 'header-action__icon_orders',
    counter: 0,
    kind: 'secondary'
  },
  {
    key: 'cart',
    label: 'Корзина',
    icon: 'cart',
    iconClass: 'header-action__icon_cart',
    counter: cartTotalItems.value,
    kind: 'secondary'
  }
])

const accountAction = computed(() => ({
  key: 'account',
  label: accountLabel.value,
  icon: 'account',
  iconClass: 'header-action__icon_account',
  counter: '',
  kind: 'secondary',
  isAuthenticated: Boolean(sessionUser.value)
}))

const actionItems = computed(() => [
  ...baseActionItems.value,
  ...(!sessionUser.value && !isSessionPending.value ? [accountAction.value] : [])
])

const isAuthEntryOpen = ref(false)
const isSignOutPending = ref(false)

function onActionClick(item) {
  if (item.key === 'cart') {
    navigateTo('/cart')
    return
  }

  if (item.key === 'favorites') {
    navigateTo('/profile?tab=favorites')
    return
  }

  if (item.key === 'orders') {
    navigateTo('/profile?tab=orders')
    return
  }

  if (item.key === 'account' && !item.isAuthenticated) {
    isAuthEntryOpen.value = true
  }
}

async function refreshSession() {
  await session.value?.refetch?.()

  if (session.value?.data?.user) {
    profileStore.fetchProfileOnce().catch(() => {})
  }
}

async function signOut() {
  if (isSignOutPending.value) {
    return
  }

  isSignOutPending.value = true

  try {
    await authClient.signOut()
    profileStore.clearProfile()
    await session.value?.refetch?.()
    await navigateTo('/')
  } catch (error) {
    console.error('Sign out failed:', error)
  } finally {
    isSignOutPending.value = false
  }
}
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
            v-for="item in visibleNavLinks"
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
            @click="onActionClick(item)"
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

          <div
            v-if="sessionUser"
            class="header-account-authorized"
          >
            <div class="header-account-authorized__top">
              <span class="header-account-authorized__icon-wrap">
                <AppIcon
                  name="header-account-authorized"
                  class="header-account-authorized__icon"
                />
              </span>

              <button
                type="button"
                class="header-account-authorized__sign-out"
                :disabled="isSignOutPending"
                :aria-label="isSignOutPending ? 'Выходим' : 'Выйти'"
                @click="signOut"
              >
                <AppIcon
                  name="header-sign-out-authorized"
                  class="header-account-authorized__sign-out-icon"
                />
              </button>
            </div>

            <NuxtLink
              to="/profile"
              class="header-account-authorized__label"
            >
              {{ accountLabel }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <AuthEntryModal
      v-model="isAuthEntryOpen"
      @complete-login="refreshSession"
      @complete-registration="refreshSession"
    />
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
  gap: 2rem;
  height: 64px;
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
  margin-left: 4rem;
  padding: 0;
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
  margin-left: auto;
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
  max-width: 6.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.header-account-authorized {
  align-items: stretch;
  background: rgba(227, 143, 255, 0.1);
  border-radius: 0.5rem;
  display: flex;
  flex: 0 0 5.75rem;
  flex-direction: column;
  gap: 0.125rem;
  height: 2.875rem;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0.125rem 0.25rem 0;
  width: 5.75rem;
}

.header-account-authorized__top {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.header-account-authorized__icon-wrap {
  align-items: center;
  background: #de7aff;
  border-radius: 0.5rem;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  padding: 0.25rem;
  width: 1.5rem;
}

.header-account-authorized__icon {
  display: block;
  height: 1rem;
  width: 1rem;
}

.header-account-authorized__sign-out {
  align-items: center;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  height: 1.25rem;
  justify-content: center;
  padding: 0;
  transition: background-color 0.15s, opacity 0.15s;
  width: 1.25rem;
}

.header-account-authorized__sign-out:hover:not(:disabled) {
  background: rgba(222, 122, 255, 0.12);
}

.header-account-authorized__sign-out:disabled {
  cursor: wait;
  opacity: 0.54;
}

.header-account-authorized__sign-out-icon {
  display: block;
  height: 0.672rem;
  width: 0.656rem;
}

.header-account-authorized__label {
  color: #de7aff;
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.header__nav-link:focus-visible,
.header-action:focus-visible,
.header-account-authorized__sign-out:focus-visible,
.header__logo:focus-visible {
  outline: 2px solid rgba(201, 37, 255, 0.45);
  outline-offset: 0.125rem;
}

@media (max-width: 1120px) {
  .header__inner {
    gap: 1rem;
    padding: 0 1.25rem;
  }

  .header__nav {
    margin-left: 1.5rem;
    padding: 0;
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

  .header-account-authorized {
    flex-basis: 2rem;
    height: 1.75rem;
    padding-bottom: 0.125rem;
    width: 2rem;
  }

  .header-account-authorized__top {
    justify-content: center;
  }

  .header-account-authorized__sign-out,
  .header-account-authorized__label {
    display: none;
  }
}
</style>

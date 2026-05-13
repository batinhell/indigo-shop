<script setup>
import { authClient } from '~/utils/auth-client.js'

const props = defineProps({
  activeItem: {
    type: String,
    default: 'data'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['navigate'])
const { totalItems: favoriteTotalItems } = useFavorites()
const profileStore = useProfileStore()

const navItems = computed(() => [
  {
    key: 'data',
    label: 'Данные',
    badge: props.isEmailVerified ? '' : 'Подтвердите почту',
    badgeType: 'warning'
  },
  {
    key: 'favorites',
    label: 'Избранное',
    badge: favoriteTotalItems.value ? String(favoriteTotalItems.value) : 'Пока ничего :(',
    badgeType: favoriteTotalItems.value ? 'favorite-count' : 'empty'
  }
])

async function logout() {
  await authClient.signOut()
  profileStore.clearProfile()
  await navigateTo('/')
}
</script>

<template>
  <aside class="profile-sidebar">
    <nav class="profile-sidebar__nav">
      <button
        v-for="item in navItems"
        :key="item.key"
        type="button"
        class="profile-sidebar__link"
        :class="{ 'profile-sidebar__link--active': activeItem === item.key }"
        @click.prevent="emit('navigate', item.key)"
      >
        <span class="profile-sidebar__label">{{ item.label }}</span>
        <span
          v-if="item.badge"
          class="profile-sidebar__badge"
          :class="`profile-sidebar__badge--${item.badgeType}`"
        >
          {{ item.badge }}
        </span>
      </button>
    </nav>

    <button
      type="button"
      class="profile-sidebar__logout"
      @click="logout"
    >
      <span class="profile-sidebar__logout-label">Выйти</span>
      <AppIcon
        name="header-sign-out-authorized"
        class="profile-sidebar__logout-icon"
      />
    </button>
  </aside>
</template>

<style lang="scss" scoped>
.profile-sidebar {
  background: #ffffff;
  border-radius: 1rem;
  box-sizing: border-box;
  padding: 0.75rem;
  width: 17.5rem;

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    width: 100%;
    min-height: 2.5rem;
    padding: 0.625rem 0.875rem;
    border: 0;
    border-radius: 1rem;
    background: #ffffff;
    cursor: pointer;
    transition: background-color 0.15s;
    text-align: left;
    text-decoration: none;

    &:not(.profile-sidebar__link--active):hover {
      background: rgba(0, 0, 0, 0.02);
    }

    &:not(.profile-sidebar__link--active):active {
      background: rgba(0, 0, 0, 0.04);
    }

    &--active {
      background: #de7aff;

      .profile-sidebar__label {
        color: #ffffff;
      }

      .profile-sidebar__badge--positive {
        background: transparent;
        color: rgba(255, 255, 255, 0.8);
      }

      .profile-sidebar__badge--warning {
        background: transparent;
        color: rgba(255, 255, 255, 0.8);
      }

      .profile-sidebar__badge--empty {
        background: transparent;
        color: rgba(255, 255, 255, 0.8);
      }

      .profile-sidebar__badge--favorite-count {
        background: transparent;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  &__label {
    font-family: 'Manrope', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
    color: #04121b;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__badge {
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    min-height: 1.25rem;
    padding: 0.0625rem 0.5rem 0.1875rem;
    border-radius: 0.375rem;
    white-space: nowrap;
    flex-shrink: 0;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
    text-align: center;

    &--positive {
      background: #dbffde;
      color: #008a0b;
    }

    &--warning {
      background: #fff2e0;
      color: #a05900;
    }

    &--empty {
      background: #ffffff;
      color: rgba(4, 18, 27, 0.38);
    }

    &--favorite-count {
      align-items: center;
      background: rgba(255, 235, 245, 0.5);
      color: #ff6bbf;
      display: inline-flex;
      height: 1.25rem;
      justify-content: center;
      min-width: 1.25rem;
      min-height: 1.25rem;
      padding: 0 0.5rem;
      text-align: center;
    }
  }

  &__logout {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 2.5rem;
    margin-top: 0.5rem;
    padding: 0.625rem 0.875rem;
    border-radius: 1rem;
    background: #ffffff;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s;
    text-align: left;

    &:hover {
      background: #ffdbd7;
    }

    &:active {
      background: #ffc7c1;

      .profile-sidebar__logout-label {
        color: #e12e3c;
      }
    }
  }

  &__logout-label {
    font-family: 'Manrope', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
    color: #ed5c68;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__logout-icon {
    width: 0.65625rem;
    height: 0.671625rem;
    flex-shrink: 0;
    margin-right: 0.296875rem;
  }
}
</style>

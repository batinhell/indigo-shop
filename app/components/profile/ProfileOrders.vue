<script setup>
const filters = [
  { key: 'all', label: 'Все' },
  { key: 'review', label: 'На проверке' },
  { key: 'processing', label: 'В работе' },
  { key: 'ready', label: 'Готовые' },
  { key: 'finished', label: 'Завершенные' }
]

const activeFilter = ref('all')
const { addExistingItem } = useCart()
const { data, pending, error, refresh } = await useFetch('/api/profile/orders', {
  default: () => ({ orders: [] })
})

const orders = computed(() => data.value?.orders || [])
const filteredOrders = computed(() => {
  if (activeFilter.value === 'all') return orders.value

  return orders.value.filter(order => order.group === activeFilter.value)
})

function repeatOrder(order) {
  const cartItems = (order.items || [])
    .map(item => item.cartItem)
    .filter(Boolean)

  if (!cartItems.length) return

  cartItems.forEach(item => addExistingItem(item))
}
</script>

<template>
  <section class="profile-orders app-card">
    <div class="profile-orders__header">
      <h2 class="profile-orders__title">
        Заказы
      </h2>
      <button
        type="button"
        class="profile-orders__refresh"
        :disabled="pending"
        @click="refresh"
      >
        Обновить
      </button>
    </div>

    <div class="profile-orders__filters">
      <button
        v-for="filter in filters"
        :key="filter.key"
        type="button"
        class="profile-orders__filter"
        :class="{ 'profile-orders__filter--active': activeFilter === filter.key }"
        @click="activeFilter = filter.key"
      >
        {{ filter.label }}
      </button>
    </div>

    <p
      v-if="pending"
      class="profile-orders__state"
    >
      Загружаем заказы…
    </p>

    <p
      v-else-if="error"
      class="profile-orders__state profile-orders__state--error"
    >
      Не удалось загрузить заказы
    </p>

    <p
      v-else-if="filteredOrders.length === 0"
      class="profile-orders__state"
    >
      Заказов пока нет
    </p>

    <div
      v-else
      class="profile-orders__list"
    >
      <ProfileOrderItem
        v-for="order in filteredOrders"
        :key="order.id"
        :to="`/profile/orders/${order.id}`"
        :status="order.status"
        :status-label="order.statusLabel"
        :status-tone="order.statusTone"
        :number="order.publicNumber"
        :date="order.createdAtLabel"
        :delivery="order.deliveryLabel"
        :price="order.totalPriceLabel"
        :positions="order.positionsLabel"
        :items="order.items"
        @repeat="repeatOrder(order)"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.profile-orders {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  width: 100%;

  &__header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  &__title {
    color: $color-base;
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.75rem;
    margin: 0;
  }

  &__refresh {
    background: rgba(227, 143, 255, 0.1);
    border: 0;
    border-radius: 0.375rem;
    color: $color-purple;
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 700;
    height: 2rem;
    padding: 0 0.75rem;

    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  }

  &__filters {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  &__filter {
    align-items: center;
    background: rgba(255, 255, 255, 0.28);
    border-radius: 0.375rem;
    color: $color-base-secondary;
    cursor: pointer;
    display: inline-flex;
    font-size: 0.75rem;
    font-weight: 600;
    height: 2rem;
    justify-content: center;
    line-height: 1rem;
    padding: 0.375rem 0.75rem;
    white-space: nowrap;

    &--active {
      background: rgba(227, 143, 255, 0.1);
      color: $color-purple;
    }
  }

  &__state {
    color: rgba($color-base, 0.52);
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0;

    &--error {
      color: #ed5c68;
    }

  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 720px) {
  .profile-orders {
    padding: 1.5rem 1rem;
  }
}
</style>

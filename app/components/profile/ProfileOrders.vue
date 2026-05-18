<script setup>
const filters = ['Все', 'На проверке', 'В работе', 'Готовые', 'Завершенные']

const orderItems = [
  { name: 'Флаг флажная сетка', size: '90×135', quantity: '2 шт' },
  { name: 'Флаг флажная сетка', size: '90×135', quantity: '2 шт' },
  { name: 'Флаг флажная сетка', size: '90×135', quantity: '2 шт' },
  { name: 'Флаг флажная сетка', size: '90×135', quantity: '2 шт' }
]

const orders = [
  {
    id: '97194154-0050',
    status: 'done',
    number: '№2025-047',
    date: 'Создан 12 марта 2026',
    delivery: 'Самовывоз',
    price: '4 800 ₽',
    positions: '4 позиции',
    items: orderItems
  },
  {
    id: 'order-processing',
    status: 'processing',
    number: '№2025-047',
    date: 'Создан 12 марта 2026',
    delivery: 'Самовывоз',
    price: '4 800 ₽',
    positions: '4 позиции',
    items: orderItems
  }
]
</script>

<template>
  <section class="profile-orders app-card">
    <h2 class="profile-orders__title">
      Заказы
    </h2>

    <div class="profile-orders__filters">
      <button
        v-for="(filter, index) in filters"
        :key="filter"
        type="button"
        class="profile-orders__filter"
        :class="{ 'profile-orders__filter--active': index === 0 }"
      >
        {{ filter }}
      </button>
    </div>

    <div class="profile-orders__list">
      <ProfileOrderItem
        v-for="order in orders"
        :key="order.id"
        :to="`/profile/orders/${order.id}`"
        :status="order.status"
        :number="order.number"
        :date="order.date"
        :delivery="order.delivery"
        :price="order.price"
        :positions="order.positions"
        :items="order.items"
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

  &__title {
    color: $color-base;
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.75rem;
    margin: 0;
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
      color: #de7aff;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
}

@media (max-width: 720px) {
  .profile-orders {
    padding: 1.5rem 1rem;
  }
}
</style>

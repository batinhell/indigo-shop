<script setup>
defineProps({
  to: {
    type: String,
    default: '#'
  },
  status: {
    type: String,
    default: 'done'
  },
  number: {
    type: String,
    default: '№2025-047'
  },
  date: {
    type: String,
    default: 'Создан 12 марта 2026'
  },
  delivery: {
    type: String,
    default: 'Самовывоз'
  },
  price: {
    type: String,
    default: '4 800 ₽'
  },
  positions: {
    type: String,
    default: '4 позиции'
  },
  items: {
    type: Array,
    default: () => []
  }
})

const statusMap = {
  review: {
    label: 'На проверке',
    tone: 'secondary'
  },
  processing: {
    label: 'В работе',
    tone: 'purple'
  },
  done: {
    label: 'Готов',
    tone: 'positive'
  },
  finished: {
    label: 'Завершен',
    tone: 'positive'
  }
}
</script>

<template>
  <NuxtLink
    :to="to"
    class="profile-order-item app-card"
  >
    <div class="profile-order-item__top">
      <div class="profile-order-item__details">
        <div class="profile-order-item__title-row">
          <span
            class="profile-order-item__status"
            :class="`profile-order-item__status--${statusMap[status]?.tone || 'secondary'}`"
          >
            {{ statusMap[status]?.label || statusMap.review.label }}
          </span>
          <span class="profile-order-item__number">
            {{ number }}
          </span>
        </div>

        <div class="profile-order-item__meta">
          <span>{{ date }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ delivery }}</span>
        </div>
      </div>

      <div class="profile-order-item__actions">
        <span
          class="profile-order-item__button profile-order-item__button--secondary"
          role="button"
          tabindex="0"
        >
          Повторить
        </span>
        <span
          class="profile-order-item__button profile-order-item__button--primary"
        >
          Подробнее
        </span>
      </div>
    </div>

    <div class="profile-order-item__bottom">
      <div class="profile-order-item__items-wrap">
        <div class="profile-order-item__items">
          <div
            v-for="(item, index) in items"
            :key="`${item.name}-${index}`"
            class="profile-order-product"
          >
            <div class="profile-order-product__name">
              {{ item.name }}
            </div>
            <div class="profile-order-product__options">
              <span>{{ item.size }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ item.quantity }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-order-item__fade" />

      <div class="profile-order-item__price">
        <span class="profile-order-item__price-value">
          {{ price }}
        </span>
        <span class="profile-order-item__price-caption">
          {{ positions }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.profile-order-item {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.5rem 1rem 0.75rem;
  text-decoration: none;
  width: 100%;

  &:hover {
    box-shadow: 0 0 1.5rem rgba(201, 37, 255, 0.1);
  }

  &:active {
    box-shadow: inset 0 0 1.5rem rgba(4, 18, 27, 0.04);
  }

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding-left: 0.75rem;
  }

  &__details {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
  }

  &__title-row {
    display: flex;
    align-items: flex-start;
    gap: 0.375rem;
    min-width: 0;
  }

  &__status,
  &__number {
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    line-height: 1.5rem;
    white-space: nowrap;
  }

  &__status--secondary {
    color: $color-base-secondary;
  }

  &__status--purple {
    color: #de7aff;
  }

  &__status--positive {
    color: #0abd5d;
  }

  &__number {
    color: $color-base;
  }

  &__meta {
    align-items: center;
    color: rgba($color-base, 0.52);
    display: flex;
    flex-wrap: wrap;
    font-size: 0.75rem;
    font-weight: 600;
    gap: 0.25rem;
    line-height: 1rem;
  }

  &__actions {
    align-items: center;
    display: flex;
    flex-shrink: 0;
    gap: 0.5rem;
  }

  &__button {
    align-items: center;
    border-radius: 0.375rem;
    cursor: pointer;
    display: inline-flex;
    font-size: 0.625rem;
    font-weight: 700;
    height: 1.5rem;
    justify-content: center;
    letter-spacing: 0.06em;
    line-height: 0.75rem;
    padding: 0.125rem 0.375rem;
    text-transform: uppercase;
    transition: background-color 0.15s, color 0.15s;
    white-space: nowrap;
  }

  &__button--secondary {
    background: rgba(227, 143, 255, 0.1);
    color: #de7aff;

    &:hover {
      background: rgba(227, 143, 255, 0.16);
    }

    &:active {
      background: rgba(227, 143, 255, 0.22);
      color: #c000ff;
    }
  }

  &__button--primary {
    background: #de7aff;
    color: #ffffff;

    &:hover {
      background: #e38fff;
    }

    &:active {
      background: #c000ff;
    }
  }

  &__bottom {
    align-items: center;
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
  }

  &__items-wrap {
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }

  &__items {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    padding-bottom: 0.125rem;
    scrollbar-width: none;
    white-space: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__fade {
    background: linear-gradient(90deg, rgba(252, 252, 252, 0) 0%, #ffffff 86%);
    height: 3rem;
    pointer-events: none;
    position: absolute;
    right: 5.75rem;
    top: 0;
    width: min(34.5rem, 70%);
  }

  &__price {
    align-items: flex-end;
    display: flex;
    flex: 0 0 5.75rem;
    flex-direction: column;
    gap: 0.75rem;
    position: relative;
    text-align: right;
    z-index: 1;
  }

  &__price-value {
    color: $color-base;
    font-size: 1.625rem;
    font-weight: 700;
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

.profile-order-product {
  background: $color-input-bg;
  border-radius: 0.5rem;
  display: flex;
  flex: 0 0 9rem;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem 0.75rem;

  &__name {
    color: $color-base;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__options {
    color: $color-base-tertiary;
    display: flex;
    font-size: 0.75rem;
    font-weight: 600;
    gap: 0.25rem;
    line-height: 1rem;
    white-space: nowrap;
  }
}

@media (max-width: 720px) {
  .profile-order-item {
    padding: 1rem;

    &__top,
    &__bottom {
      align-items: flex-start;
      flex-direction: column;
    }

    &__top {
      padding-left: 0;
    }

    &__actions {
      flex-wrap: wrap;
    }

    &__items-wrap {
      width: 100%;
    }

    &__fade {
      display: none;
    }

    &__price {
      align-items: flex-start;
      text-align: left;
    }
  }
}
</style>

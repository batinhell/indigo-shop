<script setup>
const isOpen = defineModel({ required: true })

const props = defineProps({
  orderNumber: {
    type: [String, Number],
    required: true,
  },
})

const emit = defineEmits(['order-more'])

const { status, isTomorrowWorking } = useWorkingDay()
const copied = ref(false)

const days = [
  { label: 'Пн', active: true },
  { label: 'Вт', active: true },
  { label: 'Ср', active: true },
  { label: 'Чт', active: true },
  { label: 'Пт', active: true },
  { label: 'Сб', active: false },
  { label: 'Вс', active: false },
]

async function copyOrderNumber() {
  try {
    await navigator.clipboard.writeText(String(props.orderNumber))
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
  catch {}
}

function onOrderMore() {
  isOpen.value = false
  emit('order-more')
}
</script>

<template>
  <BaseModal v-model="isOpen" :show-header="false" max-width="25.5rem">
    <div class="modal-card">
      <!-- Close -->
      <button class="close-btn" @click="isOpen = false">
        <UIcon name="i-lucide-x" class="close-btn__icon" />
      </button>

          <!-- Header -->
          <div class="modal-section">
            <div class="modal-icon">
              <UIcon name="i-lucide-check" class="modal-icon__svg" />
            </div>

            <h2 class="modal-title">
              Заказ
              <button class="order-number" :title="copied ? 'Скопировано!' : 'Скопировать номер'" @click="copyOrderNumber">
                №{{ orderNumber }}
              </button>
              оплачен
            </h2>
          </div>

          <!-- Рабочее время, до конца дня ≥ 2 часа -->
          <div v-if="status === 'working'" class="modal-section">
            <p class="modal-text modal-text--bold">
              Менеджер свяжется с вами в течении 2-х часов, уточнит детали и отправит заказ в работу.
            </p>
          </div>

          <!-- Рабочее время, до конца дня < 2 часа -->
          <div v-else-if="status === 'closing-soon'" class="modal-section">
            <p class="modal-text modal-text--bold">
              Менеджер свяжется с вами завтра, до 12:00, уточнит детали и отправит заказ в работу.
            </p>
          </div>

          <!-- После рабочего дня (будний, но после 18:00 или до 9:00) -->
          <div v-else-if="status === 'after-hours'" class="modal-section">
            <p class="modal-text modal-text--bold">
              <template v-if="isTomorrowWorking">
                Менеджер свяжется с вами завтра, до 12:00, уточнит детали и отправит заказ в работу.
              </template>
              <template v-else>
                Менеджер свяжется с вами в ближайший рабочий день, до 12:00, уточнит детали и отправит заказ в работу.
              </template>
            </p>
          </div>

          <!-- Выходной / праздник -->
          <div v-else class="modal-section">
            <p class="modal-text modal-text--bold">
              Сегодня у вас выходной.
              <br>
              Менеджер свяжется с вами в ближайший рабочий день, до 12:00, уточнит детали и отправит заказ в работу.
            </p>
          </div>

          <!-- Pickup address -->
          <div class="modal-section">
            <p class="modal-text modal-text--secondary">
              Заказ можно будет забрать по адресу:
              <br>
              <a
                href="https://yandex.ru/maps/-/CHEbFD2T"
                target="_blank"
                rel="noopener noreferrer"
                class="modal-link"
              >Донецк, ул.Постышева, дом 60</a>
            </p>
          </div>

          <!-- Working hours info -->
          <div class="modal-section">
            <p class="modal-text modal-text--secondary">
              Мы работаем с 9 до 18:00,
              <br>
              с понедельника по пятницу:
            </p>

            <div class="days-row">
              <span
                v-for="day in days"
                :key="day.label"
                :class="['day-badge', { 'day-badge--inactive': !day.active }]"
              >
                {{ day.label }}
              </span>
            </div>
          </div>

          <!-- Action -->
          <AppButton class="order-more-btn" size="md" @click="onOrderMore">
            Заказать еще
          </AppButton>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
$color-base: #04121b;
$color-primary: #c925ff;
$color-base-secondary: rgba($color-base, 0.64);
$radius-card: 1.75rem;

.modal-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: white;
  border-radius: $radius-card;
  padding: 1.5rem;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 -6px 12px rgba(0, 0, 0, 0.03),
    0 14px 28px rgba(0, 0, 0, 0.08);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem;
  border-radius: 0.75rem;
  color: $color-base;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  &__icon {
    width: 1rem;
    height: 1rem;
  }
}

.modal-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 1.5rem;
}

.modal-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: rgba($color-base, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;

  &__svg {
    width: 1.25rem;
    height: 1.25rem;
    color: white;
  }
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.5;
  color: $color-base;
}

.order-number {
  color: $color-primary;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.8;
  }
}

.modal-text {
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.43;
  color: $color-base-secondary;

  &--bold {
    font-size: 1rem;
    color: $color-base;
  }

  &--secondary {
    color: $color-base-secondary;
  }
}

.modal-link {
  color: $color-primary;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.days-row {
  display: flex;
  gap: 0.5rem;
}

.day-badge {
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba($color-primary, 0.5);
  color: white;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06rem;

  &--inactive {
    background: #f1f5f9;
  }
}

.order-more-btn {
  width: fit-content;
}
</style>

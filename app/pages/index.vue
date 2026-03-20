<template>
  <div>
    <!-- Hero -->
    <section class="py-24 text-center">
      <div class="max-w-3xl mx-auto px-4">
        <h1 class="text-5xl font-bold tracking-tight">
          Печать флагов <span class="text-primary">на заказ</span>
        </h1>
        <p class="mt-6 text-lg text-muted">
          Создайте свой флаг в конструкторе: выберите размер, материал и тираж.
          Печатаем от 1 штуки с доставкой по всей России.
        </p>
        <div class="mt-8 flex justify-center gap-4">
          <UButton size="xl" trailing-icon="i-lucide-arrow-right" @click="isConstructorOpen = true">
            Создать флаг
          </UButton>
          <!-- TODO: убрать тестовые кнопки -->
          <UButton size="xl" color="neutral" variant="soft" @click="testOrderSuccess">
            Модалка успеха
          </UButton>
          <UButton size="xl" color="neutral" variant="soft" @click="isCartOpen = true">
            Корзина
          </UButton>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section id="how-it-works" class="py-20 bg-muted/50">
      <div class="max-w-5xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Как это работает
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="step in steps" :key="step.title" class="text-center">
            <div class="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10">
              <UIcon :name="step.icon" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-lg font-semibold">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-sm text-muted">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold">
          Готовы заказать?
        </h2>
        <p class="mt-4 text-muted">
          Переходите в конструктор, настройте параметры и оформите заказ за пару минут.
        </p>
        <UButton size="xl" class="mt-8" trailing-icon="i-lucide-arrow-right" @click="isConstructorOpen = true">
          Перейти в конструктор
        </UButton>
      </div>
    </section>

    <!-- Constructor Modal -->
    <ConstructorModal v-model="isConstructorOpen" />

    <!-- Cart Modal -->
    <CartModal v-model="isCartOpen" />

    <!-- Order Success Modal -->
    <OrderSuccessModal
      v-model="isOrderSuccessOpen"
      :order-number="successOrderNumber"
      @order-more="isConstructorOpen = true"
    />
  </div>
</template>

<script setup>
const isConstructorOpen = ref(false)
const isCartOpen = ref(false)
const isOrderSuccessOpen = ref(false)
const successOrderNumber = ref('')

function testOrderSuccess() {
  successOrderNumber.value = '288322'
  isOrderSuccessOpen.value = true
}

function onOrderPaid(orderNumber) {
  isConstructorOpen.value = false
  successOrderNumber.value = orderNumber
  isOrderSuccessOpen.value = true
}

const steps = [
  {
    icon: 'i-lucide-settings',
    title: 'Настройте параметры',
    description: 'Выберите размер, материал, тип крепления и загрузите макет.'
  },
  {
    icon: 'i-lucide-shopping-cart',
    title: 'Оформите заказ',
    description: 'Укажите количество, проверьте итоговую стоимость и оплатите онлайн.'
  },
  {
    icon: 'i-lucide-truck',
    title: 'Получите флаг',
    description: 'Изготовим за 3-5 рабочих дней и доставим в любой город России.'
  }
]
</script>

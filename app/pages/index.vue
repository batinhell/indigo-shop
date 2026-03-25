<template>
  <div class="min-h-screen flex items-center justify-center gap-4">
    <UButton size="xl" trailing-icon="i-lucide-arrow-right" @click="isConstructorOpen = true">
      Создать флаг
    </UButton>
    <UButton v-if="cartTotalItems > 0" size="xl" color="neutral" variant="soft" @click="isCartOpen = true">
      Корзина ({{ cartTotalItems }})
    </UButton>

    <ConstructorModal
      v-model="isConstructorOpen"
      @pay="onPayNow"
      @add-to-cart="onAddToCart"
    />

    <CartModal
      v-model="isCartOpen"
      @pay="onCartPay"
      @continue-shopping="onContinueShopping"
    />

    <OrderSuccessModal
      v-model="isOrderSuccessOpen"
      :order-number="successOrderNumber"
      @order-more="isConstructorOpen = true"
    />
  </div>
</template>

<script setup>
const { addItem, totalItems: cartTotalItems } = useCart()

const isConstructorOpen = ref(false)
const isCartOpen = ref(false)
const isOrderSuccessOpen = ref(false)
const successOrderNumber = ref('')
function generateOrderNumber() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

function onPayNow(_item) {
  isConstructorOpen.value = false
  successOrderNumber.value = generateOrderNumber()
  isOrderSuccessOpen.value = true
}

function onAddToCart(item) {
  addItem(item)
  isConstructorOpen.value = false
  isCartOpen.value = true
}

function onCartPay(selectedItems) {
  if (!selectedItems?.length) return
  isCartOpen.value = false
  successOrderNumber.value = generateOrderNumber()
  isOrderSuccessOpen.value = true
}

function onContinueShopping() {
  isCartOpen.value = false
  isConstructorOpen.value = true
}
</script>

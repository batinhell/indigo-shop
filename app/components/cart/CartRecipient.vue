<script setup>
const recipientName = ref('')
const recipientPhone = ref('')
const recipientEmail = ref('')
const anotherPerson = ref(false)
const anotherName = ref('')
const anotherPhone = ref('')

const emailError = computed(() => {
  if (!recipientEmail.value) return ''
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(recipientEmail.value) ? '' : 'Некорректный email'
})

const phoneError = computed(() => {
  if (!recipientPhone.value) return ''
  const digits = recipientPhone.value.replace(/\D/g, '')
  return digits.length >= 11 ? '' : 'Введите полный номер'
})

const anotherPhoneError = computed(() => {
  if (!anotherPhone.value) return ''
  const digits = anotherPhone.value.replace(/\D/g, '')
  return digits.length >= 11 ? '' : 'Введите полный номер'
})
</script>

<template>
  <div class="card card--mid">
    <div class="card__inner">
      <div class="recipient-header">
        <p class="section-title">Данные получателя</p>
        <div class="recipient-links">
          <a href="#" class="ext-link ext-link--muted">
            Добавить организацию
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
          <div class="field-col">
            <AppInput v-model="recipientPhone" mask="+7(###)-###-##-##" placeholder="+7(___)-___-__-__" />
            <span v-if="phoneError" class="field-error">{{ phoneError }}</span>
          </div>
        </div>
        <div class="field-row">
          <label class="field-label">Электропочта</label>
          <div class="field-col">
            <AppInput v-model="recipientEmail" placeholder="mail@example.com" />
            <span v-if="emailError" class="field-error">{{ emailError }}</span>
          </div>
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
          <div class="field-col">
            <AppInput v-model="anotherPhone" mask="+7(###)-###-##-##" placeholder="+7(___)-___-__-__" />
            <span v-if="anotherPhoneError" class="field-error">{{ anotherPhoneError }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card--mid {
  background: white;
  border-radius: $radius-card;
}

.card__inner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1.5rem;
}

.section-title {
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: $color-base;
}

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

  &--muted { color: $color-base-disabled; }

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

.field-col {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: $color-base;
  padding: 0 0.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.field-error {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #e12e3c;
  padding: 0 0.125rem;
}
</style>

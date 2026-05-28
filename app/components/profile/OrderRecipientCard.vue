<script setup>
const props = defineProps({
  orderId: { type: [Number, String], required: true },
  recipient: { type: Object, default: () => ({}) },
  canEdit: { type: Boolean, default: false }
})

const emit = defineEmits(['saved'])

const isEditing = ref(false)
const isSaving = ref(false)
const draft = ref({ name: '', phone: '' })
const errorMessage = ref('')

const recipientName = computed(() => props.recipient?.name || 'Получатель не указан')
const recipientPhone = computed(() => props.recipient?.phone || 'Телефон не указан')

function resetDraft() {
  draft.value = {
    name: props.recipient?.name || '',
    phone: props.recipient?.phone || ''
  }
}

watch(() => props.recipient, resetDraft, { immediate: true })

function startEdit() {
  errorMessage.value = ''
  resetDraft()
  isEditing.value = true
}

function cancelEdit() {
  errorMessage.value = ''
  resetDraft()
  isEditing.value = false
}

async function saveRecipient() {
  if (isSaving.value) return

  const name = draft.value.name.trim()
  const phone = draft.value.phone.trim()

  if (!name || !phone) {
    errorMessage.value = 'Укажите имя и телефон получателя'
    return
  }

  isSaving.value = true
  errorMessage.value = ''

  try {
    await $fetch(`/api/profile/orders/${props.orderId}/recipient`, {
      method: 'PATCH',
      body: {
        recipient: { name, phone }
      }
    })

    isEditing.value = false
    emit('saved')
  } catch (error) {
    errorMessage.value = error?.data?.message || error?.message || 'Не удалось сохранить получателя'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <article class="order-info__card">
    <div class="order-info__card-header">
      <h2 class="order-info__card-title">
        {{ isEditing ? 'Изменить получателя' : 'Получатель' }}
      </h2>
      <button
        v-if="!isEditing && props.canEdit"
        type="button"
        class="order-info__small-button"
        @click="startEdit"
      >
        Изменить
      </button>
      <div
        v-else-if="isEditing"
        class="order-info__edit-actions"
      >
        <button
          type="button"
          class="edit-action edit-action--cancel"
          aria-label="Отменить изменение получателя"
          :disabled="isSaving"
          @click="cancelEdit"
        >
          <svg
            viewBox="0 0 8.56 8.56"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.28 5.34L7.5 8.56l1.06-1.06L5.34 4.28 8.56 1.06 7.5 0 4.28 3.22 1.06 0 0 1.06l3.22 3.22L0 7.5l1.06 1.06L4.28 5.34Z"
              fill="#E12E3C"
            />
          </svg>
        </button>
        <button
          type="button"
          class="edit-action edit-action--confirm"
          aria-label="Сохранить получателя"
          :disabled="isSaving"
          @click="saveRecipient"
        >
          <svg
            viewBox="0 0 9.75 7.55"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.75 1.2L4.65 7.22a1 1 0 0 1-.7.33 1 1 0 0 1-.71-.32L0 3.53l1.4-1.22 2.53 2.9L8.33 0 9.75 1.2Z"
              fill="#008A0B"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="isEditing"
      class="order-info__recipient-edit"
    >
      <AppInput
        v-model="draft.name"
        class="order-info__recipient-input"
        placeholder="Имя получателя"
      />
      <AppInput
        v-model="draft.phone"
        class="order-info__recipient-input order-info__recipient-phone"
        placeholder="Телефон"
        mask="+7(###)-###-##-##"
      />
      <p
        v-if="errorMessage"
        class="order-info__error"
      >
        {{ errorMessage }}
      </p>
    </div>

    <p
      v-else
      class="order-info__text"
    >
      {{ recipientName }}<br>
      {{ recipientPhone }}
    </p>
  </article>
</template>

<style lang="scss" scoped>
.order-info {
  &__card {
    background: $color-input-bg;
    border-radius: $radius-control;
    min-height: 5rem;
    padding: 0.75rem;
  }

  &__card-header {
    align-items: center;
    display: flex;
    gap: 0.75rem;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  &__card-title {
    color: $color-base;
    font-size: 0.875rem;
    font-weight: 800;
    line-height: 1.25rem;
    margin: 0;
  }

  &__small-button {
    background: rgba(227, 143, 255, 0.1);
    border-radius: 0.375rem;
    color: #de7aff;
    cursor: pointer;
    font-size: 0.625rem;
    font-weight: 700;
    height: 1.5rem;
    line-height: 0.75rem;
    padding: 0.125rem 0.375rem;
    text-transform: uppercase;
    transition: background-color 0.15s, color 0.15s;

    &:hover {
      background: rgba(227, 143, 255, 0.16);
    }

    &:active {
      background: rgba(227, 143, 255, 0.22);
      color: #c000ff;
    }
  }

  &__edit-actions {
    display: flex;
    flex-shrink: 0;
    gap: 0.5rem;
  }

  &__recipient-edit {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__recipient-input {
    :deep(.app-input) {
      --app-input-background: #fff;

      border-color: rgba($color-base, 0.08);
    }

    :deep(.app-input:focus-within) {
      border-color: #de7aff;
    }
  }

  &__recipient-phone {
    width: 100%;
  }

  &__error {
    color: #e12e3c;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    margin: 0;
  }

  &__text {
    color: $color-base-tertiary;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
    margin: 0;
  }
}

.edit-action {
  align-items: center;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  transition: opacity 0.15s;
  width: 1.5rem;

  &:hover:not(:disabled) {
    opacity: 0.7;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.54;
  }

  svg {
    height: 0.5625rem;
    width: 0.5625rem;
  }

  &--cancel {
    background: #ffebed;
  }

  &--confirm {
    background: #dbffde;
  }
}
</style>

<script setup>
import { FABRICS, MOUNTINGS, SIZES, getFabricLabel } from '~/constants/product'
import { calcUnitPrice, calcDesignPrice } from '~/composables/usePricing'
import { formatPriceRaw } from '~/utils/format'

const props = defineProps({
  item: { type: Object, required: true },
  editing: { type: Boolean, default: false }
})

const emit = defineEmits([
  'toggle', 'start-edit', 'cancel-edit', 'confirm-edit',
  'increment', 'decrement'
])

const editDraft = ref(null)
const openDropdown = ref(null)

watch(() => props.editing, (val) => {
  if (val) {
    editDraft.value = { ...props.item.config }
    document.addEventListener('click', closeDropdowns)
  } else {
    editDraft.value = null
    openDropdown.value = null
    document.removeEventListener('click', closeDropdowns)
  }
})

onUnmounted(() => document.removeEventListener('click', closeDropdowns))

function toggleDropdown(name) {
  openDropdown.value = openDropdown.value === name ? null : name
}

function selectOption(field, value) {
  editDraft.value = { ...editDraft.value, [field]: value }
  openDropdown.value = null
}

function toggleDraftOption(field) {
  editDraft.value = { ...editDraft.value, [field]: !editDraft.value[field] }
}

function labelFor(options, value) {
  return options.find(o => o.value === value)?.label ?? value
}

function onConfirm() {
  emit('confirm-edit', editDraft.value)
}

function closeDropdowns() {
  openDropdown.value = null
}

const previewPrice = computed(() => {
  if (!editDraft.value) return null
  const fabricLabel = getFabricLabel(editDraft.value.fabric)
  const unitPrice = calcUnitPrice(
    fabricLabel,
    editDraft.value.size,
    props.item.quantity,
    editDraft.value.hasFringe,
    editDraft.value.doubleSided
  )
  const designPrice = calcDesignPrice(editDraft.value.orderDesign)
  return {
    total: unitPrice * props.item.quantity + designPrice,
    unit: unitPrice
  }
})
</script>

<template>
  <div class="item-row">
    <AppCheckbox :model-value="item.selected" @update:model-value="emit('toggle')" />
    <div class="item-row__product">
      <div class="item-row__image-wrap">
        <img :src="item.image" :alt="item.name" class="item-row__image">
      </div>
      <div class="item-row__details">
        <div class="item-row__top">
          <div class="item-row__info">
            <p class="item-row__name">{{ item.name }}</p>

            <!-- Default: static description -->
            <div v-if="!editing" class="item-row__meta">
              <p class="item-row__desc">{{ item.description }}</p>
              <p v-if="item.customerComment" class="item-row__note">{{ item.customerComment }}</p>
            </div>

            <!-- Edit mode: inline selects -->
            <div v-else class="item-row__edit-options">
              <div class="inline-select" role="listbox" @click.stop="toggleDropdown('fabric')">
                <span class="inline-select__text">{{ labelFor(FABRICS, editDraft.fabric) }}</span>
                <svg class="inline-select__chevron" viewBox="0 0 9 5" fill="none" :aria-expanded="openDropdown === 'fabric'"><path d="M1 1l3.28 3.28L7.56 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                <div v-if="openDropdown === 'fabric'" class="inline-select__dropdown" role="listbox">
                  <button v-for="f in FABRICS" :key="f.value" role="option" :aria-selected="f.value === editDraft.fabric" :class="['inline-select__option', { 'inline-select__option--active': f.value === editDraft.fabric }]" @click.stop="selectOption('fabric', f.value)">{{ f.label }}</button>
                </div>
              </div>
              <div class="inline-select" role="listbox" @click.stop="toggleDropdown('mounting')">
                <span class="inline-select__text">{{ labelFor(MOUNTINGS, editDraft.mounting) }}</span>
                <svg class="inline-select__chevron" viewBox="0 0 9 5" fill="none" :aria-expanded="openDropdown === 'mounting'"><path d="M1 1l3.28 3.28L7.56 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                <div v-if="openDropdown === 'mounting'" class="inline-select__dropdown" role="listbox">
                  <button v-for="m in MOUNTINGS" :key="m.value" role="option" :aria-selected="m.value === editDraft.mounting" :class="['inline-select__option', { 'inline-select__option--active': m.value === editDraft.mounting }]" @click.stop="selectOption('mounting', m.value)">{{ m.label }}</button>
                </div>
              </div>
              <div class="inline-select" role="listbox" @click.stop="toggleDropdown('size')">
                <span class="inline-select__text">{{ labelFor(SIZES, editDraft.size) }}</span>
                <svg class="inline-select__chevron" viewBox="0 0 9 5" fill="none" :aria-expanded="openDropdown === 'size'"><path d="M1 1l3.28 3.28L7.56 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                <div v-if="openDropdown === 'size'" class="inline-select__dropdown" role="listbox">
                  <button v-for="s in SIZES" :key="s.value" role="option" :aria-selected="s.value === editDraft.size" :class="['inline-select__option', { 'inline-select__option--active': s.value === editDraft.size }]" @click.stop="selectOption('size', s.value)">{{ s.label }}</button>
                </div>
              </div>
              <span :class="['inline-toggle', { 'inline-toggle--off': !editDraft.hasFringe }]" @click="toggleDraftOption('hasFringe')">бахрома</span>
              <span :class="['inline-toggle', { 'inline-toggle--off': !editDraft.doubleSided }]" @click="toggleDraftOption('doubleSided')">печать с двух сторон</span>
            </div>
          </div>

          <!-- Default: edit badge -->
          <button v-if="!editing" class="item-edit-badge" @click="emit('start-edit')">Изменить</button>

          <!-- Edit mode: cancel / confirm -->
          <div v-else class="item-row__edit-actions">
            <button class="edit-action edit-action--cancel" aria-label="Отменить редактирование" @click="emit('cancel-edit')">
              <svg viewBox="0 0 8.56 8.56" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.28 5.34L7.5 8.56l1.06-1.06L5.34 4.28 8.56 1.06 7.5 0 4.28 3.22 1.06 0 0 1.06l3.22 3.22L0 7.5l1.06 1.06L4.28 5.34Z" fill="#E12E3C" /></svg>
            </button>
            <button class="edit-action edit-action--confirm" aria-label="Подтвердить изменения" @click="onConfirm">
              <svg viewBox="0 0 9.75 7.55" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 1.2L4.65 7.22a1 1 0 0 1-.7.33 1 1 0 0 1-.71-.32L0 3.53l1.4-1.22 2.53 2.9L8.33 0 9.75 1.2Z" fill="#008A0B" /></svg>
            </button>
          </div>
        </div>
        <div class="item-row__bottom">
          <div class="quantity-control">
            <button class="quantity-control__btn" aria-label="Уменьшить количество" @click="emit('decrement')">
              <svg class="quantity-control__icon" viewBox="0 0 16 16" fill="none"><path d="M13.8225 7.95007L1.82251 7.95007" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
            </button>
            <div class="quantity-control__value">
              <span>{{ item.quantity }}</span>
              <span class="quantity-control__unit">шт</span>
            </div>
            <button class="quantity-control__btn" aria-label="Увеличить количество" @click="emit('increment')">
              <svg class="quantity-control__icon" viewBox="0 0 16 16" fill="none"><path d="M7.82251 1.95007V13.9501M13.8225 7.95007L1.82251 7.95007" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
            </button>
          </div>
          <div class="item-row__price">
            <template v-if="editing && previewPrice">
              <p class="item-row__total">{{ formatPriceRaw(previewPrice.total) }} &#8381;</p>
              <p class="item-row__unit-price">{{ formatPriceRaw(previewPrice.unit) }} &#8381; / шт</p>
            </template>
            <template v-else>
              <p class="item-row__total">{{ formatPriceRaw(item.unitPrice * item.quantity + item.designPrice) }} &#8381;</p>
              <p class="item-row__unit-price">{{ formatPriceRaw(item.unitPrice) }} &#8381; / шт</p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  background: $color-item-bg;
  border-radius: $radius-card;
  padding: 1rem 1.5rem 1rem 0.75rem;

  &__product {
    flex: 1;
    display: flex;
    gap: 1.5rem;
    min-width: 0;
  }

  &__image-wrap {
    width: 8rem;
    aspect-ratio: 1;
    flex-shrink: 0;
    border-radius: 0.875rem;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__details {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    min-width: 0;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__name {
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.5rem;
    letter-spacing: -0.01em;
    color: $color-base;
  }

  &__desc {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: $color-base-secondary;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
    padding-right: 3rem;
  }

  &__note {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: $color-base;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__total {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.75rem;
    letter-spacing: -0.02em;
    color: $color-base;
  }

  &__unit-price {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: $color-base-tertiary;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__edit-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 0.5rem;
  }

  &__edit-actions {
    display: flex;
    gap: 0.25rem;
    flex-shrink: 0;
  }
}

.item-edit-badge {
  flex-shrink: 0;
  height: 1.5rem;
  padding: 0 0.375rem;
  background: $color-primary-bg;
  border-radius: 0.375rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  line-height: 1.5rem;
  letter-spacing: 0.0375rem;
  text-transform: uppercase;
  color: $color-primary;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background: rgba($color-primary, 0.15);
  }
}

// -- Inline editing --

.inline-select {
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  cursor: pointer;
  position: relative;

  &__text {
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: #cd5cee;
    white-space: nowrap;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__chevron {
    width: 0.75rem;
    height: 0.75rem;
    color: #cd5cee;
    flex-shrink: 0;
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 0.25rem);
    left: -0.5rem;
    min-width: 100%;
    background: white;
    border-radius: 0.5rem;
    padding: 0.375rem 0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    z-index: 20;
    display: flex;
    flex-direction: column;
  }

  &__option {
    padding: 0.25rem 0.75rem;
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    color: #cd5cee;
    white-space: nowrap;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.1s;
    font-feature-settings: 'lnum' 1, 'pnum' 1;

    &:hover {
      background: rgba(#cd5cee, 0.06);
    }

    &--active {
      color: $color-base;
    }
  }
}

.inline-toggle {
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  color: #cd5cee;
  cursor: pointer;
  font-feature-settings: 'lnum' 1, 'pnum' 1;

  &--off {
    opacity: 0.4;
    text-decoration: line-through;
  }
}

.edit-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover { opacity: 0.7; }

  svg {
    width: 0.5625rem;
    height: 0.5625rem;
  }

  &--cancel { background: #ffebed; }
  &--confirm { background: #dbffde; }
}

// -- Quantity control --

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 9.6875rem;
  height: 2.5rem;
  background: $color-input-bg;
  border-radius: $radius-control;
  padding: 0 0.875rem;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #81888d;
    transition: color 0.15s;

    &:hover { color: $color-base; }
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    display: block;
  }

  &__value {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.2;
    color: $color-base;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__unit {
    color: $color-base;
  }
}
</style>

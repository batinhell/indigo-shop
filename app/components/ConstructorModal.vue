<script setup>
import { FABRICS, MOUNTINGS, SIZES, FABRIC_IMAGE_MAP, MOUNTING_IMAGE_MAP, ALLOWED_EXTENSIONS, RASTER_EXTENSIONS, MAX_UPLOAD_SIZE } from '~/constants/product'

const isOpen = defineModel({ required: true })
const emit = defineEmits(['pay', 'add-to-cart'])

const selectedFabric = ref('mesh')
const selectedMounting = ref('pocket')
const selectedSize = ref('90x135')
const quantity = ref(1)
const hasFringe = ref(true)
const doubleSided = ref(true)
const orderDesign = ref(false)
const description = ref('')
const uploadedFiles = ref([])
const fileInput = ref(null)
const isDragging = ref(false)
const dragCounter = ref(0)

function hasRasterFile(files) {
  return files.some(f => RASTER_EXTENSIONS.some(ext => f.name.toLowerCase().endsWith(ext)))
}

function isAllowedFile(file) {
  if (file.size > MAX_UPLOAD_SIZE) return false
  return ALLOWED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext))
}

function onFileSelect(e) {
  const files = Array.from(e.target.files || []).filter(isAllowedFile)
  uploadedFiles.value = [...uploadedFiles.value, ...files]
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  if (hasRasterFile(uploadedFiles.value)) {
    orderDesign.value = true
  }
}

function removeFile(index) {
  uploadedFiles.value = uploadedFiles.value.filter((_, i) => i !== index)
  if (!hasRasterFile(uploadedFiles.value)) {
    orderDesign.value = false
  }
}

function onDragEnter(e) {
  e.preventDefault()
  dragCounter.value++
  isDragging.value = true
}

function onDragLeave(e) {
  e.preventDefault()
  dragCounter.value--
  if (dragCounter.value === 0) {
    isDragging.value = false
  }
}

function onDragOver(e) {
  e.preventDefault()
}

function onDrop(e) {
  e.preventDefault()
  dragCounter.value = 0
  isDragging.value = false
  const files = Array.from(e.dataTransfer?.files || []).filter(isAllowedFile)
  uploadedFiles.value = [...uploadedFiles.value, ...files]
  if (hasRasterFile(uploadedFiles.value)) {
    orderDesign.value = true
  }
}

const fabricLabel = computed(() => FABRICS.find(f => f.value === selectedFabric.value)?.label ?? '')
const fabricGenitive = computed(() => FABRICS.find(f => f.value === selectedFabric.value)?.genitive ?? '')
const sizeLabel = computed(() => SIZES.find(s => s.value === selectedSize.value)?.label ?? '')

const { breakdown, basePriceFormatted, fringePriceFormatted, doubleSidedPriceFormatted, designPriceFormatted, totalFormatted } = usePricing({
  fabricLabel,
  size: selectedSize,
  quantity,
  hasFringe,
  doubleSided,
  orderDesign
})

const imageModules = import.meta.glob('~/assets/images/*.png', { eager: true, import: 'default' })

const productImage = computed(() => {
  const fabric = FABRIC_IMAGE_MAP[selectedFabric.value] || 'mesh'
  const mounting = MOUNTING_IMAGE_MAP[selectedMounting.value] || 'sleeve'
  const size = selectedSize.value
  const sided = doubleSided.value ? 'double' : 'single'
  const fringe = hasFringe.value ? '_fringe' : ''
  const filename = `${fabric}_${mounting}_${size}_${sided}${fringe}.png`
  const key = Object.keys(imageModules).find(k => k.endsWith(`/${filename}`))
  return key ? imageModules[key] : ''
})

function getCurrentItem() {
  return {
    fabric: selectedFabric.value,
    fabricLabel: fabricLabel.value,
    fabricGenitive: fabricGenitive.value,
    mounting: selectedMounting.value,
    size: selectedSize.value,
    sizeLabel: sizeLabel.value,
    quantity: quantity.value,
    hasFringe: hasFringe.value,
    doubleSided: doubleSided.value,
    orderDesign: orderDesign.value,
    unitPrice: breakdown.value?.unitPrice ?? 0,
    designPrice: breakdown.value?.designPrice ?? 0,
    description: description.value,
    uploadedFiles: uploadedFiles.value
  }
}

function onPay() {
  emit('pay', getCurrentItem())
}

function onAddToCart() {
  emit('add-to-cart', getCurrentItem())
}
</script>

<template>
  <BaseModal v-model="isOpen" title="Конструктор флага">
    <div class="modal-grid">
      <!-- Left Column: Form -->
      <div class="form-column">
        <!-- Parameters -->
        <div class="params-section">
          <p class="section-title">Параметры</p>

          <div class="fields-grid">
            <div class="field-row">
              <label class="field-label">Ткань</label>
              <AppSelect v-model="selectedFabric" :items="FABRICS" />
            </div>

            <div class="field-row">
              <label class="field-label">Тип крепления</label>
              <AppSelect v-model="selectedMounting" :items="MOUNTINGS" />
            </div>

            <div class="field-row">
              <label class="field-label">Количество</label>
              <QuantityInput v-model="quantity" :min="1" :max="10000" />
            </div>

            <div class="field-row">
              <label class="field-label">Размер</label>
              <AppSelect v-model="selectedSize" :items="SIZES" />
            </div>

            <div class="field-row field-row--options">
              <label class="field-label">Опции</label>
              <div class="options-list">
                <AppCheckbox v-model="hasFringe" label="Бахрома" />
                <AppCheckbox v-model="doubleSided" label="Печать с двух сторон" />
              </div>
            </div>
          </div>
        </div>

        <!-- Макет section -->
        <div class="layout-section">
          <div class="layout-section__header">
            <p class="section-title">Макет</p>
            <p class="layout-section__hint">
              Подойдут файлы форматов: tiff, ai, crd, jpg, png.<br>
              Разрешение не менее 150 dpi, CMYK, вылеты 5 мм
            </p>
            <div class="layout-section__links">
              <a href="#" class="layout-section__link">
                Как готовить макеты к печати
                <svg class="layout-section__link-icon" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.057 5.698a.807.807 0 0 1-1.17 0 .808.808 0 0 1 .001-.826l3.733-3.737H2.387A.569.569 0 0 1 1.82.564C1.822.252 2.075 0 2.387 0h4.538v4.534a.571.571 0 0 1-1.141.002l.006-2.572-3.733 3.734Z" fill="currentColor" /></svg>
              </a>
              <a href="#" class="layout-section__link">
                Шаблоны макетов
                <svg class="layout-section__link-icon" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.057 5.698a.807.807 0 0 1-1.17 0 .808.808 0 0 1 .001-.826l3.733-3.737H2.387A.569.569 0 0 1 1.82.564C1.822.252 2.075 0 2.387 0h4.538v4.534a.571.571 0 0 1-1.141.002l.006-2.572-3.733 3.734Z" fill="currentColor" /></svg>
              </a>
            </div>
          </div>

          <div class="design-toggle">
            <AppSwitch v-model="orderDesign" label="Заказать дизайн" />
          </div>

          <div class="description-field">
            <label class="field-label">Описание</label>
            <div
              :class="['description-field__box', { 'description-field__box--drag': isDragging }]"
              @dragenter="onDragEnter"
              @dragleave="onDragLeave"
              @dragover="onDragOver"
              @drop="onDrop"
            >
              <textarea
                v-model="description"
                class="description-field__textarea"
                placeholder="Сообщение для менеджера,&#10;который будет оформлять ваш заказ"
              />

              <div class="file-upload">
                <div class="file-upload__actions">
                  <label class="file-upload__btn">
                    <svg class="file-upload__btn-icon" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.69 14.631c-1.873 0-2.81 0-3.565-.251A5.503 5.503 0 0 1 1.001 11.256c-.17-.515-.225-1.113-.243-2.033A71.69 71.69 0 0 1 .75 7.69c0-1.872 0-2.809.251-3.565A5.503 5.503 0 0 1 4.125 1.001C4.881.75 5.818.75 7.69.75s2.81 0 3.566.251a5.503 5.503 0 0 1 3.124 3.124c.251.756.251 1.693.251 3.565 0 .598 0 1.101-.008 1.533-2.997 0-5.2-1.177-7.631-1.177s-5.157.785-6.234 1.177" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                      <circle cx="10.874" cy="3.917" r="1.256" fill="currentColor" fill-opacity="0.67" />
                      <path d="M12.448 11.306v4.365M10.266 13.488h4.365" stroke="currentColor" stroke-opacity="0.67" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M6.808 5.615 5.265 3.712a.469.469 0 0 0-.799.029L1.094 8.58h11.42L9.198 5.142a.469.469 0 0 0-.616-.083l-1.13.671a.469.469 0 0 1-.644-.115Z" fill="currentColor" fill-opacity="0.67" />
                    </svg>
                    <span>Выберите файл c макетом</span>
                    <input
                      ref="fileInput"
                      type="file"
                      multiple
                      accept=".tiff,.tif,.ai,.cdr,.jpg,.jpeg,.png"
                      class="file-upload__input"
                      @change="onFileSelect"
                    >
                  </label>
                  <span class="file-upload__hint">
                    или перетащите<br>на страницу
                  </span>
                </div>
                <div v-if="uploadedFiles.length" class="file-upload__files">
                  <span
                    v-for="(file, i) in uploadedFiles"
                    :key="i"
                    class="file-upload__file"
                  >
                    <span class="file-upload__file-name">{{ file.name }}</span>
                    <button type="button" class="file-upload__file-remove" @click="removeFile(i)">
                      <UIcon name="i-lucide-x" class="file-upload__file-remove-icon" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Product Card -->
      <ProductCard
        :image="productImage"
        :fabric-label="fabricLabel"
        :fabric-genitive="fabricGenitive"
        :size-label="sizeLabel"
        :quantity="quantity"
        :has-fringe="hasFringe"
        :double-sided="doubleSided"
        :order-design="orderDesign"
        :base-price="basePriceFormatted"
        :fringe-price="fringePriceFormatted"
        :double-sided-price="doubleSidedPriceFormatted"
        :design-price="designPriceFormatted"
        :total-price="totalFormatted"
        class="modal-grid__card"
        @pay="onPay"
        @add-to-cart="onAddToCart"
      />
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
.modal-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.375rem;
  margin-top: 1.5rem;

  &__card {
    grid-column: span 2;
  }
}

// --- Left column ---

.form-column {
  grid-column: span 2;
  background: white;
  border-radius: $radius-main;
  padding: 2rem 1.5rem 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: $color-base;
  line-height: 1.6;
  text-box: cap alphabetic;
}

.params-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 0.25rem;
}

.field-row {
  grid-column: span 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
  align-items: center;

  &--options {
    align-items: flex-start;
  }
}

.field-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: $color-base;
  padding: 0 0.125rem;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

// --- Макет section ---

.layout-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__hint {
    font-size: 0.75rem;
    font-weight: 600;
    color: $color-base-secondary;
    opacity: 0.8;
    line-height: 1.35;
  }

  &__links {
    display: flex;
    gap: 0.625rem;
  }

  &__link {
    display: flex;
    align-items: flex-start;
    gap: 0.125rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: $color-primary;
    text-decoration: underline;
  }

  &__link-icon {
    width: 0.5625rem;
    height: 0.5625rem;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
}

.design-toggle {
  display: flex;
  gap: 0.625rem;
  align-items: center;
}

.description-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &__box {
    background: $color-input-bg;
    border-radius: $radius-control;
    min-height: 11.375rem;
    display: flex;
    flex-direction: column;
    border: 2px solid transparent;
    transition: border-color 0.15s, background-color 0.15s;

    &:focus-within {
      border-color: #de7aff;
      background: white;
    }

    &--drag {
      border-color: $color-primary;
      background: rgba($color-primary, 0.04);
    }
  }

  &__textarea {
    flex: 1;
    min-height: 3rem;
    padding: 0.5rem 0.75rem;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.35;
    color: $color-base;
    font-feature-settings: 'lnum' 1, 'pnum' 1;

    &::placeholder {
      color: $color-base-secondary;
      opacity: 0.8;
    }
  }
}

.file-upload {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-top: auto;

  &__actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  &__btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    background: $color-primary;
    border-radius: 0.5rem;
    color: white;
    font-family: 'Manrope', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.5rem;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.15s;

    &:hover {
      background: #e38fff;
    }

    &:active {
      background: #c000ff;
    }
  }

  &__btn-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  &__hint {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.35;
    color: $color-base-secondary;
    opacity: 0.8;
  }

  &__files {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  &__file {
    display: flex;
    align-items: center;
    gap: 0.125rem;
    padding: 0 0.125rem;
  }

  &__file-name {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.34;
    color: $color-primary;
  }

  &__file-remove {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: $color-primary;
    opacity: 0.6;
    transition: opacity 0.15s;

    &:hover {
      opacity: 1;
    }
  }

  &__file-remove-icon {
    width: 0.75rem;
    height: 1rem;
  }
}
</style>

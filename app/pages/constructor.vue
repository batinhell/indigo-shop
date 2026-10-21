<script setup>
import { storeToRefs } from 'pinia'
import DielineView from '~/configurator/dieline/DielineView.vue'
import { FABRICS, MOUNTINGS, getFabricLabel, getFabricGenitive, getSizeLabel } from '~/constants/product'
import { resolveCartItemImage } from '~/composables/useCart'

// Размер (ключ) ↔ ширина/высота в мм для URL-параметров.
const SIZE_DIMS = {
  '90x135': { w: 1350, h: 900 },
  '60x90': { w: 900, h: 600 }
}
const DEFAULT_SIZE = '90x135'

const store = useConfiguratorStore()
const {
  fabric, mount, size, quantity, fringe, doubleSided, orderDesign, description, uploadedFiles,
  mode, show, zoom, scene, wind, showBack, geometry
} = storeToRefs(store)

const route = useRoute()
const router = useRouter()
const { addItem } = useCart()

// --- URL-query ↔ параметры -------------------------------------------------

function applyQuery(q) {
  const fabricValues = FABRICS.map(f => f.value)
  if (q.fabric && fabricValues.includes(q.fabric)) fabric.value = q.fabric

  const mountValues = MOUNTINGS.map(m => m.value)
  if (q.mount && mountValues.includes(q.mount)) mount.value = q.mount

  const w = Number.parseInt(q.w, 10)
  const h = Number.parseInt(q.h, 10)
  const matched = Object.entries(SIZE_DIMS).find(([, d]) => d.w === w && d.h === h)
  size.value = matched ? matched[0] : DEFAULT_SIZE

  if (q.fringe !== undefined) fringe.value = q.fringe === '1'
  if (q.double !== undefined) doubleSided.value = q.double === '1'
  if (q.design !== undefined) orderDesign.value = q.design === '1'

  const qty = Number.parseInt(q.qty, 10)
  if (Number.isFinite(qty)) quantity.value = Math.min(10000, Math.max(1, qty))
}

// Прочитать параметры из ссылки при открытии (некорректные → дефолты).
applyQuery(route.query)

const queryFromState = computed(() => {
  const dims = SIZE_DIMS[size.value] ?? SIZE_DIMS[DEFAULT_SIZE]
  return {
    w: String(dims.w),
    h: String(dims.h),
    mount: mount.value,
    fabric: fabric.value,
    fringe: fringe.value ? '1' : '0',
    double: doubleSided.value ? '1' : '0',
    design: orderDesign.value ? '1' : '0',
    qty: String(quantity.value)
  }
})

// Держать ссылку в актуальном состоянии (только на клиенте, без записи в историю).
onMounted(() => {
  watch(queryFromState, (q) => {
    router.replace({ query: q })
  }, { immediate: true })
})

// --- Цена (та же формула, что в текущем конструкторе) ----------------------

const fabricLabel = computed(() => getFabricLabel(fabric.value))
const {
  breakdown, basePriceFormatted, fringePriceFormatted,
  doubleSidedPriceFormatted, designPriceFormatted, totalFormatted
} = usePricing({ fabricLabel, size, quantity, hasFringe: fringe, doubleSided, orderDesign })

// --- Предпросмотр ----------------------------------------------------------

const previewImage = computed(() => resolveCartItemImage({
  fabric: fabric.value,
  mounting: mount.value,
  size: size.value,
  doubleSided: doubleSided.value,
  hasFringe: fringe.value
}))

const zoomPercent = computed({
  get: () => Math.round(zoom.value * 100),
  set: (v) => { zoom.value = v / 100 }
})

// Ползунок «Штиль — Ветер»: wind в сторе 0..1, слайдер 0..100.
const windPercent = computed({
  get: () => Math.round(wind.value * 100),
  set: (v) => { wind.value = v / 100 }
})

const scenes = [
  { value: 'studio', label: 'Студия' },
  { value: 'flagpole', label: 'На флагштоке' },
  { value: 'staff', label: 'На древке' }
]

// Зум колесом с Ctrl/Cmd и пинчем на тачпаде (пинч браузер шлёт как wheel+ctrlKey).
function onStageWheel(e) {
  if (mode.value !== 'dieline' || !(e.ctrlKey || e.metaKey)) return
  e.preventDefault()
  const factor = Math.exp(-e.deltaY * 0.0022)
  zoom.value = Math.min(4, Math.max(0.25, zoom.value * factor))
}

// Попап «Настройки вида»
const viewSettingsOpen = ref(false)
const viewSettingsEl = ref(null)
function onDocPointerDown(e) {
  if (viewSettingsOpen.value && viewSettingsEl.value && !viewSettingsEl.value.contains(e.target)) {
    viewSettingsOpen.value = false
  }
}
onMounted(() => document.addEventListener('pointerdown', onDocPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocPointerDown))

// --- Корзина ---------------------------------------------------------------

function buildItem() {
  return {
    productId: store.productId,
    fabric: fabric.value,
    fabricLabel: fabricLabel.value,
    fabricGenitive: getFabricGenitive(fabric.value),
    mounting: mount.value,
    size: size.value,
    sizeLabel: getSizeLabel(size.value),
    quantity: quantity.value,
    hasFringe: fringe.value,
    doubleSided: doubleSided.value,
    orderDesign: orderDesign.value,
    unitPrice: breakdown.value?.unitPrice ?? 0,
    designPrice: breakdown.value?.designPrice ?? 0,
    description: description.value,
    uploadedFiles: uploadedFiles.value
  }
}

function addToCartAndClose() {
  addItem(buildItem())
  close()
}

function close() {
  navigateTo('/catalog')
}

useSeoMeta({ title: 'Конструктор флага — Indigo' })
</script>

<template>
  <main class="constructor">
    <div class="constructor__container">
      <header class="constructor__header">
        <h1 class="constructor__title">
          Конструктор флага
        </h1>
        <button
          type="button"
          class="constructor__close"
          aria-label="Закрыть"
          @click="close"
        >
          <UIcon
            name="i-lucide-x"
            class="constructor__close-icon"
          />
        </button>
      </header>

      <div class="constructor__body">
        <!-- Левая колонка -->
        <ConfiguratorParams class="constructor__params" />

        <!-- Центр: предпросмотр -->
        <section class="preview">
          <div class="preview__topbar">
            <div class="preview__modes">
              <AppButton
                v-if="mode === 'model'"
                variant="secondary"
                size="m"
                @click="mode = 'model'"
              >
                Модель
              </AppButton>
              <button
                v-else
                type="button"
                class="preview__link"
                @click="mode = 'model'"
              >
                Модель
              </button>

              <AppButton
                v-if="mode === 'dieline'"
                variant="secondary"
                size="m"
                @click="mode = 'dieline'"
              >
                Развёртка
              </AppButton>
              <button
                v-else
                type="button"
                class="preview__link"
                @click="mode = 'dieline'"
              >
                Развёртка
              </button>
            </div>

            <div
              v-if="mode === 'model'"
              class="preview__scenes"
            >
              <button
                v-for="s in scenes"
                :key="s.value"
                type="button"
                class="preview__link"
                :class="{ 'preview__link--active': scene === s.value }"
                @click="scene = s.value"
              >
                {{ s.label }}
              </button>
            </div>

            <button
              type="button"
              class="preview__download"
              disabled
              title="Скоро"
            >
              {{ mode === 'dieline' ? 'Скачать развёртку' : 'Скачать картинку' }}
            </button>
          </div>

          <div
            class="preview__stage"
            @wheel="onStageWheel"
          >
            <ClientOnly>
              <DielineView
                v-if="mode === 'dieline'"
                :geometry="geometry"
                :show="show"
                :zoom="zoom"
              />
              <div
                v-else
                class="preview__model"
              >
                <img
                  v-if="previewImage"
                  :src="previewImage"
                  alt="Предпросмотр флага"
                  class="preview__model-img"
                >
                <p class="preview__model-note">
                  3D-модель — Этап 5
                </p>
              </div>
              <template #fallback>
                <div class="preview__loading">
                  Загрузка предпросмотра…
                </div>
              </template>
            </ClientOnly>
          </div>

          <div class="preview__toolbar">
            <div class="preview__zoom">
              <QuantityInput
                v-model="zoomPercent"
                :min="25"
                :max="400"
                suffix="%"
              />
            </div>

            <div class="preview__toolbar-center">
              <template v-if="mode === 'model'">
                <AppSwitch
                  v-model="showBack"
                  label="Показать оборот"
                />
                <label class="preview__wind">
                  <span class="preview__wind-cap">Штиль</span>
                  <input
                    v-model.number="windPercent"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    class="preview__wind-range"
                    aria-label="Сила ветра"
                  >
                  <span class="preview__wind-cap">Ветер</span>
                </label>
              </template>
              <template v-else>
                <div
                  ref="viewSettingsEl"
                  class="view-settings"
                >
                  <button
                    type="button"
                    class="preview__link"
                    :class="{ 'preview__link--active': viewSettingsOpen }"
                    @click="viewSettingsOpen = !viewSettingsOpen"
                  >
                    Настройки вида
                  </button>
                  <div
                    v-if="viewSettingsOpen"
                    class="view-settings__panel"
                  >
                    <AppSwitch
                      v-model="show.overall"
                      label="Общие габариты"
                    />
                    <AppSwitch
                      v-model="show.basic"
                      label="Основные размеры"
                    />
                    <AppSwitch
                      v-model="show.bleed"
                      label="Линию вылета"
                    />
                    <AppSwitch
                      v-model="show.safe"
                      label="Безопасную зону"
                    />
                    <AppSwitch
                      v-model="show.features"
                      label="Крепёж и обработку"
                    />
                    <AppSwitch
                      v-model="show.labels"
                      label="Подписи"
                    />
                  </div>
                </div>
              </template>
            </div>

            <button
              type="button"
              class="preview__link"
              @click="store.resetView()"
            >
              Сбросить вид
            </button>
          </div>
        </section>

        <!-- Правая колонка -->
        <ConfiguratorTemplateCard
          class="constructor__card"
          :fabric-genitive="getFabricGenitive(fabric)"
          :quantity="quantity"
          :has-fringe="fringe"
          :double-sided="doubleSided"
          :order-design="orderDesign"
          :base-price="basePriceFormatted"
          :fringe-price="fringePriceFormatted"
          :double-sided-price="doubleSidedPriceFormatted"
          :design-price="designPriceFormatted"
          :total-price="totalFormatted"
          @pay="addToCartAndClose"
          @add-to-cart="addToCartAndClose"
        />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.constructor {
  min-height: 100vh;
  background: #faf5ff;
  padding: 1rem;

  &__container {
    max-width: 108rem;
    margin: 0 auto;
    background: white;
    border-radius: $radius-main;
    padding: 2rem;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: 800;
    color: $color-base;
    letter-spacing: -0.02em;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: $radius-control;
    color: $color-base-secondary;
    cursor: pointer;
    transition: background-color 0.15s;

    &:hover {
      background: $color-input-bg;
    }
  }

  &__close-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &__body {
    display: grid;
    grid-template-columns: 27.5625rem minmax(0, 1fr) 24.5625rem;
    gap: 1.5rem;
    // Колонки одной высоты: центр-предпросмотр растягивается на всю высоту
    // левой колонки (правая карточка остаётся вверху через align-self).
    align-items: stretch;
  }
}

.preview {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 40rem;

  &__topbar {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  &__modes {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__scenes {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__download {
    margin-left: auto;
    font-family: 'Manrope', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: $color-purple;
    background: $color-primary-bg;
    border-radius: $radius-control;
    padding: 0.5rem 1rem;
    opacity: 0.6;
    cursor: not-allowed;
  }

  &__link {
    font-family: 'Manrope', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: $color-base-secondary;
    cursor: pointer;
    transition: color 0.15s;

    &:hover:not(:disabled) {
      color: $color-purple;
    }

    &--active {
      color: $color-purple;
    }

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }

  &__stage {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  &__model {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  &__model-img {
    max-width: 100%;
    max-height: 100%;
    min-height: 0;
    object-fit: contain;
  }

  &__model-note {
    font-size: 0.75rem;
    font-weight: 600;
    color: $color-base-tertiary;
  }

  &__loading {
    font-size: 0.875rem;
    font-weight: 600;
    color: $color-base-secondary;
  }

  &__toolbar {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  &__toolbar-center {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__zoom {
    width: 8rem;
  }

  &__wind {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  &__wind-cap {
    font-size: 0.75rem;
    font-weight: 600;
    color: $color-base-secondary;
    white-space: nowrap;
  }

  &__wind-range {
    width: 6.5rem;
    height: 0.25rem;
    appearance: none;
    background: $color-input-bg;
    border-radius: 999px;
    cursor: pointer;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: $color-purple;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      width: 1rem;
      height: 1rem;
      border: none;
      border-radius: 50%;
      background: $color-purple;
      cursor: pointer;
    }
  }

  .preview__toolbar > .preview__link:last-child {
    margin-left: auto;
  }
}

.view-settings {
  position: relative;

  &__panel {
    position: absolute;
    bottom: calc(100% + 0.75rem);
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    width: 15rem;
    padding: 1rem;
    background: white;
    border-radius: $radius-card;
    box-shadow: 0 0.5rem 1.5rem rgba(4, 18, 27, 0.12);
  }
}
</style>

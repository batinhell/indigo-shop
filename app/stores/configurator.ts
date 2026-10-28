import { defineStore } from 'pinia'
import { flag } from '~/configurator'
import type { FabricId, FlagMount, FlagParams } from '~/configurator/products/flag'
import { DEFAULT_SHOW, type ShowFlags } from '~/configurator/dieline/layout'

export type ConfiguratorMode = 'model' | 'dieline'
export type ConfiguratorScene = 'studio' | 'flagpole' | 'staff'

// Размер (ключ приложения) → ширина/высота в мм. Произвольный размер не поддерживаем.
const SIZE_DIMS: Record<string, { width: number, height: number }> = {
  '90x135': { width: 1350, height: 900 },
  '60x90': { width: 900, height: 600 }
}

// Ткань приложения (product.js) → FabricId ядра. Влияет только на 3D-материалы
// (Этап 5); на geometry развёртки ткань не влияет, поэтому расхождение безопасно.
const FABRIC_TO_CORE: Record<string, FabricId> = {
  'atlas': 'satin',
  'nylon': 'nylon',
  'mesh': 'mesh',
  'gabardine': 'gabardine',
  'dome-atlas': 'dome-satin'
}

export const useConfiguratorStore = defineStore('configurator', () => {
  // --- Параметры заказа (в словаре приложения: совместимо с ценой, корзиной,
  //     справочниками product.js и переиспользуемой левой колонкой) ---
  const productId = ref<string | number | null>('flag')
  const fabric = ref('mesh')
  const mount = ref<FlagMount>('pocket')
  const size = ref('90x135')
  const quantity = ref(1)
  const fringe = ref(true)
  const doubleSided = ref(true)
  const orderDesign = ref(false)
  const description = ref('')
  const uploadedFiles = ref<File[]>([]) // макеты лицевой стороны (и общие файлы)
  const backFiles = ref<File[]>([]) // макеты оборота — только для настоящей двусторонки

  // --- Состояние предпросмотра ---
  const mode = ref<ConfiguratorMode>('model')
  const show = reactive<ShowFlags>({ ...DEFAULT_SHOW })
  const zoom = ref(1)
  const scene = ref<ConfiguratorScene>('studio')
  const wind = ref(0)
  const showBack = ref(false)

  // --- Единый источник геометрии: params → flag.build (всё в мм) ---
  const params = computed<FlagParams>(() => {
    const dims = SIZE_DIMS[size.value] ?? SIZE_DIMS['90x135']
    return {
      width: dims.width,
      height: dims.height,
      fabric: FABRIC_TO_CORE[fabric.value] ?? 'mesh',
      mount: mount.value,
      fringe: fringe.value,
      doubleSided: doubleSided.value
    }
  })
  const geometry = computed(() => flag.build(params.value))

  function resetView() {
    zoom.value = 1
  }

  return {
    productId,
    fabric,
    mount,
    size,
    quantity,
    fringe,
    doubleSided,
    orderDesign,
    description,
    uploadedFiles,
    backFiles,
    mode,
    show,
    zoom,
    scene,
    wind,
    showBack,
    params,
    geometry,
    resetView
  }
})

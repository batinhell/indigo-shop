// Константы
const FRINGE_PRICE = 300
const DOUBLE_SIDED_PRICE = 1_000
const DESIGN_PRICE = 1_500
const BASE_PRODUCTION_DAYS = 4
const DESIGN_EXTRA_DAYS = 1

// Прайс-таблица: [размер][ткань][tier] = цена за 1 шт
const PRICE_TABLE = {
  '90x135': {
    'Атлас':           { '1-4': 2000, '5-10': 1900, '20-100': 1800, raopt: 1800 },
    'Нейлон':          { '1-4': 1400, '5-10': 1300, '20-100': 1200, raopt: 1200 },
    'Флажная сетка':   { '1-4': 1400, '5-10': 1300, '20-100': 1200, raopt: 1200 },
    'Купольный атлас': { '1-4': 6500, '5-10': 6000, '20-100': 6000, raopt: 6000 },
    'Габардин':        { '1-4': 2000, '5-10': 1900, '20-100': 1800, raopt: 1800 }
  },
  '90x60': {
    'Атлас 210гр':     { '1-4':  800, '5-10':  750, '20-100':  740, raopt:  690 },
    'Нейлон':          { '1-4':  700, '5-10':  650, '20-100':  640, raopt:  590 },
    'Флажная сетка':   { '1-4':  700, '5-10':  650, '20-100':  640, raopt:  590 },
    'Купольный атлас': { '1-4': 2950, '5-10': 2600, '20-100': 2340, raopt: 2340 },
    'Габардин':        { '1-4':  800, '5-10':  750, '20-100':  740, raopt:  690 }
  }
}

// Маппинг размера формы → ключ прайса
const SIZE_TO_PRICE_KEY = {
  '90x135': '90x135',
  '60x90': '90x60'
}

// Маппинг ткани: для 90x60 "Атлас" → "Атлас 210гр"
function getFabricPriceKey(fabricLabel, priceSize) {
  if (priceSize === '90x60' && fabricLabel === 'Атлас') {
    return 'Атлас 210гр'
  }
  return fabricLabel
}

function getTier(quantity) {
  if (quantity >= 100) return 'raopt'
  if (quantity >= 20) return '20-100'
  if (quantity >= 5) return '5-10'
  return '1-4'
}

function formatPrice(value) {
  return value.toLocaleString('ru-RU') + ' ₽'
}

export function usePricing({ fabricLabel, size, quantity, hasFringe, doubleSided, orderDesign }) {
  const breakdown = computed(() => {
    const qty = unref(quantity)
    const fabric = unref(fabricLabel)
    const sizeVal = unref(size)
    const fringe = unref(hasFringe)
    const dbl = unref(doubleSided)
    const design = unref(orderDesign)

    if (!qty || qty < 1 || !fabric || !sizeVal) {
      return null
    }

    const priceSize = SIZE_TO_PRICE_KEY[sizeVal]
    if (!priceSize || !PRICE_TABLE[priceSize]) {
      return null
    }

    const fabricKey = getFabricPriceKey(fabric, priceSize)
    const sizeTable = PRICE_TABLE[priceSize]
    if (!sizeTable[fabricKey]) {
      return null
    }

    const tier = getTier(qty)
    const basePrice = sizeTable[fabricKey][tier]
    const fringeAddition = fringe ? FRINGE_PRICE : 0
    const doubleSidedAddition = dbl ? DOUBLE_SIDED_PRICE : 0
    const unitPrice = basePrice + fringeAddition + doubleSidedAddition
    const printTotal = unitPrice * qty
    const designPrice = design ? DESIGN_PRICE : 0
    const total = printTotal + designPrice
    const productionDays = BASE_PRODUCTION_DAYS + (design ? DESIGN_EXTRA_DAYS : 0)

    return {
      basePrice,
      fringeAddition,
      doubleSidedAddition,
      unitPrice,
      printTotal,
      designPrice,
      total,
      productionDays,
      tier,
      quantity: qty
    }
  })

  const basePriceFormatted = computed(() => breakdown.value ? formatPrice(breakdown.value.basePrice) : '0 ₽')
  const fringePriceFormatted = computed(() => breakdown.value ? formatPrice(breakdown.value.fringeAddition) : '0 ₽')
  const doubleSidedPriceFormatted = computed(() => breakdown.value ? formatPrice(breakdown.value.doubleSidedAddition) : '0 ₽')
  const designPriceFormatted = computed(() => breakdown.value ? formatPrice(breakdown.value.designPrice) : '0 ₽')
  const totalFormatted = computed(() => breakdown.value ? formatPrice(breakdown.value.total) : '0 ₽')

  return {
    breakdown,
    basePriceFormatted,
    fringePriceFormatted,
    doubleSidedPriceFormatted,
    designPriceFormatted,
    totalFormatted,
    formatPrice
  }
}

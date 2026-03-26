import { calcUnitPrice, calcDesignPrice } from './usePricing'
import { FABRIC_IMAGE_MAP, MOUNTING_IMAGE_MAP, getFabricLabel, getFabricGenitive, getSizeLabel } from '~/constants/product'

const imageModules = import.meta.glob('~/assets/images/*.png', { eager: true, import: 'default' })

function resolveImage(fabric, mounting, size, doubleSided, hasFringe) {
  const fabricKey = FABRIC_IMAGE_MAP[fabric] || 'mesh'
  const mountingKey = MOUNTING_IMAGE_MAP[mounting] || 'sleeve'
  const sided = doubleSided ? 'double' : 'single'
  const fringe = hasFringe ? '_fringe' : ''
  const filename = `${fabricKey}_${mountingKey}_${size}_${sided}${fringe}.png`
  const key = Object.keys(imageModules).find(k => k.endsWith(`/${filename}`))
  return key ? imageModules[key] : ''
}

function buildDescription({ fabricLabel, mounting, sizeLabel, hasFringe, doubleSided, orderDesign }) {
  const parts = [fabricLabel]
  if (mounting === 'grommets') parts.push('люверсы')
  else parts.push('под древко')
  parts.push(sizeLabel)
  if (hasFringe) parts.push('бахрома')
  if (doubleSided) parts.push('печать с двух сторон')
  if (orderDesign) parts.push('услуги дизайнера')
  return parts.join(', ')
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function useCart() {
  const items = useState('cart-items', () => [])

  function addItem({ fabric, fabricLabel, fabricGenitive, mounting, size, sizeLabel, quantity, hasFringe, doubleSided, orderDesign, unitPrice, designPrice, description }) {
    const image = resolveImage(fabric, mounting, size, doubleSided, hasFringe)
    const itemDescription = buildDescription({ fabricLabel, mounting, sizeLabel, hasFringe, doubleSided, orderDesign })
    const customerComment = description?.trim() ?? ''
    const genitive = fabricGenitive || getFabricGenitive(fabric)

    const item = {
      id: generateId(),
      name: `Флаг из ${genitive}`,
      description: itemDescription,
      customerComment,
      image,
      quantity,
      unitPrice,
      designPrice: designPrice || 0,
      selected: true,
      config: { fabric, mounting, size, quantity, hasFringe, doubleSided, orderDesign }
    }

    items.value = [...items.value, item]
    return item
  }

  function removeItem(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function removeItems(ids) {
    const idSet = new Set(ids)
    items.value = items.value.filter(item => !idSet.has(item.id))
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) => {
      if (item.id !== id) return item

      const nextQuantity = Math.max(1, quantity)
      const fabricLabel = getFabricLabel(item.config.fabric)
      const unitPrice = calcUnitPrice(
        fabricLabel,
        item.config.size,
        nextQuantity,
        item.config.hasFringe,
        item.config.doubleSided
      )

      return {
        ...item,
        quantity: nextQuantity,
        unitPrice,
        config: {
          ...item.config,
          quantity: nextQuantity
        }
      }
    })
  }

  function updateItem(id, config) {
    items.value = items.value.map((item) => {
      if (item.id !== id) return item

      const image = resolveImage(config.fabric, config.mounting, config.size, config.doubleSided, config.hasFringe)
      const fabricLabel = getFabricLabel(config.fabric)
      const fabricGenitive = getFabricGenitive(config.fabric)
      const sizeLabel = getSizeLabel(config.size)
      const description = buildDescription({
        fabricLabel,
        mounting: config.mounting,
        sizeLabel,
        hasFringe: config.hasFringe,
        doubleSided: config.doubleSided,
        orderDesign: config.orderDesign
      })

      const unitPrice = calcUnitPrice(fabricLabel, config.size, item.quantity, config.hasFringe, config.doubleSided)
      const designPrice = calcDesignPrice(config.orderDesign)

      return {
        ...item,
        name: `Флаг из ${fabricGenitive}`,
        description,
        image,
        unitPrice,
        designPrice,
        config: { ...config }
      }
    })
  }

  function clearCart() {
    items.value = []
  }

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.unitPrice * item.quantity + item.designPrice, 0))

  return {
    items,
    addItem,
    removeItem,
    removeItems,
    updateItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  }
}

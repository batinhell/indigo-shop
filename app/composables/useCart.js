import { calcUnitPrice, calcDesignPrice } from './usePricing'
import { FABRIC_IMAGE_MAP, MOUNTING_IMAGE_MAP, getFabricLabel, getFabricGenitive, getSizeLabel } from '~/constants/product'
import fallbackProductImage from '~/assets/images/mesh_sleeve_90x135_single_fringe.png'

const CART_STORAGE_KEY = 'indigo:cart'
const imageModules = import.meta.glob('~/assets/images/*.png', { eager: true, import: 'default' })

function readStoredCart() {
  if (!import.meta.client) return []

  try {
    const parsed = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeStoredCart(items) {
  if (!import.meta.client) return

  const serializableItems = items.map(({ uploadedFiles, ...item }) => ({
    ...item,
    uploadedFileNames: Array.isArray(uploadedFiles) && uploadedFiles.length
      ? uploadedFiles.map(file => file.name)
      : item.uploadedFileNames || []
  }))
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serializableItems))
}

export function resolveCartItemImage(config = {}) {
  const { fabric, mounting, size, doubleSided, hasFringe } = config
  const fabricKey = FABRIC_IMAGE_MAP[fabric] || 'mesh'
  const mountingKey = MOUNTING_IMAGE_MAP[mounting] || 'sleeve'
  const sided = doubleSided ? 'double' : 'single'
  const fringe = hasFringe ? '_fringe' : ''
  const filename = `${fabricKey}_${mountingKey}_${size}_${sided}${fringe}.png`
  const key = Object.keys(imageModules).find(k => k.endsWith(`/${filename}`))
  return key ? imageModules[key] : ''
}

function resolveImage(fabric, mounting, size, doubleSided, hasFringe) {
  return resolveCartItemImage({ fabric, mounting, size, doubleSided, hasFringe })
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
  const isReady = useState('cart-items-ready', () => false)

  onMounted(() => {
    if (isReady.value) return

    items.value = readStoredCart().map(item => ({
      ...item,
      image: item.image || resolveCartItemImage(item.config) || fallbackProductImage
    }))
    isReady.value = true
  })

  watch(items, (nextItems) => {
    if (!isReady.value) return
    writeStoredCart(nextItems)
  }, { deep: true })

  function persist(nextItems) {
    items.value = nextItems
    writeStoredCart(nextItems)
  }

  function addItem({ productId, fabric, fabricLabel, fabricGenitive, mounting, size, sizeLabel, quantity, hasFringe, doubleSided, orderDesign, unitPrice, designPrice, description, uploadedFiles = [] }) {
    const image = resolveImage(fabric, mounting, size, doubleSided, hasFringe)
    const itemDescription = buildDescription({ fabricLabel, mounting, sizeLabel, hasFringe, doubleSided, orderDesign })
    const customerComment = description?.trim() ?? ''
    const genitive = fabricGenitive || getFabricGenitive(fabric)

    const item = {
      id: generateId(),
      name: `Флаг из ${genitive}`,
      productId: productId ?? null,
      description: itemDescription,
      customerComment,
      image,
      quantity,
      unitPrice,
      designPrice: designPrice || 0,
      uploadedFiles: Array.isArray(uploadedFiles) ? uploadedFiles : [],
      uploadedFileNames: Array.isArray(uploadedFiles) ? uploadedFiles.map(file => file.name) : [],
      selected: true,
      config: { fabric, mounting, size, quantity, hasFringe, doubleSided, orderDesign }
    }

    persist([...items.value, item])
    return item
  }

  function addExistingItem(item) {
    const quantity = Math.max(1, Number.parseInt(item?.quantity, 10) || 1)
    const cartItem = {
      id: generateId(),
      name: item?.name || 'Позиция заказа',
      productId: item?.productId ?? null,
      description: item?.description || '',
      customerComment: item?.customerComment || '',
      image: item?.image || resolveCartItemImage(item?.config) || fallbackProductImage,
      quantity,
      unitPrice: Number(item?.unitPrice) || 0,
      designPrice: Number(item?.designPrice) || 0,
      selected: true,
      config: item?.config || {}
    }

    persist([...items.value, cartItem])
    return cartItem
  }

  function removeItem(id) {
    persist(items.value.filter(item => item.id !== id))
  }

  function removeItems(ids) {
    const idSet = new Set(ids)
    persist(items.value.filter(item => !idSet.has(item.id)))
  }

  function updateQuantity(id, quantity) {
    const nextItems = items.value.map((item) => {
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

    persist(nextItems)
  }

  function updateItem(id, config) {
    const nextItems = items.value.map((item) => {
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
        productId: item.productId ?? null,
        description,
        image,
        unitPrice,
        designPrice,
        config: { ...config }
      }
    })

    persist(nextItems)
  }

  function clearCart() {
    persist([])
  }

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.unitPrice * item.quantity + item.designPrice, 0))

  return {
    items,
    addItem,
    addExistingItem,
    removeItem,
    removeItems,
    updateItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  }
}

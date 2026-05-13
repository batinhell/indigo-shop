const FAVORITES_STORAGE_KEY = 'indigo:favorites'

function readStoredFavorites() {
  if (!import.meta.client) {
    return []
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeStoredFavorites(items) {
  if (!import.meta.client) {
    return
  }

  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items))
}

export function useFavorites() {
  const items = useState('favorite-items', () => [])
  const isReady = useState('favorite-items-ready', () => false)

  onMounted(() => {
    if (isReady.value) {
      return
    }

    items.value = readStoredFavorites()
    isReady.value = true
  })

  const favoriteIds = computed(() => new Set(items.value.map(item => item.id)))
  const totalItems = computed(() => items.value.length)

  function persist(nextItems) {
    items.value = nextItems
    writeStoredFavorites(nextItems)
  }

  function isFavorite(id) {
    return favoriteIds.value.has(id)
  }

  function addItem(product) {
    if (!product?.id || isFavorite(product.id)) {
      return
    }

    persist([
      product,
      ...items.value
    ])
  }

  function removeItem(id) {
    persist(items.value.filter(item => item.id !== id))
  }

  function clearItems() {
    persist([])
  }

  function toggleItem(product) {
    if (!product?.id) {
      return false
    }

    if (isFavorite(product.id)) {
      removeItem(product.id)
      return false
    }

    addItem(product)
    return true
  }

  return {
    items,
    totalItems,
    isFavorite,
    addItem,
    removeItem,
    clearItems,
    toggleItem
  }
}

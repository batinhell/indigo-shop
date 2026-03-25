export function formatPrice(value) {
  return value.toLocaleString('ru-RU') + ' \u20bd'
}

export function formatPriceRaw(value) {
  return value.toLocaleString('ru-RU')
}

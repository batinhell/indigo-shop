export function getRussianSecondsWord(value) {
  const absoluteValue = Math.abs(value)
  const lastTwo = absoluteValue % 100

  if (lastTwo >= 11 && lastTwo <= 14) {
    return 'секунд'
  }

  const lastDigit = absoluteValue % 10

  if (lastDigit === 1) {
    return 'секунду'
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'секунды'
  }

  return 'секунд'
}

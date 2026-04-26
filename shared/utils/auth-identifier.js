export const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,}$/

export function normalizePhoneDigits(value) {
  let digits = String(value ?? '').replace(/\D/g, '')

  if (!digits) {
    return ''
  }

  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`
  }

  if (!digits.startsWith('7')) {
    digits = `7${digits}`
  }

  return digits.slice(0, 11)
}

export function isPhoneLike(value) {
  const trimmed = String(value ?? '').trim()

  if (!trimmed || /[A-Za-zА-Яа-я@]/.test(trimmed)) {
    return false
  }

  return /^[+\d]/.test(trimmed)
}

export function isAuthPhone(value) {
  return /^\+7\d{10}$/.test(String(value ?? '').trim())
}

export function formatAuthPhone(value) {
  const digits = normalizePhoneDigits(value)
  return digits ? `+${digits}` : ''
}

export function formatPhone(value) {
  const text = String(value ?? '')
  const digits = normalizePhoneDigits(text)

  if (!digits) {
    return text.trim().startsWith('+') ? '+7' : ''
  }

  const number = digits.slice(1)
  let formatted = '+7'

  if (number.length > 0) {
    formatted += ` (${number.slice(0, 3)}`
  }

  if (number.length >= 3) {
    formatted += ')'
  }

  if (number.length > 3) {
    formatted += ` ${number.slice(3, 6)}`
  }

  if (number.length > 6) {
    formatted += ` ${number.slice(6, 8)}`
  }

  if (number.length > 8) {
    formatted += ` ${number.slice(8, 10)}`
  }

  return formatted
}

export function formatCompactPhone(value) {
  const text = String(value ?? '')
  const digits = normalizePhoneDigits(text)

  if (!digits) {
    return text.trim().startsWith('+') ? '+7' : ''
  }

  const number = digits.slice(1)
  let formatted = '+7'

  if (number.length > 0) {
    formatted += `(${number.slice(0, 3)}`
  }

  if (number.length >= 3) {
    formatted += ')'
  }

  if (number.length > 3) {
    formatted += `-${number.slice(3, 6)}`
  }

  if (number.length > 6) {
    formatted += `-${number.slice(6, 8)}`
  }

  if (number.length > 8) {
    formatted += `-${number.slice(8, 10)}`
  }

  return formatted
}

export function unmaskPhoneToEmail(value) {
  return String(value ?? '')
    .replace(/^\+7\s?\(?/, '')
    .replace(/[()\s]/g, '')
}

export function normalizeAuthIdentifier(value) {
  const trimmed = String(value ?? '').trim()

  if (isPhoneLike(trimmed)) {
    const normalizedPhone = formatAuthPhone(trimmed)

    return {
      type: 'phone',
      value: normalizedPhone,
      isValid: isAuthPhone(normalizedPhone)
    }
  }

  const email = trimmed.toLowerCase()

  return {
    type: 'email',
    value: email,
    isValid: isValidEmail(email)
  }
}

export function getIdentifierError(value) {
  const trimmed = String(value ?? '').trim()

  if (!trimmed) {
    return ''
  }

  const identifier = normalizeAuthIdentifier(trimmed)

  return identifier.isValid ? '' : 'Не похоже на номер или почту :('
}

export function getRegistrationEmailError(value) {
  const trimmed = String(value ?? '').trim()

  return isValidEmail(trimmed) ? '' : 'Не похоже на почту :('
}

function isValidEmail(value) {
  const email = String(value ?? '').trim()

  if (!EMAIL_PATTERN.test(email)) {
    return false
  }

  const [localPart, domainPart] = email.split('@')

  if (!localPart || !domainPart) {
    return false
  }

  if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) {
    return false
  }

  const domainLabels = domainPart.split('.')
  if (domainLabels.length < 2) {
    return false
  }

  return domainLabels.every((label, index) => {
    if (!label || label.startsWith('-') || label.endsWith('-')) {
      return false
    }

    if (index === domainLabels.length - 1) {
      return /^[A-Za-z]{2,}$/.test(label)
    }

    return /^[A-Za-z-]+$/.test(label)
  })
}

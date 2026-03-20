import { defineCachedFunction } from 'nitropack/runtime'

/**
 * API isdayoff.ru — возвращает строку из 0 и 1 на весь год.
 * 0 = рабочий день, 1 = выходной/праздник.
 *
 * Кешируем на 24 часа, чтобы не дёргать API на каждый запрос.
 */
const fetchYearCalendar = defineCachedFunction(
  async (year: number): Promise<string> => {
    const response = await $fetch<string>(`https://isdayoff.ru/${year}`, {
      responseType: 'text',
    })
    return response
  },
  {
    maxAge: 60 * 60 * 24,
    name: 'isdayoff-calendar',
    getKey: (year: number) => `year-${year}`,
  },
)

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

const WORK_START_HOUR = 9
const WORK_END_HOUR = 18
const CLOSING_SOON_HOURS = 2

export default defineEventHandler(async () => {
  const now = new Date()
  const year = now.getFullYear()
  const hour = now.getHours()
  const dayIndex = getDayOfYear(now) - 1

  let isDayOff: boolean

  try {
    const calendar = await fetchYearCalendar(year)
    isDayOff = calendar[dayIndex] === '1'
  }
  catch {
    // Фоллбэк: считаем выходными только субботу и воскресенье
    const day = now.getDay()
    isDayOff = day === 0 || day === 6
  }

  let status: 'working' | 'closing-soon' | 'after-hours' | 'day-off'

  if (isDayOff) {
    status = 'day-off'
  }
  else if (hour < WORK_START_HOUR || hour >= WORK_END_HOUR) {
    status = 'after-hours'
  }
  else if (hour >= WORK_END_HOUR - CLOSING_SOON_HOURS) {
    status = 'closing-soon'
  }
  else {
    status = 'working'
  }

  // Проверяем, рабочий ли завтра день
  let isTomorrowWorking = true
  try {
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowYear = tomorrow.getFullYear()
    const calendar = await fetchYearCalendar(tomorrowYear)
    const tomorrowIndex = getDayOfYear(tomorrow) - 1
    isTomorrowWorking = calendar[tomorrowIndex] === '0'
  }
  catch {
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const day = tomorrow.getDay()
    isTomorrowWorking = day !== 0 && day !== 6
  }

  return {
    status,
    isTomorrowWorking,
  }
})

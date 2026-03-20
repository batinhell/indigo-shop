/**
 * Получает статус рабочего времени с сервера.
 * Сервер дёргает API isdayoff.ru (с кешем на 24 часа).
 *
 * @returns {{ status: Ref<string>, isTomorrowWorking: Ref<boolean>, pending: Ref<boolean> }}
 */
export function useWorkingDay() {
  const { data, pending } = useFetch('/api/working-day', {
    default: () => ({
      status: 'working',
      isTomorrowWorking: true,
    }),
  })

  const status = computed(() => data.value.status)
  const isTomorrowWorking = computed(() => data.value.isTomorrowWorking)

  return {
    status,
    isTomorrowWorking,
    pending,
  }
}

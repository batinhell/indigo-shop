export function useClientAuthSession() {
  const session = ref({
    data: null,
    isPending: true,
    error: null
  })

  if (import.meta.client) {
    onMounted(async () => {
      const { authClient } = await import('~/utils/auth-client.js')
      const clientSession = authClient.useSession()

      watch(clientSession, (value) => {
        session.value = value
      }, { immediate: true })
    })
  }

  return session
}

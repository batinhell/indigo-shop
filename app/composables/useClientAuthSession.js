import { authClient } from '~/utils/auth-client.js'

export function useClientAuthSession() {
  if (import.meta.client) {
    return authClient.useSession()
  }

  return ref({
    data: null,
    isPending: true,
    error: null
  })
}

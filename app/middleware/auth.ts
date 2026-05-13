import { authClient } from '~/utils/auth-client.js'

export default defineNuxtRouteMiddleware(async () => {
  const { data: session } = await authClient.useSession(useFetch)

  if (!session.value) {
    return navigateTo('/')
  }
})

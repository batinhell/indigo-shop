export const useProfileStore = defineStore('profile', () => {
  const profileData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  let fetchPromise = null

  const user = computed(() => profileData.value?.profile?.user ?? null)
  const organizations = computed(() => profileData.value?.profile?.organizations ?? [])
  const recipients = computed(() => profileData.value?.profile?.recipients ?? [])
  const isLoaded = computed(() => Boolean(profileData.value))

  async function fetchProfile({ force = false } = {}) {
    if (!force && profileData.value) {
      return profileData.value
    }

    if (fetchPromise) {
      return fetchPromise
    }

    isLoading.value = true
    error.value = null

    fetchPromise = $fetch('/api/profile', {
      headers: import.meta.server ? useRequestHeaders(['cookie']) : undefined
    })
      .then((data) => {
        profileData.value = data
        return data
      })
      .catch((fetchError) => {
        error.value = fetchError
        throw fetchError
      })
      .finally(() => {
        isLoading.value = false
        fetchPromise = null
      })

    return fetchPromise
  }

  function fetchProfileOnce() {
    return fetchProfile()
  }

  function refreshProfile() {
    return fetchProfile({ force: true })
  }

  function clearProfile() {
    profileData.value = null
    error.value = null
    isLoading.value = false
    fetchPromise = null
  }

  return {
    profileData,
    user,
    organizations,
    recipients,
    isLoaded,
    isLoading,
    error,
    fetchProfileOnce,
    refreshProfile,
    clearProfile
  }
})

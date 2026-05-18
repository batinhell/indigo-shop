<script setup>
import { storeToRefs } from 'pinia'
import { formatCompactPhone } from '~~/shared/utils/auth-identifier.js'

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const availableProfileTabs = ['data', 'favorites']

function normalizeProfileTab(tab) {
  const value = Array.isArray(tab) ? tab[0] : tab
  return availableProfileTabs.includes(value) ? value : 'data'
}

const activeProfileTab = ref(normalizeProfileTab(route.query.tab))
const profileStore = useProfileStore()
const {
  profileData,
  user,
  organizations,
  recipients
} = storeToRefs(profileStore)

const userName = ref('')
const userPhone = ref('')
const userEmail = ref('')
const isEmailVerified = ref(false)
const additionalContact = ref('')
const savedUserName = ref('')
const savedAdditionalContact = ref('')
const isProfileSaving = ref(false)
const profileSaveError = ref('')

const recipientName = ref('')
const recipientPhone = ref('')
const isPhoneVerified = ref(false)

const showRecipient = ref(false)
const personalDataRef = ref(null)
const emailConfirmationStatus = computed(() => {
  const value = route.query.emailConfirmed
  return Array.isArray(value) ? value[0] : value
})
const passwordResetToken = computed(() => {
  const value = route.query.token
  return typeof value === 'string' && route.query.passwordReset ? value : ''
})

function setActiveProfileTab(tab) {
  const nextTab = normalizeProfileTab(tab)

  navigateTo({
    path: '/profile',
    query: nextTab === 'data' ? {} : { tab: nextTab }
  })
}

watch(
  () => route.query.tab,
  (tab) => {
    activeProfileTab.value = normalizeProfileTab(tab)
  }
)

function ensureProfileLoaded() {
  if (activeProfileTab.value !== 'data' || profileData.value) {
    return
  }

  profileStore.fetchProfileOnce().catch(() => {})
}

watch(activeProfileTab, ensureProfileLoaded, { immediate: true })

watch(user, (value) => {
  const nextSavedName = value?.name || ''

  if (userName.value.trim() === savedUserName.value.trim()) {
    userName.value = nextSavedName
  }

  savedUserName.value = nextSavedName
  userPhone.value = formatCompactPhone(value?.phoneNumber || '')
  userEmail.value = value?.email || ''
  additionalContact.value = value?.additionalContact || ''
  savedAdditionalContact.value = value?.additionalContact || ''
  isEmailVerified.value = Boolean(value?.emailVerified)
  isPhoneVerified.value = Boolean(value?.phoneNumberVerified)
  personalDataRef.value?.syncSavedEmail?.(value?.email || '')
}, { immediate: true })

const hasProfileChanges = computed(() => (
  userName.value.trim() !== savedUserName.value.trim()
  || additionalContact.value.trim() !== savedAdditionalContact.value.trim()
))

function cancelProfileChanges() {
  userName.value = savedUserName.value
  additionalContact.value = savedAdditionalContact.value
  profileSaveError.value = ''
}

async function saveProfileChanges() {
  if (!hasProfileChanges.value || isProfileSaving.value) {
    return
  }

  profileSaveError.value = ''

  if (!userName.value.trim()) {
    profileSaveError.value = 'Введите имя'
    return
  }

  isProfileSaving.value = true

  try {
    const response = await $fetch('/api/profile', {
      method: 'PATCH',
      body: {
        name: userName.value,
        additionalContact: additionalContact.value
      }
    })
    const updatedUser = response?.user

    if (updatedUser?.name) {
      userName.value = updatedUser.name
      savedUserName.value = updatedUser.name
    }

    additionalContact.value = updatedUser?.additionalContact || ''
    savedAdditionalContact.value = updatedUser?.additionalContact || ''

    await profileStore.refreshProfile()
  } catch (error) {
    profileSaveError.value = error?.data?.message || error?.message || 'Не удалось сохранить изменения'
  } finally {
    isProfileSaving.value = false
  }
}

async function handleEmailConfirmationStatus(status) {
  activeProfileTab.value = 'data'

  if (status === 'success') {
    isEmailVerified.value = true
    await profileStore.refreshProfile()
  }

  await navigateTo({
    path: '/profile',
    query: {}
  }, { replace: true })
}

async function clearPasswordResetQuery() {
  await navigateTo({
    path: '/profile',
    query: {}
  }, { replace: true })
}

onMounted(() => {
  const status = emailConfirmationStatus.value

  if (!status) {
    return
  }

  handleEmailConfirmationStatus(status).catch(() => {})
})

const onProfileUpdated = async (updatedUser) => {
  if (updatedUser?.phoneNumber) {
    userPhone.value = formatCompactPhone(updatedUser.phoneNumber)
  }

  if (updatedUser?.email) {
    userEmail.value = updatedUser.email
  }

  if (typeof updatedUser?.emailVerified === 'boolean') {
    isEmailVerified.value = updatedUser.emailVerified
  }

  if (typeof updatedUser?.phoneNumberVerified === 'boolean') {
    isPhoneVerified.value = updatedUser.phoneNumberVerified
  }

  await profileStore.refreshProfile()
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-page__container">
      <AppBreadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'Личный кабинет', to: '/profile' }
        ]"
      />

      <h1 class="profile-page__title">
        Личный кабинет
      </h1>

      <div class="profile-page__layout">
        <ProfileSidebar
          class="profile-page__sidebar"
          :active-item="activeProfileTab"
          :is-email-verified="isEmailVerified"
          @navigate="setActiveProfileTab"
        />

        <div class="profile-page__content">
          <template v-if="activeProfileTab === 'data'">
            <ProfilePersonalData
              ref="personalDataRef"
              v-model:name="userName"
              v-model:phone="userPhone"
              v-model:email="userEmail"
              v-model:additional-contact="additionalContact"
              v-model:recipient-name="recipientName"
              v-model:recipient-phone="recipientPhone"
              v-model:show-recipient="showRecipient"
              :is-email-verified="isEmailVerified"
              :is-phone-verified="isPhoneVerified"
              :recipients="recipients"
              @updated="onProfileUpdated"
            />

            <ProfileOrganizations
              :organizations="organizations"
              @updated="profileStore.refreshProfile"
            />
            <ProfileNotificationSettings />

            <ProfilePasswordSettings
              :email="userEmail"
              :reset-token="passwordResetToken"
              @reset-token-handled="clearPasswordResetQuery"
            />

            <ProfileDangerZone />

            <ProfileSaveChangesBar
              v-if="hasProfileChanges"
              :pending="isProfileSaving"
              :error="profileSaveError"
              @cancel="cancelProfileChanges"
              @save="saveProfileChanges"
            />
          </template>

          <ProfileFavorites v-else-if="activeProfileTab === 'favorites'" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color-base: #04121b;

.profile-page {
  padding: 1.5rem 0 4rem;

  &__container {
    margin: 0 auto;
    max-width: 1106px;
    width: calc(100% - 32px);
  }

  &__title {
    font-size: 2rem;
    font-weight: 800;
    line-height: 2.5rem;
    color: $color-base;
    margin: 1.5rem 0 2rem;
    font-feature-settings: 'lnum' 1, 'pnum' 1;
  }

  &__layout {
    display: flex;
    gap: 0.375rem;
    align-items: flex-start;
  }

  &__sidebar {
    flex-shrink: 0;
    width: 22.5rem;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    flex: 1;
    min-width: 0;
  }
}

@media (max-width: 960px) {
  .profile-page {
    &__layout {
      flex-direction: column;
    }

    &__sidebar {
      width: 100%;
    }
  }
}
</style>

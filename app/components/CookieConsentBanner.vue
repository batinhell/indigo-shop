<script setup>
const CONSENT_STORAGE_KEY = 'indigo_cookie_consent'

const isVisible = ref(false)

onMounted(() => {
  isVisible.value = window.localStorage.getItem(CONSENT_STORAGE_KEY) !== 'accepted'
})

function acceptCookies() {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted')
  isVisible.value = false
}
</script>

<template>
  <Transition name="cookie-consent">
    <aside
      v-if="isVisible"
      class="cookie-consent"
      aria-label="Уведомление об использовании cookies"
    >
      <p class="cookie-consent__text">
        Пользуясь нашим сайтом, вы соглашаетесь с тем, что мы используем
        <NuxtLink
          to="/cookie-policy"
          class="cookie-consent__link"
        >
          cookies
        </NuxtLink>
      </p>

      <AppButton
        class="cookie-consent__button"
        size="m"
        type="button"
        @click="acceptCookies"
      >
        Ок
      </AppButton>
    </aside>
  </Transition>
</template>

<style scoped>
.cookie-consent {
  align-items: center;
  background: #fff;
  border-radius: 2rem;
  bottom: 2rem;
  box-shadow: 0 0 12px rgba(201, 37, 255, 0.1);
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  left: 50%;
  max-width: calc(100vw - 2rem);
  padding: 0.75rem 0.75rem 0.75rem 2rem;
  position: fixed;
  transform: translateX(-50%);
  width: 50.0625rem;
  z-index: 1000;
}

.cookie-consent__text {
  color: #091e2a;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
  margin: 0;
  white-space: nowrap;
}

.cookie-consent__link {
  color: #de7aff;
  text-decoration: underline;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}

.cookie-consent__link:hover {
  color: #c925ff;
}

.cookie-consent__link:active {
  color: #a020c0;
}

.cookie-consent__button {
  flex: 0 0 7.8125rem;
  height: 2.5rem;
}

.cookie-consent-enter-active,
.cookie-consent-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.cookie-consent-enter-from,
.cookie-consent-leave-to {
  opacity: 0;
  transform: translate(-50%, 0.75rem);
}

@media (max-width: 840px) {
  .cookie-consent {
    align-items: stretch;
    bottom: 1rem;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
    width: calc(100vw - 1.5rem);
  }

  .cookie-consent__text {
    white-space: normal;
  }

  .cookie-consent__button {
    flex-basis: auto;
    width: 100%;
  }
}
</style>

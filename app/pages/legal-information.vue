<script setup>
const title = 'Правовая информация — Indigo'
const description = 'Юридические документы интернет-магазина «Индиго».'

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Правовая информация', to: '' }
]

const legalPages = [
  {
    label: 'Оплата',
    to: '/payment'
  },
  {
    label: 'Доставка',
    to: '/delivery'
  },
  {
    label: 'Политика конфиденциальности интернет-магазина «Индиго»',
    to: '/privacy-policy'
  },
  {
    label: 'Правовая информация',
    to: '/legal-information'
  },
  {
    label: 'Пользовательское соглашение интернет-магазина типографии «Индиго»',
    to: '/user-agreement'
  },
  {
    label: 'Политика использования файлов cookie',
    to: '/cookie-policy'
  }
]

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <main class="legal-page">
    <div class="legal-page__container">
      <div class="legal-page__intro">
        <AppBreadcrumbs
          :items="breadcrumbs"
          class="legal-page__breadcrumbs"
        />
        <h1 class="legal-page__title">
          Правовая информация
        </h1>
      </div>

      <ul class="legal-page__list">
        <li
          v-for="item in legalPages"
          :key="item.label"
          class="legal-page__item"
        >
          <NuxtLink
            :to="item.to"
            class="legal-page__link"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.legal-page {
  padding-bottom: 4rem;
  padding-top: 0;
}

.legal-page__container {
  margin: 0 auto;
  max-width: 1106px;
  width: calc(100% - 32px);
}

.legal-page__intro {
  display: flex;
  flex-direction: column;
}

.legal-page__breadcrumbs {
  margin-bottom: 0;
}

.legal-page__title {
  color: #04121b;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.6;
  margin: 0;
}

.legal-page__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 4rem 0 0;
  padding: 0;
}

.legal-page__link {
  color: #de7aff;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  text-decoration: none;
  text-decoration-line: underline;
}

.legal-page__link:hover {
  color: #c925ff;
}

.legal-page__link:active {
  color: #a020c0;
}

.legal-page__link:focus-visible {
  border-radius: 0.25rem;
  outline: 2px solid rgba(201, 37, 255, 0.45);
  outline-offset: 0.125rem;
}

@media (max-width: 1120px) {
  .legal-page__title {
    line-height: 1.4;
  }
}

@media (max-width: 720px) {
  .legal-page {
    padding-bottom: 3rem;
    padding-top: 0;
  }

  .legal-page__container {
    width: calc(100% - 24px);
  }

  .legal-page__title {
    font-size: 1.75rem;
    line-height: 2rem;
  }

  .legal-page__list {
    margin-top: 2.5rem;
  }

  .legal-page__link {
    font-size: 1.125rem;
    line-height: 1.375rem;
  }
}
</style>

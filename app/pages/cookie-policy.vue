<script setup>
const title = 'Политика использования файлов cookie — Indigo'
const description = 'Политика использования файлов cookie интернет-магазина «Индиго».'

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Правовая информация', to: '/legal-information' },
  { label: 'Политика использования файлов cookie', to: '' }
]

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <main class="cookie-page">
    <div class="cookie-page__container">
      <AppBreadcrumbs
        :items="breadcrumbs"
        class="cookie-page__breadcrumbs"
      />

      <article class="cookie-page__card">
        <h1 class="cookie-page__title">
          Политика использования файлов cookie
        </h1>

        <p class="cookie-page__text">
          Текст страницы будет добавлен отдельно.
        </p>
      </article>
    </div>
  </main>
</template>

<style scoped>
.cookie-page {
  padding-top: 0;
}

.cookie-page__container {
  margin: 0 auto;
  max-width: 1106px;
  width: calc(100% - 32px);
}

.cookie-page__breadcrumbs {
  margin-bottom: 1.5rem;
}

.cookie-page__card {
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 0 24px rgba(201, 37, 255, 0.1);
  padding: 4rem 5.875rem;
}

.cookie-page__title {
  color: #04121b;
  font-size: 2rem;
  font-weight: 800;
  line-height: 2.25rem;
  margin: 0;
}

.cookie-page__text {
  color: #04121b;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 1.5rem 0 0;
}

@media (max-width: 1120px) {
  .cookie-page__card {
    padding: 3rem;
  }
}

@media (max-width: 720px) {
  .cookie-page {
    padding-top: 0;
  }

  .cookie-page__container {
    width: calc(100% - 24px);
  }

  .cookie-page__card {
    border-radius: 1.5rem;
    padding: 2rem 1.25rem;
  }

  .cookie-page__title {
    font-size: 1.75rem;
    line-height: 2rem;
  }
}
</style>

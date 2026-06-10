<script setup>
const title = 'Политика использования файлов cookie — Indigo'
const description = 'Политика использования файлов cookie интернет-магазина типографии «Индиго».'

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Правовая информация', to: '/legal-information' },
  { label: 'Политика cookie', to: '' }
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
          <br>
          интернет-магазина типографии «Индиго»
        </h1>

        <p class="cookie-page__date">
          «___» __________ 20__ г.
        </p>

        <div class="cookie-page__content">
          <section class="cookie-section">
            <h2 class="cookie-section__title"><span class="cookie-section__number">1.</span>Что такое cookie</h2>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">1.1.</span>Cookie — небольшие текстовые файлы, которые сохраняются на устройстве Пользователя при посещении сайта.</p>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">1.2.</span>Cookie не содержат персональных данных и не могут использоваться для идентификации личности Пользователя без дополнительной информации.</p>
          </section>

          <section class="cookie-section">
            <h2 class="cookie-section__title"><span class="cookie-section__number">2.</span>Какие cookie мы используем</h2>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">2.1.</span>Необходимые cookie — обеспечивают работу сайта, авторизацию, корзину и оформление заказа. Без них сайт не может функционировать. Срок хранения — до закрытия браузера или до 30 дней.</p>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">2.2.</span>Функциональные cookie — сохраняют настройки Пользователя: выбранный город, язык, историю просмотров. Срок хранения — до 1 года.</p>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">2.3.</span>Аналитические cookie — помогают понять, как Пользователи взаимодействуют с сайтом: какие страницы посещают, сколько времени проводят. Данные собираются в обезличенном виде. Срок хранения — до 2 лет.</p>
          </section>

          <section class="cookie-section">
            <h2 class="cookie-section__title"><span class="cookie-section__number">3.</span>Зачем мы используем cookie</h2>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">3.1.</span>Обеспечение корректной работы сайта и его функций.</p>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">3.2.</span>Сохранение товаров в корзине между сессиями.</p>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">3.3.</span>Запоминание настроек и предпочтений Пользователя.</p>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">3.4.</span>Анализ посещаемости и улучшение работы сайта.</p>
          </section>

          <section class="cookie-section">
            <h2 class="cookie-section__title"><span class="cookie-section__number">4.</span>Управление cookie</h2>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">4.1.</span>Пользователь может в любой момент отключить или удалить cookie через настройки своего браузера.</p>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">4.2.</span>Отключение cookie может привести к ограничению функциональности сайта: невозможность авторизации, потеря товаров в корзине, сброс настроек.</p>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">4.3.</span>Инструкции по управлению cookie доступны в справочных разделах используемого браузера.</p>
          </section>

          <section class="cookie-section">
            <h2 class="cookie-section__title"><span class="cookie-section__number">5.</span>Изменение политики</h2>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">5.1.</span>Продавец вправе обновлять настоящую Политику. Актуальная версия всегда размещена на данной странице.</p>
            <p class="cookie-section__text"><span class="cookie-section__subnumber">5.2.</span>Продолжение использования сайта после публикации изменений означает согласие Пользователя с новой редакцией Политики.</p>
          </section>

          <section class="cookie-section">
            <h2 class="cookie-section__title cookie-section__title">Контакты</h2>
            <p class="cookie-section__contact">
              По вопросам обработки данных:
              <br>
              Email: Info@indigo-mail.ru
              <br>
              Телефон: +7 (949) 131-45-44
            </p>
          </section>
        </div>
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
  --number-width: 1.5rem;
  --gap: 0.5rem;

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

.cookie-page__date {
  color: rgba(4, 18, 27, 0.38);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 3rem 0 0;
}

.cookie-page__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
}

.cookie-section {
  --subnumber-width: 2rem;
  --title-offset: calc(var(--number-width) + var(--gap));

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cookie-section__title {
  align-items: flex-start;
  color: #04121b;
  display: flex;
  font-size: 1.625rem;
  font-weight: 700;
  gap: var(--gap);
  letter-spacing: -0.0325rem;
  line-height: 1.75rem;
  margin: 0;
}

.cookie-section__title_plain {
  display: block;
  font-weight: 600;
  letter-spacing: 0;
}

.cookie-section__number {
  color: rgba(4, 18, 27, 0.64);
  flex-shrink: 0;
  text-align: right;
  width: var(--number-width);
}

.cookie-section__text {
  color: #04121b;
  display: flex;
  font-size: 0.875rem;
  font-weight: 600;
  gap: var(--gap);
  line-height: 1.125rem;
  margin: 0;
}

.cookie-section__subnumber {
  color: rgba(4, 18, 27, 0.64);
  flex-shrink: 0;
  margin-left: var(--title-offset);
  text-align: left;
  width: var(--subnumber-width);
}

.cookie-section__contact {
  color: #04121b;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 0;
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
    font-size: 1.625rem;
    line-height: 1.875rem;
  }

  .cookie-page__date {
    margin-top: 1.5rem;
  }

  .cookie-page__content {
    gap: 1.25rem;
    margin-top: 1.5rem;
  }

  .cookie-section {
    --number-width: 1.5rem;
    --gap: 0.5rem;
    --subnumber-width: 1.8rem;
    --title-offset: calc(var(--number-width) + var(--gap));
  }

  .cookie-section__title {
    font-size: 1.375rem;
    letter-spacing: 0;
    line-height: 1.625rem;
  }

  .cookie-section__subnumber {
    width: var(--subnumber-width);
  }
}
</style>

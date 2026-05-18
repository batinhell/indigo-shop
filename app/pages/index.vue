<script setup>
import progressSmile from '~/assets/icons/landing-progress-smile.svg'
import heroPattern from '~/assets/images/landing-hero-pattern.svg'

const title = 'Типография Индиго'
const description = 'Мы заканчиваем работу над новым сайтом типографии Индиго.'

const openCatalog = () => {
  navigateTo('/catalog')
}

const openMail = () => {
  window.location.href = 'mailto:info@indigo-mail.ru'
}

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <main class="landing-placeholder">
    <section
      class="landing-placeholder__hero"
      aria-labelledby="landing-placeholder-title"
    >
      <img
        :src="heroPattern"
        alt=""
        class="landing-placeholder__pattern"
        aria-hidden="true"
      >

      <div class="landing-placeholder__notice">
        <h1
          id="landing-placeholder-title"
          class="landing-placeholder__title"
        >
          Мы заканчиваем работу<br>
          над новым сайтом
        </h1>
        <p class="landing-placeholder__text">
          И пока проводим тесты. Скоро добавим расширенный каталог,
          онлайн конструктор и много чего еще, а на этом месте будет
          красивый hero block
        </p>
      </div>

      <div class="landing-placeholder__actions">
        <AppButton
          class="landing-placeholder__button"
          @click="openCatalog"
        >
          Каталог товаров
        </AppButton>
        <AppButton
          variant="secondary"
          class="landing-placeholder__button landing-placeholder__button_secondary"
          @click="openMail"
        >
          Обсудить проект
        </AppButton>
      </div>
    </section>

    <section
      class="landing-placeholder__progress"
      aria-labelledby="landing-progress-title"
    >
      <div
        class="landing-placeholder__about"
        aria-hidden="true"
      >
        <h2>О нас</h2>
        <p>Цифры, которые отвечают за качество и сроки</p>
        <div class="landing-placeholder__about-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div class="landing-placeholder__progress-message">
        <h2 id="landing-progress-title">
          Мы еще работаем<br>
          над наполнением главной
        </h2>
        <p>
          Скоро тут появятся: информация о нас, примеры готовых работ,
          ответы на частые вопросы и блок о проектной работе
        </p>
        <img
          :src="progressSmile"
          alt=""
          class="landing-placeholder__smile"
          aria-hidden="true"
        >
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.landing-placeholder {
  background: #faf5ff;
  padding: 2rem 0 1rem;
}

.landing-placeholder__hero,
.landing-placeholder__progress {
  margin: 0 auto;
  max-width: 1106px;
  width: calc(100% - 32px);
}

.landing-placeholder__hero {
  align-items: center;
  background: #ececec;
  border-radius: 4rem;
  display: flex;
  flex-direction: column;
  gap: 12.75rem;
  justify-content: center;
  min-height: 42.5rem;
  overflow: hidden;
  padding: 10.625rem 2rem 4.125rem;
  position: relative;
}

.landing-placeholder__pattern {
  height: 164.62%;
  left: -24.86%;
  max-width: none;
  object-fit: fill;
  position: absolute;
  top: -26.18%;
  width: 133.46%;
}

.landing-placeholder__notice {
  align-items: center;
  background: #fff;
  border-radius: 1.5rem;
  color: rgba(35, 8, 43, 0.36);
  display: flex;
  flex-direction: column;
  gap: 1.3125rem;
  max-width: 35.5rem;
  padding: 1.5rem 2rem;
  position: relative;
  text-align: center;
  z-index: 1;
}

.landing-placeholder__title {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 2.75rem;
  margin: 0;
}

.landing-placeholder__text {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.3125rem;
  margin: 0;
  max-width: 30.25rem;
}

.landing-placeholder__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.landing-placeholder__button {
  text-decoration: none;
}

.landing-placeholder__progress {
  margin-top: 2.8125rem;
  min-height: 35.1875rem;
  overflow: hidden;
  position: relative;
}

.landing-placeholder__about {
  background: #fff;
  border-radius: 4rem;
  height: 35.1875rem;
  inset: 0;
  opacity: 0.32;
  padding: 4rem;
  position: absolute;
}

.landing-placeholder__about h2 {
  color: #04121b;
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 3.75rem;
  margin: 0 0 0.75rem;
}

.landing-placeholder__about p {
  color: rgba(4, 18, 27, 0.52);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.625rem;
  margin: 0;
}

.landing-placeholder__about-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 3.5rem;
}

.landing-placeholder__about-grid span {
  background: rgba(222, 122, 255, 0.08);
  border-radius: 1.5rem;
  display: block;
  height: 17.5rem;
}

.landing-placeholder__progress::after {
  backdrop-filter: blur(1.9px);
  background: linear-gradient(180deg, rgba(250, 245, 255, 0.14) 0%, rgba(250, 245, 255, 0.88) 96%);
  content: '';
  inset: 0 -3rem;
  position: absolute;
  z-index: 1;
}

.landing-placeholder__progress-message {
  color: rgba(35, 8, 43, 0.64);
  left: 50%;
  max-width: 32.625rem;
  position: absolute;
  text-align: center;
  top: 7.625rem;
  transform: translateX(-50%);
  width: calc(100% - 32px);
  z-index: 2;
}

.landing-placeholder__progress-message h2 {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 2.75rem;
  margin: 0 0 2.25rem;
}

.landing-placeholder__progress-message p {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 2rem;
  margin: 0;
}

.landing-placeholder__smile {
  display: block;
  height: 2.5rem;
  margin-top: 1.625rem;
  margin-inline: auto;
  width: 3.9375rem;
}

@media (max-width: 768px) {
  .landing-placeholder {
    padding-top: 1.25rem;
  }

  .landing-placeholder__hero,
  .landing-placeholder__progress {
    width: calc(100% - 24px);
  }

  .landing-placeholder__hero {
    border-radius: 2rem;
    gap: 6rem;
    min-height: 34rem;
    padding: 7rem 1rem 3rem;
  }

  .landing-placeholder__notice {
    border-radius: 1.25rem;
    padding: 1.25rem;
  }

  .landing-placeholder__title,
  .landing-placeholder__progress-message h2 {
    font-size: 1.75rem;
    line-height: 2.125rem;
  }

  .landing-placeholder__text {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .landing-placeholder__actions {
    align-items: stretch;
    flex-direction: column;
    width: min(100%, 18rem);
  }

  .landing-placeholder__progress {
    min-height: 30rem;
  }

  .landing-placeholder__about {
    border-radius: 2rem;
    height: 30rem;
    padding: 2rem;
  }

  .landing-placeholder__about h2 {
    font-size: 2.25rem;
    line-height: 2.625rem;
  }

  .landing-placeholder__about-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .landing-placeholder__about-grid span {
    height: 8rem;
  }

  .landing-placeholder__progress-message {
    top: 6rem;
  }

  .landing-placeholder__progress-message h2 {
    margin-bottom: 1.25rem;
  }

  .landing-placeholder__progress-message p {
    font-size: 1.125rem;
    line-height: 1.625rem;
  }
}
</style>

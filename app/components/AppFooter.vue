<script setup>
import footerLogo from '~/assets/icons/footer-logo.svg'
import footerSbp from '~/assets/icons/footer-sbp.svg'

const catalogLinks = [
  { label: 'Художникам', to: '' },
  { label: 'Свадебное', to: '' },
  { label: 'Фотоальбомы', to: '' },
  { label: 'Текстиль', to: '' },
  { label: 'Оформление магазинов', to: '' },
  { label: 'Подарки', to: '' },
  { label: 'Корпоративная продукция', to: '' },
  { label: 'К мероприятиям', to: '' }
]

const companyLinks = [
  { label: 'О нас', to: '' },
  { label: 'Что мы изготавливаем', to: '/catalog' },
  { label: 'Материалы', to: '' },
  { label: 'Примеры работ', to: '' },
  { label: 'Правовая информация', to: '/legal-information' },
  { label: 'Оплата', to: '/payment' },
  { label: 'Доставка', to: '/delivery' }
]

const bottomLinks = [
  { label: 'Город Верных Сердец', to: '' },
  { label: 'Пользовательское соглашение', to: '/user-agreement' },
  { label: 'Политика конфиденциальности', to: '/privacy-policy' }
]
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__card">
        <div class="footer__top">
          <div class="footer__column">
            <h3 class="footer__title">
              Каталог
            </h3>
            <template
              v-for="item in catalogLinks"
              :key="item.label"
            >
              <NuxtLink
                v-if="item.to"
                :to="item.to"
                class="footer__link"
              >
                {{ item.label }}
              </NuxtLink>
              <a
                v-else
                href="#"
                class="footer__link"
                @click.prevent
              >
                {{ item.label }}
              </a>
            </template>
          </div>

          <div class="footer__column">
            <h3 class="footer__title">
              Компания
            </h3>
            <template
              v-for="item in companyLinks"
              :key="item.label"
            >
              <NuxtLink
                v-if="item.to"
                :to="item.to"
                class="footer__link"
              >
                {{ item.label }}
              </NuxtLink>
              <a
                v-else
                href="#"
                class="footer__link"
                @click.prevent
              >
                {{ item.label }}
              </a>
            </template>
          </div>

          <div class="footer__column footer__contacts">
            <p class="footer__phone-main">
              +7 (949) 131-45-44
            </p>

            <div class="footer__contact-group">
              <p class="footer__contact-line">
                +7 (949) 131-45-45
              </p>
              <p class="footer__contact-line">
                +7 (949) 499-69-79
              </p>
              <a
                href="#"
                class="footer__email"
                @click.prevent
              >
                info@indigo-mail.ru
              </a>
            </div>

            <div class="footer__contact-group">
              <p class="footer__contact-line">
                Донецк, ул. Постышева, 60
              </p>
              <p class="footer__contact-line">
                Пн-Пт с 09:00 до 18:00
              </p>
            </div>

            <div class="footer__social">
              <a
                href="#"
                class="footer__social-button"
                aria-label="Telegram"
                @click.prevent
              >
                <AppIcon
                  name="tg"
                  class="footer__social-icon footer__social-icon_tg"
                />
              </a>
              <a
                href="#"
                class="footer__social-button"
                aria-label="ВКонтакте"
                @click.prevent
              >
                <AppIcon
                  name="vk"
                  class="footer__social-icon footer__social-icon_vk"
                />
              </a>
            </div>
          </div>
        </div>

        <div class="footer__info">
          <div class="footer__info-column">
            <img
              :src="footerLogo"
              alt="Типография Индиго"
              class="footer__logo"
            >
            <p class="footer__legal-text">
              ИП РУЧКО АНАСТАСИЯ ВИКТОРОВНА<br>
              ИНН 930900107014<br>
              ОГРНИП 323930100105541 от 25.01.2023г.<br>
              РФ, ДНР. Донецкий г.о., 283054, г. Донецк, ул. Аристова, д.1.
            </p>
          </div>

          <div class="footer__info-column">
            <img
              :src="footerSbp"
              alt="СБП"
              class="footer__sbp"
            >
            <p class="footer__legal-text footer__legal-text_gap">
              Безналичный расчет<br>
              для юридических лиц и ИП.
            </p>
            <p class="footer__legal-text">
              Информация по приказу Минцифры #511 от 02.06.2025
            </p>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <span class="footer__bottom-item footer__bottom-item_static">© {{ new Date().getFullYear() }}, Типография Индиго</span>
        <template
          v-for="item in bottomLinks"
          :key="item.label"
        >
          <NuxtLink
            v-if="item.to"
            :to="item.to"
            class="footer__bottom-item"
          >
            {{ item.label }}
          </NuxtLink>
          <a
            v-else
            href="#"
            class="footer__bottom-item"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </template>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2rem 0 1rem;
}

.footer__container {
  margin: 0 auto;
  max-width: 1106px;
  width: calc(100% - 32px);
}

.footer__card {
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 0 24px rgba(201, 37, 255, 0.1);
  padding: 4rem 5.875rem;
}

.footer__top {
  column-gap: 2.25rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.footer__column {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__title {
  color: #04121b;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.125rem;
  margin: 0 0 0.3125rem;
}

.footer__link {
  color: rgba(4, 18, 27, 0.52);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  text-decoration: none;
  transition: color 0.15s;
}

.footer__link:hover {
  color: #04121b;
}

.footer__link:active {
  color: rgba(4, 18, 27, 0.72);
}

.footer__link:focus-visible,
.footer__email:focus-visible,
.footer__bottom-item:focus-visible,
.footer__social-button:focus-visible {
  border-radius: 0.375rem;
  outline: 2px solid rgba(201, 37, 255, 0.45);
  outline-offset: 0.125rem;
}

.footer__contacts {
  gap: 1.5rem;
}

.footer__phone-main {
  color: #04121b;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.75rem;
  margin: 0;
}

.footer__contact-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__contact-line {
  color: #04121b;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 0;
}

.footer__email {
  color: #de7aff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  text-decoration: none;
  transition: color 0.15s;
}

.footer__email:hover {
  color: #c925ff;
}

.footer__email:active {
  color: #c000ff;
}

.footer__social {
  display: flex;
  gap: 0.75rem;
}

.footer__social-button {
  align-items: center;
  background: #f9ebff;
  border-radius: 0.5rem;
  color: #de7aff;
  display: inline-flex;
  height: 32px;
  justify-content: center;
  transition: background-color 0.15s;
  width: 32px;
}

.footer__social-button:hover {
  background: #f6e0ff;
}

.footer__social-button:active {
  background: #f2d6ff;
}

.footer__social-icon {
  display: block;
}

.footer__social-icon_tg {
  height: 14px;
  width: 17px;
}

.footer__social-icon_vk {
  height: 13px;
  width: 21px;
}

.footer__info {
  column-gap: 1.375rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 3rem;
}

.footer__info-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__logo {
  height: 45px;
  width: 117px;
}

.footer__sbp {
  height: 32px;
  margin-top: 0.5rem;
  width: 53px;
}

.footer__legal-text {
  color: rgba(4, 18, 27, 0.52);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 0;
}

.footer__legal-text_gap {
  margin-top: 0.375rem;
}

.footer__bottom {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.footer__bottom-item {
  color: rgba(4, 18, 27, 0.52);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  text-decoration: none;
  transition: color 0.15s;
}

.footer__bottom-item:hover {
  color: #04121b;
}

.footer__bottom-item:active {
  color: rgba(4, 18, 27, 0.72);
}

.footer__bottom-item_static {
  cursor: default;
}

.footer__bottom-item_static:hover,
.footer__bottom-item_static:active {
  color: rgba(4, 18, 27, 0.52);
}

@media (max-width: 1120px) {
  .footer__card {
    padding: 3rem;
  }
}

@media (max-width: 900px) {
  .footer__top {
    grid-template-columns: 1fr 1fr;
    row-gap: 2rem;
  }

  .footer__contacts {
    grid-column: 1 / -1;
  }

  .footer__phone-main {
    font-size: 1.5rem;
  }
}

@media (max-width: 720px) {
  .footer {
    padding-top: 1.5rem;
  }

  .footer__container {
    width: calc(100% - 24px);
  }

  .footer__card {
    border-radius: 1.5rem;
    padding: 2rem 1.25rem;
  }

  .footer__top,
  .footer__info {
    grid-template-columns: 1fr;
    row-gap: 1.75rem;
  }

  .footer__phone-main {
    font-size: 1.375rem;
    line-height: 1.625rem;
  }

  .footer__bottom {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.625rem;
  }
}
</style>

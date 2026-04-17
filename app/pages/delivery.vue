<script setup>
const title = 'Доставка — Indigo'
const description = 'Информация о самовывозе, сроках хранения, стоимости и вопросах по доставке.'
const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Правовая информация', to: '/legal-information' },
  { label: 'Доставка', to: '' }
]

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <main class="delivery-page">
    <div class="delivery-page__container">
      <AppBreadcrumbs
        :items="breadcrumbs"
        class="delivery-page__breadcrumbs"
      />

      <article class="delivery-page__card">
        <h1 class="delivery-page__title">
          Доставка
        </h1>

        <div class="delivery-page__content">
          <section class="delivery-page__section">
            <h2 class="delivery-page__h2">
              Способы получения заказа
            </h2>
            <div class="delivery-page__subsection">
              <h3 class="delivery-page__h3">
                Самовывоз
              </h3>
              <p class="delivery-page__text">
                Заберите заказ по адресу: РФ, ДНР. Донецкий г.о., г. Донецк, ул. Постышева, д.60
              </p>
              <p class="delivery-page__text">
                График работы пункта выдачи: Понедельник-Пятница с 09.00 до 18:00, Суббота и Воскресение -выходной
              </p>
              <p class="delivery-page__text">
                Как это работает: вы оформляете заказ → мы собираем его и отправляем уведомление о готовности на email и по SMS → вы приезжаете и забираете заказ.
              </p>
              <p class="delivery-page__text">
                Срок сборки заказа — указывается при оформлении заказа и подтверждается менеджером по телефону. Точный срок зависит от наличия товара на складе и отображается при оформлении заказа.
              </p>
            </div>
          </section>

          <section class="delivery-page__section">
            <h2 class="delivery-page__h2">
              Срок хранения заказа
            </h2>
            <p class="delivery-page__text">
              Готовый заказ хранится в пункте выдачи 14 календарных дней с момента уведомления о готовности. Если заказ не забран в этот срок, мы свяжемся с вами для уточнения. Невостребованный заказ отменяется, оплата не возвращается так как заказ изготовлен с индивидуальными характеристиками.
            </p>
          </section>

          <section class="delivery-page__section">
            <h2 class="delivery-page__h2">
              Что взять с собой
            </h2>
            <p class="delivery-page__text">
              Для получения заказа назовите номер заказа. При оплате через СБП заказ уже оплачен — вам остаётся только забрать его. При безналичном расчёте убедитесь, что оплата поступила (статус заказа — «оплачен»).
            </p>
            <p class="delivery-page__text">
              При получении проверьте комплектность и внешний вид товара в присутствии сотрудника пункта выдачи. После подписания акта приёма-передачи претензии по комплектности не принимаются.
            </p>
          </section>

          <section class="delivery-page__section">
            <h2 class="delivery-page__h2">
              Стоимость
            </h2>
            <p class="delivery-page__text">
              Самовывоз — бесплатно.
            </p>
          </section>

          <section class="delivery-page__section">
            <h2 class="delivery-page__h2">
              География
            </h2>
            <p class="delivery-page__text">
              Пункт выдачи расположен по адресу: РФ, ДНР. Донецкий г.о., г. Донецк, ул. Постышева, д.60
              <br>
              https://yandex.ru/profile/22215369024?lang=ru
            </p>
            <div class="delivery-page__map">
              <span class="delivery-page__map-label">карта</span>
            </div>
          </section>

          <section class="delivery-page__section">
            <h2 class="delivery-page__h2">
              Расширение способов доставки
            </h2>
            <p class="delivery-page__text">
              Актуальные способы получения заказа указаны на этой странице. По мере развития магазина мы будем добавлять новые варианты доставки.
            </p>
          </section>

          <section class="delivery-page__section">
            <h2 class="delivery-page__h2">
              Вопросы по доставке
            </h2>
            <p class="delivery-page__text">
              Если заказ не готов в указанный срок или вам нужно изменить способ получения — свяжитесь с нами:
              <br>
              Тел.: +7 949-499-69-79,
              <br>
              E-mail: info@indigo-mail.ru
            </p>
          </section>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.delivery-page {
  padding-top: 0;
}

.delivery-page__container {
  margin: 0 auto;
  max-width: 1106px;
  width: calc(100% - 32px);
}

.delivery-page__card {
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 0 24px rgba(201, 37, 255, 0.1);
  padding: 4rem 5.875rem;
}

.delivery-page__breadcrumbs {
  margin-bottom: 1.5rem;
}

.delivery-page__title {
  color: #04121b;
  font-size: 2rem;
  font-weight: 800;
  line-height: 2.25rem;
  margin: 0;
}

.delivery-page__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
}

.delivery-page__section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.delivery-page__subsection {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.delivery-page__h2 {
  color: #04121b;
  font-size: 1.625rem;
  font-weight: 700;
  letter-spacing: -0.0325rem;
  line-height: 1.75rem;
  margin: 0;
}

.delivery-page__h3 {
  color: #04121b;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  margin: 0;
}

.delivery-page__text {
  color: #04121b;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 0;
}

.delivery-page__map {
  align-items: center;
  background: #f4f5f6;
  display: flex;
  height: 613px;
  justify-content: center;
  width: 100%;
}

.delivery-page__map-label {
  color: #04121b;
  font-size: 5.7895rem;
  font-weight: 600;
  line-height: 7.443688rem;
}

@media (max-width: 1120px) {
  .delivery-page__card {
    padding: 3rem;
  }

  .delivery-page__map {
    height: 460px;
  }

  .delivery-page__map-label {
    font-size: 4.5rem;
    line-height: 5.75rem;
  }
}

@media (max-width: 720px) {
  .delivery-page {
    padding-top: 0;
  }

  .delivery-page__container {
    width: calc(100% - 24px);
  }

  .delivery-page__card {
    border-radius: 1.5rem;
    padding: 2rem 1.25rem;
  }

  .delivery-page__title {
    font-size: 1.75rem;
    line-height: 2rem;
  }

  .delivery-page__content {
    gap: 1.25rem;
    margin-top: 2.25rem;
  }

  .delivery-page__h2 {
    font-size: 1.375rem;
    letter-spacing: 0;
    line-height: 1.625rem;
  }

  .delivery-page__h3 {
    font-size: 1.125rem;
    line-height: 1.375rem;
  }

  .delivery-page__map {
    height: 280px;
  }

  .delivery-page__map-label {
    font-size: 3rem;
    line-height: 3.75rem;
  }
}
</style>

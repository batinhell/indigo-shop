<script setup>
const title = 'Возврат и отмена заказа — Indigo'
const description = 'Условия возврата и отмены заказа интернет-магазина типографии «Индиго».'

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Правовая информация', to: '/legal-information' },
  { label: 'Возврат и отмена заказа', to: '' }
]

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <main class="return-page">
    <div class="return-page__container">
      <AppBreadcrumbs
        :items="breadcrumbs"
        class="return-page__breadcrumbs"
      />

      <article class="return-page__card">
        <h1 class="return-page__title">
          Возврат и отмена заказа
          <br>
          интернет-магазина типографии «Индиго»
        </h1>

        <p class="return-page__date">
          «___» __________ 20__ г.
        </p>

        <div class="return-page__content">
          <section class="return-section">
            <h2 class="return-section__title"><span class="return-section__number">1.</span>Отмена заказа</h2>
            <p class="return-section__text"><span class="return-section__subnumber">1.1.</span>Заказ можно отменить до момента его передачи в производство. Для этого свяжитесь с нами по телефону или электронной почте и назовите номер заказа.</p>
            <p class="return-section__text"><span class="return-section__subnumber">1.2.</span>Если заказ уже передан в производство, отменить его нельзя — продукция изготавливается индивидуально по параметрам заказа.</p>
            <p class="return-section__text"><span class="return-section__subnumber">1.3.</span>Статус заказа можно отслеживать в личном кабинете на сайте.</p>
          </section>

          <section class="return-section">
            <h2 class="return-section__title"><span class="return-section__number">2.</span>Возврат готовой продукции из каталога</h2>
            <p class="return-section__text"><span class="return-section__subnumber">2.1.</span>Товар надлежащего качества можно вернуть в течение 14 дней с момента получения. Товар должен сохранить товарный вид, потребительские свойства и заводскую упаковку.</p>
            <p class="return-section__text"><span class="return-section__subnumber">2.2.</span>Возврат оформляется при предъявлении документа, подтверждающего покупку.</p>
            <p class="return-section__text"><span class="return-section__subnumber">2.3.</span>Товар ненадлежащего качества (брак, несоответствие заказу) принимается к возврату в любой момент. Продавец заменит товар или вернёт деньги — по выбору Покупателя.</p>
          </section>

          <section class="return-section">
            <h2 class="return-section__title"><span class="return-section__number">3.</span>Продукция по индивидуальному заказу</h2>
            <p class="return-section__text"><span class="return-section__subnumber">3.1.</span>Продукция, изготовленная по индивидуальным параметрам (размер, макет, материал), возврату и обмену не подлежит, если она соответствует согласованному техническому заданию.</p>
            <p class="return-section__text"><span class="return-section__subnumber">3.2.</span>Перечень товаров, не подлежащих возврату и обмену, определяется в соответствии с Постановлением Правительства РФ от 31.12.2020 № 2463.</p>
            <p class="return-section__text"><span class="return-section__subnumber">3.3.</span>Если индивидуальная продукция изготовлена с нарушением согласованных параметров — Продавец переделает её за свой счёт или вернёт денежные средства.</p>
          </section>

          <section class="return-section">
            <h2 class="return-section__title"><span class="return-section__number">4.</span>Порядок возврата денежных средств</h2>
            <p class="return-section__text"><span class="return-section__subnumber">4.1.</span>Денежные средства возвращаются тем же способом, которым была произведена оплата.</p>
            <p class="return-section__text"><span class="return-section__subnumber">4.2.</span>Оплата по СБП или банковской картой — возврат на счёт, с которого была произведена оплата, в течение 10 (десяти) рабочих дней с момента получения товара Продавцом.</p>
            <p class="return-section__text"><span class="return-section__subnumber">4.3.</span>Безналичный расчёт (счёт для юридических лиц) — возврат на расчётный счёт организации в течение 10 (десяти) рабочих дней.</p>
          </section>

          <section class="return-section">
            <h2 class="return-section__title"><span class="return-section__number">5.</span>Оформление возврата</h2>
            <p class="return-section__text"><span class="return-section__subnumber">5.1.</span>Для оформления возврата направьте заявление на электронную почту Info@indigo-mail.ru с указанием: номера заказа, причины возврата, реквизитов для перечисления средств (если отличаются от оплаты).</p>
            <p class="return-section__text"><span class="return-section__subnumber">5.2.</span>Продавец рассматривает заявление на возврат в течение 5 (пяти) рабочих дней с момента его получения.</p>
          </section>

          <section class="return-section">
            <h2 class="return-section__title return-section__title_plain">Контакты</h2>
            <p class="return-section__contact">
              Телефон: +7 (949) 131-45-44
              <br>
              Email: Info@indigo-mail.ru
              <br>
              Адрес для возврата товара: РФ, ДНР, г. Донецк, ул. Постышева, д. 60
            </p>
          </section>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.return-page {
  padding-top: 0;
}

.return-page__container {
  margin: 0 auto;
  max-width: 1106px;
  width: calc(100% - 32px);
}

.return-page__breadcrumbs {
  margin-bottom: 1.5rem;
}

.return-page__card {
  --number-width: 1.5rem;
  --gap: 0.5rem;

  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 0 24px rgba(201, 37, 255, 0.1);
  padding: 4rem 5.875rem;
}

.return-page__title {
  color: #04121b;
  font-size: 2rem;
  font-weight: 800;
  line-height: 2.25rem;
  margin: 0;
}

.return-page__date {
  color: rgba(4, 18, 27, 0.38);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 3rem 0 0;
}

.return-page__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
}

.return-section {
  --subnumber-width: 2rem;
  --title-offset: calc(var(--number-width) + var(--gap));

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.return-section__title {
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

.return-section__title_plain {
  display: block;
}

.return-section__number {
  color: rgba(4, 18, 27, 0.64);
  flex-shrink: 0;
  text-align: right;
  width: var(--number-width);
}

.return-section__text {
  color: #04121b;
  display: flex;
  font-size: 0.875rem;
  font-weight: 600;
  gap: var(--gap);
  line-height: 1.125rem;
  margin: 0;
}

.return-section__subnumber {
  color: rgba(4, 18, 27, 0.64);
  flex-shrink: 0;
  margin-left: var(--title-offset);
  text-align: left;
  width: var(--subnumber-width);
}

.return-section__contact {
  color: #04121b;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 0;
}

@media (max-width: 1120px) {
  .return-page__card {
    padding: 3rem;
  }
}

@media (max-width: 720px) {
  .return-page {
    padding-top: 0;
  }

  .return-page__container {
    width: calc(100% - 24px);
  }

  .return-page__card {
    border-radius: 1.5rem;
    padding: 2rem 1.25rem;
  }

  .return-page__title {
    font-size: 1.625rem;
    line-height: 1.875rem;
  }

  .return-page__date {
    margin-top: 1.5rem;
  }

  .return-page__content {
    gap: 1.25rem;
    margin-top: 1.5rem;
  }

  .return-section {
    --number-width: 1.5rem;
    --gap: 0.5rem;
    --subnumber-width: 1.8rem;
    --title-offset: calc(var(--number-width) + var(--gap));
  }

  .return-section__title {
    font-size: 1.375rem;
    letter-spacing: 0;
    line-height: 1.625rem;
  }

  .return-section__subnumber {
    width: var(--subnumber-width);
  }
}
</style>

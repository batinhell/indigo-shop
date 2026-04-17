<script setup>
const title = 'Оплата — Indigo'
const description = 'Способы оплаты, сроки зачисления, подтверждение оплаты и реквизиты продавца.'
const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Правовая информация', to: '/legal-information' },
  { label: 'Оплата', to: '' }
]

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <main class="payment-page">
    <div class="payment-page__container">
      <AppBreadcrumbs
        :items="breadcrumbs"
        class="payment-page__breadcrumbs"
      />

      <article class="payment-page__card">
        <h1 class="payment-page__title">
          Оплата
        </h1>

        <div class="payment-page__content">
          <section class="payment-page__section">
            <h2 class="payment-page__h2">
              Способы оплаты
            </h2>

            <div class="payment-page__subsection">
              <h3 class="payment-page__h3">
                Система быстрых платежей (СБП)
              </h3>
              <p class="payment-page__text">
                Отсканируйте QR-код в приложении вашего банка. Деньги поступают мгновенно, комиссия для покупателя — 0 ₽. Платежи обрабатываются через эквайринг ВТБ.
              </p>
              <p class="payment-page__text">
                Как это работает: вы оформляете заказ → выбираете «Оплата через СБП» → на экране появляется QR-код → открываете приложение банка → сканируете код → подтверждаете оплату → заказ сразу переходит в статус «оплачен».
              </p>
              <p class="payment-page__text">
                QR-код действует 15 минут. Если не успели оплатить — вернитесь в заказ и запросите новый код. Неоплаченный заказ автоматически отменяется через 30 минут.
              </p>
            </div>

            <div class="payment-page__subsection">
              <h3 class="payment-page__h3">
                Безналичный расчёт для юридических лиц и ИП
              </h3>
              <p class="payment-page__text">
                Оформите заказ через корзину и выберите «Безналичный расчёт». Укажите наименование организации, ИНН и контактный email.
              </p>
              <p class="payment-page__text">
                Как это работает: вы оформляете заказ → мы формируем счёт с уникальным номером заказа → отправляем его через систему ЭДО (Диадок / Контур) и дублируем на email → ваш бухгалтер формирует платёжное поручение → деньги поступают на наш расчётный счёт → заказ переходит в работу.
              </p>
              <p class="payment-page__text">
                Счёт поступит в течение 2 рабочих дней после оформления заказа. Срок оплаты — 2 рабочих дня. До поступления средств заказ находится в статусе «ожидает оплаты». Если оплата не поступила в срок, мы свяжемся с вами для уточнения.
              </p>
              <p class="payment-page__text">
                В назначении платежа обязательно укажите номер заказа — он будет в счёте. Это нужно для автоматической сверки платежа с заказом. Пример: «Оплата по счёту № ИНД-000123 от 01.01.2026».
              </p>
            </div>
          </section>

          <section class="payment-page__section">
            <h2 class="payment-page__h2">
              Валюта и цены
            </h2>
            <p class="payment-page__text">
              Все цены на сайте указаны в российских рублях и включают НДС 5. Цена, зафиксированная в момент оформления заказа, не меняется — даже если товар подорожал после оформления.
            </p>
          </section>

          <section class="payment-page__section">
            <h2 class="payment-page__h2">
              Когда списываются деньги
            </h2>
            <p class="payment-page__text">
              СБП — деньги списываются сразу после подтверждения в приложении банка. Заказ мгновенно переходит в статус «оплачен» и передаётся в сборку.
            </p>
            <p class="payment-page__text">
              Безналичный расчёт — деньги поступают на расчётный счёт в течение 1–3 рабочих дней после формирования платёжного поручения. До поступления средств заказ находится в статусе «ожидает оплаты». После сверки банковской выписки с номером заказа вы получите подтверждение на email.
            </p>
            <p class="payment-page__text">
              Если товара нет в наличии или заказ невозможно выполнить, мы вернём деньги тем же способом, которым вы оплатили. Срок возврата — до 10 рабочих дней.
            </p>
          </section>

          <section class="payment-page__section">
            <h2 class="payment-page__h2">
              Подтверждение оплаты
            </h2>
            <p class="payment-page__text">
              СБП — электронный кассовый чек формируется сразу после оплаты и отправляется на email, указанный при заказе. Чек создаётся автоматически через онлайн-кассу в соответствии с 54-ФЗ и передаётся в ФНС.
            </p>
            <p class="payment-page__text">
              Безналичный расчёт — после поступления средств на расчётный счёт и сверки с заказом мы отправим подтверждение оплаты на email. Закрывающие документы (УПД / накладная/акт) предоставляются через ЭДО.
            </p>
            <p class="payment-page__text payment-page__text_indent">
              • Если подтверждение не пришло — напишите нам: info@indigo-mail.ru
            </p>
          </section>

          <section class="payment-page__section">
            <h2 class="payment-page__h2">
              Безопасность платежей
            </h2>
            <p class="payment-page__text">
              СБП — платежи обрабатываются через эквайринг ВТБ. Оплата проходит в приложении вашего банка — мы не получаем и не храним данные ваших счетов или карт.
            </p>
            <p class="payment-page__text">
              Безналичный расчёт — счета и закрывающие документы передаются через защищённый канал ЭДО с электронной подписью или при получении.
            </p>
            <p class="payment-page__text">
              Сайт работает по протоколу HTTPS — все данные передаются в зашифрованном виде.
            </p>
            <p class="payment-page__text">
              При подозрении на несанкционированное списание — свяжитесь с вашим банком и с нами: info@indigo-mail.ru, +7 949-499-69-79.
            </p>
          </section>

          <section class="payment-page__section">
            <h2 class="payment-page__h2">
              Проблемы с оплатой
            </h2>

            <div class="payment-page__subsection">
              <h3 class="payment-page__h3">
                СБП
              </h3>
              <p class="payment-page__text">
                Если платёж не прошёл, проверьте:
              </p>
              <ul class="payment-page__list">
                <li class="payment-page__text">
                  достаточно ли средств на счёте;
                </li>
                <li class="payment-page__text">
                  поддерживает ли ваш банк оплату по QR-коду через СБП;
                </li>
                <li class="payment-page__text">
                  обновлено ли приложение банка до последней версии;
                </li>
                <li class="payment-page__text">
                  не истёк ли срок действия QR-кода (15 минут).
                </li>
              </ul>
            </div>

            <div class="payment-page__subsection">
              <h3 class="payment-page__h3">
                Безналичный расчёт
              </h3>
              <p class="payment-page__text">
                Если заказ остаётся в статусе «ожидает оплаты», проверьте:
              </p>
              <ul class="payment-page__list">
                <li class="payment-page__text">
                  верно ли указаны реквизиты в платёжном поручении;
                </li>
                <li class="payment-page__text">
                  указан ли номер заказа в назначении платежа;
                </li>
                <li class="payment-page__text">
                  не истёк ли срок оплаты по счёту.
                </li>
              </ul>
            </div>

            <p class="payment-page__text">
              Если деньги отправлены, но статус заказа не изменился в течение 3 рабочих дней — пришлите копию платёжного поручения на info@indigo-mail.ru и мы проведём сверку вручную.
            </p>
            <p class="payment-page__text">
              По любым вопросам: +7 949-499-69-79, info@indigo-mail.ru
            </p>
          </section>

          <section class="payment-page__section">
            <h2 class="payment-page__h2">
              Реквизиты продавца
            </h2>
            <div class="payment-page__requisites">
              <p class="payment-page__text payment-page__text_strong">
                ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ
                <br>
                РУЧКО АНАСТАСИЯ ВИКТОРОВНА
              </p>
              <p class="payment-page__text">
                ИНН 930900107014, ОГРНИП 323930100105541
                <br>
                Юр. Адрес: ДНР, 283054, г. Донецк, Донецкий округ, ул. Аристова, д.1,
                <br>
                р/с 40802810100810222405 в российских рублях, ФИЛИАЛ "ЦЕНТРАЛЬНЫЙ"
                <br>
                БАНКА ВТБ, (ПАО), г Москва. БИК 044525411
                <br>
                30101810145250000411
                <br>
                Тел.: +7 949-131-45-44
                <br>
                E-mail: info@indigo-mail.ru
              </p>
              <p class="payment-page__text">
                ИП
              </p>
              <p class="payment-page__text">
                ____________________ А.В. Ручко
              </p>
            </div>
          </section>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.payment-page {
  padding-top: 0;
}

.payment-page__container {
  margin: 0 auto;
  max-width: 1106px;
  width: calc(100% - 32px);
}

.payment-page__card {
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 0 24px rgba(201, 37, 255, 0.1);
  padding: 4rem 5.875rem;
}

.payment-page__breadcrumbs {
  margin-bottom: 1.5rem;
}

.payment-page__title {
  color: #04121b;
  font-size: 2rem;
  font-weight: 800;
  line-height: 2.25rem;
  margin: 0;
}

.payment-page__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
}

.payment-page__section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.payment-page__subsection {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.payment-page__h2 {
  color: #04121b;
  font-size: 1.625rem;
  font-weight: 700;
  letter-spacing: -0.0325rem;
  line-height: 1.75rem;
  margin: 0;
}

.payment-page__h3 {
  color: #04121b;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  margin: 0;
}

.payment-page__text {
  color: #04121b;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 0;
}

.payment-page__text_indent {
  padding-left: 2.5rem;
}

.payment-page__text_strong {
  font-weight: 700;
}

.payment-page__list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0 0 0 2.5rem;
}

.payment-page__requisites {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

@media (max-width: 1120px) {
  .payment-page__card {
    padding: 3rem;
  }
}

@media (max-width: 720px) {
  .payment-page {
    padding-top: 0;
  }

  .payment-page__container {
    width: calc(100% - 24px);
  }

  .payment-page__card {
    border-radius: 1.5rem;
    padding: 2rem 1.25rem;
  }

  .payment-page__title {
    font-size: 1.75rem;
    line-height: 2rem;
  }

  .payment-page__content {
    gap: 1.25rem;
    margin-top: 2.25rem;
  }

  .payment-page__h2 {
    font-size: 1.375rem;
    letter-spacing: 0;
    line-height: 1.625rem;
  }

  .payment-page__h3 {
    font-size: 1.125rem;
    line-height: 1.375rem;
  }

  .payment-page__text_indent,
  .payment-page__list {
    padding-left: 1.25rem;
  }
}
</style>

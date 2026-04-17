<script setup>
const title = 'Пользовательское соглашение — Indigo'
const description = 'Пользовательское соглашение интернет-магазина «Индиго».'

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Правовая информация', to: '/legal-information' },
  { label: 'Пользовательское соглашение', to: '' }
]

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <main class="agreement-page">
    <div class="agreement-page__container">
      <AppBreadcrumbs
        :items="breadcrumbs"
        class="agreement-page__breadcrumbs"
      />

      <article class="agreement-page__card">
        <h1 class="agreement-page__title">
          Пользовательское соглашение
          <br>
          интернет-магазина «Индиго»
        </h1>

        <p class="agreement-page__date">
          «___» __________ 20__ г.
        </p>

        <div class="agreement-page__content">
          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">1.</span>Основные понятия</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">1.1.</span>Интернет-магазин «Индиго» (далее — Интернет-магазин) — интернет-сайт, расположенный по адресу: [указать URL], на котором представлены товары, предлагаемые Продавцом для приобретения, а также все связанные с ним поддомены.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">1.2.</span>Продавец — ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ РУЧКО АНАСТАСИЯ ВИКТОРОВНА, ОГРНИП 323930100105541 от 25.01.2023г., ИНН 930900107014, Юридический адрес: РФ, ДНР. Донецкий г.о., 283054, г. Донецк, ул. Аристова, д.1. Фактический адрес: РФ, ДНР. Донецкий г.о., г. Донецк, ул. Постышева, д.60. Счёт получателя: 40802810100810222405, корреспондентский счёт банка: 30101810145250000411, ФИЛИАЛ «ЦЕНТРАЛЬНЫЙ» БАНКА ВТБ (ПАО), г. Москва, БИК банка 044525411.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">1.3.</span>Пользователь — физическое или юридическое лицо, получившее доступ к Интернет-магазину посредством сети Интернет и использующее его функциональные возможности.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">1.4.</span>Покупатель — Пользователь, оформивший Заказ в Интернет-магазине.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">1.5.</span>Товар — продукция, представленная к продаже в Интернет-магазине.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">1.6.</span>Заказ — оформленный запрос Покупателя на приобретение и доставку Товаров, выбранных в Интернет-магазине.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">1.7.</span>Личный кабинет — персональный раздел Пользователя на Сайте, доступный после регистрации. Содержит информацию о Заказах, персональные данные и настройки.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">1.8.</span>Содержание сайта — результаты интеллектуальной деятельности, включая тексты, фотографии, иллюстрации, графические элементы, дизайн, структуру, логотипы, товарные знаки, базы данных и иные объекты интеллектуальной собственности, размещённые на Сайте.</p>
          </section>

          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">2.</span>Общие положения</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">2.1.</span>Настоящее Пользовательское соглашение (далее — Соглашение) является публичной офертой в соответствии со статьёй 435 и пунктом 2 статьи 437 Гражданского кодекса Российской Федерации.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">2.2.</span>Соглашение регулирует отношения между Продавцом и Пользователем по использованию Интернет-магазина и его сервисов.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">2.3.</span>Пользователь обязан полностью ознакомиться с Соглашением до начала использования Интернет-магазина. Использование Сайта любым способом — посещение, просмотр каталога, регистрация, оформление Заказа — означает полное и безоговорочное принятие Соглашения.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">2.4.</span>Если Пользователь не согласен с условиями Соглашения, он обязан прекратить использование Интернет-магазина.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">2.5.</span>Продавец вправе изменять Соглашение в одностороннем порядке. Новая редакция вступает в силу с момента её публикации на Сайте. Продолжение использования Сайта после публикации изменений означает согласие Пользователя с новой редакцией.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">2.6.</span>Доступ к каталогу и информационным разделам Интернет-магазина предоставляется бесплатно.</p>
          </section>

          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">3.</span>Регистрация и личный кабинет</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">3.1.</span>Регистрация на Сайте является добровольной и даёт Пользователю доступ к дополнительным функциям: сохранённые адреса доставки, история заказов, список желаний, персональные рекомендации.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">3.2.</span>При регистрации Пользователь указывает: имя, адрес электронной почты, номер телефона и задаёт пароль.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">3.3.</span>Пользователь обязуется предоставлять достоверную и актуальную информацию при регистрации и при оформлении Заказов.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">3.4.</span>Пользователь несёт ответственность за сохранность своих учётных данных. Все действия, совершённые с использованием учётной записи Пользователя, считаются совершёнными самим Пользователем.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">3.5.</span>При подозрении на несанкционированный доступ к учётной записи Пользователь обязан незамедлительно сообщить об этом Продавцу.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">3.6.</span>Продавец вправе заблокировать или удалить учётную запись Пользователя при нарушении условий Соглашения.</p>
          </section>

          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">4.</span>Оформление заказа и оплата</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">4.1.</span>Оформление Заказа возможно как зарегистрированным Пользователем через Личный кабинет, так и без регистрации.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">4.2.</span>Оформляя Заказ, Покупатель подтверждает, что ознакомился с характеристиками Товара, условиями доставки, оплаты и возврата.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">4.3.</span>После оформления Заказа Покупатель получает подтверждение на указанный адрес электронной почты или по номеру телефона.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">4.4.</span>Продавец вправе уточнить детали Заказа, связавшись с Покупателем по указанным контактным данным. Если связаться с Покупателем невозможно в течение двух суток, Заказ аннулируется.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">4.5.</span>Информация о Товаре, представленная в Интернет-магазине (описание, характеристики, изображения), носит справочный характер. Незначительные отличия внешнего вида Товара от изображений на Сайте не являются основанием для отказа от Товара.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">4.6.</span>Цены на Товары указаны в российских рублях. Продавец вправе изменять цены в одностороннем порядке. Цена Товара, указанная в момент оформления Заказа, является окончательной для данного Заказа.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">4.7.</span>Способы оплаты: банковская карта на сайте, электронные платёжные системы. Полный перечень доступных способов оплаты указан на странице оформления Заказа.</p>
          </section>

          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">5.</span>Доставка</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">5.1.</span>Доставка осуществляется методом самовывоза по адресу: ДНР, г. Донецк, ул. Постышева, д.60.</p>
          </section>

          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">6.</span>Возврат и обмен товара</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">6.1.</span>Качество поставляемой по Договору готовой продукции должно соответствовать нормам, стандартам качественных показателей и техническим требованиям, установленным действующими нормативными актами и условиями настоящего Договора, к каждому виду готовой продукции.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">6.2.</span>Приём готовой продукции по количеству и качеству проводится в соответствии с нормативными актами о порядке принятия готовой продукции по количеству и качеству в соответствии с законодательством РФ.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">6.3.</span>Об установлении факта несоответствия поставленной партии готовой продукции условиям Договора по количеству или качеству Покупатель обязан в течение 24 часов письменно уведомить Поставщика. Поставщик в течение 3 (трёх) суток обязан принять все необходимые меры для устранения несоответствий.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">6.4.</span>Согласно закону РФ от 07.02.1992 №2300-1 «О защите прав потребителей» покупатель не имеет права отказаться от товара надлежащего качества, имеющего индивидуально-определённые свойства.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">6.5.</span>При оформлении заказа потребитель подтверждает ознакомление с характеристиками товара, его свойствами и назначением, о чём свидетельствует маркер ознакомления при оформлении заказа.</p>
          </section>

          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">7.</span>Интеллектуальная собственность</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">7.1.</span>Содержание Сайта является собственностью Продавца или используется на законных основаниях и защищено законодательством об интеллектуальной собственности.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">7.2.</span>Использование Содержания Сайта допускается только в личных некоммерческих целях. Копирование, распространение, воспроизведение, переработка и иное использование Содержания без письменного согласия Продавца запрещено.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">7.3.</span>Товарный знак «Индиго» и связанная с ним символика являются собственностью Продавца. Их использование без письменного согласия запрещено.</p>
          </section>

          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">8.</span>Персональные данные</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">8.1.</span>Предоставляя свои персональные данные при регистрации или оформлении Заказа, Пользователь даёт согласие на их обработку Продавцом в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">8.2.</span>Продавец обрабатывает персональные данные в следующих целях: оформление и исполнение Заказов, доставка Товара, связь с Покупателем, рассылка информационных и рекламных сообщений (при согласии Пользователя).</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">8.3.</span>Продавец принимает необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, утраты, изменения и распространения.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">8.4.</span>Порядок сбора, хранения и обработки персональных данных подробно описан в Политике конфиденциальности, размещённой на Сайте. Политика конфиденциальности является неотъемлемой частью настоящего Соглашения.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">8.5.</span>Пользователь вправе в любое время отозвать согласие на обработку персональных данных, направив письменное уведомление Продавцу. Отзыв согласия может повлечь невозможность использования отдельных функций Сайта.</p>
          </section>

          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">9.</span>Обязанности Пользователя</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">9.1.</span>Пользователь обязуется не использовать Интернет-магазин в целях:</p>
            <ul class="agreement-section__list">
              <li>загрузки, распространения или передачи материалов, нарушающих права третьих лиц;</li>
              <li>распространения вредоносного программного обеспечения;</li>
              <li>сбора персональных данных других Пользователей;</li>
              <li>нарушения нормальной работы Сайта;</li>
              <li>введения в заблуждение относительно свойств и характеристик Товаров;</li>
              <li>размещения ложных отзывов или рейтингов;</li>
              <li>совершения действий, нарушающих законодательство Российской Федерации и международные нормы права.</li>
            </ul>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">9.2.</span>Пользователь несёт ответственность за любые действия, совершённые с использованием его учётной записи.</p>
          </section>

          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">10.</span>Ограничение ответственности</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">10.1.</span>Интернет-магазин предоставляется «как есть». Продавец не гарантирует бесперебойную и безошибочную работу Сайта.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">10.2.</span>Продавец не несёт ответственности за временную недоступность Сайта, вызванную техническими работами, сбоями у провайдеров связи или иными обстоятельствами, находящимися вне контроля Продавца.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">10.3.</span>Продавец не несёт ответственности за возможный ущерб, причинённый Пользователю в результате использования или невозможности использования Сайта, а также за действия третьих лиц.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">10.4.</span>Продавец не несёт ответственности за содержание внешних сайтов, ссылки на которые могут присутствовать в Интернет-магазине.</p>
          </section>

          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">11.</span>Рассылки и уведомления</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">11.1.</span>Оформляя Заказ, Покупатель соглашается получать сервисные уведомления о статусе Заказа по электронной почте, SMS или в мессенджерах.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">11.2.</span>Рекламные и информационные рассылки направляются только при наличии отдельного согласия Пользователя. Пользователь вправе отказаться от рассылки в любое время через Личный кабинет или по ссылке в письме.</p>
          </section>

          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">12.</span>Разрешение споров</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">12.1.</span>Все споры и разногласия, возникающие между Пользователем и Продавцом, разрешаются путём переговоров.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">12.2.</span>Если спор не удаётся разрешить в досудебном порядке, он передаётся на рассмотрение в суд по месту нахождения Продавца в соответствии с действующим законодательством Российской Федерации.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">12.3.</span>К настоящему Соглашению и отношениям между Пользователем и Продавцом применяется законодательство Российской Федерации.</p>
          </section>

          <section class="agreement-section">
            <h2 class="agreement-section__title"><span class="agreement-section__number">13.</span>Заключительные положения</h2>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">13.1.</span>Настоящее Соглашение вступает в силу для Пользователя с момента начала использования Интернет-магазина и действует бессрочно.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">13.2.</span>Признание судом недействительности какого-либо положения Соглашения не влечёт недействительности остальных его положений.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">13.3.</span>Бездействие Продавца в случае нарушения Пользователем условий Соглашения не лишает Продавца права предпринять соответствующие действия позднее.</p>
            <p class="agreement-section__text"><span class="agreement-section__subnumber">13.4.</span>По всем вопросам, связанным с исполнением Соглашения, Пользователь может обратиться в службу поддержки: info@indigo-mail.ru, тел.: +7 949-499-69-79.</p>

            <div class="agreement-page__requisites">
              <p class="agreement-page__text agreement-page__text_strong">
                Реквизиты Продавца
                <br>
                ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ
                <br>
                РУЧКО АНАСТАСИЯ ВИКТОРОВНА
              </p>
              <p class="agreement-page__text">
                ИНН 930900107014, ОГРНИП 323930100105541
                <br>
                Юр. адрес: ДНР, 283054, г. Донецк, Донецкий округ, ул. Аристова, д.1
                <br>
                р/с 40802810100810222405 в российских рублях, ФИЛИАЛ "ЦЕНТРАЛЬНЫЙ"
                <br>
                БАНКА ВТБ (ПАО), г. Москва, БИК 044525411, к/с 30101810145250000411
                <br>
                Тел.: +7 949-499-69-79
                <br>
                E-mail: info@indigo-mail.ru
              </p>
              <p class="agreement-page__text">
                ИП
              </p>
              <p class="agreement-page__text">
                ____________________А.В. Ручко
              </p>
            </div>
          </section>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.agreement-page {
  padding-top: 0;
}

.agreement-page__container {
  margin: 0 auto;
  max-width: 1106px;
  width: calc(100% - 32px);
}

.agreement-page__card {
  --number-width: 1.5rem;
  --gap: 0.5rem;

  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 0 24px rgba(201, 37, 255, 0.1);
  padding: 4rem 5.875rem;
}

.agreement-page__breadcrumbs {
  margin-bottom: 1.5rem;
}

.agreement-page__title {
  color: #04121b;
  font-size: 2rem;
  font-weight: 800;
  line-height: 2.25rem;
  margin: 0;
}

.agreement-page__date {
  color: rgba(4, 18, 27, 0.38);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 1.5rem 0 0;
}

.agreement-page__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.agreement-section {
  --subnumber-width: 2.1rem;
  --title-offset: calc(var(--number-width) + var(--gap));
  --text-offset: calc(var(--title-offset) + var(--subnumber-width) + var(--gap));

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.agreement-section__title {
  align-items: center;
  color: #04121b;
  display: flex;
  font-size: 1.625rem;
  font-weight: 700;
  gap: var(--gap);
  letter-spacing: -0.0325rem;
  line-height: 1.75rem;
  margin: 0;
}

.agreement-section__number {
  color: rgba(4, 18, 27, 0.64);
  flex-shrink: 0;
  text-align: right;
}

.agreement-section__text {
  color: #04121b;
  display: flex;
  font-size: 0.875rem;
  font-weight: 600;
  gap: var(--gap);
  line-height: 1.125rem;
  margin: 0;
}

.agreement-section__subnumber {
  color: rgba(4, 18, 27, 0.64);
  flex-shrink: 0;
  margin-left: var(--title-offset);
  text-align: left;
  width: var(--subnumber-width);
}

.agreement-section__list {
  color: #04121b;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  font-weight: 600;
  gap: 0.25rem;
  line-height: 1.125rem;
  list-style: none;
  margin: 0 0 0 var(--text-offset);
  padding-left: 2rem;
}

.agreement-page__requisites {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding-left: 2.5rem;
}

.agreement-page__text {
  color: #04121b;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 0;
}

.agreement-page__text_strong {
  font-weight: 700;
}

@media (max-width: 1120px) {
  .agreement-page__card {
    padding: 3rem;
  }
}

@media (max-width: 720px) {
  .agreement-page {
    padding-top: 0;
  }

  .agreement-page__container {
    width: calc(100% - 24px);
  }

  .agreement-page__card {
    border-radius: 1.5rem;
    padding: 2rem 1.25rem;
  }

  .agreement-page__title {
    font-size: 1.625rem;
    line-height: 1.875rem;
  }

  .agreement-page__content {
    gap: 1.25rem;
  }

  .agreement-section__title {
    font-size: 1.375rem;
    letter-spacing: 0;
    line-height: 1.625rem;
  }

  .agreement-section {
    --number-width: 1.5rem;
    --gap: 0.5rem;
    --subnumber-width: 1.8rem;
    --title-offset: calc(var(--number-width) + var(--gap));
    --text-offset: calc(var(--title-offset) + var(--subnumber-width) + var(--gap));
  }

  .agreement-section__subnumber {
    width: var(--subnumber-width);
  }

  .agreement-section__list {
    margin-left: var(--text-offset);
    padding-left: 2rem;
  }

  .agreement-page__requisites {
    padding-left: 0;
  }
}
</style>

<script setup>
const title = 'Политика конфиденциальности — Indigo'
const description = 'Политика конфиденциальности интернет-магазина «Индиго».'

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Правовая информация', to: '/legal-information' },
  { label: 'Политика конфиденциальности', to: '' }
]

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <main class="policy-page">
    <div class="policy-page__container">
      <AppBreadcrumbs
        :items="breadcrumbs"
        class="policy-page__breadcrumbs"
      />

      <article class="policy-page__card">
        <h1 class="policy-page__title">
          Политика конфиденциальности
          <br>
          интернет-магазина «Индиго»
        </h1>

        <div class="policy-page__dates">
          <p class="policy-page__date">
            Дата публикации: «___» __________ 20__ г.
          </p>
          <p class="policy-page__date">
            Дата последнего обновления: «___» __________ 20__ г.
          </p>
        </div>

        <div class="policy-page__content">
          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">1.</span>Общие положения</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">1.1.</span>Настоящая Политика конфиденциальности (далее — Политика) определяет порядок сбора, хранения, обработки, использования и защиты персональных данных пользователей интернет-магазина «Индиго», расположенного по адресу: [указать URL] (далее — Сайт).</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">1.2.</span>Оператором персональных данных является ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ РУЧКО АНАСТАСИЯ ВИКТОРОВНА, ОГРНИП 323930100105541 от 25.01.2023г., ИНН 930900107014, Юридический адрес: РФ, ДНР. Донецкий г.о., 283054, г. Донецк, ул. Аристова, д.1. Фактический адрес: РФ, ДНР. Донецкий г.о., г. Донецк, ул. Постышева, д.60 (далее — Оператор).</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">1.3.</span>Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» (с учётом изменений, вступивших в силу в 2025 году), а также иными нормативно-правовыми актами Российской Федерации в области персональных данных.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">1.4.</span>Используя Сайт, заполняя формы обратной связи, оформляя заказ или регистрируя учётную запись, Пользователь даёт согласие на обработку своих персональных данных в соответствии с настоящей Политикой.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">1.5.</span>Если Пользователь не согласен с условиями Политики, он обязан прекратить использование Сайта.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">1.6.</span>Политика распространяется на все персональные данные, которые Оператор получает от Пользователей через Сайт.</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">2.</span>Основные понятия</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">2.1.</span>Персональные данные — любая информация, относящаяся прямо или косвенно к определённому или определяемому физическому лицу (субъекту персональных данных).</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">2.2.</span>Обработка персональных данных — любое действие или совокупность действий с персональными данными: сбор, запись, систематизация, накопление, хранение, уточнение, извлечение, использование, передача, обезличивание, блокирование, удаление, уничтожение.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">2.3.</span>Оператор — лицо, самостоятельно или совместно с другими лицами организующее и осуществляющее обработку персональных данных, а также определяющее цели обработки, состав данных и совершаемые с ними действия.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">2.4.</span>Пользователь — физическое лицо, посещающее Сайт и предоставляющее свои персональные данные через формы на Сайте.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">2.5.</span>Конфиденциальность персональных данных — обязательное требование к Оператору, получившему доступ к персональным данным, не допускать их распространения без согласия субъекта или наличия иного законного основания.</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">3.</span>Перечень собираемых персональных данных</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">3.1.</span>Оператор собирает и обрабатывает следующие персональные данные Пользователей:</p>

            <div class="policy-section__block">
              <p class="policy-section__label">При оформлении заказа:</p>
              <ul class="policy-section__list">
                <li>фамилия, имя, отчество;</li>
                <li>номер телефона;</li>
                <li>адрес электронной почты;</li>
                <li>адрес доставки (город, улица, дом, квартира, почтовый индекс).</li>
              </ul>
            </div>

            <div class="policy-section__block">
              <p class="policy-section__label">При регистрации на Сайте:</p>
              <ul class="policy-section__list">
                <li>имя;</li>
                <li>номер телефона;</li>
                <li>адрес электронной почты;</li>
                <li>пароль (в зашифрованном виде).</li>
              </ul>
            </div>

            <div class="policy-section__block">
              <p class="policy-section__label">При обращении через форму обратной связи:</p>
              <ul class="policy-section__list">
                <li>имя;</li>
                <li>адрес электронной почты или номер телефона;</li>
                <li>текст обращения.</li>
              </ul>
            </div>

            <div class="policy-section__block">
              <p class="policy-section__label">При подписке на рассылку:</p>
              <ul class="policy-section__list">
                <li>адрес электронной почты;</li>
                <li>имя (при указании).</li>
              </ul>
            </div>

            <div class="policy-section__block">
              <p class="policy-section__label">Автоматически при посещении Сайта:</p>
              <ul class="policy-section__list">
                <li>IP-адрес;</li>
                <li>данные файлов cookie;</li>
                <li>тип и версия браузера;</li>
                <li>тип устройства и разрешение экрана;</li>
                <li>источник перехода на Сайт (referrer);</li>
                <li>время и дата посещения;</li>
                <li>просмотренные страницы.</li>
              </ul>
            </div>

            <p class="policy-section__text"><span class="policy-section__subnumber">3.2.</span>Оператор не собирает и не обрабатывает специальные категории персональных данных (расовая принадлежность, политические взгляды, состояние здоровья и т. д.) и биометрические данные.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">3.3.</span>Оператор не проверяет достоверность предоставленных Пользователем данных. Пользователь несёт ответственность за предоставление корректной информации.</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">4.</span>Цели обработки персональных данных</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">4.1.</span>Оператор обрабатывает персональные данные в следующих целях:</p>
            <ul class="policy-section__list">
              <li>оформление и исполнение заказов (подтверждение, сборка, доставка);</li>
              <li>связь с Пользователем по вопросам заказа (уведомления о статусе, уточнение деталей);</li>
              <li>создание и ведение учётной записи Пользователя в личном кабинете;</li>
              <li>обработка обращений и запросов Пользователя через форму обратной связи;</li>
              <li>направление информационных и рекламных рассылок (при наличии отдельного согласия);</li>
              <li>улучшение работы Сайта и качества обслуживания (анализ посещаемости, поведения пользователей);</li>
              <li>соблюдение требований законодательства Российской Федерации (налоговая и бухгалтерская отчётность, 54-ФЗ);</li>
              <li>предотвращение мошеннических действий.</li>
            </ul>
            <p class="policy-section__text"><span class="policy-section__subnumber">4.2.</span>Обработка персональных данных осуществляется исключительно в целях, указанных в п. 4.1. Данные не используются в целях, не совместимых с заявленными.</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">5.</span>Правовые основания обработки</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">5.1.</span>Оператор обрабатывает персональные данные на следующих правовых основаниях:</p>
            <ul class="policy-section__list">
              <li>согласие Пользователя на обработку персональных данных (ст. 6 ч. 1 п. 1 ФЗ-152);</li>
              <li>исполнение договора, стороной которого является Пользователь, — оформление и доставка заказа (ст. 6 ч. 1 п. 5 ФЗ-152);</li>
              <li>соблюдение обязанностей, предусмотренных законодательством (ст. 6 ч. 1 п. 2 ФЗ-152);</li>
              <li>законные интересы Оператора — улучшение качества обслуживания, предотвращение мошенничества (ст. 6 ч. 1 п. 7 ФЗ-152).</li>
            </ul>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">6.</span>Порядок обработки персональных данных</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">6.1.</span>Обработка персональных данных осуществляется автоматизированным способом с использованием средств вычислительной техники и информационных систем.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">6.2.</span>Персональные данные хранятся на серверах, расположенных на территории Российской Федерации, в соответствии с требованиями ч. 5 ст. 18 ФЗ-152.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">6.3.</span>Оператор обеспечивает запись, систематизацию, накопление, хранение, уточнение, извлечение персональных данных с использованием баз данных, находящихся на территории Российской Федерации.</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">7.</span>Сроки обработки и хранения</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">7.1.</span>Персональные данные обрабатываются и хранятся в течение срока, необходимого для достижения целей обработки:</p>
            <ul class="policy-section__list">
              <li>данные заказов — в течение срока действия договора и 5 (пяти) лет после его исполнения (в соответствии с требованиями налогового и бухгалтерского законодательства);</li>
              <li>данные учётной записи — до момента удаления учётной записи Пользователем или по запросу Пользователя;</li>
              <li>данные подписки на рассылку — до отписки Пользователя;</li>
              <li>данные обращений — 1 (один) год с момента обращения;</li>
              <li>данные файлов cookie — в соответствии с настройками браузера Пользователя, но не более 1 (одного) года.</li>
            </ul>
            <p class="policy-section__text"><span class="policy-section__subnumber">7.2.</span>По истечении сроков хранения персональные данные уничтожаются или обезличиваются.</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">8.</span>Передача персональных данных третьим лицам</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">8.1.</span>Оператор вправе передавать персональные данные третьим лицам в следующих случаях:</p>
            <ul class="policy-section__list">
              <li>службам доставки — для доставки заказа (фамилия, имя, телефон, адрес доставки);</li>
              <li>платёжным системам и банкам-эквайерам — для проведения оплаты (передача осуществляется в защищённом режиме, Оператор не хранит данные банковских карт);</li>
              <li>операторам фискальных данных и онлайн-кассам — для формирования и отправки чеков в соответствии с 54-ФЗ;</li>
              <li>сервисам аналитики (Яндекс.Метрика, Google Analytics) — обезличенные данные для анализа посещаемости;</li>
              <li>сервисам email-рассылок — для отправки рассылок (при наличии согласия);</li>
              <li>государственным органам — по запросу в случаях, предусмотренных законодательством РФ.</li>
            </ul>
            <p class="policy-section__text"><span class="policy-section__subnumber">8.2.</span>При передаче данных Оператор заключает с третьими лицами соглашения, обязывающие их обеспечивать конфиденциальность и безопасность полученных данных.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">8.3.</span>Оператор не продаёт и не передаёт персональные данные третьим лицам в рекламных целях без явного согласия Пользователя.</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">9.</span>Защита персональных данных</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">9.1.</span>Оператор принимает необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, уничтожения, изменения, блокирования, копирования, распространения и иных неправомерных действий.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">9.2.</span>Меры защиты включают:</p>
            <ul class="policy-section__list">
              <li>использование протокола HTTPS для шифрования данных при передаче между Пользователем и Сайтом;</li>
              <li>хранение паролей в зашифрованном виде (хэширование);</li>
              <li>ограничение доступа сотрудников к персональным данным (доступ предоставляется только тем сотрудникам, которым он необходим для выполнения должностных обязанностей);</li>
              <li>регулярное обновление программного обеспечения и систем безопасности;</li>
              <li>резервное копирование данных;</li>
              <li>контроль доступа к серверам и информационным системам.</li>
            </ul>
            <p class="policy-section__text"><span class="policy-section__subnumber">9.3.</span>Оператор не хранит данные банковских карт Пользователей. Платежи обрабатываются сертифицированными платёжными системами, соответствующими стандарту PCI DSS.</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">10.</span>Файлы cookie</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">10.1.</span>Сайт использует файлы cookie — небольшие текстовые файлы, сохраняемые на устройстве Пользователя для обеспечения работы Сайта и анализа его использования.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">10.2.</span>Используемые типы cookie:</p>
            <ul class="policy-section__list">
              <li>необходимые — обеспечивают работу корзины, авторизации и основных функций Сайта;</li>
              <li>аналитические — помогают понять, как Пользователи взаимодействуют с Сайтом (Яндекс.Метрика, Google Analytics);</li>
              <li>маркетинговые — используются для показа релевантной рекламы (при наличии).</li>
            </ul>
            <p class="policy-section__text"><span class="policy-section__subnumber">10.3.</span>Пользователь может отключить или ограничить использование cookie в настройках своего браузера. Отключение cookie может привести к ограничению функциональности Сайта (невозможность добавить товар в корзину, авторизоваться и др.).</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">11.</span>Права Пользователя</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">11.1.</span>Пользователь вправе:</p>
            <ul class="policy-section__list">
              <li>получить информацию об обработке своих персональных данных (перечень данных, цели обработки, сроки хранения, кому передаются);</li>
              <li>потребовать уточнения, обновления или исправления своих персональных данных;</li>
              <li>потребовать удаления своих персональных данных;</li>
              <li>отозвать согласие на обработку персональных данных;</li>
              <li>потребовать прекращения обработки персональных данных в целях продвижения товаров и услуг (отказ от рассылки);</li>
              <li>обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных (Роскомнадзор) или в судебном порядке.</li>
            </ul>
            <p class="policy-section__text"><span class="policy-section__subnumber">11.2.</span>Для реализации своих прав Пользователь может направить письменный запрос Оператору: по электронной почте: info@indigo-mail.ru и уведомить оператора по телефону +7 949 499 69 79;</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">11.3.</span>Оператор рассматривает запрос в течение 10 (десяти) рабочих дней с момента получения и направляет ответ Пользователю.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">11.4.</span>Отзыв согласия на обработку персональных данных может повлечь невозможность использования отдельных функций Сайта (личный кабинет, оформление заказа). Данные, обработка которых обусловлена законодательством (налоговая отчётность), сохраняются до истечения установленных сроков.</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">12.</span>Обработка данных несовершеннолетних</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">12.1.</span>Сайт не предназначен для лиц младше 18 лет. Оператор не собирает персональные данные несовершеннолетних намеренно.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">12.2.</span>Если Оператору станет известно, что персональные данные были предоставлены несовершеннолетним без согласия законного представителя, такие данные будут удалены.</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">13.</span>Ответственный за обработку персональных данных</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">13.1.</span>Ответственным за организацию обработки персональных данных назначен: ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ РУЧКО АНАСТАСИЯ ВИКТОРОВНА.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">13.2.</span>Контактные данные ответственного лица:</p>
            <ul class="policy-section__list">
              <li>электронная почта: info@indigo-mail.ru</li>
              <li>телефон: +7 949-499-69-79</li>
            </ul>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">14.</span>Уведомление Роскомнадзора</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">14.1.</span>Оператор подал уведомление об обработке персональных данных в Роскомнадзор в соответствии со ст. 22 ФЗ-152.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">14.2.</span>Сведения об Операторе внесены в реестр операторов персональных данных. Проверить запись можно на сайте Роскомнадзора: https://pd.rkn.gov.ru/operators-registry/operators-list/</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">15.</span>Изменение Политики</h2>
            <p class="policy-section__text"><span class="policy-section__subnumber">15.1.</span>Оператор вправе вносить изменения в настоящую Политику. Новая редакция вступает в силу с момента её публикации на Сайте по адресу: [указать URL страницы политики].</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">15.2.</span>Дата последнего обновления указана в начале документа.</p>
            <p class="policy-section__text"><span class="policy-section__subnumber">15.3.</span>Продолжение использования Сайта после публикации изменений означает согласие Пользователя с новой редакцией Политики.</p>
          </section>

          <section class="policy-section">
            <h2 class="policy-section__title"><span class="policy-section__number">16.</span>Реквизиты Оператора</h2>
            <div class="policy-page__requisites">
              <p class="policy-page__text policy-page__text_strong">
                ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ
                <br>
                РУЧКО АНАСТАСИЯ ВИКТОРОВНА
              </p>
              <p class="policy-page__text">
                ИНН 930900107014, ОГРНИП 323930100105541
                <br>
                Юр. Адрес: ДНР, 283054, г. Донецк, Донецкий округ, ул. Аристова, д.1,
                <br>
                р/с 40802810100810222405 в российских рублях, ФИЛИАЛ "ЦЕНТРАЛЬНЫЙ"
                <br>
                БАНКА ВТБ, (ПАО), г Москва. БИК 044525411 30101810145250000411
                <br>
                Тел.: +7 949-499-69-79,
                <br>
                E-mail: info@indigo-mail.ru
              </p>
              <p class="policy-page__text">
                ИП
              </p>
              <p class="policy-page__text">
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
.policy-page {
  padding-top: 0;
}

.policy-page__container {
  margin: 0 auto;
  max-width: 1106px;
  width: calc(100% - 32px);
}

.policy-page__card {
  --policy-number-width: 1.5rem;
  --policy-gap: 0.5rem;

  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 0 24px rgba(201, 37, 255, 0.1);
  padding: 4rem 5.875rem;
}

.policy-page__breadcrumbs {
  margin-bottom: 1.5rem;
}

.policy-page__title {
  color: #04121b;
  font-size: 2rem;
  font-weight: 800;
  line-height: 2.25rem;
  margin: 0;
}

.policy-page__dates {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.policy-page__date {
  color: rgba(4, 18, 27, 0.38);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 0;
}

.policy-page__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.policy-section {
  --policy-subnumber-width: 2.1rem;
  --policy-title-offset: calc(var(--policy-number-width) + var(--policy-gap));
  --policy-text-offset: calc(var(--policy-title-offset) + var(--policy-subnumber-width) + var(--policy-gap));

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.policy-section__title {
  align-items: center;
  color: #04121b;
  display: flex;
  font-size: 1.625rem;
  font-weight: 700;
  gap: var(--policy-gap);
  letter-spacing: -0.0325rem;
  line-height: 1.75rem;
  margin: 0;
}

.policy-section__number {
  color: rgba(4, 18, 27, 0.64);
  flex-shrink: 0;
  text-align: right;
}

.policy-section__text {
  color: #04121b;
  display: flex;
  font-size: 0.875rem;
  font-weight: 600;
  gap: 0.5rem;
  line-height: 1.125rem;
  margin: 0;
}

.policy-section__subnumber {
  color: rgba(4, 18, 27, 0.64);
  flex-shrink: 0;
  margin-left: var(--policy-title-offset);
  text-align: left;
  width: var(--policy-subnumber-width);
}

.policy-section__block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.policy-section__label {
  color: #04121b;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 0 0 0 var(--policy-text-offset);
}

.policy-section__list {
  color: #04121b;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  font-weight: 600;
  gap: 0.25rem;
  line-height: 1.125rem;
  list-style: none;
  margin: 0 0 0 var(--policy-text-offset);
  padding-left: 2rem;
}

.policy-section__block .policy-section__list {
  margin-left: var(--policy-text-offset);
}

.policy-page__requisites {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding-left: 2.5rem;
}

.policy-page__text {
  color: #04121b;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin: 0;
}

.policy-page__text_strong {
  font-weight: 700;
}

@media (max-width: 1120px) {
  .policy-page__card {
    padding: 3rem;
  }
}

@media (max-width: 720px) {
  .policy-page {
    padding-top: 0;
  }

  .policy-page__container {
    width: calc(100% - 24px);
  }

  .policy-page__card {
    border-radius: 1.5rem;
    padding: 2rem 1.25rem;
  }

  .policy-page__title {
    font-size: 1.625rem;
    line-height: 1.875rem;
  }

  .policy-page__dates {
    gap: 0.5rem;
    margin-top: 1.25rem;
  }

  .policy-page__content {
    gap: 1.25rem;
  }

  .policy-section__title {
    font-size: 1.375rem;
    letter-spacing: 0;
    line-height: 1.625rem;
  }

  .policy-section {
    --policy-number-width: 1.5rem;
    --policy-gap: 0.5rem;
    --policy-subnumber-width: 1.8rem;
    --policy-title-offset: calc(var(--policy-number-width) + var(--policy-gap));
    --policy-text-offset: calc(var(--policy-title-offset) + var(--policy-subnumber-width) + var(--policy-gap));
  }

  .policy-section__subnumber {
    width: var(--policy-subnumber-width);
  }

  .policy-section__block {
    padding-left: 0;
  }

  .policy-section__list {
    margin-left: var(--policy-text-offset);
    padding-left: 2rem;
  }

  .policy-section__block .policy-section__list {
    margin-left: var(--policy-text-offset);
  }

  .policy-page__requisites {
    padding-left: 0;
  }
}
</style>

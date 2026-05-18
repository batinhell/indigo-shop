import { _ as __nuxt_component_0 } from './AppBreadcrumbs-CDv8EEOG.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, o as useSeoMeta } from './server.mjs';
import '../nitro/nitro.mjs';
import 'better-auth';
import 'better-auth/plugins';
import 'kysely';
import 'mysql2';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'pinia';
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'better-auth/vue';
import 'better-auth/client/plugins';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const title = "Оплата — Indigo";
const description = "Способы оплаты, сроки зачисления, подтверждение оплаты и реквизиты продавца.";
const _sfc_main = {
  __name: "payment",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbs = [
      { label: "Главная", to: "/" },
      { label: "Правовая информация", to: "/legal-information" },
      { label: "Оплата", to: "" }
    ];
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppBreadcrumbs = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "payment-page" }, _attrs))} data-v-9dda55a2><div class="payment-page__container" data-v-9dda55a2>`);
      _push(ssrRenderComponent(_component_AppBreadcrumbs, {
        items: breadcrumbs,
        class: "payment-page__breadcrumbs"
      }, null, _parent));
      _push(`<article class="payment-page__card" data-v-9dda55a2><h1 class="payment-page__title" data-v-9dda55a2> Оплата </h1><div class="payment-page__content" data-v-9dda55a2><section class="payment-page__section" data-v-9dda55a2><h2 class="payment-page__h2" data-v-9dda55a2> Способы оплаты </h2><div class="payment-page__subsection" data-v-9dda55a2><h3 class="payment-page__h3" data-v-9dda55a2> Система быстрых платежей (СБП) </h3><p class="payment-page__text" data-v-9dda55a2> Отсканируйте QR-код в приложении вашего банка. Деньги поступают мгновенно, комиссия для покупателя — 0 ₽. Платежи обрабатываются через эквайринг ВТБ. </p><p class="payment-page__text" data-v-9dda55a2> Как это работает: вы оформляете заказ → выбираете «Оплата через СБП» → на экране появляется QR-код → открываете приложение банка → сканируете код → подтверждаете оплату → заказ сразу переходит в статус «оплачен». </p><p class="payment-page__text" data-v-9dda55a2> QR-код действует 15 минут. Если не успели оплатить — вернитесь в заказ и запросите новый код. Неоплаченный заказ автоматически отменяется через 30 минут. </p></div><div class="payment-page__subsection" data-v-9dda55a2><h3 class="payment-page__h3" data-v-9dda55a2> Безналичный расчёт для юридических лиц и ИП </h3><p class="payment-page__text" data-v-9dda55a2> Оформите заказ через корзину и выберите «Безналичный расчёт». Укажите наименование организации, ИНН и контактный email. </p><p class="payment-page__text" data-v-9dda55a2> Как это работает: вы оформляете заказ → мы формируем счёт с уникальным номером заказа → отправляем его через систему ЭДО (Диадок / Контур) и дублируем на email → ваш бухгалтер формирует платёжное поручение → деньги поступают на наш расчётный счёт → заказ переходит в работу. </p><p class="payment-page__text" data-v-9dda55a2> Счёт поступит в течение 2 рабочих дней после оформления заказа. Срок оплаты — 2 рабочих дня. До поступления средств заказ находится в статусе «ожидает оплаты». Если оплата не поступила в срок, мы свяжемся с вами для уточнения. </p><p class="payment-page__text" data-v-9dda55a2> В назначении платежа обязательно укажите номер заказа — он будет в счёте. Это нужно для автоматической сверки платежа с заказом. Пример: «Оплата по счёту № ИНД-000123 от 01.01.2026». </p></div></section><section class="payment-page__section" data-v-9dda55a2><h2 class="payment-page__h2" data-v-9dda55a2> Валюта и цены </h2><p class="payment-page__text" data-v-9dda55a2> Все цены на сайте указаны в российских рублях и включают НДС 5. Цена, зафиксированная в момент оформления заказа, не меняется — даже если товар подорожал после оформления. </p></section><section class="payment-page__section" data-v-9dda55a2><h2 class="payment-page__h2" data-v-9dda55a2> Когда списываются деньги </h2><p class="payment-page__text" data-v-9dda55a2> СБП — деньги списываются сразу после подтверждения в приложении банка. Заказ мгновенно переходит в статус «оплачен» и передаётся в сборку. </p><p class="payment-page__text" data-v-9dda55a2> Безналичный расчёт — деньги поступают на расчётный счёт в течение 1–3 рабочих дней после формирования платёжного поручения. До поступления средств заказ находится в статусе «ожидает оплаты». После сверки банковской выписки с номером заказа вы получите подтверждение на email. </p><p class="payment-page__text" data-v-9dda55a2> Если товара нет в наличии или заказ невозможно выполнить, мы вернём деньги тем же способом, которым вы оплатили. Срок возврата — до 10 рабочих дней. </p></section><section class="payment-page__section" data-v-9dda55a2><h2 class="payment-page__h2" data-v-9dda55a2> Подтверждение оплаты </h2><p class="payment-page__text" data-v-9dda55a2> СБП — электронный кассовый чек формируется сразу после оплаты и отправляется на email, указанный при заказе. Чек создаётся автоматически через онлайн-кассу в соответствии с 54-ФЗ и передаётся в ФНС. </p><p class="payment-page__text" data-v-9dda55a2> Безналичный расчёт — после поступления средств на расчётный счёт и сверки с заказом мы отправим подтверждение оплаты на email. Закрывающие документы (УПД / накладная/акт) предоставляются через ЭДО. </p><p class="payment-page__text payment-page__text_indent" data-v-9dda55a2> • Если подтверждение не пришло — напишите нам: info@indigo-mail.ru </p></section><section class="payment-page__section" data-v-9dda55a2><h2 class="payment-page__h2" data-v-9dda55a2> Безопасность платежей </h2><p class="payment-page__text" data-v-9dda55a2> СБП — платежи обрабатываются через эквайринг ВТБ. Оплата проходит в приложении вашего банка — мы не получаем и не храним данные ваших счетов или карт. </p><p class="payment-page__text" data-v-9dda55a2> Безналичный расчёт — счета и закрывающие документы передаются через защищённый канал ЭДО с электронной подписью или при получении. </p><p class="payment-page__text" data-v-9dda55a2> Сайт работает по протоколу HTTPS — все данные передаются в зашифрованном виде. </p><p class="payment-page__text" data-v-9dda55a2> При подозрении на несанкционированное списание — свяжитесь с вашим банком и с нами: info@indigo-mail.ru, +7 949-499-69-79. </p></section><section class="payment-page__section" data-v-9dda55a2><h2 class="payment-page__h2" data-v-9dda55a2> Проблемы с оплатой </h2><div class="payment-page__subsection" data-v-9dda55a2><h3 class="payment-page__h3" data-v-9dda55a2> СБП </h3><p class="payment-page__text" data-v-9dda55a2> Если платёж не прошёл, проверьте: </p><ul class="payment-page__list" data-v-9dda55a2><li class="payment-page__text" data-v-9dda55a2> достаточно ли средств на счёте; </li><li class="payment-page__text" data-v-9dda55a2> поддерживает ли ваш банк оплату по QR-коду через СБП; </li><li class="payment-page__text" data-v-9dda55a2> обновлено ли приложение банка до последней версии; </li><li class="payment-page__text" data-v-9dda55a2> не истёк ли срок действия QR-кода (15 минут). </li></ul></div><div class="payment-page__subsection" data-v-9dda55a2><h3 class="payment-page__h3" data-v-9dda55a2> Безналичный расчёт </h3><p class="payment-page__text" data-v-9dda55a2> Если заказ остаётся в статусе «ожидает оплаты», проверьте: </p><ul class="payment-page__list" data-v-9dda55a2><li class="payment-page__text" data-v-9dda55a2> верно ли указаны реквизиты в платёжном поручении; </li><li class="payment-page__text" data-v-9dda55a2> указан ли номер заказа в назначении платежа; </li><li class="payment-page__text" data-v-9dda55a2> не истёк ли срок оплаты по счёту. </li></ul></div><p class="payment-page__text" data-v-9dda55a2> Если деньги отправлены, но статус заказа не изменился в течение 3 рабочих дней — пришлите копию платёжного поручения на info@indigo-mail.ru и мы проведём сверку вручную. </p><p class="payment-page__text" data-v-9dda55a2> По любым вопросам: +7 949-499-69-79, info@indigo-mail.ru </p></section><section class="payment-page__section" data-v-9dda55a2><h2 class="payment-page__h2" data-v-9dda55a2> Реквизиты продавца </h2><div class="payment-page__requisites" data-v-9dda55a2><p class="payment-page__text payment-page__text_strong" data-v-9dda55a2> ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ <br data-v-9dda55a2> РУЧКО АНАСТАСИЯ ВИКТОРОВНА </p><p class="payment-page__text" data-v-9dda55a2> ИНН 930900107014, ОГРНИП 323930100105541 <br data-v-9dda55a2> Юр. Адрес: ДНР, 283054, г. Донецк, Донецкий округ, ул. Аристова, д.1, <br data-v-9dda55a2> р/с 40802810100810222405 в российских рублях, ФИЛИАЛ &quot;ЦЕНТРАЛЬНЫЙ&quot; <br data-v-9dda55a2> БАНКА ВТБ, (ПАО), г Москва. БИК 044525411 <br data-v-9dda55a2> 30101810145250000411 <br data-v-9dda55a2> Тел.: +7 949-131-45-44 <br data-v-9dda55a2> E-mail: info@indigo-mail.ru </p><p class="payment-page__text" data-v-9dda55a2> ИП </p><p class="payment-page__text" data-v-9dda55a2> ____________________ А.В. Ручко </p></div></section></div></article></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/payment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const payment = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9dda55a2"]]);

export { payment as default };
//# sourceMappingURL=payment-D54IO5XE.mjs.map

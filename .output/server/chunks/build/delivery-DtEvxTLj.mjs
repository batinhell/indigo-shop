import { _ as __nuxt_component_0 } from './AppBreadcrumbs-CDv8EEOG.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, l as useSeoMeta } from './server.mjs';
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
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import 'better-auth/vue';
import 'better-auth/client/plugins';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const title = "Доставка — Indigo";
const description = "Информация о самовывозе, сроках хранения, стоимости и вопросах по доставке.";
const _sfc_main = {
  __name: "delivery",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbs = [
      { label: "Главная", to: "/" },
      { label: "Правовая информация", to: "/legal-information" },
      { label: "Доставка", to: "" }
    ];
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppBreadcrumbs = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "delivery-page" }, _attrs))} data-v-c4f431b1><div class="delivery-page__container" data-v-c4f431b1>`);
      _push(ssrRenderComponent(_component_AppBreadcrumbs, {
        items: breadcrumbs,
        class: "delivery-page__breadcrumbs"
      }, null, _parent));
      _push(`<article class="delivery-page__card" data-v-c4f431b1><h1 class="delivery-page__title" data-v-c4f431b1> Доставка </h1><div class="delivery-page__content" data-v-c4f431b1><section class="delivery-page__section" data-v-c4f431b1><h2 class="delivery-page__h2" data-v-c4f431b1> Способы получения заказа </h2><div class="delivery-page__subsection" data-v-c4f431b1><h3 class="delivery-page__h3" data-v-c4f431b1> Самовывоз </h3><p class="delivery-page__text" data-v-c4f431b1> Заберите заказ по адресу: РФ, ДНР. Донецкий г.о., г. Донецк, ул. Постышева, д.60 </p><p class="delivery-page__text" data-v-c4f431b1> График работы пункта выдачи: Понедельник-Пятница с 09.00 до 18:00, Суббота и Воскресение -выходной </p><p class="delivery-page__text" data-v-c4f431b1> Как это работает: вы оформляете заказ → мы собираем его и отправляем уведомление о готовности на email и по SMS → вы приезжаете и забираете заказ. </p><p class="delivery-page__text" data-v-c4f431b1> Срок сборки заказа — указывается при оформлении заказа и подтверждается менеджером по телефону. Точный срок зависит от наличия товара на складе и отображается при оформлении заказа. </p></div></section><section class="delivery-page__section" data-v-c4f431b1><h2 class="delivery-page__h2" data-v-c4f431b1> Срок хранения заказа </h2><p class="delivery-page__text" data-v-c4f431b1> Готовый заказ хранится в пункте выдачи 14 календарных дней с момента уведомления о готовности. Если заказ не забран в этот срок, мы свяжемся с вами для уточнения. Невостребованный заказ отменяется, оплата не возвращается так как заказ изготовлен с индивидуальными характеристиками. </p></section><section class="delivery-page__section" data-v-c4f431b1><h2 class="delivery-page__h2" data-v-c4f431b1> Что взять с собой </h2><p class="delivery-page__text" data-v-c4f431b1> Для получения заказа назовите номер заказа. При оплате через СБП заказ уже оплачен — вам остаётся только забрать его. При безналичном расчёте убедитесь, что оплата поступила (статус заказа — «оплачен»). </p><p class="delivery-page__text" data-v-c4f431b1> При получении проверьте комплектность и внешний вид товара в присутствии сотрудника пункта выдачи. После подписания акта приёма-передачи претензии по комплектности не принимаются. </p></section><section class="delivery-page__section" data-v-c4f431b1><h2 class="delivery-page__h2" data-v-c4f431b1> Стоимость </h2><p class="delivery-page__text" data-v-c4f431b1> Самовывоз — бесплатно. </p></section><section class="delivery-page__section" data-v-c4f431b1><h2 class="delivery-page__h2" data-v-c4f431b1> География </h2><p class="delivery-page__text" data-v-c4f431b1> Пункт выдачи расположен по адресу: РФ, ДНР. Донецкий г.о., г. Донецк, ул. Постышева, д.60 <br data-v-c4f431b1> https://yandex.ru/profile/22215369024?lang=ru </p><div class="delivery-page__map" data-v-c4f431b1><span class="delivery-page__map-label" data-v-c4f431b1>карта</span></div></section><section class="delivery-page__section" data-v-c4f431b1><h2 class="delivery-page__h2" data-v-c4f431b1> Расширение способов доставки </h2><p class="delivery-page__text" data-v-c4f431b1> Актуальные способы получения заказа указаны на этой странице. По мере развития магазина мы будем добавлять новые варианты доставки. </p></section><section class="delivery-page__section" data-v-c4f431b1><h2 class="delivery-page__h2" data-v-c4f431b1> Вопросы по доставке </h2><p class="delivery-page__text" data-v-c4f431b1> Если заказ не готов в указанный срок или вам нужно изменить способ получения — свяжитесь с нами: <br data-v-c4f431b1> Тел.: +7 949-499-69-79, <br data-v-c4f431b1> E-mail: info@indigo-mail.ru </p></section></div></article></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/delivery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const delivery = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c4f431b1"]]);

export { delivery as default };
//# sourceMappingURL=delivery-DtEvxTLj.mjs.map

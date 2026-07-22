import { _ as __nuxt_component_0 } from './AppBreadcrumbs-CDv8EEOG.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, f as useSeoMeta } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:fs/promises';
import 'kysely';
import 'node:child_process';
import 'node:path';
import 'qrcode';
import 'node:fs';
import 'node:https';
import 'better-auth';
import 'better-auth/plugins';
import 'mysql2';
import 'node:http';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'pinia';
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

const title = "Возврат и отмена заказа — Indigo";
const description = "Условия возврата и отмены заказа интернет-магазина типографии «Индиго».";
const _sfc_main = {
  __name: "return-cancellation",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbs = [
      { label: "Главная", to: "/" },
      { label: "Правовая информация", to: "/legal-information" },
      { label: "Возврат и отмена заказа", to: "" }
    ];
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppBreadcrumbs = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "return-page" }, _attrs))} data-v-77e6055a><div class="return-page__container" data-v-77e6055a>`);
      _push(ssrRenderComponent(_component_AppBreadcrumbs, {
        items: breadcrumbs,
        class: "return-page__breadcrumbs"
      }, null, _parent));
      _push(`<article class="return-page__card" data-v-77e6055a><h1 class="return-page__title" data-v-77e6055a> Возврат и отмена заказа <br data-v-77e6055a> интернет-магазина типографии «Индиго» </h1><p class="return-page__date" data-v-77e6055a> «___» __________ 20__ г. </p><div class="return-page__content" data-v-77e6055a><section class="return-section" data-v-77e6055a><h2 class="return-section__title" data-v-77e6055a><span class="return-section__number" data-v-77e6055a>1.</span>Отмена заказа</h2><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>1.1.</span>Заказ можно отменить до момента его передачи в производство. Для этого свяжитесь с нами по телефону или электронной почте и назовите номер заказа.</p><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>1.2.</span>Если заказ уже передан в производство, отменить его нельзя — продукция изготавливается индивидуально по параметрам заказа.</p><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>1.3.</span>Статус заказа можно отслеживать в личном кабинете на сайте.</p></section><section class="return-section" data-v-77e6055a><h2 class="return-section__title" data-v-77e6055a><span class="return-section__number" data-v-77e6055a>2.</span>Возврат готовой продукции из каталога</h2><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>2.1.</span>Товар надлежащего качества можно вернуть в течение 14 дней с момента получения. Товар должен сохранить товарный вид, потребительские свойства и заводскую упаковку.</p><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>2.2.</span>Возврат оформляется при предъявлении документа, подтверждающего покупку.</p><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>2.3.</span>Товар ненадлежащего качества (брак, несоответствие заказу) принимается к возврату в любой момент. Продавец заменит товар или вернёт деньги — по выбору Покупателя.</p></section><section class="return-section" data-v-77e6055a><h2 class="return-section__title" data-v-77e6055a><span class="return-section__number" data-v-77e6055a>3.</span>Продукция по индивидуальному заказу</h2><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>3.1.</span>Продукция, изготовленная по индивидуальным параметрам (размер, макет, материал), возврату и обмену не подлежит, если она соответствует согласованному техническому заданию.</p><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>3.2.</span>Перечень товаров, не подлежащих возврату и обмену, определяется в соответствии с Постановлением Правительства РФ от 31.12.2020 № 2463.</p><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>3.3.</span>Если индивидуальная продукция изготовлена с нарушением согласованных параметров — Продавец переделает её за свой счёт или вернёт денежные средства.</p></section><section class="return-section" data-v-77e6055a><h2 class="return-section__title" data-v-77e6055a><span class="return-section__number" data-v-77e6055a>4.</span>Порядок возврата денежных средств</h2><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>4.1.</span>Денежные средства возвращаются тем же способом, которым была произведена оплата.</p><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>4.2.</span>Оплата по СБП или банковской картой — возврат на счёт, с которого была произведена оплата, в течение 10 (десяти) рабочих дней с момента получения товара Продавцом.</p><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>4.3.</span>Безналичный расчёт (счёт для юридических лиц) — возврат на расчётный счёт организации в течение 10 (десяти) рабочих дней.</p></section><section class="return-section" data-v-77e6055a><h2 class="return-section__title" data-v-77e6055a><span class="return-section__number" data-v-77e6055a>5.</span>Оформление возврата</h2><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>5.1.</span>Для оформления возврата направьте заявление на электронную почту Info@indigo-mail.ru с указанием: номера заказа, причины возврата, реквизитов для перечисления средств (если отличаются от оплаты).</p><p class="return-section__text" data-v-77e6055a><span class="return-section__subnumber" data-v-77e6055a>5.2.</span>Продавец рассматривает заявление на возврат в течение 5 (пяти) рабочих дней с момента его получения.</p></section><section class="return-section" data-v-77e6055a><h2 class="return-section__title return-section__title_plain" data-v-77e6055a>Контакты</h2><p class="return-section__contact" data-v-77e6055a> Телефон: +7 (949) 131-45-44 <br data-v-77e6055a> Email: Info@indigo-mail.ru <br data-v-77e6055a> Адрес для возврата товара: РФ, ДНР, г. Донецк, ул. Постышева, д. 60 </p></section></div></article></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/return-cancellation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const returnCancellation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77e6055a"]]);

export { returnCancellation as default };
//# sourceMappingURL=return-cancellation-DCrjfLuo.mjs.map

import { _ as _export_sfc, b as useRoute, c as __nuxt_component_1$1, d as __vite_glob_0_36, e as _sfc_main$u } from './server.mjs';
import { computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "[orderId]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const orderNumber = computed(() => String(route.params.orderId || "97194154-0050"));
    const orderItems = [
      {
        id: "tirage-1",
        image: __vite_glob_0_36,
        title: "Флаг из флажной сетки",
        description: "Флажная сетка, под древко, 90×135 см, бахрома, печать с двух сторон",
        quantity: "10 000 шт",
        price: "4 800 ₽",
        unitPrice: "2 400 ₽ / шт"
      },
      {
        id: "tirage-2",
        image: __vite_glob_0_36,
        title: "Флаг из флажной сетки",
        description: "Флажная сетка, под древко, 90×135 см, бахрома, печать с двух сторон",
        quantity: "10 000 шт",
        price: "4 800 ₽",
        unitPrice: "2 400 ₽ / шт"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppIcon = __nuxt_component_1$1;
      const _component_UIcon = _sfc_main$u;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "order-page" }, _attrs))} data-v-74edae93><div class="order-page__container" data-v-74edae93><button type="button" class="order-page__back" data-v-74edae93>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "chevron",
        class: "order-page__back-icon"
      }, null, _parent));
      _push(`<span data-v-74edae93>Продолжить покупки</span></button><h1 class="order-page__title" data-v-74edae93> Заказ от 23 марта №${ssrInterpolate(unref(orderNumber))}</h1><div class="order-page__layout" data-v-74edae93><div class="order-page__main" data-v-74edae93><section class="order-info app-card" data-v-74edae93><article class="order-info__card" data-v-74edae93><div class="order-info__card-header" data-v-74edae93><h2 class="order-info__card-title" data-v-74edae93> Самовывоз </h2><button type="button" class="order-info__small-button" data-v-74edae93> Карта </button></div><p class="order-info__text" data-v-74edae93> ДНР, Донецк,<br data-v-74edae93> ул. Постышева, дом 60 </p></article><article class="order-info__card" data-v-74edae93><div class="order-info__card-header" data-v-74edae93><h2 class="order-info__card-title" data-v-74edae93> Получатель </h2><button type="button" class="order-info__small-button" data-v-74edae93> Изменить </button></div><p class="order-info__text" data-v-74edae93> Имя<br data-v-74edae93> Номер телефона </p></article></section><section class="order-items app-card" data-v-74edae93><!--[-->`);
      ssrRenderList(orderItems, (item) => {
        _push(`<article class="order-item-row" data-v-74edae93><div class="order-item-row__image-wrap" data-v-74edae93><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)} class="order-item-row__image" data-v-74edae93></div><div class="order-item-row__content" data-v-74edae93><h2 class="order-item-row__title" data-v-74edae93>${ssrInterpolate(item.title)}</h2><p class="order-item-row__description" data-v-74edae93>${ssrInterpolate(item.description)}</p><p class="order-item-row__quantity" data-v-74edae93>${ssrInterpolate(item.quantity)}</p></div><div class="order-item-row__price" data-v-74edae93><span class="order-item-row__price-value" data-v-74edae93>${ssrInterpolate(item.price)}</span><span class="order-item-row__price-caption" data-v-74edae93>${ssrInterpolate(item.unitPrice)}</span></div></article>`);
      });
      _push(`<!--]--></section></div><aside class="order-page__sidebar" data-v-74edae93><section class="order-summary app-card" data-v-74edae93><h2 class="order-summary__title" data-v-74edae93> Оплачено </h2><div class="order-summary__rows" data-v-74edae93><div class="order-summary__row" data-v-74edae93><span data-v-74edae93>2 тиража</span><strong data-v-74edae93>13 900 ₽</strong></div><div class="order-summary__row order-summary__row--muted" data-v-74edae93><span data-v-74edae93>Доставка</span><span data-v-74edae93>Самовывоз</span></div></div><div class="order-summary__divider" data-v-74edae93></div><button type="button" class="order-summary__repeat" data-v-74edae93> Повторить заказ </button><a href="#" class="order-summary__receipt" data-v-74edae93> Чек об оплате </a></section><section class="order-side-card app-card" data-v-74edae93><div class="order-side-card__copy" data-v-74edae93><h2 class="order-side-card__title" data-v-74edae93> Нужна помощь с заказом? </h2><p class="order-side-card__text" data-v-74edae93> Напишите нам на почту или позвоните администратору </p></div><div class="order-side-card__actions" data-v-74edae93><button type="button" class="order-side-card__icon-button order-side-card__icon-button--secondary" aria-label="Написать на почту" data-v-74edae93>`);
      _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-mail" }, null, _parent));
      _push(`</button><button type="button" class="order-side-card__icon-button order-side-card__icon-button--primary" aria-label="Позвонить" data-v-74edae93>`);
      _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-phone" }, null, _parent));
      _push(`</button></div></section><section class="order-side-card app-card" data-v-74edae93><div class="order-side-card__copy" data-v-74edae93><h2 class="order-side-card__title" data-v-74edae93> Хотите отменить заказ? </h2><p class="order-side-card__text" data-v-74edae93> Вы можете отменить заказ пока мы не начали работать над ним. <a href="#" data-v-74edae93>Подробнее о возврате и обмене товара</a></p></div><button type="button" class="order-side-card__icon-button order-side-card__icon-button--danger" aria-label="Отменить заказ" data-v-74edae93>`);
      _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-x" }, null, _parent));
      _push(`</button></section></aside></div></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/orders/[orderId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _orderId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-74edae93"]]);

export { _orderId_ as default };
//# sourceMappingURL=_orderId_-BVJ1nSgI.mjs.map

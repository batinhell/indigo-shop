import { _ as _export_sfc, b as useRoute, c as useFetch, d as useCart, e as useSeoMeta, f as __nuxt_component_1$1, g as _sfc_main$u, h as __vite_glob_0_36, r as resolveCartItemImage } from './server.mjs';
import { _ as __nuxt_component_0 } from './BaseModal-CJcMIqBf.mjs';
import { computed, withAsyncContext, ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
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
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const orderId = computed(() => String(route.params.orderId || ""));
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      () => `/api/profile/orders/${orderId.value}`,
      {
        default: () => ({ order: null })
      },
      "$UGjF8jyRGJ"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const order = computed(() => data.value?.order || null);
    const orderNumber = computed(() => order.value?.publicNumber || orderId.value);
    const orderItems = computed(() => order.value?.items || []);
    useCart();
    const titleLabel = computed(() => order.value?.titleLabel || `Заказ №${orderNumber.value}`);
    const summary = computed(() => order.value?.summary || {});
    const isMapOpen = ref(false);
    const recipientName = computed(() => order.value?.recipient?.name || "Получатель не указан");
    const recipientPhone = computed(() => order.value?.recipient?.phone || "Телефон не указан");
    const summaryTitle = computed(() => {
      if (order.value?.paymentStatus === "paid") return "Оплачено";
      if (order.value?.paymentStatus === "failed") return "Оплата не прошла";
      if (order.value?.paymentStatus === "expired") return "Оплата истекла";
      if (order.value?.paymentStatus === "cancelled") return "Отменен";
      return "Ожидает оплаты";
    });
    function getItemImage(item) {
      return resolveCartItemImage(item?.config) || __vite_glob_0_36;
    }
    const itemCountLabel = computed(() => {
      const count = Number(summary.value.itemsCount || orderItems.value.length || 0);
      return `${count} ${count === 1 ? "позиция" : "поз."}`;
    });
    useSeoMeta({
      title: () => `${titleLabel.value} | Indigo`,
      description: () => `Детали заказа ${orderNumber.value}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppIcon = __nuxt_component_1$1;
      const _component_UIcon = _sfc_main$u;
      const _component_BaseModal = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "order-page" }, _attrs))} data-v-8af84e15><div class="order-page__container" data-v-8af84e15><button type="button" class="order-page__back" data-v-8af84e15>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "chevron",
        class: "order-page__back-icon"
      }, null, _parent));
      _push(`<span data-v-8af84e15>Продолжить покупки</span></button><h1 class="order-page__title" data-v-8af84e15>${ssrInterpolate(unref(titleLabel))}</h1>`);
      if (unref(pending)) {
        _push(`<p class="order-page__state" data-v-8af84e15> Загружаем заказ… </p>`);
      } else if (unref(error) || !unref(order)) {
        _push(`<p class="order-page__state order-page__state--error" data-v-8af84e15> Не удалось загрузить заказ </p>`);
      } else {
        _push(`<div class="order-page__layout" data-v-8af84e15><div class="order-page__main" data-v-8af84e15><section class="order-info app-card" data-v-8af84e15><article class="order-info__card" data-v-8af84e15><div class="order-info__card-header" data-v-8af84e15><h2 class="order-info__card-title" data-v-8af84e15>${ssrInterpolate(unref(order).delivery?.type || "Самовывоз")}</h2><button type="button" class="order-info__small-button" data-v-8af84e15> Карта </button></div><p class="order-info__text" data-v-8af84e15>${ssrInterpolate(unref(order).delivery?.address || "ДНР, Донецк, ул. Постышева, дом 60")}</p></article><article class="order-info__card" data-v-8af84e15><div class="order-info__card-header" data-v-8af84e15><h2 class="order-info__card-title" data-v-8af84e15> Получатель </h2><button type="button" class="order-info__small-button" disabled data-v-8af84e15> Изменить </button></div><p class="order-info__text" data-v-8af84e15>${ssrInterpolate(unref(recipientName))}<br data-v-8af84e15> ${ssrInterpolate(unref(recipientPhone))}</p></article></section><section class="order-items app-card" data-v-8af84e15><!--[-->`);
        ssrRenderList(unref(orderItems), (item) => {
          _push(`<article class="order-item-row" data-v-8af84e15><div class="order-item-row__image-wrap" data-v-8af84e15><img${ssrRenderAttr("src", getItemImage(item))}${ssrRenderAttr("alt", item.title)} class="order-item-row__image" data-v-8af84e15></div><div class="order-item-row__content" data-v-8af84e15><h2 class="order-item-row__title" data-v-8af84e15>${ssrInterpolate(item.title)}</h2><p class="order-item-row__description" data-v-8af84e15>${ssrInterpolate(item.description)}</p><p class="order-item-row__quantity" data-v-8af84e15>${ssrInterpolate(item.quantityLabel)}</p></div><div class="order-item-row__price" data-v-8af84e15><span class="order-item-row__price-value" data-v-8af84e15>${ssrInterpolate(item.totalPriceLabel)}</span><span class="order-item-row__price-caption" data-v-8af84e15>${ssrInterpolate(item.unitPriceLabel)}</span></div></article>`);
        });
        _push(`<!--]--></section></div><aside class="order-page__sidebar" data-v-8af84e15><section class="order-summary app-card" data-v-8af84e15><h2 class="order-summary__title" data-v-8af84e15>${ssrInterpolate(unref(summaryTitle))}</h2><div class="order-summary__rows" data-v-8af84e15><div class="order-summary__row" data-v-8af84e15><span data-v-8af84e15>${ssrInterpolate(unref(itemCountLabel))}</span><strong data-v-8af84e15>${ssrInterpolate(unref(summary).totalLabel || unref(order).totalPriceLabel)}</strong></div><div class="order-summary__row order-summary__row--muted" data-v-8af84e15><span data-v-8af84e15>Доставка</span><span data-v-8af84e15>${ssrInterpolate(unref(order).delivery?.type || "Самовывоз")}</span></div></div><div class="order-summary__divider" data-v-8af84e15></div>`);
        if (unref(order).canRepeat) {
          _push(`<button type="button" class="order-summary__repeat" data-v-8af84e15> Повторить заказ </button>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(order).receiptUrl) {
          _push(`<a${ssrRenderAttr("href", unref(order).receiptUrl)} class="order-summary__receipt" target="_blank" rel="noopener noreferrer" data-v-8af84e15> Чек об оплате </a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><section class="order-side-card app-card" data-v-8af84e15><div class="order-side-card__copy" data-v-8af84e15><h2 class="order-side-card__title" data-v-8af84e15> Нужна помощь с заказом? </h2><p class="order-side-card__text" data-v-8af84e15> Напишите нам на почту или позвоните администратору </p></div><div class="order-side-card__actions" data-v-8af84e15><button type="button" class="order-side-card__icon-button order-side-card__icon-button--secondary" aria-label="Написать на почту" data-v-8af84e15>`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-mail" }, null, _parent));
        _push(`</button><button type="button" class="order-side-card__icon-button order-side-card__icon-button--primary" aria-label="Позвонить" data-v-8af84e15>`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-phone" }, null, _parent));
        _push(`</button></div></section>`);
        if (unref(order).canCancel) {
          _push(`<section class="order-side-card app-card" data-v-8af84e15><div class="order-side-card__copy" data-v-8af84e15><h2 class="order-side-card__title" data-v-8af84e15> Хотите отменить заказ? </h2><p class="order-side-card__text" data-v-8af84e15> Вы можете отменить заказ пока мы не начали работать над ним. <a href="#" data-v-8af84e15>Подробнее о возврате и обмене товара</a></p></div><button type="button" class="order-side-card__icon-button order-side-card__icon-button--danger" aria-label="Отменить заказ" data-v-8af84e15>`);
          _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-x" }, null, _parent));
          _push(`</button></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</aside></div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_BaseModal, {
        modelValue: unref(isMapOpen),
        "onUpdate:modelValue": ($event) => isRef(isMapOpen) ? isMapOpen.value = $event : null,
        title: "Пункт самовывоза",
        "max-width": "42rem"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="pickup-map-modal" data-v-8af84e15${_scopeId}><div class="pickup-map-modal__map" data-v-8af84e15${_scopeId}><iframe title="Пункт самовывоза Indigo" src="https://yandex.ru/map-widget/v1/?ll=37.802850%2C48.015884&amp;z=16&amp;pt=37.802850,48.015884,pm2rdm" loading="lazy" data-v-8af84e15${_scopeId}></iframe></div><p class="pickup-map-modal__address" data-v-8af84e15${_scopeId}>${ssrInterpolate(unref(order)?.delivery?.address || "ДНР, Донецк, ул. Постышева, дом 60")}</p></section>`);
          } else {
            return [
              createVNode("section", { class: "pickup-map-modal" }, [
                createVNode("div", { class: "pickup-map-modal__map" }, [
                  createVNode("iframe", {
                    title: "Пункт самовывоза Indigo",
                    src: "https://yandex.ru/map-widget/v1/?ll=37.802850%2C48.015884&z=16&pt=37.802850,48.015884,pm2rdm",
                    loading: "lazy"
                  })
                ]),
                createVNode("p", { class: "pickup-map-modal__address" }, toDisplayString(unref(order)?.delivery?.address || "ДНР, Донецк, ул. Постышева, дом 60"), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/orders/[orderId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _orderId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8af84e15"]]);

export { _orderId_ as default };
//# sourceMappingURL=_orderId_-D2SgmBqd.mjs.map

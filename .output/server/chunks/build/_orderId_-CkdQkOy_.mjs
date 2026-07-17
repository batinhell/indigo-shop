import { _ as _export_sfc, c as useRoute, d as useFetch, e as useCart, f as useSeoMeta, g as __nuxt_component_1$1, h as _sfc_main$w, i as __vite_glob_0_37, r as resolveCartItemImage, b as __nuxt_component_0$1 } from './server.mjs';
import { computed, withAsyncContext, ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './BaseModal-C-A_Et6t.mjs';
import { a8 as getSitePaymentStatusLabel, a9 as isSiteOrderInWork } from '../nitro/nitro.mjs';
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
import 'node:fs/promises';
import 'kysely';
import 'node:child_process';
import 'node:path';
import 'better-auth';
import 'better-auth/plugins';
import 'mysql2';
import 'qrcode';
import 'node:fs';
import 'node:https';
import 'node:http';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const _sfc_main$1 = {
  __name: "ProfileOrderRecipientCard",
  __ssrInlineRender: true,
  props: {
    orderId: { type: [Number, String], required: true },
    recipient: { type: Object, default: () => ({}) },
    canEdit: { type: Boolean, default: false }
  },
  emits: ["saved"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isEditing = ref(false);
    const isSaving = ref(false);
    const draft = ref({ name: "", phone: "" });
    const errorMessage = ref("");
    const recipientName = computed(() => props.recipient?.name || "Получатель не указан");
    const recipientPhone = computed(() => props.recipient?.phone || "Телефон не указан");
    function resetDraft() {
      draft.value = {
        name: props.recipient?.name || "",
        phone: props.recipient?.phone || ""
      };
    }
    watch(() => props.recipient, resetDraft, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppInput = __nuxt_component_0$1;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "order-info__card" }, _attrs))} data-v-5d8f8c49><div class="order-info__card-header" data-v-5d8f8c49><h2 class="order-info__card-title" data-v-5d8f8c49>${ssrInterpolate(unref(isEditing) ? "Изменить получателя" : "Получатель")}</h2>`);
      if (!unref(isEditing) && props.canEdit) {
        _push(`<button type="button" class="order-info__small-button" data-v-5d8f8c49> Изменить </button>`);
      } else if (unref(isEditing)) {
        _push(`<div class="order-info__edit-actions" data-v-5d8f8c49><button type="button" class="edit-action edit-action--cancel" aria-label="Отменить изменение получателя"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-5d8f8c49><svg viewBox="0 0 8.56 8.56" fill="none" data-v-5d8f8c49><path fill-rule="evenodd" clip-rule="evenodd" d="M4.28 5.34L7.5 8.56l1.06-1.06L5.34 4.28 8.56 1.06 7.5 0 4.28 3.22 1.06 0 0 1.06l3.22 3.22L0 7.5l1.06 1.06L4.28 5.34Z" fill="#E12E3C" data-v-5d8f8c49></path></svg></button><button type="button" class="edit-action edit-action--confirm" aria-label="Сохранить получателя"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-5d8f8c49><svg viewBox="0 0 9.75 7.55" fill="none" data-v-5d8f8c49><path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 1.2L4.65 7.22a1 1 0 0 1-.7.33 1 1 0 0 1-.71-.32L0 3.53l1.4-1.22 2.53 2.9L8.33 0 9.75 1.2Z" fill="#008A0B" data-v-5d8f8c49></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(isEditing)) {
        _push(`<div class="order-info__recipient-edit" data-v-5d8f8c49>`);
        _push(ssrRenderComponent(_component_AppInput, {
          modelValue: unref(draft).name,
          "onUpdate:modelValue": ($event) => unref(draft).name = $event,
          class: "order-info__recipient-input",
          placeholder: "Имя получателя"
        }, null, _parent));
        _push(ssrRenderComponent(_component_AppInput, {
          modelValue: unref(draft).phone,
          "onUpdate:modelValue": ($event) => unref(draft).phone = $event,
          class: "order-info__recipient-input order-info__recipient-phone",
          placeholder: "Телефон",
          mask: "+7(###)-###-##-##"
        }, null, _parent));
        if (unref(errorMessage)) {
          _push(`<p class="order-info__error" data-v-5d8f8c49>${ssrInterpolate(unref(errorMessage))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<p class="order-info__text" data-v-5d8f8c49>${ssrInterpolate(unref(recipientName))}<br data-v-5d8f8c49> ${ssrInterpolate(unref(recipientPhone))}</p>`);
      }
      _push(`</article>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/OrderRecipientCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5d8f8c49"]]);
const _sfc_main = {
  __name: "[orderId]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const orderId = computed(() => String(route.params.orderId || ""));
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
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
    const summaryTitle = computed(() => getSitePaymentStatusLabel(order.value?.paymentStatus));
    const canDownloadInvoice = computed(
      () => order.value?.paymentStatus === "pending" && order.value?.paymentProvider === "invoice" && Boolean(order.value?.invoice?.downloadUrl)
    );
    const canCancelOrder = computed(() => isSiteOrderInWork(order.value?.workflowStatus));
    const primaryActionLabel = computed(() => canDownloadInvoice.value ? "Скачать счёт в PDF" : "Повторить заказ");
    function getItemImage(item) {
      return resolveCartItemImage(item?.config) || __vite_glob_0_37;
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
      const _component_ProfileOrderRecipientCard = __nuxt_component_1;
      const _component_UIcon = _sfc_main$w;
      const _component_BaseModal = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "order-page" }, _attrs))} data-v-060c1555><div class="order-page__container" data-v-060c1555><button type="button" class="order-page__back" data-v-060c1555>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "chevron",
        class: "order-page__back-icon"
      }, null, _parent));
      _push(`<span data-v-060c1555>Продолжить покупки</span></button><h1 class="order-page__title" data-v-060c1555>${ssrInterpolate(unref(titleLabel))}</h1>`);
      if (unref(pending)) {
        _push(`<p class="order-page__state" data-v-060c1555> Загружаем заказ… </p>`);
      } else if (unref(error) || !unref(order)) {
        _push(`<p class="order-page__state order-page__state--error" data-v-060c1555> Не удалось загрузить заказ </p>`);
      } else {
        _push(`<div class="order-page__layout" data-v-060c1555><div class="order-page__main" data-v-060c1555><section class="order-info app-card" data-v-060c1555><article class="order-info__card" data-v-060c1555><div class="order-info__card-header" data-v-060c1555><h2 class="order-info__card-title" data-v-060c1555>${ssrInterpolate(unref(order).delivery?.type || "Самовывоз")}</h2><button type="button" class="order-info__small-button" data-v-060c1555> Карта </button></div><p class="order-info__text" data-v-060c1555>${ssrInterpolate(unref(order).delivery?.address || "ДНР, Донецк, ул. Постышева, дом 60")}</p></article>`);
        _push(ssrRenderComponent(_component_ProfileOrderRecipientCard, {
          "order-id": unref(order).id,
          recipient: unref(order).recipient,
          "can-edit": unref(canCancelOrder),
          onSaved: unref(refresh)
        }, null, _parent));
        _push(`</section><section class="order-items app-card" data-v-060c1555><!--[-->`);
        ssrRenderList(unref(orderItems), (item) => {
          _push(`<article class="order-item-row" data-v-060c1555><div class="order-item-row__image-wrap" data-v-060c1555><img${ssrRenderAttr("src", getItemImage(item))}${ssrRenderAttr("alt", item.title)} class="order-item-row__image" data-v-060c1555></div><div class="order-item-row__content" data-v-060c1555><h2 class="order-item-row__title" data-v-060c1555>${ssrInterpolate(item.title)}</h2><p class="order-item-row__description" data-v-060c1555>${ssrInterpolate(item.description)}</p><p class="order-item-row__quantity" data-v-060c1555>${ssrInterpolate(item.quantityLabel)}</p></div><div class="order-item-row__price" data-v-060c1555><span class="order-item-row__price-value" data-v-060c1555>${ssrInterpolate(item.totalPriceLabel)}</span><span class="order-item-row__price-caption" data-v-060c1555>${ssrInterpolate(item.unitPriceLabel)}</span></div></article>`);
        });
        _push(`<!--]--></section></div><aside class="order-page__sidebar" data-v-060c1555><section class="order-summary app-card" data-v-060c1555><h2 class="order-summary__title" data-v-060c1555>${ssrInterpolate(unref(summaryTitle))}</h2><div class="order-summary__rows" data-v-060c1555><div class="order-summary__row" data-v-060c1555><span data-v-060c1555>${ssrInterpolate(unref(itemCountLabel))}</span><strong data-v-060c1555>${ssrInterpolate(unref(summary).totalLabel || unref(order).totalPriceLabel)}</strong></div><div class="order-summary__row order-summary__row--muted" data-v-060c1555><span data-v-060c1555>Доставка</span><span data-v-060c1555>${ssrInterpolate(unref(order).delivery?.type || "Самовывоз")}</span></div></div><div class="order-summary__divider" data-v-060c1555></div>`);
        if (unref(order).canRepeat || unref(canDownloadInvoice)) {
          _push(`<button type="button" class="order-summary__repeat" data-v-060c1555>${ssrInterpolate(unref(primaryActionLabel))}</button>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(order).receiptUrl) {
          _push(`<a${ssrRenderAttr("href", unref(order).receiptUrl)} class="order-summary__receipt" target="_blank" rel="noopener noreferrer" data-v-060c1555> Чек об оплате </a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><section class="order-side-card app-card" data-v-060c1555><div class="order-side-card__copy" data-v-060c1555><h2 class="order-side-card__title" data-v-060c1555> Нужна помощь с заказом? </h2><p class="order-side-card__text" data-v-060c1555> Напишите нам на почту или позвоните администратору </p></div><div class="order-side-card__actions" data-v-060c1555><button type="button" class="order-side-card__icon-button order-side-card__icon-button--secondary" aria-label="Написать на почту" data-v-060c1555>`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-mail" }, null, _parent));
        _push(`</button><button type="button" class="order-side-card__icon-button order-side-card__icon-button--primary" aria-label="Позвонить" data-v-060c1555>`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-phone" }, null, _parent));
        _push(`</button></div></section>`);
        if (unref(canCancelOrder)) {
          _push(`<section class="order-side-card app-card" data-v-060c1555><div class="order-side-card__copy" data-v-060c1555><h2 class="order-side-card__title" data-v-060c1555> Хотите отменить заказ? </h2><p class="order-side-card__text" data-v-060c1555> Вы можете отменить заказ пока мы не начали работать над ним. <a href="#" data-v-060c1555>Подробнее о возврате и обмене товара</a></p></div><button type="button" class="order-side-card__icon-button order-side-card__icon-button--danger" aria-label="Отменить заказ" data-v-060c1555>`);
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
            _push2(`<section class="pickup-map-modal" data-v-060c1555${_scopeId}><div class="pickup-map-modal__map" data-v-060c1555${_scopeId}><iframe title="Пункт самовывоза Indigo" src="https://yandex.ru/map-widget/v1/?ll=37.802850%2C48.015884&amp;z=16&amp;pt=37.802850,48.015884,pm2rdm" loading="lazy" data-v-060c1555${_scopeId}></iframe></div><p class="pickup-map-modal__address" data-v-060c1555${_scopeId}>${ssrInterpolate(unref(order)?.delivery?.address || "ДНР, Донецк, ул. Постышева, дом 60")}</p></section>`);
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
const _orderId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-060c1555"]]);

export { _orderId_ as default };
//# sourceMappingURL=_orderId_-CkdQkOy_.mjs.map

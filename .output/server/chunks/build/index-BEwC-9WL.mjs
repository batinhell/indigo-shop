import { i as _sfc_main$m, e as useState, _ as _export_sfc, d as __nuxt_component_1$4, c as _sfc_main$r, b as _sfc_main$e$1, f as fetchDefaults, g as useAsyncData, h as useRequestFetch } from './server.mjs';
import { ref, mergeProps, withCtx, createTextVNode, unref, toDisplayString, isRef, computed, useModel, createVNode, openBlock, createBlock, withDirectives, vModelText, Fragment, renderList, createCommentVNode, mergeModels, renderSlot, watch, toValue, reactive, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderSlot, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderVNode, ssrRenderDynamicModel } from 'vue/server-renderer';
import { c as catalogSliderImage5, a as catalogSliderImage4, b as catalogSliderImage3, d as catalogSliderImage2, e as catalogSliderImage1 } from './catalog_slider_5-DDO4_gbN.mjs';
import { a1 as hash } from '../nitro/nitro.mjs';
import { isPlainObject } from '@vue/shared';
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

const _sfc_main$e = {
  __name: "BaseModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    title: {
      type: String,
      default: ""
    },
    maxWidth: {
      type: String,
      default: "56.25rem"
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    overlayClass: {
      type: String,
      default: "bg-[rgba(35,8,43,0.18)] backdrop-blur-[3px]"
    },
    wrapperClass: {
      type: String,
      default: ""
    }
  }, {
    "modelValue": { required: true },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const isOpen = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$e$1;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event,
        overlay: true,
        close: false,
        scrollable: true,
        ui: {
          content: "w-auto max-w-none bg-transparent ring-0 shadow-none p-0 rounded-none",
          overlay: __props.overlayClass
        }
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(["modal-wrapper", __props.wrapperClass])}" style="${ssrRenderStyle({ "--modal-max-w": __props.maxWidth })}" data-v-c4fe8d77${_scopeId}>`);
            if (__props.showHeader) {
              _push2(`<div class="modal-header" data-v-c4fe8d77${_scopeId}><div class="modal-header__left" data-v-c4fe8d77${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "header-left", {}, null, _push2, _parent2, _scopeId);
              if (__props.title) {
                _push2(`<h2 class="modal-title" data-v-c4fe8d77${_scopeId}>${ssrInterpolate(__props.title)}</h2>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><button class="close-btn" data-v-c4fe8d77${_scopeId}><svg class="close-btn__icon" viewBox="0 0 16 16" fill="none" data-v-c4fe8d77${_scopeId}><path fill-rule="evenodd" clip-rule="evenodd" d="M3.46967 3.46967C3.76256 3.17678 4.23744 3.17678 4.53033 3.46967L8 6.93934L11.4697 3.46967C11.7626 3.17678 12.2374 3.17678 12.5303 3.46967C12.8232 3.76256 12.8232 4.23744 12.5303 4.53033L9.06066 8L12.5303 11.4697C12.8232 11.7626 12.8232 12.2374 12.5303 12.5303C12.2374 12.8232 11.7626 12.8232 11.4697 12.5303L8 9.06066L4.53033 12.5303C4.23744 12.8232 3.76256 12.8232 3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L6.93934 8L3.46967 4.53033C3.17678 4.23744 3.17678 3.76256 3.46967 3.46967Z" fill="currentColor" data-v-c4fe8d77${_scopeId}></path></svg></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: ["modal-wrapper", __props.wrapperClass],
                style: { "--modal-max-w": __props.maxWidth }
              }, [
                __props.showHeader ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "modal-header"
                }, [
                  createVNode("div", { class: "modal-header__left" }, [
                    renderSlot(_ctx.$slots, "header-left", {}, void 0, true),
                    __props.title ? (openBlock(), createBlock("h2", {
                      key: 0,
                      class: "modal-title"
                    }, toDisplayString(__props.title), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("button", {
                    class: "close-btn",
                    onClick: ($event) => isOpen.value = false
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "close-btn__icon",
                      viewBox: "0 0 16 16",
                      fill: "none"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        "clip-rule": "evenodd",
                        d: "M3.46967 3.46967C3.76256 3.17678 4.23744 3.17678 4.53033 3.46967L8 6.93934L11.4697 3.46967C11.7626 3.17678 12.2374 3.17678 12.5303 3.46967C12.8232 3.76256 12.8232 4.23744 12.5303 4.53033L9.06066 8L12.5303 11.4697C12.8232 11.7626 12.8232 12.2374 12.5303 12.5303C12.2374 12.8232 11.7626 12.8232 11.4697 12.5303L8 9.06066L4.53033 12.5303C4.23744 12.8232 3.76256 12.8232 3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L6.93934 8L3.46967 4.53033C3.17678 4.23744 3.17678 3.76256 3.46967 3.46967Z",
                        fill: "currentColor"
                      })
                    ]))
                  ], 8, ["onClick"])
                ])) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ], 6)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BaseModal.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-c4fe8d77"]]);
const _sfc_main$d = {
  __name: "AppSelect",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    items: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }, {
    "modelValue": { default: "" },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    const props = __props;
    const isOpen = ref(false);
    const selectRef = ref(null);
    const selectedLabel = computed(() => {
      const item = props.items.find((i) => i.value === model.value);
      return item ? item.label : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "selectRef",
        ref: selectRef,
        class: [
          "app-select",
          {
            "app-select--open": unref(isOpen),
            "app-select--filled": !!unref(selectedLabel),
            "app-select--disabled": __props.disabled
          }
        ]
      }, _attrs))} data-v-9357e069><button type="button" class="app-select__trigger"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-9357e069><span class="app-select__value" data-v-9357e069>${ssrInterpolate(unref(selectedLabel) || __props.placeholder)}</span><svg class="app-select__chevron" viewBox="0 0 16 16" fill="none" data-v-9357e069><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-9357e069></path></svg></button>`);
      if (unref(isOpen)) {
        _push(`<div class="app-select__dropdown" data-v-9357e069><!--[-->`);
        ssrRenderList(__props.items, (item) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "app-select__item",
            { "app-select__item--selected": item.value === model.value }
          ])}" data-v-9357e069>${ssrInterpolate(item.label)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppSelect.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __nuxt_component_1$3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$d, [["__scopeId", "data-v-9357e069"]]), { __name: "AppSelect" });
const _sfc_main$c = {
  __name: "QuantityInput",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 1e4
    },
    suffix: {
      type: String,
      default: "шт"
    }
  }, {
    "modelValue": { type: Number, default: 1 },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    const props = __props;
    const canDecrement = computed(() => model.value > props.min);
    const canIncrement = computed(() => model.value < props.max);
    const isEditing = ref(false);
    const editValue = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "qty-input" }, _attrs))} data-v-949949b9><button type="button" class="${ssrRenderClass(["qty-input__btn", { "qty-input__btn--disabled": !unref(canDecrement) }])}"${ssrIncludeBooleanAttr(!unref(canDecrement)) ? " disabled" : ""} aria-label="Уменьшить количество" data-v-949949b9><svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-949949b9><path d="M1 1h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-949949b9></path></svg></button>`);
      if (unref(isEditing)) {
        _push(`<input${ssrRenderAttr("value", unref(editValue))} class="qty-input__input" type="text" inputmode="numeric" data-v-949949b9>`);
      } else {
        _push(`<span class="qty-input__value" data-v-949949b9>${ssrInterpolate(model.value)} ${ssrInterpolate(__props.suffix)}</span>`);
      }
      _push(`<button type="button" class="${ssrRenderClass(["qty-input__btn", { "qty-input__btn--disabled": !unref(canIncrement) }])}"${ssrIncludeBooleanAttr(!unref(canIncrement)) ? " disabled" : ""} aria-label="Увеличить количество" data-v-949949b9><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-949949b9><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-949949b9></path></svg></button></div>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuantityInput.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-949949b9"]]);
const _sfc_main$b = {
  __name: "AppSwitch",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    label: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }, {
    "modelValue": { type: Boolean, default: false },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({
        class: [
          "app-switch",
          { "app-switch--active": model.value, "app-switch--disabled": __props.disabled }
        ]
      }, _attrs))} data-v-256d1f59><input${ssrIncludeBooleanAttr(Array.isArray(model.value) ? ssrLooseContain(model.value, null) : model.value) ? " checked" : ""} type="checkbox" class="app-switch__input"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-256d1f59><span class="app-switch__track" data-v-256d1f59><span class="app-switch__thumb" data-v-256d1f59></span></span>`);
      if (__props.label) {
        _push(`<span class="app-switch__label" data-v-256d1f59>${ssrInterpolate(__props.label)}</span>`);
      } else {
        _push(`<span class="app-switch__label" data-v-256d1f59>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppSwitch.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-256d1f59"]]);
const _sfc_main$a = {
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    image: {
      type: String,
      default: ""
    },
    fabricLabel: {
      type: String,
      default: ""
    },
    fabricGenitive: {
      type: String,
      default: ""
    },
    sizeLabel: {
      type: String,
      default: ""
    },
    quantity: {
      type: Number,
      default: 0
    },
    hasFringe: {
      type: Boolean,
      default: false
    },
    doubleSided: {
      type: Boolean,
      default: false
    },
    orderDesign: {
      type: Boolean,
      default: false
    },
    basePrice: {
      type: String,
      default: "0 ₽"
    },
    fringePrice: {
      type: String,
      default: "0 ₽"
    },
    doubleSidedPrice: {
      type: String,
      default: "0 ₽"
    },
    designPrice: {
      type: String,
      default: "0 ₽"
    },
    totalPrice: {
      type: String,
      default: "0 ₽"
    }
  },
  emits: ["pay", "add-to-cart"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$r;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-card" }, _attrs))} data-v-d91a0f99><div class="product-card__image" data-v-d91a0f99>`);
      if (__props.image) {
        _push(`<img${ssrRenderAttr("src", __props.image)}${ssrRenderAttr("alt", `Флаг из ${__props.fabricGenitive}, ${__props.sizeLabel}`)} class="product-card__image-img" data-v-d91a0f99>`);
      } else {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-flag",
          class: "product-card__image-placeholder"
        }, null, _parent));
      }
      _push(`</div><div class="product-card__body" data-v-d91a0f99><div class="product-card__prices" data-v-d91a0f99><div class="price-row" data-v-d91a0f99><span class="price-row__label" data-v-d91a0f99>Флаг из ${ssrInterpolate(__props.fabricGenitive)}</span><div class="price-row__value" data-v-d91a0f99><span class="price-row__qty" data-v-d91a0f99>${ssrInterpolate(__props.quantity)}</span><span class="price-row__sep" data-v-d91a0f99>×</span><span class="price-row__amount" data-v-d91a0f99>${ssrInterpolate(__props.basePrice)}</span></div></div>`);
      if (__props.hasFringe) {
        _push(`<div class="price-row" data-v-d91a0f99><span class="price-row__label" data-v-d91a0f99>Бахрома</span><div class="price-row__value" data-v-d91a0f99><span class="price-row__qty" data-v-d91a0f99>${ssrInterpolate(__props.quantity)}</span><span class="price-row__sep" data-v-d91a0f99>×</span><span class="price-row__amount" data-v-d91a0f99>${ssrInterpolate(__props.fringePrice)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.doubleSided) {
        _push(`<div class="price-row" data-v-d91a0f99><span class="price-row__label" data-v-d91a0f99>Двухсторонняя печать</span><div class="price-row__value" data-v-d91a0f99><span class="price-row__qty" data-v-d91a0f99>${ssrInterpolate(__props.quantity)}</span><span class="price-row__sep" data-v-d91a0f99>×</span><span class="price-row__amount" data-v-d91a0f99>${ssrInterpolate(__props.doubleSidedPrice)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.orderDesign) {
        _push(`<div class="price-row" data-v-d91a0f99><span class="price-row__label" data-v-d91a0f99>Услуги дизайнера</span><div class="price-row__value" data-v-d91a0f99><span class="price-row__qty" data-v-d91a0f99>1</span><span class="price-row__sep" data-v-d91a0f99>×</span><span class="price-row__amount" data-v-d91a0f99>${ssrInterpolate(__props.designPrice)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="product-card__divider" data-v-d91a0f99></div><div class="total-row" data-v-d91a0f99><span class="total-row__label" data-v-d91a0f99>К оплате</span><span class="total-row__value" data-v-d91a0f99>${ssrInterpolate(__props.totalPrice)}</span></div></div></div><div class="product-card__actions" data-v-d91a0f99><button class="buy-btn" type="button" data-v-d91a0f99><span class="buy-btn__label" data-v-d91a0f99>Купить<span class="buy-btn__extra" data-v-d91a0f99> сразу</span></span><span class="buy-btn__payment" data-v-d91a0f99><span class="buy-btn__payment-text" data-v-d91a0f99>Оплата СБП</span><svg class="buy-btn__payment-icon" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d91a0f99><path fill-rule="evenodd" clip-rule="evenodd" d="M5.254.093C5.257.062 5.247.024 5.272 0l.008.02c.028.084.078.157.12.234.294.527.59 1.055.885 1.582.14.259.294.51.427.773.002.551-.003 1.103.003 1.656.001.569-.002 1.138.002 1.707v.058c-.488-.297-.975-.596-1.463-.894V.093Z" fill="white" data-v-d91a0f99></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.28.02c.437.256.866.527 1.3.788 1.432.875 2.868 1.744 4.298 2.623-1.387.847-2.773 1.695-4.161 2.54-.005-.568-.001-1.138-.002-1.707.452-.273.901-.55 1.351-.824-.037-.041-.09-.062-.135-.092-.406-.246-.813-.492-1.219-.738-.133-.263-.286-.514-.427-.773-.295-.527-.59-1.054-.885-1.582A1.86 1.86 0 0 1 5.28.02Z" fill="white" data-v-d91a0f99></path><path fill-rule="evenodd" clip-rule="evenodd" d="M1.124 2.61c.004.004.011.013.015.017.018.057.043.111.075.16.343.609.684 1.218 1.026 1.826.116.201.223.409.345.606v1.57a7.16 7.16 0 0 1-.256.446c-.384.682-.766 1.366-1.15 2.047-.016.03-.026.062-.038.093l-.017.017c-.003-2.261-.003-4.522 0-6.784Z" fill="white" data-v-d91a0f99></path><path fill-rule="evenodd" clip-rule="evenodd" d="M1.214 2.787a.627.627 0 0 1-.075-.161c.479.283.95.58 1.426.867.896.548 1.793 1.096 2.69 1.644.487.298.975.596 1.463.894 1.384.846 2.769 1.692 4.153 2.537-.933.008-1.868 0-2.802.005-.45-.275-.9-.55-1.35-.826-.483-.298-.972-.588-1.452-.892-.338-.216-.684-.42-1.026-.631a12.37 12.37 0 0 1-.37-.222c-.431-.255-.856-.522-1.285-.782-.122-.198-.231-.405-.348-.605a59.42 59.42 0 0 1-1.025-1.826Z" fill="white" data-v-d91a0f99></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.87 6c.127.068.247.15.37.222.342.211.688.415 1.026.631l-.01.011c-.736.452-1.474.9-2.21 1.351-.636.386-1.267.779-1.905 1.16.012-.032.023-.064.037-.094.385-.681.766-1.365 1.15-2.047a2.24 2.24 0 0 1 .256-.447c.428-.264.858-.522 1.285-.787Z" fill="white" data-v-d91a0f99></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.266 6.854c.48.304.969.593 1.452.892-.002.549.001 1.098-.001 1.647-.404.714-.804 1.43-1.206 2.144-.08.15-.175.293-.243.45L5.261 12c-.015-.192-.003-.384-.007-.577.001-1.52-.001-3.039.001-4.558l.01-.011Z" fill="white" data-v-d91a0f99></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.068 8.572c.935-.005 1.869.002 2.803-.005-.319.206-.647.397-.969.597-1.476.901-2.951 1.802-4.427 2.703-.069.04-.134.088-.207.12.068-.157.163-.3.243-.45.403-.714.803-1.43 1.205-2.144.452-.272.904-.544 1.352-.821Z" fill="white" data-v-d91a0f99></path></svg></span></button><button class="cart-btn" type="button" data-v-d91a0f99><svg class="cart-btn__icon" viewBox="0 0 22.786 22.783" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d91a0f99><path fill-rule="evenodd" clip-rule="evenodd" d="M6.258 15.777L2.372 3.125S1.485 3.04.99 3.028C-.02 3.004-.508.353.76.282 1.146.26 4.357 0 4.357 0l1.256 5.1 17.173.921-2.083 9.283-14.445.474ZM6.56 17.294c3.531 0 3.618 5.394.245 5.394-4.002.008-3.71-5.394-.245-5.394Zm11.916.097c3.53 0 3.62 5.392.245 5.392-4.002 0-3.707-5.392-.245-5.392Z" fill="currentColor" data-v-d91a0f99></path></svg><span class="cart-btn__text" data-v-d91a0f99>Добавить в корзину</span></button></div></div>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-d91a0f99"]]);
const __vite_glob_0_5 = "" + __buildAssetsURL("dense_polyester_grommets_60x90_double.za9T4eXU.png");
const __vite_glob_0_6 = "" + __buildAssetsURL("dense_polyester_grommets_60x90_double_fringe.CS_CY77A.png");
const __vite_glob_0_7 = "" + __buildAssetsURL("dense_polyester_grommets_60x90_single.DKCu2Fiq.png");
const __vite_glob_0_8 = "" + __buildAssetsURL("dense_polyester_grommets_60x90_single_fringe.mRkfvSRV.png");
const __vite_glob_0_9 = "" + __buildAssetsURL("dense_polyester_grommets_90x135_double.Cd_hhpv8.png");
const __vite_glob_0_10 = "" + __buildAssetsURL("dense_polyester_grommets_90x135_double_fringe.De_EkLXt.png");
const __vite_glob_0_11 = "" + __buildAssetsURL("dense_polyester_grommets_90x135_single.BVUsePy3.png");
const __vite_glob_0_12 = "" + __buildAssetsURL("dense_polyester_grommets_90x135_single_fringe.BvTafySI.png");
const __vite_glob_0_13 = "" + __buildAssetsURL("dense_polyester_sleeve_60x90_double.ACc-aKlY.png");
const __vite_glob_0_14 = "" + __buildAssetsURL("dense_polyester_sleeve_60x90_double_fringe.BUeuNOen.png");
const __vite_glob_0_15 = "" + __buildAssetsURL("dense_polyester_sleeve_60x90_single._p5eDjvq.png");
const __vite_glob_0_16 = "" + __buildAssetsURL("dense_polyester_sleeve_60x90_single_fringe.UEyS7zTb.png");
const __vite_glob_0_17 = "" + __buildAssetsURL("dense_polyester_sleeve_90x135_double.BrJn4Xaq.png");
const __vite_glob_0_18 = "" + __buildAssetsURL("dense_polyester_sleeve_90x135_double_fringe.Dk0vLEjX.png");
const __vite_glob_0_19 = "" + __buildAssetsURL("dense_polyester_sleeve_90x135_single.051p5EBo.png");
const __vite_glob_0_20 = "" + __buildAssetsURL("dense_polyester_sleeve_90x135_single_fringe.BAlleuEE.png");
const __vite_glob_0_21 = "" + __buildAssetsURL("mesh_grommets_60x90_double.DUTuOgHv.png");
const __vite_glob_0_22 = "" + __buildAssetsURL("mesh_grommets_60x90_double_fringe.C-pTSaox.png");
const __vite_glob_0_23 = "" + __buildAssetsURL("mesh_grommets_60x90_single.CQzq71gw.png");
const __vite_glob_0_24 = "" + __buildAssetsURL("mesh_grommets_60x90_single_fringe.DU2MNMvp.png");
const __vite_glob_0_25 = "" + __buildAssetsURL("mesh_grommets_90x135_double.BtL6Voqz.png");
const __vite_glob_0_26 = "" + __buildAssetsURL("mesh_grommets_90x135_double_fringe.B69a68ry.png");
const __vite_glob_0_27 = "" + __buildAssetsURL("mesh_grommets_90x135_single.DPD0554Q.png");
const __vite_glob_0_28 = "" + __buildAssetsURL("mesh_grommets_90x135_single_fringe.DxWtrmVO.png");
const __vite_glob_0_29 = "" + __buildAssetsURL("mesh_sleeve_60x90_double.AU-psE_l.png");
const __vite_glob_0_30 = "" + __buildAssetsURL("mesh_sleeve_60x90_double_fringe.SrC3VtWH.png");
const __vite_glob_0_31 = "" + __buildAssetsURL("mesh_sleeve_60x90_single.CmS-puQr.png");
const __vite_glob_0_32 = "" + __buildAssetsURL("mesh_sleeve_60x90_single_fringe.C6ZFg3Lf.png");
const __vite_glob_0_33 = "" + __buildAssetsURL("mesh_sleeve_90x135_double.gzM_G-fO.png");
const __vite_glob_0_34 = "" + __buildAssetsURL("mesh_sleeve_90x135_double_fringe.Pjsv4A4q.png");
const __vite_glob_0_35 = "" + __buildAssetsURL("mesh_sleeve_90x135_single.BF76aDEu.png");
const __vite_glob_0_36 = "" + __buildAssetsURL("mesh_sleeve_90x135_single_fringe.BMSZa4Gp.png");
const __vite_glob_0_37 = "" + __buildAssetsURL("polyester_grommets_60x90_double.D8jS7Lud.png");
const __vite_glob_0_38 = "" + __buildAssetsURL("polyester_grommets_60x90_double_fringe.DVWDASzD.png");
const __vite_glob_0_39 = "" + __buildAssetsURL("polyester_grommets_60x90_single.MOirczvX.png");
const __vite_glob_0_40 = "" + __buildAssetsURL("polyester_grommets_60x90_single_fringe.4fPcYHcK.png");
const __vite_glob_0_41 = "" + __buildAssetsURL("polyester_grommets_90x135_double.Bc5E38oN.png");
const __vite_glob_0_42 = "" + __buildAssetsURL("polyester_grommets_90x135_double_fringe.C_votDlE.png");
const __vite_glob_0_43 = "" + __buildAssetsURL("polyester_grommets_90x135_single.DSceDMP9.png");
const __vite_glob_0_44 = "" + __buildAssetsURL("polyester_grommets_90x135_single_fringe.sevc2bgj.png");
const __vite_glob_0_45 = "" + __buildAssetsURL("polyester_sleeve_60x90_double.CuU2f0Nk.png");
const __vite_glob_0_46 = "" + __buildAssetsURL("polyester_sleeve_60x90_double_fringe.D5RRAdln.png");
const __vite_glob_0_47 = "" + __buildAssetsURL("polyester_sleeve_60x90_single.C7RVHdnM.png");
const __vite_glob_0_48 = "" + __buildAssetsURL("polyester_sleeve_60x90_single_fringe.CtfDHoBx.png");
const __vite_glob_0_49 = "" + __buildAssetsURL("polyester_sleeve_90x135_double.C2ikPQO1.png");
const __vite_glob_0_50 = "" + __buildAssetsURL("polyester_sleeve_90x135_double_fringe.UUtANBuN.png");
const __vite_glob_0_51 = "" + __buildAssetsURL("polyester_sleeve_90x135_single.gck03kxQ.png");
const __vite_glob_0_52 = "" + __buildAssetsURL("polyester_sleeve_90x135_single_fringe.BiFaViDN.png");
const __vite_glob_0_53 = "" + __buildAssetsURL("satin_grommets_60x90_double.C8GIQrJU.png");
const __vite_glob_0_54 = "" + __buildAssetsURL("satin_grommets_60x90_double_fringe.CRifW5D4.png");
const __vite_glob_0_55 = "" + __buildAssetsURL("satin_grommets_60x90_single.-INYcgSl.png");
const __vite_glob_0_56 = "" + __buildAssetsURL("satin_grommets_60x90_single_fringe.B2c9NQZ0.png");
const __vite_glob_0_57 = "" + __buildAssetsURL("satin_grommets_90x135_double.CeveyNnt.png");
const __vite_glob_0_58 = "" + __buildAssetsURL("satin_grommets_90x135_double_fringe.7Iinn9rA.png");
const __vite_glob_0_59 = "" + __buildAssetsURL("satin_grommets_90x135_single.DjgR8eU2.png");
const __vite_glob_0_60 = "" + __buildAssetsURL("satin_grommets_90x135_single_fringe.nyG-fLFQ.png");
const __vite_glob_0_61 = "" + __buildAssetsURL("satin_sleeve_60x90_double.B-d5Istq.png");
const __vite_glob_0_62 = "" + __buildAssetsURL("satin_sleeve_60x90_double_fringe.mC-RM5cb.png");
const __vite_glob_0_63 = "" + __buildAssetsURL("satin_sleeve_60x90_single.ByUDhn4E.png");
const __vite_glob_0_64 = "" + __buildAssetsURL("satin_sleeve_60x90_single_fringe.C2qvKlSZ.png");
const __vite_glob_0_65 = "" + __buildAssetsURL("satin_sleeve_90x135_double.Cat8n9H4.png");
const __vite_glob_0_66 = "" + __buildAssetsURL("satin_sleeve_90x135_double_fringe.DUYdMMof.png");
const __vite_glob_0_67 = "" + __buildAssetsURL("satin_sleeve_90x135_single.BWcmz37Z.png");
const __vite_glob_0_68 = "" + __buildAssetsURL("satin_sleeve_90x135_single_fringe.00B5d1PG.png");
const FABRICS = [
  { label: "Атлас", genitive: "атласа", value: "atlas" },
  { label: "Нейлон", genitive: "нейлона", value: "nylon" },
  { label: "Флажная сетка", genitive: "флажной сетки", value: "mesh" },
  { label: "Габардин", genitive: "габардина", value: "gabardine" },
  { label: "Купольный атлас", genitive: "купольного атласа", value: "dome-atlas" }
];
const MOUNTINGS = [
  { label: "Люверсы", value: "grommets" },
  { label: "Под древко", value: "pocket" }
];
const SIZES = [
  { label: "90×135 см", value: "90x135" },
  { label: "60×90 см", value: "60x90" }
];
const FABRIC_IMAGE_MAP = {
  atlas: "satin",
  nylon: "polyester",
  mesh: "mesh",
  gabardine: "dense_polyester",
  "dome-atlas": "satin"
};
const MOUNTING_IMAGE_MAP = {
  grommets: "grommets",
  pocket: "sleeve"
};
const MAX_UPLOAD_SIZE = 50 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".tiff", ".tif", ".ai", ".cdr", ".jpg", ".jpeg", ".png"];
const RASTER_EXTENSIONS = [".jpg", ".jpeg", ".png"];
function getFabricLabel(value) {
  return FABRICS.find((f) => f.value === value)?.label ?? "";
}
function getFabricGenitive(value) {
  return FABRICS.find((f) => f.value === value)?.genitive ?? "";
}
function getSizeLabel(value) {
  return SIZES.find((s) => s.value === value)?.label ?? "";
}
function formatPrice(value) {
  return value.toLocaleString("ru-RU") + " ₽";
}
function formatPriceRaw(value) {
  return value.toLocaleString("ru-RU");
}
const FRINGE_PRICE = 300;
const DOUBLE_SIDED_PRICE = 1e3;
const DESIGN_PRICE = 1500;
const BASE_PRODUCTION_DAYS = 4;
const DESIGN_EXTRA_DAYS = 1;
const PRICE_TABLE = {
  "90x135": {
    "Атлас": { "1-4": 2e3, "5-10": 1900, "20-100": 1800, raopt: 1800 },
    "Нейлон": { "1-4": 1400, "5-10": 1300, "20-100": 1200, raopt: 1200 },
    "Флажная сетка": { "1-4": 1400, "5-10": 1300, "20-100": 1200, raopt: 1200 },
    "Купольный атлас": { "1-4": 6500, "5-10": 6e3, "20-100": 6e3, raopt: 6e3 },
    "Габардин": { "1-4": 2e3, "5-10": 1900, "20-100": 1800, raopt: 1800 }
  },
  "90x60": {
    "Атлас 210гр": { "1-4": 800, "5-10": 750, "20-100": 740, raopt: 690 },
    "Нейлон": { "1-4": 700, "5-10": 650, "20-100": 640, raopt: 590 },
    "Флажная сетка": { "1-4": 700, "5-10": 650, "20-100": 640, raopt: 590 },
    "Купольный атлас": { "1-4": 2950, "5-10": 2600, "20-100": 2340, raopt: 2340 },
    "Габардин": { "1-4": 800, "5-10": 750, "20-100": 740, raopt: 690 }
  }
};
const SIZE_TO_PRICE_KEY = {
  "90x135": "90x135",
  "60x90": "90x60"
};
function getFabricPriceKey(fabricLabel, priceSize) {
  if (priceSize === "90x60" && fabricLabel === "Атлас") {
    return "Атлас 210гр";
  }
  return fabricLabel;
}
function getTier(quantity) {
  if (quantity >= 100) return "raopt";
  if (quantity >= 20) return "20-100";
  if (quantity >= 5) return "5-10";
  return "1-4";
}
function calcUnitPrice(fabricLabel, size, quantity, hasFringe, doubleSided) {
  const priceSize = SIZE_TO_PRICE_KEY[size];
  if (!priceSize || !PRICE_TABLE[priceSize]) return 0;
  const fabricKey = getFabricPriceKey(fabricLabel, priceSize);
  if (!PRICE_TABLE[priceSize][fabricKey]) return 0;
  const tier = getTier(quantity);
  const basePrice = PRICE_TABLE[priceSize][fabricKey][tier];
  const fringeAddition = hasFringe ? FRINGE_PRICE : 0;
  const doubleSidedAddition = doubleSided ? DOUBLE_SIDED_PRICE : 0;
  return basePrice + fringeAddition + doubleSidedAddition;
}
function calcDesignPrice(orderDesign) {
  return orderDesign ? DESIGN_PRICE : 0;
}
function usePricing({ fabricLabel, size, quantity, hasFringe, doubleSided, orderDesign }) {
  const breakdown = computed(() => {
    const qty = unref(quantity);
    const fabric = unref(fabricLabel);
    const sizeVal = unref(size);
    const fringe = unref(hasFringe);
    const dbl = unref(doubleSided);
    const design = unref(orderDesign);
    if (!qty || qty < 1 || !fabric || !sizeVal) {
      return null;
    }
    const priceSize = SIZE_TO_PRICE_KEY[sizeVal];
    if (!priceSize || !PRICE_TABLE[priceSize]) {
      return null;
    }
    const fabricKey = getFabricPriceKey(fabric, priceSize);
    const sizeTable = PRICE_TABLE[priceSize];
    if (!sizeTable[fabricKey]) {
      return null;
    }
    const tier = getTier(qty);
    const basePrice = sizeTable[fabricKey][tier];
    const fringeAddition = fringe ? FRINGE_PRICE : 0;
    const doubleSidedAddition = dbl ? DOUBLE_SIDED_PRICE : 0;
    const unitPrice = basePrice + fringeAddition + doubleSidedAddition;
    const printTotal = unitPrice * qty;
    const designPrice = design ? DESIGN_PRICE : 0;
    const total = printTotal + designPrice;
    const productionDays = BASE_PRODUCTION_DAYS + (design ? DESIGN_EXTRA_DAYS : 0);
    return {
      basePrice,
      fringeAddition,
      doubleSidedAddition,
      unitPrice,
      printTotal,
      designPrice,
      total,
      productionDays,
      tier,
      quantity: qty
    };
  });
  const basePriceFormatted = computed(() => breakdown.value ? formatPrice(breakdown.value.basePrice) : "0 ₽");
  const fringePriceFormatted = computed(() => breakdown.value ? formatPrice(breakdown.value.fringeAddition) : "0 ₽");
  const doubleSidedPriceFormatted = computed(() => breakdown.value ? formatPrice(breakdown.value.doubleSidedAddition) : "0 ₽");
  const designPriceFormatted = computed(() => breakdown.value ? formatPrice(breakdown.value.designPrice) : "0 ₽");
  const totalFormatted = computed(() => breakdown.value ? formatPrice(breakdown.value.total) : "0 ₽");
  return {
    breakdown,
    basePriceFormatted,
    fringePriceFormatted,
    doubleSidedPriceFormatted,
    designPriceFormatted,
    totalFormatted,
    formatPrice
  };
}
const _sfc_main$9 = {
  __name: "ConstructorModal",
  __ssrInlineRender: true,
  props: {
    "modelValue": { required: true },
    "modelModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["pay", "add-to-cart"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const isOpen = useModel(__props, "modelValue");
    const emit = __emit;
    const selectedFabric = ref("mesh");
    const selectedMounting = ref("pocket");
    const selectedSize = ref("90x135");
    const quantity = ref(1);
    const hasFringe = ref(true);
    const doubleSided = ref(true);
    const orderDesign = ref(false);
    const description = ref("");
    const uploadedFiles = ref([]);
    const fileInput = ref(null);
    const isDragging = ref(false);
    const dragCounter = ref(0);
    function hasRasterFile(files) {
      return files.some((f) => RASTER_EXTENSIONS.some((ext) => f.name.toLowerCase().endsWith(ext)));
    }
    function isAllowedFile(file) {
      if (file.size > MAX_UPLOAD_SIZE) return false;
      return ALLOWED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext));
    }
    function onFileSelect(e) {
      const files = Array.from(e.target.files || []).filter(isAllowedFile);
      uploadedFiles.value = [...uploadedFiles.value, ...files];
      if (fileInput.value) {
        fileInput.value.value = "";
      }
      if (hasRasterFile(uploadedFiles.value)) {
        orderDesign.value = true;
      }
    }
    function removeFile(index) {
      uploadedFiles.value = uploadedFiles.value.filter((_, i) => i !== index);
      if (!hasRasterFile(uploadedFiles.value)) {
        orderDesign.value = false;
      }
    }
    function onDragEnter(e) {
      e.preventDefault();
      dragCounter.value++;
      isDragging.value = true;
    }
    function onDragLeave(e) {
      e.preventDefault();
      dragCounter.value--;
      if (dragCounter.value === 0) {
        isDragging.value = false;
      }
    }
    function onDragOver(e) {
      e.preventDefault();
    }
    function onDrop(e) {
      e.preventDefault();
      dragCounter.value = 0;
      isDragging.value = false;
      const files = Array.from(e.dataTransfer?.files || []).filter(isAllowedFile);
      uploadedFiles.value = [...uploadedFiles.value, ...files];
      if (hasRasterFile(uploadedFiles.value)) {
        orderDesign.value = true;
      }
    }
    const fabricLabel = computed(() => FABRICS.find((f) => f.value === selectedFabric.value)?.label ?? "");
    const fabricGenitive = computed(() => FABRICS.find((f) => f.value === selectedFabric.value)?.genitive ?? "");
    const sizeLabel = computed(() => SIZES.find((s) => s.value === selectedSize.value)?.label ?? "");
    const { breakdown, basePriceFormatted, fringePriceFormatted, doubleSidedPriceFormatted, designPriceFormatted, totalFormatted } = usePricing({
      fabricLabel,
      size: selectedSize,
      quantity,
      hasFringe,
      doubleSided,
      orderDesign
    });
    const imageModules2 = /* @__PURE__ */ Object.assign({ "/assets/images/catalog_slider_1.png": catalogSliderImage1, "/assets/images/catalog_slider_2.png": catalogSliderImage2, "/assets/images/catalog_slider_3.png": catalogSliderImage3, "/assets/images/catalog_slider_4.png": catalogSliderImage4, "/assets/images/catalog_slider_5.png": catalogSliderImage5, "/assets/images/dense_polyester_grommets_60x90_double.png": __vite_glob_0_5, "/assets/images/dense_polyester_grommets_60x90_double_fringe.png": __vite_glob_0_6, "/assets/images/dense_polyester_grommets_60x90_single.png": __vite_glob_0_7, "/assets/images/dense_polyester_grommets_60x90_single_fringe.png": __vite_glob_0_8, "/assets/images/dense_polyester_grommets_90x135_double.png": __vite_glob_0_9, "/assets/images/dense_polyester_grommets_90x135_double_fringe.png": __vite_glob_0_10, "/assets/images/dense_polyester_grommets_90x135_single.png": __vite_glob_0_11, "/assets/images/dense_polyester_grommets_90x135_single_fringe.png": __vite_glob_0_12, "/assets/images/dense_polyester_sleeve_60x90_double.png": __vite_glob_0_13, "/assets/images/dense_polyester_sleeve_60x90_double_fringe.png": __vite_glob_0_14, "/assets/images/dense_polyester_sleeve_60x90_single.png": __vite_glob_0_15, "/assets/images/dense_polyester_sleeve_60x90_single_fringe.png": __vite_glob_0_16, "/assets/images/dense_polyester_sleeve_90x135_double.png": __vite_glob_0_17, "/assets/images/dense_polyester_sleeve_90x135_double_fringe.png": __vite_glob_0_18, "/assets/images/dense_polyester_sleeve_90x135_single.png": __vite_glob_0_19, "/assets/images/dense_polyester_sleeve_90x135_single_fringe.png": __vite_glob_0_20, "/assets/images/mesh_grommets_60x90_double.png": __vite_glob_0_21, "/assets/images/mesh_grommets_60x90_double_fringe.png": __vite_glob_0_22, "/assets/images/mesh_grommets_60x90_single.png": __vite_glob_0_23, "/assets/images/mesh_grommets_60x90_single_fringe.png": __vite_glob_0_24, "/assets/images/mesh_grommets_90x135_double.png": __vite_glob_0_25, "/assets/images/mesh_grommets_90x135_double_fringe.png": __vite_glob_0_26, "/assets/images/mesh_grommets_90x135_single.png": __vite_glob_0_27, "/assets/images/mesh_grommets_90x135_single_fringe.png": __vite_glob_0_28, "/assets/images/mesh_sleeve_60x90_double.png": __vite_glob_0_29, "/assets/images/mesh_sleeve_60x90_double_fringe.png": __vite_glob_0_30, "/assets/images/mesh_sleeve_60x90_single.png": __vite_glob_0_31, "/assets/images/mesh_sleeve_60x90_single_fringe.png": __vite_glob_0_32, "/assets/images/mesh_sleeve_90x135_double.png": __vite_glob_0_33, "/assets/images/mesh_sleeve_90x135_double_fringe.png": __vite_glob_0_34, "/assets/images/mesh_sleeve_90x135_single.png": __vite_glob_0_35, "/assets/images/mesh_sleeve_90x135_single_fringe.png": __vite_glob_0_36, "/assets/images/polyester_grommets_60x90_double.png": __vite_glob_0_37, "/assets/images/polyester_grommets_60x90_double_fringe.png": __vite_glob_0_38, "/assets/images/polyester_grommets_60x90_single.png": __vite_glob_0_39, "/assets/images/polyester_grommets_60x90_single_fringe.png": __vite_glob_0_40, "/assets/images/polyester_grommets_90x135_double.png": __vite_glob_0_41, "/assets/images/polyester_grommets_90x135_double_fringe.png": __vite_glob_0_42, "/assets/images/polyester_grommets_90x135_single.png": __vite_glob_0_43, "/assets/images/polyester_grommets_90x135_single_fringe.png": __vite_glob_0_44, "/assets/images/polyester_sleeve_60x90_double.png": __vite_glob_0_45, "/assets/images/polyester_sleeve_60x90_double_fringe.png": __vite_glob_0_46, "/assets/images/polyester_sleeve_60x90_single.png": __vite_glob_0_47, "/assets/images/polyester_sleeve_60x90_single_fringe.png": __vite_glob_0_48, "/assets/images/polyester_sleeve_90x135_double.png": __vite_glob_0_49, "/assets/images/polyester_sleeve_90x135_double_fringe.png": __vite_glob_0_50, "/assets/images/polyester_sleeve_90x135_single.png": __vite_glob_0_51, "/assets/images/polyester_sleeve_90x135_single_fringe.png": __vite_glob_0_52, "/assets/images/satin_grommets_60x90_double.png": __vite_glob_0_53, "/assets/images/satin_grommets_60x90_double_fringe.png": __vite_glob_0_54, "/assets/images/satin_grommets_60x90_single.png": __vite_glob_0_55, "/assets/images/satin_grommets_60x90_single_fringe.png": __vite_glob_0_56, "/assets/images/satin_grommets_90x135_double.png": __vite_glob_0_57, "/assets/images/satin_grommets_90x135_double_fringe.png": __vite_glob_0_58, "/assets/images/satin_grommets_90x135_single.png": __vite_glob_0_59, "/assets/images/satin_grommets_90x135_single_fringe.png": __vite_glob_0_60, "/assets/images/satin_sleeve_60x90_double.png": __vite_glob_0_61, "/assets/images/satin_sleeve_60x90_double_fringe.png": __vite_glob_0_62, "/assets/images/satin_sleeve_60x90_single.png": __vite_glob_0_63, "/assets/images/satin_sleeve_60x90_single_fringe.png": __vite_glob_0_64, "/assets/images/satin_sleeve_90x135_double.png": __vite_glob_0_65, "/assets/images/satin_sleeve_90x135_double_fringe.png": __vite_glob_0_66, "/assets/images/satin_sleeve_90x135_single.png": __vite_glob_0_67, "/assets/images/satin_sleeve_90x135_single_fringe.png": __vite_glob_0_68 });
    const productImage = computed(() => {
      const fabric = FABRIC_IMAGE_MAP[selectedFabric.value] || "mesh";
      const mounting = MOUNTING_IMAGE_MAP[selectedMounting.value] || "sleeve";
      const size = selectedSize.value;
      const sided = doubleSided.value ? "double" : "single";
      const fringe = hasFringe.value ? "_fringe" : "";
      const filename = `${fabric}_${mounting}_${size}_${sided}${fringe}.png`;
      const key = Object.keys(imageModules2).find((k) => k.endsWith(`/${filename}`));
      return key ? imageModules2[key] : "";
    });
    function getCurrentItem() {
      return {
        fabric: selectedFabric.value,
        fabricLabel: fabricLabel.value,
        fabricGenitive: fabricGenitive.value,
        mounting: selectedMounting.value,
        size: selectedSize.value,
        sizeLabel: sizeLabel.value,
        quantity: quantity.value,
        hasFringe: hasFringe.value,
        doubleSided: doubleSided.value,
        orderDesign: orderDesign.value,
        unitPrice: breakdown.value?.unitPrice ?? 0,
        designPrice: breakdown.value?.designPrice ?? 0,
        description: description.value,
        uploadedFiles: uploadedFiles.value
      };
    }
    function onPay() {
      emit("pay", getCurrentItem());
    }
    function onAddToCart() {
      emit("add-to-cart", getCurrentItem());
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = __nuxt_component_0$1;
      const _component_AppSelect = __nuxt_component_1$3;
      const _component_QuantityInput = __nuxt_component_1$2;
      const _component_AppCheckbox = __nuxt_component_1$4;
      const _component_AppSwitch = __nuxt_component_1$1;
      const _component_UIcon = _sfc_main$r;
      const _component_ProductCard = __nuxt_component_6;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        modelValue: isOpen.value,
        "onUpdate:modelValue": ($event) => isOpen.value = $event,
        title: "Конструктор флага"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal-grid" data-v-a5e4e856${_scopeId}><div class="form-column" data-v-a5e4e856${_scopeId}><div class="params-section" data-v-a5e4e856${_scopeId}><p class="section-title" data-v-a5e4e856${_scopeId}>Параметры</p><div class="fields-grid" data-v-a5e4e856${_scopeId}><div class="field-row" data-v-a5e4e856${_scopeId}><label class="field-label" data-v-a5e4e856${_scopeId}>Ткань</label>`);
            _push2(ssrRenderComponent(_component_AppSelect, {
              modelValue: unref(selectedFabric),
              "onUpdate:modelValue": ($event) => isRef(selectedFabric) ? selectedFabric.value = $event : null,
              items: unref(FABRICS)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="field-row" data-v-a5e4e856${_scopeId}><label class="field-label" data-v-a5e4e856${_scopeId}>Тип крепления</label>`);
            _push2(ssrRenderComponent(_component_AppSelect, {
              modelValue: unref(selectedMounting),
              "onUpdate:modelValue": ($event) => isRef(selectedMounting) ? selectedMounting.value = $event : null,
              items: unref(MOUNTINGS)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="field-row" data-v-a5e4e856${_scopeId}><label class="field-label" data-v-a5e4e856${_scopeId}>Количество</label>`);
            _push2(ssrRenderComponent(_component_QuantityInput, {
              modelValue: unref(quantity),
              "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
              min: 1,
              max: 1e4
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="field-row" data-v-a5e4e856${_scopeId}><label class="field-label" data-v-a5e4e856${_scopeId}>Размер</label>`);
            _push2(ssrRenderComponent(_component_AppSelect, {
              modelValue: unref(selectedSize),
              "onUpdate:modelValue": ($event) => isRef(selectedSize) ? selectedSize.value = $event : null,
              items: unref(SIZES)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="field-row field-row--options" data-v-a5e4e856${_scopeId}><label class="field-label" data-v-a5e4e856${_scopeId}>Опции</label><div class="options-list" data-v-a5e4e856${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppCheckbox, {
              modelValue: unref(hasFringe),
              "onUpdate:modelValue": ($event) => isRef(hasFringe) ? hasFringe.value = $event : null,
              label: "Бахрома"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AppCheckbox, {
              modelValue: unref(doubleSided),
              "onUpdate:modelValue": ($event) => isRef(doubleSided) ? doubleSided.value = $event : null,
              label: "Печать с двух сторон"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="layout-section" data-v-a5e4e856${_scopeId}><div class="layout-section__header" data-v-a5e4e856${_scopeId}><p class="section-title" data-v-a5e4e856${_scopeId}>Макет</p><p class="layout-section__hint" data-v-a5e4e856${_scopeId}> Подойдут файлы форматов: tiff, ai, crd, jpg, png.<br data-v-a5e4e856${_scopeId}> Разрешение не менее 150 dpi, CMYK, вылеты 5 мм </p><div class="layout-section__links" data-v-a5e4e856${_scopeId}><a href="#" class="layout-section__link" data-v-a5e4e856${_scopeId}> Как готовить макеты к печати <svg class="layout-section__link-icon" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a5e4e856${_scopeId}><path d="M2.057 5.698a.807.807 0 0 1-1.17 0 .808.808 0 0 1 .001-.826l3.733-3.737H2.387A.569.569 0 0 1 1.82.564C1.822.252 2.075 0 2.387 0h4.538v4.534a.571.571 0 0 1-1.141.002l.006-2.572-3.733 3.734Z" fill="currentColor" data-v-a5e4e856${_scopeId}></path></svg></a><a href="#" class="layout-section__link" data-v-a5e4e856${_scopeId}> Шаблоны макетов <svg class="layout-section__link-icon" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a5e4e856${_scopeId}><path d="M2.057 5.698a.807.807 0 0 1-1.17 0 .808.808 0 0 1 .001-.826l3.733-3.737H2.387A.569.569 0 0 1 1.82.564C1.822.252 2.075 0 2.387 0h4.538v4.534a.571.571 0 0 1-1.141.002l.006-2.572-3.733 3.734Z" fill="currentColor" data-v-a5e4e856${_scopeId}></path></svg></a></div></div><div class="design-toggle" data-v-a5e4e856${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppSwitch, {
              modelValue: unref(orderDesign),
              "onUpdate:modelValue": ($event) => isRef(orderDesign) ? orderDesign.value = $event : null,
              label: "Заказать дизайн"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="description-field" data-v-a5e4e856${_scopeId}><label class="field-label" data-v-a5e4e856${_scopeId}>Описание</label><div class="${ssrRenderClass(["description-field__box", { "description-field__box--drag": unref(isDragging) }])}" data-v-a5e4e856${_scopeId}><textarea class="description-field__textarea" placeholder="Сообщение для менеджера,
который будет оформлять ваш заказ" data-v-a5e4e856${_scopeId}>${ssrInterpolate(unref(description))}</textarea><div class="file-upload" data-v-a5e4e856${_scopeId}><div class="file-upload__actions" data-v-a5e4e856${_scopeId}><label class="file-upload__btn" data-v-a5e4e856${_scopeId}><svg class="file-upload__btn-icon" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a5e4e856${_scopeId}><path d="M7.69 14.631c-1.873 0-2.81 0-3.565-.251A5.503 5.503 0 0 1 1.001 11.256c-.17-.515-.225-1.113-.243-2.033A71.69 71.69 0 0 1 .75 7.69c0-1.872 0-2.809.251-3.565A5.503 5.503 0 0 1 4.125 1.001C4.881.75 5.818.75 7.69.75s2.81 0 3.566.251a5.503 5.503 0 0 1 3.124 3.124c.251.756.251 1.693.251 3.565 0 .598 0 1.101-.008 1.533-2.997 0-5.2-1.177-7.631-1.177s-5.157.785-6.234 1.177" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-a5e4e856${_scopeId}></path><circle cx="10.874" cy="3.917" r="1.256" fill="currentColor" fill-opacity="0.67" data-v-a5e4e856${_scopeId}></circle><path d="M12.448 11.306v4.365M10.266 13.488h4.365" stroke="currentColor" stroke-opacity="0.67" stroke-width="1.5" stroke-linecap="round" data-v-a5e4e856${_scopeId}></path><path d="M6.808 5.615 5.265 3.712a.469.469 0 0 0-.799.029L1.094 8.58h11.42L9.198 5.142a.469.469 0 0 0-.616-.083l-1.13.671a.469.469 0 0 1-.644-.115Z" fill="currentColor" fill-opacity="0.67" data-v-a5e4e856${_scopeId}></path></svg><span data-v-a5e4e856${_scopeId}>Выберите файл c макетом</span><input type="file" multiple accept=".tiff,.tif,.ai,.cdr,.jpg,.jpeg,.png" class="file-upload__input" data-v-a5e4e856${_scopeId}></label><span class="file-upload__hint" data-v-a5e4e856${_scopeId}> или перетащите<br data-v-a5e4e856${_scopeId}>на страницу </span></div>`);
            if (unref(uploadedFiles).length) {
              _push2(`<div class="file-upload__files" data-v-a5e4e856${_scopeId}><!--[-->`);
              ssrRenderList(unref(uploadedFiles), (file, i) => {
                _push2(`<span class="file-upload__file" data-v-a5e4e856${_scopeId}><span class="file-upload__file-name" data-v-a5e4e856${_scopeId}>${ssrInterpolate(file.name)}</span><button type="button" class="file-upload__file-remove" data-v-a5e4e856${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-lucide-x",
                  class: "file-upload__file-remove-icon"
                }, null, _parent2, _scopeId));
                _push2(`</button></span>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div>`);
            _push2(ssrRenderComponent(_component_ProductCard, {
              image: unref(productImage),
              "fabric-label": unref(fabricLabel),
              "fabric-genitive": unref(fabricGenitive),
              "size-label": unref(sizeLabel),
              quantity: unref(quantity),
              "has-fringe": unref(hasFringe),
              "double-sided": unref(doubleSided),
              "order-design": unref(orderDesign),
              "base-price": unref(basePriceFormatted),
              "fringe-price": unref(fringePriceFormatted),
              "double-sided-price": unref(doubleSidedPriceFormatted),
              "design-price": unref(designPriceFormatted),
              "total-price": unref(totalFormatted),
              class: "modal-grid__card",
              onPay,
              onAddToCart
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "modal-grid" }, [
                createVNode("div", { class: "form-column" }, [
                  createVNode("div", { class: "params-section" }, [
                    createVNode("p", { class: "section-title" }, "Параметры"),
                    createVNode("div", { class: "fields-grid" }, [
                      createVNode("div", { class: "field-row" }, [
                        createVNode("label", { class: "field-label" }, "Ткань"),
                        createVNode(_component_AppSelect, {
                          modelValue: unref(selectedFabric),
                          "onUpdate:modelValue": ($event) => isRef(selectedFabric) ? selectedFabric.value = $event : null,
                          items: unref(FABRICS)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      createVNode("div", { class: "field-row" }, [
                        createVNode("label", { class: "field-label" }, "Тип крепления"),
                        createVNode(_component_AppSelect, {
                          modelValue: unref(selectedMounting),
                          "onUpdate:modelValue": ($event) => isRef(selectedMounting) ? selectedMounting.value = $event : null,
                          items: unref(MOUNTINGS)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      createVNode("div", { class: "field-row" }, [
                        createVNode("label", { class: "field-label" }, "Количество"),
                        createVNode(_component_QuantityInput, {
                          modelValue: unref(quantity),
                          "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                          min: 1,
                          max: 1e4
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "field-row" }, [
                        createVNode("label", { class: "field-label" }, "Размер"),
                        createVNode(_component_AppSelect, {
                          modelValue: unref(selectedSize),
                          "onUpdate:modelValue": ($event) => isRef(selectedSize) ? selectedSize.value = $event : null,
                          items: unref(SIZES)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      createVNode("div", { class: "field-row field-row--options" }, [
                        createVNode("label", { class: "field-label" }, "Опции"),
                        createVNode("div", { class: "options-list" }, [
                          createVNode(_component_AppCheckbox, {
                            modelValue: unref(hasFringe),
                            "onUpdate:modelValue": ($event) => isRef(hasFringe) ? hasFringe.value = $event : null,
                            label: "Бахрома"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_AppCheckbox, {
                            modelValue: unref(doubleSided),
                            "onUpdate:modelValue": ($event) => isRef(doubleSided) ? doubleSided.value = $event : null,
                            label: "Печать с двух сторон"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "layout-section" }, [
                    createVNode("div", { class: "layout-section__header" }, [
                      createVNode("p", { class: "section-title" }, "Макет"),
                      createVNode("p", { class: "layout-section__hint" }, [
                        createTextVNode(" Подойдут файлы форматов: tiff, ai, crd, jpg, png."),
                        createVNode("br"),
                        createTextVNode(" Разрешение не менее 150 dpi, CMYK, вылеты 5 мм ")
                      ]),
                      createVNode("div", { class: "layout-section__links" }, [
                        createVNode("a", {
                          href: "#",
                          class: "layout-section__link"
                        }, [
                          createTextVNode(" Как готовить макеты к печати "),
                          (openBlock(), createBlock("svg", {
                            class: "layout-section__link-icon",
                            viewBox: "0 0 8 8",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              d: "M2.057 5.698a.807.807 0 0 1-1.17 0 .808.808 0 0 1 .001-.826l3.733-3.737H2.387A.569.569 0 0 1 1.82.564C1.822.252 2.075 0 2.387 0h4.538v4.534a.571.571 0 0 1-1.141.002l.006-2.572-3.733 3.734Z",
                              fill: "currentColor"
                            })
                          ]))
                        ]),
                        createVNode("a", {
                          href: "#",
                          class: "layout-section__link"
                        }, [
                          createTextVNode(" Шаблоны макетов "),
                          (openBlock(), createBlock("svg", {
                            class: "layout-section__link-icon",
                            viewBox: "0 0 8 8",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              d: "M2.057 5.698a.807.807 0 0 1-1.17 0 .808.808 0 0 1 .001-.826l3.733-3.737H2.387A.569.569 0 0 1 1.82.564C1.822.252 2.075 0 2.387 0h4.538v4.534a.571.571 0 0 1-1.141.002l.006-2.572-3.733 3.734Z",
                              fill: "currentColor"
                            })
                          ]))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "design-toggle" }, [
                      createVNode(_component_AppSwitch, {
                        modelValue: unref(orderDesign),
                        "onUpdate:modelValue": ($event) => isRef(orderDesign) ? orderDesign.value = $event : null,
                        label: "Заказать дизайн"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "description-field" }, [
                      createVNode("label", { class: "field-label" }, "Описание"),
                      createVNode("div", {
                        class: ["description-field__box", { "description-field__box--drag": unref(isDragging) }],
                        onDragenter: onDragEnter,
                        onDragleave: onDragLeave,
                        onDragover: onDragOver,
                        onDrop
                      }, [
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => isRef(description) ? description.value = $event : null,
                          class: "description-field__textarea",
                          placeholder: "Сообщение для менеджера,\nкоторый будет оформлять ваш заказ"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(description)]
                        ]),
                        createVNode("div", { class: "file-upload" }, [
                          createVNode("div", { class: "file-upload__actions" }, [
                            createVNode("label", { class: "file-upload__btn" }, [
                              (openBlock(), createBlock("svg", {
                                class: "file-upload__btn-icon",
                                viewBox: "0 0 16 17",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg"
                              }, [
                                createVNode("path", {
                                  d: "M7.69 14.631c-1.873 0-2.81 0-3.565-.251A5.503 5.503 0 0 1 1.001 11.256c-.17-.515-.225-1.113-.243-2.033A71.69 71.69 0 0 1 .75 7.69c0-1.872 0-2.809.251-3.565A5.503 5.503 0 0 1 4.125 1.001C4.881.75 5.818.75 7.69.75s2.81 0 3.566.251a5.503 5.503 0 0 1 3.124 3.124c.251.756.251 1.693.251 3.565 0 .598 0 1.101-.008 1.533-2.997 0-5.2-1.177-7.631-1.177s-5.157.785-6.234 1.177",
                                  stroke: "currentColor",
                                  "stroke-width": "1.5",
                                  "stroke-linecap": "round"
                                }),
                                createVNode("circle", {
                                  cx: "10.874",
                                  cy: "3.917",
                                  r: "1.256",
                                  fill: "currentColor",
                                  "fill-opacity": "0.67"
                                }),
                                createVNode("path", {
                                  d: "M12.448 11.306v4.365M10.266 13.488h4.365",
                                  stroke: "currentColor",
                                  "stroke-opacity": "0.67",
                                  "stroke-width": "1.5",
                                  "stroke-linecap": "round"
                                }),
                                createVNode("path", {
                                  d: "M6.808 5.615 5.265 3.712a.469.469 0 0 0-.799.029L1.094 8.58h11.42L9.198 5.142a.469.469 0 0 0-.616-.083l-1.13.671a.469.469 0 0 1-.644-.115Z",
                                  fill: "currentColor",
                                  "fill-opacity": "0.67"
                                })
                              ])),
                              createVNode("span", null, "Выберите файл c макетом"),
                              createVNode("input", {
                                ref_key: "fileInput",
                                ref: fileInput,
                                type: "file",
                                multiple: "",
                                accept: ".tiff,.tif,.ai,.cdr,.jpg,.jpeg,.png",
                                class: "file-upload__input",
                                onChange: onFileSelect
                              }, null, 544)
                            ]),
                            createVNode("span", { class: "file-upload__hint" }, [
                              createTextVNode(" или перетащите"),
                              createVNode("br"),
                              createTextVNode("на страницу ")
                            ])
                          ]),
                          unref(uploadedFiles).length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "file-upload__files"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(uploadedFiles), (file, i) => {
                              return openBlock(), createBlock("span", {
                                key: i,
                                class: "file-upload__file"
                              }, [
                                createVNode("span", { class: "file-upload__file-name" }, toDisplayString(file.name), 1),
                                createVNode("button", {
                                  type: "button",
                                  class: "file-upload__file-remove",
                                  onClick: ($event) => removeFile(i)
                                }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-lucide-x",
                                    class: "file-upload__file-remove-icon"
                                  })
                                ], 8, ["onClick"])
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ])
                      ], 34)
                    ])
                  ])
                ]),
                createVNode(_component_ProductCard, {
                  image: unref(productImage),
                  "fabric-label": unref(fabricLabel),
                  "fabric-genitive": unref(fabricGenitive),
                  "size-label": unref(sizeLabel),
                  quantity: unref(quantity),
                  "has-fringe": unref(hasFringe),
                  "double-sided": unref(doubleSided),
                  "order-design": unref(orderDesign),
                  "base-price": unref(basePriceFormatted),
                  "fringe-price": unref(fringePriceFormatted),
                  "double-sided-price": unref(doubleSidedPriceFormatted),
                  "design-price": unref(designPriceFormatted),
                  "total-price": unref(totalFormatted),
                  class: "modal-grid__card",
                  onPay,
                  onAddToCart
                }, null, 8, ["image", "fabric-label", "fabric-genitive", "size-label", "quantity", "has-fringe", "double-sided", "order-design", "base-price", "fringe-price", "double-sided-price", "design-price", "total-price"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ConstructorModal.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-a5e4e856"]]);
const _sfc_main$8 = {
  __name: "CartItemRow",
  __ssrInlineRender: true,
  props: {
    item: { type: Object, required: true },
    editing: { type: Boolean, default: false }
  },
  emits: [
    "toggle",
    "start-edit",
    "cancel-edit",
    "confirm-edit",
    "update-quantity"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editDraft = ref(null);
    const openDropdown = ref(null);
    watch(() => props.editing, (val) => {
      if (val) {
        editDraft.value = { ...props.item.config };
        (void 0).addEventListener("click", closeDropdowns);
      } else {
        editDraft.value = null;
        openDropdown.value = null;
        (void 0).removeEventListener("click", closeDropdowns);
      }
    });
    function labelFor(options, value) {
      return options.find((o) => o.value === value)?.label ?? value;
    }
    function closeDropdowns() {
      openDropdown.value = null;
    }
    const previewPrice = computed(() => {
      if (!editDraft.value) return null;
      const fabricLabel = getFabricLabel(editDraft.value.fabric);
      const unitPrice = calcUnitPrice(
        fabricLabel,
        editDraft.value.size,
        props.item.quantity,
        editDraft.value.hasFringe,
        editDraft.value.doubleSided
      );
      const designPrice = calcDesignPrice(editDraft.value.orderDesign);
      return {
        total: unitPrice * props.item.quantity + designPrice,
        unit: unitPrice
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppCheckbox = __nuxt_component_1$4;
      const _component_QuantityInput = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "item-row" }, _attrs))} data-v-0c8b6daa>`);
      _push(ssrRenderComponent(_component_AppCheckbox, {
        "model-value": __props.item.selected,
        "onUpdate:modelValue": ($event) => emit("toggle")
      }, null, _parent));
      _push(`<div class="item-row__product" data-v-0c8b6daa><div class="item-row__image-wrap" data-v-0c8b6daa><img${ssrRenderAttr("src", __props.item.image)}${ssrRenderAttr("alt", __props.item.name)} class="item-row__image" data-v-0c8b6daa></div><div class="item-row__details" data-v-0c8b6daa><div class="item-row__top" data-v-0c8b6daa><div class="item-row__info" data-v-0c8b6daa><p class="item-row__name" data-v-0c8b6daa>${ssrInterpolate(__props.item.name)}</p>`);
      if (!__props.editing) {
        _push(`<div class="item-row__meta" data-v-0c8b6daa><p class="item-row__desc" data-v-0c8b6daa>${ssrInterpolate(__props.item.description)}</p>`);
        if (__props.item.customerComment) {
          _push(`<p class="item-row__note" data-v-0c8b6daa>${ssrInterpolate(__props.item.customerComment)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="item-row__edit-options" data-v-0c8b6daa><div class="inline-select" role="listbox" data-v-0c8b6daa><span class="inline-select__text" data-v-0c8b6daa>${ssrInterpolate(labelFor(unref(FABRICS), unref(editDraft).fabric))}</span><svg class="inline-select__chevron" viewBox="0 0 9 5" fill="none"${ssrRenderAttr("aria-expanded", unref(openDropdown) === "fabric")} data-v-0c8b6daa><path d="M1 1l3.28 3.28L7.56 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" data-v-0c8b6daa></path></svg>`);
        if (unref(openDropdown) === "fabric") {
          _push(`<div class="inline-select__dropdown" role="listbox" data-v-0c8b6daa><!--[-->`);
          ssrRenderList(unref(FABRICS), (f) => {
            _push(`<button role="option"${ssrRenderAttr("aria-selected", f.value === unref(editDraft).fabric)} class="${ssrRenderClass(["inline-select__option", { "inline-select__option--active": f.value === unref(editDraft).fabric }])}" data-v-0c8b6daa>${ssrInterpolate(f.label)}</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="inline-select" role="listbox" data-v-0c8b6daa><span class="inline-select__text" data-v-0c8b6daa>${ssrInterpolate(labelFor(unref(MOUNTINGS), unref(editDraft).mounting))}</span><svg class="inline-select__chevron" viewBox="0 0 9 5" fill="none"${ssrRenderAttr("aria-expanded", unref(openDropdown) === "mounting")} data-v-0c8b6daa><path d="M1 1l3.28 3.28L7.56 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" data-v-0c8b6daa></path></svg>`);
        if (unref(openDropdown) === "mounting") {
          _push(`<div class="inline-select__dropdown" role="listbox" data-v-0c8b6daa><!--[-->`);
          ssrRenderList(unref(MOUNTINGS), (m) => {
            _push(`<button role="option"${ssrRenderAttr("aria-selected", m.value === unref(editDraft).mounting)} class="${ssrRenderClass(["inline-select__option", { "inline-select__option--active": m.value === unref(editDraft).mounting }])}" data-v-0c8b6daa>${ssrInterpolate(m.label)}</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="inline-select" role="listbox" data-v-0c8b6daa><span class="inline-select__text" data-v-0c8b6daa>${ssrInterpolate(labelFor(unref(SIZES), unref(editDraft).size))}</span><svg class="inline-select__chevron" viewBox="0 0 9 5" fill="none"${ssrRenderAttr("aria-expanded", unref(openDropdown) === "size")} data-v-0c8b6daa><path d="M1 1l3.28 3.28L7.56 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" data-v-0c8b6daa></path></svg>`);
        if (unref(openDropdown) === "size") {
          _push(`<div class="inline-select__dropdown" role="listbox" data-v-0c8b6daa><!--[-->`);
          ssrRenderList(unref(SIZES), (s) => {
            _push(`<button role="option"${ssrRenderAttr("aria-selected", s.value === unref(editDraft).size)} class="${ssrRenderClass(["inline-select__option", { "inline-select__option--active": s.value === unref(editDraft).size }])}" data-v-0c8b6daa>${ssrInterpolate(s.label)}</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><span class="${ssrRenderClass(["inline-toggle", { "inline-toggle--off": !unref(editDraft).hasFringe }])}" data-v-0c8b6daa>бахрома</span><span class="${ssrRenderClass(["inline-toggle", { "inline-toggle--off": !unref(editDraft).doubleSided }])}" data-v-0c8b6daa>печать с двух сторон</span></div>`);
      }
      _push(`</div>`);
      if (!__props.editing) {
        _push(`<button class="item-edit-badge" data-v-0c8b6daa>Изменить</button>`);
      } else {
        _push(`<div class="item-row__edit-actions" data-v-0c8b6daa><button class="edit-action edit-action--cancel" aria-label="Отменить редактирование" data-v-0c8b6daa><svg viewBox="0 0 8.56 8.56" fill="none" data-v-0c8b6daa><path fill-rule="evenodd" clip-rule="evenodd" d="M4.28 5.34L7.5 8.56l1.06-1.06L5.34 4.28 8.56 1.06 7.5 0 4.28 3.22 1.06 0 0 1.06l3.22 3.22L0 7.5l1.06 1.06L4.28 5.34Z" fill="#E12E3C" data-v-0c8b6daa></path></svg></button><button class="edit-action edit-action--confirm" aria-label="Подтвердить изменения" data-v-0c8b6daa><svg viewBox="0 0 9.75 7.55" fill="none" data-v-0c8b6daa><path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 1.2L4.65 7.22a1 1 0 0 1-.7.33 1 1 0 0 1-.71-.32L0 3.53l1.4-1.22 2.53 2.9L8.33 0 9.75 1.2Z" fill="#008A0B" data-v-0c8b6daa></path></svg></button></div>`);
      }
      _push(`</div><div class="item-row__bottom" data-v-0c8b6daa>`);
      _push(ssrRenderComponent(_component_QuantityInput, {
        "model-value": __props.item.quantity,
        "onUpdate:modelValue": (qty) => emit("update-quantity", qty)
      }, null, _parent));
      _push(`<div class="item-row__price" data-v-0c8b6daa>`);
      if (__props.editing && unref(previewPrice)) {
        _push(`<!--[--><p class="item-row__total" data-v-0c8b6daa>${ssrInterpolate(unref(formatPriceRaw)(unref(previewPrice).total))} ₽</p><p class="item-row__unit-price" data-v-0c8b6daa>${ssrInterpolate(unref(formatPriceRaw)(unref(previewPrice).unit))} ₽ / шт</p><!--]-->`);
      } else {
        _push(`<!--[--><p class="item-row__total" data-v-0c8b6daa>${ssrInterpolate(unref(formatPriceRaw)(__props.item.unitPrice * __props.item.quantity + __props.item.designPrice))} ₽</p><p class="item-row__unit-price" data-v-0c8b6daa>${ssrInterpolate(unref(formatPriceRaw)(__props.item.unitPrice))} ₽ / шт</p><!--]-->`);
      }
      _push(`</div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartItemRow.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_2$2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$8, [["__scopeId", "data-v-0c8b6daa"]]), { __name: "CartItemRow" });
const _sfc_main$7 = {
  __name: "AppInput",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: void 0
    },
    max: {
      type: Number,
      default: void 0
    },
    mask: {
      type: String,
      default: null
    }
  }, {
    "modelValue": { default: "" },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$r;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-input-wrapper" }, _attrs))} data-v-e26054f7><div class="${ssrRenderClass([
        "app-input",
        { "app-input--disabled": __props.disabled }
      ])}" data-v-e26054f7>`);
      if (__props.icon) {
        _push(ssrRenderComponent(_component_UIcon, {
          name: __props.icon,
          class: "app-input__icon"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderDynamicModel(__props.type, model.value, null)}${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrRenderAttr("min", __props.min)}${ssrRenderAttr("max", __props.max)} class="app-input__field" data-v-e26054f7>`);
      if (__props.suffix) {
        _push(`<span class="app-input__suffix" data-v-e26054f7>${ssrInterpolate(__props.suffix)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.description) {
        _push(`<p class="app-input-description" data-v-e26054f7>${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppInput.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-e26054f7"]]);
const _sfc_main$6 = {
  __name: "CartRecipient",
  __ssrInlineRender: true,
  setup(__props) {
    const recipientName = ref("");
    const recipientPhone = ref("");
    const recipientEmail = ref("");
    const anotherPerson = ref(false);
    const anotherName = ref("");
    const anotherPhone = ref("");
    const emailError = computed(() => {
      if (!recipientEmail.value) return "";
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(recipientEmail.value) ? "" : "Некорректный email";
    });
    const phoneError = computed(() => {
      if (!recipientPhone.value) return "";
      const digits = recipientPhone.value.replace(/\D/g, "");
      return digits.length >= 11 ? "" : "Введите полный номер";
    });
    const anotherPhoneError = computed(() => {
      if (!anotherPhone.value) return "";
      const digits = anotherPhone.value.replace(/\D/g, "");
      return digits.length >= 11 ? "" : "Введите полный номер";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppInput = __nuxt_component_0;
      const _component_AppSwitch = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card--mid" }, _attrs))} data-v-7c4f2694><div class="card__inner" data-v-7c4f2694><div class="recipient-header" data-v-7c4f2694><p class="section-title" data-v-7c4f2694>Данные получателя</p><div class="recipient-links" data-v-7c4f2694><a href="#" class="ext-link ext-link--muted" data-v-7c4f2694> Добавить организацию <svg class="ext-link__icon" viewBox="0 0 12 12" fill="none" data-v-7c4f2694><path d="M2.619 6.261a.804.804 0 0 1-1.17 0 .805.805 0 0 1-.001-.826L5.526 1.698H2.95a.569.569 0 0 1-.568-.572c.002-.312.256-.564.568-.564h4.288c.138 0 .25.112.25.25v4.285a.571.571 0 0 1-1.142 0l.007-2.572L2.619 6.26Z" fill="currentColor" data-v-7c4f2694></path></svg></a><a href="#" class="ext-link ext-link--muted" data-v-7c4f2694> Добавить получателя <svg class="ext-link__icon" viewBox="0 0 12 12" fill="none" data-v-7c4f2694><path d="M2.619 6.261a.804.804 0 0 1-1.17 0 .805.805 0 0 1-.001-.826L5.526 1.698H2.95a.569.569 0 0 1-.568-.572c.002-.312.256-.564.568-.564h4.288c.138 0 .25.112.25.25v4.285a.571.571 0 0 1-1.142 0l.007-2.572L2.619 6.26Z" fill="currentColor" data-v-7c4f2694></path></svg></a></div></div><div class="form-fields" data-v-7c4f2694><div class="field-row" data-v-7c4f2694><label class="field-label" data-v-7c4f2694>Имя</label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(recipientName),
        "onUpdate:modelValue": ($event) => isRef(recipientName) ? recipientName.value = $event : null,
        placeholder: "Иван"
      }, null, _parent));
      _push(`</div><div class="field-row" data-v-7c4f2694><label class="field-label" data-v-7c4f2694>Номер телефона</label><div class="field-col" data-v-7c4f2694>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(recipientPhone),
        "onUpdate:modelValue": ($event) => isRef(recipientPhone) ? recipientPhone.value = $event : null,
        mask: "+7(###)-###-##-##",
        placeholder: "+7(___)-___-__-__"
      }, null, _parent));
      if (unref(phoneError)) {
        _push(`<span class="field-error" data-v-7c4f2694>${ssrInterpolate(unref(phoneError))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="field-row" data-v-7c4f2694><label class="field-label" data-v-7c4f2694>Электропочта</label><div class="field-col" data-v-7c4f2694>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(recipientEmail),
        "onUpdate:modelValue": ($event) => isRef(recipientEmail) ? recipientEmail.value = $event : null,
        placeholder: "mail@example.com"
      }, null, _parent));
      if (unref(emailError)) {
        _push(`<span class="field-error" data-v-7c4f2694>${ssrInterpolate(unref(emailError))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_AppSwitch, {
        modelValue: unref(anotherPerson),
        "onUpdate:modelValue": ($event) => isRef(anotherPerson) ? anotherPerson.value = $event : null,
        label: "Заберёт другой человек"
      }, null, _parent));
      if (unref(anotherPerson)) {
        _push(`<div class="form-fields" data-v-7c4f2694><div class="field-row" data-v-7c4f2694><label class="field-label" data-v-7c4f2694>Имя</label>`);
        _push(ssrRenderComponent(_component_AppInput, {
          modelValue: unref(anotherName),
          "onUpdate:modelValue": ($event) => isRef(anotherName) ? anotherName.value = $event : null,
          placeholder: "Иван"
        }, null, _parent));
        _push(`</div><div class="field-row" data-v-7c4f2694><label class="field-label" data-v-7c4f2694>Номер телефона</label><div class="field-col" data-v-7c4f2694>`);
        _push(ssrRenderComponent(_component_AppInput, {
          modelValue: unref(anotherPhone),
          "onUpdate:modelValue": ($event) => isRef(anotherPhone) ? anotherPhone.value = $event : null,
          mask: "+7(###)-###-##-##",
          placeholder: "+7(___)-___-__-__"
        }, null, _parent));
        if (unref(anotherPhoneError)) {
          _push(`<span class="field-error" data-v-7c4f2694>${ssrInterpolate(unref(anotherPhoneError))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartRecipient.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-7c4f2694"]]);
const _sfc_main$5 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card--bottom" }, _attrs))} data-v-a007ae44><div class="card__inner" data-v-a007ae44><div class="pickup-header" data-v-a007ae44><p class="section-title" data-v-a007ae44>Откуда забрать заказ</p><div class="pickup-address" data-v-a007ae44><a href="https://yandex.ru/maps/-/CHEbFD2T" target="_blank" rel="noopener noreferrer" class="ext-link" data-v-a007ae44> ДНР, Донецк, ул. Постышева, дом 60 <svg class="ext-link__icon" viewBox="0 0 12 12" fill="none" data-v-a007ae44><path d="M2.619 6.261a.804.804 0 0 1-1.17 0 .805.805 0 0 1-.001-.826L5.526 1.698H2.95a.569.569 0 0 1-.568-.572c.002-.312.256-.564.568-.564h4.288c.138 0 .25.112.25.25v4.285a.571.571 0 0 1-1.142 0l.007-2.572L2.619 6.26Z" fill="currentColor" data-v-a007ae44></path></svg></a><p class="pickup-schedule" data-v-a007ae44>Пн–Пт 9:00–18:00, Сб 10:00–15:00</p></div></div><div class="map-container" data-v-a007ae44><iframe src="https://yandex.ru/map-widget/v1/?ll=37.802556%2C48.002076&amp;z=12&amp;pt=37.802556%2C48.002076%2Cpm2rdm" class="map-iframe" sandbox="allow-scripts allow-same-origin" allowfullscreen title="Карта с адресом самовывоза" data-v-a007ae44></iframe></div><p class="pickup-note" data-v-a007ae44> Для онлайн заказов доступна только доставка самовывозом. Мы работаем над тем чтобы организовать курьерскую доставку. </p></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartPickup.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a007ae44"]]), { __name: "CartPickup" });
const _sfc_main$4 = {
  __name: "CartSummary",
  __ssrInlineRender: true,
  props: {
    totalItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    payDisabled: { type: Boolean, default: false }
  },
  emits: ["pay"],
  setup(__props, { emit: __emit }) {
    const promoCode = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppInput = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sidebar-sticky" }, _attrs))} data-v-3dd90177><div class="summary-card" data-v-3dd90177><p class="section-title" data-v-3dd90177>Товары</p><div class="summary-rows" data-v-3dd90177><div class="summary-row" data-v-3dd90177><span class="summary-row__label" data-v-3dd90177>Тиражи (${ssrInterpolate(__props.totalItems)} шт)</span><span class="summary-row__value" data-v-3dd90177>${ssrInterpolate(unref(formatPriceRaw)(__props.totalPrice))} ₽</span></div><div class="summary-row" data-v-3dd90177><span class="summary-row__label" data-v-3dd90177>Доставка</span><span class="summary-row__value" data-v-3dd90177>Самовывоз</span></div></div><div class="summary-divider" data-v-3dd90177></div><div class="summary-total" data-v-3dd90177><span class="summary-total__label" data-v-3dd90177>К оплате</span><span class="summary-total__value" data-v-3dd90177>${ssrInterpolate(unref(formatPriceRaw)(__props.totalPrice))} ₽</span></div><div class="promo-section" data-v-3dd90177><div class="promo-row" data-v-3dd90177>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(promoCode),
        "onUpdate:modelValue": ($event) => isRef(promoCode) ? promoCode.value = $event : null,
        placeholder: "Введите промокод"
      }, null, _parent));
      _push(`<button class="promo-btn" data-v-3dd90177>Применить</button></div></div><button class="pay-btn"${ssrIncludeBooleanAttr(__props.payDisabled) ? " disabled" : ""} data-v-3dd90177> Оплатить заказ </button><div class="trust-badges" data-v-3dd90177><div class="trust-badge" data-v-3dd90177><svg class="trust-badge__icon" viewBox="0 0 16 16" fill="none" data-v-3dd90177><circle cx="8" cy="8" r="6" fill="currentColor" fill-opacity="0.64" data-v-3dd90177></circle></svg><span class="trust-badge__text" data-v-3dd90177>Безопасная оплата</span></div><div class="trust-badge" data-v-3dd90177><svg class="trust-badge__icon" viewBox="0 0 16 16" fill="none" data-v-3dd90177><circle cx="8" cy="8" r="6" fill="currentColor" fill-opacity="0.64" data-v-3dd90177></circle></svg><span class="trust-badge__text" data-v-3dd90177>Оплата СБП или по счёту</span></div><div class="trust-badge" data-v-3dd90177><svg class="trust-badge__icon" viewBox="0 0 16 16" fill="none" data-v-3dd90177><circle cx="8" cy="8" r="6" fill="currentColor" fill-opacity="0.64" data-v-3dd90177></circle></svg><span class="trust-badge__text" data-v-3dd90177>Самовывоз из Донецка</span></div></div></div><div class="help-card" data-v-3dd90177><div class="help-card__info" data-v-3dd90177><div class="help-card__avatar" data-v-3dd90177></div><div class="help-card__text" data-v-3dd90177><p class="help-card__title" data-v-3dd90177>Нужна помощь?</p><p class="help-card__subtitle" data-v-3dd90177>Позвоните в поддержку.</p></div></div><a href="tel:+78001234567" class="help-card__call-btn" aria-label="Позвонить в поддержку" data-v-3dd90177><svg class="help-card__call-icon" viewBox="0 0 23 9" fill="none" data-v-3dd90177><path d="M18.187 0H19.5458C19.9537 0 20.1577 0 20.3219 0.0181341C21.8931 0.191675 23.06 1.55458 22.9896 3.13374C22.9822 3.29873 22.9508 3.50026 22.888 3.90328L22.888 3.90341C22.8643 4.0556 22.9236 3.67511 22.8733 3.89107C22.5263 5.3836 20.4307 7.7069 18.9818 8.20556C18.7721 8.27771 19.9455 7.96861 19.4761 8.09225C17.7018 8.55968 15.0794 9 11.4963 9C7.91323 9 5.29085 8.55968 3.51648 8.09225C3.04715 7.96861 4.22048 8.27771 4.01084 8.20556C2.56189 7.7069 0.466323 5.3836 0.119262 3.89107C0.069047 3.67512 0.128344 4.0556 0.104625 3.90341C0.0418033 3.5003 0.0103925 3.29875 0.00302911 3.13374C-0.0674374 1.55458 1.09952 0.191675 2.67069 0.0181341C2.83487 0 3.03886 0 3.44683 0H4.80565C6.05418 0 7.15861 0.809421 7.53458 2C7.91055 3.19058 9.01498 4 10.2635 4H12.7291C13.9776 4 15.0821 3.19058 15.458 2C15.834 0.809421 16.9384 0 18.187 0Z" fill="currentColor" data-v-3dd90177></path></svg></a></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartSummary.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-3dd90177"]]);
const imageModules = /* @__PURE__ */ Object.assign({ "/assets/images/catalog_slider_1.png": catalogSliderImage1, "/assets/images/catalog_slider_2.png": catalogSliderImage2, "/assets/images/catalog_slider_3.png": catalogSliderImage3, "/assets/images/catalog_slider_4.png": catalogSliderImage4, "/assets/images/catalog_slider_5.png": catalogSliderImage5, "/assets/images/dense_polyester_grommets_60x90_double.png": __vite_glob_0_5, "/assets/images/dense_polyester_grommets_60x90_double_fringe.png": __vite_glob_0_6, "/assets/images/dense_polyester_grommets_60x90_single.png": __vite_glob_0_7, "/assets/images/dense_polyester_grommets_60x90_single_fringe.png": __vite_glob_0_8, "/assets/images/dense_polyester_grommets_90x135_double.png": __vite_glob_0_9, "/assets/images/dense_polyester_grommets_90x135_double_fringe.png": __vite_glob_0_10, "/assets/images/dense_polyester_grommets_90x135_single.png": __vite_glob_0_11, "/assets/images/dense_polyester_grommets_90x135_single_fringe.png": __vite_glob_0_12, "/assets/images/dense_polyester_sleeve_60x90_double.png": __vite_glob_0_13, "/assets/images/dense_polyester_sleeve_60x90_double_fringe.png": __vite_glob_0_14, "/assets/images/dense_polyester_sleeve_60x90_single.png": __vite_glob_0_15, "/assets/images/dense_polyester_sleeve_60x90_single_fringe.png": __vite_glob_0_16, "/assets/images/dense_polyester_sleeve_90x135_double.png": __vite_glob_0_17, "/assets/images/dense_polyester_sleeve_90x135_double_fringe.png": __vite_glob_0_18, "/assets/images/dense_polyester_sleeve_90x135_single.png": __vite_glob_0_19, "/assets/images/dense_polyester_sleeve_90x135_single_fringe.png": __vite_glob_0_20, "/assets/images/mesh_grommets_60x90_double.png": __vite_glob_0_21, "/assets/images/mesh_grommets_60x90_double_fringe.png": __vite_glob_0_22, "/assets/images/mesh_grommets_60x90_single.png": __vite_glob_0_23, "/assets/images/mesh_grommets_60x90_single_fringe.png": __vite_glob_0_24, "/assets/images/mesh_grommets_90x135_double.png": __vite_glob_0_25, "/assets/images/mesh_grommets_90x135_double_fringe.png": __vite_glob_0_26, "/assets/images/mesh_grommets_90x135_single.png": __vite_glob_0_27, "/assets/images/mesh_grommets_90x135_single_fringe.png": __vite_glob_0_28, "/assets/images/mesh_sleeve_60x90_double.png": __vite_glob_0_29, "/assets/images/mesh_sleeve_60x90_double_fringe.png": __vite_glob_0_30, "/assets/images/mesh_sleeve_60x90_single.png": __vite_glob_0_31, "/assets/images/mesh_sleeve_60x90_single_fringe.png": __vite_glob_0_32, "/assets/images/mesh_sleeve_90x135_double.png": __vite_glob_0_33, "/assets/images/mesh_sleeve_90x135_double_fringe.png": __vite_glob_0_34, "/assets/images/mesh_sleeve_90x135_single.png": __vite_glob_0_35, "/assets/images/mesh_sleeve_90x135_single_fringe.png": __vite_glob_0_36, "/assets/images/polyester_grommets_60x90_double.png": __vite_glob_0_37, "/assets/images/polyester_grommets_60x90_double_fringe.png": __vite_glob_0_38, "/assets/images/polyester_grommets_60x90_single.png": __vite_glob_0_39, "/assets/images/polyester_grommets_60x90_single_fringe.png": __vite_glob_0_40, "/assets/images/polyester_grommets_90x135_double.png": __vite_glob_0_41, "/assets/images/polyester_grommets_90x135_double_fringe.png": __vite_glob_0_42, "/assets/images/polyester_grommets_90x135_single.png": __vite_glob_0_43, "/assets/images/polyester_grommets_90x135_single_fringe.png": __vite_glob_0_44, "/assets/images/polyester_sleeve_60x90_double.png": __vite_glob_0_45, "/assets/images/polyester_sleeve_60x90_double_fringe.png": __vite_glob_0_46, "/assets/images/polyester_sleeve_60x90_single.png": __vite_glob_0_47, "/assets/images/polyester_sleeve_60x90_single_fringe.png": __vite_glob_0_48, "/assets/images/polyester_sleeve_90x135_double.png": __vite_glob_0_49, "/assets/images/polyester_sleeve_90x135_double_fringe.png": __vite_glob_0_50, "/assets/images/polyester_sleeve_90x135_single.png": __vite_glob_0_51, "/assets/images/polyester_sleeve_90x135_single_fringe.png": __vite_glob_0_52, "/assets/images/satin_grommets_60x90_double.png": __vite_glob_0_53, "/assets/images/satin_grommets_60x90_double_fringe.png": __vite_glob_0_54, "/assets/images/satin_grommets_60x90_single.png": __vite_glob_0_55, "/assets/images/satin_grommets_60x90_single_fringe.png": __vite_glob_0_56, "/assets/images/satin_grommets_90x135_double.png": __vite_glob_0_57, "/assets/images/satin_grommets_90x135_double_fringe.png": __vite_glob_0_58, "/assets/images/satin_grommets_90x135_single.png": __vite_glob_0_59, "/assets/images/satin_grommets_90x135_single_fringe.png": __vite_glob_0_60, "/assets/images/satin_sleeve_60x90_double.png": __vite_glob_0_61, "/assets/images/satin_sleeve_60x90_double_fringe.png": __vite_glob_0_62, "/assets/images/satin_sleeve_60x90_single.png": __vite_glob_0_63, "/assets/images/satin_sleeve_60x90_single_fringe.png": __vite_glob_0_64, "/assets/images/satin_sleeve_90x135_double.png": __vite_glob_0_65, "/assets/images/satin_sleeve_90x135_double_fringe.png": __vite_glob_0_66, "/assets/images/satin_sleeve_90x135_single.png": __vite_glob_0_67, "/assets/images/satin_sleeve_90x135_single_fringe.png": __vite_glob_0_68 });
function resolveImage(fabric, mounting, size, doubleSided, hasFringe) {
  const fabricKey = FABRIC_IMAGE_MAP[fabric] || "mesh";
  const mountingKey = MOUNTING_IMAGE_MAP[mounting] || "sleeve";
  const sided = doubleSided ? "double" : "single";
  const fringe = hasFringe ? "_fringe" : "";
  const filename = `${fabricKey}_${mountingKey}_${size}_${sided}${fringe}.png`;
  const key = Object.keys(imageModules).find((k) => k.endsWith(`/${filename}`));
  return key ? imageModules[key] : "";
}
function buildDescription({ fabricLabel, mounting, sizeLabel, hasFringe, doubleSided, orderDesign }) {
  const parts = [fabricLabel];
  if (mounting === "grommets") parts.push("люверсы");
  else parts.push("под древко");
  parts.push(sizeLabel);
  if (hasFringe) parts.push("бахрома");
  if (doubleSided) parts.push("печать с двух сторон");
  if (orderDesign) parts.push("услуги дизайнера");
  return parts.join(", ");
}
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function useCart() {
  const items = useState("cart-items", () => []);
  function addItem({ fabric, fabricLabel, fabricGenitive, mounting, size, sizeLabel, quantity, hasFringe, doubleSided, orderDesign, unitPrice, designPrice, description }) {
    const image = resolveImage(fabric, mounting, size, doubleSided, hasFringe);
    const itemDescription = buildDescription({ fabricLabel, mounting, sizeLabel, hasFringe, doubleSided, orderDesign });
    const customerComment = description?.trim() ?? "";
    const genitive = fabricGenitive || getFabricGenitive(fabric);
    const item = {
      id: generateId(),
      name: `Флаг из ${genitive}`,
      description: itemDescription,
      customerComment,
      image,
      quantity,
      unitPrice,
      designPrice: designPrice || 0,
      selected: true,
      config: { fabric, mounting, size, quantity, hasFringe, doubleSided, orderDesign }
    };
    items.value = [...items.value, item];
    return item;
  }
  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }
  function removeItems(ids) {
    const idSet = new Set(ids);
    items.value = items.value.filter((item) => !idSet.has(item.id));
  }
  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) => {
      if (item.id !== id) return item;
      const nextQuantity = Math.max(1, quantity);
      const fabricLabel = getFabricLabel(item.config.fabric);
      const unitPrice = calcUnitPrice(
        fabricLabel,
        item.config.size,
        nextQuantity,
        item.config.hasFringe,
        item.config.doubleSided
      );
      return {
        ...item,
        quantity: nextQuantity,
        unitPrice,
        config: {
          ...item.config,
          quantity: nextQuantity
        }
      };
    });
  }
  function updateItem(id, config) {
    items.value = items.value.map((item) => {
      if (item.id !== id) return item;
      const image = resolveImage(config.fabric, config.mounting, config.size, config.doubleSided, config.hasFringe);
      const fabricLabel = getFabricLabel(config.fabric);
      const fabricGenitive = getFabricGenitive(config.fabric);
      const sizeLabel = getSizeLabel(config.size);
      const description = buildDescription({
        fabricLabel,
        mounting: config.mounting,
        sizeLabel,
        hasFringe: config.hasFringe,
        doubleSided: config.doubleSided,
        orderDesign: config.orderDesign
      });
      const unitPrice = calcUnitPrice(fabricLabel, config.size, item.quantity, config.hasFringe, config.doubleSided);
      const designPrice = calcDesignPrice(config.orderDesign);
      return {
        ...item,
        name: `Флаг из ${fabricGenitive}`,
        description,
        image,
        unitPrice,
        designPrice,
        config: { ...config }
      };
    });
  }
  function clearCart() {
    items.value = [];
  }
  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.unitPrice * item.quantity + item.designPrice, 0));
  return {
    items,
    addItem,
    removeItem,
    removeItems,
    updateItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };
}
const _sfc_main$3 = {
  __name: "CartModal",
  __ssrInlineRender: true,
  props: {
    "modelValue": { required: true },
    "modelModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["pay", "continue-shopping"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const isOpen = useModel(__props, "modelValue");
    const emit = __emit;
    const { items: cartItems, updateQuantity, removeItems, updateItem } = useCart();
    const selectedItems = computed(() => cartItems.value.filter((item) => item.selected));
    const allSelected = computed({
      get: () => cartItems.value.length > 0 && cartItems.value.every((i) => i.selected),
      set: (val) => {
        cartItems.value = cartItems.value.map((i) => ({ ...i, selected: val }));
      }
    });
    const selectedTotalItems = computed(
      () => selectedItems.value.reduce((sum, item) => sum + item.quantity, 0)
    );
    const selectedTotalPrice = computed(
      () => selectedItems.value.reduce((sum, item) => sum + item.unitPrice * item.quantity + item.designPrice, 0)
    );
    function toggleItem(item) {
      cartItems.value = cartItems.value.map(
        (i) => i.id === item.id ? { ...i, selected: !i.selected } : i
      );
    }
    function deleteSelected() {
      const ids = cartItems.value.filter((i) => i.selected).map((i) => i.id);
      removeItems(ids);
    }
    const editingId = ref(null);
    function startEdit(itemId) {
      editingId.value = itemId;
    }
    function cancelEdit() {
      editingId.value = null;
    }
    function confirmEdit(itemId, config) {
      updateItem(itemId, config);
      editingId.value = null;
    }
    function pluralItems(n) {
      const mod100 = n % 100;
      const mod10 = n % 10;
      if (mod100 >= 11 && mod100 <= 19) return "тиражей";
      if (mod10 === 1) return "тираж";
      if (mod10 >= 2 && mod10 <= 4) return "тиража";
      return "тиражей";
    }
    function onPay() {
      if (selectedItems.value.length === 0) return;
      emit("pay", selectedItems.value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = __nuxt_component_0$1;
      const _component_AppCheckbox = __nuxt_component_1$4;
      const _component_CartItemRow = __nuxt_component_2$2;
      const _component_CartRecipient = __nuxt_component_3$1;
      const _component_CartPickup = __nuxt_component_4;
      const _component_CartSummary = __nuxt_component_5;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        modelValue: isOpen.value,
        "onUpdate:modelValue": ($event) => isOpen.value = $event,
        title: "Корзина",
        "max-width": "70rem"
      }, _attrs), {
        "header-left": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="back-link" data-v-0fb587ff${_scopeId}><svg class="back-link__icon" viewBox="0 0 16 16" fill="none" data-v-0fb587ff${_scopeId}><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-0fb587ff${_scopeId}></path></svg><span class="back-link__text" data-v-0fb587ff${_scopeId}>Продолжить покупки</span></button>`);
          } else {
            return [
              createVNode("button", {
                class: "back-link",
                onClick: ($event) => emit("continue-shopping")
              }, [
                (openBlock(), createBlock("svg", {
                  class: "back-link__icon",
                  viewBox: "0 0 16 16",
                  fill: "none"
                }, [
                  createVNode("path", {
                    d: "M10 12L6 8L10 4",
                    stroke: "currentColor",
                    "stroke-width": "1.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ])),
                createVNode("span", { class: "back-link__text" }, "Продолжить покупки")
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal-content" data-v-0fb587ff${_scopeId}><div class="left-column" data-v-0fb587ff${_scopeId}>`);
            if (unref(cartItems).length === 0) {
              _push2(`<div class="card card--top" data-v-0fb587ff${_scopeId}><div class="card__inner empty-state" data-v-0fb587ff${_scopeId}><p class="empty-state__title" data-v-0fb587ff${_scopeId}>Корзина пуста</p><p class="empty-state__subtitle" data-v-0fb587ff${_scopeId}>Воспользуйтесь каталогом, чтобы найти всё что нужно</p><button class="empty-state__btn" type="button" data-v-0fb587ff${_scopeId}>Начать покупки</button></div></div>`);
            } else {
              _push2(`<div class="card card--top" data-v-0fb587ff${_scopeId}><div class="card__inner" data-v-0fb587ff${_scopeId}><p class="section-title" data-v-0fb587ff${_scopeId}>Товары</p><div class="items-header" data-v-0fb587ff${_scopeId}><div class="items-header__left" data-v-0fb587ff${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AppCheckbox, {
                modelValue: unref(allSelected),
                "onUpdate:modelValue": ($event) => isRef(allSelected) ? allSelected.value = $event : null
              }, null, _parent2, _scopeId));
              _push2(`<span class="items-header__count" data-v-0fb587ff${_scopeId}>${ssrInterpolate(unref(cartItems).length)} ${ssrInterpolate(pluralItems(unref(cartItems).length))}</span></div><button class="items-header__delete" aria-label="Удалить выбранные тиражи" data-v-0fb587ff${_scopeId}><svg class="items-header__delete-icon" viewBox="0 0 16 16" fill="none" data-v-0fb587ff${_scopeId}><path d="M2 7H14L13.4744 11.7301C13.3067 13.24 13.2228 13.995 12.8745 14.5647C12.5677 15.0666 12.1201 15.4672 11.5874 15.7168C10.9826 16 10.223 16 8.70379 16H7.29621C5.77697 16 5.01735 16 4.41263 15.7168C3.87993 15.4672 3.43233 15.0666 3.12552 14.5647C2.77722 13.995 2.69333 13.24 2.52556 11.7301L2 7Z" fill="currentColor" fill-opacity="0.64" data-v-0fb587ff${_scopeId}></path><path d="M1 3.5C1 2.67157 1.67157 2 2.5 2C3.32843 2 3.97177 1.24281 4.53657 0.636766C4.90168 0.244995 5.42223 0 6 0H10C10.5778 0 11.0983 0.244995 11.4634 0.636766C12.0282 1.24281 12.6716 2 13.5 2C14.3284 2 15 2.67157 15 3.5C15 4.32843 14.3284 5 13.5 5H2.5C1.67157 5 1 4.32843 1 3.5Z" fill="currentColor" fill-opacity="0.64" data-v-0fb587ff${_scopeId}></path></svg><span data-v-0fb587ff${_scopeId}>Удалить</span></button></div><div class="items-list" data-v-0fb587ff${_scopeId}><!--[-->`);
              ssrRenderList(unref(cartItems), (item) => {
                _push2(ssrRenderComponent(_component_CartItemRow, {
                  key: item.id,
                  item,
                  editing: unref(editingId) === item.id,
                  onToggle: ($event) => toggleItem(item),
                  onStartEdit: ($event) => startEdit(item.id),
                  onCancelEdit: cancelEdit,
                  onConfirmEdit: (config) => confirmEdit(item.id, config),
                  onUpdateQuantity: (qty) => unref(updateQuantity)(item.id, qty)
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div></div>`);
            }
            _push2(ssrRenderComponent(_component_CartRecipient, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CartPickup, null, null, _parent2, _scopeId));
            _push2(`</div><div class="right-column" data-v-0fb587ff${_scopeId}>`);
            _push2(ssrRenderComponent(_component_CartSummary, {
              "total-items": unref(selectedTotalItems),
              "total-price": unref(selectedTotalPrice),
              "pay-disabled": unref(selectedItems).length === 0,
              onPay
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "modal-content" }, [
                createVNode("div", { class: "left-column" }, [
                  unref(cartItems).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "card card--top"
                  }, [
                    createVNode("div", { class: "card__inner empty-state" }, [
                      createVNode("p", { class: "empty-state__title" }, "Корзина пуста"),
                      createVNode("p", { class: "empty-state__subtitle" }, "Воспользуйтесь каталогом, чтобы найти всё что нужно"),
                      createVNode("button", {
                        class: "empty-state__btn",
                        type: "button",
                        onClick: ($event) => emit("continue-shopping")
                      }, "Начать покупки", 8, ["onClick"])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "card card--top"
                  }, [
                    createVNode("div", { class: "card__inner" }, [
                      createVNode("p", { class: "section-title" }, "Товары"),
                      createVNode("div", { class: "items-header" }, [
                        createVNode("div", { class: "items-header__left" }, [
                          createVNode(_component_AppCheckbox, {
                            modelValue: unref(allSelected),
                            "onUpdate:modelValue": ($event) => isRef(allSelected) ? allSelected.value = $event : null
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("span", { class: "items-header__count" }, toDisplayString(unref(cartItems).length) + " " + toDisplayString(pluralItems(unref(cartItems).length)), 1)
                        ]),
                        createVNode("button", {
                          class: "items-header__delete",
                          "aria-label": "Удалить выбранные тиражи",
                          onClick: deleteSelected
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "items-header__delete-icon",
                            viewBox: "0 0 16 16",
                            fill: "none"
                          }, [
                            createVNode("path", {
                              d: "M2 7H14L13.4744 11.7301C13.3067 13.24 13.2228 13.995 12.8745 14.5647C12.5677 15.0666 12.1201 15.4672 11.5874 15.7168C10.9826 16 10.223 16 8.70379 16H7.29621C5.77697 16 5.01735 16 4.41263 15.7168C3.87993 15.4672 3.43233 15.0666 3.12552 14.5647C2.77722 13.995 2.69333 13.24 2.52556 11.7301L2 7Z",
                              fill: "currentColor",
                              "fill-opacity": "0.64"
                            }),
                            createVNode("path", {
                              d: "M1 3.5C1 2.67157 1.67157 2 2.5 2C3.32843 2 3.97177 1.24281 4.53657 0.636766C4.90168 0.244995 5.42223 0 6 0H10C10.5778 0 11.0983 0.244995 11.4634 0.636766C12.0282 1.24281 12.6716 2 13.5 2C14.3284 2 15 2.67157 15 3.5C15 4.32843 14.3284 5 13.5 5H2.5C1.67157 5 1 4.32843 1 3.5Z",
                              fill: "currentColor",
                              "fill-opacity": "0.64"
                            })
                          ])),
                          createVNode("span", null, "Удалить")
                        ])
                      ]),
                      createVNode("div", { class: "items-list" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(cartItems), (item) => {
                          return openBlock(), createBlock(_component_CartItemRow, {
                            key: item.id,
                            item,
                            editing: unref(editingId) === item.id,
                            onToggle: ($event) => toggleItem(item),
                            onStartEdit: ($event) => startEdit(item.id),
                            onCancelEdit: cancelEdit,
                            onConfirmEdit: (config) => confirmEdit(item.id, config),
                            onUpdateQuantity: (qty) => unref(updateQuantity)(item.id, qty)
                          }, null, 8, ["item", "editing", "onToggle", "onStartEdit", "onConfirmEdit", "onUpdateQuantity"]);
                        }), 128))
                      ])
                    ])
                  ])),
                  createVNode(_component_CartRecipient),
                  createVNode(_component_CartPickup)
                ]),
                createVNode("div", { class: "right-column" }, [
                  createVNode(_component_CartSummary, {
                    "total-items": unref(selectedTotalItems),
                    "total-price": unref(selectedTotalPrice),
                    "pay-disabled": unref(selectedItems).length === 0,
                    onPay
                  }, null, 8, ["total-items", "total-price", "pay-disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CartModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-0fb587ff"]]);
const _sfc_main$2 = {
  __name: "AppButton",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (v) => ["primary", "ghost"].includes(v)
    },
    size: {
      type: String,
      default: "lg",
      validator: (v) => ["md", "lg"].includes(v)
    },
    icon: {
      type: String,
      default: null
    },
    iconOnly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "button"
    }
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$r;
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.tag), mergeProps({
        class: [
          "app-button",
          `app-button--${__props.variant}`,
          `app-button--${__props.size}`,
          { "app-button--icon-only": __props.iconOnly, "app-button--disabled": __props.disabled }
        ],
        disabled: __props.disabled,
        onClick: ($event) => _ctx.$emit("click", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.icon) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: __props.icon,
                class: "app-button__icon"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (!__props.iconOnly) {
              _push2(`<span class="app-button__content" data-v-93930c34${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.icon ? (openBlock(), createBlock(_component_UIcon, {
                key: 0,
                name: __props.icon,
                class: "app-button__icon"
              }, null, 8, ["name"])) : createCommentVNode("", true),
              !__props.iconOnly ? (openBlock(), createBlock("span", {
                key: 1,
                class: "app-button__content"
              }, [
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-93930c34"]]);
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  const asyncData = useAsyncData(watchSources === false ? key.value : key, (_, { signal }) => {
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.query || opts.params]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry of value.entries()) {
        const [key, val] = entry;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
function useWorkingDay() {
  const { data, pending } = useFetch(
    "/api/working-day",
    {
      default: () => ({
        status: "working",
        isTomorrowWorking: true
      })
    },
    "$FYQG82giyp"
    /* nuxt-injected */
  );
  const status = computed(() => data.value.status);
  const isTomorrowWorking = computed(() => data.value.isTomorrowWorking);
  return {
    status,
    isTomorrowWorking,
    pending
  };
}
const _sfc_main$1 = {
  __name: "OrderSuccessModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    orderNumber: {
      type: [String, Number],
      required: true
    }
  }, {
    "modelValue": { required: true },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["order-more"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const isOpen = useModel(__props, "modelValue");
    const props = __props;
    const emit = __emit;
    const { status, isTomorrowWorking } = useWorkingDay();
    const copied = ref(false);
    const days = [
      { label: "Пн", active: true },
      { label: "Вт", active: true },
      { label: "Ср", active: true },
      { label: "Чт", active: true },
      { label: "Пт", active: true },
      { label: "Сб", active: false },
      { label: "Вс", active: false }
    ];
    async function copyOrderNumber() {
      try {
        await (void 0).clipboard.writeText(String(props.orderNumber));
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2e3);
      } catch {
      }
    }
    function onOrderMore() {
      isOpen.value = false;
      emit("order-more");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = __nuxt_component_0$1;
      const _component_UIcon = _sfc_main$r;
      const _component_AppButton = __nuxt_component_2;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        modelValue: isOpen.value,
        "onUpdate:modelValue": ($event) => isOpen.value = $event,
        "show-header": false,
        "max-width": "25.5rem"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal-card" data-v-fa77151a${_scopeId}><button class="close-btn" data-v-fa77151a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-x",
              class: "close-btn__icon"
            }, null, _parent2, _scopeId));
            _push2(`</button><div class="modal-section" data-v-fa77151a${_scopeId}><div class="modal-icon" data-v-fa77151a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-check",
              class: "modal-icon__svg"
            }, null, _parent2, _scopeId));
            _push2(`</div><h2 class="modal-title" data-v-fa77151a${_scopeId}> Заказ <button class="order-number"${ssrRenderAttr("title", unref(copied) ? "Скопировано!" : "Скопировать номер")} data-v-fa77151a${_scopeId}> №${ssrInterpolate(__props.orderNumber)}</button> оплачен </h2></div>`);
            if (unref(status) === "working") {
              _push2(`<div class="modal-section" data-v-fa77151a${_scopeId}><p class="modal-text modal-text--bold" data-v-fa77151a${_scopeId}> Менеджер свяжется с вами в течении 2-х часов, уточнит детали и отправит заказ в работу. </p></div>`);
            } else if (unref(status) === "closing-soon") {
              _push2(`<div class="modal-section" data-v-fa77151a${_scopeId}><p class="modal-text modal-text--bold" data-v-fa77151a${_scopeId}> Менеджер свяжется с вами завтра, до 12:00, уточнит детали и отправит заказ в работу. </p></div>`);
            } else if (unref(status) === "after-hours") {
              _push2(`<div class="modal-section" data-v-fa77151a${_scopeId}><p class="modal-text modal-text--bold" data-v-fa77151a${_scopeId}>`);
              if (unref(isTomorrowWorking)) {
                _push2(`<!--[--> Менеджер свяжется с вами завтра, до 12:00, уточнит детали и отправит заказ в работу. <!--]-->`);
              } else {
                _push2(`<!--[--> Менеджер свяжется с вами в ближайший рабочий день, до 12:00, уточнит детали и отправит заказ в работу. <!--]-->`);
              }
              _push2(`</p></div>`);
            } else {
              _push2(`<div class="modal-section" data-v-fa77151a${_scopeId}><p class="modal-text modal-text--bold" data-v-fa77151a${_scopeId}> Сегодня у вас выходной. <br data-v-fa77151a${_scopeId}> Менеджер свяжется с вами в ближайший рабочий день, до 12:00, уточнит детали и отправит заказ в работу. </p></div>`);
            }
            _push2(`<div class="modal-section" data-v-fa77151a${_scopeId}><p class="modal-text modal-text--secondary" data-v-fa77151a${_scopeId}> Заказ можно будет забрать по адресу: <br data-v-fa77151a${_scopeId}><a href="https://yandex.ru/maps/-/CHEbFD2T" target="_blank" rel="noopener noreferrer" class="modal-link" data-v-fa77151a${_scopeId}>Донецк, ул.Постышева, дом 60</a></p></div>`);
            if (unref(status) === "weekend") {
              _push2(`<div class="modal-section" data-v-fa77151a${_scopeId}><p class="modal-text modal-text--secondary" data-v-fa77151a${_scopeId}> Мы работаем с 9 до 18:00, <br data-v-fa77151a${_scopeId}> с понедельника по пятницу: </p><div class="days-row" data-v-fa77151a${_scopeId}><!--[-->`);
              ssrRenderList(days, (day) => {
                _push2(`<span class="${ssrRenderClass(["day-badge", { "day-badge--inactive": !day.active }])}" data-v-fa77151a${_scopeId}>${ssrInterpolate(day.label)}</span>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_AppButton, {
              class: "order-more-btn",
              size: "md",
              onClick: onOrderMore
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Заказать еще `);
                } else {
                  return [
                    createTextVNode(" Заказать еще ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "modal-card" }, [
                createVNode("button", {
                  class: "close-btn",
                  onClick: ($event) => isOpen.value = false
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-lucide-x",
                    class: "close-btn__icon"
                  })
                ], 8, ["onClick"]),
                createVNode("div", { class: "modal-section" }, [
                  createVNode("div", { class: "modal-icon" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-check",
                      class: "modal-icon__svg"
                    })
                  ]),
                  createVNode("h2", { class: "modal-title" }, [
                    createTextVNode(" Заказ "),
                    createVNode("button", {
                      class: "order-number",
                      title: unref(copied) ? "Скопировано!" : "Скопировать номер",
                      onClick: copyOrderNumber
                    }, " №" + toDisplayString(__props.orderNumber), 9, ["title"]),
                    createTextVNode(" оплачен ")
                  ])
                ]),
                unref(status) === "working" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "modal-section"
                }, [
                  createVNode("p", { class: "modal-text modal-text--bold" }, " Менеджер свяжется с вами в течении 2-х часов, уточнит детали и отправит заказ в работу. ")
                ])) : unref(status) === "closing-soon" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "modal-section"
                }, [
                  createVNode("p", { class: "modal-text modal-text--bold" }, " Менеджер свяжется с вами завтра, до 12:00, уточнит детали и отправит заказ в работу. ")
                ])) : unref(status) === "after-hours" ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "modal-section"
                }, [
                  createVNode("p", { class: "modal-text modal-text--bold" }, [
                    unref(isTomorrowWorking) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(" Менеджер свяжется с вами завтра, до 12:00, уточнит детали и отправит заказ в работу. ")
                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createTextVNode(" Менеджер свяжется с вами в ближайший рабочий день, до 12:00, уточнит детали и отправит заказ в работу. ")
                    ], 64))
                  ])
                ])) : (openBlock(), createBlock("div", {
                  key: 3,
                  class: "modal-section"
                }, [
                  createVNode("p", { class: "modal-text modal-text--bold" }, [
                    createTextVNode(" Сегодня у вас выходной. "),
                    createVNode("br"),
                    createTextVNode(" Менеджер свяжется с вами в ближайший рабочий день, до 12:00, уточнит детали и отправит заказ в работу. ")
                  ])
                ])),
                createVNode("div", { class: "modal-section" }, [
                  createVNode("p", { class: "modal-text modal-text--secondary" }, [
                    createTextVNode(" Заказ можно будет забрать по адресу: "),
                    createVNode("br"),
                    createVNode("a", {
                      href: "https://yandex.ru/maps/-/CHEbFD2T",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      class: "modal-link"
                    }, "Донецк, ул.Постышева, дом 60")
                  ])
                ]),
                unref(status) === "weekend" ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "modal-section"
                }, [
                  createVNode("p", { class: "modal-text modal-text--secondary" }, [
                    createTextVNode(" Мы работаем с 9 до 18:00, "),
                    createVNode("br"),
                    createTextVNode(" с понедельника по пятницу: ")
                  ]),
                  createVNode("div", { class: "days-row" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(days, (day) => {
                      return createVNode("span", {
                        key: day.label,
                        class: ["day-badge", { "day-badge--inactive": !day.active }]
                      }, toDisplayString(day.label), 3);
                    }), 64))
                  ])
                ])) : createCommentVNode("", true),
                createVNode(_component_AppButton, {
                  class: "order-more-btn",
                  size: "md",
                  onClick: onOrderMore
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Заказать еще ")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/OrderSuccessModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-fa77151a"]]), { __name: "OrderSuccessModal" });
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { addItem, totalItems: cartTotalItems } = useCart();
    const isConstructorOpen = ref(false);
    const isCartOpen = ref(false);
    const isOrderSuccessOpen = ref(false);
    const successOrderNumber = ref("");
    function generateOrderNumber() {
      return String(Math.floor(1e5 + Math.random() * 9e5));
    }
    function onPayNow(_item) {
      isConstructorOpen.value = false;
      successOrderNumber.value = generateOrderNumber();
      isOrderSuccessOpen.value = true;
    }
    function onAddToCart(item) {
      addItem(item);
      isConstructorOpen.value = false;
      isCartOpen.value = true;
    }
    function onCartPay(selectedItems) {
      if (!selectedItems?.length) return;
      isCartOpen.value = false;
      successOrderNumber.value = generateOrderNumber();
      isOrderSuccessOpen.value = true;
    }
    function onContinueShopping() {
      isCartOpen.value = false;
      isConstructorOpen.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$m;
      const _component_ConstructorModal = __nuxt_component_1;
      const _component_CartModal = __nuxt_component_2$1;
      const _component_OrderSuccessModal = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center gap-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UButton, {
        size: "xl",
        "trailing-icon": "i-lucide-arrow-right",
        onClick: ($event) => isConstructorOpen.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Создать флаг `);
          } else {
            return [
              createTextVNode(" Создать флаг ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(cartTotalItems) > 0) {
        _push(ssrRenderComponent(_component_UButton, {
          size: "xl",
          color: "neutral",
          variant: "soft",
          onClick: ($event) => isCartOpen.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Корзина (${ssrInterpolate(unref(cartTotalItems))}) `);
            } else {
              return [
                createTextVNode(" Корзина (" + toDisplayString(unref(cartTotalItems)) + ") ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ConstructorModal, {
        modelValue: unref(isConstructorOpen),
        "onUpdate:modelValue": ($event) => isRef(isConstructorOpen) ? isConstructorOpen.value = $event : null,
        onPay: onPayNow,
        onAddToCart
      }, null, _parent));
      _push(ssrRenderComponent(_component_CartModal, {
        modelValue: unref(isCartOpen),
        "onUpdate:modelValue": ($event) => isRef(isCartOpen) ? isCartOpen.value = $event : null,
        onPay: onCartPay,
        onContinueShopping
      }, null, _parent));
      _push(ssrRenderComponent(_component_OrderSuccessModal, {
        modelValue: unref(isOrderSuccessOpen),
        "onUpdate:modelValue": ($event) => isRef(isOrderSuccessOpen) ? isOrderSuccessOpen.value = $event : null,
        "order-number": unref(successOrderNumber),
        onOrderMore: ($event) => isConstructorOpen.value = true
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BEwC-9WL.mjs.map

import { _ as __nuxt_component_0$1 } from './AppBreadcrumbs-CDv8EEOG.mjs';
import { _ as _export_sfc, aG as useFavorites, m as useCart, o as useSeoMeta, c as __nuxt_component_1$1, e as _sfc_main$u, F as FABRICS, S as SIZES, r as usePricing, s as FABRIC_IMAGE_MAP, t as MOUNTING_IMAGE_MAP, M as MOUNTINGS, i as __nuxt_component_3$2, v as __vite_glob_0_68, w as __vite_glob_0_67, x as __vite_glob_0_66, y as __vite_glob_0_65, z as __vite_glob_0_64, A as __vite_glob_0_63, B as __vite_glob_0_62, C as __vite_glob_0_61, D as __vite_glob_0_60, E as __vite_glob_0_59, G as __vite_glob_0_58, H as __vite_glob_0_57, I as __vite_glob_0_56, J as __vite_glob_0_55, K as __vite_glob_0_54, L as __vite_glob_0_53, N as __vite_glob_0_52, O as __vite_glob_0_51, P as __vite_glob_0_50, Q as __vite_glob_0_49, R as __vite_glob_0_48, T as __vite_glob_0_47, U as __vite_glob_0_46, V as __vite_glob_0_45, W as __vite_glob_0_44, X as __vite_glob_0_43, Y as __vite_glob_0_42, Z as __vite_glob_0_41, $ as __vite_glob_0_40, a0 as __vite_glob_0_39, a1 as __vite_glob_0_38, a2 as __vite_glob_0_37, d as __vite_glob_0_36, a3 as __vite_glob_0_35, a4 as __vite_glob_0_34, a5 as __vite_glob_0_33, a6 as __vite_glob_0_32, a7 as __vite_glob_0_31, a8 as __vite_glob_0_30, a9 as __vite_glob_0_29, aa as __vite_glob_0_28, ab as __vite_glob_0_27, ac as __vite_glob_0_26, ad as __vite_glob_0_25, ae as __vite_glob_0_24, af as __vite_glob_0_23, ag as __vite_glob_0_22, ah as __vite_glob_0_21, ai as __vite_glob_0_20, aj as __vite_glob_0_19, ak as __vite_glob_0_18, al as __vite_glob_0_17, am as __vite_glob_0_16, an as __vite_glob_0_15, ao as __vite_glob_0_14, ap as __vite_glob_0_13, aq as __vite_glob_0_12, ar as __vite_glob_0_11, as as __vite_glob_0_10, at as __vite_glob_0_9, au as __vite_glob_0_8, av as __vite_glob_0_7, aw as __vite_glob_0_6, ax as __vite_glob_0_5, ay as __vite_glob_0_4, az as __vite_glob_0_3, aA as __vite_glob_0_2, aB as __vite_glob_0_1, aC as __vite_glob_0_0, q as _sfc_main$h, aD as MAX_UPLOAD_SIZE, aE as ALLOWED_EXTENSIONS, aF as RASTER_EXTENSIONS } from './server.mjs';
import { c as catalogCategoryItems, a as catalogProducts, _ as __nuxt_component_1$2 } from './catalog-products-PEOD3epg.mjs';
import { computed, reactive, ref, mergeProps, unref, isRef, watch, useModel, withCtx, createVNode, createTextVNode, openBlock, createBlock, withDirectives, vModelText, Fragment, renderList, toDisplayString, createCommentVNode, mergeModels, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderSlot, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_2$2 } from './QuantityInput-BYipMCdR.mjs';
import { _ as __nuxt_component_0$2 } from './AppSwitch-B6KdDVqJ.mjs';
import { _ as __nuxt_component_0$3 } from './AppButton-D6iSYne7.mjs';
import { p as progressSmile } from './landing-progress-smile-D8xuHxsy.mjs';
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

const _sfc_main$9 = {
  __name: "ProductBadge",
  __ssrInlineRender: true,
  props: {
    discount: {
      type: String,
      default: "-15%"
    },
    text: {
      type: String,
      default: "На сайте дешевле"
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-badge" }, _attrs))} data-v-0589b41a><div class="product-badge-item product-badge-item--discount" data-v-0589b41a><span class="product-badge-item__text" data-v-0589b41a>${ssrInterpolate(props.discount)}</span></div>`);
      if (props.text) {
        _push(`<div class="product-badge-item product-badge-item--label" data-v-0589b41a><span class="product-badge-item__text" data-v-0589b41a>${ssrInterpolate(props.text)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductBadge.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-0589b41a"]]);
const _sfc_main$8 = {
  __name: "ProductTermBadge",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      default: "от 2 дней"
    },
    timing: {
      type: String,
      default: "short",
      validator: (value) => ["short", "medium", "low"].includes(value)
    }
  },
  setup(__props) {
    const props = __props;
    const iconName = computed(() => `term-${props.timing}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppIcon = __nuxt_component_1$1;
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["product-term-badge", `product-term-badge--${props.timing}`]
      }, _attrs))} data-v-d3fe22fd>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: unref(iconName),
        size: 12,
        class: "product-term-badge__icon"
      }, null, _parent));
      _push(`<span class="product-term-badge__text" data-v-d3fe22fd>${ssrInterpolate(props.text)}</span></span>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductTermBadge.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-d3fe22fd"]]);
const _sfc_main$7 = {
  __name: "ProductPriceRow",
  __ssrInlineRender: true,
  props: {
    price: {
      type: String,
      default: "от 8888 ₽"
    },
    oldPrice: {
      type: String,
      default: "9999 ₽"
    },
    sale: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const hasSale = computed(() => props.sale && Boolean(props.oldPrice));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["product-price-row", { "product-price-row--sale": unref(hasSale) }]
      }, _attrs))} data-v-147728d0><span class="product-price-row__current" data-v-147728d0>${ssrInterpolate(__props.price)}</span>`);
      if (unref(hasSale)) {
        _push(`<span class="product-price-row__old" data-v-147728d0>${ssrInterpolate(__props.oldPrice)}</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductPriceRow.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-147728d0"]]);
const onlineOrderIcon = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2012%2011.5059'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Icon'%20d='M5.10715%200.634885C5.4014%20-0.211629%206.59857%20-0.211628%206.89282%200.634885L7.6381%202.77897C7.81118%203.27688%208.27584%203.61448%208.80287%203.62522L11.0723%203.67147C11.9683%203.68973%2012.3383%204.8283%2011.6241%205.36974L9.81528%206.7411C9.39522%207.05957%209.21773%207.60582%209.37038%208.11037L10.0277%2010.283C10.2872%2011.1408%209.31868%2011.8445%208.58306%2011.3326L6.71985%2010.0361C6.28717%209.735%205.71281%209.735%205.28012%2010.0361L3.41691%2011.3326C2.68129%2011.8445%201.71276%2011.1408%201.97228%2010.283L2.62959%208.11037C2.78224%207.60582%202.60475%207.05957%202.18469%206.7411L0.375854%205.36974C-0.338301%204.8283%200.0316457%203.68973%200.927656%203.67147L3.1971%203.62522C3.72413%203.61448%204.1888%203.27688%204.36187%202.77897L5.10715%200.634885Z'%20fill='var(--fill-0,%20%236636FF)'/%3e%3c/svg%3e";
const imageSectionCount = 5;
const _sfc_main$6 = {
  __name: "CatalogProductCard",
  __ssrInlineRender: true,
  props: {
    image: {
      type: String,
      default: ""
    },
    images: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: "Название товара в две-три строки, две-три строки"
    },
    subtitle: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: "от 8888 ₽"
    },
    oldPrice: {
      type: String,
      default: "9999 ₽"
    },
    discount: {
      type: String,
      default: "-15%"
    },
    badgeText: {
      type: String,
      default: "На сайте дешевле"
    },
    showBadge: {
      type: Boolean,
      default: false
    },
    deliveryText: {
      type: String,
      default: "4-5 дней"
    },
    deliveryTiming: {
      type: String,
      default: "short"
    },
    pickupText: {
      type: String,
      default: "Самовывоз из Донецка"
    },
    typeText: {
      type: String,
      default: ""
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  emits: ["select", "toggle-favorite"],
  setup(__props) {
    const props = __props;
    const activeImageIndex = ref(0);
    const productImages = computed(() => {
      const images = props.images.filter(Boolean);
      if (images.length > 0) {
        return images.slice(0, imageSectionCount);
      }
      return props.image ? [props.image] : [];
    });
    const activeImage = computed(() => productImages.value[activeImageIndex.value] || "");
    const hasImageSlider = computed(() => productImages.value.length > 1);
    watch(productImages, (images) => {
      if (activeImageIndex.value < images.length) {
        return;
      }
      activeImageIndex.value = 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$u;
      const _component_AppFavoriteButton = __nuxt_component_1$2;
      const _component_ProductBadge = __nuxt_component_2$1;
      const _component_ProductTermBadge = __nuxt_component_3$1;
      const _component_ProductPriceRow = __nuxt_component_4$1;
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: "catalog-product-card",
        role: "button",
        tabindex: "0"
      }, _attrs))} data-v-65a42be0><div class="catalog-product-card__media" data-v-65a42be0>`);
      if (unref(activeImage)) {
        _push(`<img${ssrRenderAttr("src", unref(activeImage))}${ssrRenderAttr("alt", __props.title)} class="catalog-product-card__image" data-v-65a42be0>`);
      } else {
        _push(`<div class="catalog-product-card__image catalog-product-card__image--empty" data-v-65a42be0>`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-image" }, null, _parent));
        _push(`</div>`);
      }
      _push(`<div class="catalog-product-card__media-content" data-v-65a42be0><div class="catalog-product-card__media-top" data-v-65a42be0>`);
      _push(ssrRenderComponent(_component_AppFavoriteButton, {
        active: __props.isFavorite,
        onClick: () => {
        },
        onChange: ($event) => _ctx.$emit("toggle-favorite", $event)
      }, null, _parent));
      _push(`</div><div class="catalog-product-card__media-bottom" data-v-65a42be0><div class="catalog-product-card__bottom-left" data-v-65a42be0>`);
      if (__props.showBadge) {
        _push(ssrRenderComponent(_component_ProductBadge, {
          discount: __props.discount,
          text: ""
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(hasImageSlider)) {
        _push(`<div class="catalog-product-card__dots" aria-hidden="true" data-v-65a42be0><!--[-->`);
        ssrRenderList(unref(productImages), (sliderImage, index) => {
          _push(`<button type="button" class="${ssrRenderClass([{ "catalog-product-card__dot--active": index === unref(activeImageIndex) }, "catalog-product-card__dot"])}" tabindex="-1" data-v-65a42be0></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="catalog-product-card__content" data-v-65a42be0><div class="catalog-product-card__badges" data-v-65a42be0>`);
      _push(ssrRenderComponent(_component_ProductTermBadge, {
        text: __props.deliveryText,
        timing: __props.deliveryTiming
      }, null, _parent));
      if (__props.typeText) {
        _push(`<div class="catalog-product-card__type-badge" data-v-65a42be0><img${ssrRenderAttr("src", unref(onlineOrderIcon))} alt="" class="catalog-product-card__type-icon" aria-hidden="true" data-v-65a42be0><span data-v-65a42be0>${ssrInterpolate(__props.typeText)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="catalog-product-card__main" data-v-65a42be0><h3 class="catalog-product-card__title" data-v-65a42be0>${ssrInterpolate(__props.title)}</h3>`);
      if (__props.subtitle) {
        _push(`<p class="catalog-product-card__subtitle" data-v-65a42be0>${ssrInterpolate(__props.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ProductPriceRow, {
        price: __props.price,
        "old-price": __props.oldPrice
      }, null, _parent));
      _push(`</div></div></article>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CatalogProductCard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-65a42be0"]]);
const _sfc_main$5 = {
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
      const _component_UModal = _sfc_main$h;
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
            _push2(`<div class="${ssrRenderClass(["modal-wrapper", __props.wrapperClass])}" style="${ssrRenderStyle({ "--modal-max-w": __props.maxWidth })}" data-v-f4972e26${_scopeId}>`);
            if (__props.showHeader) {
              _push2(`<div class="modal-header" data-v-f4972e26${_scopeId}><div class="modal-header__left" data-v-f4972e26${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "header-left", {}, null, _push2, _parent2, _scopeId);
              if (__props.title) {
                _push2(`<h2 class="modal-title" data-v-f4972e26${_scopeId}>${ssrInterpolate(__props.title)}</h2>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><button class="close-btn" data-v-f4972e26${_scopeId}><svg class="close-btn__icon" viewBox="0 0 16 16" fill="none" data-v-f4972e26${_scopeId}><path fill-rule="evenodd" clip-rule="evenodd" d="M3.46967 3.46967C3.76256 3.17678 4.23744 3.17678 4.53033 3.46967L8 6.93934L11.4697 3.46967C11.7626 3.17678 12.2374 3.17678 12.5303 3.46967C12.8232 3.76256 12.8232 4.23744 12.5303 4.53033L9.06066 8L12.5303 11.4697C12.8232 11.7626 12.8232 12.2374 12.5303 12.5303C12.2374 12.8232 11.7626 12.8232 11.4697 12.5303L8 9.06066L4.53033 12.5303C4.23744 12.8232 3.76256 12.8232 3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L6.93934 8L3.46967 4.53033C3.17678 4.23744 3.17678 3.76256 3.46967 3.46967Z" fill="currentColor" data-v-f4972e26${_scopeId}></path></svg></button></div>`);
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BaseModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-f4972e26"]]);
const _sfc_main$4 = {
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
      }, _attrs))} data-v-ccfe7dfd><button type="button" class="app-select__trigger"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-ccfe7dfd><span class="app-select__value" data-v-ccfe7dfd>${ssrInterpolate(unref(selectedLabel) || __props.placeholder)}</span><svg class="app-select__chevron" viewBox="0 0 16 16" fill="none" data-v-ccfe7dfd><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ccfe7dfd></path></svg></button>`);
      if (unref(isOpen)) {
        _push(`<div class="app-select__dropdown" data-v-ccfe7dfd><!--[-->`);
        ssrRenderList(__props.items, (item) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "app-select__item",
            { "app-select__item--selected": item.value === model.value }
          ])}" data-v-ccfe7dfd>${ssrInterpolate(item.label)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppSelect.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-ccfe7dfd"]]), { __name: "AppSelect" });
const _sfc_main$3 = {
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
      const _component_UIcon = _sfc_main$u;
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d91a0f99"]]);
const _sfc_main$2 = {
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
    const description2 = ref("");
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
    const imageModules = /* @__PURE__ */ Object.assign({ "/assets/images/catalog_slider_1.png": __vite_glob_0_0, "/assets/images/catalog_slider_2.png": __vite_glob_0_1, "/assets/images/catalog_slider_3.png": __vite_glob_0_2, "/assets/images/catalog_slider_4.png": __vite_glob_0_3, "/assets/images/catalog_slider_5.png": __vite_glob_0_4, "/assets/images/dense_polyester_grommets_60x90_double.png": __vite_glob_0_5, "/assets/images/dense_polyester_grommets_60x90_double_fringe.png": __vite_glob_0_6, "/assets/images/dense_polyester_grommets_60x90_single.png": __vite_glob_0_7, "/assets/images/dense_polyester_grommets_60x90_single_fringe.png": __vite_glob_0_8, "/assets/images/dense_polyester_grommets_90x135_double.png": __vite_glob_0_9, "/assets/images/dense_polyester_grommets_90x135_double_fringe.png": __vite_glob_0_10, "/assets/images/dense_polyester_grommets_90x135_single.png": __vite_glob_0_11, "/assets/images/dense_polyester_grommets_90x135_single_fringe.png": __vite_glob_0_12, "/assets/images/dense_polyester_sleeve_60x90_double.png": __vite_glob_0_13, "/assets/images/dense_polyester_sleeve_60x90_double_fringe.png": __vite_glob_0_14, "/assets/images/dense_polyester_sleeve_60x90_single.png": __vite_glob_0_15, "/assets/images/dense_polyester_sleeve_60x90_single_fringe.png": __vite_glob_0_16, "/assets/images/dense_polyester_sleeve_90x135_double.png": __vite_glob_0_17, "/assets/images/dense_polyester_sleeve_90x135_double_fringe.png": __vite_glob_0_18, "/assets/images/dense_polyester_sleeve_90x135_single.png": __vite_glob_0_19, "/assets/images/dense_polyester_sleeve_90x135_single_fringe.png": __vite_glob_0_20, "/assets/images/mesh_grommets_60x90_double.png": __vite_glob_0_21, "/assets/images/mesh_grommets_60x90_double_fringe.png": __vite_glob_0_22, "/assets/images/mesh_grommets_60x90_single.png": __vite_glob_0_23, "/assets/images/mesh_grommets_60x90_single_fringe.png": __vite_glob_0_24, "/assets/images/mesh_grommets_90x135_double.png": __vite_glob_0_25, "/assets/images/mesh_grommets_90x135_double_fringe.png": __vite_glob_0_26, "/assets/images/mesh_grommets_90x135_single.png": __vite_glob_0_27, "/assets/images/mesh_grommets_90x135_single_fringe.png": __vite_glob_0_28, "/assets/images/mesh_sleeve_60x90_double.png": __vite_glob_0_29, "/assets/images/mesh_sleeve_60x90_double_fringe.png": __vite_glob_0_30, "/assets/images/mesh_sleeve_60x90_single.png": __vite_glob_0_31, "/assets/images/mesh_sleeve_60x90_single_fringe.png": __vite_glob_0_32, "/assets/images/mesh_sleeve_90x135_double.png": __vite_glob_0_33, "/assets/images/mesh_sleeve_90x135_double_fringe.png": __vite_glob_0_34, "/assets/images/mesh_sleeve_90x135_single.png": __vite_glob_0_35, "/assets/images/mesh_sleeve_90x135_single_fringe.png": __vite_glob_0_36, "/assets/images/polyester_grommets_60x90_double.png": __vite_glob_0_37, "/assets/images/polyester_grommets_60x90_double_fringe.png": __vite_glob_0_38, "/assets/images/polyester_grommets_60x90_single.png": __vite_glob_0_39, "/assets/images/polyester_grommets_60x90_single_fringe.png": __vite_glob_0_40, "/assets/images/polyester_grommets_90x135_double.png": __vite_glob_0_41, "/assets/images/polyester_grommets_90x135_double_fringe.png": __vite_glob_0_42, "/assets/images/polyester_grommets_90x135_single.png": __vite_glob_0_43, "/assets/images/polyester_grommets_90x135_single_fringe.png": __vite_glob_0_44, "/assets/images/polyester_sleeve_60x90_double.png": __vite_glob_0_45, "/assets/images/polyester_sleeve_60x90_double_fringe.png": __vite_glob_0_46, "/assets/images/polyester_sleeve_60x90_single.png": __vite_glob_0_47, "/assets/images/polyester_sleeve_60x90_single_fringe.png": __vite_glob_0_48, "/assets/images/polyester_sleeve_90x135_double.png": __vite_glob_0_49, "/assets/images/polyester_sleeve_90x135_double_fringe.png": __vite_glob_0_50, "/assets/images/polyester_sleeve_90x135_single.png": __vite_glob_0_51, "/assets/images/polyester_sleeve_90x135_single_fringe.png": __vite_glob_0_52, "/assets/images/satin_grommets_60x90_double.png": __vite_glob_0_53, "/assets/images/satin_grommets_60x90_double_fringe.png": __vite_glob_0_54, "/assets/images/satin_grommets_60x90_single.png": __vite_glob_0_55, "/assets/images/satin_grommets_60x90_single_fringe.png": __vite_glob_0_56, "/assets/images/satin_grommets_90x135_double.png": __vite_glob_0_57, "/assets/images/satin_grommets_90x135_double_fringe.png": __vite_glob_0_58, "/assets/images/satin_grommets_90x135_single.png": __vite_glob_0_59, "/assets/images/satin_grommets_90x135_single_fringe.png": __vite_glob_0_60, "/assets/images/satin_sleeve_60x90_double.png": __vite_glob_0_61, "/assets/images/satin_sleeve_60x90_double_fringe.png": __vite_glob_0_62, "/assets/images/satin_sleeve_60x90_single.png": __vite_glob_0_63, "/assets/images/satin_sleeve_60x90_single_fringe.png": __vite_glob_0_64, "/assets/images/satin_sleeve_90x135_double.png": __vite_glob_0_65, "/assets/images/satin_sleeve_90x135_double_fringe.png": __vite_glob_0_66, "/assets/images/satin_sleeve_90x135_single.png": __vite_glob_0_67, "/assets/images/satin_sleeve_90x135_single_fringe.png": __vite_glob_0_68 });
    const productImage = computed(() => {
      const fabric = FABRIC_IMAGE_MAP[selectedFabric.value] || "mesh";
      const mounting = MOUNTING_IMAGE_MAP[selectedMounting.value] || "sleeve";
      const size = selectedSize.value;
      const sided = doubleSided.value ? "double" : "single";
      const fringe = hasFringe.value ? "_fringe" : "";
      const filename = `${fabric}_${mounting}_${size}_${sided}${fringe}.png`;
      const key = Object.keys(imageModules).find((k) => k.endsWith(`/${filename}`));
      return key ? imageModules[key] : "";
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
        description: description2.value,
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
      const _component_BaseModal = __nuxt_component_0;
      const _component_AppSelect = __nuxt_component_1;
      const _component_QuantityInput = __nuxt_component_2$2;
      const _component_AppCheckbox = __nuxt_component_3$2;
      const _component_AppSwitch = __nuxt_component_0$2;
      const _component_UIcon = _sfc_main$u;
      const _component_ProductCard = __nuxt_component_6;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        modelValue: isOpen.value,
        "onUpdate:modelValue": ($event) => isOpen.value = $event,
        title: "Конструктор флага"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal-grid" data-v-370a76bc${_scopeId}><div class="form-column" data-v-370a76bc${_scopeId}><div class="params-section" data-v-370a76bc${_scopeId}><p class="section-title" data-v-370a76bc${_scopeId}>Параметры</p><div class="fields-grid" data-v-370a76bc${_scopeId}><div class="field-row" data-v-370a76bc${_scopeId}><label class="field-label" data-v-370a76bc${_scopeId}>Ткань</label>`);
            _push2(ssrRenderComponent(_component_AppSelect, {
              modelValue: unref(selectedFabric),
              "onUpdate:modelValue": ($event) => isRef(selectedFabric) ? selectedFabric.value = $event : null,
              items: unref(FABRICS)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="field-row" data-v-370a76bc${_scopeId}><label class="field-label" data-v-370a76bc${_scopeId}>Тип крепления</label>`);
            _push2(ssrRenderComponent(_component_AppSelect, {
              modelValue: unref(selectedMounting),
              "onUpdate:modelValue": ($event) => isRef(selectedMounting) ? selectedMounting.value = $event : null,
              items: unref(MOUNTINGS)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="field-row" data-v-370a76bc${_scopeId}><label class="field-label" data-v-370a76bc${_scopeId}>Количество</label>`);
            _push2(ssrRenderComponent(_component_QuantityInput, {
              modelValue: unref(quantity),
              "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
              min: 1,
              max: 1e4
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="field-row" data-v-370a76bc${_scopeId}><label class="field-label" data-v-370a76bc${_scopeId}>Размер</label>`);
            _push2(ssrRenderComponent(_component_AppSelect, {
              modelValue: unref(selectedSize),
              "onUpdate:modelValue": ($event) => isRef(selectedSize) ? selectedSize.value = $event : null,
              items: unref(SIZES)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="field-row field-row--options" data-v-370a76bc${_scopeId}><label class="field-label" data-v-370a76bc${_scopeId}>Опции</label><div class="options-list" data-v-370a76bc${_scopeId}>`);
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
            _push2(`</div></div></div></div><div class="layout-section" data-v-370a76bc${_scopeId}><div class="layout-section__header" data-v-370a76bc${_scopeId}><p class="section-title" data-v-370a76bc${_scopeId}>Макет</p><p class="layout-section__hint" data-v-370a76bc${_scopeId}> Подойдут файлы форматов: tiff, ai, crd, jpg, png.<br data-v-370a76bc${_scopeId}> Разрешение не менее 150 dpi, CMYK, вылеты 5 мм </p><div class="layout-section__links" data-v-370a76bc${_scopeId}><a href="#" class="layout-section__link" data-v-370a76bc${_scopeId}> Как готовить макеты к печати <svg class="layout-section__link-icon" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-370a76bc${_scopeId}><path d="M2.057 5.698a.807.807 0 0 1-1.17 0 .808.808 0 0 1 .001-.826l3.733-3.737H2.387A.569.569 0 0 1 1.82.564C1.822.252 2.075 0 2.387 0h4.538v4.534a.571.571 0 0 1-1.141.002l.006-2.572-3.733 3.734Z" fill="currentColor" data-v-370a76bc${_scopeId}></path></svg></a><a href="#" class="layout-section__link" data-v-370a76bc${_scopeId}> Шаблоны макетов <svg class="layout-section__link-icon" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-370a76bc${_scopeId}><path d="M2.057 5.698a.807.807 0 0 1-1.17 0 .808.808 0 0 1 .001-.826l3.733-3.737H2.387A.569.569 0 0 1 1.82.564C1.822.252 2.075 0 2.387 0h4.538v4.534a.571.571 0 0 1-1.141.002l.006-2.572-3.733 3.734Z" fill="currentColor" data-v-370a76bc${_scopeId}></path></svg></a></div></div><div class="design-toggle" data-v-370a76bc${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppSwitch, {
              modelValue: unref(orderDesign),
              "onUpdate:modelValue": ($event) => isRef(orderDesign) ? orderDesign.value = $event : null,
              label: "Заказать дизайн"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="description-field" data-v-370a76bc${_scopeId}><label class="field-label" data-v-370a76bc${_scopeId}>Описание</label><div class="${ssrRenderClass(["description-field__box", { "description-field__box--drag": unref(isDragging) }])}" data-v-370a76bc${_scopeId}><textarea class="description-field__textarea" placeholder="Сообщение для менеджера,
который будет оформлять ваш заказ" data-v-370a76bc${_scopeId}>${ssrInterpolate(unref(description2))}</textarea><div class="file-upload" data-v-370a76bc${_scopeId}><div class="file-upload__actions" data-v-370a76bc${_scopeId}><label class="file-upload__btn" data-v-370a76bc${_scopeId}><svg class="file-upload__btn-icon" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-370a76bc${_scopeId}><path d="M7.69 14.631c-1.873 0-2.81 0-3.565-.251A5.503 5.503 0 0 1 1.001 11.256c-.17-.515-.225-1.113-.243-2.033A71.69 71.69 0 0 1 .75 7.69c0-1.872 0-2.809.251-3.565A5.503 5.503 0 0 1 4.125 1.001C4.881.75 5.818.75 7.69.75s2.81 0 3.566.251a5.503 5.503 0 0 1 3.124 3.124c.251.756.251 1.693.251 3.565 0 .598 0 1.101-.008 1.533-2.997 0-5.2-1.177-7.631-1.177s-5.157.785-6.234 1.177" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-370a76bc${_scopeId}></path><circle cx="10.874" cy="3.917" r="1.256" fill="currentColor" fill-opacity="0.67" data-v-370a76bc${_scopeId}></circle><path d="M12.448 11.306v4.365M10.266 13.488h4.365" stroke="currentColor" stroke-opacity="0.67" stroke-width="1.5" stroke-linecap="round" data-v-370a76bc${_scopeId}></path><path d="M6.808 5.615 5.265 3.712a.469.469 0 0 0-.799.029L1.094 8.58h11.42L9.198 5.142a.469.469 0 0 0-.616-.083l-1.13.671a.469.469 0 0 1-.644-.115Z" fill="currentColor" fill-opacity="0.67" data-v-370a76bc${_scopeId}></path></svg><span data-v-370a76bc${_scopeId}>Выберите файл c макетом</span><input type="file" multiple accept=".tiff,.tif,.ai,.cdr,.jpg,.jpeg,.png" class="file-upload__input" data-v-370a76bc${_scopeId}></label><span class="file-upload__hint" data-v-370a76bc${_scopeId}> или перетащите<br data-v-370a76bc${_scopeId}>на страницу </span></div>`);
            if (unref(uploadedFiles).length) {
              _push2(`<div class="file-upload__files" data-v-370a76bc${_scopeId}><!--[-->`);
              ssrRenderList(unref(uploadedFiles), (file, i) => {
                _push2(`<span class="file-upload__file" data-v-370a76bc${_scopeId}><span class="file-upload__file-name" data-v-370a76bc${_scopeId}>${ssrInterpolate(file.name)}</span><button type="button" class="file-upload__file-remove" data-v-370a76bc${_scopeId}>`);
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
                          "onUpdate:modelValue": ($event) => isRef(description2) ? description2.value = $event : null,
                          class: "description-field__textarea",
                          placeholder: "Сообщение для менеджера,\nкоторый будет оформлять ваш заказ"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(description2)]
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ConstructorModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-370a76bc"]]);
const phone = "+7 (949) 131-45-44";
const phoneHref = "tel:+79491314544";
const email = "info@indigo-mail.ru";
const _sfc_main$1 = {
  __name: "ManagerOrderModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    productTitle: {
      type: String,
      default: ""
    }
  }, {
    "modelValue": { type: Boolean, required: true },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const isOpen = useModel(__props, "modelValue");
    const props = __props;
    const normalizedProductTitle = computed(() => {
      if (!props.productTitle) {
        return "товар";
      }
      return props.productTitle.charAt(0).toLowerCase() + props.productTitle.slice(1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = __nuxt_component_0;
      const _component_AppButton = __nuxt_component_0$3;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        modelValue: isOpen.value,
        "onUpdate:modelValue": ($event) => isOpen.value = $event,
        "show-header": false,
        "max-width": "22.125rem",
        "wrapper-class": "modal-wrapper--fit"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="manager-order-modal" data-v-5a4c3dee${_scopeId}><div class="manager-order-modal__content" data-v-5a4c3dee${_scopeId}><div class="manager-order-modal__text" data-v-5a4c3dee${_scopeId}><h2 class="manager-order-modal__title" data-v-5a4c3dee${_scopeId}><span data-v-5a4c3dee${_scopeId}>Чтобы заказать ${ssrInterpolate(unref(normalizedProductTitle))}, позвоните менеджеру:</span><a${ssrRenderAttr("href", phoneHref)} data-v-5a4c3dee${_scopeId}>${ssrInterpolate(phone)}</a></h2><p class="manager-order-modal__description" data-v-5a4c3dee${_scopeId}> Если не смогли дозвониться, напишите в поддержку: <a${ssrRenderAttr("href", `mailto:${email}`)} data-v-5a4c3dee${_scopeId}>${ssrInterpolate(email)}</a></p></div>`);
            _push2(ssrRenderComponent(_component_AppButton, {
              size: "m",
              class: "manager-order-modal__button",
              onClick: ($event) => isOpen.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Хорошо! `);
                } else {
                  return [
                    createTextVNode(" Хорошо! ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "manager-order-modal" }, [
                createVNode("div", { class: "manager-order-modal__content" }, [
                  createVNode("div", { class: "manager-order-modal__text" }, [
                    createVNode("h2", { class: "manager-order-modal__title" }, [
                      createVNode("span", null, "Чтобы заказать " + toDisplayString(unref(normalizedProductTitle)) + ", позвоните менеджеру:", 1),
                      createVNode("a", { href: phoneHref }, toDisplayString(phone))
                    ]),
                    createVNode("p", { class: "manager-order-modal__description" }, [
                      createTextVNode(" Если не смогли дозвониться, напишите в поддержку: "),
                      createVNode("a", {
                        href: `mailto:${email}`
                      }, toDisplayString(email), 8, ["href"])
                    ])
                  ]),
                  createVNode(_component_AppButton, {
                    size: "m",
                    class: "manager-order-modal__button",
                    onClick: ($event) => isOpen.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Хорошо! ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ManagerOrderModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5a4c3dee"]]);
const title = "Каталог — Indigo";
const description = "Каталог флагов: популярные форматы, материалы и готовые конфигурации.";
const _sfc_main = {
  __name: "catalog",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbs = [
      { label: "Главная", to: "/" },
      { label: "Каталог", to: "" }
    ];
    const categorySections = computed(() => {
      return catalogCategoryItems.map((category) => ({
        ...category,
        products: catalogProducts.filter((item) => item.category === category.id)
      }));
    });
    const collapsedCategories = reactive(
      Object.fromEntries(catalogCategoryItems.map((category) => [category.id, false]))
    );
    const isConstructorOpen = ref(false);
    const isManagerOrderOpen = ref(false);
    const selectedManagerOrderProduct = ref(null);
    const { isFavorite, toggleItem } = useFavorites();
    const { addItem } = useCart();
    function normalizeFavoriteProduct(product) {
      return {
        id: product.id,
        category: product.category,
        images: product.images,
        title: product.title,
        subtitle: product.subtitle,
        price: product.price,
        discount: product.discount,
        deliveryText: product.deliveryText,
        deliveryTiming: product.deliveryTiming
      };
    }
    function toggleFavorite(product) {
      toggleItem(normalizeFavoriteProduct(product));
    }
    function openConstructor(product) {
      if (product.orderType === "online") {
        isConstructorOpen.value = true;
        return;
      }
      selectedManagerOrderProduct.value = product;
      isManagerOrderOpen.value = true;
    }
    function addConstructorItemToCart(item) {
      addItem(item);
      isConstructorOpen.value = false;
    }
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppBreadcrumbs = __nuxt_component_0$1;
      const _component_AppIcon = __nuxt_component_1$1;
      const _component_CatalogProductCard = __nuxt_component_2;
      const _component_ConstructorModal = __nuxt_component_3;
      const _component_ManagerOrderModal = __nuxt_component_4;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "catalog-page" }, _attrs))} data-v-e2961c79><div class="catalog-page__container" data-v-e2961c79>`);
      _push(ssrRenderComponent(_component_AppBreadcrumbs, {
        items: breadcrumbs,
        class: "catalog-page__breadcrumbs"
      }, null, _parent));
      _push(`<h1 class="catalog-page__title" data-v-e2961c79> Каталог </h1><!--[-->`);
      ssrRenderList(unref(categorySections), (category) => {
        _push(`<section${ssrRenderAttr("id", `category-${category.id}`)} class="${ssrRenderClass([{ "catalog-page__subcategory--collapsed": unref(collapsedCategories)[category.id] }, "catalog-page__subcategory"])}"${ssrRenderAttr("aria-label", `Подкатегория ${category.label}`)} data-v-e2961c79><div class="catalog-page__subcategory-header" data-v-e2961c79><div class="catalog-page__subcategory-content" data-v-e2961c79><h2 class="catalog-page__subcategory-title" data-v-e2961c79>${ssrInterpolate(category.label)}</h2><p class="catalog-page__subcategory-description" data-v-e2961c79>${ssrInterpolate(category.description)}</p></div><button type="button" class="catalog-page__subcategory-toggle"${ssrRenderAttr("aria-expanded", unref(collapsedCategories)[category.id] ? "false" : "true")}${ssrRenderAttr("aria-controls", `category-grid-${category.id}`)}${ssrRenderAttr("aria-label", `${unref(collapsedCategories)[category.id] ? "Развернуть" : "Свернуть"} раздел ${category.label}`)} data-v-e2961c79>`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "chevron",
          size: 16,
          class: ["catalog-page__subcategory-toggle-icon", { "catalog-page__subcategory-toggle-icon--collapsed": unref(collapsedCategories)[category.id] }]
        }, null, _parent));
        _push(`</button></div><div${ssrRenderAttr("id", `category-grid-${category.id}`)} class="catalog-page__grid" aria-label="Товары" style="${ssrRenderStyle(!unref(collapsedCategories)[category.id] ? null : { display: "none" })}" data-v-e2961c79><!--[-->`);
        ssrRenderList(category.products, (item) => {
          _push(ssrRenderComponent(_component_CatalogProductCard, {
            key: item.id,
            images: item.images,
            title: item.title,
            subtitle: item.subtitle,
            price: item.price,
            discount: item.discount,
            "delivery-text": item.deliveryText,
            "delivery-timing": item.deliveryTiming,
            "type-text": item.orderType === "online" ? "Онлайн-заказ" : "",
            "show-badge": Boolean(item.discount),
            "is-favorite": unref(isFavorite)(item.id),
            onSelect: ($event) => openConstructor(item),
            onToggleFavorite: ($event) => toggleFavorite(item)
          }, null, _parent));
        });
        _push(`<!--]--></div><div class="catalog-page__placeholder" aria-label="Разделы каталога в разработке" style="${ssrRenderStyle(!unref(collapsedCategories)[category.id] ? null : { display: "none" })}" data-v-e2961c79><div class="catalog-page__placeholder-grid" aria-hidden="true" data-v-e2961c79><!--[-->`);
        ssrRenderList(8, (index) => {
          _push(`<div class="catalog-page__skeleton-card" data-v-e2961c79><div class="catalog-page__skeleton-image" data-v-e2961c79></div><div class="catalog-page__skeleton-content" data-v-e2961c79><div class="catalog-page__skeleton-line catalog-page__skeleton-line--full" data-v-e2961c79></div><div class="catalog-page__skeleton-line catalog-page__skeleton-line--medium" data-v-e2961c79></div><div class="catalog-page__skeleton-line catalog-page__skeleton-line--small" data-v-e2961c79></div><div class="catalog-page__skeleton-line catalog-page__skeleton-line--price" data-v-e2961c79></div><div class="catalog-page__skeleton-button" data-v-e2961c79></div></div></div>`);
        });
        _push(`<!--]--></div><div class="catalog-page__notice" data-v-e2961c79><h2 class="catalog-page__notice-title" data-v-e2961c79> Мы еще работаем<br data-v-e2961c79> над наполнением каталога </h2><p class="catalog-page__notice-description" data-v-e2961c79> Скоро тут появятся: корпоративная продукция, товары для свадеб и оформления магазинов, фотоальбомы и товары для художников </p><img${ssrRenderAttr("src", unref(progressSmile))} alt="" class="catalog-page__notice-arrow" aria-hidden="true" data-v-e2961c79></div></div></section>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_ConstructorModal, {
        modelValue: unref(isConstructorOpen),
        "onUpdate:modelValue": ($event) => isRef(isConstructorOpen) ? isConstructorOpen.value = $event : null,
        onPay: addConstructorItemToCart,
        onAddToCart: addConstructorItemToCart
      }, null, _parent));
      _push(ssrRenderComponent(_component_ManagerOrderModal, {
        modelValue: unref(isManagerOrderOpen),
        "onUpdate:modelValue": ($event) => isRef(isManagerOrderOpen) ? isManagerOrderOpen.value = $event : null,
        "product-title": unref(selectedManagerOrderProduct)?.title
      }, null, _parent));
      _push(`</main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const catalog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e2961c79"]]);

export { catalog as default };
//# sourceMappingURL=catalog-DW5qHY9m.mjs.map

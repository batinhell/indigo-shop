import { _ as __nuxt_component_0 } from './AppBreadcrumbs-CDv8EEOG.mjs';
import { _ as _export_sfc, e as useFavorites, f as useSeoMeta, c as __nuxt_component_1$3, d as _sfc_main$C } from './server.mjs';
import { c as catalogCategoryItems, a as catalogProducts, _ as __nuxt_component_1 } from './catalog-products-Bmv70Lq9.mjs';
import { computed, reactive, mergeProps, unref, ref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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

const _sfc_main$4 = {
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductBadge.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-0589b41a"]]);
const _sfc_main$3 = {
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
      const _component_AppIcon = __nuxt_component_1$3;
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductTermBadge.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d3fe22fd"]]);
const _sfc_main$2 = {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductPriceRow.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-147728d0"]]);
const imageSectionCount = 5;
const _sfc_main$1 = {
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
      default: "Онлайн-заказ"
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
      const _component_UIcon = _sfc_main$C;
      const _component_AppFavoriteButton = __nuxt_component_1;
      const _component_ProductBadge = __nuxt_component_2$1;
      const _component_ProductTermBadge = __nuxt_component_3;
      const _component_ProductPriceRow = __nuxt_component_4;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "catalog-product-card" }, _attrs))} data-v-2b865a33><div class="catalog-product-card__media" data-v-2b865a33>`);
      if (unref(activeImage)) {
        _push(`<img${ssrRenderAttr("src", unref(activeImage))}${ssrRenderAttr("alt", __props.title)} class="catalog-product-card__image" data-v-2b865a33>`);
      } else {
        _push(`<div class="catalog-product-card__image catalog-product-card__image--empty" data-v-2b865a33>`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-image" }, null, _parent));
        _push(`</div>`);
      }
      _push(`<div class="catalog-product-card__media-content" data-v-2b865a33><div class="catalog-product-card__media-top" data-v-2b865a33>`);
      _push(ssrRenderComponent(_component_AppFavoriteButton, {
        active: __props.isFavorite,
        onChange: ($event) => _ctx.$emit("toggle-favorite", $event)
      }, null, _parent));
      _push(`</div><div class="catalog-product-card__media-bottom" data-v-2b865a33><div class="catalog-product-card__bottom-left" data-v-2b865a33>`);
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
        _push(`<div class="catalog-product-card__dots" aria-hidden="true" data-v-2b865a33><!--[-->`);
        ssrRenderList(unref(productImages), (sliderImage, index) => {
          _push(`<button type="button" class="${ssrRenderClass([{ "catalog-product-card__dot--active": index === unref(activeImageIndex) }, "catalog-product-card__dot"])}" tabindex="-1" data-v-2b865a33></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="catalog-product-card__content" data-v-2b865a33><div class="catalog-product-card__main" data-v-2b865a33>`);
      _push(ssrRenderComponent(_component_ProductTermBadge, {
        text: __props.deliveryText,
        timing: __props.deliveryTiming
      }, null, _parent));
      _push(`<h3 class="catalog-product-card__title" data-v-2b865a33>${ssrInterpolate(__props.title)}</h3>`);
      if (__props.subtitle) {
        _push(`<p class="catalog-product-card__subtitle" data-v-2b865a33>${ssrInterpolate(__props.subtitle)}</p>`);
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CatalogProductCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2b865a33"]]);
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
    const { isFavorite, toggleItem } = useFavorites();
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
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppBreadcrumbs = __nuxt_component_0;
      const _component_AppIcon = __nuxt_component_1$3;
      const _component_CatalogProductCard = __nuxt_component_2;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "catalog-page" }, _attrs))} data-v-d4fcc071><div class="catalog-page__container" data-v-d4fcc071>`);
      _push(ssrRenderComponent(_component_AppBreadcrumbs, {
        items: breadcrumbs,
        class: "catalog-page__breadcrumbs"
      }, null, _parent));
      _push(`<h1 class="catalog-page__title" data-v-d4fcc071> Каталог </h1><!--[-->`);
      ssrRenderList(unref(categorySections), (category) => {
        _push(`<section${ssrRenderAttr("id", `category-${category.id}`)} class="${ssrRenderClass([{ "catalog-page__subcategory--collapsed": unref(collapsedCategories)[category.id] }, "catalog-page__subcategory"])}"${ssrRenderAttr("aria-label", `Подкатегория ${category.label}`)} data-v-d4fcc071><div class="catalog-page__subcategory-header" data-v-d4fcc071><div class="catalog-page__subcategory-content" data-v-d4fcc071><h2 class="catalog-page__subcategory-title" data-v-d4fcc071>${ssrInterpolate(category.label)}</h2><p class="catalog-page__subcategory-description" data-v-d4fcc071>${ssrInterpolate(category.description)}</p></div><button type="button" class="catalog-page__subcategory-toggle"${ssrRenderAttr("aria-expanded", unref(collapsedCategories)[category.id] ? "false" : "true")}${ssrRenderAttr("aria-controls", `category-grid-${category.id}`)}${ssrRenderAttr("aria-label", `${unref(collapsedCategories)[category.id] ? "Развернуть" : "Свернуть"} раздел ${category.label}`)} data-v-d4fcc071>`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "chevron",
          size: 16,
          class: ["catalog-page__subcategory-toggle-icon", { "catalog-page__subcategory-toggle-icon--collapsed": unref(collapsedCategories)[category.id] }]
        }, null, _parent));
        _push(`</button></div><div${ssrRenderAttr("id", `category-grid-${category.id}`)} class="catalog-page__grid" aria-label="Товары" style="${ssrRenderStyle(!unref(collapsedCategories)[category.id] ? null : { display: "none" })}" data-v-d4fcc071><!--[-->`);
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
            "show-badge": Boolean(item.discount),
            "is-favorite": unref(isFavorite)(item.id),
            onToggleFavorite: ($event) => toggleFavorite(item)
          }, null, _parent));
        });
        _push(`<!--]--></div><div class="catalog-page__placeholder" aria-label="Разделы каталога в разработке" style="${ssrRenderStyle(!unref(collapsedCategories)[category.id] ? null : { display: "none" })}" data-v-d4fcc071><div class="catalog-page__placeholder-grid" aria-hidden="true" data-v-d4fcc071><!--[-->`);
        ssrRenderList(8, (index) => {
          _push(`<div class="catalog-page__skeleton-card" data-v-d4fcc071><div class="catalog-page__skeleton-image" data-v-d4fcc071></div><div class="catalog-page__skeleton-content" data-v-d4fcc071><div class="catalog-page__skeleton-line catalog-page__skeleton-line--full" data-v-d4fcc071></div><div class="catalog-page__skeleton-line catalog-page__skeleton-line--medium" data-v-d4fcc071></div><div class="catalog-page__skeleton-line catalog-page__skeleton-line--small" data-v-d4fcc071></div><div class="catalog-page__skeleton-line catalog-page__skeleton-line--price" data-v-d4fcc071></div><div class="catalog-page__skeleton-button" data-v-d4fcc071></div></div></div>`);
        });
        _push(`<!--]--></div><div class="catalog-page__notice" data-v-d4fcc071><h2 class="catalog-page__notice-title" data-v-d4fcc071> Мы еще работаем<br data-v-d4fcc071> над наполнением каталога </h2><p class="catalog-page__notice-description" data-v-d4fcc071> Скоро тут появятся: корпоративная продукция, товары для свадеб и оформления магазинов, фотоальбомы и товары для художников </p><span class="catalog-page__notice-arrow" aria-hidden="true" data-v-d4fcc071>⌣</span></div></div></section>`);
      });
      _push(`<!--]--></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const catalog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d4fcc071"]]);

export { catalog as default };
//# sourceMappingURL=catalog-CqcsGRYK.mjs.map

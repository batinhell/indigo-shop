import { _ as __nuxt_component_0 } from './AppBreadcrumbs-CDv8EEOG.mjs';
import { _ as _export_sfc, l as useSeoMeta, k as __nuxt_component_0$1, c as _sfc_main$u } from './server.mjs';
import { computed, reactive, mergeProps, unref, ref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { useThrottleFn } from '@vueuse/core';
import { e as catalogSliderImage1, d as catalogSliderImage2, b as catalogSliderImage3, a as catalogSliderImage4, c as catalogSliderImage5 } from './catalog_slider_5-DDO4_gbN.mjs';
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

const _sfc_main$4 = {
  __name: "AppFavoriteButton",
  __ssrInlineRender: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    defaultActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:active", "change", "click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isActive = ref(props.active || props.defaultActive);
    watch(() => props.active, (value) => {
      isActive.value = value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppIcon = __nuxt_component_0$1;
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: ["app-favorite-button", { "app-favorite-button--active": unref(isActive) }],
        "aria-pressed": unref(isActive) ? "true" : "false",
        "aria-label": "Добавить в избранное"
      }, _attrs))} data-v-6c5b5247>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "favorite",
        class: "app-favorite-button__icon"
      }, null, _parent));
      _push(`</button>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFavoriteButton.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6c5b5247"]]);
const _sfc_main$3 = {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-badge" }, _attrs))} data-v-b1f7a17f><div class="product-badge-item product-badge-item--discount" data-v-b1f7a17f><span class="product-badge-item__text" data-v-b1f7a17f>${ssrInterpolate(props.discount)}</span></div><div class="product-badge-item product-badge-item--label" data-v-b1f7a17f><span class="product-badge-item__text" data-v-b1f7a17f>${ssrInterpolate(props.text)}</span></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductBadge.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-b1f7a17f"]]);
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
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-147728d0"]]);
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
    pickupText: {
      type: String,
      default: "Самовывоз из Донецка"
    },
    typeText: {
      type: String,
      default: "Онлайн-заказ"
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
    function setActiveImage(index) {
      activeImageIndex.value = Math.min(index, productImages.value.length - 1);
    }
    useThrottleFn((event) => {
      if (!hasImageSlider.value) {
        return;
      }
      const { left, width } = event.currentTarget.getBoundingClientRect();
      if (width <= 0) {
        return;
      }
      const cursorOffset = Math.min(Math.max(event.clientX - left, 0), width - 1);
      const sectionIndex = Math.floor(cursorOffset / width * imageSectionCount);
      setActiveImage(sectionIndex);
    }, 80);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$u;
      const _component_AppFavoriteButton = __nuxt_component_1;
      const _component_ProductBadge = __nuxt_component_2$1;
      const _component_ProductPriceRow = __nuxt_component_3;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "catalog-product-card" }, _attrs))} data-v-5244fde6><div class="catalog-product-card__media" data-v-5244fde6>`);
      if (unref(activeImage)) {
        _push(`<img${ssrRenderAttr("src", unref(activeImage))}${ssrRenderAttr("alt", __props.title)} class="catalog-product-card__image" data-v-5244fde6>`);
      } else {
        _push(`<div class="catalog-product-card__image catalog-product-card__image--empty" data-v-5244fde6>`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-image" }, null, _parent));
        _push(`</div>`);
      }
      _push(`<div class="catalog-product-card__edge catalog-product-card__edge--left" data-v-5244fde6></div><div class="catalog-product-card__edge catalog-product-card__edge--right" data-v-5244fde6></div><div class="catalog-product-card__media-content" data-v-5244fde6><div class="catalog-product-card__media-top" data-v-5244fde6>`);
      _push(ssrRenderComponent(_component_AppFavoriteButton, {
        onChange: ($event) => _ctx.$emit("toggle-favorite", $event)
      }, null, _parent));
      _push(`</div><div class="catalog-product-card__media-bottom" data-v-5244fde6>`);
      if (__props.showBadge) {
        _push(ssrRenderComponent(_component_ProductBadge, {
          discount: __props.discount,
          text: __props.badgeText
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="catalog-product-card__dots" aria-hidden="true" data-v-5244fde6><!--[-->`);
      ssrRenderList(unref(productImages), (sliderImage, index) => {
        _push(`<span class="${ssrRenderClass([{ "catalog-product-card__dot--active": index === unref(activeImageIndex) }, "catalog-product-card__dot"])}" data-v-5244fde6></span>`);
      });
      _push(`<!--]--></div></div></div></div><div class="catalog-product-card__content" data-v-5244fde6><div class="catalog-product-card__main" data-v-5244fde6><h3 class="catalog-product-card__title" data-v-5244fde6>${ssrInterpolate(__props.title)}</h3>`);
      _push(ssrRenderComponent(_component_ProductPriceRow, {
        sale: "",
        price: __props.price,
        "old-price": __props.oldPrice
      }, null, _parent));
      _push(`</div><div class="catalog-product-card__meta" data-v-5244fde6><span class="catalog-product-card__meta-item" data-v-5244fde6>${ssrInterpolate(__props.deliveryText)}</span><span class="catalog-product-card__meta-item" data-v-5244fde6>${ssrInterpolate(__props.pickupText)}</span><span class="catalog-product-card__meta-item" data-v-5244fde6>${ssrInterpolate(__props.typeText)}</span></div></div><button type="button" class="catalog-product-card__action" data-v-5244fde6> Выбрать параметры </button></article>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CatalogProductCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5244fde6"]]);
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
    const categoryItems = [
      {
        id: "artists",
        label: "Художникам",
        description: "Стикеры, постеры, скетчбуки и портфолио для творческих людей"
      },
      {
        id: "wedding",
        label: "Свадебное",
        description: "Полиграфия и сувениры в едином свадебном стиле"
      },
      {
        id: "albums",
        label: "Фотоальбомы",
        description: "Ручная сборка фотокниг под разные поводы"
      },
      {
        id: "textile",
        label: "Текстиль",
        description: "Нанесение на футболки, шопперы, кепки, флаги, нашивки"
      },
      {
        id: "retail",
        label: "Оформление магазинов",
        description: "Баннеры, стенды, таблички, вывески и витринная плёнка"
      },
      {
        id: "gifts",
        label: "Подарки близким",
        description: "Персонализированные сувениры с фото и гравировкой"
      },
      {
        id: "corporate",
        label: "Корпоративная продукция",
        description: "Имиджевая и рабочая полиграфия для бизнеса"
      },
      {
        id: "events",
        label: "К мероприятию",
        description: "Бейджи, браслеты, блокноты и фотозоны под событие"
      }
    ];
    const catalogSliderImages = [
      catalogSliderImage1,
      catalogSliderImage2,
      catalogSliderImage3,
      catalogSliderImage4,
      catalogSliderImage5
    ];
    function getProductImages(offset) {
      return catalogSliderImages.map((_, index) => {
        return catalogSliderImages[(index + offset) % catalogSliderImages.length];
      });
    }
    const products = [
      {
        id: 1,
        category: "artists",
        images: getProductImages(0),
        title: "Название товара в две-три строки, две-три строки",
        price: "от 8 888 ₽",
        oldPrice: "9999 ₽",
        discount: "-15%",
        badgeText: "На сайте дешевле"
      },
      {
        id: 2,
        category: "wedding",
        images: getProductImages(1),
        title: "Название товара в две-три строки, две-три строки",
        price: "от 7 550 ₽",
        oldPrice: "8999 ₽",
        discount: "-10%",
        badgeText: "На сайте выгоднее"
      },
      {
        id: 3,
        category: "albums",
        images: getProductImages(2),
        title: "Название товара в две-три строки, две-три строки",
        price: "от 9 240 ₽",
        oldPrice: "10999 ₽",
        discount: "-20%",
        badgeText: "На сайте дешевле"
      },
      {
        id: 4,
        category: "textile",
        images: getProductImages(3),
        title: "Название товара в две-три строки, две-три строки",
        price: "от 6 990 ₽",
        oldPrice: "7999 ₽",
        discount: "-8%",
        badgeText: "Акция"
      },
      {
        id: 5,
        category: "retail",
        images: getProductImages(4),
        title: "Название товара в две-три строки, две-три строки",
        price: "от 10 900 ₽",
        oldPrice: "12999 ₽",
        discount: "-16%",
        badgeText: "На сайте дешевле"
      },
      {
        id: 6,
        category: "gifts",
        images: getProductImages(0),
        title: "Название товара в две-три строки, две-три строки",
        price: "от 5 490 ₽",
        oldPrice: "6499 ₽",
        discount: "-12%",
        badgeText: "Акция"
      },
      {
        id: 7,
        category: "corporate",
        images: getProductImages(1),
        title: "Название товара в две-три строки, две-три строки",
        price: "от 11 990 ₽",
        oldPrice: "14999 ₽",
        discount: "-20%",
        badgeText: "На сайте выгоднее"
      },
      {
        id: 8,
        category: "events",
        images: getProductImages(2),
        title: "Название товара в две-три строки, две-три строки",
        price: "от 4 990 ₽",
        oldPrice: "5799 ₽",
        discount: "-9%",
        badgeText: "На сайте дешевле"
      }
    ];
    const categorySections = computed(() => {
      return categoryItems.map((category) => ({
        ...category,
        products: products.filter((item) => item.category === category.id)
      }));
    });
    const collapsedCategories = reactive(
      Object.fromEntries(categoryItems.map((category) => [category.id, false]))
    );
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppBreadcrumbs = __nuxt_component_0;
      const _component_AppIcon = __nuxt_component_0$1;
      const _component_CatalogProductCard = __nuxt_component_2;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "catalog-page" }, _attrs))} data-v-9434f62a><div class="catalog-page__container" data-v-9434f62a>`);
      _push(ssrRenderComponent(_component_AppBreadcrumbs, {
        items: breadcrumbs,
        class: "catalog-page__breadcrumbs"
      }, null, _parent));
      _push(`<h1 class="catalog-page__title" data-v-9434f62a> Каталог </h1><!--[-->`);
      ssrRenderList(unref(categorySections), (category) => {
        _push(`<section${ssrRenderAttr("id", `category-${category.id}`)} class="${ssrRenderClass([{ "catalog-page__subcategory--collapsed": unref(collapsedCategories)[category.id] }, "catalog-page__subcategory"])}"${ssrRenderAttr("aria-label", `Подкатегория ${category.label}`)} data-v-9434f62a><div class="catalog-page__subcategory-header" data-v-9434f62a><div class="catalog-page__subcategory-content" data-v-9434f62a><h2 class="catalog-page__subcategory-title" data-v-9434f62a>${ssrInterpolate(category.label)}</h2><p class="catalog-page__subcategory-description" data-v-9434f62a>${ssrInterpolate(category.description)}</p></div><button type="button" class="catalog-page__subcategory-toggle"${ssrRenderAttr("aria-expanded", unref(collapsedCategories)[category.id] ? "false" : "true")}${ssrRenderAttr("aria-controls", `category-grid-${category.id}`)}${ssrRenderAttr("aria-label", `${unref(collapsedCategories)[category.id] ? "Развернуть" : "Свернуть"} раздел ${category.label}`)} data-v-9434f62a>`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "chevron",
          size: 16,
          class: ["catalog-page__subcategory-toggle-icon", { "catalog-page__subcategory-toggle-icon--collapsed": unref(collapsedCategories)[category.id] }]
        }, null, _parent));
        _push(`</button></div><div${ssrRenderAttr("id", `category-grid-${category.id}`)} class="catalog-page__grid" aria-label="Товары" style="${ssrRenderStyle(!unref(collapsedCategories)[category.id] ? null : { display: "none" })}" data-v-9434f62a><!--[-->`);
        ssrRenderList(category.products, (item) => {
          _push(ssrRenderComponent(_component_CatalogProductCard, {
            key: item.id,
            images: item.images,
            title: item.title,
            price: item.price,
            "old-price": item.oldPrice,
            discount: item.discount,
            "badge-text": item.badgeText,
            "show-badge": Boolean(item.discount || item.badgeText)
          }, null, _parent));
        });
        _push(`<!--]--></div></section>`);
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
const catalog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9434f62a"]]);

export { catalog as default };
//# sourceMappingURL=catalog-QBxsDupZ.mjs.map

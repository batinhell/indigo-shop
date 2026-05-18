import { _ as _export_sfc, c as __nuxt_component_1$1 } from './server.mjs';
import { ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = {
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
      const _component_AppIcon = __nuxt_component_1$1;
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: ["app-favorite-button", { "app-favorite-button--active": unref(isActive) }],
        "aria-pressed": unref(isActive) ? "true" : "false",
        "aria-label": "Добавить в избранное"
      }, _attrs))} data-v-08cbf115>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "favorite",
        class: "app-favorite-button__icon"
      }, null, _parent));
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFavoriteButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-08cbf115"]]);
const textileCapsImage = "" + __buildAssetsURL("textile-caps.BA0R0Z1M.png");
const textileEmbroideryClothesImage = "" + __buildAssetsURL("textile-embroidery-clothes.DDD3s30Y.png");
const textileEmbroideryPatchesImage = "" + __buildAssetsURL("textile-embroidery-patches.BI_T9z9c.png");
const textileFlagsImage = "" + __buildAssetsURL("textile-flags.CpmamLaJ.png");
const textileMedalRibbonsImage = "" + __buildAssetsURL("textile-flags.CpmamLaJ.png");
const textilePennantsImage = "" + __buildAssetsURL("textile-flags.CpmamLaJ.png");
const textilePrintPillowImage = "" + __buildAssetsURL("textile-print-pillow.BE0p2UrK.png");
const textilePrintTshirtImage = "" + __buildAssetsURL("textile-print-tshirt.DSQ8CFf8.png");
const textileRibbonPrintImage = "" + __buildAssetsURL("textile-ribbon-print.-15G9hIc.png");
const textileShopperImage = "" + __buildAssetsURL("textile-shopper.ITFXD2Li.png");
const catalogCategoryItems = [
  {
    id: "textile",
    label: "Текстиль",
    description: "Нанесение на футболки, шопперы, кепки, флаги, нашивки"
  }
];
const catalogProducts = [
  {
    id: "catalog-textile-1",
    category: "textile",
    images: [textilePrintTshirtImage],
    title: "Печать на футболках",
    subtitle: "DTF-печать с чёткими, насыщенными цветами и высокой детализацией",
    price: "от 150 ₽",
    discount: "−10% от 20 шт",
    deliveryText: "от 2 дней",
    deliveryTiming: "short"
  },
  {
    id: "catalog-textile-2",
    category: "textile",
    images: [textilePrintPillowImage],
    title: "Печать на подушках",
    subtitle: "Сублимационная печать на хлопке, наполнение — синтепух",
    price: "от 600 ₽",
    discount: "−10% от 20 шт",
    deliveryText: "от 2 дней",
    deliveryTiming: "short"
  },
  {
    id: "catalog-textile-3",
    category: "textile",
    images: [textileShopperImage],
    title: "Шопперы",
    subtitle: "Хлопковый шопер плотностью 180 г. область нанесения — 25×25 см",
    price: "от 900 ₽",
    discount: "−10% от 20 шт",
    deliveryText: "от 2 дней",
    deliveryTiming: "short"
  },
  {
    id: "catalog-textile-4",
    category: "textile",
    images: [textileFlagsImage],
    title: "Изготовление флагов",
    subtitle: "Пять материалов и два размера на выбор",
    price: "от 590 ₽",
    discount: "−16% от 100 шт",
    deliveryText: "от 5 дней",
    deliveryTiming: "medium",
    orderType: "online"
  },
  {
    id: "catalog-textile-5",
    category: "textile",
    images: [textilePennantsImage],
    title: "Вымпелы",
    subtitle: "Полноцветная печать на атласе или матовом оксфорде",
    price: "от 200 ₽",
    discount: "−40% от 100 шт",
    deliveryText: "от 5 дней",
    deliveryTiming: "medium",
    orderType: "online"
  },
  {
    id: "catalog-textile-6",
    category: "textile",
    images: [textileCapsImage],
    title: "Печать на кепках",
    subtitle: "Хлопковые кепки плотностью 240 г, область нанесения — 10×10 см",
    price: "от 750 ₽",
    discount: "−17% от 100 шт",
    deliveryText: "от 5 дней",
    deliveryTiming: "medium"
  },
  {
    id: "catalog-textile-7",
    category: "textile",
    images: [textileEmbroideryClothesImage],
    title: "Вышивка на одежде",
    subtitle: "Объёмная машинная вышивка премиального качества",
    price: "от 250 ₽",
    discount: "−75% от 300 шт",
    deliveryText: "от 5 дней",
    deliveryTiming: "medium"
  },
  {
    id: "catalog-textile-8",
    category: "textile",
    images: [textileEmbroideryPatchesImage],
    title: "Вышивка шевронов",
    subtitle: "Детальная вышивка на плотной основе",
    price: "от 200 ₽",
    discount: "−75% от 300 шт",
    deliveryText: "от 5 дней",
    deliveryTiming: "medium",
    orderType: "online"
  },
  {
    id: "catalog-textile-9",
    category: "textile",
    images: [textileRibbonPrintImage],
    title: "Печать ленты",
    subtitle: "Печать на атласной ленте золотой, серебряной или чёрной краской",
    price: "от 35 ₽/м",
    discount: "−93% от 100 м",
    deliveryText: "от 5 дней",
    deliveryTiming: "medium"
  },
  {
    id: "catalog-textile-10",
    category: "textile",
    images: [textileMedalRibbonsImage],
    title: "Ленты для медалей",
    subtitle: "Репсовая лента 2,5×5 см с полноцветной печатью",
    price: "от 50 ₽",
    discount: "-15%",
    deliveryText: "от 5 дней",
    deliveryTiming: "medium"
  }
];

export { __nuxt_component_1 as _, catalogProducts as a, catalogCategoryItems as c };
//# sourceMappingURL=catalog-products-PEOD3epg.mjs.map

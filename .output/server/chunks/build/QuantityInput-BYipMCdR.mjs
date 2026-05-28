import { useModel, computed, ref, mergeProps, unref, mergeModels, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "qty-input" }, _attrs))} data-v-8464ac0f><button type="button" class="${ssrRenderClass(["qty-input__btn", { "qty-input__btn--disabled": !unref(canDecrement) }])}"${ssrIncludeBooleanAttr(!unref(canDecrement)) ? " disabled" : ""} aria-label="Уменьшить количество" data-v-8464ac0f><svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-8464ac0f><path d="M1 1h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-8464ac0f></path></svg></button>`);
      if (unref(isEditing)) {
        _push(`<input${ssrRenderAttr("value", unref(editValue))} class="qty-input__input" type="text" inputmode="numeric" data-v-8464ac0f>`);
      } else {
        _push(`<span class="qty-input__value" data-v-8464ac0f>${ssrInterpolate(model.value)} ${ssrInterpolate(__props.suffix)}</span>`);
      }
      _push(`<button type="button" class="${ssrRenderClass(["qty-input__btn", { "qty-input__btn--disabled": !unref(canIncrement) }])}"${ssrIncludeBooleanAttr(!unref(canIncrement)) ? " disabled" : ""} aria-label="Увеличить количество" data-v-8464ac0f><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-8464ac0f><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-8464ac0f></path></svg></button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuantityInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8464ac0f"]]);

export { __nuxt_component_2 as _ };
//# sourceMappingURL=QuantityInput-BYipMCdR.mjs.map

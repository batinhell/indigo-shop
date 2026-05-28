import { useModel, mergeProps, mergeModels, computed, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate, ssrRenderSlot, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$1 = {
  __name: "AppCheckbox",
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
          "app-checkbox",
          { "app-checkbox--checked": model.value, "app-checkbox--disabled": __props.disabled }
        ]
      }, _attrs))} data-v-5c83338d><input${ssrIncludeBooleanAttr(Array.isArray(model.value) ? ssrLooseContain(model.value, null) : model.value) ? " checked" : ""} type="checkbox" class="app-checkbox__input"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-5c83338d><span class="app-checkbox__box" data-v-5c83338d>`);
      if (model.value) {
        _push(`<svg class="app-checkbox__icon" viewBox="0 0 16 16" fill="none" data-v-5c83338d><path d="M3.5 8.5L6.5 11.5L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-5c83338d></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span>`);
      if (__props.label) {
        _push(`<span class="app-checkbox__label" data-v-5c83338d>${ssrInterpolate(__props.label)}</span>`);
      } else {
        _push(`<span class="app-checkbox__label" data-v-5c83338d>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppCheckbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5c83338d"]]);
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

export { __nuxt_component_3 as _, __nuxt_component_2 as a };
//# sourceMappingURL=QuantityInput-B4TIyuzV.mjs.map

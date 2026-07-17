import { useModel, mergeProps, mergeModels, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
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
      }, _attrs))} data-v-f3203e7c><input${ssrIncludeBooleanAttr(Array.isArray(model.value) ? ssrLooseContain(model.value, null) : model.value) ? " checked" : ""} type="checkbox" class="app-switch__input"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-f3203e7c><span class="app-switch__track" data-v-f3203e7c><span class="app-switch__thumb" data-v-f3203e7c></span></span>`);
      if (__props.label) {
        _push(`<span class="app-switch__label" data-v-f3203e7c>${ssrInterpolate(__props.label)}</span>`);
      } else {
        _push(`<span class="app-switch__label" data-v-f3203e7c>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppSwitch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f3203e7c"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AppSwitch-Bzlh0bNE.mjs.map

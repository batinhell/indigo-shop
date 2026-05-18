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
      }, _attrs))} data-v-84c8a38d><input${ssrIncludeBooleanAttr(Array.isArray(model.value) ? ssrLooseContain(model.value, null) : model.value) ? " checked" : ""} type="checkbox" class="app-switch__input"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-84c8a38d><span class="app-switch__track" data-v-84c8a38d><span class="app-switch__thumb" data-v-84c8a38d></span></span>`);
      if (__props.label) {
        _push(`<span class="app-switch__label" data-v-84c8a38d>${ssrInterpolate(__props.label)}</span>`);
      } else {
        _push(`<span class="app-switch__label" data-v-84c8a38d>`);
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
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-84c8a38d"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AppSwitch-B6KdDVqJ.mjs.map

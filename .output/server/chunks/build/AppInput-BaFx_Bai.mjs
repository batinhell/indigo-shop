import { _ as _export_sfc, g as _sfc_main$i } from './server.mjs';
import { useModel, ref, useAttrs, computed, mergeProps, unref, mergeModels, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrGetDynamicModelProps, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ Object.assign({
  inheritAttrs: false
}, {
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
    "modelValue": { type: String, default: "" },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    const inputRef = ref(null);
    const attrs = useAttrs();
    const wrapperAttributes = computed(() => ({
      class: attrs.class,
      style: attrs.style
    }));
    const inputAttributes = computed(() => {
      const {
        class: _class,
        style: _style,
        ...rest
      } = attrs;
      return rest;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      let _temp0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["app-input-wrapper", unref(wrapperAttributes).class],
        style: unref(wrapperAttributes).style
      }, _attrs))} data-v-8406adb8><div class="${ssrRenderClass([
        "app-input",
        { "app-input--disabled": __props.disabled }
      ])}" data-v-8406adb8>`);
      if (__props.icon) {
        _push(ssrRenderComponent(_component_UIcon, {
          name: __props.icon,
          class: "app-input__icon"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        ref_key: "inputRef",
        ref: inputRef,
        type: __props.type,
        placeholder: __props.placeholder,
        disabled: __props.disabled,
        min: __props.min,
        max: __props.max,
        class: "app-input__field"
      }, unref(inputAttributes)), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, model.value))))} data-v-8406adb8>`);
      ssrRenderSlot(_ctx.$slots, "suffix", {}, null, _push, _parent);
      if (__props.suffix) {
        _push(`<span class="app-input__suffix" data-v-8406adb8>${ssrInterpolate(__props.suffix)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.description) {
        _push(`<p class="app-input-description" data-v-8406adb8>${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8406adb8"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AppInput-BaFx_Bai.mjs.map

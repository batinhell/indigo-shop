import { _ as _export_sfc, a as __nuxt_component_0$5, d as _sfc_main$C } from './server.mjs';
import { computed, createVNode, resolveDynamicComponent, unref, mergeProps, withCtx, openBlock, createBlock, createCommentVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderVNode, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = {
  __name: "AppButton",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (v) => ["primary", "secondary", "ghost", "negative"].includes(v)
    },
    size: {
      type: String,
      default: "l",
      validator: (v) => ["s", "sm", "md", "m", "lg", "l"].includes(v)
    },
    tone: {
      type: String,
      default: "regular",
      validator: (v) => ["regular", "inverted"].includes(v)
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
    },
    type: {
      type: String,
      default: "button"
    }
  },
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const normalizedVariant = computed(() => {
      return props.variant === "ghost" ? "secondary" : props.variant;
    });
    const normalizedSize = computed(() => {
      if (props.size === "lg") return "l";
      if (props.size === "md") return "m";
      return props.size;
    });
    const componentTag = computed(() => {
      return props.tag === "NuxtLink" ? __nuxt_component_0$5 : props.tag;
    });
    const nativeButtonType = computed(() => {
      return props.tag === "button" ? props.type : void 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$C;
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(componentTag)), mergeProps({
        class: [
          "app-button",
          `app-button--${unref(normalizedVariant)}`,
          `app-button--${unref(normalizedSize)}`,
          `app-button--${__props.tone}`,
          { "app-button--icon-only": __props.iconOnly, "app-button--disabled": __props.disabled }
        ],
        disabled: __props.disabled,
        type: unref(nativeButtonType),
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
              _push2(`<span class="app-button__content" data-v-233c6bfd${_scopeId}>`);
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-233c6bfd"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AppButton-CB57Lp8b.mjs.map

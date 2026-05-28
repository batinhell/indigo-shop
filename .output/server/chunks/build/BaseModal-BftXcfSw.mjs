import { _ as _sfc_main$1 } from './Modal-iOm1f04o.mjs';
import { useModel, mergeProps, withCtx, createVNode, openBlock, createBlock, renderSlot, toDisplayString, createCommentVNode, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
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
      const _component_UModal = _sfc_main$1;
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BaseModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f4972e26"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=BaseModal-BftXcfSw.mjs.map

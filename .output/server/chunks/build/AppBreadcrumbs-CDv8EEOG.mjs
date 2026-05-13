import { _ as _export_sfc, a as __nuxt_component_0$5 } from './server.mjs';
import { mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "AppBreadcrumbs",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$5;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: "breadcrumbs",
        "aria-label": "Хлебные крошки"
      }, _attrs))} data-v-66b955a8><!--[-->`);
      ssrRenderList(__props.items, (item, index) => {
        _push(`<!--[-->`);
        if (item.to) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.to,
            class: "breadcrumbs__link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span class="breadcrumbs__link breadcrumbs__link_current" data-v-66b955a8>${ssrInterpolate(item.label)}</span>`);
        }
        if (index < __props.items.length - 1) {
          _push(`<span class="breadcrumbs__separator" aria-hidden="true" data-v-66b955a8> / </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></nav>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppBreadcrumbs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-66b955a8"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AppBreadcrumbs-CDv8EEOG.mjs.map

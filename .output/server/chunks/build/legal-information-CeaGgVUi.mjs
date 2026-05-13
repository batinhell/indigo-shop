import { _ as __nuxt_component_0 } from './AppBreadcrumbs-CDv8EEOG.mjs';
import { _ as _export_sfc, f as useSeoMeta, a as __nuxt_component_0$5 } from './server.mjs';
import { mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
import 'pinia';
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'better-auth/vue';
import 'better-auth/client/plugins';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const title = "Правовая информация — Indigo";
const description = "Юридические документы интернет-магазина «Индиго».";
const _sfc_main = {
  __name: "legal-information",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbs = [
      { label: "Главная", to: "/" },
      { label: "Правовая информация", to: "" }
    ];
    const legalPages = [
      {
        label: "Оплата",
        to: "/payment"
      },
      {
        label: "Доставка",
        to: "/delivery"
      },
      {
        label: "Политика конфиденциальности интернет-магазина «Индиго»",
        to: "/privacy-policy"
      },
      {
        label: "Правовая информация",
        to: "/legal-information"
      },
      {
        label: "Пользовательское соглашение интернет-магазина типографии «Индиго»",
        to: "/user-agreement"
      },
      {
        label: "Политика использования файлов cookie",
        to: "/cookie-policy"
      }
    ];
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppBreadcrumbs = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$5;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "legal-page" }, _attrs))} data-v-eb9c58a7><div class="legal-page__container" data-v-eb9c58a7><div class="legal-page__intro" data-v-eb9c58a7>`);
      _push(ssrRenderComponent(_component_AppBreadcrumbs, {
        items: breadcrumbs,
        class: "legal-page__breadcrumbs"
      }, null, _parent));
      _push(`<h1 class="legal-page__title" data-v-eb9c58a7> Правовая информация </h1></div><ul class="legal-page__list" data-v-eb9c58a7><!--[-->`);
      ssrRenderList(legalPages, (item) => {
        _push(`<li class="legal-page__item" data-v-eb9c58a7>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.to,
          class: "legal-page__link"
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
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/legal-information.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const legalInformation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb9c58a7"]]);

export { legalInformation as default };
//# sourceMappingURL=legal-information-CeaGgVUi.mjs.map

import { _ as __nuxt_component_0 } from './AppBreadcrumbs-CDv8EEOG.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, f as useSeoMeta } from './server.mjs';
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

const title = "Политика использования файлов cookie — Indigo";
const description = "Политика использования файлов cookie интернет-магазина «Индиго».";
const _sfc_main = {
  __name: "cookie-policy",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbs = [
      { label: "Главная", to: "/" },
      { label: "Правовая информация", to: "/legal-information" },
      { label: "Политика использования файлов cookie", to: "" }
    ];
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppBreadcrumbs = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "cookie-page" }, _attrs))} data-v-8d047e3e><div class="cookie-page__container" data-v-8d047e3e>`);
      _push(ssrRenderComponent(_component_AppBreadcrumbs, {
        items: breadcrumbs,
        class: "cookie-page__breadcrumbs"
      }, null, _parent));
      _push(`<article class="cookie-page__card" data-v-8d047e3e><h1 class="cookie-page__title" data-v-8d047e3e> Политика использования файлов cookie </h1><p class="cookie-page__text" data-v-8d047e3e> Текст страницы будет добавлен отдельно. </p></article></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cookie-policy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cookiePolicy = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8d047e3e"]]);

export { cookiePolicy as default };
//# sourceMappingURL=cookie-policy-D_fzbr6m.mjs.map

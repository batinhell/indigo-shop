import { _ as __nuxt_component_0 } from './AppButton-CB57Lp8b.mjs';
import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, f as useSeoMeta, n as navigateTo } from './server.mjs';
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

const heroPattern = "" + __buildAssetsURL("landing-hero-pattern.DfC6rtHl.svg");
const title = "Типография Индиго";
const description = "Мы заканчиваем работу над новым сайтом типографии Индиго.";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const openCatalog = () => {
      navigateTo("/catalog");
    };
    const openMail = () => {
      (void 0).location.href = "mailto:info@indigo-mail.ru";
    };
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppButton = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "landing-placeholder" }, _attrs))} data-v-1bbb225c><section class="landing-placeholder__hero" aria-labelledby="landing-placeholder-title" data-v-1bbb225c><img${ssrRenderAttr("src", unref(heroPattern))} alt="" class="landing-placeholder__pattern" aria-hidden="true" data-v-1bbb225c><div class="landing-placeholder__notice" data-v-1bbb225c><h1 id="landing-placeholder-title" class="landing-placeholder__title" data-v-1bbb225c> Мы заканчиваем работу<br data-v-1bbb225c> над новым сайтом </h1><p class="landing-placeholder__text" data-v-1bbb225c> И пока проводим тесты. Скоро добавим расширенный каталог, онлайн конструктор и много чего еще, а на этом месте будет красивый hero block </p></div><div class="landing-placeholder__actions" data-v-1bbb225c>`);
      _push(ssrRenderComponent(_component_AppButton, {
        class: "landing-placeholder__button",
        onClick: openCatalog
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Каталог товаров `);
          } else {
            return [
              createTextVNode(" Каталог товаров ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AppButton, {
        variant: "secondary",
        class: "landing-placeholder__button landing-placeholder__button_secondary",
        onClick: openMail
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Обсудить проект `);
          } else {
            return [
              createTextVNode(" Обсудить проект ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="landing-placeholder__progress" aria-labelledby="landing-progress-title" data-v-1bbb225c><div class="landing-placeholder__about" aria-hidden="true" data-v-1bbb225c><h2 data-v-1bbb225c>О нас</h2><p data-v-1bbb225c>Цифры, которые отвечают за качество и сроки</p><div class="landing-placeholder__about-grid" data-v-1bbb225c><span data-v-1bbb225c></span><span data-v-1bbb225c></span><span data-v-1bbb225c></span><span data-v-1bbb225c></span></div></div><div class="landing-placeholder__progress-message" data-v-1bbb225c><h2 id="landing-progress-title" data-v-1bbb225c> Мы еще работаем<br data-v-1bbb225c> над наполнением главной </h2><p data-v-1bbb225c> Скоро тут появятся: информация о нас, примеры готовых работ, ответы на частые вопросы и блок о проектной работе </p><span class="landing-placeholder__smile" aria-hidden="true" data-v-1bbb225c>⌣</span></div></section></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1bbb225c"]]);

export { index as default };
//# sourceMappingURL=index-CC7V1i_B.mjs.map

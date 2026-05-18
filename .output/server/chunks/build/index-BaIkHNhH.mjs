import { _ as __nuxt_component_0 } from './AppButton-D6iSYne7.mjs';
import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { p as progressSmile } from './landing-progress-smile-D8xuHxsy.mjs';
import { _ as _export_sfc, o as useSeoMeta, aI as navigateTo } from './server.mjs';
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
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "landing-placeholder" }, _attrs))} data-v-dd98e2cc><section class="landing-placeholder__hero" aria-labelledby="landing-placeholder-title" data-v-dd98e2cc><img${ssrRenderAttr("src", unref(heroPattern))} alt="" class="landing-placeholder__pattern" aria-hidden="true" data-v-dd98e2cc><div class="landing-placeholder__notice" data-v-dd98e2cc><h1 id="landing-placeholder-title" class="landing-placeholder__title" data-v-dd98e2cc> Мы заканчиваем работу<br data-v-dd98e2cc> над новым сайтом </h1><p class="landing-placeholder__text" data-v-dd98e2cc> И пока проводим тесты. Скоро добавим расширенный каталог, онлайн конструктор и много чего еще, а на этом месте будет красивый hero block </p></div><div class="landing-placeholder__actions" data-v-dd98e2cc>`);
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
      _push(`</div></section><section class="landing-placeholder__progress" aria-labelledby="landing-progress-title" data-v-dd98e2cc><div class="landing-placeholder__about" aria-hidden="true" data-v-dd98e2cc><h2 data-v-dd98e2cc>О нас</h2><p data-v-dd98e2cc>Цифры, которые отвечают за качество и сроки</p><div class="landing-placeholder__about-grid" data-v-dd98e2cc><span data-v-dd98e2cc></span><span data-v-dd98e2cc></span><span data-v-dd98e2cc></span><span data-v-dd98e2cc></span></div></div><div class="landing-placeholder__progress-message" data-v-dd98e2cc><h2 id="landing-progress-title" data-v-dd98e2cc> Мы еще работаем<br data-v-dd98e2cc> над наполнением главной </h2><p data-v-dd98e2cc> Скоро тут появятся: информация о нас, примеры готовых работ, ответы на частые вопросы и блок о проектной работе </p><img${ssrRenderAttr("src", unref(progressSmile))} alt="" class="landing-placeholder__smile" aria-hidden="true" data-v-dd98e2cc></div></section></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd98e2cc"]]);

export { index as default };
//# sourceMappingURL=index-BaIkHNhH.mjs.map

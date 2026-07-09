import { _ as __nuxt_component_0 } from './AppBreadcrumbs-CDv8EEOG.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, f as useSeoMeta } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:fs/promises';
import 'kysely';
import 'node:child_process';
import 'node:path';
import 'better-auth';
import 'better-auth/plugins';
import 'mysql2';
import 'qrcode';
import 'node:fs';
import 'node:https';
import 'node:http';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'pinia';
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
const description = "Политика использования файлов cookie интернет-магазина типографии «Индиго».";
const _sfc_main = {
  __name: "cookie-policy",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbs = [
      { label: "Главная", to: "/" },
      { label: "Правовая информация", to: "/legal-information" },
      { label: "Политика cookie", to: "" }
    ];
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppBreadcrumbs = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "cookie-page" }, _attrs))} data-v-22e3bbc0><div class="cookie-page__container" data-v-22e3bbc0>`);
      _push(ssrRenderComponent(_component_AppBreadcrumbs, {
        items: breadcrumbs,
        class: "cookie-page__breadcrumbs"
      }, null, _parent));
      _push(`<article class="cookie-page__card" data-v-22e3bbc0><h1 class="cookie-page__title" data-v-22e3bbc0> Политика использования файлов cookie <br data-v-22e3bbc0> интернет-магазина типографии «Индиго» </h1><p class="cookie-page__date" data-v-22e3bbc0> «___» __________ 20__ г. </p><div class="cookie-page__content" data-v-22e3bbc0><section class="cookie-section" data-v-22e3bbc0><h2 class="cookie-section__title" data-v-22e3bbc0><span class="cookie-section__number" data-v-22e3bbc0>1.</span>Что такое cookie</h2><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>1.1.</span>Cookie — небольшие текстовые файлы, которые сохраняются на устройстве Пользователя при посещении сайта.</p><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>1.2.</span>Cookie не содержат персональных данных и не могут использоваться для идентификации личности Пользователя без дополнительной информации.</p></section><section class="cookie-section" data-v-22e3bbc0><h2 class="cookie-section__title" data-v-22e3bbc0><span class="cookie-section__number" data-v-22e3bbc0>2.</span>Какие cookie мы используем</h2><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>2.1.</span>Необходимые cookie — обеспечивают работу сайта, авторизацию, корзину и оформление заказа. Без них сайт не может функционировать. Срок хранения — до закрытия браузера или до 30 дней.</p><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>2.2.</span>Функциональные cookie — сохраняют настройки Пользователя: выбранный город, язык, историю просмотров. Срок хранения — до 1 года.</p><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>2.3.</span>Аналитические cookie — помогают понять, как Пользователи взаимодействуют с сайтом: какие страницы посещают, сколько времени проводят. Данные собираются в обезличенном виде. Срок хранения — до 2 лет.</p></section><section class="cookie-section" data-v-22e3bbc0><h2 class="cookie-section__title" data-v-22e3bbc0><span class="cookie-section__number" data-v-22e3bbc0>3.</span>Зачем мы используем cookie</h2><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>3.1.</span>Обеспечение корректной работы сайта и его функций.</p><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>3.2.</span>Сохранение товаров в корзине между сессиями.</p><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>3.3.</span>Запоминание настроек и предпочтений Пользователя.</p><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>3.4.</span>Анализ посещаемости и улучшение работы сайта.</p></section><section class="cookie-section" data-v-22e3bbc0><h2 class="cookie-section__title" data-v-22e3bbc0><span class="cookie-section__number" data-v-22e3bbc0>4.</span>Управление cookie</h2><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>4.1.</span>Пользователь может в любой момент отключить или удалить cookie через настройки своего браузера.</p><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>4.2.</span>Отключение cookie может привести к ограничению функциональности сайта: невозможность авторизации, потеря товаров в корзине, сброс настроек.</p><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>4.3.</span>Инструкции по управлению cookie доступны в справочных разделах используемого браузера.</p></section><section class="cookie-section" data-v-22e3bbc0><h2 class="cookie-section__title" data-v-22e3bbc0><span class="cookie-section__number" data-v-22e3bbc0>5.</span>Изменение политики</h2><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>5.1.</span>Продавец вправе обновлять настоящую Политику. Актуальная версия всегда размещена на данной странице.</p><p class="cookie-section__text" data-v-22e3bbc0><span class="cookie-section__subnumber" data-v-22e3bbc0>5.2.</span>Продолжение использования сайта после публикации изменений означает согласие Пользователя с новой редакцией Политики.</p></section><section class="cookie-section" data-v-22e3bbc0><h2 class="cookie-section__title cookie-section__title" data-v-22e3bbc0>Контакты</h2><p class="cookie-section__contact" data-v-22e3bbc0> По вопросам обработки данных: <br data-v-22e3bbc0> Email: Info@indigo-mail.ru <br data-v-22e3bbc0> Телефон: +7 (949) 131-45-44 </p></section></div></article></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cookie-policy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cookiePolicy = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-22e3bbc0"]]);

export { cookiePolicy as default };
//# sourceMappingURL=cookie-policy-D-IvdQE5.mjs.map

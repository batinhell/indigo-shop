import { _ as _export_sfc, f as useSeoMeta, a as __nuxt_component_0$4 } from './server.mjs';
import { mergeProps, unref, ref, reactive, computed, watch, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'node:fs/promises';
import 'kysely';
import 'node:child_process';
import 'node:path';
import 'qrcode';
import 'node:fs';
import 'node:https';
import 'better-auth';
import 'better-auth/plugins';
import 'mysql2';
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

const progressSmile = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2062.7342%2039.6969'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Arrow%20Group'%3e%3cpath%20id='Vector%20243'%20d='M2.42885%205.37852C6.99841%200.91018%2015.2922%201.52122%2018.5063%207.14184'%20stroke='var(--stroke-0,%20%23DE7AFF)'%20stroke-width='4.85771'%20stroke-linecap='round'/%3e%3cpath%20id='Vector%20245'%20d='M44.2431%209.95675C48.8507%205.52763%2057.139%206.20954%2060.3049%2011.8574'%20stroke='var(--stroke-0,%20%23DE7AFF)'%20stroke-width='4.85771'%20stroke-linecap='round'/%3e%3cpath%20id='Vector%20246'%20d='M17.5111%2030.523C23.4828%2038.6491%2036.5525%2039.8193%2042.9945%2031.8902'%20stroke='var(--stroke-0,%20%23DE7AFF)'%20stroke-width='4.85771'%20stroke-linecap='round'/%3e%3c/g%3e%3c/svg%3e";
const dropdownIcon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M7.29291 11.4142L2.29291 6.41421L3.70712 5L8.00001 9.29289L12.2929 5L13.7071 6.41421L8.70712 11.4142C8.3166 11.8047 7.68343 11.8047 7.29291 11.4142Z" fill="currentColor"/>\n</svg>\n';
const bulletIcon = "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='10'%20cy='10'%20r='9'%20fill='white'/%3e%3c/svg%3e";
const albumsImage = "" + __buildAssetsURL("landing-hero-albums.BffCiHMN.jpg");
const flagsImage = "" + __buildAssetsURL("landing-hero-flags.BfUORpvI.jpg");
const photozonesImage = "" + __buildAssetsURL("landing-hero-photozones.CjMrFZMC.jpg");
const puzzlesImage = "" + __buildAssetsURL("landing-hero-puzzles.BOsUM1lR.jpg");
const sketchbooksImage = "" + __buildAssetsURL("landing-hero-sketchbooks.B4_Hvm_w.jpg");
const stickersImage = "" + __buildAssetsURL("landing-hero-stickers.Cl8Oguc-.jpg");
const tshirtsImage = "" + __buildAssetsURL("landing-hero-tshirts.DB8WH3Mo.jpg");
const directionLink = (slug) => `/catalog?direction=${slug}`;
const audienceLink = (slug) => `/catalog?audience=${slug}`;
const landingHeroDropdowns = {
  direction: {
    label: "Выберите направление",
    tags: [
      { label: "Художникам", to: directionLink("artists") },
      { label: "Свадебное", to: directionLink("wedding") },
      { label: "Фотоальбомы", to: directionLink("photo-albums") },
      { label: "Текстиль", to: directionLink("textile") },
      { label: "Оформление магазинов", to: directionLink("store-design") },
      { label: "Подарки", to: directionLink("gifts") },
      { label: "Корпоративное", to: directionLink("corporate") },
      { label: "К мероприятию", to: directionLink("events") }
    ]
  },
  audience: {
    label: "Выберите, для кого",
    tags: [
      { label: "Искусство и культура", to: audienceLink("art-culture") },
      { label: "Гражданская и общественная деятельность", to: audienceLink("civic") },
      { label: "Потребительские бренды", to: audienceLink("consumer-brands") },
      { label: "Образование", to: audienceLink("education") },
      { label: "Развлечение", to: audienceLink("entertainment") },
      { label: "Мода и красота", to: audienceLink("fashion-beauty") },
      { label: "Дети и семья", to: audienceLink("kids-family") },
      { label: "Еда и напитки", to: audienceLink("food-drinks") },
      { label: "Финансы", to: audienceLink("finance") },
      { label: "Здоровье", to: audienceLink("health") },
      { label: "Спорт и фитнес", to: audienceLink("sport-fitness") },
      { label: "Некоммерческие организации", to: audienceLink("non-profit") },
      { label: "Мероприятия", to: audienceLink("events") },
      { label: "Транспорт", to: audienceLink("transport") },
      { label: "Туризм и отели", to: audienceLink("tourism-hotels") },
      { label: "Недвижимость", to: audienceLink("real-estate") },
      { label: "Производство и промышленность", to: audienceLink("manufacturing") }
    ]
  }
};
const slideCaption = {
  title: "Название проекта/изделия",
  description: "Описание проекта/изделия: для кого и для чего сделан, в рамках какого мероприятия <...>"
};
const landingHeroSlides = [
  {
    id: "tshirts",
    image: tshirtsImage,
    imagePosition: "50% 0",
    direction: "печатаем на футболках",
    audience: "всех",
    ...slideCaption
  },
  {
    id: "flags",
    image: flagsImage,
    direction: "изготавливаем флаги",
    audience: "фестивалей",
    ...slideCaption
  },
  {
    id: "puzzles",
    image: puzzlesImage,
    direction: "печатаем фотопазлы",
    audience: "подарков близким",
    ...slideCaption
  },
  {
    id: "sketchbooks",
    image: sketchbooksImage,
    direction: "создаём скетчбуки",
    audience: "творчества",
    ...slideCaption
  },
  {
    id: "albums",
    image: albumsImage,
    direction: "печатаем альбомы",
    audience: "мероприятий",
    ...slideCaption
  },
  {
    id: "photozones",
    image: photozonesImage,
    direction: "создаём фотозоны",
    audience: "рекламных кампаний",
    ...slideCaption
  },
  {
    id: "stickers",
    image: stickersImage,
    direction: "печатаем стикерпаки",
    audience: "корпоративного мерча",
    ...slideCaption
  }
];
const AUTOPLAY_DELAY = 4e3;
const _sfc_main$1 = {
  __name: "LandingHero",
  __ssrInlineRender: true,
  setup(__props) {
    const slides = landingHeroSlides;
    const activeIndex = ref(0);
    const openKey = ref(null);
    const hoveredKey = ref(null);
    ref(null);
    const rollWidths = reactive({});
    let autoplayTimer = null;
    const activeSlide = computed(() => slides[activeIndex.value]);
    const openDropdown = computed(() => openKey.value ? landingHeroDropdowns[openKey.value] : null);
    const isHighlighted = computed(() => Boolean(openKey.value || hoveredKey.value));
    function getElementState(key) {
      if (openKey.value === key) {
        return "active";
      }
      if (hoveredKey.value === key) {
        return "hovered";
      }
      return isHighlighted.value ? "muted" : "default";
    }
    function stopAutoplay() {
      clearTimeout(autoplayTimer);
      autoplayTimer = null;
    }
    function scheduleAutoplay() {
      stopAutoplay();
      if (openKey.value || slides.length < 2) {
        return;
      }
      autoplayTimer = setTimeout(() => {
        activeIndex.value = (activeIndex.value + 1) % slides.length;
      }, AUTOPLAY_DELAY);
    }
    function closeDropdown() {
      openKey.value = null;
    }
    function getRollStyle(key) {
      return rollWidths[key] ? { width: `${rollWidths[key]}px` } : void 0;
    }
    watch([activeIndex, openKey], scheduleAutoplay);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["landing-hero", { "landing-hero_open": unref(openKey) }],
        "aria-roledescription": "carousel",
        "aria-label": "Что мы делаем"
      }, _attrs))} data-v-9dc321ae><div class="landing-hero__slides" data-v-9dc321ae><!--[-->`);
      ssrRenderList(unref(slides), (slide, index2) => {
        _push(`<img${ssrRenderAttr("src", slide.image)}${ssrRenderAttr("alt", `Мы ${slide.direction} для ${slide.audience}`)} class="${ssrRenderClass(["landing-hero__slide", { "landing-hero__slide_active": index2 === unref(activeIndex) }])}" style="${ssrRenderStyle(slide.imagePosition ? { objectPosition: slide.imagePosition } : void 0)}"${ssrRenderAttr("aria-hidden", index2 !== unref(activeIndex))}${ssrRenderAttr("loading", index2 === 0 ? "eager" : "lazy")}${ssrRenderAttr("fetchpriority", index2 === 0 ? "high" : "auto")} decoding="async" data-v-9dc321ae>`);
      });
      _push(`<!--]--></div><div class="landing-hero__caption" data-v-9dc321ae><p class="landing-hero__caption-title" data-v-9dc321ae>${ssrInterpolate(unref(activeSlide).title)}</p><p class="landing-hero__caption-text" data-v-9dc321ae>${ssrInterpolate(unref(activeSlide).description)}</p></div><div class="landing-hero__bullets" data-v-9dc321ae><!--[-->`);
      ssrRenderList(unref(slides), (slide, index2) => {
        _push(`<button type="button" class="${ssrRenderClass(["landing-hero__bullet", { "landing-hero__bullet_active": index2 === unref(activeIndex) }])}"${ssrRenderAttr("aria-label", `Слайд ${index2 + 1} из ${unref(slides).length}`)}${ssrRenderAttr("aria-current", index2 === unref(activeIndex))} data-v-9dc321ae><img${ssrRenderAttr("src", unref(bulletIcon))} alt="" aria-hidden="true" data-v-9dc321ae></button>`);
      });
      _push(`<!--]--></div>`);
      if (unref(openKey)) {
        _push(`<div class="landing-hero__overlay" aria-hidden="true" data-v-9dc321ae></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="landing-hero__controls" data-v-9dc321ae>`);
      if (unref(openDropdown)) {
        _push(`<div${ssrRenderAttr("id", `landing-hero-panel-${unref(openKey)}`)} class="${ssrRenderClass(["landing-hero__panel", `landing-hero__panel_${unref(openKey)}`])}" data-v-9dc321ae><nav class="landing-hero__tags"${ssrRenderAttr("aria-label", unref(openDropdown).label)} data-v-9dc321ae><!--[-->`);
        ssrRenderList(unref(openDropdown).tags, (tag) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: tag.to,
            to: tag.to,
            class: "landing-hero__tag",
            onClick: closeDropdown
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(tag.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(tag.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(["landing-hero__selector", { "landing-hero__selector_highlighted": unref(isHighlighted) }])}" data-v-9dc321ae><span class="landing-hero__word" data-v-9dc321ae>Мы</span><!--[-->`);
      ssrRenderList(["direction", "audience"], (key, keyIndex) => {
        _push(`<!--[-->`);
        if (keyIndex > 0) {
          _push(`<span class="landing-hero__word" data-v-9dc321ae>для</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="button" class="${ssrRenderClass(["landing-hero__dropdown", `landing-hero__dropdown_${getElementState(key)}`])}"${ssrRenderAttr("aria-expanded", unref(openKey) === key)}${ssrRenderAttr("aria-controls", `landing-hero-panel-${key}`)}${ssrRenderAttr("aria-label", `${unref(landingHeroDropdowns)[key].label}: ${unref(activeSlide)[key]}`)} data-v-9dc321ae><span class="landing-hero__roll" style="${ssrRenderStyle(getRollStyle(key))}" data-v-9dc321ae><span class="landing-hero__roll-text" data-v-9dc321ae>${ssrInterpolate(unref(activeSlide)[key])}</span><span class="landing-hero__roll-measure"${ssrRenderAttr("data-roll-key", key)} aria-hidden="true" data-v-9dc321ae>${ssrInterpolate(unref(activeSlide)[key])}</span></span><span class="landing-hero__chevron" aria-hidden="true" data-v-9dc321ae>${unref(dropdownIcon) ?? ""}</span></button><!--]-->`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingHero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-9dc321ae"]]), { __name: "LandingHero" });
const title = "Типография Индиго";
const description = "Мы заканчиваем работу над новым сайтом типографии Индиго.";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LandingHero = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "landing-placeholder" }, _attrs))} data-v-eb6603bd><h1 class="landing-placeholder__heading" data-v-eb6603bd>${ssrInterpolate(title)}</h1>`);
      _push(ssrRenderComponent(_component_LandingHero, null, null, _parent));
      _push(`<section class="landing-placeholder__progress" aria-labelledby="landing-progress-title" data-v-eb6603bd><div class="landing-placeholder__about" aria-hidden="true" data-v-eb6603bd><h2 data-v-eb6603bd>О нас</h2><p data-v-eb6603bd>Цифры, которые отвечают за качество и сроки</p><div class="landing-placeholder__about-grid" data-v-eb6603bd><span data-v-eb6603bd></span><span data-v-eb6603bd></span><span data-v-eb6603bd></span><span data-v-eb6603bd></span></div></div><div class="landing-placeholder__progress-message" data-v-eb6603bd><h2 id="landing-progress-title" data-v-eb6603bd> Мы еще работаем<br data-v-eb6603bd> над наполнением главной </h2><p data-v-eb6603bd> Скоро тут появятся: информация о нас, примеры готовых работ, ответы на частые вопросы и блок о проектной работе </p><img${ssrRenderAttr("src", unref(progressSmile))} alt="" class="landing-placeholder__smile" aria-hidden="true" data-v-eb6603bd></div></section></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb6603bd"]]);

export { index as default };
//# sourceMappingURL=index-CefLhfuD.mjs.map

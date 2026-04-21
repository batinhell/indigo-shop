import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { useSlots, toRef, computed, unref, mergeProps, withCtx, toHandlers, renderSlot, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createVNode, Fragment, resolveDynamicComponent, isRef, toValue, getCurrentInstance, onServerPrefetch, ref, inject, defineComponent, shallowRef, h, resolveComponent, useModel, mergeModels, watch, hasInjectionContext, nextTick, provide, defineAsyncComponent, createElementBlock, cloneVNode, useSSRContext, Suspense, createApp, renderList, useId, withModifiers, shallowReactive, onErrorCaptured, reactive, effectScope, useTemplateRef, getCurrentScope, markRaw, isReadonly, isShallow, isReactive, toRaw } from 'vue';
import { C as serialize, D as defu, E as parseQuery, F as klona, G as hasProtocol, A as joinURL, H as parseURL, I as encodePath, J as decodePath, K as defuFn, L as isEqual, M as withQuery, N as isScriptProtocol, O as getContext, c as createError$1, P as withTrailingSlash, Q as withoutTrailingSlash, R as sanitizeStatusCode, $ as $fetch$1, S as baseURL, T as createHooks, U as isPhoneLike, V as getIdentifierError, W as getRegistrationEmailError, b as normalizePhoneDigits, X as formatAuthPhone, Y as formatCompactPhone, Z as formatPhone, _ as unmaskPhoneToEmail, a0 as executeAsync } from '../nitro/nitro.mjs';
import { RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import colors from 'tailwindcss/colors';
import { Icon, getIcon, loadIcon as loadIcon$1, _api, addAPIProvider, setCustomIconsLoader } from '@iconify/vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderClass, ssrRenderVNode, ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrRenderDynamicModel, ssrRenderSuspense } from 'vue/server-renderer';
import { useForwardPropsEmits, DialogRoot, DialogContent, VisuallyHidden, DialogTitle, DialogDescription, DialogClose, DialogTrigger, DialogPortal, DialogOverlay, useForwardProps, Primitive, Slot, createContext, ToastProvider, ToastPortal, ToastViewport, ConfigProvider, TooltipProvider, ToastRoot, ToastTitle, ToastDescription, ToastAction, ToastClose, ProgressRoot, ProgressIndicator } from 'reka-ui';
import { reactivePick, createReusableTemplate, reactiveOmit, createSharedComposable } from '@vueuse/core';
import { createTV } from 'tailwind-variants';
import { getIconCSS } from '@iconify/utils/lib/css/icon';
import { debounce } from 'perfect-debounce';
import { createAuthClient } from 'better-auth/vue';
import { phoneNumberClient } from 'better-auth/client/plugins';
import { u as useSeoMeta$1, a as useHead$1, h as headSymbol } from '../routes/renderer.mjs';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

function diff(obj1, obj2) {
  const h1 = _toHashedObject(obj1);
  const h2 = _toHashedObject(obj2);
  return _diff(h1, h2);
}
function _diff(h1, h2) {
  const diffs = [];
  const allProps = /* @__PURE__ */ new Set([
    ...Object.keys(h1.props || {}),
    ...Object.keys(h2.props || {})
  ]);
  if (h1.props && h2.props) {
    for (const prop of allProps) {
      const p1 = h1.props[prop];
      const p2 = h2.props[prop];
      if (p1 && p2) {
        diffs.push(..._diff(h1.props?.[prop], h2.props?.[prop]));
      } else if (p1 || p2) {
        diffs.push(
          new DiffEntry((p2 || p1).key, p1 ? "removed" : "added", p2, p1)
        );
      }
    }
  }
  if (allProps.size === 0 && h1.hash !== h2.hash) {
    diffs.push(new DiffEntry((h2 || h1).key, "changed", h2, h1));
  }
  return diffs;
}
function _toHashedObject(obj, key = "") {
  if (obj && typeof obj !== "object") {
    return new DiffHashedObject(key, obj, serialize(obj));
  }
  const props = {};
  const hashes = [];
  for (const _key in obj) {
    props[_key] = _toHashedObject(obj[_key], key ? `${key}.${_key}` : _key);
    hashes.push(props[_key].hash);
  }
  return new DiffHashedObject(key, obj, `{${hashes.join(":")}}`, props);
}
class DiffEntry {
  constructor(key, type, newValue, oldValue) {
    this.key = key;
    this.type = type;
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
  toString() {
    return this.toJSON();
  }
  toJSON() {
    switch (this.type) {
      case "added": {
        return `Added   \`${this.key}\``;
      }
      case "removed": {
        return `Removed \`${this.key}\``;
      }
      case "changed": {
        return `Changed \`${this.key}\` from \`${this.oldValue?.toString() || "-"}\` to \`${this.newValue.toString()}\``;
      }
    }
  }
}
class DiffHashedObject {
  constructor(key, value, hash, props) {
    this.key = key;
    this.value = value;
    this.hash = hash;
    this.props = props;
  }
  toString() {
    if (this.props) {
      return `{${Object.keys(this.props).join(",")}}`;
    } else {
      return JSON.stringify(this.value);
    }
  }
  toJSON() {
    const k = this.key || ".";
    if (this.props) {
      return `${k}({${Object.keys(this.props).join(",")}})`;
    }
    return `${k}(${this.value})`;
  }
}

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "deep": false };
const fetchDefaults = {};
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    versions: {
      get nuxt() {
        return "4.3.1";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext["~renderResponse"] = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
  return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
function encodeRoutePath(url) {
  const parsed = parseURL(url);
  return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  if (typeof error !== "string" && error.statusText) {
    error.message ??= error.statusText;
  }
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  Object.defineProperty(nuxtError, "status", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusCode,
    configurable: true
  });
  Object.defineProperty(nuxtError, "statusText", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusMessage,
    configurable: true
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const matcher = /* @__PURE__ */ (() => {
  const $0 = { prerender: true };
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    if (p === "/") {
      r.unshift({ data: $0 });
    }
    return r;
  };
})();
const _routeRulesMatcher = (path) => defu({}, ...matcher("", path).map((r) => r.data).reverse());
const routeRulesMatcher$1 = _routeRulesMatcher;
function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher$1(path);
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
const _routes = [
  {
    name: "index",
    path: "/",
    component: () => import('./index-B-Coxgk-.mjs')
  },
  {
    name: "catalog",
    path: "/catalog",
    component: () => import('./catalog-D7IZ7cQS.mjs')
  },
  {
    name: "payment",
    path: "/payment",
    component: () => import('./payment-DOhkDX_m.mjs')
  },
  {
    name: "delivery",
    path: "/delivery",
    component: () => import('./delivery-DcrZpN-H.mjs')
  },
  {
    name: "cookie-policy",
    path: "/cookie-policy",
    component: () => import('./cookie-policy-Dw0-iCra.mjs')
  },
  {
    name: "privacy-policy",
    path: "/privacy-policy",
    component: () => import('./privacy-policy-4L8pKGpL.mjs')
  },
  {
    name: "user-agreement",
    path: "/user-agreement",
    component: () => import('./user-agreement-CY84enmM.mjs')
  },
  {
    name: "legal-information",
    path: "/legal-information",
    component: () => import('./legal-information-C7E504Uk.mjs')
  }
];
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index2) => comp.components && comp.components.default === from.matched[index2]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    status: result && (result.status || result.statusCode) || 404,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes2 = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes: routes2
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      if (to.matched.at(-1)?.components?.default === from.matched.at(-1)?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    const error = /* @__PURE__ */ useError();
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        const routeRules = getRouteRules({ path: to.path });
        if (routeRules.appMiddleware) {
          for (const key in routeRules.appMiddleware) {
            if (routeRules.appMiddleware[key]) {
              middlewareEntries.add(key);
            } else {
              middlewareEntries.delete(key);
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  status: 404,
                  statusText: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0 && !error.value) {
        return nuxtApp.runWithContext(() => showError(createError({
          status: 404,
          fatal: false,
          statusText: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || useNuxtApp();
  return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      const head = inject(headSymbol);
      if (!head) {
        throw new Error("[nuxt] [unhead] Missing Unhead instance.");
      }
      return head;
    }
  });
}
function useHead(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useHead$1(input, { head, ...options });
}
function useSeoMeta(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useSeoMeta$1(input, { head, ...options });
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const LazyIcon = defineAsyncComponent(() => Promise.resolve().then(() => index).then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["Icon", LazyIcon]
];
const components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const cfg0 = defineAppConfig({
  ui: {
    colors: {
      primary: "violet",
      neutral: "slate"
    }
  }
});
const inlineConfig = {
  "nuxt": {},
  "ui": {
    "colors": {
      "primary": "green",
      "secondary": "blue",
      "success": "green",
      "info": "blue",
      "warning": "yellow",
      "error": "red",
      "neutral": "slate"
    },
    "icons": {
      "arrowDown": "i-lucide-arrow-down",
      "arrowLeft": "i-lucide-arrow-left",
      "arrowRight": "i-lucide-arrow-right",
      "arrowUp": "i-lucide-arrow-up",
      "caution": "i-lucide-circle-alert",
      "check": "i-lucide-check",
      "chevronDoubleLeft": "i-lucide-chevrons-left",
      "chevronDoubleRight": "i-lucide-chevrons-right",
      "chevronDown": "i-lucide-chevron-down",
      "chevronLeft": "i-lucide-chevron-left",
      "chevronRight": "i-lucide-chevron-right",
      "chevronUp": "i-lucide-chevron-up",
      "close": "i-lucide-x",
      "copy": "i-lucide-copy",
      "copyCheck": "i-lucide-copy-check",
      "dark": "i-lucide-moon",
      "drag": "i-lucide-grip-vertical",
      "ellipsis": "i-lucide-ellipsis",
      "error": "i-lucide-circle-x",
      "external": "i-lucide-arrow-up-right",
      "eye": "i-lucide-eye",
      "eyeOff": "i-lucide-eye-off",
      "file": "i-lucide-file",
      "folder": "i-lucide-folder",
      "folderOpen": "i-lucide-folder-open",
      "hash": "i-lucide-hash",
      "info": "i-lucide-info",
      "light": "i-lucide-sun",
      "loading": "i-lucide-loader-circle",
      "menu": "i-lucide-menu",
      "minus": "i-lucide-minus",
      "panelClose": "i-lucide-panel-left-close",
      "panelOpen": "i-lucide-panel-left-open",
      "plus": "i-lucide-plus",
      "reload": "i-lucide-rotate-ccw",
      "search": "i-lucide-search",
      "stop": "i-lucide-square",
      "success": "i-lucide-circle-check",
      "system": "i-lucide-monitor",
      "tip": "i-lucide-lightbulb",
      "upload": "i-lucide-upload",
      "warning": "i-lucide-triangle-alert"
    },
    "tv": {
      "twMergeConfig": {}
    }
  },
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "cssLayer": "base",
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codex",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "cuida",
      "dashicons",
      "devicon",
      "devicon-plain",
      "dinkie-icons",
      "duo-icons",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fa7-brands",
      "fa7-regular",
      "fa7-solid",
      "fad",
      "famicons",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-color",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "garden",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "ix",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "lineicons",
      "logos",
      "ls",
      "lsicon",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-icon-theme",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "meteor-icons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "nrk",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "picon",
      "pixel",
      "pixelarticons",
      "prime",
      "proicons",
      "ps",
      "qlementine-icons",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "roentgen",
      "si",
      "si-glyph",
      "sidekickicons",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "stash",
      "streamline",
      "streamline-block",
      "streamline-color",
      "streamline-cyber",
      "streamline-cyber-color",
      "streamline-emojis",
      "streamline-flex",
      "streamline-flex-color",
      "streamline-freehand",
      "streamline-freehand-color",
      "streamline-kameleon-color",
      "streamline-logos",
      "streamline-pixel",
      "streamline-plump",
      "streamline-plump-color",
      "streamline-sharp",
      "streamline-sharp-color",
      "streamline-stickies-color",
      "streamline-ultimate",
      "streamline-ultimate-color",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "temaki",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  }
};
const appConfig = /* @__PURE__ */ defuFn(cfg0, inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  nuxtApp._appConfig ||= klona(appConfig);
  return nuxtApp._appConfig;
}
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
function getColor(color, shade) {
  if (color in colors && typeof colors[color] === "object" && shade in colors[color]) {
    return colors[color][shade];
  }
  return "";
}
function generateShades(key, value, prefix) {
  const prefixStr = prefix ? `${prefix}-` : "";
  return `${shades.map((shade) => `--ui-color-${key}-${shade}: var(--${prefixStr}color-${value === "neutral" ? "old-neutral" : value}-${shade}, ${getColor(value, shade)});`).join("\n  ")}`;
}
function generateColor(key, shade) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}
const colors_E7kSti5pGZ28QhUUurq6gGRU3l65WuXO_KJC3GQgzFo = /* @__PURE__ */ defineNuxtPlugin(() => {
  const appConfig2 = useAppConfig();
  useNuxtApp();
  const root = computed(() => {
    const { neutral, ...colors2 } = appConfig2.ui.colors;
    const prefix = appConfig2.ui.prefix;
    return `@layer theme {
  :root, :host {
  ${Object.entries(appConfig2.ui.colors).map(([key, value]) => generateShades(key, value, prefix)).join("\n  ")}
  }
  :root, :host, .light {
  ${Object.keys(colors2).map((key) => generateColor(key, 500)).join("\n  ")}
  }
  .dark {
  ${Object.keys(colors2).map((key) => generateColor(key, 400)).join("\n  ")}
  }
}`;
  });
  const headData = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: "nuxt-ui-colors"
    }]
  };
  useHead(headData);
});
const preference = "system";
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestFetch() {
  return useRequestEvent()?.$fetch || globalThis.$fetch;
}
const plugin_server_9Ca9_HhnjAGwBWpwAydRauMHxWoxTDY60BrArRnXN_A = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const colorMode = nuxtApp.ssrContext?.islandContext ? ref({}) : useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
const plugin_MeUvTuoKUi51yb_kBguab6hdcExVXeTtZtTg9TZZBB8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "@nuxt/icon",
  setup() {
    const configs = /* @__PURE__ */ useRuntimeConfig();
    const options = useAppConfig().icon;
    _api.setFetch($fetch.native);
    const resources = [];
    if (options.provider === "server") {
      const baseURL2 = configs.app?.baseURL?.replace(/\/$/, "") ?? "";
      resources.push(baseURL2 + (options.localApiEndpoint || "/api/_nuxt_icon"));
      if (options.fallbackToApi === true || options.fallbackToApi === "client-only") {
        resources.push(options.iconifyApiEndpoint);
      }
    } else if (options.provider === "none") {
      _api.setFetch(() => Promise.resolve(new Response()));
    } else {
      resources.push(options.iconifyApiEndpoint);
    }
    async function customIconLoader(icons, prefix) {
      try {
        const data = await $fetch(resources[0] + "/" + prefix + ".json", {
          query: {
            icons: icons.join(",")
          }
        });
        if (!data || data.prefix !== prefix || !data.icons)
          throw new Error("Invalid data" + JSON.stringify(data));
        return data;
      } catch (e) {
        console.error("Failed to load custom icons", e);
        return null;
      }
    }
    addAPIProvider("", { resources });
    for (const prefix of options.customCollections || []) {
      if (prefix)
        setCustomIconsLoader(customIconLoader, prefix);
    }
  }
  // For type portability
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});
const prerender_server_sqIxOBipVr4FbVMA9kqWL0wT8FPop6sKAXLVfifsJzk = /* @__PURE__ */ defineNuxtPlugin(async () => {
  {
    return;
  }
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8,
  colors_E7kSti5pGZ28QhUUurq6gGRU3l65WuXO_KJC3GQgzFo,
  plugin_server_9Ca9_HhnjAGwBWpwAydRauMHxWoxTDY60BrArRnXN_A,
  plugin_MeUvTuoKUi51yb_kBguab6hdcExVXeTtZtTg9TZZBB8,
  prerender_server_sqIxOBipVr4FbVMA9kqWL0wT8FPop6sKAXLVfifsJzk
];
function omit(data, keys) {
  const result = { ...data };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}
function get(object, path, defaultValue) {
  if (typeof path === "string") {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }
  let result = object;
  for (const key of path) {
    if (result === void 0 || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== void 0 ? result : defaultValue;
}
function mergeClasses(appConfigClass, propClass) {
  if (!appConfigClass && !propClass) {
    return "";
  }
  return [
    ...Array.isArray(appConfigClass) ? appConfigClass : [appConfigClass],
    propClass
  ].filter(Boolean);
}
function buildTranslator(locale) {
  return (path, option) => translate(path, option, unref(locale));
}
function translate(path, option, locale) {
  const prop = get(locale, `messages.${path}`, path);
  return prop.replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  );
}
function buildLocaleContext(locale) {
  const lang = computed(() => unref(locale).name);
  const code = computed(() => unref(locale).code);
  const dir = computed(() => unref(locale).dir);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    code,
    dir,
    locale: localeRef,
    t: buildTranslator(locale)
  };
}
// @__NO_SIDE_EFFECTS__
function defineLocale(options) {
  return defu(options, { dir: "ltr" });
}
const en = /* @__PURE__ */ defineLocale({
  name: "English",
  code: "en",
  messages: {
    alert: {
      close: "Close"
    },
    authForm: {
      hidePassword: "Hide password",
      showPassword: "Show password",
      submit: "Continue"
    },
    banner: {
      close: "Close"
    },
    calendar: {
      nextMonth: "Next month",
      nextYear: "Next year",
      prevMonth: "Previous month",
      prevYear: "Previous year"
    },
    carousel: {
      dots: "Choose slide to display",
      goto: "Go to slide {slide}",
      next: "Next",
      prev: "Prev"
    },
    chatPrompt: {
      placeholder: "Type your message here…"
    },
    chatPromptSubmit: {
      label: "Send prompt"
    },
    colorMode: {
      dark: "Dark",
      light: "Light",
      switchToDark: "Switch to dark mode",
      switchToLight: "Switch to light mode",
      system: "System"
    },
    commandPalette: {
      back: "Back",
      close: "Close",
      noData: "No data",
      noMatch: "No matching data",
      placeholder: "Type a command or search…"
    },
    contentSearch: {
      links: "Links",
      theme: "Theme"
    },
    contentSearchButton: {
      label: "Search…"
    },
    contentToc: {
      title: "On this page"
    },
    dashboardSearch: {
      theme: "Theme"
    },
    dashboardSearchButton: {
      label: "Search…"
    },
    dashboardSidebarCollapse: {
      collapse: "Collapse sidebar",
      expand: "Expand sidebar"
    },
    dashboardSidebarToggle: {
      close: "Close sidebar",
      open: "Open sidebar"
    },
    error: {
      clear: "Back to home"
    },
    fileUpload: {
      removeFile: "Remove {filename}"
    },
    header: {
      close: "Close menu",
      open: "Open menu"
    },
    inputMenu: {
      create: 'Create "{label}"',
      noData: "No data",
      noMatch: "No matching data"
    },
    inputNumber: {
      decrement: "Decrement",
      increment: "Increment"
    },
    modal: {
      close: "Close"
    },
    pricingTable: {
      caption: "Pricing plan comparison"
    },
    prose: {
      codeCollapse: {
        closeText: "Collapse",
        name: "code",
        openText: "Expand"
      },
      collapsible: {
        closeText: "Hide",
        name: "properties",
        openText: "Show"
      },
      pre: {
        copy: "Copy code to clipboard"
      }
    },
    selectMenu: {
      create: 'Create "{label}"',
      noData: "No data",
      noMatch: "No matching data",
      search: "Search…"
    },
    slideover: {
      close: "Close"
    },
    table: {
      noData: "No data"
    },
    toast: {
      close: "Close"
    }
  }
});
const localeContextInjectionKey = /* @__PURE__ */ Symbol.for("nuxt-ui.locale-context");
const _useLocale = (localeOverrides) => {
  const locale = localeOverrides || toRef(inject(localeContextInjectionKey, en));
  return buildLocaleContext(computed(() => locale.value || en));
};
const useLocale = _useLocale;
const portalTargetInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.portal-target");
function usePortal(portal) {
  const globalPortal = inject(portalTargetInjectionKey, void 0);
  const value = computed(() => portal.value === true ? globalPortal?.value : portal.value);
  const disabled = computed(() => typeof value.value === "boolean" ? !value.value : false);
  const to = computed(() => typeof value.value === "boolean" ? "body" : value.value);
  return computed(() => ({
    to: to.value,
    disabled: disabled.value
  }));
}
const [injectThemeContext, provideThemeContext] = createContext("UTheme", "RootContext");
function useComponentUI(name, props) {
  const { ui } = injectThemeContext({ ui: computed(() => ({})) });
  return computed(() => {
    const themeOverrides = get(ui.value, name) || {};
    return defu(props.ui ?? {}, themeOverrides);
  });
}
const toastMaxInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.toast-max");
function useToast() {
  const toasts = useState("toasts", () => []);
  const max = inject(toastMaxInjectionKey, void 0);
  const running = ref(false);
  const queue = [];
  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  async function processQueue() {
    if (running.value || queue.length === 0) {
      return;
    }
    running.value = true;
    while (queue.length > 0) {
      const toast = queue.shift();
      await nextTick();
      toasts.value = [...toasts.value, toast].slice(-(max?.value ?? 5));
    }
    running.value = false;
  }
  function add(toast) {
    const body = {
      id: generateId(),
      open: true,
      ...toast
    };
    const existingIndex = toasts.value.findIndex((t) => t.id === body.id);
    if (existingIndex !== -1) {
      toasts.value[existingIndex] = {
        ...toasts.value[existingIndex],
        ...body,
        _duplicate: (toasts.value[existingIndex]._duplicate || 0) + 1
      };
      return body;
    }
    queue.push(body);
    processQueue();
    return body;
  }
  function update(id, toast) {
    const index2 = toasts.value.findIndex((t) => t.id === id);
    if (index2 !== -1) {
      toasts.value[index2] = {
        ...toasts.value[index2],
        ...toast,
        duration: toast.duration,
        open: true,
        _updated: true
      };
      nextTick(() => {
        const i = toasts.value.findIndex((t) => t.id === id);
        if (i !== -1 && toasts.value[i]._updated) {
          toasts.value[i] = {
            ...toasts.value[i],
            _updated: void 0
          };
        }
      });
    }
  }
  function remove(id) {
    const index2 = toasts.value.findIndex((t) => t.id === id);
    if (index2 !== -1 && toasts.value[index2]._updated) {
      return;
    }
    if (index2 !== -1) {
      toasts.value[index2] = {
        ...toasts.value[index2],
        open: false
      };
    }
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, 200);
  }
  function clear() {
    toasts.value = [];
  }
  return {
    toasts,
    add,
    update,
    remove,
    clear
  };
}
const appConfigTv = appConfig;
const tv = /* @__PURE__ */ createTV(appConfigTv.ui?.tv);
async function loadIcon(name, timeout) {
  if (!name)
    return null;
  const _icon = getIcon(name);
  if (_icon)
    return _icon;
  let timeoutWarn;
  const load = loadIcon$1(name).catch(() => {
    console.warn(`[Icon] failed to load icon \`${name}\``);
    return null;
  });
  if (timeout > 0)
    await Promise.race([
      load,
      new Promise((resolve) => {
        timeoutWarn = setTimeout(() => {
          console.warn(`[Icon] loading icon \`${name}\` timed out after ${timeout}ms`);
          resolve();
        }, timeout);
      })
    ]).finally(() => clearTimeout(timeoutWarn));
  else
    await load;
  return getIcon(name);
}
function useResolvedName(getName) {
  const options = useAppConfig().icon;
  const collections = (options.collections || []).sort((a, b) => b.length - a.length);
  return computed(() => {
    const name = getName();
    const bare = name.startsWith(options.cssSelectorPrefix) ? name.slice(options.cssSelectorPrefix.length) : name;
    const resolved = options.aliases?.[bare] || bare;
    if (!resolved.includes(":")) {
      const collection = collections.find((c) => resolved.startsWith(c + "-"));
      return collection ? collection + ":" + resolved.slice(collection.length + 1) : resolved;
    }
    return resolved;
  });
}
function resolveCustomizeFn(customize, globalCustomize) {
  if (customize === false) return void 0;
  if (customize === true || customize === null) return globalCustomize;
  return customize;
}
const SYMBOL_SERVER_CSS = "NUXT_ICONS_SERVER_CSS";
function escapeCssSelector(selector) {
  return selector.replace(/([^\w-])/g, "\\$1");
}
const NuxtIconCss = /* @__PURE__ */ defineComponent({
  name: "NuxtIconCss",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props) {
    const nuxt = useNuxtApp();
    const options = useAppConfig().icon;
    const cssClass = computed(() => props.name ? options.cssSelectorPrefix + props.name : "");
    const selector = computed(() => "." + escapeCssSelector(cssClass.value));
    function getCSS(icon, withLayer = true) {
      let iconSelector = selector.value;
      if (options.cssWherePseudo) {
        iconSelector = `:where(${iconSelector})`;
      }
      const css = getIconCSS(icon, {
        iconSelector,
        format: "compressed",
        customise: resolveCustomizeFn(props.customize, options.customize)
      });
      if (options.cssLayer && withLayer) {
        return `@layer ${options.cssLayer} { ${css} }`;
      }
      return css;
    }
    onServerPrefetch(async () => {
      {
        const configs = (/* @__PURE__ */ useRuntimeConfig()).icon || {};
        if (!configs?.serverKnownCssClasses?.includes(cssClass.value)) {
          const icon = await loadIcon(props.name, options.fetchTimeout).catch(() => null);
          if (!icon)
            return null;
          let ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS];
          if (!ssrCSS) {
            ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS] = /* @__PURE__ */ new Map();
            nuxt.runWithContext(() => {
              useHead({
                style: [
                  () => {
                    const sep = "";
                    let css = Array.from(ssrCSS.values()).sort().join(sep);
                    if (options.cssLayer) {
                      css = `@layer ${options.cssLayer} {${sep}${css}${sep}}`;
                    }
                    return { innerHTML: css };
                  }
                ]
              }, {
                tagPriority: "low"
              });
            });
          }
          if (props.name && !ssrCSS.has(props.name)) {
            const css = getCSS(icon, false);
            ssrCSS.set(props.name, css);
          }
          return null;
        }
      }
    });
    return () => h("span", { class: ["iconify", cssClass.value] });
  }
});
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry2 = nuxtApp._asyncData[key.value];
      if (entry2?._abortController) {
        try {
          entry2._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry2._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
const NuxtIconSvg = /* @__PURE__ */ defineComponent({
  name: "NuxtIconSvg",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props, { slots }) {
    useNuxtApp();
    const options = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const storeKey = "i-" + name.value;
    if (name.value) {
      onServerPrefetch(async () => {
        {
          await useAsyncData(
            storeKey,
            async () => await loadIcon(name.value, options.fetchTimeout),
            { deep: false }
          );
        }
      });
    }
    return () => h(Icon, {
      icon: name.value,
      ssr: true,
      // Iconify uses `customise`, where we expose `customize` for consistency
      customise: resolveCustomizeFn(props.customize, options.customize)
    }, slots);
  }
});
const __nuxt_component_0$2 = defineComponent({
  name: "NuxtIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: [Number, String],
      required: false,
      default: null
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props, { slots }) {
    const nuxtApp = useNuxtApp();
    const runtimeOptions = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const component = computed(
      () => nuxtApp.vueApp?.component(name.value) || ((props.mode || runtimeOptions.mode) === "svg" ? NuxtIconSvg : NuxtIconCss)
    );
    const style = computed(() => {
      const size = props.size || runtimeOptions.size;
      return size ? { fontSize: Number.isNaN(+size) ? size : size + "px" } : null;
    });
    return () => h(
      component.value,
      {
        ...runtimeOptions.attrs,
        name: name.value,
        class: runtimeOptions.class,
        style: style.value,
        customize: props.customize
      },
      slots
    );
  }
});
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_0$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$r = {
  __name: "UIcon",
  __ssrInlineRender: true,
  props: {
    name: { type: null, required: true },
    mode: { type: String, required: false },
    size: { type: [String, Number], required: false },
    customize: { type: Function, required: false }
  },
  setup(__props) {
    const props = __props;
    const iconProps = useForwardProps(reactivePick(props, "name", "mode", "size", "customize"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      if (typeof __props.name === "string") {
        _push(ssrRenderComponent(_component_Icon, mergeProps(unref(iconProps), _attrs), null, _parent));
      } else {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.name), _attrs, null), _parent);
      }
    };
  }
};
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Icon.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const ImageComponent = "img";
const avatarGroupInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.avatar-group");
function useAvatarGroup(props) {
  const avatarGroup = inject(avatarGroupInjectionKey, void 0);
  const size = computed(() => props.size ?? avatarGroup?.value.size);
  provide(avatarGroupInjectionKey, computed(() => ({ size: size.value })));
  return {
    size
  };
}
const theme$8 = {
  "slots": {
    "root": "relative inline-flex items-center justify-center shrink-0",
    "base": "rounded-full ring ring-bg flex items-center justify-center text-inverted font-medium whitespace-nowrap"
  },
  "variants": {
    "color": {
      "primary": "bg-primary",
      "secondary": "bg-secondary",
      "success": "bg-success",
      "info": "bg-info",
      "warning": "bg-warning",
      "error": "bg-error",
      "neutral": "bg-inverted"
    },
    "size": {
      "3xs": "h-[4px] min-w-[4px] text-[4px]",
      "2xs": "h-[5px] min-w-[5px] text-[5px]",
      "xs": "h-[6px] min-w-[6px] text-[6px]",
      "sm": "h-[7px] min-w-[7px] text-[7px]",
      "md": "h-[8px] min-w-[8px] text-[8px]",
      "lg": "h-[9px] min-w-[9px] text-[9px]",
      "xl": "h-[10px] min-w-[10px] text-[10px]",
      "2xl": "h-[11px] min-w-[11px] text-[11px]",
      "3xl": "h-[12px] min-w-[12px] text-[12px]"
    },
    "position": {
      "top-right": "top-0 right-0",
      "bottom-right": "bottom-0 right-0",
      "top-left": "top-0 left-0",
      "bottom-left": "bottom-0 left-0"
    },
    "inset": {
      "false": ""
    },
    "standalone": {
      "false": "absolute"
    }
  },
  "compoundVariants": [
    {
      "position": "top-right",
      "inset": false,
      "class": "-translate-y-1/2 translate-x-1/2 transform"
    },
    {
      "position": "bottom-right",
      "inset": false,
      "class": "translate-y-1/2 translate-x-1/2 transform"
    },
    {
      "position": "top-left",
      "inset": false,
      "class": "-translate-y-1/2 -translate-x-1/2 transform"
    },
    {
      "position": "bottom-left",
      "inset": false,
      "class": "translate-y-1/2 -translate-x-1/2 transform"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "position": "top-right"
  }
};
const _sfc_main$q = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UChip",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    text: { type: [String, Number], required: false },
    color: { type: null, required: false },
    size: { type: null, required: false },
    position: { type: null, required: false },
    inset: { type: Boolean, required: false, default: false },
    standalone: { type: Boolean, required: false, default: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  }, {
    "show": { type: Boolean, ...{ default: true } },
    "showModifiers": {}
  }),
  emits: ["update:show"],
  setup(__props) {
    const props = __props;
    const show = useModel(__props, "show", { type: Boolean, ...{ default: true } });
    const { size } = useAvatarGroup(props);
    const appConfig2 = useAppConfig();
    const uiProp = useComponentUI("chip", props);
    const ui = computed(() => tv({ extend: tv(theme$8), ...appConfig2.ui?.chip || {} })({
      color: props.color,
      size: size.value,
      position: props.position,
      inset: props.inset,
      standalone: props.standalone
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Slot), _ctx.$attrs, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (show.value) {
              _push2(`<span data-slot="base" class="${ssrRenderClass(ui.value.base({ class: unref(uiProp)?.base }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "content", {}, () => {
                _push2(`${ssrInterpolate(__props.text)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Slot), _ctx.$attrs, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16),
              show.value ? (openBlock(), createBlock("span", {
                key: 0,
                "data-slot": "base",
                class: ui.value.base({ class: unref(uiProp)?.base })
              }, [
                renderSlot(_ctx.$slots, "content", {}, () => [
                  createTextVNode(toDisplayString(__props.text), 1)
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Chip.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const theme$7 = {
  "slots": {
    "root": "inline-flex items-center justify-center shrink-0 select-none rounded-full align-middle bg-elevated",
    "image": "h-full w-full rounded-[inherit] object-cover",
    "fallback": "font-medium leading-none text-muted truncate",
    "icon": "text-muted shrink-0"
  },
  "variants": {
    "size": {
      "3xs": {
        "root": "size-4 text-[8px]"
      },
      "2xs": {
        "root": "size-5 text-[10px]"
      },
      "xs": {
        "root": "size-6 text-xs"
      },
      "sm": {
        "root": "size-7 text-sm"
      },
      "md": {
        "root": "size-8 text-base"
      },
      "lg": {
        "root": "size-9 text-lg"
      },
      "xl": {
        "root": "size-10 text-xl"
      },
      "2xl": {
        "root": "size-11 text-[22px]"
      },
      "3xl": {
        "root": "size-12 text-2xl"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};
const _sfc_main$p = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UAvatar",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    src: { type: String, required: false },
    alt: { type: String, required: false },
    icon: { type: null, required: false },
    text: { type: String, required: false },
    size: { type: null, required: false },
    chip: { type: [Boolean, Object], required: false },
    class: { type: null, required: false },
    style: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const props = __props;
    const as = computed(() => {
      if (typeof props.as === "string" || typeof props.as?.render === "function") {
        return { root: props.as };
      }
      return defu(props.as, { root: "span" });
    });
    const fallback = computed(() => props.text || (props.alt || "").split(" ").map((word) => word.charAt(0)).join("").substring(0, 2));
    const appConfig2 = useAppConfig();
    const uiProp = useComponentUI("avatar", props);
    const { size } = useAvatarGroup(props);
    const ui = computed(() => tv({ extend: tv(theme$7), ...appConfig2.ui?.avatar || {} })({
      size: size.value
    }));
    const sizePx = computed(() => ({
      "3xs": 16,
      "2xs": 20,
      "xs": 24,
      "sm": 28,
      "md": 32,
      "lg": 36,
      "xl": 40,
      "2xl": 44,
      "3xl": 48
    })[props.size || "md"]);
    const error = ref(false);
    watch(() => props.src, () => {
      if (error.value) {
        error.value = false;
      }
    });
    function onError() {
      error.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(props.chip ? _sfc_main$q : unref(Primitive)), mergeProps({
        as: as.value.root
      }, props.chip ? typeof props.chip === "object" ? { inset: true, ...props.chip } : { inset: true } : {}, {
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] }),
        style: props.style
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.src && !error.value) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(as.value.img || unref(ImageComponent)), mergeProps({
                src: __props.src,
                alt: __props.alt,
                width: sizePx.value,
                height: sizePx.value
              }, _ctx.$attrs, {
                "data-slot": "image",
                class: ui.value.image({ class: unref(uiProp)?.image }),
                onError
              }), null), _parent2, _scopeId);
            } else {
              _push2(ssrRenderComponent(unref(Slot), _ctx.$attrs, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                      if (__props.icon) {
                        _push3(ssrRenderComponent(_sfc_main$r, {
                          name: __props.icon,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: unref(uiProp)?.icon })
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<span data-slot="fallback" class="${ssrRenderClass(ui.value.fallback({ class: unref(uiProp)?.fallback }))}"${_scopeId2}>${ssrInterpolate(fallback.value || " ")}</span>`);
                      }
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", {}, () => [
                        __props.icon ? (openBlock(), createBlock(_sfc_main$r, {
                          key: 0,
                          name: __props.icon,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: unref(uiProp)?.icon })
                        }, null, 8, ["name", "class"])) : (openBlock(), createBlock("span", {
                          key: 1,
                          "data-slot": "fallback",
                          class: ui.value.fallback({ class: unref(uiProp)?.fallback })
                        }, toDisplayString(fallback.value || " "), 3))
                      ])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            }
          } else {
            return [
              __props.src && !error.value ? (openBlock(), createBlock(resolveDynamicComponent(as.value.img || unref(ImageComponent)), mergeProps({
                key: 0,
                src: __props.src,
                alt: __props.alt,
                width: sizePx.value,
                height: sizePx.value
              }, _ctx.$attrs, {
                "data-slot": "image",
                class: ui.value.image({ class: unref(uiProp)?.image }),
                onError
              }), null, 16, ["src", "alt", "width", "height", "class"])) : (openBlock(), createBlock(unref(Slot), mergeProps({ key: 1 }, _ctx.$attrs), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    __props.icon ? (openBlock(), createBlock(_sfc_main$r, {
                      key: 0,
                      name: __props.icon,
                      "data-slot": "icon",
                      class: ui.value.icon({ class: unref(uiProp)?.icon })
                    }, null, 8, ["name", "class"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      "data-slot": "fallback",
                      class: ui.value.fallback({ class: unref(uiProp)?.fallback })
                    }, toDisplayString(fallback.value || " "), 3))
                  ])
                ]),
                _: 3
              }, 16))
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Avatar.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
function useComponentIcons(componentProps) {
  const appConfig2 = useAppConfig();
  const props = computed(() => toValue(componentProps));
  const isLeading = computed(() => props.value.icon && props.value.leading || props.value.icon && !props.value.trailing || props.value.loading && !props.value.trailing || !!props.value.leadingIcon);
  const isTrailing = computed(() => props.value.icon && props.value.trailing || props.value.loading && props.value.trailing || !!props.value.trailingIcon);
  const leadingIconName = computed(() => {
    if (props.value.loading) {
      return props.value.loadingIcon || appConfig2.ui.icons.loading;
    }
    return props.value.leadingIcon || props.value.icon;
  });
  const trailingIconName = computed(() => {
    if (props.value.loading && !isLeading.value) {
      return props.value.loadingIcon || appConfig2.ui.icons.loading;
    }
    return props.value.trailingIcon || props.value.icon;
  });
  return {
    isLeading,
    isTrailing,
    leadingIconName,
    trailingIconName
  };
}
const fieldGroupInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.field-group");
function useFieldGroup(props) {
  const fieldGroup = inject(fieldGroupInjectionKey, void 0);
  return {
    orientation: computed(() => fieldGroup?.value.orientation),
    size: computed(() => props?.size ?? fieldGroup?.value.size)
  };
}
const formLoadingInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.form-loading");
const linkKeys = [
  "active",
  "activeClass",
  "ariaCurrentValue",
  "as",
  "disabled",
  "download",
  "exact",
  "exactActiveClass",
  "exactHash",
  "exactQuery",
  "external",
  "form",
  "formaction",
  "formenctype",
  "formmethod",
  "formnovalidate",
  "formtarget",
  "href",
  "hreflang",
  "inactiveClass",
  "media",
  "noPrefetch",
  "noRel",
  "onClick",
  "ping",
  "prefetch",
  "prefetchOn",
  "prefetchedClass",
  "referrerpolicy",
  "rel",
  "replace",
  "target",
  "title",
  "to",
  "trailingSlash",
  "type",
  "viewTransition"
];
function pickLinkProps(link) {
  const keys = Object.keys(link);
  const ariaKeys = keys.filter((key) => key.startsWith("aria-"));
  const dataKeys = keys.filter((key) => key.startsWith("data-"));
  const propsToInclude = [
    ...linkKeys,
    ...ariaKeys,
    ...dataKeys
  ];
  return reactivePick(link, ...propsToInclude);
}
function isPartiallyEqual(item1, item2) {
  const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
    if (q.type === "added") {
      filtered.add(q.key);
    }
    return filtered;
  }, /* @__PURE__ */ new Set());
  const item1Filtered = Object.fromEntries(Object.entries(item1).filter(([key]) => !diffedKeys.has(key)));
  const item2Filtered = Object.fromEntries(Object.entries(item2).filter(([key]) => !diffedKeys.has(key)));
  return isEqual(item1Filtered, item2Filtered);
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, props.trailingSlash);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink?.({ ...props, to });
    const href = computed(() => {
      const effectiveTrailingSlash = props.trailingSlash ?? options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return applyTrailingSlashBehavior(href2, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return router.resolve(to.value)?.href ?? null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
      route: link?.route ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      const router = useRouter();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      shallowRef(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", {
          ref: el,
          href: href.value || null,
          // converts `""` to `null` to prevent the attribute from being added as empty (`href=""`)
          rel,
          target,
          onClick: async (event) => {
            if (isExternal.value || hasTarget.value) {
              return;
            }
            event.preventDefault();
            try {
              const encodedHref = encodeRoutePath(href.value);
              return await (props.replace ? router.replace(encodedHref) : router.push(encodedHref));
            } finally {
            }
          }
        }, slots.default?.());
      };
    }
  });
}
const __nuxt_component_0$1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const _sfc_main$o = {
  __name: "ULinkBase",
  __ssrInlineRender: true,
  props: {
    as: { type: String, required: false, default: "button" },
    type: { type: String, required: false, default: "button" },
    disabled: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    href: { type: String, required: false },
    navigate: { type: Function, required: false },
    target: { type: [String, Object, null], required: false },
    rel: { type: [String, Object, null], required: false },
    active: { type: Boolean, required: false },
    isExternal: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    function onClickWrapper(e) {
      if (props.disabled) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      if (props.onClick) {
        for (const onClick of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
          onClick(e);
        }
      }
      if (props.href && props.navigate && !props.isExternal) {
        props.navigate(e);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps(__props.href ? {
        "as": "a",
        "href": __props.disabled ? void 0 : __props.href,
        "aria-disabled": __props.disabled ? "true" : void 0,
        "role": __props.disabled ? "link" : void 0,
        "tabindex": __props.disabled ? -1 : void 0
      } : __props.as === "button" ? {
        as: __props.as,
        type: __props.type,
        disabled: __props.disabled
      } : {
        as: __props.as
      }, {
        rel: __props.rel,
        target: __props.target,
        onClick: onClickWrapper
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/LinkBase.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const theme$6 = {
  "base": "focus-visible:outline-primary",
  "variants": {
    "active": {
      "true": "text-primary",
      "false": "text-muted"
    },
    "disabled": {
      "true": "cursor-not-allowed opacity-75"
    }
  },
  "compoundVariants": [
    {
      "active": false,
      "disabled": false,
      "class": [
        "hover:text-default",
        "transition-colors"
      ]
    }
  ]
};
const _sfc_main$n = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "ULink",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "button" },
    type: { type: null, required: false, default: "button" },
    disabled: { type: Boolean, required: false },
    active: { type: Boolean, required: false, default: void 0 },
    exact: { type: Boolean, required: false },
    exactQuery: { type: [Boolean, String], required: false },
    exactHash: { type: Boolean, required: false },
    inactiveClass: { type: String, required: false },
    custom: { type: Boolean, required: false },
    raw: { type: Boolean, required: false },
    class: { type: null, required: false },
    to: { type: null, required: false },
    href: { type: null, required: false },
    external: { type: Boolean, required: false },
    target: { type: [String, Object, null], required: false },
    rel: { type: [String, Object, null], required: false },
    noRel: { type: Boolean, required: false },
    prefetchedClass: { type: String, required: false },
    prefetch: { type: Boolean, required: false },
    prefetchOn: { type: [String, Object], required: false },
    noPrefetch: { type: Boolean, required: false },
    trailingSlash: { type: String, required: false },
    activeClass: { type: String, required: false },
    exactActiveClass: { type: String, required: false },
    ariaCurrentValue: { type: String, required: false, default: "page" },
    viewTransition: { type: Boolean, required: false },
    replace: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const appConfig2 = useAppConfig();
    const nuxtLinkProps = useForwardProps(reactiveOmit(props, "as", "type", "disabled", "active", "exact", "exactQuery", "exactHash", "activeClass", "inactiveClass", "to", "href", "raw", "custom", "class"));
    const ui = computed(() => tv({
      extend: tv(theme$6),
      ...defu({
        variants: {
          active: {
            true: mergeClasses(appConfig2.ui?.link?.variants?.active?.true, props.activeClass),
            false: mergeClasses(appConfig2.ui?.link?.variants?.active?.false, props.inactiveClass)
          }
        }
      }, appConfig2.ui?.link || {})
    }));
    const to = computed(() => props.to ?? props.href);
    function isLinkActive({ route: linkRoute, isActive, isExactActive }) {
      if (props.active !== void 0) {
        return props.active;
      }
      if (props.exactQuery === "partial") {
        if (!isPartiallyEqual(linkRoute.query, route.query)) return false;
      } else if (props.exactQuery === true) {
        if (!isEqual(linkRoute.query, route.query)) return false;
      }
      if (props.exactHash && linkRoute.hash !== route.hash) {
        return false;
      }
      if (props.exact && isExactActive) {
        return true;
      }
      if (!props.exact && isActive) {
        return true;
      }
      return false;
    }
    function resolveLinkClass({ route: route2, isActive, isExactActive }) {
      const active = isLinkActive({ route: route2, isActive, isExactActive });
      if (props.raw) {
        return [props.class, active ? props.activeClass : props.inactiveClass];
      }
      return ui.value({ class: props.class, active, disabled: props.disabled });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps(unref(nuxtLinkProps), {
        to: to.value,
        custom: ""
      }, _attrs), {
        default: withCtx(({ href, navigate, route: linkRoute, isActive, isExactActive, ...rest }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.custom) {
              ssrRenderSlot(_ctx.$slots, "default", {
                ..._ctx.$attrs,
                ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: __props.as,
                type: __props.type,
                disabled: __props.disabled,
                href,
                navigate,
                rel: rest.rel,
                target: rest.target,
                isExternal: rest.isExternal,
                active: isLinkActive({ route: linkRoute, isActive, isExactActive })
              }, null, _push2, _parent2, _scopeId);
            } else {
              _push2(ssrRenderComponent(_sfc_main$o, mergeProps({
                ..._ctx.$attrs,
                ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: __props.as,
                type: __props.type,
                disabled: __props.disabled,
                href,
                navigate,
                rel: rest.rel,
                target: rest.target,
                isExternal: rest.isExternal
              }, {
                class: resolveLinkClass({ route: linkRoute, isActive, isExactActive })
              }), {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", {
                      active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                    }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", {
                        active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            }
          } else {
            return [
              __props.custom ? renderSlot(_ctx.$slots, "default", mergeProps({ key: 0 }, {
                ..._ctx.$attrs,
                ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: __props.as,
                type: __props.type,
                disabled: __props.disabled,
                href,
                navigate,
                rel: rest.rel,
                target: rest.target,
                isExternal: rest.isExternal,
                active: isLinkActive({ route: linkRoute, isActive, isExactActive })
              })) : (openBlock(), createBlock(_sfc_main$o, mergeProps({ key: 1 }, {
                ..._ctx.$attrs,
                ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: __props.as,
                type: __props.type,
                disabled: __props.disabled,
                href,
                navigate,
                rel: rest.rel,
                target: rest.target,
                isExternal: rest.isExternal
              }, {
                class: resolveLinkClass({ route: linkRoute, isActive, isExactActive })
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {
                    active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                  })
                ]),
                _: 2
              }, 1040, ["class"]))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Link.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const theme$5 = {
  "slots": {
    "base": [
      "rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
      "transition-colors"
    ],
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": "",
      "ghost": "",
      "link": ""
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "block": {
      "true": {
        "base": "w-full justify-center",
        "trailingIcon": "ms-auto"
      }
    },
    "square": {
      "true": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "active": {
      "true": {
        "base": ""
      },
      "false": {
        "base": ""
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "text-inverted bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "text-inverted bg-secondary hover:bg-secondary/75 active:bg-secondary/75 disabled:bg-secondary aria-disabled:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "text-inverted bg-success hover:bg-success/75 active:bg-success/75 disabled:bg-success aria-disabled:bg-success focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "text-inverted bg-info hover:bg-info/75 active:bg-info/75 disabled:bg-info aria-disabled:bg-info focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "text-inverted bg-warning hover:bg-warning/75 active:bg-warning/75 disabled:bg-warning aria-disabled:bg-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "text-inverted bg-error hover:bg-error/75 active:bg-error/75 disabled:bg-error aria-disabled:bg-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "ring ring-inset ring-primary/50 text-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "ring ring-inset ring-secondary/50 text-secondary hover:bg-secondary/10 active:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "ring ring-inset ring-success/50 text-success hover:bg-success/10 active:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "ring ring-inset ring-info/50 text-info hover:bg-info/10 active:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "ring ring-inset ring-warning/50 text-warning hover:bg-warning/10 active:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "ring ring-inset ring-error/50 text-error hover:bg-error/10 active:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "text-secondary bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 focus:outline-none focus-visible:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "text-success bg-success/10 hover:bg-success/15 active:bg-success/15 focus:outline-none focus-visible:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "text-info bg-info/10 hover:bg-info/15 active:bg-info/15 focus:outline-none focus-visible:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "text-warning bg-warning/10 hover:bg-warning/15 active:bg-warning/15 focus:outline-none focus-visible:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "text-error bg-error/10 hover:bg-error/15 active:bg-error/15 focus:outline-none focus-visible:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 active:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "text-success ring ring-inset ring-success/25 bg-success/10 hover:bg-success/15 active:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "text-info ring ring-inset ring-info/25 bg-info/10 hover:bg-info/15 active:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "text-warning ring ring-inset ring-warning/25 bg-warning/10 hover:bg-warning/15 active:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "text-error ring ring-inset ring-error/25 bg-error/10 hover:bg-error/15 active:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": "ghost",
      "class": "text-primary hover:bg-primary/10 active:bg-primary/10 focus:outline-none focus-visible:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "secondary",
      "variant": "ghost",
      "class": "text-secondary hover:bg-secondary/10 active:bg-secondary/10 focus:outline-none focus-visible:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "success",
      "variant": "ghost",
      "class": "text-success hover:bg-success/10 active:bg-success/10 focus:outline-none focus-visible:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "info",
      "variant": "ghost",
      "class": "text-info hover:bg-info/10 active:bg-info/10 focus:outline-none focus-visible:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "warning",
      "variant": "ghost",
      "class": "text-warning hover:bg-warning/10 active:bg-warning/10 focus:outline-none focus-visible:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "error",
      "variant": "ghost",
      "class": "text-error hover:bg-error/10 active:bg-error/10 focus:outline-none focus-visible:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "primary",
      "variant": "link",
      "class": "text-primary hover:text-primary/75 active:text-primary/75 disabled:text-primary aria-disabled:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": "text-secondary hover:text-secondary/75 active:text-secondary/75 disabled:text-secondary aria-disabled:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": "link",
      "class": "text-success hover:text-success/75 active:text-success/75 disabled:text-success aria-disabled:text-success focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": "link",
      "class": "text-info hover:text-info/75 active:text-info/75 disabled:text-info aria-disabled:text-info focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": "link",
      "class": "text-warning hover:text-warning/75 active:text-warning/75 disabled:text-warning aria-disabled:text-warning focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": "link",
      "class": "text-error hover:text-error/75 active:text-error/75 disabled:text-error aria-disabled:text-error focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted hover:bg-inverted/90 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default hover:bg-elevated active:bg-elevated disabled:bg-default aria-disabled:bg-default focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 focus:outline-none focus-visible:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": "ghost",
      "class": "text-default hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent"
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": "text-muted hover:text-default active:text-default disabled:text-muted aria-disabled:text-muted focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-2"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-2"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};
const _sfc_main$m = {
  __name: "UButton",
  __ssrInlineRender: true,
  props: {
    label: { type: String, required: false },
    color: { type: null, required: false },
    activeColor: { type: null, required: false },
    variant: { type: null, required: false },
    activeVariant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    block: { type: Boolean, required: false },
    loadingAuto: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    as: { type: null, required: false },
    type: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    active: { type: Boolean, required: false },
    exact: { type: Boolean, required: false },
    exactQuery: { type: [Boolean, String], required: false },
    exactHash: { type: Boolean, required: false },
    inactiveClass: { type: String, required: false },
    to: { type: null, required: false },
    href: { type: null, required: false },
    external: { type: Boolean, required: false },
    target: { type: [String, Object, null], required: false },
    rel: { type: [String, Object, null], required: false },
    noRel: { type: Boolean, required: false },
    prefetchedClass: { type: String, required: false },
    prefetch: { type: Boolean, required: false },
    prefetchOn: { type: [String, Object], required: false },
    noPrefetch: { type: Boolean, required: false },
    trailingSlash: { type: String, required: false },
    activeClass: { type: String, required: false },
    exactActiveClass: { type: String, required: false },
    ariaCurrentValue: { type: String, required: false },
    viewTransition: { type: Boolean, required: false },
    replace: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig2 = useAppConfig();
    const uiProp = useComponentUI("button", props);
    const { orientation, size: buttonSize } = useFieldGroup(props);
    const linkProps = useForwardProps(pickLinkProps(props));
    const loadingAutoState = ref(false);
    const formLoading = inject(formLoadingInjectionKey, void 0);
    async function onClickWrapper(event) {
      loadingAutoState.value = true;
      const callbacks = Array.isArray(props.onClick) ? props.onClick : [props.onClick];
      try {
        await Promise.all(callbacks.map((fn) => fn?.(event)));
      } finally {
        loadingAutoState.value = false;
      }
    }
    const isLoading = computed(() => {
      return props.loading || props.loadingAuto && (loadingAutoState.value || formLoading?.value && props.type === "submit");
    });
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(
      computed(() => ({ ...props, loading: isLoading.value }))
    );
    const ui = computed(() => tv({
      extend: tv(theme$5),
      ...defu({
        variants: {
          active: {
            true: {
              base: mergeClasses(appConfig2.ui?.button?.variants?.active?.true?.base, props.activeClass)
            },
            false: {
              base: mergeClasses(appConfig2.ui?.button?.variants?.active?.false?.base, props.inactiveClass)
            }
          }
        }
      }, appConfig2.ui?.button || {})
    })({
      color: props.color,
      variant: props.variant,
      size: buttonSize.value,
      loading: isLoading.value,
      block: props.block,
      square: props.square || !slots.default && !props.label,
      leading: isLeading.value,
      trailing: isTrailing.value,
      fieldGroup: orientation.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$n, mergeProps({
        type: __props.type,
        disabled: __props.disabled || isLoading.value
      }, unref(omit)(unref(linkProps), ["type", "disabled", "onClick"]), { custom: "" }, _attrs), {
        default: withCtx(({ active, ...slotProps }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$o, mergeProps(slotProps, {
              "data-slot": "base",
              class: ui.value.base({
                class: [unref(uiProp)?.base, props.class],
                active,
                ...active && __props.activeVariant ? { variant: __props.activeVariant } : {},
                ...active && __props.activeColor ? { color: __props.activeColor } : {}
              }),
              onClick: onClickWrapper
            }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
                    if (unref(isLeading) && unref(leadingIconName)) {
                      _push3(ssrRenderComponent(_sfc_main$r, {
                        name: unref(leadingIconName),
                        "data-slot": "leadingIcon",
                        class: ui.value.leadingIcon({ class: unref(uiProp)?.leadingIcon, active })
                      }, null, _parent3, _scopeId2));
                    } else if (!!__props.avatar) {
                      _push3(ssrRenderComponent(_sfc_main$p, mergeProps({
                        size: unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                      }, __props.avatar, {
                        "data-slot": "leadingAvatar",
                        class: ui.value.leadingAvatar({ class: unref(uiProp)?.leadingAvatar, active })
                      }), null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                  ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, () => {
                    if (__props.label !== void 0 && __props.label !== null) {
                      _push3(`<span data-slot="label" class="${ssrRenderClass(ui.value.label({ class: unref(uiProp)?.label, active }))}"${_scopeId2}>${ssrInterpolate(__props.label)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                  ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
                    if (unref(isTrailing) && unref(trailingIconName)) {
                      _push3(ssrRenderComponent(_sfc_main$r, {
                        name: unref(trailingIconName),
                        "data-slot": "trailingIcon",
                        class: ui.value.trailingIcon({ class: unref(uiProp)?.trailingIcon, active })
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                      unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$r, {
                        key: 0,
                        name: unref(leadingIconName),
                        "data-slot": "leadingIcon",
                        class: ui.value.leadingIcon({ class: unref(uiProp)?.leadingIcon, active })
                      }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$p, mergeProps({
                        key: 1,
                        size: unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                      }, __props.avatar, {
                        "data-slot": "leadingAvatar",
                        class: ui.value.leadingAvatar({ class: unref(uiProp)?.leadingAvatar, active })
                      }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                    ]),
                    renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [
                      __props.label !== void 0 && __props.label !== null ? (openBlock(), createBlock("span", {
                        key: 0,
                        "data-slot": "label",
                        class: ui.value.label({ class: unref(uiProp)?.label, active })
                      }, toDisplayString(__props.label), 3)) : createCommentVNode("", true)
                    ]),
                    renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                      unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$r, {
                        key: 0,
                        name: unref(trailingIconName),
                        "data-slot": "trailingIcon",
                        class: ui.value.trailingIcon({ class: unref(uiProp)?.trailingIcon, active })
                      }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$o, mergeProps(slotProps, {
                "data-slot": "base",
                class: ui.value.base({
                  class: [unref(uiProp)?.base, props.class],
                  active,
                  ...active && __props.activeVariant ? { variant: __props.activeVariant } : {},
                  ...active && __props.activeColor ? { color: __props.activeColor } : {}
                }),
                onClick: onClickWrapper
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                    unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$r, {
                      key: 0,
                      name: unref(leadingIconName),
                      "data-slot": "leadingIcon",
                      class: ui.value.leadingIcon({ class: unref(uiProp)?.leadingIcon, active })
                    }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$p, mergeProps({
                      key: 1,
                      size: unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                    }, __props.avatar, {
                      "data-slot": "leadingAvatar",
                      class: ui.value.leadingAvatar({ class: unref(uiProp)?.leadingAvatar, active })
                    }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                  ]),
                  renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [
                    __props.label !== void 0 && __props.label !== null ? (openBlock(), createBlock("span", {
                      key: 0,
                      "data-slot": "label",
                      class: ui.value.label({ class: unref(uiProp)?.label, active })
                    }, toDisplayString(__props.label), 3)) : createCommentVNode("", true)
                  ]),
                  renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                    unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$r, {
                      key: 0,
                      name: unref(trailingIconName),
                      "data-slot": "trailingIcon",
                      class: ui.value.trailingIcon({ class: unref(uiProp)?.trailingIcon, active })
                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                  ])
                ]),
                _: 2
              }, 1040, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Button.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const theme$4 = {
  "slots": {
    "root": "gap-2",
    "base": "relative overflow-hidden rounded-full bg-accented",
    "indicator": "rounded-full size-full transition-transform duration-200 ease-out",
    "status": "flex text-dimmed transition-[width] duration-200",
    "steps": "grid items-end",
    "step": "truncate text-end row-start-1 col-start-1 transition-opacity"
  },
  "variants": {
    "animation": {
      "carousel": "",
      "carousel-inverse": "",
      "swing": "",
      "elastic": ""
    },
    "color": {
      "primary": {
        "indicator": "bg-primary",
        "steps": "text-primary"
      },
      "secondary": {
        "indicator": "bg-secondary",
        "steps": "text-secondary"
      },
      "success": {
        "indicator": "bg-success",
        "steps": "text-success"
      },
      "info": {
        "indicator": "bg-info",
        "steps": "text-info"
      },
      "warning": {
        "indicator": "bg-warning",
        "steps": "text-warning"
      },
      "error": {
        "indicator": "bg-error",
        "steps": "text-error"
      },
      "neutral": {
        "indicator": "bg-inverted",
        "steps": "text-inverted"
      }
    },
    "size": {
      "2xs": {
        "status": "text-xs",
        "steps": "text-xs"
      },
      "xs": {
        "status": "text-xs",
        "steps": "text-xs"
      },
      "sm": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "md": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "lg": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "xl": {
        "status": "text-base",
        "steps": "text-base"
      },
      "2xl": {
        "status": "text-base",
        "steps": "text-base"
      }
    },
    "step": {
      "active": {
        "step": "opacity-100"
      },
      "first": {
        "step": "opacity-100 text-muted"
      },
      "other": {
        "step": "opacity-0"
      },
      "last": {
        "step": ""
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex flex-col",
        "base": "w-full",
        "status": "flex-row items-center justify-end min-w-fit"
      },
      "vertical": {
        "root": "h-full flex flex-row-reverse",
        "base": "h-full",
        "status": "flex-col justify-end min-h-fit"
      }
    },
    "inverted": {
      "true": {
        "status": "self-end"
      }
    }
  },
  "compoundVariants": [
    {
      "inverted": true,
      "orientation": "horizontal",
      "class": {
        "step": "text-start",
        "status": "flex-row-reverse"
      }
    },
    {
      "inverted": true,
      "orientation": "vertical",
      "class": {
        "steps": "items-start",
        "status": "flex-col-reverse"
      }
    },
    {
      "orientation": "horizontal",
      "size": "2xs",
      "class": "h-px"
    },
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": "h-0.5"
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": "h-1"
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": "h-2"
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": "h-3"
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": "h-4"
    },
    {
      "orientation": "horizontal",
      "size": "2xl",
      "class": "h-5"
    },
    {
      "orientation": "vertical",
      "size": "2xs",
      "class": "w-px"
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": "w-0.5"
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": "w-1"
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": "w-2"
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": "w-3"
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": "w-4"
    },
    {
      "orientation": "vertical",
      "size": "2xl",
      "class": "w-5"
    },
    {
      "orientation": "horizontal",
      "animation": "carousel",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "carousel",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "carousel-inverse",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-inverse_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "carousel-inverse",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-inverse-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "swing",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[swing_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "swing",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[swing-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "elastic",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[elastic_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "elastic",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[elastic-vertical_2s_ease-in-out_infinite]"
      }
    }
  ],
  "defaultVariants": {
    "animation": "carousel",
    "color": "primary",
    "size": "md"
  }
};
const _sfc_main$l = {
  __name: "UProgress",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    max: { type: [Number, Array], required: false },
    status: { type: Boolean, required: false },
    inverted: { type: Boolean, required: false, default: false },
    size: { type: null, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    animation: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    getValueLabel: { type: Function, required: false },
    getValueText: { type: Function, required: false },
    modelValue: { type: [Number, null], required: false, default: null }
  },
  emits: ["update:modelValue", "update:max"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { dir } = useLocale();
    const appConfig2 = useAppConfig();
    const uiProp = useComponentUI("progress", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "getValueLabel", "getValueText", "modelValue"), emits);
    const isIndeterminate = computed(() => rootProps.value.modelValue === null);
    const hasSteps = computed(() => Array.isArray(props.max));
    const realMax = computed(() => {
      if (isIndeterminate.value || !props.max) {
        return void 0;
      }
      if (Array.isArray(props.max)) {
        return props.max.length - 1;
      }
      return Number(props.max);
    });
    const percent = computed(() => {
      if (isIndeterminate.value) {
        return void 0;
      }
      switch (true) {
        case rootProps.value.modelValue < 0:
          return 0;
        case rootProps.value.modelValue > (realMax.value ?? 100):
          return 100;
        default:
          return Math.round(rootProps.value.modelValue / (realMax.value ?? 100) * 100);
      }
    });
    const indicatorStyle = computed(() => {
      if (percent.value === void 0) {
        return;
      }
      if (props.orientation === "vertical") {
        return {
          transform: `translateY(${props.inverted ? "" : "-"}${100 - percent.value}%)`
        };
      } else {
        if (dir.value === "rtl") {
          return {
            transform: `translateX(${props.inverted ? "-" : ""}${100 - percent.value}%)`
          };
        } else {
          return {
            transform: `translateX(${props.inverted ? "" : "-"}${100 - percent.value}%)`
          };
        }
      }
    });
    const statusStyle = computed(() => {
      const value = `${Math.max(percent.value ?? 0, 0)}%`;
      return props.orientation === "vertical" ? { height: value } : { width: value };
    });
    function isActive(index2) {
      return index2 === Number(props.modelValue);
    }
    function isFirst(index2) {
      return index2 === 0;
    }
    function isLast(index2) {
      return index2 === realMax.value;
    }
    function stepVariant(index2) {
      index2 = Number(index2);
      if (isActive(index2) && !isFirst(index2)) {
        return "active";
      }
      if (isFirst(index2) && isActive(index2)) {
        return "first";
      }
      if (isLast(index2) && isActive(index2)) {
        return "last";
      }
      return "other";
    }
    const ui = computed(() => tv({ extend: tv(theme$4), ...appConfig2.ui?.progress || {} })({
      animation: props.animation,
      size: props.size,
      color: props.color,
      orientation: props.orientation,
      inverted: props.inverted
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-orientation": __props.orientation,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!isIndeterminate.value && (__props.status || !!slots.status)) {
              _push2(`<div data-slot="status" class="${ssrRenderClass(ui.value.status({ class: unref(uiProp)?.status }))}" style="${ssrRenderStyle(statusStyle.value)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "status", { percent: percent.value }, () => {
                _push2(`${ssrInterpolate(percent.value)}% `);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(ProgressRoot), mergeProps(unref(rootProps), {
              max: realMax.value,
              "data-slot": "base",
              class: ui.value.base({ class: unref(uiProp)?.base }),
              style: { "transform": "translateZ(0)" }
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ProgressIndicator), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: unref(uiProp)?.indicator }),
                    style: indicatorStyle.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ProgressIndicator), {
                      "data-slot": "indicator",
                      class: ui.value.indicator({ class: unref(uiProp)?.indicator }),
                      style: indicatorStyle.value
                    }, null, 8, ["class", "style"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (hasSteps.value) {
              _push2(`<div data-slot="steps" class="${ssrRenderClass(ui.value.steps({ class: unref(uiProp)?.steps }))}"${_scopeId}><!--[-->`);
              ssrRenderList(__props.max, (step, index2) => {
                _push2(`<div data-slot="step" class="${ssrRenderClass(ui.value.step({ class: unref(uiProp)?.step, step: stepVariant(index2) }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, `step-${index2}`, { step }, () => {
                  _push2(`${ssrInterpolate(step)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !isIndeterminate.value && (__props.status || !!slots.status) ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "status",
                class: ui.value.status({ class: unref(uiProp)?.status }),
                style: statusStyle.value
              }, [
                renderSlot(_ctx.$slots, "status", { percent: percent.value }, () => [
                  createTextVNode(toDisplayString(percent.value) + "% ", 1)
                ])
              ], 6)) : createCommentVNode("", true),
              createVNode(unref(ProgressRoot), mergeProps(unref(rootProps), {
                max: realMax.value,
                "data-slot": "base",
                class: ui.value.base({ class: unref(uiProp)?.base }),
                style: { "transform": "translateZ(0)" }
              }), {
                default: withCtx(() => [
                  createVNode(unref(ProgressIndicator), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: unref(uiProp)?.indicator }),
                    style: indicatorStyle.value
                  }, null, 8, ["class", "style"])
                ]),
                _: 1
              }, 16, ["max", "class"]),
              hasSteps.value ? (openBlock(), createBlock("div", {
                key: 1,
                "data-slot": "steps",
                class: ui.value.steps({ class: unref(uiProp)?.steps })
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.max, (step, index2) => {
                  return openBlock(), createBlock("div", {
                    key: index2,
                    "data-slot": "step",
                    class: ui.value.step({ class: unref(uiProp)?.step, step: stepVariant(index2) })
                  }, [
                    renderSlot(_ctx.$slots, `step-${index2}`, { step }, () => [
                      createTextVNode(toDisplayString(step), 1)
                    ])
                  ], 2);
                }), 128))
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Progress.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const theme$3 = {
  "slots": {
    "root": "relative group overflow-hidden bg-default shadow-lg rounded-lg ring ring-default p-4 flex gap-2.5 focus:outline-none",
    "wrapper": "w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium text-highlighted",
    "description": "text-sm text-muted",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex gap-1.5 shrink-0",
    "progress": "absolute inset-x-0 bottom-0",
    "close": "p-0"
  },
  "variants": {
    "color": {
      "primary": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
        "icon": "text-primary"
      },
      "secondary": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary",
        "icon": "text-secondary"
      },
      "success": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success",
        "icon": "text-success"
      },
      "info": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info",
        "icon": "text-info"
      },
      "warning": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning",
        "icon": "text-warning"
      },
      "error": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error",
        "icon": "text-error"
      },
      "neutral": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted",
        "icon": "text-highlighted"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "items-center",
        "actions": "items-center"
      },
      "vertical": {
        "root": "items-start",
        "actions": "items-start mt-2.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  },
  "defaultVariants": {
    "color": "primary"
  }
};
const _sfc_main$k = {
  __name: "UToast",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    title: { type: [String, Object, Function], required: false },
    description: { type: [String, Object, Function], required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "vertical" },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: null, required: false },
    actions: { type: Array, required: false },
    progress: { type: [Boolean, Object], required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    type: { type: String, required: false },
    duration: { type: Number, required: false }
  },
  emits: ["escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd", "update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig2 = useAppConfig();
    const uiProp = useComponentUI("toast", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "defaultOpen", "open", "duration", "type"), emits);
    const ui = computed(() => tv({ extend: tv(theme$3), ...appConfig2.ui?.toast || {} })({
      color: props.color,
      orientation: props.orientation,
      title: !!props.title || !!slots.title
    }));
    const rootRef = useTemplateRef("rootRef");
    const height = ref(0);
    __expose({
      height
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ToastRoot), mergeProps({
        ref_key: "rootRef",
        ref: rootRef
      }, unref(rootProps), {
        "data-orientation": __props.orientation,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] }),
        style: { "--height": height.value }
      }, _attrs), {
        default: withCtx(({ remaining, duration, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
              if (__props.avatar) {
                _push2(ssrRenderComponent(_sfc_main$p, mergeProps({
                  size: unref(uiProp)?.avatarSize || ui.value.avatarSize()
                }, __props.avatar, {
                  "data-slot": "avatar",
                  class: ui.value.avatar({ class: unref(uiProp)?.avatar })
                }), null, _parent2, _scopeId));
              } else if (__props.icon) {
                _push2(ssrRenderComponent(_sfc_main$r, {
                  name: __props.icon,
                  "data-slot": "icon",
                  class: ui.value.icon({ class: unref(uiProp)?.icon })
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            _push2(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(uiProp)?.wrapper }))}"${_scopeId}>`);
            if (__props.title || !!slots.title) {
              _push2(ssrRenderComponent(unref(ToastTitle), {
                "data-slot": "title",
                class: ui.value.title({ class: unref(uiProp)?.title })
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                      if (typeof __props.title === "function") {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.title()), null, null), _parent3, _scopeId2);
                      } else if (typeof __props.title === "object") {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.title), null, null), _parent3, _scopeId2);
                      } else {
                        _push3(`<!--[-->${ssrInterpolate(__props.title)}<!--]-->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "title", {}, () => [
                        typeof __props.title === "function" ? (openBlock(), createBlock(resolveDynamicComponent(__props.title()), { key: 0 })) : typeof __props.title === "object" ? (openBlock(), createBlock(resolveDynamicComponent(__props.title), { key: 1 })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                          createTextVNode(toDisplayString(__props.title), 1)
                        ], 64))
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.description || !!slots.description) {
              _push2(ssrRenderComponent(unref(ToastDescription), {
                "data-slot": "description",
                class: ui.value.description({ class: unref(uiProp)?.description })
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                      if (typeof __props.description === "function") {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.description()), null, null), _parent3, _scopeId2);
                      } else if (typeof __props.description === "object") {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.description), null, null), _parent3, _scopeId2);
                      } else {
                        _push3(`<!--[-->${ssrInterpolate(__props.description)}<!--]-->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "description", {}, () => [
                        typeof __props.description === "function" ? (openBlock(), createBlock(resolveDynamicComponent(__props.description()), { key: 0 })) : typeof __props.description === "object" ? (openBlock(), createBlock(resolveDynamicComponent(__props.description), { key: 1 })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                          createTextVNode(toDisplayString(__props.description), 1)
                        ], 64))
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.orientation === "vertical" && (__props.actions?.length || !!slots.actions)) {
              _push2(`<div data-slot="actions" class="${ssrRenderClass(ui.value.actions({ class: unref(uiProp)?.actions }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
                _push2(`<!--[-->`);
                ssrRenderList(__props.actions, (action, index2) => {
                  _push2(ssrRenderComponent(unref(ToastAction), {
                    key: index2,
                    "alt-text": action.label || "Action",
                    "as-child": "",
                    onClick: () => {
                    }
                  }, {
                    default: withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_sfc_main$m, mergeProps({
                          size: "xs",
                          color: __props.color
                        }, { ref_for: true }, action), null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_sfc_main$m, mergeProps({
                            size: "xs",
                            color: __props.color
                          }, { ref_for: true }, action), null, 16, ["color"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions) || __props.close) {
              _push2(`<div data-slot="actions" class="${ssrRenderClass(ui.value.actions({ class: unref(uiProp)?.actions, orientation: "horizontal" }))}"${_scopeId}>`);
              if (__props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions)) {
                ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
                  _push2(`<!--[-->`);
                  ssrRenderList(__props.actions, (action, index2) => {
                    _push2(ssrRenderComponent(unref(ToastAction), {
                      key: index2,
                      "alt-text": action.label || "Action",
                      "as-child": "",
                      onClick: () => {
                      }
                    }, {
                      default: withCtx((_, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(ssrRenderComponent(_sfc_main$m, mergeProps({
                            size: "xs",
                            color: __props.color
                          }, { ref_for: true }, action), null, _parent3, _scopeId2));
                        } else {
                          return [
                            createVNode(_sfc_main$m, mergeProps({
                              size: "xs",
                              color: __props.color
                            }, { ref_for: true }, action), null, 16, ["color"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  });
                  _push2(`<!--]-->`);
                }, _push2, _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
              if (__props.close || !!slots.close) {
                _push2(ssrRenderComponent(unref(ToastClose), { "as-child": "" }, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                        if (__props.close) {
                          _push3(ssrRenderComponent(_sfc_main$m, mergeProps({
                            icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                            color: "neutral",
                            variant: "link",
                            "aria-label": unref(t)("toast.close")
                          }, typeof __props.close === "object" ? __props.close : {}, {
                            "data-slot": "close",
                            class: ui.value.close({ class: unref(uiProp)?.close }),
                            onClick: () => {
                            }
                          }), null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                          __props.close ? (openBlock(), createBlock(_sfc_main$m, mergeProps({
                            key: 0,
                            icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                            color: "neutral",
                            variant: "link",
                            "aria-label": unref(t)("toast.close")
                          }, typeof __props.close === "object" ? __props.close : {}, {
                            "data-slot": "close",
                            class: ui.value.close({ class: unref(uiProp)?.close }),
                            onClick: withModifiers(() => {
                            }, ["stop"])
                          }), null, 16, ["icon", "aria-label", "class", "onClick"])) : createCommentVNode("", true)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.progress && open && remaining > 0 && duration) {
              _push2(ssrRenderComponent(_sfc_main$l, mergeProps({
                "model-value": remaining / duration * 100,
                color: __props.color
              }, typeof __props.progress === "object" ? __props.progress : {}, {
                size: "sm",
                "data-slot": "progress",
                class: ui.value.progress({ class: unref(uiProp)?.progress })
              }), null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                __props.avatar ? (openBlock(), createBlock(_sfc_main$p, mergeProps({
                  key: 0,
                  size: unref(uiProp)?.avatarSize || ui.value.avatarSize()
                }, __props.avatar, {
                  "data-slot": "avatar",
                  class: ui.value.avatar({ class: unref(uiProp)?.avatar })
                }), null, 16, ["size", "class"])) : __props.icon ? (openBlock(), createBlock(_sfc_main$r, {
                  key: 1,
                  name: __props.icon,
                  "data-slot": "icon",
                  class: ui.value.icon({ class: unref(uiProp)?.icon })
                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
              ]),
              createVNode("div", {
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
              }, [
                __props.title || !!slots.title ? (openBlock(), createBlock(unref(ToastTitle), {
                  key: 0,
                  "data-slot": "title",
                  class: ui.value.title({ class: unref(uiProp)?.title })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      typeof __props.title === "function" ? (openBlock(), createBlock(resolveDynamicComponent(__props.title()), { key: 0 })) : typeof __props.title === "object" ? (openBlock(), createBlock(resolveDynamicComponent(__props.title), { key: 1 })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                        createTextVNode(toDisplayString(__props.title), 1)
                      ], 64))
                    ])
                  ]),
                  _: 3
                }, 8, ["class"])) : createCommentVNode("", true),
                __props.description || !!slots.description ? (openBlock(), createBlock(unref(ToastDescription), {
                  key: 1,
                  "data-slot": "description",
                  class: ui.value.description({ class: unref(uiProp)?.description })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "description", {}, () => [
                      typeof __props.description === "function" ? (openBlock(), createBlock(resolveDynamicComponent(__props.description()), { key: 0 })) : typeof __props.description === "object" ? (openBlock(), createBlock(resolveDynamicComponent(__props.description), { key: 1 })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                        createTextVNode(toDisplayString(__props.description), 1)
                      ], 64))
                    ])
                  ]),
                  _: 3
                }, 8, ["class"])) : createCommentVNode("", true),
                __props.orientation === "vertical" && (__props.actions?.length || !!slots.actions) ? (openBlock(), createBlock("div", {
                  key: 2,
                  "data-slot": "actions",
                  class: ui.value.actions({ class: unref(uiProp)?.actions })
                }, [
                  renderSlot(_ctx.$slots, "actions", {}, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.actions, (action, index2) => {
                      return openBlock(), createBlock(unref(ToastAction), {
                        key: index2,
                        "alt-text": action.label || "Action",
                        "as-child": "",
                        onClick: withModifiers(() => {
                        }, ["stop"])
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$m, mergeProps({
                            size: "xs",
                            color: __props.color
                          }, { ref_for: true }, action), null, 16, ["color"])
                        ]),
                        _: 2
                      }, 1032, ["alt-text", "onClick"]);
                    }), 128))
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2),
              __props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions) || __props.close ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "actions",
                class: ui.value.actions({ class: unref(uiProp)?.actions, orientation: "horizontal" })
              }, [
                __props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions) ? renderSlot(_ctx.$slots, "actions", { key: 0 }, () => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.actions, (action, index2) => {
                    return openBlock(), createBlock(unref(ToastAction), {
                      key: index2,
                      "alt-text": action.label || "Action",
                      "as-child": "",
                      onClick: withModifiers(() => {
                      }, ["stop"])
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$m, mergeProps({
                          size: "xs",
                          color: __props.color
                        }, { ref_for: true }, action), null, 16, ["color"])
                      ]),
                      _: 2
                    }, 1032, ["alt-text", "onClick"]);
                  }), 128))
                ]) : createCommentVNode("", true),
                __props.close || !!slots.close ? (openBlock(), createBlock(unref(ToastClose), {
                  key: 1,
                  "as-child": ""
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                      __props.close ? (openBlock(), createBlock(_sfc_main$m, mergeProps({
                        key: 0,
                        icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                        color: "neutral",
                        variant: "link",
                        "aria-label": unref(t)("toast.close")
                      }, typeof __props.close === "object" ? __props.close : {}, {
                        "data-slot": "close",
                        class: ui.value.close({ class: unref(uiProp)?.close }),
                        onClick: withModifiers(() => {
                        }, ["stop"])
                      }), null, 16, ["icon", "aria-label", "class", "onClick"])) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 3
                })) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true),
              __props.progress && open && remaining > 0 && duration ? (openBlock(), createBlock(_sfc_main$l, mergeProps({
                key: 1,
                "model-value": remaining / duration * 100,
                color: __props.color
              }, typeof __props.progress === "object" ? __props.progress : {}, {
                size: "sm",
                "data-slot": "progress",
                class: ui.value.progress({ class: unref(uiProp)?.progress })
              }), null, 16, ["model-value", "color", "class"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Toast.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const theme$2 = {
  "slots": {
    "viewport": "fixed flex flex-col w-[calc(100%-2rem)] sm:w-96 z-[100] data-[expanded=true]:h-(--height) focus:outline-none",
    "base": "pointer-events-auto absolute inset-x-0 z-(--index) transform-(--transform) data-[expanded=false]:data-[front=false]:h-(--front-height) data-[expanded=false]:data-[front=false]:*:opacity-0 data-[front=false]:*:transition-opacity data-[front=false]:*:duration-100 data-[state=closed]:animate-[toast-closed_200ms_ease-in-out] data-[state=closed]:data-[expanded=false]:data-[front=false]:animate-[toast-collapsed-closed_200ms_ease-in-out] data-[state=open]:data-[pulsing=odd]:animate-[toast-pulse-a_300ms_ease-out] data-[state=open]:data-[pulsing=even]:animate-[toast-pulse-b_300ms_ease-out] data-[swipe=move]:transition-none transition-[transform,translate,height] duration-200 ease-out"
  },
  "variants": {
    "position": {
      "top-left": {
        "viewport": "left-4"
      },
      "top-center": {
        "viewport": "left-1/2 transform -translate-x-1/2"
      },
      "top-right": {
        "viewport": "right-4"
      },
      "bottom-left": {
        "viewport": "left-4"
      },
      "bottom-center": {
        "viewport": "left-1/2 transform -translate-x-1/2"
      },
      "bottom-right": {
        "viewport": "right-4"
      }
    },
    "swipeDirection": {
      "up": "data-[swipe=end]:animate-[toast-slide-up_200ms_ease-out]",
      "right": "data-[swipe=end]:animate-[toast-slide-right_200ms_ease-out]",
      "down": "data-[swipe=end]:animate-[toast-slide-down_200ms_ease-out]",
      "left": "data-[swipe=end]:animate-[toast-slide-left_200ms_ease-out]"
    }
  },
  "compoundVariants": [
    {
      "position": [
        "top-left",
        "top-center",
        "top-right"
      ],
      "class": {
        "viewport": "top-4",
        "base": "top-0 data-[state=open]:animate-[toast-slide-in-from-top_200ms_ease-in-out]"
      }
    },
    {
      "position": [
        "bottom-left",
        "bottom-center",
        "bottom-right"
      ],
      "class": {
        "viewport": "bottom-4",
        "base": "bottom-0 data-[state=open]:animate-[toast-slide-in-from-bottom_200ms_ease-in-out]"
      }
    },
    {
      "swipeDirection": [
        "left",
        "right"
      ],
      "class": "data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=cancel]:translate-x-0"
    },
    {
      "swipeDirection": [
        "up",
        "down"
      ],
      "class": "data-[swipe=move]:translate-y-(--reka-toast-swipe-move-y) data-[swipe=end]:translate-y-(--reka-toast-swipe-end-y) data-[swipe=cancel]:translate-y-0"
    }
  ],
  "defaultVariants": {
    "position": "bottom-right"
  }
};
const __default__$1 = {
  name: "Toaster"
};
const _sfc_main$j = /* @__PURE__ */ Object.assign(__default__$1, {
  __ssrInlineRender: true,
  props: {
    position: { type: null, required: false },
    expand: { type: Boolean, required: false, default: true },
    progress: { type: Boolean, required: false, default: true },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    max: { type: Number, required: false, default: 5 },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    label: { type: String, required: false },
    duration: { type: Number, required: false, default: 5e3 },
    disableSwipe: { type: Boolean, required: false },
    swipeThreshold: { type: Number, required: false }
  },
  setup(__props) {
    const props = __props;
    const { toasts, remove } = useToast();
    const appConfig2 = useAppConfig();
    const uiProp = useComponentUI("toaster", props);
    provide(toastMaxInjectionKey, toRef(() => props.max));
    const providerProps = useForwardProps(reactivePick(props, "duration", "label", "swipeThreshold", "disableSwipe"));
    const portalProps = usePortal(toRef(() => props.portal));
    const swipeDirection = computed(() => {
      switch (props.position) {
        case "top-center":
          return "up";
        case "top-right":
        case "bottom-right":
          return "right";
        case "bottom-center":
          return "down";
        case "top-left":
        case "bottom-left":
          return "left";
      }
      return "right";
    });
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig2.ui?.toaster || {} })({
      position: props.position,
      swipeDirection: swipeDirection.value
    }));
    function onUpdateOpen(value, id) {
      if (value) {
        return;
      }
      remove(id);
    }
    const hovered = ref(false);
    const expanded = computed(() => props.expand || hovered.value);
    const refs = ref([]);
    const height = computed(() => refs.value.reduce((acc, { height: height2 }) => acc + height2 + 16, 0));
    const frontHeight = computed(() => refs.value[refs.value.length - 1]?.height || 0);
    function getOffset(index2) {
      return refs.value.slice(index2 + 1).reduce((acc, { height: height2 }) => acc + height2 + 16, 0);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ToastProvider), mergeProps({ "swipe-direction": swipeDirection.value }, unref(providerProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`<!--[-->`);
            ssrRenderList(unref(toasts), (toast, index2) => {
              _push2(ssrRenderComponent(_sfc_main$k, mergeProps({
                key: toast.id,
                ref_for: true,
                ref_key: "refs",
                ref: refs,
                progress: __props.progress
              }, { ref_for: true }, unref(omit)(toast, ["id", "close", "_duplicate", "_updated"]), {
                close: toast.close,
                "data-expanded": expanded.value,
                "data-front": !expanded.value && index2 === unref(toasts).length - 1,
                "data-pulsing": toast._duplicate ? toast._duplicate % 2 === 0 ? "even" : "odd" : void 0,
                style: {
                  "--index": index2 - unref(toasts).length + unref(toasts).length,
                  "--before": unref(toasts).length - 1 - index2,
                  "--offset": getOffset(index2),
                  "--scale": expanded.value ? "1" : "calc(1 - var(--before) * var(--scale-factor))",
                  "--translate": expanded.value ? "calc(var(--offset) * var(--translate-factor))" : "calc(var(--before) * var(--gap))",
                  "--transform": "translateY(var(--translate)) scale(var(--scale))"
                },
                "data-slot": "base",
                class: ui.value.base({ class: [unref(uiProp)?.base, toast.onClick ? "cursor-pointer" : void 0] }),
                "onUpdate:open": ($event) => onUpdateOpen($event, toast.id),
                onClick: ($event) => toast.onClick && toast.onClick(toast)
              }), null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(unref(ToastPortal), unref(portalProps), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ToastViewport), {
                    "data-expanded": expanded.value,
                    "data-slot": "viewport",
                    class: ui.value.viewport({ class: [unref(uiProp)?.viewport, props.class] }),
                    style: {
                      "--scale-factor": "0.05",
                      "--translate-factor": __props.position?.startsWith("top") ? "1px" : "-1px",
                      "--gap": __props.position?.startsWith("top") ? "16px" : "-16px",
                      "--front-height": `${frontHeight.value}px`,
                      "--height": `${height.value}px`
                    },
                    onMouseenter: ($event) => hovered.value = true,
                    onMouseleave: ($event) => hovered.value = false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ToastViewport), {
                      "data-expanded": expanded.value,
                      "data-slot": "viewport",
                      class: ui.value.viewport({ class: [unref(uiProp)?.viewport, props.class] }),
                      style: {
                        "--scale-factor": "0.05",
                        "--translate-factor": __props.position?.startsWith("top") ? "1px" : "-1px",
                        "--gap": __props.position?.startsWith("top") ? "16px" : "-16px",
                        "--front-height": `${frontHeight.value}px`,
                        "--height": `${height.value}px`
                      },
                      onMouseenter: ($event) => hovered.value = true,
                      onMouseleave: ($event) => hovered.value = false
                    }, null, 8, ["data-expanded", "class", "style", "onMouseenter", "onMouseleave"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              (openBlock(true), createBlock(Fragment, null, renderList(unref(toasts), (toast, index2) => {
                return openBlock(), createBlock(_sfc_main$k, mergeProps({
                  key: toast.id,
                  ref_for: true,
                  ref_key: "refs",
                  ref: refs,
                  progress: __props.progress
                }, { ref_for: true }, unref(omit)(toast, ["id", "close", "_duplicate", "_updated"]), {
                  close: toast.close,
                  "data-expanded": expanded.value,
                  "data-front": !expanded.value && index2 === unref(toasts).length - 1,
                  "data-pulsing": toast._duplicate ? toast._duplicate % 2 === 0 ? "even" : "odd" : void 0,
                  style: {
                    "--index": index2 - unref(toasts).length + unref(toasts).length,
                    "--before": unref(toasts).length - 1 - index2,
                    "--offset": getOffset(index2),
                    "--scale": expanded.value ? "1" : "calc(1 - var(--before) * var(--scale-factor))",
                    "--translate": expanded.value ? "calc(var(--offset) * var(--translate-factor))" : "calc(var(--before) * var(--gap))",
                    "--transform": "translateY(var(--translate)) scale(var(--scale))"
                  },
                  "data-slot": "base",
                  class: ui.value.base({ class: [unref(uiProp)?.base, toast.onClick ? "cursor-pointer" : void 0] }),
                  "onUpdate:open": ($event) => onUpdateOpen($event, toast.id),
                  onClick: ($event) => toast.onClick && toast.onClick(toast)
                }), null, 16, ["progress", "close", "data-expanded", "data-front", "data-pulsing", "style", "class", "onUpdate:open", "onClick"]);
              }), 128)),
              createVNode(unref(ToastPortal), unref(portalProps), {
                default: withCtx(() => [
                  createVNode(unref(ToastViewport), {
                    "data-expanded": expanded.value,
                    "data-slot": "viewport",
                    class: ui.value.viewport({ class: [unref(uiProp)?.viewport, props.class] }),
                    style: {
                      "--scale-factor": "0.05",
                      "--translate-factor": __props.position?.startsWith("top") ? "1px" : "-1px",
                      "--gap": __props.position?.startsWith("top") ? "16px" : "-16px",
                      "--front-height": `${frontHeight.value}px`,
                      "--height": `${height.value}px`
                    },
                    onMouseenter: ($event) => hovered.value = true,
                    onMouseleave: ($event) => hovered.value = false
                  }, null, 8, ["data-expanded", "class", "style", "onMouseenter", "onMouseleave"])
                ]),
                _: 1
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Toaster.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const UToaster = Object.assign(_sfc_main$j, { __name: "UToaster" });
function _useOverlay() {
  const overlays = shallowReactive([]);
  const create = (component, _options) => {
    const { props, defaultOpen, destroyOnClose } = _options || {};
    const options = reactive({
      id: /* @__PURE__ */ Symbol(""),
      isOpen: !!defaultOpen,
      component: markRaw(component),
      isMounted: !!defaultOpen,
      destroyOnClose: !!destroyOnClose,
      originalProps: props || {},
      props: { ...props }
    });
    overlays.push(options);
    return {
      ...options,
      open: (props2) => open(options.id, props2),
      close: (value) => close(options.id, value),
      patch: (props2) => patch(options.id, props2)
    };
  };
  const open = (id, props) => {
    const overlay = getOverlay(id);
    if (props) {
      overlay.props = { ...overlay.originalProps, ...props };
    } else {
      overlay.props = { ...overlay.originalProps };
    }
    overlay.isOpen = true;
    overlay.isMounted = true;
    const result = new Promise((resolve) => overlay.resolvePromise = resolve);
    return Object.assign(result, {
      id,
      isMounted: overlay.isMounted,
      isOpen: overlay.isOpen,
      result
    });
  };
  const close = (id, value) => {
    const overlay = getOverlay(id);
    overlay.isOpen = false;
    if (overlay.resolvePromise) {
      overlay.resolvePromise(value);
      overlay.resolvePromise = void 0;
    }
  };
  const closeAll = () => {
    overlays.forEach((overlay) => close(overlay.id));
  };
  const unmount = (id) => {
    const overlay = getOverlay(id);
    overlay.isMounted = false;
    if (overlay.destroyOnClose) {
      const index2 = overlays.findIndex((overlay2) => overlay2.id === id);
      overlays.splice(index2, 1);
    }
  };
  const patch = (id, props) => {
    const overlay = getOverlay(id);
    overlay.props = { ...overlay.props, ...props };
  };
  const getOverlay = (id) => {
    const overlay = overlays.find((overlay2) => overlay2.id === id);
    if (!overlay) {
      throw new Error("Overlay not found");
    }
    return overlay;
  };
  const isOpen = (id) => {
    const overlay = getOverlay(id);
    return overlay.isOpen;
  };
  return {
    overlays,
    open,
    close,
    closeAll,
    create,
    patch,
    unmount,
    isOpen
  };
}
const useOverlay = /* @__PURE__ */ createSharedComposable(_useOverlay);
const _sfc_main$i = {
  __name: "UOverlayProvider",
  __ssrInlineRender: true,
  setup(__props) {
    const { overlays, unmount, close } = useOverlay();
    const mountedOverlays = computed(() => overlays.filter((overlay) => overlay.isMounted));
    const onAfterLeave = (id) => {
      close(id);
      unmount(id);
    };
    const onClose = (id, value) => {
      close(id, value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(mountedOverlays.value, (overlay) => {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(overlay.component), mergeProps({
          key: overlay.id
        }, { ref_for: true }, overlay.props, {
          open: overlay.isOpen,
          "onUpdate:open": ($event) => overlay.isOpen = $event,
          onClose: (value) => onClose(overlay.id, value),
          "onAfter:leave": ($event) => onAfterLeave(overlay.id)
        }), null), _parent);
      });
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/OverlayProvider.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __default__ = {
  name: "App"
};
const _sfc_main$h = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  props: {
    tooltip: { type: Object, required: false },
    toaster: { type: [Object, null], required: false },
    locale: { type: Object, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: "body" },
    dir: { type: String, required: false },
    scrollBody: { type: [Boolean, Object], required: false },
    nonce: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const configProviderProps = useForwardProps(reactivePick(props, "scrollBody"));
    const tooltipProps = toRef(() => props.tooltip);
    const toasterProps = toRef(() => props.toaster);
    const locale = toRef(() => props.locale);
    provide(localeContextInjectionKey, locale);
    const portal = toRef(() => props.portal);
    provide(portalTargetInjectionKey, portal);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ConfigProvider), mergeProps({
        "use-id": () => useId(),
        dir: props.dir || locale.value?.dir,
        locale: locale.value?.code
      }, unref(configProviderProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TooltipProvider), tooltipProps.value, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.toaster !== null) {
                    _push3(ssrRenderComponent(UToaster, toasterProps.value, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "default")
                          ];
                        }
                      }),
                      _: 3
                    }, _parent3, _scopeId2));
                  } else {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  }
                  _push3(ssrRenderComponent(_sfc_main$i, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    __props.toaster !== null ? (openBlock(), createBlock(UToaster, mergeProps({ key: 0 }, toasterProps.value), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    }, 16)) : renderSlot(_ctx.$slots, "default", { key: 1 }),
                    createVNode(_sfc_main$i)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TooltipProvider), tooltipProps.value, {
                default: withCtx(() => [
                  __props.toaster !== null ? (openBlock(), createBlock(UToaster, mergeProps({ key: 0 }, toasterProps.value), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  }, 16)) : renderSlot(_ctx.$slots, "default", { key: 1 }),
                  createVNode(_sfc_main$i)
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/App.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$h, { __name: "UApp" });
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$g = {
  __name: "DevGridOverlay",
  __ssrInlineRender: true,
  props: {
    columns: {
      type: Number,
      default: 12
    },
    columnWidth: {
      type: Number,
      default: 72
    },
    gutter: {
      type: Number,
      default: 22
    },
    maxWidth: {
      type: Number,
      default: 1106
    },
    sidePadding: {
      type: Number,
      default: 16
    },
    columnColor: {
      type: String,
      default: "rgba(201, 37, 255, 0.14)"
    },
    lineColor: {
      type: String,
      default: "rgba(201, 37, 255, 0.45)"
    }
  },
  setup(__props) {
    const props = __props;
    const gridStyle = computed(() => {
      const step = props.columnWidth + props.gutter;
      return {
        "--grid-columns": String(props.columns),
        "--grid-column-width": `${props.columnWidth}px`,
        "--grid-gutter": `${props.gutter}px`,
        "--grid-step": `${step}px`,
        "--grid-max-width": `${props.maxWidth}px`,
        "--grid-side-padding": `${props.sidePadding}px`,
        "--grid-column-color": props.columnColor,
        "--grid-line-color": props.lineColor
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "dev-grid-overlay",
        "aria-hidden": "true"
      }, _attrs))} data-v-e31d3a8a><div class="dev-grid-overlay__content" style="${ssrRenderStyle(unref(gridStyle))}" data-v-e31d3a8a></div></div>`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DevGridOverlay.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __nuxt_component_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-e31d3a8a"]]);
const alert16 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Icon'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8%2016C12.4183%2016%2016%2012.4183%2016%208C16%203.58172%2012.4183%200%208%200C3.58172%200%200%203.58172%200%208C0%2012.4183%203.58172%2016%208%2016ZM7%207.5V4H9V7.5H7ZM9.25%2011C9.25%2011.6904%208.69036%2012.25%208%2012.25C7.30964%2012.25%206.75%2011.6904%206.75%2011C6.75%2010.3096%207.30964%209.75%208%209.75C8.69036%209.75%209.25%2010.3096%209.25%2011Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const arrowRight16 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2013.4142%2013'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Icon'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6%200.292893C6.39052%20-0.0976311%207.02369%20-0.0976311%207.41421%200.292893L13.4142%206.29289L12%207.70711L7.70711%203.41421V13H5.70711V3.41421L1.41421%207.70711L0%206.29289L6%200.292893Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const arrowRight24 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2015.4141%2014.8755'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Union'%20d='M6.88672%200.291507C7.36328%20-0.0971695%208.05078%20-0.0971683%208.52734%200.291507L8.62598%200.380374L15.4141%207.16846L14%208.58252L8.70703%203.28955V14.8755H6.70703V3.28955L1.41406%208.58252L0%207.16846L6.78809%200.380374L6.88672%200.291507Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const basket12 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2012.0001%209.54027'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Vector'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10.8382%204.9785L10.1984%209.45709L1.84262%209.54026L1.12605%205.17811L0.0166349%204.19538L0%203.41995L12.0001%203.40331L11.9259%204.37837L10.8382%204.9785ZM4.31992%205.70659C4.31992%204.88892%203.25402%204.89276%203.25914%205.6554C3.25914%205.88957%203.27321%207.8384%203.27577%208.05337C3.27577%208.79042%204.32632%208.76739%204.3212%207.99707C4.31992%207.78977%204.32248%205.97786%204.31992%205.70659ZM6.54514%205.70659C6.54514%204.88892%205.47924%204.89276%205.48436%205.6554C5.48436%205.88957%205.49843%207.8384%205.50099%208.05337C5.50099%208.79042%206.55154%208.76739%206.54642%207.99707C6.54514%207.78977%206.5477%205.97786%206.54514%205.70659ZM8.77036%205.70659C8.77036%204.88892%207.70446%204.89276%207.70958%205.6554C7.70958%205.88957%207.72365%207.8384%207.72621%208.05337C7.72621%208.79042%208.77676%208.76739%208.77164%207.99707C8.77036%207.78977%208.77292%205.97786%208.77036%205.70659ZM6.50931%201.05781C5.90534%200.460237%206.70125%20-0.370222%207.28475%200.204317L9.84395%202.73664L8.18047%202.73408L6.50931%201.05781ZM3.74282%202.74048H2.09726C2.79208%202.04438%204.48627%200.35403%204.62191%200.215833C5.21692%20-0.388137%206.04994%200.407773%205.48052%200.983592L3.74282%202.74048Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const basket16 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2016.0001%2012.7204'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Vector'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M14.4509%206.638L13.5979%2012.6095L2.45683%2012.7204L1.50139%206.90415L0.0221799%205.59384L0%204.55993L16.0001%204.53775L15.9011%205.83782L14.4509%206.638ZM5.7599%207.60878C5.7599%206.51857%204.33869%206.52368%204.34551%207.54054C4.34551%207.85276%204.36428%2010.4512%204.36769%2010.7378C4.36769%2011.7206%205.76843%2011.6898%205.7616%2010.6628C5.7599%2010.3864%205.76331%207.97048%205.7599%207.60878ZM8.72686%207.60878C8.72686%206.51857%207.30565%206.52368%207.31248%207.54054C7.31248%207.85276%207.33124%2010.4512%207.33465%2010.7378C7.33465%2011.7206%208.73539%2011.6898%208.72856%2010.6628C8.72686%2010.3864%208.73027%207.97048%208.72686%207.60878ZM11.6938%207.60878C11.6938%206.51857%2010.2726%206.52368%2010.2794%207.54054C10.2794%207.85276%2010.2982%2010.4512%2010.3016%2010.7378C10.3016%2011.7206%2011.7023%2011.6898%2011.6955%2010.6628C11.6938%2010.3864%2011.6972%207.97048%2011.6938%207.60878ZM8.67909%201.41041C7.87379%200.613649%208.93501%20-0.493629%209.713%200.272423L13.1253%203.64886L10.9073%203.64544L8.67909%201.41041ZM4.99043%203.65397H2.79635C3.72278%202.72584%205.98169%200.47204%206.16254%200.287778C6.95589%20-0.517516%208.06659%200.543697%207.30736%201.31146L4.99043%203.65397Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const basket24 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2024.0001%2019.0805'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Vector'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M21.6764%209.95699L20.3968%2018.9142L3.68524%2019.0805L2.25209%2010.3562L0.0332698%208.39077L0%206.83989L24.0001%206.80662L23.8517%208.75673L21.6764%209.95699ZM8.63985%2011.4132C8.63985%209.77785%206.50804%209.78553%206.51827%2011.3108C6.51827%2011.7791%206.54642%2015.6768%206.55154%2016.1067C6.55154%2017.5808%208.65264%2017.5348%208.6424%2015.9941C8.63984%2015.5795%208.64496%2011.9557%208.63985%2011.4132ZM13.0903%2011.4132C13.0903%209.77785%2010.9585%209.78553%2010.9687%2011.3108C10.9687%2011.7791%2010.9969%2015.6768%2011.002%2016.1067C11.002%2017.5808%2013.1031%2017.5348%2013.0928%2015.9941C13.0903%2015.5795%2013.0954%2011.9557%2013.0903%2011.4132ZM17.5407%2011.4132C17.5407%209.77785%2015.4089%209.78553%2015.4192%2011.3108C15.4192%2011.7791%2015.4473%2015.6768%2015.4524%2016.1067C15.4524%2017.5808%2017.5535%2017.5348%2017.5433%2015.9941C17.5407%2015.5795%2017.5458%2011.9557%2017.5407%2011.4132ZM13.0186%202.11562C11.8107%200.920473%2013.4025%20-0.740444%2014.5695%200.408635L19.6879%205.47328L16.3609%205.46816L13.0186%202.11562ZM7.48565%205.48096H4.19452C5.58416%204.08876%208.97254%200.70806%209.24382%200.431666C10.4338%20-0.776274%2012.0999%200.815546%2010.961%201.96718L7.48565%205.48096Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const binky16 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%209.48148%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Group%2097'%3e%3cpath%20id='Ellipse%201'%20d='M4.74132%209.6301C6.29585%209.63016%207.55577%2010.89%207.55577%2012.4446C7.55571%2013.999%206.29581%2015.2589%204.74132%2015.259C3.18678%2015.259%201.92692%2013.9991%201.92687%2012.4446C1.92687%2010.89%203.18674%209.6301%204.74132%209.6301Z'%20stroke='var(--stroke-0,%20%23DE7AFF)'%20stroke-width='1.48148'/%3e%3cpath%20id='Rectangle%2055'%20d='M0%208.29639H9.48148C9.48148%209.27823%208.68554%2010.0742%207.7037%2010.0742H1.77778C0.79594%2010.0742%200%209.27823%200%208.29639Z'%20fill='var(--fill-0,%20%23DE7AFF)'/%3e%3cpath%20id='Rectangle%2057'%20d='M2.96387%207.5L2.96387%201.57407L6.51942%201.57407L6.51942%207.5L2.96387%207.5Z'%20fill='var(--fill-0,%20%23DE7AFF)'/%3e%3cpath%20id='Rectangle%2056'%20d='M1.77825%202.96296C1.77825%201.32656%203.10481%200%204.74121%200C6.37761%200%207.70417%201.32656%207.70417%202.96296C7.70417%204.59936%206.37761%205.92593%204.74121%205.92593C3.10481%205.92593%201.77825%204.59936%201.77825%202.96296Z'%20fill='var(--fill-0,%20%23DE7AFF)'/%3e%3c/g%3e%3c/svg%3e";
const calendar16 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Vector'%3e%3cpath%20d='M2.5%201C2.5%200.447715%202.94772%200%203.5%200C4.05228%200%204.5%200.447715%204.5%201V3C4.5%203.55228%204.05228%204%203.5%204C2.94772%204%202.5%203.55228%202.5%203V1Z'%20fill='var(--fill-0,%20%23DE7AFF)'/%3e%3cpath%20d='M11.5%201C11.5%200.447715%2011.9477%200%2012.5%200C13.0523%200%2013.5%200.447715%2013.5%201V3C13.5%203.55228%2013.0523%204%2012.5%204C11.9477%204%2011.5%203.55228%2011.5%203V1Z'%20fill='var(--fill-0,%20%23DE7AFF)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M1.75%203C1.75%203.9665%202.5335%204.75%203.5%204.75C4.4665%204.75%205.25%203.9665%205.25%203V2H10.75V3C10.75%203.9665%2011.5335%204.75%2012.5%204.75C13.4665%204.75%2014.25%203.9665%2014.25%203V2H15C15.5523%202%2016%202.44772%2016%203V15C16%2015.5523%2015.5523%2016%2015%2016H1C0.447715%2016%202.41598e-08%2015.5523%200%2015V3C1.93278e-07%202.44772%200.447715%202%201%202H1.75V3ZM1%206V15H15V7C15%206.44772%2014.5523%206%2014%206H1Z'%20fill='var(--fill-0,%20%23DE7AFF)'/%3e%3cpath%20d='M6.5%207.25C6.5%207.11193%206.61193%207%206.75%207H9.25C9.38807%207%209.5%207.11193%209.5%207.25V9.75C9.5%209.88807%209.38807%2010%209.25%2010H6.75C6.61193%2010%206.5%209.88807%206.5%209.75V7.25Z'%20fill='var(--fill-0,%20%23DE7AFF)'/%3e%3cpath%20d='M11%207.25C11%207.11193%2011.1119%207%2011.25%207H13.75C13.8881%207%2014%207.11193%2014%207.25V9.75C14%209.88807%2013.8881%2010%2013.75%2010H11.25C11.1119%2010%2011%209.88807%2011%209.75V7.25Z'%20fill='var(--fill-0,%20%23DE7AFF)'/%3e%3cpath%20d='M2%2011.25C2%2011.1119%202.11193%2011%202.25%2011H4.75C4.88807%2011%205%2011.1119%205%2011.25V13.75C5%2013.8881%204.88807%2014%204.75%2014H2.25C2.11193%2014%202%2013.8881%202%2013.75V11.25Z'%20fill='var(--fill-0,%20%23DE7AFF)'/%3e%3cpath%20d='M6.5%2011.25C6.5%2011.1119%206.61193%2011%206.75%2011H9.25C9.38807%2011%209.5%2011.1119%209.5%2011.25V13.75C9.5%2013.8881%209.38807%2014%209.25%2014H6.75C6.61193%2014%206.5%2013.8881%206.5%2013.75V11.25Z'%20fill='var(--fill-0,%20%23DE7AFF)'/%3e%3cpath%20d='M11%2011.25C11%2011.1119%2011.1119%2011%2011.25%2011H13.75C13.8881%2011%2014%2011.1119%2014%2011.25V13.75C14%2013.8881%2013.8881%2014%2013.75%2014H11.25C11.1119%2014%2011%2013.8881%2011%2013.75V11.25Z'%20fill='var(--fill-0,%20%23DE7AFF)'/%3e%3c/g%3e%3c/svg%3e";
const check12 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%209.75%207.55261'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Icon'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.75%201.19779L4.65061%207.22434C4.47618%207.43048%204.22054%207.55034%203.95051%207.55258C3.68048%207.55481%203.42289%207.43921%203.24507%207.23598L0%203.52734L1.39552%202.30626L3.93105%205.204L8.33443%200L9.75%201.19779Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const cross12 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%208.56066%208.56066'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Icon'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.28033%205.34099L7.5%208.56066L8.56066%207.5L5.34099%204.28033L8.56066%201.06066L7.5%200L4.28033%203.21967L1.06066%200L0%201.06066L3.21967%204.28033L0%207.5L1.06066%208.56066L4.28033%205.34099Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const headerAccountAuthorized16 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Icon'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M16%208C16%2012.4183%2012.4183%2016%208%2016C3.58172%2016%200%2012.4183%200%208C0%203.58172%203.58172%200%208%200C12.4183%200%2016%203.58172%2016%208ZM12.8%2010.8571C12.8%2012.1826%2010.651%2013.6%208%2013.6C5.34903%2013.6%203.2%2012.1826%203.2%2010.8571C3.2%209.53166%205.34903%208.8%208%208.8C10.651%208.8%2012.8%209.53166%2012.8%2010.8571ZM8%207.2C9.32548%207.2%2010.4%206.12548%2010.4%204.8C10.4%203.47452%209.32548%202.4%208%202.4C6.67452%202.4%205.6%203.47452%205.6%204.8C5.6%206.12548%206.67452%207.2%208%207.2Z'%20fill='var(--fill-0,%20%23FCF4FF)'/%3e%3c/svg%3e";
const headerSignOutAuthorized16 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2010.5%2010.7463'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Ellipse%202'%20d='M5.25%200V4.49634M2.25%202.14218C1.32938%202.96616%200.75%204.16359%200.75%205.49634C0.75%207.98162%202.76472%209.99634%205.25%209.99634C7.73528%209.99634%209.75%207.98162%209.75%205.49634C9.75%204.16359%209.17062%202.96616%208.25%202.14218'%20stroke='var(--stroke-0,%20%23DE7AFF)'%20stroke-width='1.5'/%3e%3c/svg%3e";
const hide16 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2016%2014.6108'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Icon'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M1.36569%200.234315C1.6781%20-0.0781048%202.18464%20-0.0781048%202.49706%200.234315L15.5078%2013.2451C15.8202%2013.5575%2015.8202%2014.064%2015.5078%2014.3764C15.1954%2014.6889%2014.6889%2014.6889%2014.3764%2014.3764L12.873%2012.873C11.6128%2013.7678%209.9822%2014.4%208%2014.4C2.78172%2014.4%200%2010.0183%200%208C0%206.74838%201.06978%204.58784%203.12704%203.12704L1.36569%201.36569C1.05327%201.05327%201.05327%200.546734%201.36569%200.234315ZM5.17157%205.17157C4.44772%205.89543%204%206.89543%204%208C4%2010.2091%205.79086%2012%208%2012C9.10457%2012%2010.1046%2011.5523%2010.8284%2010.8284L9.69706%209.69706C9.24697%2010.1471%208.63652%2010.4%208%2010.4C7.36348%2010.4%206.75303%2010.1471%206.30294%209.69706C5.85286%209.24697%205.6%208.63652%205.6%208C5.6%207.36348%205.85286%206.75303%206.30294%206.30294L5.17157%205.17157ZM6.12973%201.79836L8.34614%204.01477C10.2791%204.18045%2011.8195%205.72086%2011.9852%207.65386L15.0075%2010.6761C15.6643%209.68737%2016%208.70109%2016%208C16%205.98172%2013.2183%201.6%208%201.6C7.33701%201.6%206.71335%201.67073%206.12973%201.79836Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const mir32x62 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2061.8148%2016.8825'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Vector'%3e%3cpath%20d='M0%200.00250663H5.8C6.33%200.00250663%207.91%20-0.167493%208.61%202.29251C9.14%203.87251%209.84%206.33251%2010.89%2010.0225H11.24C12.29%206.15251%2013.17%203.52251%2013.52%202.29251C14.24%20-0.167493%2015.99%200.00250663%2016.7%200.00250663H22.15V16.8725H16.53V6.86251H16.18L13.19%2016.8825H8.97L5.98%206.86251H5.45V16.8825H0M24.43%200.00250663H30.05V10.0225H30.58L34.27%201.76251C34.97%200.182507%2036.56%200.00250663%2036.56%200.00250663H41.83V16.8725H36.21V6.86251H35.86L32.17%2015.1225C31.47%2016.7025%2029.71%2016.8825%2029.71%2016.8825H24.44M49.39%2011.7825V16.8825H44.12V8.09251H61.34C60.64%2010.2025%2058.18%2011.7825%2055.36%2011.7825'%20fill='var(--fill-0,%20%2304121B)'%20fill-opacity='0.24'/%3e%3cpath%20d='M61.68%207.03251C62.39%203.87251%2060.28%200.00250663%2055.71%200.00250663H43.76C44.11%203.69251%2047.27%207.03251%2050.61%207.03251'%20fill='var(--fill-0,%20%2304121B)'%20fill-opacity='0.24'/%3e%3c/g%3e%3c/svg%3e";
const puzzle16 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2016%2015'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Vector'%20d='M5.6987%203.2574C5.5995%203.00645%205.50414%202.7657%205.38793%202.52142C5.32566%202.39052%205.26865%202.25333%205.20759%202.12167C5.08421%201.81448%205.10684%201.39485%205.23363%201.0906C5.41822%200.647653%205.76246%200.336019%206.20164%200.160362C6.76427%20-0.0630875%207.39054%20-0.0526621%207.9457%200.189395C8.3575%200.37343%208.69531%200.693228%208.86055%201.12315C8.98789%201.45445%208.99156%201.8716%208.84125%202.19525C8.67852%202.54554%208.51344%202.90152%208.37687%203.26461C9.32445%203.27269%2010.2908%203.26247%2011.2395%203.25884L12.0366%203.25564C12.1907%203.25498%2012.3565%203.24671%2012.5091%203.26357C12.8607%203.30243%2012.8024%203.68615%2012.8023%203.9411L12.8021%204.66736L12.8029%207.10031C13.0921%206.99951%2013.3369%206.87034%2013.615%206.74485C13.71%206.70201%2013.8309%206.6361%2013.9248%206.60165C14.2763%206.47506%2014.6629%206.49805%2014.9974%206.66543C15.4205%206.87617%2015.7271%207.25446%2015.8764%207.70693C15.9073%207.79923%2015.9314%207.89367%2015.9487%207.98963C15.9596%208.04851%2015.9826%208.20302%2016%208.24742V8.70118C15.9634%208.79992%2015.9387%209.01403%2015.9077%209.13155C15.6831%209.98227%2014.8351%2010.6592%2013.9576%2010.3522C13.8427%2010.3119%2013.7362%2010.2518%2013.6246%2010.1996L13.0773%209.94638C12.9969%209.90867%2012.8512%209.86395%2012.7898%209.83069C12.7942%2010.1405%2012.7909%2010.4592%2012.792%2010.7701L12.7981%2013.0811L12.8002%2014.1382C12.8005%2014.2333%2012.8005%2014.3288%2012.8017%2014.4253C12.8047%2014.637%2012.8247%2014.8703%2012.5928%2014.9677C12.5702%2014.9771%2012.4954%2014.99%2012.4701%2014.9916C12.3056%2015.0025%2012.1359%2014.9982%2011.9711%2014.9982L11.4954%2014.9981L11.0198%2014.998L9.35492%2014.9982C9.05852%2014.9983%208.76133%2014.9999%208.46547%2014.9974C8.25898%2014.9957%208.06828%2014.9453%207.92273%2014.7926C7.67253%2014.5301%207.71543%2014.2397%207.84727%2013.9313C7.94078%2013.7125%208.03797%2013.4902%208.13711%2013.2729C8.185%2013.1611%208.25016%2013.035%208.28414%2012.9211C8.36836%2012.639%208.26867%2012.3492%208.07539%2012.1397C7.84156%2011.8861%207.42566%2011.7671%207.09238%2011.7605C6.73984%2011.7535%206.30291%2011.8501%206.04051%2012.1035C5.8779%2012.2605%205.76977%2012.4772%205.76555%2012.7067C5.76203%2012.8985%205.8317%2013.023%205.9068%2013.1913L6.13804%2013.7059C6.30582%2014.0773%206.48762%2014.4557%206.14816%2014.7999C6.04705%2014.9024%205.9096%2014.9707%205.76817%2014.9853C5.5609%2015.0067%205.326%2014.9985%205.11603%2014.9984L3.96061%2014.9981L1.53094%2014.998C1.15924%2014.998%200.787102%2014.998%200.41548%2014.9994C0.303859%2014.9998%200.169111%2014.975%200.091282%2014.8882C0.0332213%2014.8235%200.0350815%2014.7887%200%2014.7276V9.74015C0.00979687%209.72265%200.043071%209.62613%200.050991%209.6021C0.10498%209.43844%200.226653%209.30835%200.382817%209.23785C0.48833%209.19091%200.604539%209.17468%200.718557%209.19099C1.05528%209.23801%201.63473%209.59112%201.97684%209.72065C2.16398%209.79322%202.3722%209.78415%202.55256%209.69551C3.37148%209.30166%203.40452%207.79724%202.6568%207.30386C2.30315%207.0705%202.03616%207.19319%201.69314%207.35191C1.46061%207.45948%200.95893%207.72221%200.717674%207.75571C0.621356%207.7686%200.523401%207.75801%200.431884%207.72483C0.266488%207.66627%200.132827%207.53969%200.0634802%207.37594C0.0399255%207.31921%200.0224379%207.2471%200%207.1995V3.51652C0.0491797%203.41957%200.0908422%203.31723%200.20283%203.28164C0.364929%203.23014%200.894148%203.25427%201.1013%203.25442L2.44405%203.2548L4.57613%203.2547C4.92859%203.25471%205.35159%203.24438%205.6987%203.2574Z'%20fill='var(--fill-0,%20%23DE7AFF)'/%3e%3c/svg%3e";
const refresh16 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Vector'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10.3336%202.84883L10.7947%205.34531L9.29702%205.6215L8.53556%201.49857C8.49706%201.29009%208.54734%201.07502%208.67428%200.905166C8.80123%200.735312%208.99334%200.626081%209.20431%200.603791L13.3923%200.161318L13.5525%201.67468L11.5521%201.88602C11.6061%201.93395%2011.6592%201.98271%2011.7116%202.03228C13.0295%203.27946%2013.8531%205.04683%2013.8531%207.0052C13.8531%2010.7873%2010.7849%2013.8533%206.99999%2013.8533C3.21511%2013.8533%200.146847%2010.7873%200.146847%207.0052C0.146847%204.13004%201.91977%201.67049%204.4299%200.655167L5.00132%202.06578C3.04651%202.85649%201.66977%204.7711%201.66977%207.0052C1.66977%209.94684%204.05619%2012.3315%206.99999%2012.3315C9.9438%2012.3315%2012.3302%209.94684%2012.3302%207.0052C12.3302%205.4819%2011.6913%204.10896%2010.6644%203.13721C10.5582%203.03665%2010.4478%202.94043%2010.3336%202.84883Z'%20fill='var(--fill-0,%20white)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.523%200L13.714%201.80514L11.8879%201.99807C13.1899%203.26735%2014%205.04244%2014%207.0052C14%2010.8683%2010.866%2014%207%2014C3.13396%2014%200%2010.8683%200%207.0052C0%204.06824%201.81113%201.55617%204.37479%200.519189L4.51094%200.464119L5.19253%202.14671L5.05645%202.20175C3.15523%202.97078%201.81663%204.83282%201.81663%207.0052C1.81663%209.86586%204.13735%2012.1848%207%2012.1848C9.86266%2012.1848%2012.1834%209.86586%2012.1834%207.0052C12.1834%205.52381%2011.5622%204.18889%2010.5634%203.24371C10.5604%203.24081%2010.5573%203.23792%2010.5542%203.23503L10.9657%205.46294L9.17926%205.79239L8.39115%201.52518C8.34523%201.27653%208.40519%201.02%208.55662%200.817399C8.70804%200.614797%208.9372%200.484494%209.18887%200.457903L13.523%200ZM13.2618%200.322633L9.21976%200.749676C9.04949%200.767665%208.89444%200.855824%208.79196%200.992928C8.68949%201.13004%208.6489%201.30365%208.67998%201.47195L9.4148%205.4506L10.6236%205.22767L10.1175%202.48739L10.4255%202.73444C10.5429%202.82855%2010.6563%202.9274%2010.7654%203.03071C11.8203%204.02903%2012.4771%205.43999%2012.4771%207.0052C12.4771%2010.0278%2010.0249%2012.4782%207%2012.4782C3.97505%2012.4782%201.52292%2010.0278%201.52292%207.0052C1.52292%204.76129%202.87452%202.83134%204.81087%201.98668L4.34948%200.847711C1.96485%201.87398%200.293706%204.24387%200.293706%207.0052C0.293706%2010.7063%203.29626%2013.7066%207%2013.7066C10.7037%2013.7066%2013.7063%2010.7063%2013.7063%207.0052C13.7063%205.08877%2012.9005%203.35941%2011.6106%202.13878C11.5594%202.09026%2011.5073%202.04254%2011.4545%201.99564L11.2063%201.77505L13.391%201.54422L13.2618%200.322633Z'%20fill='var(--fill-0,%20white)'/%3e%3c/g%3e%3c/svg%3e";
const ruble12 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%208.40127%209.78573'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Vector'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.81572%206.10578H4.54888L1.45945%206.02573V6.01761L0.17286%205.98397L0%204.26929L1.44437%204.27857L1.41652%201.78777L1.25991%200.0475655C1.25991%200.0475655%202.90497%200%204.78091%200C9.82053%200%209.37968%206.10578%204.81572%206.10578ZM4.68926%201.77036C4.4874%201.77036%203.4572%201.78197%203.4572%201.78197L3.54189%204.26929L5.42014%204.25769C6.11506%203.80524%207.02345%201.77036%204.68926%201.77036ZM6.74966%208.49914L3.46648%208.43533V9.78573L1.49425%209.75208L1.48149%208.39705L0.413007%208.37733L0.265671%206.91672L7.01185%206.88539L6.74966%208.49914Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const ruble16 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2011.2017%2013.0476'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Vector'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.42095%208.14105H6.06518L1.94593%208.03431V8.02348L0.23048%207.97863L0%205.69239L1.92582%205.70476L1.8887%202.38369L1.67987%200.0634206C1.67987%200.0634206%203.8733%200%206.37455%200C13.094%200%2012.5062%208.14105%206.42095%208.14105ZM6.25235%202.36049C5.9832%202.36049%204.6096%202.37595%204.6096%202.37595L4.72252%205.69239L7.22686%205.67692C8.15342%205.07365%209.3646%202.36049%206.25235%202.36049ZM8.99955%2011.3322L4.62197%2011.2471V13.0476L1.99234%2013.0028L1.97532%2011.1961L0.550676%2011.1698L0.354228%209.22229L9.34913%209.18053L8.99955%2011.3322Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const show16 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2016%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Icon'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8%2012C12.4183%2012%2016%208.31371%2016%206C16%203.68629%2012.4183%200%208%200C3.58172%200%200%203.68629%200%206C0%208.31371%203.58172%2012%208%2012ZM8%2010C10.2091%2010%2012%208.20914%2012%206C12%203.79086%2010.2091%202%208%202C5.79086%202%204%203.79086%204%206C4%208.20914%205.79086%2010%208%2010Z'%20fill='var(--fill-0,%20white)'/%3e%3cpath%20d='M10%206C10%207.10457%209.10457%208%208%208C6.89543%208%206%207.10457%206%206C6.5%206%208%206%208%206C8%206%208%204.5%208%204C9.10457%204%2010%204.89543%2010%206Z'%20fill='white'/%3e%3c/g%3e%3c/svg%3e";
const _sfc_main$f = {
  __name: "AppIcon",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: void 0
    },
    decorative: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const ICONS = {
      "account": {
        kind: "path",
        viewBox: "0 0 16 16",
        paths: [
          {
            d: "M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM12.8 10.8571C12.8 12.1826 10.651 13.6 8 13.6C5.34903 13.6 3.2 12.1826 3.2 10.8571C3.2 9.53166 5.34903 8.8 8 8.8C10.651 8.8 12.8 9.53166 12.8 10.8571ZM8 7.2C9.32548 7.2 10.4 6.12548 10.4 4.8C10.4 3.47452 9.32548 2.4 8 2.4C6.67452 2.4 5.6 3.47452 5.6 4.8C5.6 6.12548 6.67452 7.2 8 7.2Z",
            fillRule: "evenodd",
            clipRule: "evenodd"
          }
        ]
      },
      "header-account-authorized": {
        kind: "image",
        srcBySize: {
          16: headerAccountAuthorized16
        }
      },
      "header-sign-out-authorized": {
        kind: "image",
        srcBySize: {
          16: headerSignOutAuthorized16
        }
      },
      "favorite": {
        kind: "path",
        viewBox: "0 0 16 14.4",
        paths: [
          {
            d: "M8 1.86954C9.2 0 10.6955 0 11.6 0C14.0301 0 16 1.6 16 4.8C16 10 8.4 14.4 8 14.4C7.6 14.4 0 10 0 4.8C0 1.86954 1.96995 0 4.4 0C5.30455 0 6.8 0 8 1.86954Z"
          }
        ]
      },
      "orders": {
        kind: "path",
        viewBox: "0 0 14.9544 13.459",
        paths: [
          {
            d: "M1.49544 0C0.669533 0 0 0.669532 0 1.49544V10.4681C0 12.1199 1.33907 13.459 2.99089 13.459H10.4681V1.49544C10.4681 0.669533 9.79857 0 8.97266 0H1.49544ZM8.22493 2.99089H2.24316V4.48633H8.22493V2.99089ZM2.24316 5.98177H6.72949V7.47721H2.24316V5.98177Z",
            fillRule: "evenodd",
            clipRule: "evenodd"
          },
          {
            d: "M13.459 4.48633C14.2849 4.48633 14.9544 5.15586 14.9544 5.98177V10.4681C14.9544 12.1199 13.6154 13.459 11.9635 13.459V5.23405C11.9635 4.82109 12.2983 4.48633 12.7113 4.48633H13.459Z"
          }
        ]
      },
      "tg": {
        kind: "path",
        viewBox: "0 0 17.3621 14.3975",
        paths: [
          {
            d: "M10.5241 2.19C8.96407 2.84 5.85407 4.18 1.19407 6.21C0.434071 6.51 0.0440712 6.81 0.00407119 7.09C-0.0558014 7.57896 0.551485 7.76919 1.37879 8.02835L1.38407 8.03C1.49407 8.07 1.61407 8.1 1.73407 8.14C2.55407 8.41 3.65407 8.72 4.22407 8.73C4.74407 8.74 5.32407 8.53 5.96407 8.09C10.3241 5.15 12.5741 3.66 12.7141 3.63L12.72 3.62882C12.8195 3.60887 12.9558 3.58156 13.0441 3.66C13.1341 3.74 13.1241 3.9 13.1141 3.94C13.0541 4.2 10.6641 6.42 9.42407 7.57C9.03407 7.93 8.76407 8.18 8.70407 8.24C8.57407 8.37 8.45407 8.49 8.32407 8.61C7.56407 9.34 6.99407 9.89 8.35407 10.79C9.00407 11.22 9.53407 11.58 10.0541 11.93C10.6241 12.32 11.1941 12.7 11.9241 13.19C12.1141 13.31 12.2941 13.44 12.4641 13.56L12.4731 13.5665C13.1296 14.0339 13.7274 14.4597 14.4541 14.39C14.8841 14.35 15.3241 13.95 15.5441 12.75C16.0741 9.92 17.1141 3.78 17.3541 1.25C17.3741 1.03 17.3541 0.74 17.3241 0.62C17.3041 0.5 17.2541 0.320001 17.0941 0.190001C16.9041 0.0300005 16.6041 0 16.4741 0C15.8741 0.01 14.9441 0.33 10.5041 2.18L10.5241 2.19Z"
          }
        ]
      },
      "vk": {
        kind: "path",
        viewBox: "0 0 21.35 13.32",
        paths: [
          {
            d: "M0 0C0.17 8.32 4.33 13.32 11.63 13.32H12.04V8.56C14.72 8.83 16.75 10.79 17.56 13.32H21.35C20.31 9.53 17.58 7.44 15.87 6.64C17.58 5.65 19.98 3.25 20.55 0H17.11C16.36 2.64 14.15 5.04 12.04 5.27V0H8.6V9.23C6.47 8.7 3.77 6.11 3.65 0H0Z"
          }
        ]
      },
      "basket": {
        kind: "image",
        srcBySize: {
          12: basket12,
          16: basket16,
          24: basket24
        }
      },
      "arrow-right": {
        kind: "image",
        srcBySize: {
          16: arrowRight16,
          24: arrowRight24
        }
      },
      "ruble": {
        kind: "image",
        srcBySize: {
          12: ruble12,
          16: ruble16
        }
      },
      "cart": {
        kind: "path",
        viewBox: "0 0 15.1904 15.1886",
        paths: [
          {
            d: "M4.17193 10.5183L1.58142 2.08329C1.58142 2.08329 0.989952 2.02713 0.659995 2.01835C-0.0139601 2.00256 -0.338652 0.235182 0.507302 0.187795C0.763545 0.173754 2.90476 0 2.90476 0L3.74194 3.39961L15.1904 4.01389L13.8021 10.2023L4.17193 10.5183ZM4.37377 11.5292C6.72735 11.5292 6.78526 15.1254 4.53699 15.1254C1.86925 15.1306 2.06407 11.5292 4.37377 11.5292ZM12.3173 11.5941C14.6709 11.5941 14.7306 15.1886 12.4805 15.1886C9.8128 15.1886 10.0094 11.5941 12.3173 11.5941Z",
            fillRule: "evenodd",
            clipRule: "evenodd"
          }
        ]
      },
      "check": {
        kind: "image",
        srcBySize: {
          12: check12
        }
      },
      "cross": {
        kind: "image",
        srcBySize: {
          12: cross12
        }
      },
      "refresh": {
        kind: "image",
        srcBySize: {
          16: refresh16
        }
      },
      "show": {
        kind: "image",
        srcBySize: {
          16: show16
        }
      },
      "hide": {
        kind: "image",
        srcBySize: {
          16: hide16
        }
      },
      "close": {
        kind: "path",
        viewBox: "0 0 16 16",
        paths: [
          {
            d: "M3.46967 3.46967C3.76256 3.17678 4.23744 3.17678 4.53033 3.46967L8 6.93934L11.4697 3.46967C11.7626 3.17678 12.2374 3.17678 12.5303 3.46967C12.8232 3.76256 12.8232 4.23744 12.5303 4.53033L9.06066 8L12.5303 11.4697C12.8232 11.7626 12.8232 12.2374 12.5303 12.5303C12.2374 12.8232 11.7626 12.8232 11.4697 12.5303L8 9.06066L4.53033 12.5303C4.23744 12.8232 3.76256 12.8232 3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L6.93934 8L3.46967 4.53033C3.17678 4.23744 3.17678 3.76256 3.46967 3.46967Z",
            fillRule: "evenodd",
            clipRule: "evenodd"
          }
        ]
      },
      "reset": {
        kind: "path",
        viewBox: "0 0 16 16",
        paths: [
          {
            d: "M12.49 3.51C11.34 2.36 9.75 1.65 8 1.65C4.49 1.65 1.65 4.49 1.65 8C1.65 11.51 4.49 14.35 8 14.35C11 14.35 13.52 12.27 14.18 9.47",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          },
          {
            d: "M12.08 1.8H12.8C13.13 1.8 13.4 2.07 13.4 2.4V3.12",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ]
      },
      "arrow-right-line": {
        kind: "path",
        viewBox: "0 0 24 24",
        paths: [
          {
            d: "M5 12H19M13 6L19 12L13 18",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ]
      },
      "alert-circle": {
        kind: "path",
        viewBox: "0 0 16 16",
        paths: [
          {
            d: "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
          },
          {
            d: "M7.25 3.75H8.75V8.25H7.25V3.75ZM8 12C8.41421 12 8.75 11.6642 8.75 11.25C8.75 10.8358 8.41421 10.5 8 10.5C7.58579 10.5 7.25 10.8358 7.25 11.25C7.25 11.6642 7.58579 12 8 12Z",
            fill: "white"
          }
        ]
      },
      "password-eye": {
        kind: "path",
        viewBox: "0 0 16 12",
        paths: [
          {
            d: "M8 12C12.4183 12 16 8.31371 16 6C16 3.68629 12.4183 0 8 0C3.58172 0 0 3.68629 0 6C0 8.31371 3.58172 12 8 12ZM8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z",
            fillRule: "evenodd",
            clipRule: "evenodd",
            fillOpacity: "0.64"
          },
          {
            d: "M10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6C6.5 6 8 6 8 6C8 6 8 4.5 8 4C9.10457 4 10 4.89543 10 6Z",
            fillOpacity: "0.64"
          }
        ]
      },
      "alert": {
        kind: "image",
        srcBySize: {
          16: alert16
        }
      },
      "chevron": {
        kind: "path",
        viewBox: "0 0 16 16",
        paths: [
          {
            d: "M4.47 6.47a.75.75 0 0 1 1.06 0L8 8.94l2.47-2.47a.75.75 0 1 1 1.06 1.06L8.53 10.53a.75.75 0 0 1-1.06 0L4.47 7.53a.75.75 0 0 1 0-1.06Z"
          }
        ]
      },
      "puzzle": {
        kind: "image",
        srcBySize: {
          16: puzzle16
        }
      },
      "binky": {
        kind: "image",
        srcBySize: {
          16: binky16
        }
      },
      "calendar": {
        kind: "image",
        srcBySize: {
          16: calendar16
        }
      },
      "mir": {
        kind: "image",
        srcBySize: {
          32: mir32x62
        }
      },
      "delivery-dot": {
        kind: "dot",
        color: "#c3c6c8"
      },
      "pickup-dot": {
        kind: "dot",
        color: "#c3c6c8"
      },
      "order-dot": {
        kind: "dot",
        color: "#c3c6c8"
      }
    };
    const props = __props;
    const icon = computed(() => ICONS[props.name] || ICONS.account);
    const parsedNumericSize = computed(() => {
      if (typeof props.size === "number") return props.size;
      if (typeof props.size !== "string") return void 0;
      const normalized = props.size.trim();
      if (!normalized) return void 0;
      const value = Number.parseFloat(normalized);
      return Number.isFinite(value) ? value : void 0;
    });
    const sizeStyle = computed(() => {
      if (props.size === void 0 || props.size === null || props.size === "") return void 0;
      let raw = "";
      if (typeof props.size === "number") {
        raw = `${props.size}px`;
      } else {
        const normalized = props.size.trim();
        raw = /^\d+(\.\d+)?$/.test(normalized) ? `${normalized}px` : normalized;
      }
      return {
        width: raw,
        height: raw
      };
    });
    const ariaLabel = computed(() => {
      if (props.decorative) return void 0;
      return props.title || props.name;
    });
    function resolveImageSrc(definition, requestedSize) {
      const entries = Object.entries(definition.srcBySize).map(([size, src]) => ({ size: Number(size), src })).filter(({ size }) => Number.isFinite(size));
      if (entries.length === 0) return "";
      if (requestedSize === void 0) {
        const default16 = entries.find(({ size }) => size === 16);
        return (default16 || entries[0]).src;
      }
      const exact = entries.find(({ size }) => size === requestedSize);
      if (exact) return exact.src;
      return entries.slice().sort((a, b) => Math.abs(a.size - requestedSize) - Math.abs(b.size - requestedSize))[0].src;
    }
    const imageSrc = computed(() => {
      if (icon.value.kind !== "image") return "";
      return resolveImageSrc(icon.value, parsedNumericSize.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: "app-icon",
        style: unref(sizeStyle),
        "aria-hidden": __props.decorative,
        role: __props.decorative ? void 0 : "img",
        "aria-label": unref(ariaLabel)
      }, _attrs))} data-v-985d4b39>`);
      if (unref(icon).kind === "path") {
        _push(`<svg${ssrRenderAttr("viewBox", unref(icon).viewBox)} fill="none" xmlns="http://www.w3.org/2000/svg" class="app-icon__svg" data-v-985d4b39><!--[-->`);
        ssrRenderList(unref(icon).paths, (path, index2) => {
          _push(`<path${ssrRenderAttr("d", path.d)}${ssrRenderAttr("fill-rule", path.fillRule)}${ssrRenderAttr("clip-rule", path.clipRule)}${ssrRenderAttr("fill", path.fill || (path.stroke ? "none" : "currentColor"))}${ssrRenderAttr("fill-opacity", path.fillOpacity)}${ssrRenderAttr("stroke", path.stroke)}${ssrRenderAttr("stroke-width", path.strokeWidth)}${ssrRenderAttr("stroke-linecap", path.strokeLinecap)}${ssrRenderAttr("stroke-linejoin", path.strokeLinejoin)} data-v-985d4b39></path>`);
        });
        _push(`<!--]--></svg>`);
      } else if (unref(icon).kind === "image") {
        _push(`<img${ssrRenderAttr("src", unref(imageSrc))} alt="" class="app-icon__image" data-v-985d4b39>`);
      } else {
        _push(`<span class="app-icon__dot" style="${ssrRenderStyle({ backgroundColor: unref(icon).color })}" data-v-985d4b39></span>`);
      }
      _push(`</span>`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppIcon.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-985d4b39"]]);
function pointerDownOutside(e, options = {}) {
  const originalEvent = e.detail.originalEvent;
  const target = originalEvent.target;
  if (!target?.isConnected) {
    e.preventDefault();
    return;
  }
  if (options.scrollable) {
    if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
      e.preventDefault();
    }
  }
}
const theme$1 = {
  "slots": {
    "overlay": "fixed inset-0",
    "content": "bg-default divide-y divide-default flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
    "wrapper": "",
    "body": "flex-1 p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
        "content": "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]"
      }
    },
    "fullscreen": {
      "true": {
        "content": "inset-0"
      },
      "false": {
        "content": "w-[calc(100vw-2rem)] max-w-lg rounded-lg shadow-lg ring ring-default"
      }
    },
    "overlay": {
      "true": {
        "overlay": "bg-elevated/75"
      }
    },
    "scrollable": {
      "true": {
        "overlay": "overflow-y-auto",
        "content": "relative"
      },
      "false": {
        "content": "fixed",
        "body": "overflow-y-auto"
      }
    }
  },
  "compoundVariants": [
    {
      "scrollable": true,
      "fullscreen": false,
      "class": {
        "overlay": "grid place-items-center p-4 sm:py-8"
      }
    },
    {
      "scrollable": false,
      "fullscreen": false,
      "class": {
        "content": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden"
      }
    }
  ]
};
const _sfc_main$e = {
  __name: "UModal",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    scrollable: { type: Boolean, required: false },
    transition: { type: Boolean, required: false, default: true },
    fullscreen: { type: Boolean, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: null, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig2 = useAppConfig();
    const uiProp = useComponentUI("modal", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => props.content);
    const contentEvents = computed(() => {
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {
        pointerDownOutside: (e) => pointerDownOutside(e, { scrollable: props.scrollable })
      };
    });
    const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig2.ui?.modal || {} })({
      transition: props.transition,
      fullscreen: props.fullscreen,
      overlay: props.overlay,
      scrollable: props.scrollable
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DefineContentTemplate), null, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DialogContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description))) {
                          _push4(ssrRenderComponent(unref(VisuallyHidden), null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (__props.title || !!slots.title) {
                                  _push5(ssrRenderComponent(unref(DialogTitle), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                          _push6(`${ssrInterpolate(__props.title)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (__props.description || !!slots.description) {
                                  _push5(ssrRenderComponent(unref(DialogDescription), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                          _push6(`${ssrInterpolate(__props.description)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "content", { close }, () => {
                          if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close)) {
                            _push4(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(uiProp)?.header }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "header", { close }, () => {
                              _push4(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(uiProp)?.wrapper }))}"${_scopeId3}>`);
                              if (__props.title || !!slots.title) {
                                _push4(ssrRenderComponent(unref(DialogTitle), {
                                  "data-slot": "title",
                                  class: ui.value.title({ class: unref(uiProp)?.title })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                        _push5(`${ssrInterpolate(__props.title)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString(__props.title), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (__props.description || !!slots.description) {
                                _push4(ssrRenderComponent(unref(DialogDescription), {
                                  "data-slot": "description",
                                  class: ui.value.description({ class: unref(uiProp)?.description })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                        _push5(`${ssrInterpolate(__props.description)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString(__props.description), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                              ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push4, _parent4, _scopeId3);
                              if (props.close || !!slots.close) {
                                _push4(ssrRenderComponent(unref(DialogClose), { "as-child": "" }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                        if (props.close) {
                                          _push5(ssrRenderComponent(_sfc_main$m, mergeProps({
                                            icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: unref(uiProp)?.close })
                                          }), null, _parent5, _scopeId4));
                                        } else {
                                          _push5(`<!---->`);
                                        }
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                          props.close ? (openBlock(), createBlock(_sfc_main$m, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: unref(uiProp)?.close })
                                          }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.body) {
                            _push4(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(uiProp)?.body }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "body", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.footer) {
                            _push4(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(uiProp)?.footer }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "footer", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                            default: withCtx(() => [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true)
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "content", { close }, () => [
                            !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                              key: 0,
                              "data-slot": "header",
                              class: ui.value.header({ class: unref(uiProp)?.header })
                            }, [
                              renderSlot(_ctx.$slots, "header", { close }, () => [
                                createVNode("div", {
                                  "data-slot": "wrapper",
                                  class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                                }, [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: unref(uiProp)?.title })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: unref(uiProp)?.description })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "actions"),
                                props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                  key: 0,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                      props.close ? (openBlock(), createBlock(_sfc_main$m, mergeProps({
                                        key: 0,
                                        icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                                        color: "neutral",
                                        variant: "ghost",
                                        "aria-label": unref(t)("modal.close")
                                      }, typeof props.close === "object" ? props.close : {}, {
                                        "data-slot": "close",
                                        class: ui.value.close({ class: unref(uiProp)?.close })
                                      }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            !!slots.body ? (openBlock(), createBlock("div", {
                              key: 1,
                              "data-slot": "body",
                              class: ui.value.body({ class: unref(uiProp)?.body })
                            }, [
                              renderSlot(_ctx.$slots, "body", { close })
                            ], 2)) : createCommentVNode("", true),
                            !!slots.footer ? (openBlock(), createBlock("div", {
                              key: 2,
                              "data-slot": "footer",
                              class: ui.value.footer({ class: unref(uiProp)?.footer })
                            }, [
                              renderSlot(_ctx.$slots, "footer", { close })
                            ], 2)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DialogContent), mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                    }, contentProps.value, {
                      onAfterEnter: ($event) => emits("after:enter"),
                      onAfterLeave: ($event) => emits("after:leave")
                    }, toHandlers(contentEvents.value)), {
                      default: withCtx(() => [
                        !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                          default: withCtx(() => [
                            __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "title", {}, () => [
                                  createTextVNode(toDisplayString(__props.title), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true),
                            __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "description", {}, () => [
                                  createTextVNode(toDisplayString(__props.description), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true)
                          ]),
                          _: 3
                        })) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "content", { close }, () => [
                          !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                            key: 0,
                            "data-slot": "header",
                            class: ui.value.header({ class: unref(uiProp)?.header })
                          }, [
                            renderSlot(_ctx.$slots, "header", { close }, () => [
                              createVNode("div", {
                                "data-slot": "wrapper",
                                class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                              }, [
                                __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                  key: 0,
                                  "data-slot": "title",
                                  class: ui.value.title({ class: unref(uiProp)?.title })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString(__props.title), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true),
                                __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                  key: 1,
                                  "data-slot": "description",
                                  class: ui.value.description({ class: unref(uiProp)?.description })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(__props.description), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true)
                              ], 2),
                              renderSlot(_ctx.$slots, "actions"),
                              props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                key: 0,
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                    props.close ? (openBlock(), createBlock(_sfc_main$m, mergeProps({
                                      key: 0,
                                      icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                                      color: "neutral",
                                      variant: "ghost",
                                      "aria-label": unref(t)("modal.close")
                                    }, typeof props.close === "object" ? props.close : {}, {
                                      "data-slot": "close",
                                      class: ui.value.close({ class: unref(uiProp)?.close })
                                    }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          !!slots.body ? (openBlock(), createBlock("div", {
                            key: 1,
                            "data-slot": "body",
                            class: ui.value.body({ class: unref(uiProp)?.body })
                          }, [
                            renderSlot(_ctx.$slots, "body", { close })
                          ], 2)) : createCommentVNode("", true),
                          !!slots.footer ? (openBlock(), createBlock("div", {
                            key: 2,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: unref(uiProp)?.footer })
                          }, [
                            renderSlot(_ctx.$slots, "footer", { close })
                          ], 2)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1040, ["class", "onAfterEnter", "onAfterLeave"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(DialogTrigger), {
                "as-child": "",
                class: props.class
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(DialogPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.scrollable) {
                    _push3(ssrRenderComponent(unref(DialogOverlay), {
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ReuseContentTemplate))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->`);
                    if (__props.overlay) {
                      _push3(ssrRenderComponent(unref(DialogOverlay), {
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  }
                } else {
                  return [
                    __props.scrollable ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ReuseContentTemplate))
                      ]),
                      _: 1
                    }, 8, ["class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                        key: 0,
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                      }, null, 8, ["class"])) : createCommentVNode("", true),
                      createVNode(unref(ReuseContentTemplate))
                    ], 64))
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DefineContentTemplate), null, {
                default: withCtx(() => [
                  createVNode(unref(DialogContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx(() => [
                      !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                        default: withCtx(() => [
                          __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "title", {}, () => [
                                createTextVNode(toDisplayString(__props.title), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "description", {}, () => [
                                createTextVNode(toDisplayString(__props.description), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true)
                        ]),
                        _: 3
                      })) : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "content", { close }, () => [
                        !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                          key: 0,
                          "data-slot": "header",
                          class: ui.value.header({ class: unref(uiProp)?.header })
                        }, [
                          renderSlot(_ctx.$slots, "header", { close }, () => [
                            createVNode("div", {
                              "data-slot": "wrapper",
                              class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                            }, [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                key: 0,
                                "data-slot": "title",
                                class: ui.value.title({ class: unref(uiProp)?.title })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                key: 1,
                                "data-slot": "description",
                                class: ui.value.description({ class: unref(uiProp)?.description })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true)
                            ], 2),
                            renderSlot(_ctx.$slots, "actions"),
                            props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                              key: 0,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                  props.close ? (openBlock(), createBlock(_sfc_main$m, mergeProps({
                                    key: 0,
                                    icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                                    color: "neutral",
                                    variant: "ghost",
                                    "aria-label": unref(t)("modal.close")
                                  }, typeof props.close === "object" ? props.close : {}, {
                                    "data-slot": "close",
                                    class: ui.value.close({ class: unref(uiProp)?.close })
                                  }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        !!slots.body ? (openBlock(), createBlock("div", {
                          key: 1,
                          "data-slot": "body",
                          class: ui.value.body({ class: unref(uiProp)?.body })
                        }, [
                          renderSlot(_ctx.$slots, "body", { close })
                        ], 2)) : createCommentVNode("", true),
                        !!slots.footer ? (openBlock(), createBlock("div", {
                          key: 2,
                          "data-slot": "footer",
                          class: ui.value.footer({ class: unref(uiProp)?.footer })
                        }, [
                          renderSlot(_ctx.$slots, "footer", { close })
                        ], 2)) : createCommentVNode("", true)
                      ])
                    ]),
                    _: 2
                  }, 1040, ["class", "onAfterEnter", "onAfterLeave"])
                ]),
                _: 2
              }, 1024),
              !!slots.default ? (openBlock(), createBlock(unref(DialogTrigger), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class"])) : createCommentVNode("", true),
              createVNode(unref(DialogPortal), unref(portalProps), {
                default: withCtx(() => [
                  __props.scrollable ? (openBlock(), createBlock(unref(DialogOverlay), {
                    key: 0,
                    "data-slot": "overlay",
                    class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ReuseContentTemplate))
                    ]),
                    _: 1
                  }, 8, ["class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, null, 8, ["class"])) : createCommentVNode("", true),
                    createVNode(unref(ReuseContentTemplate))
                  ], 64))
                ]),
                _: 1
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Modal.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = {
  __name: "AuthSuccessView",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const flow = inject("authFlow");
    const successTitle = flow.successTitle;
    const successDescription = flow.successDescription;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppIcon = __nuxt_component_1$2;
      _push(`<!--[--><button type="button" class="auth-entry__success-close" aria-label="Закрыть окно регистрации" data-v-4777aa4f>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "close",
        size: 16,
        class: "auth-entry__success-close-icon"
      }, null, _parent));
      _push(`</button><div class="auth-entry__success-content" data-v-4777aa4f><div class="auth-entry__success-main" data-v-4777aa4f><div class="auth-entry__success-header" data-v-4777aa4f><span class="auth-entry__success-mark" data-v-4777aa4f></span><h2 class="auth-entry__success-title" data-v-4777aa4f>${ssrInterpolate(unref(successTitle))}</h2></div><p class="auth-entry__success-description" data-v-4777aa4f>${ssrInterpolate(unref(successDescription))}</p></div><button type="button" class="auth-entry__success-button" data-v-4777aa4f> К покупкам </button></div><!--]-->`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/AuthSuccessView.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-4777aa4f"]]);
const _sfc_main$c = {
  __name: "AuthEntryForm",
  __ssrInlineRender: true,
  setup(__props) {
    const flow = inject("authFlow");
    const visibleError = flow.visibleError;
    const hasIdentifier = flow.hasIdentifier;
    const isEntryRequestPending = flow.isEntryRequestPending;
    const inputMode = flow.inputMode;
    const identifier = flow.identifier;
    const entryRequestError = flow.entryRequestError;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppIcon = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["auth-entry__field", { "auth-entry__field--invalid": unref(visibleError) }]
      }, _attrs))} data-v-3750e938><label class="auth-entry__label" for="auth-entry-identifier" data-v-3750e938> Почта или телефон </label><span class="auth-entry__input-row" data-v-3750e938><span class="auth-entry__input-box" data-v-3750e938><input id="auth-entry-identifier"${ssrRenderAttr("value", unref(identifier))} class="auth-entry__input" type="text" placeholder="Email или телефон" autocomplete="username"${ssrRenderAttr("inputmode", unref(inputMode))}${ssrRenderAttr("aria-invalid", Boolean(unref(visibleError)))}${ssrRenderAttr("aria-describedby", unref(visibleError) ? "auth-entry-error" : void 0)} data-v-3750e938>`);
      if (unref(visibleError)) {
        _push(`<button type="button" class="auth-entry__reset" aria-label="Сбросить поле" data-v-3750e938>`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "reset",
          size: 16,
          class: "auth-entry__reset-icon"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span>`);
      if (unref(hasIdentifier)) {
        _push(`<button type="submit" class="auth-entry__submit"${ssrIncludeBooleanAttr(unref(isEntryRequestPending)) ? " disabled" : ""}${ssrRenderAttr("aria-label", unref(isEntryRequestPending) ? "Проверяем" : "Продолжить")} data-v-3750e938>`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "arrow-right-line",
          size: 24,
          class: "auth-entry__submit-icon"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span>`);
      if (unref(visibleError) || unref(entryRequestError)) {
        _push(`<p id="auth-entry-error" class="auth-entry__error" data-v-3750e938>${ssrInterpolate(unref(visibleError) || unref(entryRequestError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/AuthEntryForm.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-3750e938"]]);
const _sfc_main$b = {
  __name: "AuthLoginForm",
  __ssrInlineRender: true,
  setup(__props) {
    const flow = inject("authFlow");
    const visibleError = flow.visibleError;
    const identifier = flow.identifier;
    const inputMode = flow.inputMode;
    const password = flow.password;
    const passwordInputType = flow.passwordInputType;
    const visibleLoginPasswordError = flow.visibleLoginPasswordError;
    const isPasswordVisible = flow.isPasswordVisible;
    const loginRequestError = flow.loginRequestError;
    const isLoginRequestPending = flow.isLoginRequestPending;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppIcon = __nuxt_component_1$2;
      _push(`<!--[--><div class="auth-entry__login-fields" data-v-4255afb3><div class="${ssrRenderClass([{ "auth-entry__field--invalid": unref(visibleError) }, "auth-entry__field auth-entry__field--compact auth-entry__login-identifier-field"])}" data-v-4255afb3><label class="auth-entry__label" for="auth-entry-login-identifier" data-v-4255afb3> Email или телефон </label><input id="auth-entry-login-identifier"${ssrRenderAttr("value", unref(identifier))} class="auth-entry__input auth-entry__input--compact" type="text" placeholder="Email или телефон" autocomplete="username"${ssrRenderAttr("inputmode", unref(inputMode))}${ssrRenderAttr("aria-invalid", Boolean(unref(visibleError)))}${ssrRenderAttr("aria-describedby", unref(visibleError) ? "auth-entry-login-error" : void 0)} data-v-4255afb3>`);
      if (unref(visibleError)) {
        _push(`<p id="auth-entry-login-error" class="auth-entry__error" data-v-4255afb3>${ssrInterpolate(unref(visibleError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass([{ "auth-entry__field--invalid": unref(visibleLoginPasswordError) }, "auth-entry__field auth-entry__field--compact auth-entry__password-field"])}" data-v-4255afb3><label class="auth-entry__label" for="auth-entry-login-password" data-v-4255afb3> Пароль </label><span class="auth-entry__password-box" data-v-4255afb3><input id="auth-entry-login-password"${ssrRenderDynamicModel(unref(passwordInputType), unref(password), null)} class="auth-entry__input auth-entry__input--compact auth-entry__input--password"${ssrRenderAttr("type", unref(passwordInputType))} placeholder="Введите пароль" autocomplete="current-password"${ssrRenderAttr("aria-invalid", Boolean(unref(visibleLoginPasswordError)))}${ssrRenderAttr("aria-describedby", unref(visibleLoginPasswordError) ? "auth-entry-login-password-error" : void 0)} data-v-4255afb3><button type="button" class="auth-entry__password-toggle"${ssrRenderAttr("aria-label", unref(isPasswordVisible) ? "Скрыть пароль" : "Показать пароль")} data-v-4255afb3>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "password-eye",
        size: 16,
        class: "auth-entry__password-toggle-icon"
      }, null, _parent));
      _push(`</button></span>`);
      if (unref(visibleLoginPasswordError)) {
        _push(`<p id="auth-entry-login-password-error" class="auth-entry__error" data-v-4255afb3>${ssrInterpolate(unref(visibleLoginPasswordError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="auth-entry__forgot-password" data-v-4255afb3> Забыли пароль? </button></div></div>`);
      if (unref(loginRequestError)) {
        _push(`<p class="auth-entry__request-status auth-entry__request-status--error" data-v-4255afb3>${ssrInterpolate(unref(loginRequestError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="auth-entry__login-actions" data-v-4255afb3><button type="submit" class="auth-entry__login-button"${ssrIncludeBooleanAttr(unref(isLoginRequestPending)) ? " disabled" : ""} data-v-4255afb3>${ssrInterpolate(unref(isLoginRequestPending) ? "Входим" : "Войти")}</button></div><!--]-->`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/AuthLoginForm.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-4255afb3"]]);
const _sfc_main$a = {
  __name: "AppCheckbox",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    label: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }, {
    "modelValue": { type: Boolean, default: false },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({
        class: [
          "app-checkbox",
          { "app-checkbox--checked": model.value, "app-checkbox--disabled": __props.disabled }
        ]
      }, _attrs))} data-v-5c83338d><input${ssrIncludeBooleanAttr(Array.isArray(model.value) ? ssrLooseContain(model.value, null) : model.value) ? " checked" : ""} type="checkbox" class="app-checkbox__input"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-5c83338d><span class="app-checkbox__box" data-v-5c83338d>`);
      if (model.value) {
        _push(`<svg class="app-checkbox__icon" viewBox="0 0 16 16" fill="none" data-v-5c83338d><path d="M3.5 8.5L6.5 11.5L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-5c83338d></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span>`);
      if (__props.label) {
        _push(`<span class="app-checkbox__label" data-v-5c83338d>${ssrInterpolate(__props.label)}</span>`);
      } else {
        _push(`<span class="app-checkbox__label" data-v-5c83338d>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppCheckbox.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-5c83338d"]]);
const _sfc_main$9 = {
  __name: "AuthRegisterStartForm",
  __ssrInlineRender: true,
  setup(__props) {
    const flow = inject("authFlow");
    const fullName = flow.fullName;
    const registrationPhone = flow.registrationPhone;
    const canRequestCode = flow.canRequestCode;
    const isCodeRequestPending = flow.isCodeRequestPending;
    const codeButtonText = flow.codeButtonText;
    const codeRequestError = flow.codeRequestError;
    const isCodeRequestSent = flow.isCodeRequestSent;
    const isLegalRepresentative = flow.isLegalRepresentative;
    const isPersonalDataAccepted = flow.isPersonalDataAccepted;
    const isUserAgreementAccepted = flow.isUserAgreementAccepted;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppCheckbox = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<!--[--><div class="auth-entry__registration-fields" data-v-68307a03><div class="auth-entry__field auth-entry__field--compact auth-entry__name-field" data-v-68307a03><label class="auth-entry__label" for="auth-entry-name" data-v-68307a03> Имя и фамилия </label><input id="auth-entry-name"${ssrRenderAttr("value", unref(fullName))} class="auth-entry__input auth-entry__input--compact" type="text" placeholder="Иван Иванов" autocomplete="name" data-v-68307a03></div><div class="auth-entry__registration-phone" data-v-68307a03><div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field" data-v-68307a03><label class="auth-entry__label" for="auth-entry-phone" data-v-68307a03> Номер телефона </label><input id="auth-entry-phone"${ssrRenderAttr("value", unref(registrationPhone))} class="auth-entry__input auth-entry__input--compact auth-entry__input--phone" type="tel" placeholder="+7(999)-999-99-99" autocomplete="tel" inputmode="tel" data-v-68307a03></div><button type="button" class="auth-entry__code-button"${ssrIncludeBooleanAttr(!unref(canRequestCode) || unref(isCodeRequestPending)) ? " disabled" : ""} data-v-68307a03>${ssrInterpolate(unref(codeButtonText))}</button></div><p class="auth-entry__hint" data-v-68307a03> После продолжения заполните почту и пароль для завершения регистрации </p>`);
      if (unref(codeRequestError)) {
        _push(`<p class="auth-entry__request-status auth-entry__request-status--error" data-v-68307a03>${ssrInterpolate(unref(codeRequestError))}</p>`);
      } else if (unref(isCodeRequestSent)) {
        _push(`<p class="auth-entry__request-status" data-v-68307a03> Код отправлен </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="auth-entry__checkboxes" data-v-68307a03>`);
      _push(ssrRenderComponent(_component_AppCheckbox, {
        modelValue: unref(isLegalRepresentative),
        "onUpdate:modelValue": ($event) => isRef(isLegalRepresentative) ? isLegalRepresentative.value = $event : null,
        class: "auth-entry__checkbox"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="auth-entry__checkbox-text" data-v-68307a03${_scopeId}> Я представитель юрлица или ИП </span>`);
          } else {
            return [
              createVNode("span", { class: "auth-entry__checkbox-text" }, " Я представитель юрлица или ИП ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AppCheckbox, {
        modelValue: unref(isPersonalDataAccepted),
        "onUpdate:modelValue": ($event) => isRef(isPersonalDataAccepted) ? isPersonalDataAccepted.value = $event : null,
        class: "auth-entry__checkbox auth-entry__checkbox--top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="auth-entry__checkbox-text" data-v-68307a03${_scopeId}> Я ознакомлен и согласен `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/privacy-policy",
              class: "auth-entry__link",
              onClick: () => {
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` с Политикой обработки персональных данных `);
                } else {
                  return [
                    createTextVNode(" с Политикой обработки персональных данных ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "auth-entry__checkbox-text" }, [
                createTextVNode(" Я ознакомлен и согласен "),
                createVNode(_component_NuxtLink, {
                  to: "/privacy-policy",
                  class: "auth-entry__link",
                  onClick: withModifiers(() => {
                  }, ["stop"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" с Политикой обработки персональных данных ")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AppCheckbox, {
        modelValue: unref(isUserAgreementAccepted),
        "onUpdate:modelValue": ($event) => isRef(isUserAgreementAccepted) ? isUserAgreementAccepted.value = $event : null,
        class: "auth-entry__checkbox auth-entry__checkbox--top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="auth-entry__checkbox-text" data-v-68307a03${_scopeId}> Я ознакомлен и согласен `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/user-agreement",
              class: "auth-entry__link",
              onClick: () => {
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` с Пользовательским соглашением `);
                } else {
                  return [
                    createTextVNode(" с Пользовательским соглашением ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "auth-entry__checkbox-text" }, [
                createTextVNode(" Я ознакомлен и согласен "),
                createVNode(_component_NuxtLink, {
                  to: "/user-agreement",
                  class: "auth-entry__link",
                  onClick: withModifiers(() => {
                  }, ["stop"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" с Пользовательским соглашением ")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/AuthRegisterStartForm.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_5$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-68307a03"]]);
const _sfc_main$8 = {
  __name: "AuthRegisterCompleteForm",
  __ssrInlineRender: true,
  setup(__props) {
    const flow = inject("authFlow");
    const fullName = flow.fullName;
    const isSmsCodeConfirmed = flow.isSmsCodeConfirmed;
    const isPhoneConfirmed = flow.isPhoneConfirmed;
    const registrationPhone = flow.registrationPhone;
    const isSmsCodeInvalid = flow.isSmsCodeInvalid;
    const smsCode = flow.smsCode;
    const smsCodePlaceholder = flow.smsCodePlaceholder;
    const SMS_CODE_LENGTH = flow.SMS_CODE_LENGTH;
    const canResendCode = flow.canResendCode;
    const resendButtonText = flow.resendButtonText;
    const codeRequestError = flow.codeRequestError;
    const codeVerifyError = flow.codeVerifyError;
    const isCodeVerifyPending = flow.isCodeVerifyPending;
    const registrationEmail = flow.registrationEmail;
    const visibleRegistrationEmailError = flow.visibleRegistrationEmailError;
    const password = flow.password;
    const passwordInputType = flow.passwordInputType;
    const visiblePasswordError = flow.visiblePasswordError;
    const isPasswordVisible = flow.isPasswordVisible;
    const registrationRequestError = flow.registrationRequestError;
    const isRegistrationRequestPending = flow.isRegistrationRequestPending;
    const isLegalRepresentative = flow.isLegalRepresentative;
    watch(isPhoneConfirmed, (confirmed) => {
      if (confirmed) {
        flow.stopResendTimer();
        nextTick(() => {
          (void 0).getElementById("auth-entry-email")?.focus();
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppIcon = __nuxt_component_1$2;
      const _component_AppCheckbox = __nuxt_component_1;
      _push(`<!--[--><div class="auth-entry__registration-fields" data-v-238d3af8><div class="auth-entry__field auth-entry__field--compact auth-entry__name-field" data-v-238d3af8><label class="auth-entry__label" for="auth-entry-code-name" data-v-238d3af8> Имя и фамилия </label><input id="auth-entry-code-name"${ssrRenderAttr("value", unref(fullName))} class="auth-entry__input auth-entry__input--compact" type="text" placeholder="Иван Иванов" autocomplete="name" data-v-238d3af8></div><div class="auth-entry__code-fields" data-v-238d3af8>`);
      if (unref(isSmsCodeConfirmed)) {
        _push(`<div class="auth-entry__registration-phone auth-entry__registration-phone--confirmed" data-v-238d3af8><div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field auth-entry__phone-field--confirmed" data-v-238d3af8><label class="auth-entry__label" for="auth-entry-confirmed-phone" data-v-238d3af8> Номер телефона </label><input id="auth-entry-confirmed-phone"${ssrRenderAttr("value", unref(registrationPhone))} class="auth-entry__input auth-entry__input--compact auth-entry__input--phone auth-entry__input--confirmed" type="tel" autocomplete="tel" readonly data-v-238d3af8></div><div class="auth-entry__confirmed-badge" data-v-238d3af8> Подтверждён </div></div>`);
      } else {
        _push(`<!--[--><div class="auth-entry__registration-phone auth-entry__registration-phone--code" data-v-238d3af8><div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field" data-v-238d3af8><label class="auth-entry__label" for="auth-entry-code-phone" data-v-238d3af8> Номер телефона </label><input id="auth-entry-code-phone"${ssrRenderAttr("value", unref(registrationPhone))} class="auth-entry__input auth-entry__input--compact auth-entry__input--phone" type="tel" placeholder="+7(999)-999-99-99" autocomplete="tel" inputmode="tel" readonly data-v-238d3af8></div><div class="${ssrRenderClass([{ "auth-entry__sms-code-field--invalid": unref(isSmsCodeInvalid) }, "auth-entry__field auth-entry__field--compact auth-entry__sms-code-field"])}" data-v-238d3af8><label class="auth-entry__label" for="auth-entry-sms-code" data-v-238d3af8> Код из СМС </label><span class="auth-entry__sms-code-box" data-v-238d3af8><input id="auth-entry-sms-code"${ssrRenderAttr("value", unref(smsCode))} class="auth-entry__input auth-entry__input--compact auth-entry__input--sms-code" type="text"${ssrRenderAttr("placeholder", unref(smsCodePlaceholder))} autocomplete="one-time-code" inputmode="numeric"${ssrRenderAttr("maxlength", unref(SMS_CODE_LENGTH))}${ssrRenderAttr("aria-invalid", unref(isSmsCodeInvalid))} data-v-238d3af8>`);
        if (unref(isSmsCodeInvalid)) {
          _push(ssrRenderComponent(_component_AppIcon, {
            name: "alert-circle",
            size: 16,
            class: "auth-entry__sms-code-error-icon"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</span></div></div><button type="button" class="${ssrRenderClass([{ "auth-entry__resend--active": unref(canResendCode) }, "auth-entry__resend"])}"${ssrIncludeBooleanAttr(!unref(canResendCode)) ? " disabled" : ""} data-v-238d3af8>${ssrInterpolate(unref(resendButtonText))}</button>`);
        if (unref(codeRequestError) || unref(codeVerifyError)) {
          _push(`<p class="auth-entry__request-status auth-entry__request-status--error" data-v-238d3af8>${ssrInterpolate(unref(codeRequestError) || unref(codeVerifyError))}</p>`);
        } else if (unref(isCodeVerifyPending)) {
          _push(`<p class="auth-entry__request-status" data-v-238d3af8> Проверяем код </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
      if (unref(isSmsCodeConfirmed)) {
        _push(`<div class="auth-entry__profile-fields" data-v-238d3af8><div class="${ssrRenderClass([{ "auth-entry__field--invalid": unref(visibleRegistrationEmailError) }, "auth-entry__field auth-entry__field--compact auth-entry__email-field"])}" data-v-238d3af8><label class="auth-entry__label" for="auth-entry-email" data-v-238d3af8> Электронная почта </label><input id="auth-entry-email"${ssrRenderAttr("value", unref(registrationEmail))} class="auth-entry__input auth-entry__input--compact" type="text" placeholder="mail@example.com" autocomplete="email" inputmode="email"${ssrRenderAttr("aria-invalid", Boolean(unref(visibleRegistrationEmailError)))}${ssrRenderAttr("aria-describedby", unref(visibleRegistrationEmailError) ? "auth-entry-email-error" : void 0)} data-v-238d3af8>`);
        if (unref(visibleRegistrationEmailError)) {
          _push(`<p id="auth-entry-email-error" class="auth-entry__error" data-v-238d3af8>${ssrInterpolate(unref(visibleRegistrationEmailError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="${ssrRenderClass([{ "auth-entry__field--invalid": unref(visiblePasswordError) }, "auth-entry__field auth-entry__field--compact auth-entry__password-field"])}" data-v-238d3af8><label class="auth-entry__label" for="auth-entry-password" data-v-238d3af8> Пароль </label><span class="auth-entry__password-box" data-v-238d3af8><input id="auth-entry-password"${ssrRenderDynamicModel(unref(passwordInputType), unref(password), null)} class="auth-entry__input auth-entry__input--compact auth-entry__input--password"${ssrRenderAttr("type", unref(passwordInputType))} placeholder="Введите пароль" autocomplete="new-password"${ssrRenderAttr("aria-invalid", Boolean(unref(visiblePasswordError)))}${ssrRenderAttr("aria-describedby", unref(visiblePasswordError) ? "auth-entry-password-error" : void 0)} data-v-238d3af8><button type="button" class="auth-entry__password-toggle"${ssrRenderAttr("aria-label", unref(isPasswordVisible) ? "Скрыть пароль" : "Показать пароль")} data-v-238d3af8>`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "password-eye",
          size: 16,
          class: "auth-entry__password-toggle-icon"
        }, null, _parent));
        _push(`</button></span>`);
        if (unref(visiblePasswordError)) {
          _push(`<p id="auth-entry-password-error" class="auth-entry__error" data-v-238d3af8>${ssrInterpolate(unref(visiblePasswordError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="auth-entry__checkboxes auth-entry__checkboxes--code" data-v-238d3af8>`);
      _push(ssrRenderComponent(_component_AppCheckbox, {
        modelValue: unref(isLegalRepresentative),
        "onUpdate:modelValue": ($event) => isRef(isLegalRepresentative) ? isLegalRepresentative.value = $event : null,
        class: "auth-entry__checkbox"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="auth-entry__checkbox-text" data-v-238d3af8${_scopeId}> Я представитель юрлица или ИП </span>`);
          } else {
            return [
              createVNode("span", { class: "auth-entry__checkbox-text" }, " Я представитель юрлица или ИП ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(registrationRequestError)) {
        _push(`<p class="auth-entry__request-status auth-entry__request-status--error" data-v-238d3af8>${ssrInterpolate(unref(registrationRequestError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isSmsCodeConfirmed)) {
        _push(`<button type="submit" class="auth-entry__register-button"${ssrIncludeBooleanAttr(unref(isRegistrationRequestPending)) ? " disabled" : ""} data-v-238d3af8>${ssrInterpolate(unref(isRegistrationRequestPending) ? "Регистрируем" : "Зарегистрироваться")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/AuthRegisterCompleteForm.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$8, [["__scopeId", "data-v-238d3af8"]]), { __name: "AuthRegisterCompleteForm" });
const _sfc_main$7 = {
  __name: "AuthLegalForm",
  __ssrInlineRender: true,
  setup(__props) {
    const flow = inject("authFlow");
    const step = flow.step;
    const organizationInn = flow.organizationInn;
    const shouldShowOrganizationSuggestions = flow.shouldShowOrganizationSuggestions;
    const isOrganizationSuggestPending = flow.isOrganizationSuggestPending;
    const organizationSuggestError = flow.organizationSuggestError;
    const organizationSuggestions = flow.organizationSuggestions;
    const selectedOrganization = flow.selectedOrganization;
    const isOrganizationSavePending = flow.isOrganizationSavePending;
    const organizationSaveError = flow.organizationSaveError;
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(step) === "legal-details") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-entry__field auth-entry__field--legal-inn" }, _attrs))} data-v-f2dab6d2><label class="auth-entry__label" for="auth-entry-organization-inn" data-v-f2dab6d2> ИНН </label><input id="auth-entry-organization-inn"${ssrRenderAttr("value", unref(organizationInn))} class="auth-entry__input" type="text" placeholder="Введите ИНН компании" autocomplete="off" inputmode="numeric" maxlength="12" data-v-f2dab6d2>`);
        if (unref(shouldShowOrganizationSuggestions)) {
          _push(`<div class="auth-entry__organization-options" data-v-f2dab6d2>`);
          if (unref(isOrganizationSuggestPending)) {
            _push(`<p class="auth-entry__organization-status" data-v-f2dab6d2> Ищем организацию </p>`);
          } else if (unref(organizationSuggestError)) {
            _push(`<p class="auth-entry__organization-status auth-entry__organization-status--error" data-v-f2dab6d2>${ssrInterpolate(unref(organizationSuggestError))}</p>`);
          } else {
            _push(`<!--[-->`);
            ssrRenderList(unref(organizationSuggestions), (suggestion) => {
              _push(`<button type="button" class="auth-entry__organization-option" data-v-f2dab6d2><span class="auth-entry__organization-name" data-v-f2dab6d2>${ssrInterpolate(suggestion.name)}</span>`);
              if (suggestion.inn) {
                _push(`<span class="auth-entry__organization-inn" data-v-f2dab6d2><span class="auth-entry__organization-inn-prefix" data-v-f2dab6d2>ИНН</span> ${ssrInterpolate(suggestion.inn)}</span>`);
              } else {
                _push(`<!---->`);
              }
              if (suggestion.address) {
                _push(`<span class="auth-entry__organization-address" data-v-f2dab6d2>${ssrInterpolate(suggestion.address)}</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</button>`);
            });
            _push(`<!--]-->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else if (unref(step) === "legal-confirmation") {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-f2dab6d2>`);
        if (unref(selectedOrganization)) {
          _push(`<div class="auth-entry__organization-confirm-card" data-v-f2dab6d2><p class="auth-entry__organization-confirm-name" data-v-f2dab6d2>${ssrInterpolate(unref(selectedOrganization).name)}</p>`);
          if (unref(selectedOrganization).inn) {
            _push(`<p class="auth-entry__organization-confirm-meta" data-v-f2dab6d2> ИНН ${ssrInterpolate(unref(selectedOrganization).inn)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(selectedOrganization).address) {
            _push(`<p class="auth-entry__organization-confirm-meta" data-v-f2dab6d2>${ssrInterpolate(unref(selectedOrganization).address)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit" class="auth-entry__organization-confirm-button"${ssrIncludeBooleanAttr(unref(isOrganizationSavePending)) ? " disabled" : ""} data-v-f2dab6d2>${ssrInterpolate(unref(isOrganizationSavePending) ? "Добавляем" : "Добавить организацию")}</button>`);
        if (unref(organizationSaveError)) {
          _push(`<p class="auth-entry__request-status auth-entry__request-status--error" data-v-f2dab6d2>${ssrInterpolate(unref(organizationSaveError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/AuthLegalForm.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-f2dab6d2"]]);
const authClient = createAuthClient({
  basePath: "/api/auth",
  plugins: [
    phoneNumberClient()
  ]
});
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = (() => {
  console.error(intervalError);
});
function useAuthEntryFlow({
  onRequestCode,
  onCompleteLogin,
  onCompleteRegistration
} = {}) {
  const step = ref("entry");
  const identifier = ref("");
  const isFieldTouched = ref(false);
  const isSubmitted = ref(false);
  const isLoginSubmitted = ref(false);
  const isRegistrationSubmitted = ref(false);
  const isRegistrationEmailTouched = ref(false);
  const fullName = ref("");
  const registrationEmail = ref("");
  const registrationPhone = ref("");
  const password = ref("");
  const organizationInn = ref("");
  const isPasswordVisible = ref(false);
  const smsCode = ref("");
  const isLegalRepresentative = ref(false);
  const isPersonalDataAccepted = ref(false);
  const isUserAgreementAccepted = ref(false);
  const isCodeRequestPending = ref(false);
  const codeRequestError = ref("");
  const isCodeRequestSent = ref(false);
  const codeAuthenticationId = ref("");
  const isCodeVerifyPending = ref(false);
  const codeVerifyError = ref("");
  const isPhoneConfirmed = ref(false);
  const resendSeconds = ref(0);
  const isEntryRequestPending = ref(false);
  const entryRequestError = ref("");
  const isLoginRequestPending = ref(false);
  const loginRequestError = ref("");
  const isRegistrationRequestPending = ref(false);
  const registrationRequestError = ref("");
  const successMode = ref("registration");
  const organizationSuggestions = ref([]);
  const selectedOrganization = ref(null);
  const isOrganizationSuggestPending = ref(false);
  const organizationSuggestError = ref("");
  const isOrganizationSuggestionsOpen = ref(false);
  const isOrganizationSavePending = ref(false);
  const organizationSaveError = ref("");
  const SMS_CODE_LENGTH = 5;
  const MIN_PASSWORD_LENGTH = 8;
  const ORGANIZATION_SUGGEST_DELAY = 350;
  let resendTimerId;
  let organizationSuggestTimerId;
  let organizationSuggestRequestId = 0;
  const hasIdentifier = computed(() => identifier.value.trim().length > 0);
  const isPhoneMode = computed(() => isPhoneLike(identifier.value));
  const identifierError = computed(() => getIdentifierError(identifier.value));
  const visibleError = computed(() => isFieldTouched.value || isSubmitted.value ? identifierError.value : "");
  const registrationEmailError = computed(() => getRegistrationEmailError(registrationEmail.value));
  const visibleRegistrationEmailError = computed(() => isRegistrationEmailTouched.value || isRegistrationSubmitted.value ? registrationEmailError.value : "");
  const passwordError = computed(() => getPasswordError(password.value));
  const visibleLoginPasswordError = computed(() => isLoginSubmitted.value ? passwordError.value : "");
  const visiblePasswordError = computed(() => isRegistrationSubmitted.value ? passwordError.value : "");
  const inputMode = computed(() => isPhoneMode.value ? "tel" : "email");
  const canRequestCode = computed(() => normalizePhoneDigits(registrationPhone.value).length === 11 && isPersonalDataAccepted.value && isUserAgreementAccepted.value);
  const canResendCode = computed(() => resendSeconds.value === 0 && !isCodeRequestPending.value && !isCodeVerifyPending.value);
  const isSmsCodeConfirmed = computed(() => isPhoneConfirmed.value);
  const isSmsCodeInvalid = computed(() => Boolean(codeVerifyError.value));
  const smsCodePlaceholder = computed(() => Array.from({ length: SMS_CODE_LENGTH }, () => "—").join(" "));
  const shouldShowOrganizationSuggestions = computed(() => isOrganizationSuggestionsOpen.value && (isOrganizationSuggestPending.value || Boolean(organizationSuggestError.value) || organizationSuggestions.value.length > 0));
  const isLegalRegistrationStep = computed(() => step.value === "legal-details" || step.value === "legal-confirmation");
  const passwordInputType = computed(() => isPasswordVisible.value ? "text" : "password");
  const codeButtonText = computed(() => {
    if (isCodeRequestPending.value) {
      return "Отправляем";
    }
    return "Продолжить";
  });
  const resendCountdownText = computed(() => `Отправить повторно через ${resendSeconds.value}`);
  const resendButtonText = computed(() => {
    if (isCodeRequestPending.value) {
      return "Отправляем код";
    }
    return canResendCode.value ? "Отправить повторно" : resendCountdownText.value;
  });
  const successTitle = computed(() => successMode.value === "login" ? "Готово, вы вошли!" : "Ура, зарегистрировались!");
  const successDescription = computed(() => successMode.value === "login" ? "Теперь у вас есть доступ к личному кабинету, избранному и отслеживанию заказов." : "Теперь у вас есть доступ к личному кабинету, избранному и отслеживанию заказов.");
  const modalTitle = computed(() => {
    if (step.value === "entry") {
      return "Вход или регистрация";
    }
    if (step.value === "login") {
      return "Вход";
    }
    return "Регистрация";
  });
  function getPasswordError(value) {
    if (!value) {
      return "Введите пароль";
    }
    return value.length >= MIN_PASSWORD_LENGTH ? "" : `Минимум ${MIN_PASSWORD_LENGTH} символов`;
  }
  function onIdentifierInput(event) {
    const value = event.target.value;
    isSubmitted.value = false;
    entryRequestError.value = "";
    loginRequestError.value = "";
    if (isPhoneLike(value)) {
      identifier.value = formatPhone(value);
      return;
    }
    identifier.value = isPhoneMode.value ? unmaskPhoneToEmail(value) : value;
  }
  function onIdentifierBlur() {
    isFieldTouched.value = true;
  }
  function resetIdentifier() {
    identifier.value = "";
    isFieldTouched.value = false;
    isSubmitted.value = false;
    entryRequestError.value = "";
    loginRequestError.value = "";
  }
  function onRegistrationPhoneInput(event) {
    registrationPhone.value = formatCompactPhone(event.target.value);
    codeRequestError.value = "";
    codeAuthenticationId.value = "";
    codeVerifyError.value = "";
    isPhoneConfirmed.value = false;
    isCodeRequestSent.value = false;
    smsCode.value = "";
  }
  function onRegistrationEmailInput() {
    isRegistrationSubmitted.value = false;
    registrationRequestError.value = "";
  }
  function onRegistrationEmailBlur() {
    isRegistrationEmailTouched.value = true;
  }
  function onPasswordInput() {
    isLoginSubmitted.value = false;
    isRegistrationSubmitted.value = false;
    loginRequestError.value = "";
    registrationRequestError.value = "";
  }
  function onSmsCodeInput(event) {
    smsCode.value = event.target.value.replace(/\D/g, "").slice(0, SMS_CODE_LENGTH);
    codeVerifyError.value = "";
    registrationRequestError.value = "";
  }
  function onOrganizationInnInput(event) {
    organizationInn.value = event.target.value.replace(/\D/g, "").slice(0, 12);
    selectedOrganization.value = null;
    organizationSuggestError.value = "";
    isOrganizationSuggestionsOpen.value = true;
    scheduleOrganizationSuggest();
  }
  function onOrganizationInnFocus() {
    if (organizationSuggestions.value.length > 0 || organizationInn.value.length >= 3) {
      isOrganizationSuggestionsOpen.value = true;
    }
  }
  function onOrganizationInnBlur() {
    setTimeout(() => {
      isOrganizationSuggestionsOpen.value = false;
    }, 120);
  }
  function resetCodeRequestStatus() {
    codeRequestError.value = "";
    codeAuthenticationId.value = "";
    codeVerifyError.value = "";
    isPhoneConfirmed.value = false;
    isCodeRequestSent.value = false;
    smsCode.value = "";
  }
  watch([isPersonalDataAccepted, isUserAgreementAccepted], resetCodeRequestStatus);
  function stopResendTimer() {
    if (resendTimerId) {
      clearInterval(resendTimerId);
      resendTimerId = void 0;
    }
  }
  function stopOrganizationSuggestTimer() {
    if (organizationSuggestTimerId) {
      clearTimeout(organizationSuggestTimerId);
      organizationSuggestTimerId = void 0;
    }
  }
  function startResendTimer() {
    stopResendTimer();
    resendSeconds.value = 60;
    resendTimerId = setInterval();
  }
  function scheduleOrganizationSuggest() {
    stopOrganizationSuggestTimer();
    if (organizationInn.value.length < 3) {
      organizationSuggestions.value = [];
      isOrganizationSuggestPending.value = false;
      return;
    }
    organizationSuggestTimerId = setTimeout(fetchOrganizationSuggestions, ORGANIZATION_SUGGEST_DELAY);
  }
  function resetAuthFlow() {
    step.value = "entry";
    identifier.value = "";
    isFieldTouched.value = false;
    isSubmitted.value = false;
    isLoginSubmitted.value = false;
    isRegistrationSubmitted.value = false;
    isRegistrationEmailTouched.value = false;
    fullName.value = "";
    registrationEmail.value = "";
    registrationPhone.value = "";
    password.value = "";
    organizationInn.value = "";
    organizationSuggestions.value = [];
    selectedOrganization.value = null;
    isOrganizationSuggestPending.value = false;
    organizationSuggestError.value = "";
    isOrganizationSuggestionsOpen.value = false;
    isOrganizationSavePending.value = false;
    organizationSaveError.value = "";
    isPasswordVisible.value = false;
    smsCode.value = "";
    isLegalRepresentative.value = false;
    isPersonalDataAccepted.value = false;
    isUserAgreementAccepted.value = false;
    isCodeRequestPending.value = false;
    codeRequestError.value = "";
    isCodeRequestSent.value = false;
    codeAuthenticationId.value = "";
    isCodeVerifyPending.value = false;
    codeVerifyError.value = "";
    isPhoneConfirmed.value = false;
    resendSeconds.value = 0;
    isEntryRequestPending.value = false;
    entryRequestError.value = "";
    isLoginRequestPending.value = false;
    loginRequestError.value = "";
    isRegistrationRequestPending.value = false;
    registrationRequestError.value = "";
    successMode.value = "registration";
  }
  function getEntryRequestErrorMessage(error) {
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return "Не удалось проверить почту или телефон";
  }
  async function continueFromEntry() {
    if (isEntryRequestPending.value) {
      return;
    }
    isSubmitted.value = true;
    isFieldTouched.value = true;
    entryRequestError.value = "";
    if (identifierError.value) {
      return;
    }
    isEntryRequestPending.value = true;
    try {
      const result = await $fetch("/api/auth-identifier", {
        method: "POST",
        timeout: 6e3,
        body: {
          identifier: isPhoneLike(identifier.value) ? formatAuthPhone(identifier.value) : identifier.value.trim()
        }
      });
      if (!result.exists) {
        startRegistration();
        return;
      }
      isLoginSubmitted.value = false;
      loginRequestError.value = "";
      password.value = "";
      step.value = "login";
      nextTick(() => {
        (void 0).getElementById("auth-entry-login-password")?.focus();
      });
    } catch (error) {
      entryRequestError.value = getEntryRequestErrorMessage(error);
    } finally {
      isEntryRequestPending.value = false;
    }
  }
  function startRegistration() {
    const currentIdentifier = identifierError.value ? "" : identifier.value;
    isLoginSubmitted.value = false;
    isSubmitted.value = false;
    isFieldTouched.value = false;
    loginRequestError.value = "";
    password.value = "";
    registrationPhone.value = isPhoneLike(currentIdentifier) ? formatCompactPhone(currentIdentifier) : "";
    registrationEmail.value = isPhoneLike(currentIdentifier) ? "" : currentIdentifier.trim();
    step.value = "registration";
    nextTick(() => {
      if (!registrationPhone.value) {
        (void 0).getElementById("auth-entry-phone")?.focus();
      }
    });
  }
  function onFormSubmit() {
    if (step.value === "entry") {
      continueFromEntry();
      return;
    }
    if (step.value === "login") {
      completeLogin();
      return;
    }
    if (step.value === "registration") {
      requestCode();
      return;
    }
    if (step.value === "legal-details") {
      return;
    }
    if (step.value === "legal-confirmation") {
      completeOrganizationRegistration();
      return;
    }
    if (!isSmsCodeConfirmed.value) {
      verifyCode();
      return;
    }
    if (step.value === "code") {
      completeRegistration();
    }
  }
  function getAuthErrorMessage(error, fallbackMessage = "Не удалось зарегистрироваться") {
    const message = error?.message || error?.statusText || "";
    if (message === "User already exists. Use another email.") {
      return "Пользователь с такой почтой уже есть. Проверьте пароль или используйте другую почту.";
    }
    if (message === "Invalid email or password") {
      return "Неверная почта или пароль";
    }
    if (message === "Invalid phone number or password") {
      return "Неверный телефон или пароль";
    }
    if (message === "Invalid phone number") {
      return "Введите корректный номер телефона";
    }
    if (message === "Password too short") {
      return `Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов`;
    }
    if (message === "Failed to create user") {
      return "Не удалось создать аккаунт. Возможно, этот телефон уже используется.";
    }
    return message || fallbackMessage;
  }
  async function completeLogin() {
    if (isLoginRequestPending.value) {
      return;
    }
    isLoginSubmitted.value = true;
    isSubmitted.value = true;
    isFieldTouched.value = true;
    loginRequestError.value = "";
    if (identifierError.value) {
      return;
    }
    if (passwordError.value) {
      return;
    }
    const currentIdentifier = identifier.value;
    const isPhoneLogin = isPhoneLike(currentIdentifier);
    isLoginRequestPending.value = true;
    try {
      const authResult = isPhoneLogin ? await authClient.signIn.phoneNumber({
        phoneNumber: formatAuthPhone(currentIdentifier),
        password: password.value
      }) : await authClient.signIn.email({
        email: currentIdentifier.trim(),
        password: password.value
      });
      if (authResult.error) {
        loginRequestError.value = getAuthErrorMessage(authResult.error, "Не удалось войти");
        return;
      }
      successMode.value = "login";
      onCompleteLogin?.({
        identifier: isPhoneLogin ? formatCompactPhone(currentIdentifier) : currentIdentifier.trim(),
        result: authResult.data
      });
      step.value = "success";
    } catch (error) {
      loginRequestError.value = getAuthErrorMessage(error, "Не удалось войти");
    } finally {
      isLoginRequestPending.value = false;
    }
  }
  async function completeRegistration() {
    if (isRegistrationRequestPending.value) {
      return;
    }
    isRegistrationSubmitted.value = true;
    isRegistrationEmailTouched.value = true;
    registrationRequestError.value = "";
    if (registrationEmailError.value) {
      return;
    }
    if (passwordError.value) {
      return;
    }
    const payload = {
      fullName: fullName.value.trim(),
      email: registrationEmail.value.trim(),
      phone: registrationPhone.value.trim(),
      authPhone: formatAuthPhone(registrationPhone.value),
      password: password.value,
      isLegalRepresentative: isLegalRepresentative.value
    };
    isRegistrationRequestPending.value = true;
    try {
      const authResult = await authClient.signUp.email({
        name: payload.fullName || payload.email,
        email: payload.email,
        password: payload.password,
        phoneNumber: payload.authPhone
      });
      if (authResult.error) {
        registrationRequestError.value = getAuthErrorMessage(authResult.error);
        return;
      }
      onCompleteRegistration?.({
        ...payload,
        result: authResult.data
      });
      successMode.value = "registration";
      if (payload.isLegalRepresentative) {
        step.value = "legal-details";
        nextTick(() => {
          (void 0).getElementById("auth-entry-organization-inn")?.focus();
        });
        return;
      }
      step.value = "success";
    } catch (error) {
      registrationRequestError.value = getAuthErrorMessage(error);
    } finally {
      isRegistrationRequestPending.value = false;
    }
  }
  function getRequestErrorMessage(error) {
    if (isTimeoutError(error)) {
      return "Сервис СМС не ответил вовремя. Попробуйте отправить код ещё раз.";
    }
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return "Не удалось отправить код подтверждения";
  }
  function getVerifyErrorMessage(error) {
    if (isTimeoutError(error)) {
      return "Сервис СМС не ответил вовремя. Попробуйте проверить код ещё раз.";
    }
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return "Неверный код из СМС";
  }
  function isTimeoutError(error) {
    const message = String(error?.message ?? "");
    const causeMessage = String(error?.cause?.message ?? "");
    return error?.name === "TimeoutError" || error?.code === 23 || error?.cause?.name === "TimeoutError" || error?.cause?.code === 23 || message.includes("timeout") || message.includes("no response") || causeMessage.includes("timeout");
  }
  function getOrganizationSuggestErrorMessage(error) {
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return "Не удалось получить данные организации";
  }
  async function fetchOrganizationSuggestions() {
    const query = organizationInn.value;
    if (query.length < 3) {
      organizationSuggestions.value = [];
      return;
    }
    const requestId = organizationSuggestRequestId + 1;
    organizationSuggestRequestId = requestId;
    isOrganizationSuggestPending.value = true;
    organizationSuggestError.value = "";
    try {
      const result = await $fetch("/api/dadata/party-suggest", {
        method: "POST",
        timeout: 1e4,
        body: { query }
      });
      if (requestId !== organizationSuggestRequestId) {
        return;
      }
      organizationSuggestions.value = result.suggestions ?? [];
      isOrganizationSuggestionsOpen.value = true;
    } catch (error) {
      if (requestId !== organizationSuggestRequestId) {
        return;
      }
      organizationSuggestions.value = [];
      organizationSuggestError.value = getOrganizationSuggestErrorMessage(error);
    } finally {
      if (requestId === organizationSuggestRequestId) {
        isOrganizationSuggestPending.value = false;
      }
    }
  }
  function selectOrganization(suggestion) {
    selectedOrganization.value = suggestion;
    organizationInn.value = suggestion.inn;
    organizationSuggestions.value = [];
    organizationSuggestError.value = "";
    organizationSaveError.value = "";
    isOrganizationSuggestionsOpen.value = false;
    step.value = "legal-confirmation";
  }
  function getOrganizationSaveErrorMessage(error) {
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return "Не удалось сохранить организацию";
  }
  async function completeOrganizationRegistration() {
    if (isOrganizationSavePending.value) {
      return;
    }
    if (!selectedOrganization.value) {
      step.value = "legal-details";
      return;
    }
    isOrganizationSavePending.value = true;
    organizationSaveError.value = "";
    try {
      await $fetch("/api/organizations", {
        method: "POST",
        timeout: 1e4,
        body: {
          organization: selectedOrganization.value
        }
      });
      step.value = "success";
    } catch (error) {
      organizationSaveError.value = getOrganizationSaveErrorMessage(error);
    } finally {
      isOrganizationSavePending.value = false;
    }
  }
  async function requestCode() {
    if (!canRequestCode.value || isCodeRequestPending.value) {
      return;
    }
    const payload = {
      fullName: fullName.value.trim(),
      email: registrationEmail.value || null,
      phone: registrationPhone.value.trim(),
      isLegalRepresentative: isLegalRepresentative.value,
      isPersonalDataAccepted: isPersonalDataAccepted.value,
      isUserAgreementAccepted: isUserAgreementAccepted.value
    };
    isCodeRequestPending.value = true;
    codeRequestError.value = "";
    codeAuthenticationId.value = "";
    codeVerifyError.value = "";
    isPhoneConfirmed.value = false;
    isCodeRequestSent.value = false;
    smsCode.value = "";
    try {
      const result = await $fetch("/api/auth/request-code", {
        method: "POST",
        timeout: 4e4,
        body: {
          phone: payload.phone,
          isPersonalDataAccepted: payload.isPersonalDataAccepted,
          isUserAgreementAccepted: payload.isUserAgreementAccepted
        }
      });
      if (!result.authenticationId) {
        throw new Error("Не удалось получить код подтверждения");
      }
      codeAuthenticationId.value = result.authenticationId;
      isCodeRequestSent.value = true;
      startResendTimer();
      step.value = "code";
      onRequestCode?.({ ...payload, result });
      nextTick(() => {
        (void 0).getElementById("auth-entry-sms-code")?.focus();
      });
    } catch (error) {
      codeRequestError.value = getRequestErrorMessage(error);
    } finally {
      isCodeRequestPending.value = false;
    }
  }
  async function verifyCode() {
    if (isCodeVerifyPending.value || isSmsCodeConfirmed.value) {
      return;
    }
    if (smsCode.value.length !== SMS_CODE_LENGTH) {
      return;
    }
    if (!codeAuthenticationId.value) {
      codeVerifyError.value = "Отправьте код повторно";
      return;
    }
    isCodeVerifyPending.value = true;
    codeVerifyError.value = "";
    registrationRequestError.value = "";
    try {
      await $fetch("/api/auth/verify-code", {
        method: "POST",
        timeout: 3e4,
        body: {
          authenticationId: codeAuthenticationId.value,
          code: smsCode.value
        }
      });
      isPhoneConfirmed.value = true;
    } catch (error) {
      codeVerifyError.value = getVerifyErrorMessage(error);
    } finally {
      isCodeVerifyPending.value = false;
    }
  }
  return {
    // state
    step,
    identifier,
    isFieldTouched,
    isSubmitted,
    isLoginSubmitted,
    isRegistrationSubmitted,
    isRegistrationEmailTouched,
    fullName,
    registrationEmail,
    registrationPhone,
    password,
    organizationInn,
    isPasswordVisible,
    smsCode,
    isLegalRepresentative,
    isPersonalDataAccepted,
    isUserAgreementAccepted,
    isCodeRequestPending,
    codeRequestError,
    isCodeRequestSent,
    codeAuthenticationId,
    isCodeVerifyPending,
    codeVerifyError,
    isPhoneConfirmed,
    resendSeconds,
    isEntryRequestPending,
    entryRequestError,
    isLoginRequestPending,
    loginRequestError,
    isRegistrationRequestPending,
    registrationRequestError,
    successMode,
    organizationSuggestions,
    selectedOrganization,
    isOrganizationSuggestPending,
    organizationSuggestError,
    isOrganizationSuggestionsOpen,
    isOrganizationSavePending,
    organizationSaveError,
    // constants
    SMS_CODE_LENGTH,
    MIN_PASSWORD_LENGTH,
    ORGANIZATION_SUGGEST_DELAY,
    // computed
    hasIdentifier,
    isPhoneMode,
    identifierError,
    visibleError,
    registrationEmailError,
    visibleRegistrationEmailError,
    passwordError,
    visibleLoginPasswordError,
    visiblePasswordError,
    inputMode,
    canRequestCode,
    canResendCode,
    isSmsCodeConfirmed,
    isSmsCodeInvalid,
    smsCodePlaceholder,
    shouldShowOrganizationSuggestions,
    isLegalRegistrationStep,
    passwordInputType,
    codeButtonText,
    resendCountdownText,
    resendButtonText,
    successTitle,
    successDescription,
    modalTitle,
    // methods
    getPasswordError,
    onIdentifierInput,
    onIdentifierBlur,
    resetIdentifier,
    onRegistrationPhoneInput,
    onRegistrationEmailInput,
    onRegistrationEmailBlur,
    onPasswordInput,
    onSmsCodeInput,
    onOrganizationInnInput,
    onOrganizationInnFocus,
    onOrganizationInnBlur,
    resetCodeRequestStatus,
    stopResendTimer,
    stopOrganizationSuggestTimer,
    startResendTimer,
    scheduleOrganizationSuggest,
    resetAuthFlow,
    continueFromEntry,
    startRegistration,
    onFormSubmit,
    getAuthErrorMessage,
    completeLogin,
    completeRegistration,
    getRequestErrorMessage,
    getVerifyErrorMessage,
    getOrganizationSuggestErrorMessage,
    fetchOrganizationSuggestions,
    selectOrganization,
    getOrganizationSaveErrorMessage,
    completeOrganizationRegistration,
    requestCode,
    verifyCode
  };
}
const _sfc_main$6 = {
  __name: "AuthEntryModal",
  __ssrInlineRender: true,
  props: {
    "modelValue": { type: Boolean, required: true },
    "modelModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["request-code", "complete-login", "complete-registration"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const isOpen = useModel(__props, "modelValue");
    const emit = __emit;
    const flow = useAuthEntryFlow({
      onRequestCode: (payload) => emit("request-code", payload),
      onCompleteLogin: (payload) => emit("complete-login", payload),
      onCompleteRegistration: (payload) => emit("complete-registration", payload)
    });
    provide("authFlow", flow);
    const step = flow.step;
    const modalTitle = flow.modalTitle;
    const isLegalRegistrationStep = flow.isLegalRegistrationStep;
    const onFormSubmit = flow.onFormSubmit;
    const stopResendTimer = flow.stopResendTimer;
    const stopOrganizationSuggestTimer = flow.stopOrganizationSuggestTimer;
    const resetAuthFlow = flow.resetAuthFlow;
    const smsCode = flow.smsCode;
    const SMS_CODE_LENGTH = flow.SMS_CODE_LENGTH;
    const isSmsCodeConfirmed = flow.isSmsCodeConfirmed;
    const verifyCode = flow.verifyCode;
    watch(isOpen, (open) => {
      if (!open) {
        stopResendTimer();
        stopOrganizationSuggestTimer();
        return;
      }
      resetAuthFlow();
      nextTick(() => {
        (void 0).getElementById("auth-entry-identifier")?.focus();
      });
    });
    watch(smsCode, (value) => {
      if (value.length === SMS_CODE_LENGTH && !isSmsCodeConfirmed.value) {
        verifyCode();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$e;
      const _component_AuthSuccessView = __nuxt_component_1$1;
      const _component_AppIcon = __nuxt_component_1$2;
      const _component_AuthEntryForm = __nuxt_component_3;
      const _component_AuthLoginForm = __nuxt_component_4$1;
      const _component_AuthRegisterStartForm = __nuxt_component_5$1;
      const _component_AuthRegisterCompleteForm = __nuxt_component_6;
      const _component_AuthLegalForm = __nuxt_component_7;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event,
        overlay: true,
        close: false,
        scrollable: true,
        ui: {
          content: "w-auto max-w-none bg-transparent ring-0 shadow-none p-0 rounded-none",
          overlay: "bg-[rgba(4,18,27,0.74)]"
        }
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="${ssrRenderClass([{
              "auth-entry--login": unref(step) === "login",
              "auth-entry--registration": unref(step) === "registration" || unref(step) === "code",
              "auth-entry--legal-details": unref(step) === "legal-details",
              "auth-entry--legal-confirmation": unref(step) === "legal-confirmation",
              "auth-entry--success": unref(step) === "success"
            }, "auth-entry"])}" data-v-4ce3c8f6${_scopeId}>`);
            if (unref(step) === "success") {
              _push2(ssrRenderComponent(_component_AuthSuccessView, {
                onClose: ($event) => isOpen.value = false
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!--[--><header class="auth-entry__header" data-v-4ce3c8f6${_scopeId}><div class="auth-entry__title-block" data-v-4ce3c8f6${_scopeId}><h2 class="auth-entry__title" data-v-4ce3c8f6${_scopeId}>${ssrInterpolate(unref(modalTitle))}</h2>`);
              if (unref(isLegalRegistrationStep)) {
                _push2(`<p class="auth-entry__subtitle" data-v-4ce3c8f6${_scopeId}> Укажите ИНН организации или ИП, остальные данные заполнятся автоматически </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><button type="button" class="auth-entry__close" aria-label="Закрыть окно входа или регистрации" data-v-4ce3c8f6${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AppIcon, {
                name: "close",
                size: 16,
                class: "auth-entry__close-icon"
              }, null, _parent2, _scopeId));
              _push2(`</button></header>`);
              if (unref(step) === "entry") {
                _push2(ssrRenderComponent(_component_AuthEntryForm, null, null, _parent2, _scopeId));
              } else if (unref(step) === "login") {
                _push2(ssrRenderComponent(_component_AuthLoginForm, null, null, _parent2, _scopeId));
              } else if (unref(step) === "registration") {
                _push2(ssrRenderComponent(_component_AuthRegisterStartForm, null, null, _parent2, _scopeId));
              } else if (unref(step) === "code") {
                _push2(ssrRenderComponent(_component_AuthRegisterCompleteForm, null, null, _parent2, _scopeId));
              } else if (unref(step) === "legal-details" || unref(step) === "legal-confirmation") {
                _push2(ssrRenderComponent(_component_AuthLegalForm, null, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            }
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                class: ["auth-entry", {
                  "auth-entry--login": unref(step) === "login",
                  "auth-entry--registration": unref(step) === "registration" || unref(step) === "code",
                  "auth-entry--legal-details": unref(step) === "legal-details",
                  "auth-entry--legal-confirmation": unref(step) === "legal-confirmation",
                  "auth-entry--success": unref(step) === "success"
                }],
                onSubmit: withModifiers(unref(onFormSubmit), ["prevent"])
              }, [
                unref(step) === "success" ? (openBlock(), createBlock(_component_AuthSuccessView, {
                  key: 0,
                  onClose: ($event) => isOpen.value = false
                }, null, 8, ["onClose"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("header", { class: "auth-entry__header" }, [
                    createVNode("div", { class: "auth-entry__title-block" }, [
                      createVNode("h2", { class: "auth-entry__title" }, toDisplayString(unref(modalTitle)), 1),
                      unref(isLegalRegistrationStep) ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "auth-entry__subtitle"
                      }, " Укажите ИНН организации или ИП, остальные данные заполнятся автоматически ")) : createCommentVNode("", true)
                    ]),
                    createVNode("button", {
                      type: "button",
                      class: "auth-entry__close",
                      "aria-label": "Закрыть окно входа или регистрации",
                      onClick: ($event) => isOpen.value = false
                    }, [
                      createVNode(_component_AppIcon, {
                        name: "close",
                        size: 16,
                        class: "auth-entry__close-icon"
                      })
                    ], 8, ["onClick"])
                  ]),
                  unref(step) === "entry" ? (openBlock(), createBlock(_component_AuthEntryForm, { key: 0 })) : unref(step) === "login" ? (openBlock(), createBlock(_component_AuthLoginForm, { key: 1 })) : unref(step) === "registration" ? (openBlock(), createBlock(_component_AuthRegisterStartForm, { key: 2 })) : unref(step) === "code" ? (openBlock(), createBlock(_component_AuthRegisterCompleteForm, { key: 3 })) : unref(step) === "legal-details" || unref(step) === "legal-confirmation" ? (openBlock(), createBlock(_component_AuthLegalForm, { key: 4 })) : createCommentVNode("", true)
                ], 64))
              ], 42, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuthEntryModal.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["__scopeId", "data-v-4ce3c8f6"]]), { __name: "AuthEntryModal" });
const headerLogoBg1 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%20198.944%20164.444'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Container'%3e%3cpath%20id='Star%208'%20d='M128.092%204.41188L107.741%2071.8826L167.013%2062.8834L114.488%2085.6349L195.165%20109.316L120.666%20107.052L143.892%20129.477L92.0442%20104.609L80.4869%20161.71L72.7352%2099.7577L4.16465%20105.048L67.1903%2079.5712L15.2783%2048.8255L69.9732%2065.7537L58.2152%2027.3217L90.9896%2061.6994L128.092%204.41188Z'%20fill='var(--fill-0,%20%23FE8721)'/%3e%3cg%20id='Container_2'%3e%3cpath%20id='Polygon%205'%20d='M188.261%2029.5872L170.808%20131.316L91.4353%2065.3368L188.261%2029.5872Z'%20fill='var(--fill-0,%20%238100FF)'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const headerLogoBg2 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%20166.538%20144.784'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Container'%3e%3cpath%20id='Vector%20240%20(Stroke)'%20d='M108.732%201.0011C109.372%200.944342%20110.535%200.866795%20111.799%200.935669C113.434%201.02472%20116.552%201.40206%20119.748%203.40051L120.058%203.59876L120.422%203.8468C122.213%205.10197%20123.516%206.59283%20124.271%207.52551C125.313%208.8136%20126.352%2010.355%20127.365%2012.173C129.39%2015.8087%20131.433%2020.7667%20133.209%2027.5109C133.7%2029.3727%20134.22%2031.509%20134.724%2033.7042C136.76%2032.2538%20139.202%2031.319%20141.875%2031.1075C149.738%2030.4857%20156.617%2036.3558%20157.239%2044.2189C157.323%2045.2839%20157.441%2046.7507%20157.488%2047.8556C157.509%2048.3731%20157.57%2049.7368%20157.347%2051.3605C157.101%2053.1553%20156.612%2054.6187%20156.161%2055.7286L155.995%2056.1359L155.806%2056.5333C154.062%2060.1678%20150.747%2064.7247%20145.527%2067.42C144.451%2067.9755%20141.779%2069.4988%20137.487%2070.2111C137.299%2074.5479%20137.069%2078.8881%20136.83%2081.9972C136.437%2087.1295%20135.975%2091.3285%20133.786%2095.1798C132.781%2096.9463%20130.534%20100.367%20126.108%20102.353C120.453%20104.89%20112.934%20104.424%20103.759%20100.996C103.245%20100.804%20102.71%20100.597%20102.154%20100.375C102.062%20101.503%20101.952%20102.59%20101.819%20103.592C101.435%20106.474%20100.88%20110.499%2099.8139%20114.045C99.2723%20115.846%2098.3884%20118.272%2096.8461%20120.633C95.2776%20123.034%2092.4484%20126.229%2087.8119%20127.85C83.9706%20129.193%2078.0153%20130.142%2069.4662%20127.317C68.709%20127.066%2067.8887%20126.789%2067.0131%20126.472C65.2777%20128.649%2063.0612%20130.699%2060.1967%20132.258C58.3178%20133.28%2055.5752%20134.622%2051.1517%20135.223C47.4795%20135.722%2043.0574%20135.658%2037.39%20135.163C33.6284%20134.835%2030.0181%20134.316%2024.9906%20132.682C20.7065%20131.289%2017.1224%20130.161%2014.5805%20129.383C13.3023%20128.992%2012.3316%20128.703%2011.6859%20128.518C11.5076%20128.467%2011.3735%20128.43%2011.2787%20128.403C4.33712%20126.919%20-0.574085%20120.463%200.0540837%20113.208C0.734544%20105.35%207.65664%2099.5306%2015.515%20100.211C16.6138%20100.306%2017.5215%20100.524%2017.5629%20100.533C17.8527%20100.598%2018.1157%20100.665%2018.3041%20100.714C18.6938%20100.815%2019.1275%20100.936%2019.556%20101.059C20.4317%20101.31%2021.5826%20101.653%2022.9398%20102.068C25.6695%20102.904%2029.4132%20104.085%2033.8197%20105.517C36.2637%20106.311%2037.6415%20106.513%2039.8754%20106.708C40.2507%20106.741%2040.609%20106.767%2040.9506%20106.793C40.8436%20106.585%2040.7375%20106.37%2040.6361%20106.148C40.1028%20104.977%2036.4453%2096.1062%2044.1156%2089.2423L44.6215%2088.7999C45.8837%2087.7234%2047.699%2086.37%2049.9584%2085.2872C52.3083%2084.1612%2056.6987%2082.5893%2061.9574%2083.7335L62.4691%2083.8536L62.9105%2083.9601C64.5725%2084.3956%2070.3651%2086.2825%2073.1732%2092.6329L73.3226%2092.9845L73.474%2093.3595C73.616%2093.7231%2073.7563%2094.1158%2073.893%2094.5363C73.9964%2092.0384%2074.0471%2089.2762%2074.0912%2086.7736C74.1115%2085.6203%2074.0952%2084.688%2074.0609%2083.9298C73.053%2083.2074%2072.1467%2082.5476%2071.3842%2081.9738C69.7063%2080.7111%2067.7522%2079.1827%2066.2582%2077.4933C65.4926%2076.6276%2063.8618%2074.6501%2062.9496%2071.6759C61.8018%2067.9335%2062.462%2064.8587%2062.7328%2063.754L62.889%2063.1564C63.1016%2062.398%2063.4961%2061.1941%2064.1859%2059.8898C65.0818%2058.1959%2067.2625%2054.8491%2071.6849%2052.9972L72.1547%2052.8087C74.6489%2051.8518%2080.2919%2050.3476%2086.2504%2053.4581L86.8676%2053.796L87.518%2054.1779C89.1564%2055.1585%2091.5948%2056.7942%2094.0043%2059.4347C95.7281%2061.3238%2097.2553%2063.5231%2098.5355%2066.0655C100.152%2067.1183%20101.771%2068.1405%20103.277%2069.0411C105.393%2070.3071%20107.227%2071.2965%20108.807%2072.0792C108.907%2070.0229%20108.999%2067.8675%20109.078%2065.7833C108.037%2064.9695%20105.762%2063.1243%20103.561%2060.1085C101.132%2056.7811%2099.1429%2052.6137%2097.4056%2047.2345C95.5332%2041.4366%2093.6296%2035.2104%2093.5199%2029.046C93.4642%2025.9152%2093.3915%2022.8886%2093.39%2020.6671C93.3893%2019.5592%2093.4044%2018.3345%2093.4769%2017.215C93.5127%2016.6632%2093.577%2015.8882%2093.7152%2015.0392C93.7988%2014.526%2094.1123%2012.5412%2095.2152%2010.3771C95.6087%209.60505%2096.5707%207.78777%2098.2621%206.0011C100.064%204.09828%20103.386%201.52736%20108.283%201.04504L108.732%201.0011ZM12.5521%20128.615C12.5692%20128.617%2012.5864%20128.62%2012.6039%20128.622C12.5866%20128.62%2012.5694%20128.617%2012.5521%20128.615Z'%20fill='var(--fill-0,%20%23FF00A9)'/%3e%3c/g%3e%3c/svg%3e";
const headerLogoBg3 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%20115.716%20121.521'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Container'%3e%3cpath%20id='Union'%20d='M77.2559%209.01323C83.8305%2015.4229%2084.0059%2026.9027%2078.9155%2039.367C91.2461%2033.9612%20102.727%2033.846%20109.302%2040.2553C120.284%2050.9618%20113.417%2075.8179%2093.9636%2095.7729C74.51%20115.728%2049.8366%20123.225%2038.8541%20112.518C32.2793%20106.109%2032.104%2094.6276%2037.1952%2082.1626C24.864%2087.5689%2013.3833%2087.6861%206.8083%2081.2765C-4.17416%2070.5699%202.69287%2045.7138%2022.1464%2025.7589C41.6%205.80392%2066.2734%20-1.69328%2077.2559%209.01323Z'%20fill='var(--fill-0,%20%2302D892)'/%3e%3c/g%3e%3c/svg%3e";
const headerLogoBg4 = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%20115.919%20115.919'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Container'%3e%3cpath%20id='Summertime%20Sadness'%20d='M69.8504%205.45261C59.5645%20-2.97403%2044.3949%20-1.46673%2035.9682%208.81925C27.5415%2019.1054%2029.0489%2034.2748%2039.3349%2042.7015C29.0489%2034.2748%2013.8794%2035.782%205.45266%2046.0681C-2.97411%2056.3543%20-1.46668%2071.5237%208.81931%2079.9503C19.1055%2088.3771%2034.2748%2086.8698%2042.7015%2076.5837C34.2748%2086.8698%2035.782%20102.039%2046.0682%20110.466C56.3543%20118.893%2071.5236%20117.385%2079.9504%20107.099C88.3772%2096.8131%2086.8699%2081.6438%2076.5837%2073.217C86.8699%2081.6438%20102.039%2080.1365%20110.466%2069.8504C118.893%2059.5644%20117.385%2044.3949%20107.099%2035.9682C96.8132%2027.5414%2081.6437%2029.0488%2073.2171%2039.3348C81.6437%2029.0488%2080.1366%2013.8794%2069.8504%205.45261Z'%20fill='var(--fill-0,%20%23F94A4F)'/%3e%3cpath%20id='Star%205'%20d='M70.2645%2014.7376C73.3477%2011.3099%2078.3943%2010.4759%2082.4164%2012.7295V12.7295C83.2834%2013.2153%2084.219%2013.5673%2085.1913%2013.7734V13.7734C89.7013%2014.7297%2092.9469%2018.6832%2093.0063%2023.2932V23.2932C93.0191%2024.287%2093.1821%2025.2732%2093.4897%2026.2182V26.2182C94.9166%2030.6022%2093.1155%2035.3898%2089.1529%2037.7462V37.7462C88.2986%2038.2542%2087.526%2038.8884%2086.8614%2039.6273V39.6273C83.7782%2043.0551%2078.7315%2043.889%2074.7095%2041.6355V41.6355C73.8424%2041.1497%2072.9069%2040.7977%2071.9346%2040.5916V40.5916C67.4245%2039.6353%2064.1789%2035.6818%2064.1195%2031.0718V31.0718C64.1067%2030.078%2063.9438%2029.0918%2063.6362%2028.1467V28.1467C62.2092%2023.7627%2064.0103%2018.9752%2067.973%2016.6188V16.6188C68.8273%2016.1108%2069.5998%2015.4766%2070.2645%2014.7376V14.7376Z'%20fill='var(--fill-0,%20%2302D892)'/%3e%3c/g%3e%3c/svg%3e";
const headerLogoText = "" + __buildAssetsURL("header-logo-text.B_a9knhz.svg");
const _sfc_main$5 = {
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const navLinks = [
      { label: "Каталог", to: "/catalog" },
      { label: "О нас", to: "" },
      { label: "Примеры работ", to: "" },
      { label: "Оплата", to: "/payment" },
      { label: "Доставка", to: "/delivery" }
    ];
    const session = authClient.useSession();
    const isSessionPending = computed(() => session.value?.isPending ?? true);
    const sessionUser = computed(() => session.value?.data?.user ?? null);
    const accountLabel = computed(() => {
      if (!sessionUser.value) {
        return "Войти";
      }
      return sessionUser.value.name;
    });
    const baseActionItems = [
      {
        key: "favorites",
        label: "Избранное",
        icon: "favorite",
        iconClass: "header-action__icon_favorite",
        counter: "99+",
        kind: "favorite"
      },
      {
        key: "orders",
        label: "Заказы",
        icon: "orders",
        iconClass: "header-action__icon_orders",
        counter: "99+",
        kind: "secondary"
      },
      {
        key: "cart",
        label: "Корзина",
        icon: "cart",
        iconClass: "header-action__icon_cart",
        counter: "99+",
        kind: "secondary"
      }
    ];
    const accountAction = computed(() => ({
      key: "account",
      label: accountLabel.value,
      icon: "account",
      iconClass: "header-action__icon_account",
      counter: "",
      kind: "secondary",
      isAuthenticated: Boolean(sessionUser.value)
    }));
    const actionItems = computed(() => [
      ...baseActionItems,
      ...!sessionUser.value && !isSessionPending.value ? [accountAction.value] : []
    ]);
    const isAuthEntryOpen = ref(false);
    const isSignOutPending = ref(false);
    function refreshSession() {
      session.value?.refetch?.();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppIcon = __nuxt_component_1$2;
      const _component_AuthEntryModal = __nuxt_component_2$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-2c22b602><div class="header__container" data-v-2c22b602><div class="header__inner" data-v-2c22b602>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "header__logo",
        "aria-label": "Индиго"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header__logo-cloud" data-v-2c22b602${_scopeId}><img${ssrRenderAttr("src", unref(headerLogoBg1))} alt="" class="header__logo-bg1" data-v-2c22b602${_scopeId}><img${ssrRenderAttr("src", unref(headerLogoBg2))} alt="" class="header__logo-bg2" data-v-2c22b602${_scopeId}><img${ssrRenderAttr("src", unref(headerLogoBg3))} alt="" class="header__logo-bg3" data-v-2c22b602${_scopeId}><img${ssrRenderAttr("src", unref(headerLogoBg4))} alt="" class="header__logo-bg4" data-v-2c22b602${_scopeId}></div><img${ssrRenderAttr("src", unref(headerLogoText))} alt="Индиго" class="header__logo-text" data-v-2c22b602${_scopeId}>`);
          } else {
            return [
              createVNode("div", { class: "header__logo-cloud" }, [
                createVNode("img", {
                  src: unref(headerLogoBg1),
                  alt: "",
                  class: "header__logo-bg1"
                }, null, 8, ["src"]),
                createVNode("img", {
                  src: unref(headerLogoBg2),
                  alt: "",
                  class: "header__logo-bg2"
                }, null, 8, ["src"]),
                createVNode("img", {
                  src: unref(headerLogoBg3),
                  alt: "",
                  class: "header__logo-bg3"
                }, null, 8, ["src"]),
                createVNode("img", {
                  src: unref(headerLogoBg4),
                  alt: "",
                  class: "header__logo-bg4"
                }, null, 8, ["src"])
              ]),
              createVNode("img", {
                src: unref(headerLogoText),
                alt: "Индиго",
                class: "header__logo-text"
              }, null, 8, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="header__nav" aria-label="Основная навигация" data-v-2c22b602><!--[-->`);
      ssrRenderList(navLinks, (item) => {
        _push(`<!--[-->`);
        if (item.to) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.to,
            class: "header__nav-link"
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
          _push(`<a href="#" class="header__nav-link" aria-disabled="true" data-v-2c22b602>${ssrInterpolate(item.label)}</a>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></nav><div class="header__actions" data-v-2c22b602><!--[-->`);
      ssrRenderList(unref(actionItems), (item) => {
        _push(`<button type="button" class="${ssrRenderClass([`header-action--${item.kind}`, "header-action"])}" data-v-2c22b602><span class="header-action__icon-wrap" data-v-2c22b602>`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: item.icon,
          class: ["header-action__icon", item.iconClass]
        }, null, _parent));
        if (item.counter) {
          _push(`<span class="header-action__counter" data-v-2c22b602>${ssrInterpolate(item.counter)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span><span class="header-action__label" data-v-2c22b602>${ssrInterpolate(item.label)}</span></button>`);
      });
      _push(`<!--]-->`);
      if (unref(sessionUser)) {
        _push(`<div class="header-account-authorized" data-v-2c22b602><div class="header-account-authorized__top" data-v-2c22b602><span class="header-account-authorized__icon-wrap" data-v-2c22b602>`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "header-account-authorized",
          class: "header-account-authorized__icon"
        }, null, _parent));
        _push(`</span><button type="button" class="header-account-authorized__sign-out"${ssrIncludeBooleanAttr(unref(isSignOutPending)) ? " disabled" : ""}${ssrRenderAttr("aria-label", unref(isSignOutPending) ? "Выходим" : "Выйти")} data-v-2c22b602>`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "header-sign-out-authorized",
          class: "header-account-authorized__sign-out-icon"
        }, null, _parent));
        _push(`</button></div><span class="header-account-authorized__label" data-v-2c22b602>${ssrInterpolate(unref(accountLabel))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_AuthEntryModal, {
        modelValue: unref(isAuthEntryOpen),
        "onUpdate:modelValue": ($event) => isRef(isAuthEntryOpen) ? isAuthEntryOpen.value = $event : null,
        onCompleteLogin: refreshSession,
        onCompleteRegistration: refreshSession
      }, null, _parent));
      _push(`</header>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-2c22b602"]]);
const theme = {
  "base": "min-h-[calc(100vh-var(--ui-header-height))]"
};
const _sfc_main$4 = {
  __name: "UMain",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "main" },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const props = __props;
    const appConfig2 = useAppConfig();
    const uiProp = useComponentUI("main", props);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig2.ui?.main || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value({ class: [unref(uiProp)?.base, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Main.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_4 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const footerLogo = "" + __buildAssetsURL("footer-logo.CDJvr2uJ.svg");
const footerSbp = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2051.2236%2027.0625'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Vector'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10.329%200L23.9926%207.71665L13.6757%2013.5312L23.9926%2019.3578L10.329%2027.0625V15.4213L0%2021.2599V5.82661L10.317%2011.6532V0H10.329ZM13.6757%2021.4044L17.2872%2019.3578L13.6757%2017.3233V21.4044ZM3.34669%2015.5778L6.95823%2013.5433L3.34669%2011.5088V15.5778ZM13.6757%209.76319L17.2872%207.71665L13.6757%205.68215V9.76319Z'%20fill='var(--fill-0,%20%2304121B)'%20fill-opacity='0.24'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M41.4364%209.703H39.1852C38.6314%209.67892%2038.0897%209.87153%2037.6563%2010.2207C37.2349%2010.5698%2036.9581%2011.0633%2036.8738%2011.6051C37.572%2011.0152%2038.4749%2010.7022%2039.4019%2010.7142C40.2325%2010.7263%2041.0391%2011.0513%2041.629%2011.6291C42.2189%2012.195%2042.568%2012.9775%2042.6041%2013.784V14.1572C42.4235%2015.975%2040.8224%2017.2391%2038.6073%2017.2391C36.3682%2017.2391%2034.4781%2015.9148%2034.4781%2012.6885C34.4781%209.9558%2036.2719%207.69257%2038.9083%207.65646H42.5921L41.4243%209.71503L41.4364%209.703ZM38.3545%2012.4839C38.0656%2012.532%2037.8008%2012.6645%2037.5841%2012.8691C37.3674%2013.0738%2037.2229%2013.3266%2037.1627%2013.6035C37.1025%2013.8803%2037.1266%2014.1813%2037.2229%2014.4461C37.3313%2014.711%2037.5118%2014.9518%2037.7526%2015.1083C37.9934%2015.2768%2038.2823%2015.3731%2038.5712%2015.3731C38.7638%2015.3731%2038.9685%2015.349%2039.1491%2015.2768C39.3296%2015.2046%2039.5102%2015.1083%2039.6547%2014.9638C39.7991%2014.8314%2039.9075%2014.6628%2039.9918%2014.4823C40.064%2014.3017%2040.1121%2014.1091%2040.1121%2013.9165C40.1121%2013.6275%2040.0279%2013.3506%2039.8714%2013.1099C39.7149%2012.8691%2039.4861%2012.6765%2039.2093%2012.5681C38.9444%2012.4598%2038.6434%2012.4237%2038.3545%2012.4718V12.4839Z'%20fill='var(--fill-0,%20%2304121B)'%20fill-opacity='0.24'/%3e%3cpath%20d='M30.7462%209.87153C31.7454%209.87153%2032.7085%2010.1725%2033.491%2010.7744L32.552%2012.4117C31.9621%2012.0625%2031.288%2011.8699%2030.6018%2011.882C30.1684%2011.906%2029.7591%2012.0866%2029.4701%2012.3996C29.1692%2012.7006%2029.0006%2013.1099%2029.0006%2013.5312C29.0006%2013.9526%2029.1692%2014.3619%2029.4701%2014.6628C29.7711%2014.9638%2030.1684%2015.1564%2030.6018%2015.1805C31.288%2015.1805%2031.9741%2014.9999%2032.552%2014.6508L33.491%2016.3001C32.7085%2016.902%2031.7213%2017.227%2030.7221%2017.227C28.5071%2017.227%2026.617%2015.5537%2026.617%2013.5433C26.617%2011.8218%2028.2904%209.88357%2030.7342%209.88357L30.7462%209.87153Z'%20fill='var(--fill-0,%20%2304121B)'%20fill-opacity='0.24'/%3e%3cpath%20d='M48.7317%2017.0224V12.1348H46.324V17.0224H43.82V10.0762H51.2236V17.0224H48.7317Z'%20fill='var(--fill-0,%20%2304121B)'%20fill-opacity='0.24'/%3e%3c/g%3e%3c/svg%3e";
const _sfc_main$3 = {
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const catalogLinks = [
      { label: "Художникам", to: "" },
      { label: "Свадебное", to: "" },
      { label: "Фотоальбомы", to: "" },
      { label: "Текстиль", to: "" },
      { label: "Оформление магазинов", to: "" },
      { label: "Подарки", to: "" },
      { label: "Корпоративная продукция", to: "" },
      { label: "К мероприятиям", to: "" }
    ];
    const companyLinks = [
      { label: "О нас", to: "" },
      { label: "Что мы изготавливаем", to: "/catalog" },
      { label: "Материалы", to: "" },
      { label: "Примеры работ", to: "" },
      { label: "Правовая информация", to: "/legal-information" },
      { label: "Оплата", to: "/payment" },
      { label: "Доставка", to: "/delivery" }
    ];
    const bottomLinks = [
      { label: "Город Верных Сердец", to: "" },
      { label: "Пользовательское соглашение", to: "/user-agreement" },
      { label: "Политика конфиденциальности", to: "/privacy-policy" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppIcon = __nuxt_component_1$2;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-3309272d><div class="footer__container" data-v-3309272d><div class="footer__card" data-v-3309272d><div class="footer__top" data-v-3309272d><div class="footer__column" data-v-3309272d><h3 class="footer__title" data-v-3309272d> Каталог </h3><!--[-->`);
      ssrRenderList(catalogLinks, (item) => {
        _push(`<!--[-->`);
        if (item.to) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.to,
            class: "footer__link"
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
          _push(`<a href="#" class="footer__link" data-v-3309272d>${ssrInterpolate(item.label)}</a>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div><div class="footer__column" data-v-3309272d><h3 class="footer__title" data-v-3309272d> Компания </h3><!--[-->`);
      ssrRenderList(companyLinks, (item) => {
        _push(`<!--[-->`);
        if (item.to) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.to,
            class: "footer__link"
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
          _push(`<a href="#" class="footer__link" data-v-3309272d>${ssrInterpolate(item.label)}</a>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div><div class="footer__column footer__contacts" data-v-3309272d><p class="footer__phone-main" data-v-3309272d> +7 (949) 131-45-44 </p><div class="footer__contact-group" data-v-3309272d><p class="footer__contact-line" data-v-3309272d> +7 (949) 131-45-45 </p><p class="footer__contact-line" data-v-3309272d> +7 (949) 499-69-79 </p><a href="#" class="footer__email" data-v-3309272d> info@indigo-mail.ru </a></div><div class="footer__contact-group" data-v-3309272d><p class="footer__contact-line" data-v-3309272d> Донецк, ул. Постышева, 60 </p><p class="footer__contact-line" data-v-3309272d> Пн-Пт с 09:00 до 18:00 </p></div><div class="footer__social" data-v-3309272d><a href="#" class="footer__social-button" aria-label="Telegram" data-v-3309272d>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "tg",
        class: "footer__social-icon footer__social-icon_tg"
      }, null, _parent));
      _push(`</a><a href="#" class="footer__social-button" aria-label="ВКонтакте" data-v-3309272d>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "vk",
        class: "footer__social-icon footer__social-icon_vk"
      }, null, _parent));
      _push(`</a></div></div></div><div class="footer__info" data-v-3309272d><div class="footer__info-column" data-v-3309272d><img${ssrRenderAttr("src", unref(footerLogo))} alt="Типография Индиго" class="footer__logo" data-v-3309272d><p class="footer__legal-text" data-v-3309272d> ИП РУЧКО АНАСТАСИЯ ВИКТОРОВНА<br data-v-3309272d> ИНН 930900107014<br data-v-3309272d> ОГРНИП 323930100105541 от 25.01.2023г.<br data-v-3309272d> РФ, ДНР. Донецкий г.о., 283054, г. Донецк, ул. Аристова, д.1. </p></div><div class="footer__info-column" data-v-3309272d><img${ssrRenderAttr("src", unref(footerSbp))} alt="СБП" class="footer__sbp" data-v-3309272d><p class="footer__legal-text footer__legal-text_gap" data-v-3309272d> Безналичный расчет<br data-v-3309272d> для юридических лиц и ИП. </p><p class="footer__legal-text" data-v-3309272d> Информация по приказу Минцифры #511 от 02.06.2025 </p></div></div></div><div class="footer__bottom" data-v-3309272d><span class="footer__bottom-item footer__bottom-item_static" data-v-3309272d>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())}, Типография Индиго</span><!--[-->`);
      ssrRenderList(bottomLinks, (item) => {
        _push(`<!--[-->`);
        if (item.to) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.to,
            class: "footer__bottom-item"
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
          _push(`<a href="#" class="footer__bottom-item" data-v-3309272d>${ssrInterpolate(item.label)}</a>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div></footer>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-3309272d"]]);
const title = "Indigo — Печать флагов на заказ";
const description = "Типография Indigo: печать флагов любых размеров и конфигураций. Конструктор флагов, быстрый заказ, доставка по России.";
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const isGridEnabled = computed(() => {
      {
        return false;
      }
    });
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      twitterCard: "summary_large_image"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UApp = __nuxt_component_0;
      const _component_DevGridOverlay = __nuxt_component_1$3;
      const _component_AppHeader = __nuxt_component_2;
      const _component_UMain = _sfc_main$4;
      const _component_NuxtPage = __nuxt_component_4;
      const _component_AppFooter = __nuxt_component_5;
      _push(ssrRenderComponent(_component_UApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isGridEnabled)) {
              _push2(ssrRenderComponent(_component_DevGridOverlay, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_AppHeader, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UMain, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtPage, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtPage)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AppFooter, null, null, _parent2, _scopeId));
          } else {
            return [
              unref(isGridEnabled) ? (openBlock(), createBlock(_component_DevGridOverlay, { key: 0 })) : createCommentVNode("", true),
              createVNode(_component_AppHeader),
              createVNode(_component_UMain, null, {
                default: withCtx(() => [
                  createVNode(_component_NuxtPage)
                ]),
                _: 1
              }),
              createVNode(_component_AppFooter)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    const status = Number(_error.statusCode || 500);
    const is404 = status === 404;
    const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description2 = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-DBFNYTz_.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-BaTLZSKl.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ status: unref(status), statusText: unref(statusText), statusCode: unref(status), statusMessage: unref(statusText), description: unref(description2), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = ((ssrContext) => entry(ssrContext));

export { _export_sfc as _, __nuxt_component_0$1 as a, _sfc_main$e as b, _sfc_main$r as c, __nuxt_component_1 as d, entry_default as default, useState as e, fetchDefaults as f, useAsyncData as g, useRequestFetch as h, _sfc_main$m as i, __nuxt_component_1$2 as j, useSeoMeta as k, useHead as u };
//# sourceMappingURL=server.mjs.map

import { an as executeAsync } from '../nitro/nitro.mjs';
import { l as defineNuxtRouteMiddleware, k as authClient, m as useFetch, n as navigateTo } from './server.mjs';
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
import 'vue';
import 'pinia';
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'vue/server-renderer';
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

const auth = defineNuxtRouteMiddleware(async () => {
  let __temp, __restore;
  const { data: session } = ([__temp, __restore] = executeAsync(() => authClient.useSession(useFetch)), __temp = await __temp, __restore(), __temp);
  if (!session.value) {
    return navigateTo("/");
  }
});

export { auth as default };
//# sourceMappingURL=auth-BEQq-_uW.mjs.map

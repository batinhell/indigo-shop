import { d as defineEventHandler, a as auth, o as getRequestHeaders, c as createError, r as readBody, u as useDatabase } from '../../nitro/nitro.mjs';
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

const normalizeName = (value) => String(value != null ? value : "").trim();
const normalizeOptionalString = (value) => {
  const normalized = String(value != null ? value : "").trim();
  return normalized || null;
};
const profile_patch = defineEventHandler(async (event) => {
  var _a;
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  });
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C"
    });
  }
  const body = await readBody(event);
  const name = normalizeName(body.name);
  const additionalContact = normalizeOptionalString(body.additionalContact);
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing name",
      message: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F"
    });
  }
  const database = useDatabase();
  await database.updateTable("user").set({
    name,
    additionalContact,
    updatedAt: /* @__PURE__ */ new Date()
  }).where("id", "=", session.user.id).execute();
  const user = await database.selectFrom("user").select([
    "id",
    "name",
    "email",
    "emailVerified",
    "phoneNumber",
    "phoneNumberVerified",
    "additionalContact"
  ]).where("id", "=", session.user.id).executeTakeFirst();
  return {
    user: user != null ? user : null
  };
});

export { profile_patch as default };
//# sourceMappingURL=profile.patch.mjs.map

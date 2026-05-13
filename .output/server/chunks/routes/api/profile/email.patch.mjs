import { d as defineEventHandler, a as auth, o as getRequestHeaders, c as createError, r as readBody, K as getRegistrationEmailError, u as useDatabase } from '../../../nitro/nitro.mjs';
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

const isDuplicateEntryError = (error) => {
  var _a;
  return (error == null ? void 0 : error.code) === "ER_DUP_ENTRY" || String((_a = error == null ? void 0 : error.message) != null ? _a : "").includes("Duplicate entry");
};
const email_patch = defineEventHandler(async (event) => {
  var _a, _b;
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  });
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u043E\u0447\u0442\u0443"
    });
  }
  const body = await readBody(event);
  const email = String((_b = body.email) != null ? _b : "").trim().toLowerCase();
  if (getRegistrationEmailError(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email",
      message: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0443\u044E \u043F\u043E\u0447\u0442\u0443"
    });
  }
  const database = useDatabase();
  try {
    await database.updateTable("user").set({
      email,
      emailVerified: false,
      updatedAt: /* @__PURE__ */ new Date()
    }).where("id", "=", session.user.id).execute();
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw createError({
        statusCode: 409,
        statusMessage: "Email already exists",
        message: "\u042D\u0442\u0430 \u043F\u043E\u0447\u0442\u0430 \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F"
      });
    }
    throw error;
  }
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

export { email_patch as default };
//# sourceMappingURL=email.patch.mjs.map

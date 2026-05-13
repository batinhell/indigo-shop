import { d as defineEventHandler, a as auth, o as getRequestHeaders, c as createError, r as readBody, b as normalizePhoneDigits, f as formatAuthPhone, v as verifyNotificoreOtp, l as isNotificoreTimeoutError, u as useDatabase } from '../../../nitro/nitro.mjs';
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

const isHttpError = (error) => typeof error === "object" && error !== null && "statusCode" in error;
const isInternalConfigError = (error) => (error == null ? void 0 : error.statusMessage) === "Notificore is not configured" || (error == null ? void 0 : error.statusMessage) === "Notificore auth failed";
const getUpstreamStatus = (error) => {
  var _a, _b, _c, _d;
  return (_d = (_c = (_a = error == null ? void 0 : error.statusCode) != null ? _a : error == null ? void 0 : error.status) != null ? _c : (_b = error == null ? void 0 : error.response) == null ? void 0 : _b.status) != null ? _d : 0;
};
const isDuplicateEntryError = (error) => {
  var _a;
  return (error == null ? void 0 : error.code) === "ER_DUP_ENTRY" || String((_a = error == null ? void 0 : error.message) != null ? _a : "").includes("Duplicate entry");
};
const phone_patch = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  });
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"
    });
  }
  const body = await readBody(event);
  const authenticationId = String((_b = body.authenticationId) != null ? _b : "").trim();
  const code = String((_c = body.code) != null ? _c : "").replace(/\D/g, "");
  const phoneDigits = normalizePhoneDigits(body.phone);
  const phoneNumber = formatAuthPhone(phoneDigits);
  if (phoneDigits.length !== 11) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid phone",
      message: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u043B\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"
    });
  }
  if (!authenticationId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing authentication id",
      message: "\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u0434 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E"
    });
  }
  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing code",
      message: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0438\u0437 \u0421\u041C\u0421"
    });
  }
  try {
    const result = await verifyNotificoreOtp({ authenticationId, code });
    const recipientDigits = normalizePhoneDigits((_f = (_e = (_d = result == null ? void 0 : result.data) == null ? void 0 : _d.recipient) != null ? _e : result == null ? void 0 : result.recipient) != null ? _f : "");
    if (recipientDigits && recipientDigits !== phoneDigits) {
      throw createError({
        statusCode: 400,
        statusMessage: "Phone mismatch",
        message: "\u041A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043D\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u043D\u043E\u043C\u0435\u0440\u0430"
      });
    }
  } catch (error) {
    console.error("[profile/phone] Notificore error:", error);
    if (isNotificoreTimeoutError(error)) {
      throw createError({
        statusCode: 504,
        statusMessage: "Notificore timeout",
        message: "\u0421\u0435\u0440\u0432\u0438\u0441 \u0421\u041C\u0421 \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B \u0432\u043E\u0432\u0440\u0435\u043C\u044F. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437."
      });
    }
    if (isHttpError(error) && isInternalConfigError(error)) {
      throw error;
    }
    if (isHttpError(error) && error.statusCode === 400) {
      throw error;
    }
    const upstreamStatus = getUpstreamStatus(error);
    throw createError({
      statusCode: upstreamStatus === 422 ? 400 : 502,
      statusMessage: "Notificore verify failed",
      message: upstreamStatus === 422 ? "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043E\u0434 \u0438\u0437 \u0421\u041C\u0421" : "\u041A\u043E\u0434 \u043D\u0435 \u043F\u043E\u0434\u043E\u0448\u0435\u043B :( \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0435\u0433\u043E \u0438\u043B\u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E \u0447\u0435\u0440\u0435\u0437 60 \u0441\u0435\u043A\u0443\u043D\u0434"
    });
  }
  const database = useDatabase();
  try {
    await database.updateTable("user").set({
      phoneNumber,
      phoneNumberVerified: true,
      updatedAt: /* @__PURE__ */ new Date()
    }).where("id", "=", session.user.id).execute();
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw createError({
        statusCode: 409,
        statusMessage: "Phone already exists",
        message: "\u042D\u0442\u043E\u0442 \u043D\u043E\u043C\u0435\u0440 \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F"
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

export { phone_patch as default };
//# sourceMappingURL=phone.patch.mjs.map

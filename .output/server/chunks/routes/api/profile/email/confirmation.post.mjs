import { d as defineEventHandler, a as auth, o as getRequestHeaders, c as createError, u as useDatabase, M as getRequestURL, N as sendNotificoreEmail, l as isNotificoreTimeoutError } from '../../../../nitro/nitro.mjs';
import { randomUUID, randomBytes, createHash } from 'node:crypto';
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
import 'node:url';
import '@iconify/utils';
import 'consola';

const TOKEN_TTL_MS = 60 * 60 * 1e3;
const createToken = () => randomBytes(32).toString("base64url");
const hashToken = (token) => createHash("sha256").update(token).digest("hex");
const getNotificoreErrorMessage = (error) => {
  var _a, _b, _c, _d, _e;
  const validationMessages = Object.values((_b = (_a = error == null ? void 0 : error.data) == null ? void 0 : _a.errors) != null ? _b : {}).flat().filter(Boolean);
  if (validationMessages.length) {
    return validationMessages.join("; ");
  }
  return ((_c = error == null ? void 0 : error.data) == null ? void 0 : _c.errorDescription) || ((_d = error == null ? void 0 : error.data) == null ? void 0 : _d.message) || ((_e = error == null ? void 0 : error.data) == null ? void 0 : _e.error) || (typeof (error == null ? void 0 : error.data) === "string" ? error.data : "") || (error == null ? void 0 : error.message) || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043F\u0438\u0441\u044C\u043C\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F";
};
const getNotificoreErrorDetails = (error) => ({
  status: (error == null ? void 0 : error.status) || (error == null ? void 0 : error.statusCode),
  statusMessage: error == null ? void 0 : error.statusMessage,
  data: error == null ? void 0 : error.data
});
const getNotificoreStatusCode = (error) => {
  const statusCode = (error == null ? void 0 : error.statusCode) || (error == null ? void 0 : error.status) || 502;
  return statusCode >= 500 ? 502 : statusCode;
};
const confirmation_post = defineEventHandler(async (event) => {
  var _a, _b;
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  });
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u043F\u043E\u0447\u0442\u0443"
    });
  }
  const database = useDatabase();
  const user = await database.selectFrom("user").select(["email", "emailVerified"]).where("id", "=", session.user.id).executeTakeFirst();
  const email = String((_b = user == null ? void 0 : user.email) != null ? _b : "").trim().toLowerCase();
  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing email",
      message: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u043E\u0447\u0442\u0443 \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435\u043C"
    });
  }
  const origin = getRequestURL(event).origin;
  const token = createToken();
  const confirmationUrl = `${origin}/api/profile/email/confirm?t=${encodeURIComponent(token)}`;
  const now = /* @__PURE__ */ new Date();
  const expiresAt = new Date(now.getTime() + TOKEN_TTL_MS);
  await database.updateTable("userEmailConfirmationToken").set({
    usedAt: now
  }).where("userId", "=", session.user.id).where("email", "=", email).where("usedAt", "is", null).execute();
  await database.insertInto("userEmailConfirmationToken").values({
    id: randomUUID(),
    userId: session.user.id,
    email,
    tokenHash: hashToken(token),
    expiresAt,
    usedAt: null,
    createdAt: now
  }).execute();
  try {
    const result = await sendNotificoreEmail({
      to: [email],
      subject: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u043E\u0447\u0442\u044B \u0418\u043D\u0434\u0438\u0433\u043E",
      templateContent: {
        confirmationUrl,
        profileUrl: confirmationUrl
      }
    });
    console.info("[profile/email/confirmation] Notificore response:", result);
  } catch (error) {
    const details = getNotificoreErrorDetails(error);
    console.error("[profile/email/confirmation] Notificore error:", details);
    if (isNotificoreTimeoutError(error)) {
      throw createError({
        statusCode: 504,
        statusMessage: "Notificore timeout",
        message: "\u0421\u0435\u0440\u0432\u0438\u0441 email \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B \u0432\u043E\u0432\u0440\u0435\u043C\u044F. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437."
      });
    }
    throw createError({
      statusCode: getNotificoreStatusCode(error),
      statusMessage: "Notificore email failed",
      message: getNotificoreErrorMessage(error),
      data: details.data
    });
  }
  return { ok: true };
});

export { confirmation_post as default };
//# sourceMappingURL=confirmation.post.mjs.map

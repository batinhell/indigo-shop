import { d as defineEventHandler, r as readBody, c as createError, v as verifyNotificoreOtp, i as isNotificoreTimeoutError } from '../../../nitro/nitro.mjs';
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
const verifyCode_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const body = await readBody(event);
  const authenticationId = String((_a = body.authenticationId) != null ? _a : "").trim();
  const code = String((_b = body.code) != null ? _b : "").replace(/\D/g, "");
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
    const data = (_c = result.data) != null ? _c : {};
    return {
      authenticationId: (_d = data.id) != null ? _d : authenticationId,
      status: (_e = data.status) != null ? _e : "verified",
      recipient: (_f = data.recipient) != null ? _f : null,
      expiredAt: (_g = data.expired_at) != null ? _g : null,
      verified: true
    };
  } catch (error) {
    console.error("[verify-code] Notificore error:", error);
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
    const upstreamStatus = getUpstreamStatus(error);
    throw createError({
      statusCode: upstreamStatus === 422 ? 400 : 502,
      statusMessage: "Notificore verify failed",
      message: upstreamStatus === 422 ? "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043E\u0434 \u0438\u0437 \u0421\u041C\u0421" : "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F"
    });
  }
});

export { verifyCode_post as default };
//# sourceMappingURL=verify-code.post.mjs.map

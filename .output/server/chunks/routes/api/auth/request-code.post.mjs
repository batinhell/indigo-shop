import { d as defineEventHandler, r as readBody, b as normalizePhoneDigits, c as createError, e as assertRateLimit, g as sendNotificoreOtp, h as getNotificoreAuthenticationPayload, i as assertSuccessfulNotificoreOtpResponse, j as setResponseStatus, k as getNotificoreAuthenticationId, l as isNotificoreTimeoutError } from '../../../nitro/nitro.mjs';
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
const requestCode_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const body = await readBody(event);
  const phone = normalizePhoneDigits(body.phone);
  if (phone.length !== 11) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid phone",
      message: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u043B\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"
    });
  }
  if (!body.isPersonalDataAccepted || !body.isUserAgreementAccepted) {
    throw createError({
      statusCode: 400,
      statusMessage: "Required agreements are not accepted",
      message: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043F\u0440\u0438\u043D\u044F\u0442\u044C \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0443 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0435 \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435"
    });
  }
  assertRateLimit(`otp:${phone}`, 6e4);
  try {
    const result = await sendNotificoreOtp({ phone });
    const data = getNotificoreAuthenticationPayload(result);
    assertSuccessfulNotificoreOtpResponse(data);
    setResponseStatus(event, 201);
    return {
      authenticationId: getNotificoreAuthenticationId(data),
      status: (_a = data.status) != null ? _a : "pending",
      recipient: (_b = data.recipient) != null ? _b : phone,
      expiredAt: (_c = data.expired_at) != null ? _c : null
    };
  } catch (error) {
    console.error("[request-code] Notificore error:", error);
    if (isNotificoreTimeoutError(error)) {
      throw createError({
        statusCode: 504,
        statusMessage: "Notificore timeout",
        message: "\u0421\u0435\u0440\u0432\u0438\u0441 \u0421\u041C\u0421 \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B \u0432\u043E\u0432\u0440\u0435\u043C\u044F. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u0434 \u0435\u0449\u0451 \u0440\u0430\u0437."
      });
    }
    if (isHttpError(error)) {
      throw error;
    }
    throw createError({
      statusCode: 502,
      statusMessage: "Notificore request failed",
      message: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F"
    });
  }
});

export { requestCode_post as default };
//# sourceMappingURL=request-code.post.mjs.map

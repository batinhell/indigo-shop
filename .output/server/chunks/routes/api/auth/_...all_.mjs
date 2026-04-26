import { d as defineEventHandler, t as toWebRequest, a as auth, s as sendWebResponse } from '../../../nitro/nitro.mjs';
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

const EMAIL_EXISTS_MESSAGE = "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u0442\u0430\u043A\u043E\u0439 \u043F\u043E\u0447\u0442\u043E\u0439 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C \u0438\u043B\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u0443\u044E \u043F\u043E\u0447\u0442\u0443.";
const EMAIL_ALREADY_EXISTS_CODES = /* @__PURE__ */ new Set([
  "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
  "USER_ALREADY_EXISTS",
  "EMAIL_ALREADY_EXISTS"
]);
function extractErrorCode(payload) {
  var _a, _b;
  if (!payload || typeof payload !== "object") {
    return "";
  }
  return String(
    payload.code || ((_a = payload.error) == null ? void 0 : _a.code) || ((_b = payload.data) == null ? void 0 : _b.code) || ""
  ).toUpperCase();
}
async function normalizeSignUpEmailError(response) {
  if (response.status < 400) {
    return response;
  }
  const payload = await response.clone().json().catch(() => null);
  const errorCode = extractErrorCode(payload);
  if (!EMAIL_ALREADY_EXISTS_CODES.has(errorCode)) {
    return response;
  }
  const headers = new Headers(response.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  headers.delete("content-length");
  return new Response(JSON.stringify({
    code: "EMAIL_ALREADY_EXISTS",
    message: EMAIL_EXISTS_MESSAGE
  }), {
    status: 409,
    statusText: "Conflict",
    headers
  });
}
const ____all_ = defineEventHandler(async (event) => {
  const request = toWebRequest(event);
  let response = await auth.handler(request);
  const requestPath = new URL(request.url).pathname;
  const isSignUpEmailRequest = request.method === "POST" && requestPath.endsWith("/sign-up/email");
  if (isSignUpEmailRequest) {
    response = await normalizeSignUpEmailError(response);
  }
  return sendWebResponse(event, response);
});

export { ____all_ as default };
//# sourceMappingURL=_...all_.mjs.map

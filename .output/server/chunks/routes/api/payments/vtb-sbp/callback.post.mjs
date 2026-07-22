import { d as defineEventHandler, r as readBody, u as useDatabase, U as findPaymentAttemptByVtbCallback, P as refreshSbpPaymentAttempt } from '../../../../nitro/nitro.mjs';
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

function getCallbackObject(body) {
  return (body == null ? void 0 : body.object) && typeof body.object === "object" ? body.object : body;
}
const callback_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  const callback = getCallbackObject(body);
  const bankOrderId = String((callback == null ? void 0 : callback.orderId) || ((_a = callback == null ? void 0 : callback.sbpParams) == null ? void 0 : _a.requestId) || "").trim();
  const qrId = String(((_b = callback == null ? void 0 : callback.sbpParams) == null ? void 0 : _b.qrcId) || (callback == null ? void 0 : callback.qrcId) || "").trim();
  const paymentId = String((callback == null ? void 0 : callback.paymentId) || "").trim();
  if (!bankOrderId && !qrId && !paymentId) return { ok: true };
  const database = useDatabase();
  const attempt = await findPaymentAttemptByVtbCallback(database, { bankOrderId, qrId, paymentId });
  if (!attempt) return { ok: true };
  await refreshSbpPaymentAttempt(database, attempt, { callback: body });
  return { ok: true };
});

export { callback_post as default };
//# sourceMappingURL=callback.post.mjs.map

import { d as defineEventHandler, r as readBody, u as useDatabase, J as refreshVtbPaymentStatus } from '../../../../nitro/nitro.mjs';
import 'node:fs/promises';
import 'kysely';
import 'node:child_process';
import 'node:path';
import 'better-auth';
import 'better-auth/plugins';
import 'mysql2';
import 'qrcode';
import 'node:fs';
import 'node:https';
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
async function findSiteOrderByVtbCallback(database, { requestId, qrId }) {
  return database.selectFrom("site_orders").selectAll().where((eb) => {
    const conditions = [];
    if (requestId) {
      conditions.push(eb("order_number", "=", requestId));
    }
    if (qrId) {
      conditions.push(eb("vtb_qr_id", "=", qrId));
    }
    return conditions.length ? eb.or(conditions) : eb("id", "=", -1);
  }).executeTakeFirst();
}
const callback_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  const callback = getCallbackObject(body);
  const requestId = String((callback == null ? void 0 : callback.orderId) || ((_a = callback == null ? void 0 : callback.sbpParams) == null ? void 0 : _a.requestId) || "").trim();
  const qrId = String(((_b = callback == null ? void 0 : callback.sbpParams) == null ? void 0 : _b.qrcId) || (callback == null ? void 0 : callback.qrcId) || "").trim();
  if (!requestId && !qrId) {
    return { ok: true };
  }
  const database = useDatabase();
  const siteOrder = await findSiteOrderByVtbCallback(database, { requestId, qrId });
  if (!(siteOrder == null ? void 0 : siteOrder.vtb_qr_id)) {
    return { ok: true };
  }
  await refreshVtbPaymentStatus(database, siteOrder, {
    payloadPatch: { callback: body }
  });
  return { ok: true };
});

export { callback_post as default };
//# sourceMappingURL=callback.post.mjs.map

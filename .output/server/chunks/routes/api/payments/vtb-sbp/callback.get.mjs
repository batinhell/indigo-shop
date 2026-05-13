import { d as defineEventHandler, z as getQuery, u as useDatabase, y as getPaymentStatusFromVtbQr } from '../../../../nitro/nitro.mjs';
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

const callback_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const mdOrder = typeof query.mdOrder === "string" ? query.mdOrder : "";
  const orderNumber = typeof query.orderNumber === "string" ? query.orderNumber : "";
  const operation = typeof query.operation === "string" ? query.operation : "";
  const callbackStatus = typeof query.status === "string" ? query.status : "";
  const nspkCode = typeof query["sbp.c2b.operation.nspkCode"] === "string" ? query["sbp.c2b.operation.nspkCode"] : "";
  if (!mdOrder && !orderNumber) {
    return { ok: true };
  }
  const database = useDatabase();
  const payment = await database.selectFrom("order_payments").selectAll().where((eb) => {
    const conditions = [];
    if (mdOrder) {
      conditions.push(eb("vtb_md_order", "=", mdOrder));
    }
    if (orderNumber) {
      conditions.push(eb("order_number", "=", orderNumber));
    }
    return eb.or(conditions);
  }).executeTakeFirst();
  if (!payment) {
    return { ok: true };
  }
  let paymentStatus = "pending";
  if (operation === "deposited" && callbackStatus === "1") {
    paymentStatus = "paid";
  } else if (operation === "deposited" && callbackStatus === "0") {
    paymentStatus = "failed";
  } else {
    paymentStatus = getPaymentStatusFromVtbQr(nspkCode, "");
  }
  const now = /* @__PURE__ */ new Date();
  const update = {
    status: paymentStatus,
    vtb_error_code: nspkCode || null,
    vtb_status_response: JSON.stringify(query),
    last_checked_at: now,
    updated_at: now
  };
  if (paymentStatus === "paid") {
    update.paid_at = now;
  }
  await database.updateTable("order_payments").set(update).where("id", "=", payment.id).execute();
  return { ok: true };
});

export { callback_get as default };
//# sourceMappingURL=callback.get.mjs.map

import { d as defineEventHandler, p as assertInternalShopToken, w as getRouterParam, c as createError, u as useDatabase, B as refreshSiteOrderRefund } from '../../../../../../nitro/nitro.mjs';
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

const _refundId__get = defineEventHandler(async (event) => {
  assertInternalShopToken(event);
  const orderId = Number(getRouterParam(event, "orderId"));
  const refundId = String(getRouterParam(event, "refundId") || "").trim();
  if (!Number.isInteger(orderId) || orderId <= 0 || !refundId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid refund request",
      message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u043A\u0430\u0437\u0430 \u0438\u043B\u0438 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430"
    });
  }
  const database = useDatabase();
  const [order, refund] = await Promise.all([
    database.selectFrom("site_orders").selectAll().where("id", "=", orderId).executeTakeFirst(),
    database.selectFrom("site_order_refunds").selectAll().where("site_order_id", "=", orderId).where("refund_id", "=", refundId).executeTakeFirst()
  ]);
  if (!order || !refund) {
    throw createError({
      statusCode: 404,
      statusMessage: "Refund not found",
      message: "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
    });
  }
  if (["completed", "failed"].includes(refund.status)) {
    return { refund };
  }
  return { refund: await refreshSiteOrderRefund(database, order, refund) };
});

export { _refundId__get as default };
//# sourceMappingURL=_refundId_.get.mjs.map

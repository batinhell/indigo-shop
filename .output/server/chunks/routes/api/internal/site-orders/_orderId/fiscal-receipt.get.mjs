import { d as defineEventHandler, p as assertInternalShopToken, w as getRouterParam, c as createError, u as useDatabase, x as enqueueSaleFiscalReceipt } from '../../../../../nitro/nitro.mjs';
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

const fiscalReceipt_get = defineEventHandler(async (event) => {
  assertInternalShopToken(event);
  const orderId = Number(getRouterParam(event, "orderId"));
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid order id",
      message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
  const database = useDatabase();
  const order = await database.selectFrom("site_orders").select(["id", "payment_status"]).where("id", "=", orderId).executeTakeFirst();
  if (!order) {
    throw createError({ statusCode: 404, statusMessage: "Order not found", message: "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" });
  }
  if (order.payment_status === "paid") {
    await enqueueSaleFiscalReceipt(database, orderId);
  }
  const receipts = await database.selectFrom("site_order_fiscal_receipts").selectAll().where("site_order_id", "=", orderId).orderBy("created_at", "desc").execute();
  return { fiscalReceipts: receipts };
});

export { fiscalReceipt_get as default };
//# sourceMappingURL=fiscal-receipt.get.mjs.map

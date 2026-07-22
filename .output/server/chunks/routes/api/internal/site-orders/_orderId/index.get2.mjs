import { d as defineEventHandler, p as assertInternalShopToken, w as getRouterParam, c as createError, u as useDatabase } from '../../../../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
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
  const refunds = await database.selectFrom("site_order_refunds").selectAll().where("site_order_id", "=", orderId).orderBy("requested_at", "desc").execute();
  return { refunds };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map

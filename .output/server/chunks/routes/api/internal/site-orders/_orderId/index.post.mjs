import { d as defineEventHandler, p as assertInternalShopToken, w as getRouterParam, c as createError, r as readBody, u as useDatabase, C as requestSiteOrderRefund } from '../../../../../nitro/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  assertInternalShopToken(event);
  const orderId = Number(getRouterParam(event, "orderId"));
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid order id",
      message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
  const body = await readBody(event);
  const database = useDatabase();
  const order = await database.selectFrom("site_orders").selectAll().where("id", "=", orderId).executeTakeFirst();
  if (!order) {
    throw createError({
      statusCode: 404,
      statusMessage: "Order not found",
      message: "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
    });
  }
  const refund = await requestSiteOrderRefund(database, order, body);
  return { refund };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map

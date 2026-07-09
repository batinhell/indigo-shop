import { d as defineEventHandler, r as readBody, D as normalizeSiteOrderItems, E as getSiteOrderItemsAmount, c as createError, u as useDatabase, F as createSiteOrder } from '../../nitro/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const items = normalizeSiteOrderItems(body == null ? void 0 : body.items);
  const itemsAmount = getSiteOrderItemsAmount(items);
  const amount = itemsAmount || Number(body == null ? void 0 : body.amount);
  if (!items.length || !amount) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid order",
      message: "\u041D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u044B \u043F\u043E\u0437\u0438\u0446\u0438\u0438 \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
  const database = useDatabase();
  const order = await createSiteOrder(database, event, {
    items,
    amount,
    checkout: body == null ? void 0 : body.checkout
  });
  return {
    order: {
      id: order.id,
      orderNumber: order.orderNumber,
      accessToken: order.accessToken,
      amount: order.amount,
      status: "pending"
    }
  };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map

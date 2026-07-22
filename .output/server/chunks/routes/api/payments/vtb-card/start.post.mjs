import { d as defineEventHandler, r as readBody, c as createError, u as useDatabase, D as getOwnedSiteOrder, T as startCardPaymentAttempt, Q as serializePaymentAttempt } from '../../../../nitro/nitro.mjs';
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

const start_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const orderId = Number(body == null ? void 0 : body.orderId);
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid order id",
      message: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u043A\u0430\u0437"
    });
  }
  const database = useDatabase();
  const order = await getOwnedSiteOrder(database, event, orderId, body == null ? void 0 : body.accessToken);
  const attempt = await startCardPaymentAttempt(database, order.id);
  return { payment: serializePaymentAttempt(attempt) };
});

export { start_post as default };
//# sourceMappingURL=start.post.mjs.map

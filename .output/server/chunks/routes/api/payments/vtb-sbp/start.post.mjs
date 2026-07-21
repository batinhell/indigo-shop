import { d as defineEventHandler, r as readBody, c as createError, u as useDatabase, D as getOwnedSiteOrder, V as startSbpPaymentAttempt, Q as serializePaymentAttempt } from '../../../../nitro/nitro.mjs';
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

const start_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const orderId = Number(body == null ? void 0 : body.orderId);
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid order id",
      message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
  const database = useDatabase();
  await getOwnedSiteOrder(database, event, orderId, body == null ? void 0 : body.accessToken);
  const attempt = await startSbpPaymentAttempt(database, orderId);
  return { payment: serializePaymentAttempt(attempt) };
});

export { start_post as default };
//# sourceMappingURL=start.post.mjs.map

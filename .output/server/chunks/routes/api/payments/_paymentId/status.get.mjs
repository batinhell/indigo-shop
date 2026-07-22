import { d as defineEventHandler, w as getRouterParam, c as createError, u as useDatabase, N as getPaymentAttempt, O as getHeader, E as getQuery, D as getOwnedSiteOrder, P as refreshSbpPaymentAttempt, Q as serializePaymentAttempt } from '../../../../nitro/nitro.mjs';
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

const status_get = defineEventHandler(async (event) => {
  const attemptId = Number(getRouterParam(event, "paymentId"));
  if (!Number.isInteger(attemptId) || attemptId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid payment id",
      message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u043F\u043B\u0430\u0442\u0435\u0436\u0430"
    });
  }
  const database = useDatabase();
  const attempt = await getPaymentAttempt(database, attemptId);
  if (!attempt) {
    throw createError({
      statusCode: 404,
      statusMessage: "Payment not found",
      message: "\u041F\u043B\u0430\u0442\u0451\u0436 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
    });
  }
  const accessToken = String(
    getHeader(event, "x-order-access-token") || getQuery(event).accessToken || ""
  ).trim();
  await getOwnedSiteOrder(database, event, Number(attempt.site_order_id), accessToken);
  const refreshedAttempt = await refreshSbpPaymentAttempt(database, attempt);
  return { payment: serializePaymentAttempt(refreshedAttempt) };
});

export { status_get as default };
//# sourceMappingURL=status.get.mjs.map

import { d as defineEventHandler, r as readBody, c as createError, u as useDatabase, D as getOwnedSiteOrder, R as createOrGetInvoice, S as sendInvoiceEmail, A as serializeInvoice } from '../../../../nitro/nitro.mjs';
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
    throw createError({ statusCode: 400, statusMessage: "Invalid order id", message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430" });
  }
  const accessToken = String((body == null ? void 0 : body.accessToken) || "").trim();
  const database = useDatabase();
  const order = await getOwnedSiteOrder(database, event, orderId, accessToken);
  const { invoice, created } = await createOrGetInvoice(database, event, order);
  if (created) {
    sendInvoiceEmail(database, event, invoice, order, accessToken).catch((error) => {
      console.error("[invoice/email] Async delivery failed:", error);
    });
  }
  return {
    invoice: serializeInvoice(invoice, order, accessToken)
  };
});

export { start_post as default };
//# sourceMappingURL=start.post.mjs.map

import { d as defineEventHandler, p as assertInternalShopToken, q as getRouterParam, c as createError, u as useDatabase, w as getInvoiceByOrderId, x as sendInvoicePdf } from '../../../../../../nitro/nitro.mjs';
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

const download_get = defineEventHandler(async (event) => {
  assertInternalShopToken(event);
  const orderId = Number(getRouterParam(event, "orderId"));
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({ statusCode: 400, statusMessage: "Invalid order id", message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430" });
  }
  const database = useDatabase();
  const invoice = await getInvoiceByOrderId(database, orderId);
  if (!invoice) {
    throw createError({ statusCode: 404, statusMessage: "Invoice not found", message: "\u0421\u0447\u0451\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" });
  }
  return sendInvoicePdf(event, invoice);
});

export { download_get as default };
//# sourceMappingURL=download.get.mjs.map

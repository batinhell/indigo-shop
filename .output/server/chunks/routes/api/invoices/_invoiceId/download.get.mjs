import { d as defineEventHandler, q as getRouterParam, c as createError, u as useDatabase, z as getOwnedSiteOrder, A as getQuery, x as sendInvoicePdf } from '../../../../nitro/nitro.mjs';
import 'node:fs/promises';
import 'kysely';
import 'node:child_process';
import 'node:path';
import 'better-auth';
import 'better-auth/plugins';
import 'mysql2';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const download_get = defineEventHandler(async (event) => {
  const invoiceId = Number(getRouterParam(event, "invoiceId"));
  if (!Number.isInteger(invoiceId) || invoiceId <= 0) {
    throw createError({ statusCode: 400, statusMessage: "Invalid invoice id", message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0441\u0447\u0451\u0442\u0430" });
  }
  const database = useDatabase();
  const invoice = await database.selectFrom("site_order_invoices").selectAll().where("id", "=", invoiceId).executeTakeFirst();
  if (!invoice) {
    throw createError({ statusCode: 404, statusMessage: "Invoice not found", message: "\u0421\u0447\u0451\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" });
  }
  await getOwnedSiteOrder(database, event, Number(invoice.site_order_id), getQuery(event).accessToken);
  return sendInvoicePdf(event, invoice);
});

export { download_get as default };
//# sourceMappingURL=download.get.mjs.map

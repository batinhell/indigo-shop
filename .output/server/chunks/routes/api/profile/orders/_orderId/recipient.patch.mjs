import { d as defineEventHandler, w as getRouterParam, c as createError, r as readBody, u as useDatabase, aa as updateSiteOrderRecipient } from '../../../../../nitro/nitro.mjs';
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

const recipient_patch = defineEventHandler(async (event) => {
  var _a, _b;
  const orderId = Number(getRouterParam(event, "orderId"));
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid order id",
      message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
  const body = await readBody(event);
  const name = String(((_a = body == null ? void 0 : body.recipient) == null ? void 0 : _a.name) || "").trim();
  const phone = String(((_b = body == null ? void 0 : body.recipient) == null ? void 0 : _b.phone) || "").trim();
  if (!name || !phone) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid recipient",
      message: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u043C\u044F \u0438 \u0442\u0435\u043B\u0435\u0444\u043E\u043D \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F"
    });
  }
  const database = useDatabase();
  const recipient = await updateSiteOrderRecipient(database, event, orderId, { name, phone });
  return { recipient };
});

export { recipient_patch as default };
//# sourceMappingURL=recipient.patch.mjs.map

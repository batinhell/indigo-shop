import { d as defineEventHandler, r as readBody, D as normalizeSiteOrderItems, E as getSiteOrderItemsAmount, c as createError, u as useDatabase, M as createSiteOrderNumber, N as markSiteOrderPaymentPending, O as getVtbDynamicQr, P as getVtbQrExpiresAt, Q as saveSiteOrderVtbQr, R as mergeVtbPaymentPayload, F as createSiteOrder, z as getOwnedSiteOrder } from '../../../../nitro/nitro.mjs';
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

async function resolveOrder(event, database, body, items, amount) {
  const orderId = Number(body == null ? void 0 : body.orderId);
  if (!Number.isInteger(orderId) || orderId <= 0) {
    const order2 = await createSiteOrder(database, event, {
      items,
      amount,
      checkout: body == null ? void 0 : body.checkout
    });
    return order2.id;
  }
  const order = await getOwnedSiteOrder(database, event, orderId, body == null ? void 0 : body.accessToken);
  return Number(order.id);
}
const start_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const body = await readBody(event);
  const items = normalizeSiteOrderItems(body == null ? void 0 : body.items);
  const bodyAmount = Number(body == null ? void 0 : body.amount);
  const itemsAmount = getSiteOrderItemsAmount(items);
  const amount = Number.isFinite(bodyAmount) && bodyAmount > 0 ? Math.round(bodyAmount * 100) / 100 : itemsAmount;
  if (!amount) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid payment amount",
      message: "\u041D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u0430 \u0441\u0443\u043C\u043C\u0430 \u043E\u043F\u043B\u0430\u0442\u044B"
    });
  }
  const database = useDatabase();
  const orderId = await resolveOrder(event, database, body, items, amount);
  const existingOrder = await database.selectFrom("site_orders").selectAll().where("id", "=", orderId).executeTakeFirst();
  const orderNumber = (existingOrder == null ? void 0 : existingOrder.order_number) || createSiteOrderNumber(orderId);
  const siteOrderId = await markSiteOrderPaymentPending(database, {
    siteOrderId: orderId,
    orderNumber,
    amount
  });
  try {
    const description = `\u0417\u0430\u043A\u0430\u0437 Indigo #${orderId}`;
    const qr = await getVtbDynamicQr(orderNumber, { amount, description });
    const expiresAt = getVtbQrExpiresAt();
    await saveSiteOrderVtbQr(database, siteOrderId, qr, expiresAt);
    return {
      payment: {
        id: siteOrderId,
        orderId,
        orderNumber,
        status: "pending",
        amount,
        expiresAt,
        qrId: qr.qrId,
        qrPayload: (_a = qr.payload) != null ? _a : null,
        qrImage: (_b = qr.renderedQr) != null ? _b : null
      }
    };
  } catch (error) {
    const order = await database.selectFrom("site_orders").select(["payload"]).where("id", "=", siteOrderId).executeTakeFirst();
    await database.updateTable("site_orders").set({
      payment_status: "failed",
      payload: mergeVtbPaymentPayload(order == null ? void 0 : order.payload, {
        lastError: {
          errorCode: ((_c = error == null ? void 0 : error.data) == null ? void 0 : _c.errorCode) ? String(error.data.errorCode) : null,
          errorMessage: ((_d = error == null ? void 0 : error.data) == null ? void 0 : _d.errorMessage) || (error == null ? void 0 : error.message) || "VTB payment failed",
          response: (error == null ? void 0 : error.data) || null
        }
      }),
      updated_at: /* @__PURE__ */ new Date()
    }).where("id", "=", siteOrderId).execute();
    throw error;
  }
});

export { start_post as default };
//# sourceMappingURL=start.post.mjs.map

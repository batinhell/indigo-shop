import { d as defineEventHandler, r as readBody, c as createError, u as useDatabase, A as createPendingOrderPayment, B as registerVtbOrder, C as getRequestIP, D as saveVtbRegistration, E as getVtbDynamicQr, F as getVtbQrExpiresAt, G as saveVtbQr } from '../../../../nitro/nitro.mjs';
import 'better-auth';
import 'better-auth/plugins';
import 'kysely';
import 'mysql2';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const MAX_ITEMS = 100;
function normalizeAmount(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }
  return Math.round(amount * 100) / 100;
}
function normalizeItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.slice(0, MAX_ITEMS).map((item, index) => {
    var _a, _b;
    const quantity = Math.max(1, Number.parseInt(item == null ? void 0 : item.quantity, 10) || 1);
    const unitPrice = (_a = normalizeAmount(item == null ? void 0 : item.unitPrice)) != null ? _a : 0;
    const designPrice = (_b = normalizeAmount(item == null ? void 0 : item.designPrice)) != null ? _b : 0;
    const name = String((item == null ? void 0 : item.name) || `\u041F\u043E\u0437\u0438\u0446\u0438\u044F ${index + 1}`).slice(0, 255);
    const description = String((item == null ? void 0 : item.description) || "").trim();
    return {
      name,
      description,
      quantity,
      unitPrice,
      designPrice,
      total: Math.round((unitPrice * quantity + designPrice) * 100) / 100
    };
  }).filter((item) => item.total > 0);
}
function getItemsAmount(items) {
  return Math.round(items.reduce((sum, item) => sum + item.total, 0) * 100) / 100;
}
function createOrderNumber(orderId) {
  const suffix = Date.now().toString(36).toUpperCase();
  return `SITE-${orderId}-${suffix}`.slice(0, 36);
}
async function createSiteOrder(database, items, amount) {
  const now = /* @__PURE__ */ new Date();
  const result = await database.insertInto("orders").values({
    name: "\u0417\u0430\u043A\u0430\u0437 \u0441 \u0441\u0430\u0439\u0442\u0430",
    sum: String(amount),
    status: "0",
    info: JSON.stringify({ source: "site", items }),
    created_at: now,
    updated_at: now
  }).executeTakeFirst();
  const orderId = Number(result.insertId);
  if (!orderId) {
    throw createError({
      statusCode: 500,
      statusMessage: "Order was not created",
      message: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u043A\u0430\u0437"
    });
  }
  if (items.length) {
    await database.insertInto("order_positions").values(items.map((item) => ({
      order_id: orderId,
      name: [item.name, item.description].filter(Boolean).join(", ").slice(0, 255),
      status: 0,
      created_at: now,
      updated_at: now
    }))).execute();
  }
  return orderId;
}
async function resolveOrder(database, body, items, amount) {
  const orderId = Number(body == null ? void 0 : body.orderId);
  if (!Number.isInteger(orderId) || orderId <= 0) {
    return createSiteOrder(database, items, amount);
  }
  const order = await database.selectFrom("orders").select(["id", "sum"]).where("id", "=", orderId).executeTakeFirst();
  if (!order) {
    throw createError({
      statusCode: 404,
      statusMessage: "Order not found",
      message: "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
    });
  }
  return Number(order.id);
}
const start_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const body = await readBody(event);
  const items = normalizeItems(body == null ? void 0 : body.items);
  const bodyAmount = normalizeAmount(body == null ? void 0 : body.amount);
  const itemsAmount = getItemsAmount(items);
  const amount = bodyAmount != null ? bodyAmount : itemsAmount;
  if (!amount) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid payment amount",
      message: "\u041D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u0430 \u0441\u0443\u043C\u043C\u0430 \u043E\u043F\u043B\u0430\u0442\u044B"
    });
  }
  const database = useDatabase();
  const orderId = await resolveOrder(database, body, items, amount);
  const orderNumber = createOrderNumber(orderId);
  const paymentId = await createPendingOrderPayment(database, {
    orderId,
    orderNumber,
    amount
  });
  try {
    const amountMinor = Math.round(amount * 100);
    const registration = await registerVtbOrder({
      orderNumber,
      amountMinor,
      description: `\u0417\u0430\u043A\u0430\u0437 Indigo #${orderId}`,
      ip: getRequestIP(event, { xForwardedFor: true })
    });
    await saveVtbRegistration(database, paymentId, registration);
    const qr = await getVtbDynamicQr(registration.orderId);
    const expiresAt = getVtbQrExpiresAt();
    await saveVtbQr(database, paymentId, qr, expiresAt);
    return {
      payment: {
        id: paymentId,
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
    await database.updateTable("order_payments").set({
      status: "failed",
      vtb_error_code: ((_c = error == null ? void 0 : error.data) == null ? void 0 : _c.errorCode) ? String(error.data.errorCode) : null,
      vtb_error_message: ((_d = error == null ? void 0 : error.data) == null ? void 0 : _d.errorMessage) || (error == null ? void 0 : error.message) || "VTB payment failed",
      updated_at: /* @__PURE__ */ new Date()
    }).where("id", "=", paymentId).execute();
    throw error;
  }
});

export { start_post as default };
//# sourceMappingURL=start.post.mjs.map

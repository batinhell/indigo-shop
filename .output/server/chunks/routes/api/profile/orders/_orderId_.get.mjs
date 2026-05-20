import { d as defineEventHandler, p as getRouterParam, c as createError, u as useDatabase, w as getOwnedSiteOrder } from '../../../../nitro/nitro.mjs';
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

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("ru-RU")} \u20BD`;
}
function getStatusLabel(status) {
  return {
    pending: "\u041E\u0436\u0438\u0434\u0430\u0435\u0442 \u043E\u043F\u043B\u0430\u0442\u044B",
    paid: "\u041E\u043F\u043B\u0430\u0447\u0435\u043D",
    failed: "\u041E\u043F\u043B\u0430\u0442\u0430 \u043D\u0435 \u043F\u0440\u043E\u0448\u043B\u0430",
    expired: "\u041E\u043F\u043B\u0430\u0442\u0430 \u0438\u0441\u0442\u0435\u043A\u043B\u0430",
    cancelled: "\u041E\u0442\u043C\u0435\u043D\u0435\u043D"
  }[status] || "\u041E\u0436\u0438\u0434\u0430\u0435\u0442 \u043E\u043F\u043B\u0430\u0442\u044B";
}
function parsePayload(value) {
  if (!value) return null;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
const _orderId__get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e;
  const orderId = Number(getRouterParam(event, "orderId"));
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid order id",
      message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
  const database = useDatabase();
  const order = await getOwnedSiteOrder(database, event, orderId);
  const orderPayload = parsePayload(order.payload) || {};
  const checkout = orderPayload.checkout || {};
  const items = await database.selectFrom("site_order_items").selectAll().where("site_order_id", "=", orderId).orderBy("id", "asc").execute();
  return {
    order: {
      id: Number(order.id),
      publicNumber: order.order_number || `SITE-${order.id}`,
      titleLabel: `\u0417\u0430\u043A\u0430\u0437 ${order.order_number || `SITE-${order.id}`}`,
      status: order.payment_status,
      statusLabel: getStatusLabel(order.payment_status),
      paymentStatus: order.payment_status,
      createdAt: order.created_at,
      totalPrice: Number(order.amount || 0),
      totalPriceLabel: formatMoney(order.amount),
      delivery: {
        type: "\u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437",
        address: "\u0414\u041D\u0420, \u0414\u043E\u043D\u0435\u0446\u043A, \u0443\u043B. \u041F\u043E\u0441\u0442\u044B\u0448\u0435\u0432\u0430, \u0434\u043E\u043C 60"
      },
      recipient: {
        name: ((_a = checkout.recipient) == null ? void 0 : _a.name) || ((_b = checkout.customer) == null ? void 0 : _b.name) || "",
        phone: ((_c = checkout.recipient) == null ? void 0 : _c.phone) || ((_d = checkout.customer) == null ? void 0 : _d.phone) || "",
        type: ((_e = checkout.recipient) == null ? void 0 : _e.type) || "self"
      },
      items: items.map((item) => {
        const payload = parsePayload(item.payload) || {};
        return {
          id: Number(item.id),
          productId: item.product_id ? Number(item.product_id) : null,
          title: item.name,
          description: item.description,
          quantity: Number(item.quantity || 1),
          quantityLabel: `${Number(item.quantity || 1)} \u0448\u0442.`,
          unitPrice: Number(item.unit_price || 0),
          unitPriceLabel: formatMoney(item.unit_price),
          designPrice: Number(item.design_price || 0),
          customerComment: payload.customerComment || "",
          totalPrice: Number(item.total || 0),
          totalPriceLabel: formatMoney(item.total),
          config: payload.config || {}
        };
      }),
      summary: {
        title: "\u0418\u0442\u043E\u0433\u043E",
        itemsCount: items.length,
        total: Number(order.amount || 0),
        totalLabel: formatMoney(order.amount)
      },
      canCancel: ["pending", "failed", "expired"].includes(order.payment_status),
      canRepeat: true
    }
  };
});

export { _orderId__get as default };
//# sourceMappingURL=_orderId_.get.mjs.map

import { d as defineEventHandler, a6 as getCurrentSiteUser, u as useDatabase, a0 as parseSiteOrderPayload, a7 as getSitePaymentStatusMeta } from '../../../nitro/nitro.mjs';
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

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("ru-RU")} \u20BD`;
}
function formatDate(value) {
  if (!value) return "\u0421\u043E\u0437\u0434\u0430\u043D \u043D\u0435\u0434\u0430\u0432\u043D\u043E";
  return `\u0421\u043E\u0437\u0434\u0430\u043D ${new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(value))}`;
}
function pluralPositions(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} \u043F\u043E\u0437\u0438\u0446\u0438\u044F`;
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return `${count} \u043F\u043E\u0437\u0438\u0446\u0438\u0438`;
  return `${count} \u043F\u043E\u0437\u0438\u0446\u0438\u0439`;
}
function getSizeLabel(description) {
  const value = String(description || "").trim();
  if (!value) return "\u2014";
  const sizeMatch = value.match(/\d+(?:[.,]\d+)?\s*[xх×]\s*\d+(?:[.,]\d+)?(?:\s*(?:см|мм|м))?/i);
  if (sizeMatch) return sizeMatch[0].replace(/\s+/g, " ");
  return value.split(",").map((part) => part.trim()).find((part) => /\d/.test(part)) || "\u2014";
}
const index_get = defineEventHandler(async (event) => {
  const user = await getCurrentSiteUser(event);
  const database = useDatabase();
  const orders = await database.selectFrom("site_orders").leftJoin("site_order_items", "site_order_items.site_order_id", "site_orders.id").select([
    "site_orders.id as id",
    "site_orders.order_number as order_number",
    "site_orders.amount as amount",
    "site_orders.payment_status as payment_status",
    "site_orders.created_at as created_at",
    database.fn.count("site_order_items.id").as("items_count")
  ]).where("site_orders.site_user_id", "=", String(user.id)).groupBy([
    "site_orders.id",
    "site_orders.order_number",
    "site_orders.amount",
    "site_orders.payment_status",
    "site_orders.created_at"
  ]).orderBy("site_orders.created_at", "desc").execute();
  const orderIds = orders.map((order) => Number(order.id));
  const itemRows = orderIds.length ? await database.selectFrom("site_order_items").select(["site_order_id", "product_id", "name", "description", "quantity", "unit_price", "design_price", "payload"]).where("site_order_id", "in", orderIds).orderBy("id", "asc").execute() : [];
  const itemsByOrderId = /* @__PURE__ */ new Map();
  for (const item of itemRows) {
    const key = Number(item.site_order_id);
    const list = itemsByOrderId.get(key) || [];
    const payload = parseSiteOrderPayload(item.payload);
    list.push({
      name: item.name,
      size: getSizeLabel(item.description),
      quantity: `${Number(item.quantity || 1)} \u0448\u0442.`,
      cartItem: {
        productId: item.product_id ? Number(item.product_id) : null,
        name: item.name,
        description: item.description || "",
        quantity: Number(item.quantity || 1),
        unitPrice: Number(item.unit_price || 0),
        designPrice: Number(item.design_price || 0),
        customerComment: payload.customerComment || "",
        config: payload.config || {}
      }
    });
    itemsByOrderId.set(key, list);
  }
  return {
    orders: orders.map((order) => {
      const meta = getSitePaymentStatusMeta(order.payment_status);
      const count = Number(order.items_count || 0);
      return {
        id: Number(order.id),
        publicNumber: order.order_number || `SITE-${order.id}`,
        status: order.payment_status,
        statusLabel: meta.label,
        statusTone: meta.tone,
        group: meta.group,
        createdAt: order.created_at,
        createdAtLabel: formatDate(order.created_at),
        deliveryLabel: "\u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437",
        totalPrice: Number(order.amount || 0),
        totalPriceLabel: formatMoney(order.amount),
        positionsLabel: pluralPositions(count),
        items: itemsByOrderId.get(Number(order.id)) || []
      };
    })
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map

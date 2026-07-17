import { d as defineEventHandler, r as readBody, c as createError, u as useDatabase, H as getProductById, I as calculateProductPrice, J as normalizeSiteOrderItems, K as getSiteOrderItemsAmount, L as createSiteOrder } from '../../nitro/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const sourceItems = Array.isArray(body == null ? void 0 : body.items) ? body.items : [];
  if (!sourceItems.length) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid order",
      message: "\u041D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u044B \u043F\u043E\u0437\u0438\u0446\u0438\u0438 \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
  const database = useDatabase();
  const pricedItems = await Promise.all(sourceItems.map(async (item) => {
    const productId = Number.parseInt(item == null ? void 0 : item.productId, 10);
    const quantity = Number.parseInt(item == null ? void 0 : item.quantity, 10);
    if (!Number.isInteger(productId) || productId <= 0 || !Number.isInteger(quantity) || quantity <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid order item",
        message: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440 \u0438\u043B\u0438 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E"
      });
    }
    const product = await getProductById(database, productId);
    if (!product || !product.online_order_enabled) {
      throw createError({
        statusCode: 409,
        statusMessage: "Product is unavailable",
        message: "\u041E\u0434\u0438\u043D \u0438\u0437 \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0434\u043B\u044F \u043E\u043D\u043B\u0430\u0439\u043D-\u0437\u0430\u043A\u0430\u0437\u0430"
      });
    }
    const config = (item == null ? void 0 : item.config) && typeof item.config === "object" ? item.config : {};
    const price = calculateProductPrice(product, {
      ...config,
      quantity,
      options: config
    });
    return {
      ...item,
      name: product.name,
      productId,
      quantity,
      unitPrice: price.unit_price,
      designPrice: 0,
      serverTotal: price.total,
      config
    };
  }));
  const items = normalizeSiteOrderItems(pricedItems).map((item, index) => ({
    ...item,
    total: pricedItems[index].serverTotal
  }));
  const amount = getSiteOrderItemsAmount(items);
  if (!items.length || !amount) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid order price",
      message: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
  const order = await createSiteOrder(database, event, {
    items,
    amount,
    checkout: body == null ? void 0 : body.checkout
  });
  return {
    order: {
      id: order.id,
      orderNumber: order.orderNumber,
      accessToken: order.accessToken,
      amount: order.amount,
      status: "pending"
    }
  };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map

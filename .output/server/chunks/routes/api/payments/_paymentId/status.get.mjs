import { d as defineEventHandler, q as getRouterParam, c as createError, u as useDatabase, H as getSiteOrderPaymentState, I as updateSiteOrderPaymentStatus, J as refreshVtbPaymentStatus } from '../../../../nitro/nitro.mjs';
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

const status_get = defineEventHandler(async (event) => {
  var _a;
  const siteOrderId = Number(getRouterParam(event, "paymentId"));
  if (!Number.isInteger(siteOrderId) || siteOrderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid order id",
      message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
  const database = useDatabase();
  const siteOrder = await getSiteOrderPaymentState(database, siteOrderId);
  if (!siteOrder) {
    throw createError({
      statusCode: 404,
      statusMessage: "Order not found",
      message: "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
    });
  }
  const paymentStatus = (_a = siteOrder.payment_status) != null ? _a : siteOrder.status;
  if (["paid", "failed", "expired", "cancelled"].includes(paymentStatus)) {
    return { payment: { ...siteOrder, status: paymentStatus } };
  }
  if (siteOrder.expires_at && new Date(siteOrder.expires_at).getTime() < Date.now()) {
    await updateSiteOrderPaymentStatus(database, siteOrderId, "expired");
    return {
      payment: {
        ...siteOrder,
        payment_status: "expired",
        status: "expired"
      }
    };
  }
  const { siteOrder: refreshedSiteOrder } = await refreshVtbPaymentStatus(database, siteOrder);
  return { payment: refreshedSiteOrder };
});

export { status_get as default };
//# sourceMappingURL=status.get.mjs.map

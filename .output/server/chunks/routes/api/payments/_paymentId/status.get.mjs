import { d as defineEventHandler, p as getRouterParam, c as createError, u as useDatabase, q as getOrderPayment, w as updateOrderPaymentStatus, x as getVtbDynamicQrStatus, y as getPaymentStatusFromVtbQr } from '../../../../nitro/nitro.mjs';
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

const status_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const paymentId = Number(getRouterParam(event, "paymentId"));
  if (!Number.isInteger(paymentId) || paymentId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid payment id",
      message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u043F\u043B\u0430\u0442\u0435\u0436\u0430"
    });
  }
  const database = useDatabase();
  const payment = await getOrderPayment(database, paymentId);
  if (!payment) {
    throw createError({
      statusCode: 404,
      statusMessage: "Payment not found",
      message: "\u041F\u043B\u0430\u0442\u0435\u0436 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
    });
  }
  if (payment.status === "paid" || payment.status === "failed" || payment.status === "cancelled") {
    return { payment };
  }
  if (payment.expires_at && new Date(payment.expires_at).getTime() < Date.now()) {
    await updateOrderPaymentStatus(database, paymentId, "expired");
    return {
      payment: {
        ...payment,
        status: "expired"
      }
    };
  }
  if (!payment.vtb_md_order || !payment.vtb_qr_id) {
    return { payment };
  }
  const statusResponse = await getVtbDynamicQrStatus({
    mdOrder: payment.vtb_md_order,
    qrId: payment.vtb_qr_id
  });
  const status = getPaymentStatusFromVtbQr(
    (_a = statusResponse.qrStatus) != null ? _a : statusResponse.status,
    statusResponse.transactionState
  );
  await updateOrderPaymentStatus(database, paymentId, status, {
    vtb_qr_status: (_c = (_b = statusResponse.qrStatus) != null ? _b : statusResponse.status) != null ? _c : null,
    vtb_transaction_state: (_d = statusResponse.transactionState) != null ? _d : null,
    vtb_status_response: JSON.stringify(statusResponse)
  });
  const updatedPayment = await getOrderPayment(database, paymentId);
  return {
    payment: updatedPayment
  };
});

export { status_get as default };
//# sourceMappingURL=status.get.mjs.map

import { d as defineEventHandler, a as auth, o as getRequestHeaders, c as createError, u as useDatabase } from '../../../../nitro/nitro.mjs';
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

const _recipientId__delete = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  });
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F"
    });
  }
  const recipientId = String((_c = (_b = event.context.params) == null ? void 0 : _b.recipientId) != null ? _c : "").trim();
  if (!recipientId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing recipient id",
      message: "\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
    });
  }
  const database = useDatabase();
  const result = await database.deleteFrom("userRecipient").where("id", "=", recipientId).where("userId", "=", session.user.id).executeTakeFirst();
  if (!Number(result.numDeletedRows)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Recipient not found",
      message: "\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
    });
  }
  return {
    success: true
  };
});

export { _recipientId__delete as default };
//# sourceMappingURL=_recipientId_.delete.mjs.map

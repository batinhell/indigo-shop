import { d as defineEventHandler, a as auth, j as getRequestHeaders, c as createError, r as readBody, w as isAuthPhone, u as useDatabase, q as formatAuthPhone } from '../../../nitro/nitro.mjs';
import { randomUUID } from 'node:crypto';
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
import 'node:url';
import '@iconify/utils';
import 'consola';

const normalizeString = (value) => String(value != null ? value : "").trim();
const normalizeNullablePhone = (value) => {
  const normalized = formatAuthPhone(value);
  return normalized || null;
};
const recipients_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  });
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F"
    });
  }
  const body = await readBody(event);
  const recipient = (_b = body.recipient) != null ? _b : {};
  const name = normalizeString(recipient.name);
  const phoneNumber = normalizeNullablePhone((_c = recipient.phoneNumber) != null ? _c : recipient.phone);
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing recipient name",
      message: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F"
    });
  }
  if (phoneNumber && !isAuthPhone(phoneNumber)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid recipient phone number",
      message: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F"
    });
  }
  const database = useDatabase();
  const userId = session.user.id;
  const recipientId = normalizeString(recipient.id);
  const now = /* @__PURE__ */ new Date();
  let savedRecipientId = recipientId;
  if (recipientId) {
    const existingRecipient = await database.selectFrom("userRecipient").select("id").where("id", "=", recipientId).where("userId", "=", userId).executeTakeFirst();
    if (!existingRecipient) {
      throw createError({
        statusCode: 404,
        statusMessage: "Recipient not found",
        message: "\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    await database.updateTable("userRecipient").set({
      name,
      phoneNumber,
      updatedAt: now
    }).where("id", "=", recipientId).where("userId", "=", userId).execute();
  } else {
    savedRecipientId = randomUUID();
    await database.insertInto("userRecipient").values({
      id: savedRecipientId,
      userId,
      name,
      phoneNumber,
      createdAt: now,
      updatedAt: now
    }).execute();
  }
  const savedRecipient = await database.selectFrom("userRecipient").select([
    "id",
    "name",
    "phoneNumber",
    "createdAt",
    "updatedAt"
  ]).where("id", "=", savedRecipientId).where("userId", "=", userId).executeTakeFirst();
  return {
    recipient: savedRecipient
  };
});

export { recipients_post as default };
//# sourceMappingURL=recipients.post.mjs.map

import { d as defineEventHandler, a as auth, j as getRequestHeaders, c as createError, r as readBody, u as useDatabase } from '../../nitro/nitro.mjs';
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
const normalizeNullableString = (value) => {
  const normalized = normalizeString(value);
  return normalized || null;
};
const normalizeInn = (value) => String(value != null ? value : "").replace(/\D/g, "");
const organizations_post = defineEventHandler(async (event) => {
  var _a, _b;
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  });
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044E"
    });
  }
  const body = await readBody(event);
  const organization = (_b = body.organization) != null ? _b : {};
  const inn = normalizeInn(organization.inn);
  const name = normalizeString(organization.name || organization.value);
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing organization name",
      message: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044E \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430"
    });
  }
  if (!/^\d{10}$|^\d{12}$/.test(inn)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid organization inn",
      message: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0418\u041D\u041D"
    });
  }
  const now = /* @__PURE__ */ new Date();
  const payload = {
    id: randomUUID(),
    userId: session.user.id,
    name,
    inn,
    kpp: normalizeNullableString(organization.kpp),
    ogrn: normalizeNullableString(organization.ogrn),
    type: normalizeNullableString(organization.type),
    address: normalizeNullableString(organization.address),
    dadataPayload: JSON.stringify(organization),
    isActive: true,
    updatedAt: now
  };
  const database = useDatabase();
  const savedOrganization = await database.transaction().execute(async (trx) => {
    await trx.updateTable("userOrganization").set({ isActive: false }).where("userId", "=", session.user.id).execute();
    await trx.insertInto("userOrganization").values({
      ...payload,
      createdAt: now
    }).onDuplicateKeyUpdate({
      name: payload.name,
      kpp: payload.kpp,
      ogrn: payload.ogrn,
      type: payload.type,
      address: payload.address,
      dadataPayload: payload.dadataPayload,
      isActive: true,
      updatedAt: now
    }).execute();
    return trx.selectFrom("userOrganization").select([
      "id",
      "userId",
      "name",
      "inn",
      "kpp",
      "ogrn",
      "type",
      "address",
      "isActive",
      "createdAt",
      "updatedAt"
    ]).where("userId", "=", session.user.id).where("inn", "=", inn).executeTakeFirst();
  });
  return {
    organization: savedOrganization
  };
});

export { organizations_post as default };
//# sourceMappingURL=organizations.post.mjs.map

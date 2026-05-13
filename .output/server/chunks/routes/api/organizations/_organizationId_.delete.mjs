import { d as defineEventHandler, a as auth, j as getRequestHeaders, c as createError, u as useDatabase } from '../../../nitro/nitro.mjs';
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

const _organizationId__delete = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  });
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044E"
    });
  }
  const organizationId = String((_c = (_b = event.context.params) == null ? void 0 : _b.organizationId) != null ? _c : "").trim();
  if (!organizationId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing organization id",
      message: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"
    });
  }
  const database = useDatabase();
  const userId = session.user.id;
  await database.transaction().execute(async (trx) => {
    const organization = await trx.selectFrom("userOrganization").select(["id", "isActive"]).where("id", "=", organizationId).where("userId", "=", userId).executeTakeFirst();
    if (!organization) {
      throw createError({
        statusCode: 404,
        statusMessage: "Organization not found",
        message: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"
      });
    }
    await trx.deleteFrom("userOrganization").where("id", "=", organizationId).where("userId", "=", userId).execute();
    if (!organization.isActive) {
      return;
    }
    const nextOrganization = await trx.selectFrom("userOrganization").select("id").where("userId", "=", userId).orderBy("updatedAt", "desc").executeTakeFirst();
    if (!nextOrganization) {
      return;
    }
    await trx.updateTable("userOrganization").set({ isActive: true }).where("id", "=", nextOrganization.id).where("userId", "=", userId).execute();
  });
  return {
    success: true
  };
});

export { _organizationId__delete as default };
//# sourceMappingURL=_organizationId_.delete.mjs.map

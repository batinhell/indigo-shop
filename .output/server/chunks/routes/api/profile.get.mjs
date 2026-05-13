import { d as defineEventHandler, a as auth, o as getRequestHeaders, c as createError, u as useDatabase } from '../../nitro/nitro.mjs';
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

const profile_get = defineEventHandler(async (event) => {
  var _a;
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  });
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C"
    });
  }
  const database = useDatabase();
  const userId = session.user.id;
  const [user, organizations, recipients] = await Promise.all([
    database.selectFrom("user").select([
      "id",
      "name",
      "email",
      "emailVerified",
      "phoneNumber",
      "phoneNumberVerified",
      "additionalContact"
    ]).where("id", "=", userId).executeTakeFirst(),
    database.selectFrom("userOrganization").select([
      "id",
      "name",
      "inn",
      "kpp",
      "ogrn",
      "type",
      "address",
      "isActive",
      "createdAt",
      "updatedAt"
    ]).where("userId", "=", userId).orderBy("isActive", "desc").orderBy("updatedAt", "desc").execute(),
    database.selectFrom("userRecipient").select([
      "id",
      "name",
      "phoneNumber",
      "createdAt",
      "updatedAt"
    ]).where("userId", "=", userId).orderBy("createdAt", "asc").execute()
  ]);
  return {
    profile: {
      user: user != null ? user : null,
      organizations,
      recipients
    }
  };
});

export { profile_get as default };
//# sourceMappingURL=profile.get.mjs.map

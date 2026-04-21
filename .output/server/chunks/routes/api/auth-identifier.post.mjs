import { d as defineEventHandler, r as readBody, n as normalizeAuthIdentifier, u as useDatabase, c as createError } from '../../nitro/nitro.mjs';
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

const LOOKUP_TIMEOUT = 5e3;
const assertValidIdentifier = (identifier) => {
  if (!identifier.isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid identifier",
      message: identifier.type === "phone" ? "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430" : "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0443\u044E \u043F\u043E\u0447\u0442\u0443"
    });
  }
};
const withLookupTimeout = (promise) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(createError({
        statusCode: 504,
        statusMessage: "Auth identifier lookup timeout",
        message: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F. \u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B\u0430 \u0432\u043E\u0432\u0440\u0435\u043C\u044F"
      }));
    }, LOOKUP_TIMEOUT);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
};
const authIdentifier_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const identifier = normalizeAuthIdentifier(body.identifier);
  assertValidIdentifier(identifier);
  const field = identifier.type === "phone" ? "phoneNumber" : "email";
  const user = await withLookupTimeout(
    useDatabase().selectFrom("user").select("id").where(field, "=", identifier.value).executeTakeFirst()
  );
  return {
    exists: Boolean(user),
    type: identifier.type
  };
});

export { authIdentifier_post as default };
//# sourceMappingURL=auth-identifier.post.mjs.map

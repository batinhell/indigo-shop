import { d as defineEventHandler, z as getQuery, L as sendRedirect, u as useDatabase, M as getRequestURL } from '../../../../nitro/nitro.mjs';
import { createHash } from 'node:crypto';
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

const hashToken = (token) => createHash("sha256").update(token).digest("hex");
const getRedirectUrl = (event, status) => {
  const origin = getRequestURL(event).origin;
  return `${origin}/profile?emailConfirmed=${status}`;
};
const confirm_get = defineEventHandler(async (event) => {
  var _a;
  const query = getQuery(event);
  const token = String(query.t || query.token || "").trim();
  if (!token) {
    return sendRedirect(event, getRedirectUrl(event, "invalid"), 302);
  }
  const database = useDatabase();
  const tokenHash = hashToken(token);
  const tokenRecord = await database.selectFrom("userEmailConfirmationToken").select(["id", "userId", "email", "expiresAt", "usedAt"]).where("tokenHash", "=", tokenHash).executeTakeFirst();
  if (!tokenRecord || tokenRecord.usedAt || new Date(tokenRecord.expiresAt).getTime() < Date.now()) {
    return sendRedirect(event, getRedirectUrl(event, "invalid"), 302);
  }
  const now = /* @__PURE__ */ new Date();
  const result = await database.updateTable("user").set({
    emailVerified: true,
    updatedAt: now
  }).where("id", "=", tokenRecord.userId).where("email", "=", tokenRecord.email).executeTakeFirst();
  await database.updateTable("userEmailConfirmationToken").set({
    usedAt: now
  }).where("id", "=", tokenRecord.id).execute();
  if (Number((_a = result.numUpdatedRows) != null ? _a : 0) === 0) {
    return sendRedirect(event, getRedirectUrl(event, "invalid"), 302);
  }
  return sendRedirect(event, getRedirectUrl(event, "success"), 302);
});

export { confirm_get as default };
//# sourceMappingURL=confirm.get.mjs.map

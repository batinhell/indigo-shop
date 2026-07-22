import { d as defineEventHandler, p as assertInternalShopToken, r as readBody, q as processPendingSiteOrderJobs, u as useDatabase } from '../../../../nitro/nitro.mjs';
import 'node:fs/promises';
import 'kysely';
import 'node:child_process';
import 'node:path';
import 'qrcode';
import 'node:fs';
import 'node:https';
import 'better-auth';
import 'better-auth/plugins';
import 'mysql2';
import 'node:http';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const process_post = defineEventHandler(async (event) => {
  assertInternalShopToken(event);
  const body = await readBody(event);
  const result = await processPendingSiteOrderJobs(useDatabase(), {
    limit: body == null ? void 0 : body.limit
  });
  return { jobs: result };
});

export { process_post as default };
//# sourceMappingURL=process.post.mjs.map

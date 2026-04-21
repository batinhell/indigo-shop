import { d as defineEventHandler, a as auth, t as toWebRequest, s as sendWebResponse } from '../../../nitro/nitro.mjs';
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

const ____all_ = defineEventHandler(async (event) => {
  const response = await auth.handler(toWebRequest(event));
  return sendWebResponse(event, response);
});

export { ____all_ as default };
//# sourceMappingURL=_...all_.mjs.map

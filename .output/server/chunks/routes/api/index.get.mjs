import { d as defineEventHandler, E as getQuery, u as useDatabase, X as getProducts } from '../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const category = typeof query.category === "string" ? query.category.trim() : "";
  const database = useDatabase();
  const products = await getProducts(database, category || null);
  return {
    products
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map

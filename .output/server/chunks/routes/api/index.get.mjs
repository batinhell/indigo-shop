import { d as defineEventHandler, o as getQuery, u as useDatabase, p as getProducts } from '../../nitro/nitro.mjs';
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

import { d as defineEventHandler, p as getRouterParam, c as createError, u as useDatabase, H as getProductBySlug } from '../../../nitro/nitro.mjs';
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

const _slug__get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing product slug",
      message: "\u041D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u043D slug \u0442\u043E\u0432\u0430\u0440\u0430"
    });
  }
  const database = useDatabase();
  const product = await getProductBySlug(database, slug);
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
      message: "\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
    });
  }
  return product;
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map

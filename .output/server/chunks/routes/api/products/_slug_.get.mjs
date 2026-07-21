import { d as defineEventHandler, w as getRouterParam, c as createError, u as useDatabase, W as getProductBySlug } from '../../../nitro/nitro.mjs';
import 'node:fs/promises';
import 'kysely';
import 'node:child_process';
import 'node:path';
import 'better-auth';
import 'better-auth/plugins';
import 'mysql2';
import 'qrcode';
import 'node:fs';
import 'node:https';
import 'node:http';
import 'node:events';
import 'node:buffer';
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

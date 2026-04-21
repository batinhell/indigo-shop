import { d as defineEventHandler, r as readBody, h as suggestDadataParties, c as createError } from '../../../nitro/nitro.mjs';
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

const isInternalConfigError = (error) => (error == null ? void 0 : error.statusMessage) === "DaData is not configured";
const partySuggest_post = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  const query = String((_a = body.query) != null ? _a : "").trim();
  if (query.length < 3) {
    return {
      suggestions: []
    };
  }
  try {
    const suggestions = await suggestDadataParties({
      query,
      count: 5
    });
    return {
      suggestions
    };
  } catch (error) {
    console.error("[dadata/party-suggest] DaData error:", error);
    if (isInternalConfigError(error)) {
      throw error;
    }
    throw createError({
      statusCode: 502,
      statusMessage: "DaData request failed",
      message: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438"
    });
  }
});

export { partySuggest_post as default };
//# sourceMappingURL=party-suggest.post.mjs.map

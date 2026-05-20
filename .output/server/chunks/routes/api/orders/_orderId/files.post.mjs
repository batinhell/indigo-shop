import { d as defineEventHandler, p as getRouterParam, c as createError, q as readMultipartFormData, u as useDatabase, w as getOwnedSiteOrder, x as useRuntimeConfig } from '../../../../nitro/nitro.mjs';
import { extname } from 'node:path';
import 'better-auth';
import 'better-auth/plugins';
import 'kysely';
import 'mysql2';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ALLOWED_EXTENSIONS = /* @__PURE__ */ new Set([".tiff", ".tif", ".ai", ".cdr", ".jpg", ".jpeg", ".png"]);
function sanitizeFileName(name) {
  return String(name || "file").replace(/[\\/\0]/g, "_").slice(0, 180);
}
const files_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const orderId = Number(getRouterParam(event, "orderId"));
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid order id",
      message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
  const form = await readMultipartFormData(event);
  const accessToken = ((_b = (_a = form == null ? void 0 : form.find((part) => part.name === "accessToken")) == null ? void 0 : _a.data) == null ? void 0 : _b.toString("utf8")) || "";
  const fileParts = (form || []).filter((part) => part.name === "files" && part.filename);
  if (!fileParts.length) {
    return { files: [] };
  }
  const database = useDatabase();
  await getOwnedSiteOrder(database, event, orderId, accessToken);
  const runtimeConfig = useRuntimeConfig();
  const crmBaseUrl = String(((_c = runtimeConfig.crmApi) == null ? void 0 : _c.baseUrl) || process.env.CRM_API_BASE_URL || "").replace(/\/$/, "");
  const crmApiToken = ((_d = runtimeConfig.crmApi) == null ? void 0 : _d.token) || process.env.CRM_API_TOKEN || "";
  if (!crmBaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: "CRM API is not configured",
      message: "\u041D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D CRM_API_BASE_URL \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043C\u0430\u043A\u0435\u0442\u043E\u0432"
    });
  }
  const crmFormData = new FormData();
  for (const part of fileParts) {
    const originalName = sanitizeFileName(part.filename);
    const extension = extname(originalName).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid file type",
        message: `\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0444\u0430\u0439\u043B\u0430: ${originalName}`
      });
    }
    if (part.data.length > MAX_FILE_SIZE) {
      throw createError({
        statusCode: 400,
        statusMessage: "File is too large",
        message: `\u0424\u0430\u0439\u043B \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0439: ${originalName}`
      });
    }
    crmFormData.append("files[]", new Blob([part.data], { type: part.type || "application/octet-stream" }), originalName);
  }
  return $fetch(`${crmBaseUrl}/api/site-orders/${orderId}/files`, {
    method: "POST",
    headers: crmApiToken ? { Authorization: `Bearer ${crmApiToken}` } : void 0,
    body: crmFormData
  });
});

export { files_post as default };
//# sourceMappingURL=files.post.mjs.map

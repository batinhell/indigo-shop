import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { join } from 'node:path'
import { resolveFlagPreviewConfig } from '../../../utils/flag-preview.js'

// GET /api/flag/preview/<hash>.mp4 — отдать готовый MP4-луп из кэша.
// Файлы кэша именуются как <32 hex>.mp4 (hash комбинации макет+ткань+геометрия).
// Отдаём напрямую из storage/flag-cache мимо статик-манифеста Nitro (который на
// стенде молча терял public-ассеты, см. память configurator-v2).
const FILE_RE = /^[a-f0-9]{32}\.mp4$/

export default defineEventHandler(async (event) => {
  const file = String(getRouterParam(event, 'file') || '')
  if (!FILE_RE.test(file)) {
    throw createError({ statusCode: 400, statusMessage: 'Bad preview id', message: 'Некорректный идентификатор превью' })
  }

  const cfg = resolveFlagPreviewConfig()
  const path = join(cfg.cacheDir, file)

  let info
  try {
    info = await stat(path)
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Preview not found', message: 'Превью не найдено' })
  }

  setHeader(event, 'Content-Type', 'video/mp4')
  setHeader(event, 'Content-Length', info.size)
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  return createReadStream(path)
})

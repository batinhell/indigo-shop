import { extname } from 'node:path'
import {
  getFlagPreviewMp4,
  PREVIEW_RASTER_EXTENSIONS,
  MAX_PREVIEW_DESIGN_SIZE
} from '../../utils/flag-preview.js'

// POST /api/flag/preview — собрать фотореал-превью флага по макету юзера.
// multipart/form-data:
//   design  — файл макета (растр png/jpg/jpeg/webp)
//   fabric  — atlas | nylon | mesh | gabardine | dome-atlas
//   mount   — grommets | pocket
//   fringe  — "1"/"true" если с бахромой
//   mirror  — "1"/"true" горизонтальное зеркало (оборот ОДНОсторонки, «просвет»).
//             Оборот двусторонки — это отдельный back-макет без зеркала.
// Ответ: { url, hash, cached } — url ведёт на GET /api/flag/preview/<hash>.mp4
export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  if (!form) {
    throw createError({ statusCode: 400, statusMessage: 'Expected multipart/form-data', message: 'Нужна форма с макетом' })
  }

  const field = name => form.find(part => part.name === name && !part.filename)?.data?.toString('utf8').trim() || ''
  const designPart = form.find(part => part.name === 'design' && part.filename)

  if (!designPart) {
    throw createError({ statusCode: 400, statusMessage: 'Missing design file', message: 'Загрузите макет' })
  }

  const ext = extname(String(designPart.filename || '')).toLowerCase()
  if (!PREVIEW_RASTER_EXTENSIONS.has(ext)) {
    throw createError({
      statusCode: 415,
      statusMessage: 'Unsupported design format',
      message: 'Превью доступно для PNG, JPEG и WEBP'
    })
  }
  if (designPart.data.length > MAX_PREVIEW_DESIGN_SIZE) {
    throw createError({ statusCode: 413, statusMessage: 'Design too large', message: 'Макет слишком большой для превью' })
  }

  const truthy = v => ['1', 'true', 'yes'].includes(v.toLowerCase())
  const fringe = truthy(field('fringe'))
  const mirror = truthy(field('mirror'))

  const { hash, cached } = await getFlagPreviewMp4({
    designBuffer: designPart.data,
    fabric: field('fabric'),
    mount: field('mount'),
    fringe,
    mirror
  })

  return { url: `/api/flag/preview/${hash}.mp4`, hash, cached }
})

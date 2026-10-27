// Конструктор флага v2 — серверный превью-конвейер (Фаза C).
// Юзер грузит макет → фотореал-флаг на выбранной ткани/креплении в виде MP4-лупа.
//
// Как это устроено:
//   - Тяжёлые слои (u/v/diff/spec/mask/full × 16 кадров) запечены в Blender ОФЛАЙН
//     и лежат на стенде в storage/flag-layers (вне git, rsync-ятся отдельно — 109 МБ).
//     Геометрия складок общая на все 5 тканей, поэтому слоёв всего 4 набора
//     (grommets/pocket × бахрома вкл/выкл), а ткань — рантайм-параметр композера.
//   - compose_service.py (python3 + PIL + numpy + ffmpeg) собирает из слоёв + макета
//     бесшовный MP4 (~10 с на стенде, 640², ~110 КБ).
//   - Результат кэшируется по sha256(макет + ткань + геометрия + сторона + параметры).
//     Повторный запрос той же комбинации отдаётся из кэша мгновенно.
//
// Стенд: python3 = /usr/bin/python3 (системный, PIL 9.x/numpy из apt), ffmpeg из apt.
// Локалка: python3 c PIL/numpy + ffmpeg в PATH.
import { createHash } from 'node:crypto'
import { spawn } from 'node:child_process'
import { mkdir, stat, writeFile, rm, rename } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { tmpdir } from 'node:os'

// Ткани в словаре композера (дефис id приложения → подчёркивание питона).
const FABRICS = new Set(['atlas', 'dome_atlas', 'nylon', 'gabardine', 'mesh'])
const MOUNTS = new Set(['grommets', 'pocket'])

// Макет для превью можно рендерить только из растра (вектор .ai/.cdr и .tiff не варпим).
export const PREVIEW_RASTER_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp'])
export const MAX_PREVIEW_DESIGN_SIZE = 30 * 1024 * 1024

const PYTHON_TIMEOUT_MS = 90 * 1000

// Версия конвейера: меняется при правке композера/слоёв → инвалидирует кэш.
const PIPELINE_VERSION = 'v1'

export function resolveFlagPreviewConfig() {
  const rc = useRuntimeConfig().flagPreview || {}
  const root = process.cwd()
  return {
    script: rc.script || resolve(root, 'server/flag-preview/compose_service.py'),
    layersDir: rc.layersDir || resolve(root, 'storage/flag-layers'),
    cacheDir: rc.cacheDir || resolve(root, 'storage/flag-cache'),
    python: rc.pythonBin || process.env.PYTHON_BINARY || 'python3',
    ffmpeg: rc.ffmpegBin || process.env.FFMPEG_BINARY || 'ffmpeg',
    workSize: Number(rc.workSize || 640),
    frames: Number(rc.frames || 16),
    fps: Number(rc.fps || 20)
  }
}

export function normalizeFabric(value) {
  return String(value || '').trim().toLowerCase().replace(/-/g, '_')
}

export function buildVariant(mount, fringe) {
  return `${mount}${fringe ? '_fringe' : ''}`
}

async function fileExists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

function runPython(cfg, { variant, fabric, design, out, mirror }) {
  const args = [
    cfg.script,
    '--layers', cfg.layersDir,
    '--variant', variant,
    '--fabric', fabric,
    '--design', design,
    '--out', out,
    '--frames', String(cfg.frames),
    '--fps', String(cfg.fps),
    '--work-size', String(cfg.workSize)
  ]
  if (mirror) args.push('--mirror')

  return new Promise((resolvePromise, reject) => {
    const child = spawn(cfg.python, args, {
      stdio: ['ignore', 'ignore', 'pipe'],
      env: { ...process.env, FFMPEG_BINARY: cfg.ffmpeg }
    })
    const stderr = []
    let settled = false

    const timer = setTimeout(() => {
      if (settled) return
      settled = true
      child.kill('SIGKILL')
      reject(new Error('flag-preview compositor timed out'))
    }, PYTHON_TIMEOUT_MS)

    child.stderr.on('data', chunk => stderr.push(chunk))
    child.on('error', (err) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      reject(err)
    })
    child.on('close', (code) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      const errText = Buffer.concat(stderr).toString('utf8').trim()
      if (code === 0) {
        resolvePromise()
        return
      }
      reject(new Error(errText || `flag-preview compositor exited with code ${code}`))
    })
  })
}

// Один и тот же hash не считаем параллельно дважды (два клика по одной ткани).
const inflight = new Map()

/**
 * Собирает (или достаёт из кэша) MP4-луп превью флага.
 *
 * mirror — горизонтальное зеркало кадра. Нужно для оборота ОДНОсторонки («просвет»:
 * текст виден зеркально). Оборот ДВУсторонки — это отдельный back-дизайн, он читается
 * прямо, поэтому клиент шлёт back-макет с mirror=false. Лицо всегда mirror=false.
 *
 * @returns {Promise<{ hash: string, path: string, cached: boolean }>}
 */
export async function getFlagPreviewMp4({ designBuffer, fabric, mount, fringe, mirror = false }) {
  const cfg = resolveFlagPreviewConfig()

  const fab = normalizeFabric(fabric)
  if (!FABRICS.has(fab)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid fabric', message: 'Неизвестная ткань' })
  }
  if (!MOUNTS.has(mount)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid mount', message: 'Неизвестное крепление' })
  }
  if (!designBuffer || !designBuffer.length) {
    throw createError({ statusCode: 400, statusMessage: 'Missing design', message: 'Нет макета для превью' })
  }

  const variant = buildVariant(mount, !!fringe)
  const mirrored = !!mirror

  const hash = createHash('sha256')
    .update(designBuffer)
    .update(`|${fab}|${variant}|${mirrored ? 1 : 0}|${cfg.workSize}|${cfg.frames}|${cfg.fps}|${PIPELINE_VERSION}`)
    .digest('hex')
    .slice(0, 32)

  const outPath = join(cfg.cacheDir, `${hash}.mp4`)
  if (await fileExists(outPath)) {
    return { hash, path: outPath, cached: true }
  }

  if (inflight.has(hash)) {
    await inflight.get(hash)
    return { hash, path: outPath, cached: false }
  }

  const job = (async () => {
    if (!await fileExists(cfg.layersDir)) {
      throw createError({
        statusCode: 503,
        statusMessage: 'Flag layers not available',
        message: 'Слои превью не установлены на сервере'
      })
    }
    await mkdir(cfg.cacheDir, { recursive: true })

    const tmpDesign = join(tmpdir(), `flagdesign_${hash}.img`)
    const tmpOut = join(cfg.cacheDir, `${hash}.tmp-${process.pid}.mp4`)
    await writeFile(tmpDesign, designBuffer)
    try {
      await runPython(cfg, { variant, fabric: fab, design: tmpDesign, out: tmpOut, mirror: mirrored })
      await rename(tmpOut, outPath) // атомарная публикация в кэш
    } finally {
      await rm(tmpDesign, { force: true })
      await rm(tmpOut, { force: true })
    }
  })()

  inflight.set(hash, job)
  try {
    await job
  } finally {
    inflight.delete(hash)
  }

  return { hash, path: outPath, cached: false }
}

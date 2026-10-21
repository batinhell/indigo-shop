import type { Geometry, Rect, Vec, Side } from '../core/types'

// Раскладка развёртки: геометрия в мм → примитивы в px. Одна функция кормит и
// экран (Vue), и экспорт (SVG → PDF), поэтому чертёж в файле и на сайте один и тот же.

export interface ShowFlags {
  overall: boolean // общие габариты
  basic: boolean // основные размеры
  bleed: boolean // линия вылета
  safe: boolean // безопасная зона
  features: boolean // крепёж и обработка
  labels: boolean // подписи
}

export const DEFAULT_SHOW: ShowFlags = {
  overall: true, basic: true, bleed: true, safe: true, features: true, labels: false
}

export const PALETTE = {
  bleed: '#6bbf4a',
  trim: '#1f2eb5',
  crease: '#e53835',
  safe: '#9ea3a8',
  basic: '#2e6bf5',
  overall: '#73737a',
  text: '#04121b',
  caption: '#81888d',
  fringe: '#d9a83a',
  grommet: '#1f2eb5',
  paper: '#ffffff'
}

export type Layer = 'paper' | 'artwork' | 'bleed' | 'trim' | 'crease' | 'safe' | 'features' | 'basic' | 'overall' | 'labels'

export type Item
  = | { t: 'rect', layer: Layer, x: number, y: number, w: number, h: number, stroke?: string, fill?: string, width?: number, dash?: number[] }
    | { t: 'line', layer: Layer, x1: number, y1: number, x2: number, y2: number, stroke: string, width: number, dash?: number[], opacity?: number }
    | { t: 'poly', layer: Layer, points: Vec[], fill: string }
    | { t: 'circle', layer: Layer, cx: number, cy: number, r: number, stroke: string, width: number }
    | { t: 'text', layer: Layer, x: number, y: number, text: string, color: string, size: number, weight: number, anchor: 'start' | 'middle', rotate?: number }

export interface Drawing {
  width: number
  height: number
  scale: number
  origin: Vec // где в px лежит (0,0) чистового реза
  artworkPx: Rect // зона макета в px — для clipPath
  items: Item[]
}

export interface LayoutOptions {
  scale: number // px на мм
  show?: Partial<ShowFlags>
  fontSize?: number
  pad?: number
}

// Постоянные отступы в px — не зависят от зума, как у Pacdora.
const GAP_DIM = 22 // от внешней кромки до габаритной линии
const EXT_OVER = 8 // выносная линия заходит за размерную
const LABEL_SPACE = 22 // место под подпись габарита
const ARROW = { len: 6, half: 3 }

function outset(geo: Geometry): Record<Side, number> {
  // Бахрому на развёртке не показываем, поэтому отступ со всех сторон = вылет.
  return { top: geo.bleed, right: geo.bleed, bottom: geo.bleed, left: geo.bleed }
}

// Ширина = fixed.x + mm.x * scale. Нужна, чтобы вписать чертёж в контейнер.
export function measure(geo: Geometry, opts: Omit<LayoutOptions, 'scale'> = {}) {
  const pad = opts.pad ?? 16
  const show = { ...DEFAULT_SHOW, ...opts.show }
  const o = outset(geo)
  const dimX = show.overall ? GAP_DIM + LABEL_SPACE : 0
  const dimY = show.overall ? GAP_DIM + LABEL_SPACE : 0
  return {
    fixed: { x: 2 * pad + dimX, y: 2 * pad + dimY },
    mm: { x: geo.trim.w + o.left + o.right, y: geo.trim.h + o.top + o.bottom }
  }
}

export function fitScale(geo: Geometry, box: { w: number, h: number }, opts: Omit<LayoutOptions, 'scale'> = {}) {
  const m = measure(geo, opts)
  return Math.max(0.01, Math.min((box.w - m.fixed.x) / m.mm.x, (box.h - m.fixed.y) / m.mm.y))
}

export function layoutDieline(geo: Geometry, opts: LayoutOptions): Drawing {
  const s = opts.scale
  const show = { ...DEFAULT_SHOW, ...opts.show }
  const fs = opts.fontSize ?? 12
  const pad = opts.pad ?? 16
  const o = outset(geo)
  const m = measure(geo, opts)
  const C = PALETTE
  const items: Item[] = []

  const ox = pad + o.left * s
  const oy = pad + o.top * s
  const X = (mm: number) => ox + mm * s
  const Y = (mm: number) => oy + mm * s
  const R = (r: Rect) => ({ x: X(r.x), y: Y(r.y), w: r.w * s, h: r.h * s })

  const b = geo.bleed
  const bleedPx = R({ x: geo.trim.x - b, y: geo.trim.y - b, w: geo.trim.w + 2 * b, h: geo.trim.h + 2 * b })
  const trimPx = R(geo.trim)

  // Полотно и макет
  items.push({ t: 'rect', layer: 'paper', ...bleedPx, fill: C.paper })

  // Бахрому на развёртке не рисуем (это обработка края, не линия реза/печати).

  if (show.bleed) items.push({ t: 'rect', layer: 'bleed', ...bleedPx, stroke: C.bleed, width: 1.5 })
  items.push({ t: 'rect', layer: 'trim', ...trimPx, stroke: C.trim, width: 1.5 })
  for (const f of geo.folds) {
    items.push({ t: 'line', layer: 'crease', x1: X(f.a.x), y1: Y(f.a.y), x2: X(f.b.x), y2: Y(f.b.y), stroke: C.crease, width: 1, dash: [3, 2] })
  }
  if (show.safe && geo.safeZone) items.push({ t: 'rect', layer: 'safe', ...R(geo.safeZone), stroke: C.safe, width: 1, dash: [2, 3] })

  if (show.features) {
    for (const f of geo.features) {
      if (f.type === 'grommet') {
        const cx = X(f.center.x), cy = Y(f.center.y)
        const r = Math.max(3, (f.diameter / 2) * s)
        items.push({ t: 'circle', layer: 'features', cx, cy, r, stroke: C.grommet, width: 1.5 })
        items.push({ t: 'circle', layer: 'features', cx, cy, r: r * 0.45, stroke: C.grommet, width: 1 })
      }
    }
  }

  const textW = (str: string, size = fs) => str.length * size * 0.56

  const head = (layer: Layer, tip: Vec, dir: Vec, color: string) => {
    const bx = tip.x - dir.x * ARROW.len, by = tip.y - dir.y * ARROW.len
    const px = -dir.y, py = dir.x
    items.push({
      t: 'poly', layer, fill: color,
      points: [tip, { x: bx + px * ARROW.half, y: by + py * ARROW.half }, { x: bx - px * ARROW.half, y: by - py * ARROW.half }]
    })
  }

  // Основные размеры: синяя линия разрывается под подписью.
  if (show.basic) {
    for (const d of geo.dims) {
      const shift = d.shiftPx ?? 0
      const label = d.label
      const tw = textW(label), th = fs * 1.2
      if (d.axis === 'x') {
        const x1 = X(d.a), x2 = X(d.b), y = Y(d.at) + shift
        const mid = (x1 + x2) / 2, gap = tw + 12
        if (x2 - x1 > gap + 24) {
          items.push({ t: 'line', layer: 'basic', x1, y1: y, x2: mid - gap / 2, y2: y, stroke: C.basic, width: 1 })
          items.push({ t: 'line', layer: 'basic', x1: mid + gap / 2, y1: y, x2, y2: y, stroke: C.basic, width: 1 })
          items.push({ t: 'text', layer: 'basic', x: mid, y, text: label, color: C.basic, size: fs, weight: 600, anchor: 'middle' })
        } else {
          items.push({ t: 'line', layer: 'basic', x1, y1: y, x2, y2: y, stroke: C.basic, width: 1 })
          items.push({ t: 'text', layer: 'basic', x: x2 + 6, y, text: label, color: C.basic, size: fs, weight: 600, anchor: 'start' })
        }
        head('basic', { x: x1, y }, { x: -1, y: 0 }, C.basic)
        head('basic', { x: x2, y }, { x: 1, y: 0 }, C.basic)
      } else {
        const y1 = Y(d.a), y2 = Y(d.b), x = X(d.at) + shift
        const mid = (y1 + y2) / 2, gap = th + 12
        items.push({ t: 'line', layer: 'basic', x1: x, y1, x2: x, y2: mid - gap / 2, stroke: C.basic, width: 1 })
        items.push({ t: 'line', layer: 'basic', x1: x, y1: mid + gap / 2, x2: x, y2, stroke: C.basic, width: 1 })
        items.push({ t: 'text', layer: 'basic', x, y: mid, text: label, color: C.basic, size: fs, weight: 600, anchor: 'middle' })
        head('basic', { x, y: y1 }, { x: 0, y: -1 }, C.basic)
        head('basic', { x, y: y2 }, { x: 0, y: 1 }, C.basic)
      }
    }
  }

  // Общие габариты: серые, с выносными линиями, считаются по вылету.
  if (show.overall) {
    const fileW = geo.trim.w + 2 * b, fileH = geo.trim.h + 2 * b
    const left = bleedPx.x, right = bleedPx.x + bleedPx.w
    const top = bleedPx.y, bottom = bleedPx.y + bleedPx.h
    const yD = Y(geo.trim.h) + o.bottom * s + GAP_DIM
    const xD = X(geo.trim.w) + o.right * s + GAP_DIM
    const g = C.overall

    items.push({ t: 'line', layer: 'overall', x1: left, y1: bottom + 3, x2: left, y2: yD + EXT_OVER, stroke: g, width: 1 })
    items.push({ t: 'line', layer: 'overall', x1: right, y1: bottom + 3, x2: right, y2: yD + EXT_OVER, stroke: g, width: 1 })
    items.push({ t: 'line', layer: 'overall', x1: left, y1: yD, x2: right, y2: yD, stroke: g, width: 1 })
    head('overall', { x: left, y: yD }, { x: -1, y: 0 }, g)
    head('overall', { x: right, y: yD }, { x: 1, y: 0 }, g)
    items.push({ t: 'text', layer: 'overall', x: (left + right) / 2, y: yD + 8 + fs * 0.7, text: `${fileW} мм`, color: C.text, size: fs + 2, weight: 600, anchor: 'middle' })

    items.push({ t: 'line', layer: 'overall', x1: right + 3, y1: top, x2: xD + EXT_OVER, y2: top, stroke: g, width: 1 })
    items.push({ t: 'line', layer: 'overall', x1: right + 3, y1: bottom, x2: xD + EXT_OVER, y2: bottom, stroke: g, width: 1 })
    items.push({ t: 'line', layer: 'overall', x1: xD, y1: top, x2: xD, y2: bottom, stroke: g, width: 1 })
    head('overall', { x: xD, y: top }, { x: 0, y: -1 }, g)
    head('overall', { x: xD, y: bottom }, { x: 0, y: 1 }, g)
    items.push({ t: 'text', layer: 'overall', x: xD + 8 + fs * 0.7, y: (top + bottom) / 2, text: `${fileH} мм`, color: C.text, size: fs + 2, weight: 600, anchor: 'middle', rotate: -90 })
  }

  // Подписи элементов
  if (show.labels) {
    for (const f of geo.folds) if (f.label) {
      items.push({ t: 'text', layer: 'labels', x: X(f.a.x) - 10, y: (Y(f.a.y) + Y(f.b.y)) / 2, text: f.label, color: C.caption, size: fs - 1, weight: 500, anchor: 'middle', rotate: -90 })
    }
    // Бахрому на развёртке не показываем — подписи только для крепежа (люверсы).
    for (const f of geo.features) if (f.label && f.type === 'grommet') {
      items.push({ t: 'text', layer: 'labels', x: X(f.center.x) + 12, y: Y(f.center.y), text: f.label, color: C.caption, size: fs - 1, weight: 500, anchor: 'start' })
    }
  }

  return {
    width: Math.ceil(m.fixed.x + m.mm.x * s),
    height: Math.ceil(m.fixed.y + m.mm.y * s),
    scale: s,
    origin: { x: ox, y: oy },
    artworkPx: R(geo.artworkArea),
    items
  }
}

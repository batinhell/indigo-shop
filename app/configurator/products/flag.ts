import type { Feature, Fold, Geometry, Panel, ProductModule, Rect, Dimension } from '../core/types'

export type FabricId = 'satin' | 'nylon' | 'mesh' | 'gabardine' | 'dome-satin'
export type FlagMount = 'pocket' | 'grommets'

export interface FlagParams {
  width: number // мм, по горизонтали (вдоль ветра)
  height: number // мм, по древку
  fabric: FabricId
  mount: FlagMount
  fringe: boolean
  doubleSided: boolean
}

// Производственные припуски. Значения — из текущего конструктора и макета;
// сверить с цехом, прежде чем отдавать шаблоны клиентам.
export const FLAG_RULES = {
  bleed: 5,
  pocket: 60,
  safe: 20,
  fringe: 40,
  grommet: { diameter: 12, inset: 25, maxStep: 300 },
  limits: { min: 200, max: 3000 }
}

export const FABRICS: { value: FabricId, label: string }[] = [
  { value: 'satin', label: 'Атлас' },
  { value: 'nylon', label: 'Нейлон' },
  { value: 'mesh', label: 'Флажная сетка' },
  { value: 'gabardine', label: 'Габардин' },
  { value: 'dome-satin', label: 'Купольный атлас' }
]

export const FLAG_SIZES = [
  { width: 1350, height: 900, label: '90×135 см' },
  { width: 900, height: 600, label: '60×90 см' }
]

const fmt = (w: number, h: number) => `${Math.round(w)} × ${Math.round(h)} мм`

export function buildFlag(p: FlagParams): Geometry {
  const R = FLAG_RULES
  const { width: W, height: H } = p
  const pocket = p.mount === 'pocket' ? R.pocket : 0

  const panels: Panel[] = []
  const folds: Fold[] = []
  const features: Feature[] = []
  const dims: Dimension[] = []

  if (pocket) {
    panels.push({ id: 'pocket', kind: 'pocket', rect: { x: 0, y: 0, w: pocket, h: H }, printable: false })
    folds.push({
      id: 'pocket-fold',
      a: { x: pocket, y: 0 },
      b: { x: pocket, y: H },
      between: ['pocket', 'face'],
      angle: 180,
      label: `Карман под древко ${pocket} мм`
    })
  }
  const face: Rect = { x: pocket, y: 0, w: W, h: H }
  panels.push({ id: 'face', kind: 'face', rect: face, printable: true })

  if (p.mount === 'grommets') {
    const g = R.grommet
    const n = Math.max(2, Math.ceil((H - 2 * g.inset) / g.maxStep) + 1)
    for (let i = 0; i < n; i++) {
      features.push({
        type: 'grommet',
        id: `grommet-${i}`,
        center: { x: g.inset, y: g.inset + (i * (H - 2 * g.inset)) / (n - 1) },
        diameter: g.diameter,
        label: i === 0 ? `Люверсы ⌀${g.diameter} мм` : undefined
      })
    }
  }

  if (p.fringe) {
    const L = R.fringe
    const x0 = face.x, x1 = face.x + W
    features.push(
      { type: 'fringe', id: 'fringe-top', from: { x: x0, y: 0 }, to: { x: x1, y: 0 }, length: L, side: 'top', label: `Бахрома ${L} мм` },
      { type: 'fringe', id: 'fringe-right', from: { x: x1, y: 0 }, to: { x: x1, y: H }, length: L, side: 'right' },
      { type: 'fringe', id: 'fringe-bottom', from: { x: x0, y: H }, to: { x: x1, y: H }, length: L, side: 'bottom' }
    )
  }

  // Слева безопасная зона отодвигается от люверсов, чтобы макет под них не попал.
  const leftSafe = p.mount === 'grommets'
    ? Math.max(R.safe, R.grommet.inset + R.grommet.diameter / 2 + 5)
    : R.safe
  const safeZone: Rect = { x: face.x + leftSafe, y: R.safe, w: W - leftSafe - R.safe, h: H - 2 * R.safe }

  const trimW = pocket + W
  const b = R.bleed
  // Вылет есть со всех сторон, кроме сгиба кармана: там полотно продолжается.
  const artworkArea: Rect = {
    x: pocket ? face.x : -b,
    y: -b,
    w: pocket ? W + b : W + 2 * b,
    h: H + 2 * b
  }

  // Размер ширины по умолчанию идёт у нижней кромки. С люверсами он бы прошёл
  // по нижнему люверсу — поднимаем линию выше него с запасом (в мм, независимо
  // от зума), чтобы основной размер не пересекал крепёж.
  let widthAt = H
  let widthShift = -26
  const grommetYs = features.filter(f => f.type === 'grommet').map(f => f.center.y)
  if (grommetYs.length) {
    widthAt = Math.max(...grommetYs) - (R.grommet.diameter / 2 + 14)
    widthShift = 0
  }
  dims.push(
    { id: 'width', axis: 'x', a: face.x, b: face.x + W, at: widthAt, shiftPx: widthShift, label: `${W} мм` },
    { id: 'height', axis: 'y', a: 0, b: H, at: face.x + W * 0.64, label: `${H} мм` }
  )
  if (pocket) dims.push({ id: 'pocket', axis: 'x', a: 0, b: pocket, at: 0, shiftPx: 30, label: `${pocket} мм` })

  const summary = [{ label: 'Готовое изделие', value: fmt(W, H) }]
  if (pocket) summary.push({ label: 'Полотно с карманом', value: fmt(trimW, H) })
  summary.push({ label: 'Файл с вылетами', value: fmt(trimW + 2 * b, H + 2 * b) })

  return {
    product: 'flag',
    bleed: b,
    trim: { x: 0, y: 0, w: trimW, h: H },
    panels,
    folds,
    features,
    safeZone,
    artworkArea,
    dims,
    summary
  }
}

export const flag: ProductModule<FlagParams> = {
  id: 'flag',
  title: 'Флаг',
  defaults: { width: 1350, height: 900, fabric: 'mesh', mount: 'pocket', fringe: true, doubleSided: true },
  schema: [
    { key: 'fabric', type: 'select', label: 'Ткань', options: FABRICS },
    {
      key: 'mount', type: 'select', label: 'Тип крепления',
      options: [{ value: 'pocket', label: 'Под древко' }, { value: 'grommets', label: 'Люверсы' }]
    },
    { key: 'width', type: 'number', label: 'Ширина', unit: 'мм', min: FLAG_RULES.limits.min, max: FLAG_RULES.limits.max },
    { key: 'height', type: 'number', label: 'Высота', unit: 'мм', min: FLAG_RULES.limits.min, max: FLAG_RULES.limits.max },
    { key: 'fringe', type: 'toggle', label: 'Бахрома' },
    { key: 'doubleSided', type: 'toggle', label: 'Печать с двух сторон' }
  ],
  build: buildFlag
}

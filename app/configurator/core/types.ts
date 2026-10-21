// Единый язык геометрии. Всё в миллиметрах, начало координат — левый верхний угол
// чистового реза, ось Y вниз (как в SVG). Из этого описания строятся развёртка,
// 3D-модель и наложение макета, поэтому продукт описывается только здесь.

export interface Vec { x: number, y: number }
export interface Rect { x: number, y: number, w: number, h: number }

export type PanelKind = 'face' | 'pocket' | 'hem'

export interface Panel {
  id: string
  kind: PanelKind
  rect: Rect // чистовой контур панели
  printable: boolean
}

// Линия сгиба между двумя панелями. angle — угол складывания в 3D (180 = подгиб).
export interface Fold {
  id: string
  a: Vec
  b: Vec
  between: [string, string]
  angle: number
  label?: string
}

export type Feature
  = | { type: 'grommet', id: string, center: Vec, diameter: number, label?: string }
    | {
      type: 'fringe'
      id: string
      from: Vec
      to: Vec
      length: number
      side: Side // в какую сторону от кромки свисает
      label?: string
    }

export type Side = 'top' | 'right' | 'bottom' | 'left'

// Основной размер: линия лежит на оси axis от a до b, на координате at другой оси.
// shiftPx сдвигает линию в экранных пикселях, чтобы отступ от кромки не зависел от зума.
export interface Dimension {
  id: string
  axis: 'x' | 'y'
  a: number
  b: number
  at: number
  shiftPx?: number
  label: string
}

export interface SummaryRow { label: string, value: string }

export interface Geometry {
  product: string
  bleed: number
  trim: Rect // габарит чистового реза
  panels: Panel[]
  folds: Fold[]
  features: Feature[]
  safeZone?: Rect
  artworkArea: Rect // куда ложится макет, уже с вылетами
  dims: Dimension[]
  summary: SummaryRow[]
}

// Описание поля формы — из него собирается левая панель параметров.
export type FieldSchema
  = | { key: string, type: 'select', label: string, options: { value: string, label: string }[] }
    | { key: string, type: 'toggle', label: string }
    | { key: string, type: 'number', label: string, unit: string, min: number, max: number, step?: number }

export interface ProductModule<P> {
  id: string
  title: string
  defaults: P
  schema: FieldSchema[]
  build(params: P): Geometry
}

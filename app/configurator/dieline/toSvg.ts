import type { Drawing, Item, Layer, layoutDieline, type ShowFlags } from './layout'
import type { Geometry } from '../core/types'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const n = (v: number) => +v.toFixed(2)

// Порядок слоёв = порядок отрисовки. Имена групп совпадают с именами слоёв в Illustrator.
export const LAYER_ORDER: Layer[] = ['paper', 'artwork', 'features', 'safe', 'bleed', 'trim', 'crease', 'basic', 'overall', 'labels']
const LAYER_NAMES: Record<Layer, string> = {
  paper: 'Paper', artwork: 'Artwork', features: 'Features', safe: 'Safe zone',
  bleed: 'Bleed', trim: 'Cut', crease: 'Crease', basic: 'Dimensions', overall: 'Overall', labels: 'Labels'
}

export function itemToSvg(it: Item): string {
  const dash = 'dash' in it && it.dash ? ` stroke-dasharray="${it.dash.join(' ')}"` : ''
  switch (it.t) {
    case 'rect':
      return `<rect x="${n(it.x)}" y="${n(it.y)}" width="${n(it.w)}" height="${n(it.h)}" fill="${it.fill ?? 'none'}"${it.stroke ? ` stroke="${it.stroke}" stroke-width="${it.width ?? 1}"` : ''}${dash}/>`
    case 'line':
      return `<line x1="${n(it.x1)}" y1="${n(it.y1)}" x2="${n(it.x2)}" y2="${n(it.y2)}" stroke="${it.stroke}" stroke-width="${it.width}"${dash}${it.opacity !== undefined ? ` opacity="${it.opacity}"` : ''}/>`
    case 'poly':
      return `<polygon points="${it.points.map(p => `${n(p.x)},${n(p.y)}`).join(' ')}" fill="${it.fill}"/>`
    case 'circle':
      return `<circle cx="${n(it.cx)}" cy="${n(it.cy)}" r="${n(it.r)}" fill="none" stroke="${it.stroke}" stroke-width="${it.width}"/>`
    case 'text': {
      const rot = it.rotate ? ` transform="rotate(${it.rotate} ${n(it.x)} ${n(it.y)})"` : ''
      return `<text x="${n(it.x)}" y="${n(it.y)}" fill="${it.color}" font-size="${it.size}" font-weight="${it.weight}" text-anchor="${it.anchor}" dominant-baseline="central"${rot}>${esc(it.text)}</text>`
    }
  }
}

export interface SvgOptions {
  artworkHref?: string
  mmUnits?: boolean // width/height в мм — для печатного шаблона
  fontFamily?: string
}

export function drawingToSvg(d: Drawing, opts: SvgOptions = {}): string {
  const font = opts.fontFamily ?? 'Manrope, Arial, sans-serif'
  const size = opts.mmUnits
    ? `width="${n(d.width / d.scale)}mm" height="${n(d.height / d.scale)}mm"`
    : `width="${d.width}" height="${d.height}"`
  const groups = LAYER_ORDER.map((layer) => {
    let body = d.items.filter(i => i.layer === layer).map(itemToSvg).join('')
    if (layer === 'artwork' && opts.artworkHref) {
      const a = d.artworkPx
      body = `<clipPath id="artwork-clip"><rect x="${n(a.x)}" y="${n(a.y)}" width="${n(a.w)}" height="${n(a.h)}"/></clipPath>`
        + `<image href="${esc(opts.artworkHref)}" x="${n(a.x)}" y="${n(a.y)}" width="${n(a.w)}" height="${n(a.h)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#artwork-clip)"/>`
    }
    return body ? `<g id="${LAYER_NAMES[layer]}">${body}</g>` : ''
  }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" ${size} viewBox="0 0 ${d.width} ${d.height}" font-family="${font}">${groups}</svg>`
}

// Печатный шаблон: 1 единица = 1 мм, шрифт подписей 14 мм — читается на распечатке.
export function exportTemplateSvg(geo: Geometry, show?: Partial<ShowFlags>, artworkHref?: string) {
  const d = layoutDieline(geo, { scale: 1, show, fontSize: 14, pad: 20 })
  return drawingToSvg(d, { mmUnits: true, artworkHref })
}

import { describe, expect, it } from 'vitest'
import { buildFlag, flag } from '../products/flag'
import { layoutDieline, fitScale, measure } from '../dieline/layout'
import { drawingToSvg } from '../dieline/toSvg'

const base = flag.defaults

describe('flag geometry', () => {
  it('pocket: trim = pocket + width, fold on pocket edge', () => {
    const g = buildFlag(base)
    expect(g.trim).toEqual({ x: 0, y: 0, w: 1410, h: 900 })
    expect(g.folds).toHaveLength(1)
    expect(g.folds[0].a.x).toBe(60)
    expect(g.panels.map(p => p.id)).toEqual(['pocket', 'face'])
  })

  it('summary matches the mockup', () => {
    const g = buildFlag(base)
    expect(g.summary).toEqual([
      { label: 'Готовое изделие', value: '1350 × 900 мм' },
      { label: 'Полотно с карманом', value: '1410 × 900 мм' },
      { label: 'Файл с вылетами', value: '1420 × 910 мм' }
    ])
  })

  it('artwork has no bleed on the pocket fold side', () => {
    const g = buildFlag(base)
    expect(g.artworkArea).toEqual({ x: 60, y: -5, w: 1355, h: 910 })
  })

  it('grommets: no pocket, ≥2 grommets, step ≤ 300 mm', () => {
    const g = buildFlag({ ...base, mount: 'grommets' })
    expect(g.trim.w).toBe(1350)
    expect(g.folds).toHaveLength(0)
    const gr = g.features.filter(f => f.type === 'grommet') as { center: { x: number, y: number } }[]
    expect(gr.length).toBeGreaterThanOrEqual(2)
    for (let i = 1; i < gr.length; i++) expect(gr[i].center.y - gr[i - 1].center.y).toBeLessThanOrEqual(300)
    expect(gr[0].center.y).toBe(25)
    expect(gr.at(-1).center.y).toBe(875)
    expect(g.summary.map(r => r.label)).not.toContain('Полотно с карманом')
    expect(g.safeZone!.x).toBeGreaterThanOrEqual(25 + 6)
  })

  it('grommets: width dimension does not cross any grommet', () => {
    const g = buildFlag({ ...base, mount: 'grommets' })
    const width = g.dims.find(d => d.id === 'width')!
    const grommets = g.features.filter(f => f.type === 'grommet') as { center: { x: number, y: number }, diameter: number }[]
    expect(grommets.length).toBeGreaterThan(0)
    // Линия ширины горизонтальна на y = width.at; пересечение с люверсом ⟺
    // |grommet.y − width.at| < радиус. Проверяем, что зазор больше радиуса.
    for (const gr of grommets) {
      expect(Math.abs(gr.center.y - width.at)).toBeGreaterThan(gr.diameter / 2)
    }
  })

  it('no fringe → no fringe features', () => {
    const g = buildFlag({ ...base, fringe: false })
    expect(g.features.some(f => f.type === 'fringe')).toBe(false)
  })
})

describe('dieline layout', () => {
  it('fitScale fits the drawing into the box', () => {
    const g = buildFlag(base)
    const box = { w: 750, h: 560 }
    const s = fitScale(g, box)
    const d = layoutDieline(g, { scale: s })
    expect(d.width).toBeLessThanOrEqual(box.w + 1)
    expect(d.height).toBeLessThanOrEqual(box.h + 1)
  })

  it('show flags remove layers', () => {
    const g = buildFlag(base)
    const d = layoutDieline(g, { scale: 0.4, show: { overall: false, basic: false, bleed: false, safe: false, features: false } })
    const layers = new Set(d.items.map(i => i.layer))
    expect([...layers].sort()).toEqual(['crease', 'paper', 'trim'])
    expect(measure(g, { show: { overall: false } }).fixed.x).toBeLessThan(measure(g).fixed.x)
  })

  it('overall labels use file size with bleed', () => {
    const d = layoutDieline(buildFlag(base), { scale: 0.4 })
    const texts = d.items.filter(i => i.t === 'text').map(i => (i as { text: string }).text)
    expect(texts).toContain('1420 мм')
    expect(texts).toContain('910 мм')
    expect(texts).toContain('1350 мм')
    expect(texts).toContain('900 мм')
    expect(texts).toContain('60 мм')
  })

  it('svg is well-formed with named layers', () => {
    const svg = drawingToSvg(layoutDieline(buildFlag(base), { scale: 0.4 }))
    expect(svg.startsWith('<svg')).toBe(true)
    for (const id of ['Bleed', 'Cut', 'Crease', 'Dimensions', 'Overall']) expect(svg).toContain(`id="${id}"`)
  })
})

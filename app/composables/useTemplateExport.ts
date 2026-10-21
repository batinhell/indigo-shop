import { exportTemplateSvg } from '~/configurator/dieline/toSvg'
import type { Geometry } from '~/configurator/core/types'

// Экспорт шаблона развёртки: SVG (вектор), PDF (для печати/Illustrator), DXF (контуры).
// Тяжёлые библиотеки (jspdf, svg2pdf.js, dxf-writer) грузятся лениво — не в основной бандл.

const FONT_URL = '/fonts/manrope/Manrope-var.ttf'
let fontB64Cache: string | null = null

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function bufferToBase64(buf: ArrayBuffer) {
  let binary = ''
  const bytes = new Uint8Array(buf)
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return btoa(binary)
}

async function loadFontBase64() {
  if (fontB64Cache) return fontB64Cache
  const res = await fetch(FONT_URL)
  const buf = await res.arrayBuffer()
  fontB64Cache = bufferToBase64(buf)
  return fontB64Cache
}

export function useTemplateExport() {
  const store = useConfiguratorStore()

  function baseName() {
    const W = store.params.width
    const H = store.params.height
    return `indigo_flag_${W}x${H}_${store.mount}_dieline`
  }

  function exportSvg() {
    const svg = exportTemplateSvg(store.geometry as Geometry, store.show)
    triggerDownload(new Blob([svg], { type: 'image/svg+xml' }), `${baseName()}.svg`)
  }

  async function exportPdf() {
    const svgStr = exportTemplateSvg(store.geometry as Geometry, store.show)
    const svgEl = new DOMParser().parseFromString(svgStr, 'image/svg+xml').documentElement as unknown as SVGSVGElement
    const wMm = Number.parseFloat(svgEl.getAttribute('width') || '0')
    const hMm = Number.parseFloat(svgEl.getAttribute('height') || '0')

    // svg2pdf надёжнее работает с элементом в DOM — вставляем за экран.
    svgEl.style.position = 'fixed'
    svgEl.style.left = '-99999px'
    document.body.appendChild(svgEl)
    try {
      const { jsPDF } = await import('jspdf')
      const { svg2pdf } = await import('svg2pdf.js')
      const orientation = wMm > hMm ? 'landscape' : 'portrait'
      const doc = new jsPDF({ orientation, unit: 'mm', format: [wMm, hMm] })
      const fontB64 = await loadFontBase64()
      doc.addFileToVFS('Manrope.ttf', fontB64)
      doc.addFont('Manrope.ttf', 'Manrope', 'normal')
      doc.setFont('Manrope')
      await svg2pdf(svgEl, doc, { x: 0, y: 0, width: wMm, height: hMm })
      doc.save(`${baseName()}.pdf`)
    } finally {
      svgEl.remove()
    }
  }

  async function exportDxf() {
    const geo = store.geometry as Geometry
    const { default: Drawing } = await import('dxf-writer')
    const d = new Drawing()
    d.setUnits('Millimeters')
    d.addLayer('Bleed', Drawing.ACI.GREEN, 'CONTINUOUS')
    d.addLayer('Crease', Drawing.ACI.RED, 'CONTINUOUS')
    d.addLayer('Cut', Drawing.ACI.BLUE, 'CONTINUOUS')

    const b = geo.bleed
    const tw = geo.trim.w
    const th = geo.trim.h
    // DXF — ось Y вверх, поэтому инвертируем y геометрии (в ней Y вниз).
    d.setActiveLayer('Bleed')
    d.drawRect(-b, b, tw + b, -(th + b))
    d.setActiveLayer('Cut')
    d.drawRect(0, 0, tw, -th)
    d.setActiveLayer('Crease')
    for (const f of geo.folds) d.drawLine(f.a.x, -f.a.y, f.b.x, -f.b.y)

    triggerDownload(new Blob([d.toDxfString()], { type: 'application/dxf' }), `${baseName()}.dxf`)
  }

  return { exportSvg, exportPdf, exportDxf }
}

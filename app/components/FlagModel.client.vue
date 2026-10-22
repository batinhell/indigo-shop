<script setup>
import {
  Group, Mesh, PlaneGeometry, CylinderGeometry, TorusGeometry,
  MeshPhysicalMaterial, MeshStandardMaterial,
  CanvasTexture, TextureLoader, RepeatWrapping, ClampToEdgeWrapping,
  NoColorSpace, SRGBColorSpace, Vector2, Color, DoubleSide
} from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { fabricMaterial } from '~/configurator/materials'
// PBR-карты тканей — явные импорты (?url), чтобы Vite точно забандлил их в
// /_nuxt. glob и public/ на этом стенде карты теряли (пустой glob / не попадало
// в манифест Nitro) — отсюда статический список.
import crepeSatinNor from '~/assets/textures/fabrics/crepe_satin_nor_gl.jpg?url'
import crepeSatinRough from '~/assets/textures/fabrics/crepe_satin_rough.jpg?url'
import biStretchNor from '~/assets/textures/fabrics/bi_stretch_nor_gl.jpg?url'
import biStretchRough from '~/assets/textures/fabrics/bi_stretch_rough.jpg?url'
import denimNor from '~/assets/textures/fabrics/denim_fabric_05_nor_gl.jpg?url'
import denimRough from '~/assets/textures/fabrics/denim_fabric_05_rough.jpg?url'
import flagnetNor from '~/assets/textures/fabrics/flagnet_nor_gl.jpg?url'
import flagnetRough from '~/assets/textures/fabrics/flagnet_rough.jpg?url'
import flagnetOpacity from '~/assets/textures/fabrics/flagnet_opacity.png?url'

// 3D-предпросмотр флага. Полотно колышется постоянным ветром (без физ.симуляции).
// Ткани — реальные PBR-карты (Poly Haven / ambientCG). Клиент-онли.
const store = useConfiguratorStore()

const WIND = 0.55

const dims = computed(() => ({
  w: store.params.width / 1000,
  h: store.params.height / 1000
}))

// Аспект канваса (ш/в). Превью обычно «портретное», поэтому ландшафтный флаг
// упирается в ширину — дистанцию камеры считаем по горизонтальному fov.
const canvasAspect = ref(0.72)
const FOV = 36

const cameraPosition = computed(() => {
  const Wm = dims.value.w
  const Hm = dims.value.h
  const vfov = (FOV * Math.PI) / 180
  const hfov = 2 * Math.atan(Math.tan(vfov / 2) * canvasAspect.value)
  // влезаем и по высоте (с запасом под бахрому), и по ширине — берём большее
  const fitH = (Hm * 1.28 / 2) / Math.tan(vfov / 2)
  const fitW = (Wm * 1.12 / 2) / Math.tan(hfov / 2)
  const dist = Math.max(fitH, fitW) * 1.04
  // почти в лоб, лёгкий боковой ракурс для объёма; по вертикали — по центру
  return [dist * 0.14, 0.0, dist * 0.99]
})

const group = new Group()
let faceGeo = null
let base = null
let fringeStrips = []
let raf = 0
const startT = performance.now()

// Карта «имя файла → забандленный URL» для fabricMap.
const fabricUrlByName = {
  'crepe_satin_nor_gl.jpg': crepeSatinNor,
  'crepe_satin_rough.jpg': crepeSatinRough,
  'bi_stretch_nor_gl.jpg': biStretchNor,
  'bi_stretch_rough.jpg': biStretchRough,
  'denim_fabric_05_nor_gl.jpg': denimNor,
  'denim_fabric_05_rough.jpg': denimRough,
  'flagnet_nor_gl.jpg': flagnetNor,
  'flagnet_rough.jpg': flagnetRough,
  'flagnet_opacity.png': flagnetOpacity
}

// Кэш PBR-карт тканей. Один флаг на экране, repeat выставляем на лету.
const loader = new TextureLoader()
const texCache = new Map()
function fabricMap(slug, map, Wm, Hm, tile, ext = 'jpg') {
  const key = `${slug}_${map}`
  let tex = texCache.get(key)
  if (!tex) {
    tex = loader.load(fabricUrlByName[`${slug}_${map}.${ext}`])
    tex.wrapS = RepeatWrapping
    tex.wrapT = RepeatWrapping
    tex.colorSpace = NoColorSpace
    texCache.set(key, tex)
  }
  tex.repeat.set(Math.max(1, Wm / tile), Math.max(1, Hm / tile))
  return tex
}

// Альфа-текстура бахромы: вертикальные нити, прозрачность растёт к кончику.
let fringeTexCache = null
function fringeTexture() {
  if (fringeTexCache) return fringeTexCache
  const c = document.createElement('canvas')
  c.width = 64
  c.height = 128
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, 64, 128)
  for (let x = 1; x < 64; x += 3) {
    const len = 96 + Math.random() * 30
    const w = 1.3 + Math.random() * 0.8
    const g = ctx.createLinearGradient(0, 0, 0, len)
    g.addColorStop(0, '#ffffff')
    g.addColorStop(0.75, '#cccccc')
    g.addColorStop(1, '#000000')
    ctx.fillStyle = g
    ctx.fillRect(x, 0, w, len)
  }
  const t = new CanvasTexture(c)
  t.wrapS = RepeatWrapping
  t.wrapT = ClampToEdgeWrapping
  fringeTexCache = t
  return t
}

// Процедурный плетёный узор для флажной сетки: светлые нити + притенённые
// ячейки-просветы. Реальная перфорация (дыры) на белом фоне невидима, поэтому
// сетку показываем узором альбедо — так ячейки читаются как настоящая сетка.
let netTexCache = null
function netTexture() {
  if (netTexCache) return netTexCache
  const S = 128
  const cell = 16 // шаг ячейки
  const thread = 7 // толщина нити
  const c = document.createElement('canvas')
  c.width = S
  c.height = S
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#d9dde1' // просветы — тень в глубине сетки
  ctx.fillRect(0, 0, S, S)
  ctx.fillStyle = '#fcfdfe' // нити
  for (let p = 0; p < S; p += cell) {
    ctx.fillRect(p, 0, thread, S)
    ctx.fillRect(0, p, S, thread)
  }
  const t = new CanvasTexture(c)
  t.wrapS = RepeatWrapping
  t.wrapT = RepeatWrapping
  t.colorSpace = SRGBColorSpace
  netTexCache = t
  return t
}

function disposeChildren() {
  while (group.children.length) {
    const c = group.children.pop()
    c.geometry?.dispose()
    if (Array.isArray(c.material)) c.material.forEach(m => m.dispose())
    else c.material?.dispose()
  }
}

function buildFlag() {
  disposeChildren()
  fringeStrips = []
  const Wm = store.params.width / 1000
  const Hm = store.params.height / 1000
  const m = fabricMaterial(store.fabric)
  const segW = Math.min(64, Math.max(10, Math.round(store.params.width / 30)))
  const segH = Math.min(48, Math.max(8, Math.round(store.params.height / 30)))

  // Полотно
  faceGeo = new PlaneGeometry(Wm, Hm, segW, segH)
  base = Float32Array.from(faceGeo.attributes.position.array)
  const faceMat = new MeshPhysicalMaterial({
    color: new Color(m.color),
    roughness: m.roughness,
    metalness: m.metalness,
    sheen: m.sheen,
    sheenColor: new Color(m.sheenColor),
    clearcoat: m.clearcoat,
    clearcoatRoughness: 0.15,
    side: DoubleSide
  })
  if (m.net) {
    // Флажная сетка — процедурный плетёный узор (ячейки) + нормаль для рельефа.
    const cellM = 0.02 // физический шаг ячейки ~20 мм
    const net = netTexture()
    net.repeat.set(Math.max(6, Wm / cellM), Math.max(4, Hm / cellM))
    faceMat.map = net
    faceMat.normalMap = fabricMap('flagnet', 'nor_gl', Wm, Hm, cellM)
    faceMat.normalScale = new Vector2(0.6, 0.6)
    faceMat.roughness = 0.78
  } else if (m.texture) {
    faceMat.normalMap = fabricMap(m.texture, 'nor_gl', Wm, Hm, m.tile)
    faceMat.roughnessMap = fabricMap(m.texture, 'rough', Wm, Hm, m.tile)
    faceMat.normalScale = new Vector2(m.normalScale, m.normalScale)
  }
  group.add(new Mesh(faceGeo, faceMat))

  // Карман под древко
  if (store.mount === 'pocket') {
    const panel = store.geometry.panels.find(p => p.id === 'pocket')
    const pocketMm = panel ? panel.rect.w : 60
    const r = (pocketMm / 1000) / 2.6
    const pole = new Mesh(
      new CylinderGeometry(r, r, Hm * 1.04, 16),
      new MeshStandardMaterial({ color: 0xcfd0d2, roughness: 0.6, metalness: 0.1 })
    )
    pole.position.set(-Wm / 2, 0, 0)
    group.add(pole)
  }

  // Люверсы
  if (store.mount === 'grommets') {
    const gmat = new MeshStandardMaterial({ color: 0x9a9ca0, roughness: 0.4, metalness: 0.6 })
    for (const f of store.geometry.features) {
      if (f.type !== 'grommet') continue
      const r = (f.diameter / 1000) / 2
      const ring = new Mesh(new TorusGeometry(r, r * 0.4, 8, 18), gmat)
      ring.position.set(-Wm / 2 + f.center.x / 1000, Hm / 2 - f.center.y / 1000, 0.002)
      group.add(ring)
    }
  }

  // Бахрома — текстурные полосы (альфа нитей) по трём кромкам, следуют за волной
  if (store.fringe) {
    const L = 0.045
    const fmat = new MeshStandardMaterial({
      color: 0xd8a63a, roughness: 0.6, side: DoubleSide,
      transparent: true, alphaMap: fringeTexture(), alphaTest: 0.25, depthWrite: false
    })
    // sx — мировой x вершины (для амплитуды волны), edgeY — y кромки
    const addStrip = (geoW, segs, pos, rotZ, edgeY, worldXFn) => {
      const g = new PlaneGeometry(geoW, L, segs, 1)
      const uv = g.attributes.uv
      const n = Math.max(2, Math.round(geoW / 0.02)) // плотность нитей
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * n)
      const mesh = new Mesh(g, fmat)
      mesh.position.set(pos[0], pos[1], pos[2])
      mesh.rotation.z = rotZ
      group.add(mesh)
      const bp = Float32Array.from(g.attributes.position.array)
      const wx = new Float32Array(bp.length / 3)
      for (let i = 0; i < wx.length; i++) wx[i] = worldXFn(bp[i * 3], bp[i * 3 + 1])
      fringeStrips.push({ geo: g, base: bp, wx, edgeY })
    }
    addStrip(Wm, segW, [0, Hm / 2 + L / 2, 0], 0, Hm / 2, lx => lx)
    addStrip(Wm, segW, [0, -Hm / 2 - L / 2, 0], Math.PI, -Hm / 2, lx => -lx)
    addStrip(Hm, segH, [Wm / 2 + L / 2, 0, 0], -Math.PI / 2, 0, () => Wm / 2)
  }
}

function waveAt(x, y, amp, freq, t, Wm) {
  const edge = Math.min(1, Math.max(0, (x + Wm / 2) / Wm))
  let z = Math.sin(x * freq + t * 3.0) * amp * edge
  z += Math.sin(y * freq * 0.6 + t * 2.2) * amp * 0.4 * edge
  return { z, edge }
}

function animate() {
  const m = fabricMaterial(store.fabric)
  const Wm = store.params.width / 1000
  const t = (performance.now() - startT) / 1000
  const amp = (0.012 + WIND * 0.1) * (1 - m.stiffness * 0.7)
  const freq = 4 + WIND * 5
  const drape = m.drape * 0.05

  if (faceGeo && base) {
    const pos = faceGeo.attributes.position.array
    for (let k = 0; k < pos.length; k += 3) {
      const x = base[k]
      const y = base[k + 1]
      const { z, edge } = waveAt(x, y, amp, freq, t, Wm)
      pos[k] = x
      pos[k + 1] = y - drape * edge * edge
      pos[k + 2] = z
    }
    faceGeo.attributes.position.needsUpdate = true
    faceGeo.computeVertexNormals()
  }

  for (const s of fringeStrips) {
    const pos = s.geo.attributes.position.array
    for (let k = 0; k < pos.length; k += 3) {
      const worldX = s.wx[k / 3]
      const { z, edge } = waveAt(worldX, s.edgeY, amp, freq, t, Wm)
      // кончик нити (локальный y у края L) трепещет сильнее
      const tip = (pos[k + 1] + 0.0225) / 0.045
      const sway = Math.sin(t * 7 + worldX * 25) * 0.012 * (0.3 + edge) * tip
      pos[k + 2] = s.base[k + 2] + z + sway
    }
    s.geo.attributes.position.needsUpdate = true
  }

  raf = requestAnimationFrame(animate)
}

let resizeObs = null
onMounted(() => {
  buildFlag()
  animate()
  // Следим за аспектом канваса — камера должна вмещать флаг при любой ширине колонки
  const canvas = document.querySelector('.preview__stage canvas')
  if (canvas && 'ResizeObserver' in window) {
    const update = () => {
      const w = canvas.clientWidth || 1
      const h = canvas.clientHeight || 1
      canvasAspect.value = w / h
    }
    update()
    resizeObs = new ResizeObserver(update)
    resizeObs.observe(canvas)
  }
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  resizeObs?.disconnect()
  disposeChildren()
  texCache.forEach(t => t.dispose())
  texCache.clear()
  fringeTexCache?.dispose()
  fringeTexCache = null
  netTexCache?.dispose()
  netTexCache = null
})

watch(
  () => [store.params.width, store.params.height, store.mount, store.fringe, store.fabric].join(','),
  () => buildFlag()
)
</script>

<template>
  <TresCanvas
    clear-color="#ffffff"
    render-mode="always"
    :output-color-space="'srgb'"
  >
    <TresPerspectiveCamera
      :position="cameraPosition"
      :fov="FOV"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls
      :enable-pan="false"
      :min-polar-angle="0.35"
      :max-polar-angle="2.4"
      :min-distance="Math.max(dims.w, dims.h) * 0.9"
      :max-distance="Math.max(dims.w, dims.h) * 4.5"
    />

    <!-- Нейтральный студийный свет: яркая заливка (ткань читается светлой) +
         мягкий ключ сверху-справа + контровой для объёма складок. -->
    <TresHemisphereLight :args="[0xffffff, 0xdfe3e8, 1.5]" />
    <!-- Яркий ключ почти со стороны камеры — даёт сатиновый блик по полотну. -->
    <TresDirectionalLight
      :position="[1.3, 2.2, 4]"
      :intensity="2.1"
    />
    <TresDirectionalLight
      :position="[-2.6, 1.2, 1.5]"
      :intensity="0.5"
    />
    <TresDirectionalLight
      :position="[0, 1, -3]"
      :intensity="0.45"
    />

    <primitive :object="group" />
  </TresCanvas>
</template>

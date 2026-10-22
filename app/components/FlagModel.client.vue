<script setup>
import {
  Group, Mesh, PlaneGeometry, CylinderGeometry, TorusGeometry,
  MeshPhysicalMaterial, MeshStandardMaterial,
  CanvasTexture, TextureLoader, RepeatWrapping, ClampToEdgeWrapping,
  NoColorSpace, Vector2, Color, DoubleSide
} from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { fabricMaterial } from '~/configurator/materials'

// 3D-предпросмотр флага. Полотно колышется постоянным ветром (без физ.симуляции).
// Ткани — реальные PBR-карты (Poly Haven / ambientCG). Клиент-онли.
const store = useConfiguratorStore()

const WIND = 0.55

const dims = computed(() => ({
  w: store.params.width / 1000,
  h: store.params.height / 1000
}))
const cameraPosition = computed(() => {
  const m = Math.max(dims.value.w, dims.value.h)
  return [m * 0.3, m * 0.12, m * 1.9]
})

const group = new Group()
let faceGeo = null
let base = null
let fringeStrips = []
let raf = 0
const startT = performance.now()

// Кэш PBR-карт тканей. Один флаг на экране, repeat выставляем на лету.
const loader = new TextureLoader()
const texCache = new Map()
function fabricMap(slug, map, Wm, Hm, tile, ext = 'jpg') {
  const key = `${slug}_${map}`
  let tex = texCache.get(key)
  if (!tex) {
    tex = loader.load(`/textures/fabrics/${slug}_${map}.${ext}`)
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
    // Флажная сетка — реальная перфорированная ткань (ambientCG Fabric019)
    faceMat.normalMap = fabricMap('flagnet', 'nor_gl', Wm, Hm, m.tile)
    faceMat.roughnessMap = fabricMap('flagnet', 'rough', Wm, Hm, m.tile)
    faceMat.alphaMap = fabricMap('flagnet', 'opacity', Wm, Hm, m.tile, 'png')
    faceMat.normalScale = new Vector2(m.normalScale, m.normalScale)
    faceMat.transparent = true
    faceMat.alphaTest = 0.4
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

onMounted(() => {
  buildFlag()
  animate()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  disposeChildren()
  texCache.forEach(t => t.dispose())
  texCache.clear()
  fringeTexCache?.dispose()
  fringeTexCache = null
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
      :fov="40"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls
      :enable-pan="false"
      :min-polar-angle="0.3"
      :max-polar-angle="2.5"
      :min-distance="dims.w * 0.4"
      :max-distance="dims.w * 5"
    />

    <TresHemisphereLight :args="[0xffffff, 0x9098a3, 1.1]" />
    <TresDirectionalLight
      :position="[2.5, 3, 4]"
      :intensity="2"
    />
    <TresDirectionalLight
      :position="[-3, 1.5, -2]"
      :intensity="0.6"
    />

    <primitive :object="group" />
  </TresCanvas>
</template>

<script setup>
import {
  Group, Mesh, PlaneGeometry, CylinderGeometry, TorusGeometry,
  MeshPhysicalMaterial, MeshStandardMaterial, InstancedMesh, Object3D,
  CanvasTexture, TextureLoader, RepeatWrapping, NoColorSpace, Vector2, Color, DoubleSide
} from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { fabricMaterial } from '~/configurator/materials'

// 3D-предпросмотр флага. Полотно колышется постоянным ветром (без физ.симуляции):
// амплитуда растёт от кромки крепления к свободному краю, параметры (жёсткость,
// провисание, глянец, сетка) — из пресета ткани. Клиент-онли.
const store = useConfiguratorStore()

const WIND = 0.55 // ветер всегда включён

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
let fringeInst = null
let fringeData = []
let raf = 0
const startT = performance.now()

// Кэш PBR-карт тканей (нормали/шероховатость). Один флаг на экране, repeat выставляем на лету.
const loader = new TextureLoader()
const texCache = new Map()
function fabricMap(slug, map, Wm, Hm, tile) {
  const key = `${slug}_${map}`
  let tex = texCache.get(key)
  if (!tex) {
    tex = loader.load(`/textures/fabrics/${slug}_${map}.jpg`)
    tex.wrapS = RepeatWrapping
    tex.wrapT = RepeatWrapping
    tex.colorSpace = NoColorSpace
    texCache.set(key, tex)
  }
  tex.repeat.set(Math.max(1, Wm / tile), Math.max(1, Hm / tile))
  return tex
}

function netTexture(Wm, Hm) {
  // Флажная сетка: тонкие нити, крупные сквозные ячейки (явный просвет).
  const c = document.createElement('canvas')
  c.width = 12
  c.height = 12
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, 12, 12)
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, 12, 2)
  ctx.fillRect(0, 0, 2, 12)
  const t = new CanvasTexture(c)
  t.wrapS = RepeatWrapping
  t.wrapT = RepeatWrapping
  t.repeat.set(Math.round(Wm * 200), Math.round(Hm * 200))
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
  fringeInst = null
  fringeData = []
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
  if (m.texture) {
    faceMat.normalMap = fabricMap(m.texture, 'nor_gl', Wm, Hm, m.tile)
    faceMat.roughnessMap = fabricMap(m.texture, 'rough', Wm, Hm, m.tile)
    faceMat.normalScale = new Vector2(m.normalScale, m.normalScale)
  }
  if (m.net) {
    faceMat.alphaMap = netTexture(Wm, Hm)
    faceMat.alphaTest = 0.5
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

  // Бахрома — пряди (инстансы) по трём кромкам; данные для анимации вместе с полотном
  if (store.fringe) {
    const L = 0.04
    const step = 0.006
    const fmat = new MeshStandardMaterial({ color: 0xd9a83a, roughness: 0.7, side: DoubleSide })
    const threadGeo = new PlaneGeometry(0.0022, L)
    const nTop = Math.max(2, Math.floor(Wm / step))
    const nRight = Math.max(2, Math.floor(Hm / step))
    for (let k = 0; k < nTop; k++) {
      const x = -Wm / 2 + (k + 0.5) * (Wm / nTop)
      fringeData.push({ x, y: Hm / 2 + L / 2, rotZ: 0, phase: Math.random() * Math.PI * 2 })
      fringeData.push({ x, y: -Hm / 2 - L / 2, rotZ: 0, phase: Math.random() * Math.PI * 2 })
    }
    for (let k = 0; k < nRight; k++) {
      const y = -Hm / 2 + (k + 0.5) * (Hm / nRight)
      fringeData.push({ x: Wm / 2 + L / 2, y, rotZ: Math.PI / 2, phase: Math.random() * Math.PI * 2 })
    }
    fringeInst = new InstancedMesh(threadGeo, fmat, fringeData.length)
    group.add(fringeInst)
  }
}

function animate() {
  const m = fabricMaterial(store.fabric)
  const Wm = store.params.width / 1000
  const t = (performance.now() - startT) / 1000
  const amp = (0.012 + WIND * 0.1) * (1 - m.stiffness * 0.7)
  const freq = 4 + WIND * 5
  const drape = m.drape * 0.05
  const waveAt = (x, y) => {
    const edge = Math.min(1, Math.max(0, (x + Wm / 2) / Wm))
    let z = Math.sin(x * freq + t * 3.0) * amp * edge
    z += Math.sin(y * freq * 0.6 + t * 2.2) * amp * 0.4 * edge
    return { z, edge }
  }

  if (faceGeo && base) {
    const pos = faceGeo.attributes.position.array
    for (let k = 0; k < pos.length; k += 3) {
      const x = base[k]
      const y = base[k + 1]
      const { z, edge } = waveAt(x, y)
      pos[k] = x
      pos[k + 1] = y - drape * edge * edge
      pos[k + 2] = z
    }
    faceGeo.attributes.position.needsUpdate = true
    faceGeo.computeVertexNormals()
  }

  if (fringeInst) {
    const d = new Object3D()
    for (let i = 0; i < fringeData.length; i++) {
      const s = fringeData[i]
      const { z, edge } = waveAt(s.x, s.y)
      // трепет нитей: качаются от ветра (и у кромки чуть-чуть, чтобы не «висели в воздухе»)
      const flutter = Math.sin(t * 7 + s.phase) * (0.12 + 0.4 * edge)
      d.position.set(s.x, s.y - drape * edge * edge, z)
      d.rotation.set(flutter * 0.6, 0, s.rotZ + flutter)
      d.updateMatrix()
      fringeInst.setMatrixAt(i, d.matrix)
    }
    fringeInst.instanceMatrix.needsUpdate = true
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
})

watch(
  () => [store.params.width, store.params.height, store.mount, store.fringe, store.fabric].join(','),
  () => buildFlag()
)
</script>

<template>
  <TresCanvas
    clear-color="#f4f5f6"
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

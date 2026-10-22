<script setup>
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { fabricMaterial } from '~/configurator/materials'

// 3D-предпросмотр флага. Одна нейтральная сцена. Строится из geometry стора
// (единица сцены — 1 метр). Клиент-онли, грузится лениво при переключении на «Модель».
const store = useConfiguratorStore()

const dims = computed(() => ({
  w: store.params.width / 1000,
  h: store.params.height / 1000
}))

const segments = computed(() => ({
  w: Math.min(80, Math.max(1, Math.round(store.params.width / 25))),
  h: Math.min(80, Math.max(1, Math.round(store.params.height / 25)))
}))

const mat = computed(() => fabricMaterial(store.fabric))

const cameraPosition = computed(() => {
  const m = Math.max(dims.value.w, dims.value.h)
  return [m * 0.35, m * 0.12, m * 1.9]
})

// Карман (под древко) — трубка вдоль левой кромки.
const pole = computed(() => {
  if (store.mount !== 'pocket') return null
  const panel = store.geometry.panels.find(p => p.id === 'pocket')
  const pocketMm = panel ? panel.rect.w : 60
  return {
    radius: (pocketMm / 1000) / 2.6,
    position: [-dims.value.w / 2, 0, 0],
    height: dims.value.h * 1.04
  }
})

// Люверсы — кольца (торы) по левой кромке, позиции из features (мм).
const grommets = computed(() => {
  if (store.mount !== 'grommets') return []
  const w = dims.value.w
  const h = dims.value.h
  return store.geometry.features
    .filter(f => f.type === 'grommet')
    .map(f => ({
      key: f.id,
      position: [-w / 2 + f.center.x / 1000, h / 2 - f.center.y / 1000, 0.001],
      r: (f.diameter / 1000) / 2
    }))
})

// Бахрома — полоски по трём свободным кромкам (верх, низ, право).
const fringes = computed(() => {
  if (!store.fringe) return []
  const w = dims.value.w
  const h = dims.value.h
  const L = 0.04 // 40 мм
  return [
    { key: 'top', position: [0, h / 2 + L / 2, 0], args: [w, L] },
    { key: 'bottom', position: [0, -h / 2 - L / 2, 0], args: [w, L] },
    { key: 'right', position: [w / 2 + L / 2, 0, 0], args: [L, h] }
  ]
})
</script>

<template>
  <TresCanvas
    clear-color="#f4f5f6"
    :output-color-space="'srgb'"
  >
    <TresPerspectiveCamera
      :position="cameraPosition"
      :fov="40"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls
      :enable-pan="false"
      :min-polar-angle="0.4"
      :max-polar-angle="2.4"
      :min-distance="dims.w * 0.5"
      :max-distance="dims.w * 4"
    />

    <!-- Нейтральный свет -->
    <TresAmbientLight :intensity="1.1" />
    <TresDirectionalLight
      :position="[2, 3, 4]"
      :intensity="2.2"
    />
    <TresDirectionalLight
      :position="[-3, 1, -2]"
      :intensity="0.5"
    />

    <!-- Полотно -->
    <TresMesh>
      <TresPlaneGeometry :args="[dims.w, dims.h, segments.w, segments.h]" />
      <TresMeshPhysicalMaterial
        :color="mat.color"
        :roughness="mat.roughness"
        :metalness="mat.metalness"
        :sheen="mat.sheen"
        :sheen-color="mat.sheenColor"
        :transparent="mat.opacity < 1"
        :opacity="mat.opacity"
        :side="2"
      />
    </TresMesh>

    <!-- Карман с древком -->
    <TresMesh
      v-if="pole"
      :position="pole.position"
    >
      <TresCylinderGeometry :args="[pole.radius, pole.radius, pole.height, 16]" />
      <TresMeshStandardMaterial
        color="#cfd0d2"
        :roughness="0.6"
        :metalness="0.1"
      />
    </TresMesh>

    <!-- Люверсы -->
    <TresMesh
      v-for="g in grommets"
      :key="g.key"
      :position="g.position"
    >
      <TresTorusGeometry :args="[g.r, g.r * 0.4, 8, 20]" />
      <TresMeshStandardMaterial
        color="#9a9ca0"
        :roughness="0.4"
        :metalness="0.6"
      />
    </TresMesh>

    <!-- Бахрома -->
    <TresMesh
      v-for="f in fringes"
      :key="f.key"
      :position="f.position"
    >
      <TresPlaneGeometry :args="f.args" />
      <TresMeshStandardMaterial
        color="#d9a83a"
        :roughness="0.7"
        :side="2"
      />
    </TresMesh>
  </TresCanvas>
</template>

<script setup>
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

// 3D-предпросмотр флага. Одна нейтральная сцена. Строится из geometry стора
// (единица сцены — 1 метр). Клиент-онли, грузится лениво при переключении на «Модель».
const store = useConfiguratorStore()

// Временная палитра полотна по ткани — пресеты материалов добавим следующим шагом.
const FABRIC_COLOR = {
  'atlas': '#f3f3f5',
  'nylon': '#eef0f2',
  'mesh': '#e8eaed',
  'gabardine': '#e6e8eb',
  'dome-atlas': '#f3f3f5'
}

const dims = computed(() => ({
  w: store.params.width / 1000,
  h: store.params.height / 1000
}))

const segments = computed(() => ({
  w: Math.min(80, Math.max(1, Math.round(store.params.width / 25))),
  h: Math.min(80, Math.max(1, Math.round(store.params.height / 25)))
}))

const color = computed(() => FABRIC_COLOR[store.fabric] ?? '#eef0f2')

const cameraPosition = computed(() => {
  const m = Math.max(dims.value.w, dims.value.h)
  return [m * 0.35, m * 0.12, m * 1.9]
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
      <TresMeshStandardMaterial
        :color="color"
        :roughness="0.85"
        :metalness="0"
        :side="2"
      />
    </TresMesh>
  </TresCanvas>
</template>

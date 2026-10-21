<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Geometry } from '../core/types'
import { DEFAULT_SHOW, PALETTE, fitScale, layoutDieline, type ShowFlags } from './layout'
import { LAYER_ORDER } from './toSvg'

const props = withDefaults(defineProps<{
  geometry: Geometry
  show?: Partial<ShowFlags>
  zoom?: number
  artworkUrl?: string
}>(), { zoom: 1 })

const stage = ref<HTMLElement | null>(null)
const box = ref({ w: 0, h: 0 })
let ro: ResizeObserver | undefined

onMounted(() => {
  ro = new ResizeObserver(([e]) => {
    box.value = { w: e.contentRect.width, h: e.contentRect.height }
  })
  if (stage.value) ro.observe(stage.value)
})
onBeforeUnmount(() => ro?.disconnect())

// Перетаскивание чертежа при зуме: тянем за холст, двигаем его скролл.
const dragging = ref(false)
let dragStart = { x: 0, y: 0, sx: 0, sy: 0 }

function canPan(el: HTMLElement) {
  return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1
}
function onPointerDown(e: PointerEvent) {
  const el = stage.value
  if (!el || !canPan(el)) return
  dragging.value = true
  dragStart = { x: e.clientX, y: e.clientY, sx: el.scrollLeft, sy: el.scrollTop }
  el.setPointerCapture(e.pointerId)
}
function onPointerMove(e: PointerEvent) {
  if (!dragging.value || !stage.value) return
  stage.value.scrollLeft = dragStart.sx - (e.clientX - dragStart.x)
  stage.value.scrollTop = dragStart.sy - (e.clientY - dragStart.y)
}
function onPointerUp(e: PointerEvent) {
  if (!dragging.value) return
  dragging.value = false
  stage.value?.releasePointerCapture?.(e.pointerId)
}

const show = computed<ShowFlags>(() => ({ ...DEFAULT_SHOW, ...props.show }))

const drawing = computed(() => {
  if (!box.value.w) return null
  const scale = fitScale(props.geometry, box.value, { show: show.value }) * props.zoom
  return layoutDieline(props.geometry, { scale, show: show.value })
})

const layers = computed(() => {
  const d = drawing.value
  if (!d) return []
  return LAYER_ORDER.map(layer => ({ layer, items: d.items.filter(i => i.layer === layer) }))
})

const legend = computed(() => [
  { label: 'Вылет', color: PALETTE.bleed, on: show.value.bleed },
  { label: 'Рез', color: PALETTE.trim, on: true },
  { label: 'Сгиб', color: PALETTE.crease, dash: '3 2', on: props.geometry.folds.length > 0 },
  { label: 'Безопасная зона', color: PALETTE.safe, dash: '2 3', on: show.value.safe && !!props.geometry.safeZone }
].filter(l => l.on))

const uid = `dl-${Math.random().toString(36).slice(2, 8)}`
</script>

<template>
  <div class="dieline">
    <header class="dieline__info">
      <ul class="dieline__legend">
        <li
          v-for="l in legend"
          :key="l.label"
        >
          <svg
            width="24"
            height="2"
            aria-hidden="true"
          >
            <line
              x1="0"
              y1="1"
              x2="24"
              y2="1"
              :stroke="l.color"
              stroke-width="2"
              :stroke-dasharray="l.dash"
            />
          </svg>
          {{ l.label }}
        </li>
      </ul>
      <dl class="dieline__summary">
        <div
          v-for="row in geometry.summary"
          :key="row.label"
        >
          <dt>{{ row.label }}</dt>
          <dd>{{ row.value }}</dd>
        </div>
      </dl>
    </header>

    <div
      ref="stage"
      class="dieline__stage"
      :class="{ 'dieline__stage--pan': (zoom ?? 1) > 1, 'dieline__stage--grabbing': dragging }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerUp"
    >
      <svg
        v-if="drawing"
        :width="drawing.width"
        :height="drawing.height"
        :viewBox="`0 0 ${drawing.width} ${drawing.height}`"
        class="dieline__svg"
        role="img"
        aria-label="Развёртка изделия"
      >
        <defs>
          <clipPath :id="`${uid}-art`">
            <rect
              :x="drawing.artworkPx.x"
              :y="drawing.artworkPx.y"
              :width="drawing.artworkPx.w"
              :height="drawing.artworkPx.h"
            />
          </clipPath>
        </defs>
        <g
          v-for="g in layers"
          :key="g.layer"
          :data-layer="g.layer"
        >
          <image
            v-if="g.layer === 'artwork' && artworkUrl"
            :href="artworkUrl"
            :x="drawing.artworkPx.x"
            :y="drawing.artworkPx.y"
            :width="drawing.artworkPx.w"
            :height="drawing.artworkPx.h"
            preserveAspectRatio="xMidYMid slice"
            :clip-path="`url(#${uid}-art)`"
          />
          <template
            v-for="(it, i) in g.items"
            :key="i"
          >
            <rect
              v-if="it.t === 'rect'"
              :x="it.x"
              :y="it.y"
              :width="it.w"
              :height="it.h"
              :fill="it.fill ?? 'none'"
              :stroke="it.stroke"
              :stroke-width="it.width"
              :stroke-dasharray="it.dash?.join(' ')"
            />
            <line
              v-else-if="it.t === 'line'"
              :x1="it.x1"
              :y1="it.y1"
              :x2="it.x2"
              :y2="it.y2"
              :stroke="it.stroke"
              :stroke-width="it.width"
              :stroke-dasharray="it.dash?.join(' ')"
              :opacity="it.opacity"
            />
            <polygon
              v-else-if="it.t === 'poly'"
              :points="it.points.map(p => `${p.x},${p.y}`).join(' ')"
              :fill="it.fill"
            />
            <circle
              v-else-if="it.t === 'circle'"
              :cx="it.cx"
              :cy="it.cy"
              :r="it.r"
              fill="none"
              :stroke="it.stroke"
              :stroke-width="it.width"
            />
            <text
              v-else-if="it.t === 'text'"
              :x="it.x"
              :y="it.y"
              :fill="it.color"
              :font-size="it.size"
              :font-weight="it.weight"
              :text-anchor="it.anchor"
              dominant-baseline="central"
              :transform="it.rotate ? `rotate(${it.rotate} ${it.x} ${it.y})` : undefined"
            >{{ it.text }}</text>
          </template>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.dieline {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  min-height: 0;
  font-family: Manrope, Arial, sans-serif;
  color: #04121b;
}
.dieline__info { display: flex; flex-direction: column; gap: 16px; }
.dieline__legend { display: flex; flex-wrap: wrap; gap: 16px; margin: 0; padding: 0; list-style: none; }
.dieline__legend li { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #81888d; }
.dieline__summary { display: flex; flex-direction: column; gap: 16px; margin: 0; }
.dieline__summary dt { font-size: 12px; font-weight: 600; color: #81888d; }
.dieline__summary dd { margin: 4px 0 0; font-size: 14px; font-weight: 600; }
.dieline__stage {
  flex: 1;
  min-height: 0;
  display: grid;
  place-items: center;
  overflow: auto;
}
.dieline__stage--pan { cursor: grab; }
.dieline__stage--grabbing { cursor: grabbing; }
.dieline__stage--grabbing .dieline__svg { pointer-events: none; }
.dieline__svg { display: block; }
</style>

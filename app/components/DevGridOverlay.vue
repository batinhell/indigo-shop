<script setup>
const props = defineProps({
  columns: {
    type: Number,
    default: 12
  },
  columnWidth: {
    type: Number,
    default: 72
  },
  gutter: {
    type: Number,
    default: 22
  },
  maxWidth: {
    type: Number,
    default: 1106
  },
  sidePadding: {
    type: Number,
    default: 16
  },
  columnColor: {
    type: String,
    default: 'rgba(201, 37, 255, 0.14)'
  },
  lineColor: {
    type: String,
    default: 'rgba(201, 37, 255, 0.45)'
  }
})

const gridStyle = computed(() => {
  const step = props.columnWidth + props.gutter

  return {
    '--grid-columns': String(props.columns),
    '--grid-column-width': `${props.columnWidth}px`,
    '--grid-gutter': `${props.gutter}px`,
    '--grid-step': `${step}px`,
    '--grid-max-width': `${props.maxWidth}px`,
    '--grid-side-padding': `${props.sidePadding}px`,
    '--grid-column-color': props.columnColor,
    '--grid-line-color': props.lineColor
  }
})
</script>

<template>
  <div class="dev-grid-overlay" aria-hidden="true">
    <div class="dev-grid-overlay__content" :style="gridStyle" />
  </div>
</template>

<style scoped>
.dev-grid-overlay {
  inset: 0;
  pointer-events: none;
  position: fixed;
  z-index: 5000;
}

.dev-grid-overlay__content {
  border-left: 1px solid var(--grid-line-color);
  border-right: 1px solid var(--grid-line-color);
  height: 100%;
  margin: 0 auto;
  width: min(calc(100vw - (var(--grid-side-padding) * 2)), var(--grid-max-width));
  background: repeating-linear-gradient(
    to right,
    var(--grid-column-color) 0,
    var(--grid-column-color) var(--grid-column-width),
    transparent var(--grid-column-width),
    transparent var(--grid-step)
  );
}
</style>

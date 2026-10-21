# Конструктор v2 — ядро

```
core/types.ts            Geometry, ProductModule — общий язык, всё в мм
products/flag.ts         флаг: schema (форма), FLAG_RULES (припуски), build(params) → Geometry
products/index.ts        реестр продуктов
dieline/layout.ts        Geometry → примитивы в px (fitScale, слои, размеры как у Pacdora)
dieline/toSvg.ts         примитивы → SVG; exportTemplateSvg — шаблон 1:1 в мм
dieline/DielineView.vue  экран «Развёртка»
test/flag.test.ts        vitest
```

Подключение в Nuxt 3:

```vue
<script setup lang="ts">
import { flag } from '~/configurator'
import DielineView from '~/configurator/dieline/DielineView.vue'
const params = reactive({ ...flag.defaults })
const geometry = computed(() => flag.build(params))
const show = reactive({ overall: true, basic: true, bleed: true, safe: true, features: true, labels: false })
</script>
<template>
  <DielineView :geometry="geometry" :show="show" :zoom="1" />
</template>
```

Новый продукт: файл в products/ с defaults, schema, build → запись в products/index.ts.

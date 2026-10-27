<script setup>
import { storeToRefs } from 'pinia'
import { RASTER_EXTENSIONS } from '~/constants/product'

// Фотореал-превью флага (конструктор v2, Фаза D). Сменил realtime three.js:
// сервер собирает MP4-луп флага по макету (POST /api/flag/preview), здесь крутим
// его в <video loop>. Ткань/крепление/бахрома/сторона — параметры запроса.
const store = useConfiguratorStore()
const { fabric, mount, fringe, showBack, uploadedFiles } = storeToRefs(store)

// Макет для превью — первый РАСТРОВЫЙ файл (png/jpg). Вектор/tiff не варпим.
// Отдельной загрузки оборота в UI нет, поэтому «Оборот» = зеркало лица (просвет).
const designFile = computed(() =>
  uploadedFiles.value.find(f => RASTER_EXTENSIONS.some(ext => f.name.toLowerCase().endsWith(ext))) || null
)
const hasDesign = computed(() => !!designFile.value)

const videoUrl = ref('')
const loading = ref(false)
const errorMsg = ref('')
let reqId = 0

// Светлый плейсхолдер-макет (3:2), пока юзер не загрузил растр: показываем пустой
// флаг в выбранной ткани/креплении, поверх — подсказка загрузить макет.
let placeholderBlob = null
function getPlaceholder() {
  if (placeholderBlob) return Promise.resolve(placeholderBlob)
  const c = document.createElement('canvas')
  c.width = 1350
  c.height = 900
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#f1edf7'
  ctx.fillRect(0, 0, c.width, c.height)
  return new Promise((resolve) => {
    c.toBlob((b) => {
      placeholderBlob = b
      resolve(b)
    }, 'image/png')
  })
}

async function refresh() {
  const id = ++reqId
  loading.value = true
  errorMsg.value = ''
  try {
    const design = hasDesign.value ? designFile.value : await getPlaceholder()
    const fd = new FormData()
    fd.append('design', design, hasDesign.value ? designFile.value.name : 'placeholder.png')
    fd.append('fabric', fabric.value)
    fd.append('mount', mount.value)
    fd.append('fringe', fringe.value ? '1' : '0')
    fd.append('mirror', showBack.value ? '1' : '0')

    const res = await $fetch('/api/flag/preview', { method: 'POST', body: fd })
    if (id !== reqId) return // пришёл более свежий запрос — этот результат устарел
    videoUrl.value = res.url
  } catch (e) {
    if (id !== reqId) return
    errorMsg.value = e?.data?.message || 'Не удалось собрать превью'
  } finally {
    if (id === reqId) loading.value = false
  }
}

// Дебаунс: быстрые клики по тканям/опциям не плодят запросы.
let timer = null
function schedule() {
  clearTimeout(timer)
  timer = setTimeout(refresh, 300)
}

watch([fabric, mount, fringe, showBack, designFile], schedule, { immediate: true })
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="photo-preview">
    <video
      v-show="videoUrl"
      :src="videoUrl"
      class="photo-preview__video"
      autoplay
      loop
      muted
      playsinline
    />

    <!-- Подсказка, пока нет растрового макета (поверх пустого флага) -->
    <div
      v-if="!hasDesign && !loading && !errorMsg"
      class="photo-preview__hint"
    >
      Загрузите растровый макет (PNG, JPG) — и увидите его на флаге
    </div>

    <!-- Лоадер первой сборки комбинации (из кэша — мгновенно) -->
    <div
      v-if="loading"
      class="photo-preview__overlay"
    >
      <span class="photo-preview__spinner" />
      <span class="photo-preview__overlay-text">Собираем превью…</span>
    </div>

    <div
      v-else-if="errorMsg"
      class="photo-preview__overlay photo-preview__overlay--error"
    >
      {{ errorMsg }}
    </div>

    <!-- Лицо / Оборот -->
    <div class="photo-preview__sides">
      <button
        type="button"
        :class="['photo-preview__side', { 'photo-preview__side--active': !showBack }]"
        @click="showBack = false"
      >
        Лицо
      </button>
      <button
        type="button"
        :class="['photo-preview__side', { 'photo-preview__side--active': showBack }]"
        @click="showBack = true"
      >
        Оборот
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photo-preview {
  position: relative;
  flex: 1;
  min-height: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: $radius-card;
  overflow: hidden;

  &__video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  &__hint {
    position: absolute;
    bottom: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    max-width: 22rem;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.4;
    color: $color-base-secondary;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(2px);
    padding: 0.5rem 0.875rem;
    border-radius: $radius-control;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(1px);

    &--error {
      background: rgba(255, 255, 255, 0.9);
    }
  }

  &__overlay-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: $color-base-secondary;
  }

  &__spinner {
    width: 2rem;
    height: 2rem;
    border: 0.1875rem solid $color-primary-bg;
    border-top-color: $color-purple;
    border-radius: 50%;
    animation: photo-preview-spin 0.8s linear infinite;
  }

  &__sides {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.25rem;
    padding: 0.25rem;
    background: $color-input-bg;
    border-radius: $radius-control;
  }

  &__side {
    font-family: 'Manrope', sans-serif;
    font-size: 0.8125rem;
    font-weight: 600;
    color: $color-base-secondary;
    padding: 0.375rem 0.75rem;
    border-radius: calc(#{$radius-control} - 0.25rem);
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;

    &:hover {
      color: $color-purple;
    }

    &--active {
      color: $color-purple;
      background: white;
      box-shadow: 0 0.0625rem 0.25rem rgba(4, 18, 27, 0.08);
    }
  }
}

@keyframes photo-preview-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

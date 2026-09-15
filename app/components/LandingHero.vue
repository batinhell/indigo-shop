<script setup>
import dropdownIcon from '~/assets/icons/landing-hero-dropdown.svg?raw'
import bulletIcon from '~/assets/icons/landing-hero-bullet.svg'
import { landingHeroDropdowns, landingHeroSlides } from '~/constants/landing-hero.js'

const AUTOPLAY_DELAY = 4000

const slides = landingHeroSlides
const activeIndex = ref(0)
const openKey = ref(null)
const hoveredKey = ref(null)
const controlsRef = ref(null)
const rollWidths = reactive({})

const rollMeasureEls = {}
let autoplayTimer = null
let rollResizeObserver = null

const activeSlide = computed(() => slides[activeIndex.value])
const openDropdown = computed(() => (openKey.value ? landingHeroDropdowns[openKey.value] : null))
const isHighlighted = computed(() => Boolean(openKey.value || hoveredKey.value))

function getElementState(key) {
  if (openKey.value === key) {
    return 'active'
  }

  if (hoveredKey.value === key) {
    return 'hovered'
  }

  return isHighlighted.value ? 'muted' : 'default'
}

function stopAutoplay() {
  clearTimeout(autoplayTimer)
  autoplayTimer = null
}

function scheduleAutoplay() {
  stopAutoplay()

  if (openKey.value || slides.length < 2) {
    return
  }

  autoplayTimer = setTimeout(() => {
    activeIndex.value = (activeIndex.value + 1) % slides.length
  }, AUTOPLAY_DELAY)
}

function goToSlide(index) {
  activeIndex.value = index
  scheduleAutoplay()
}

function toggleDropdown(key) {
  openKey.value = openKey.value === key ? null : key
}

function onDropdownPointerEnter(event, key) {
  if (event.pointerType === 'mouse') {
    hoveredKey.value = key
  }
}

function closeDropdown() {
  openKey.value = null
}

function onClickOutside(event) {
  if (openKey.value && controlsRef.value && !controlsRef.value.contains(event.target)) {
    closeDropdown()
  }
}

function onKeydown(event) {
  if (event.key === 'Escape' && openKey.value) {
    closeDropdown()
  }
}

// Ширина текста дропдауна замеряется по скрытой копии, чтобы плашка анимировала размер вместе с прокруткой текста
function setRollMeasureRef(key, el) {
  if (rollMeasureEls[key] === el) {
    return
  }

  if (rollMeasureEls[key]) {
    rollResizeObserver?.unobserve(rollMeasureEls[key])
  }

  rollMeasureEls[key] = el

  if (el) {
    rollResizeObserver?.observe(el)
  }
}

function getRollStyle(key) {
  return rollWidths[key] ? { width: `${rollWidths[key]}px` } : undefined
}

watch([activeIndex, openKey], scheduleAutoplay)

onMounted(() => {
  scheduleAutoplay()
  document.addEventListener('click', onClickOutside, true)
  document.addEventListener('keydown', onKeydown)

  rollResizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      rollWidths[entry.target.dataset.rollKey] = entry.contentRect.width
    })
  })
  Object.values(rollMeasureEls).forEach(el => el && rollResizeObserver.observe(el))
})

onBeforeUnmount(() => {
  stopAutoplay()
  rollResizeObserver?.disconnect()
  document.removeEventListener('click', onClickOutside, true)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <section
    :class="['landing-hero', { 'landing-hero_open': openKey }]"
    aria-roledescription="carousel"
    aria-label="Что мы делаем"
  >
    <div class="landing-hero__slides">
      <img
        v-for="(slide, index) in slides"
        :key="slide.id"
        :src="slide.image"
        :alt="`Мы ${slide.direction} для ${slide.audience}`"
        :class="['landing-hero__slide', { 'landing-hero__slide_active': index === activeIndex }]"
        :style="slide.imagePosition ? { objectPosition: slide.imagePosition } : undefined"
        :aria-hidden="index !== activeIndex"
        :loading="index === 0 ? 'eager' : 'lazy'"
        :fetchpriority="index === 0 ? 'high' : 'auto'"
        decoding="async"
      >
    </div>

    <div class="landing-hero__caption">
      <p class="landing-hero__caption-title">
        {{ activeSlide.title }}
      </p>
      <p class="landing-hero__caption-text">
        {{ activeSlide.description }}
      </p>
    </div>

    <div class="landing-hero__bullets">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        type="button"
        :class="['landing-hero__bullet', { 'landing-hero__bullet_active': index === activeIndex }]"
        :aria-label="`Слайд ${index + 1} из ${slides.length}`"
        :aria-current="index === activeIndex"
        @click="goToSlide(index)"
      >
        <img
          :src="bulletIcon"
          alt=""
          aria-hidden="true"
        >
      </button>
    </div>

    <Transition name="landing-hero-fade">
      <div
        v-if="openKey"
        class="landing-hero__overlay"
        aria-hidden="true"
      />
    </Transition>

    <div
      ref="controlsRef"
      class="landing-hero__controls"
    >
      <Transition
        name="landing-hero-panel"
        mode="out-in"
      >
        <div
          v-if="openDropdown"
          :id="`landing-hero-panel-${openKey}`"
          :key="openKey"
          :class="['landing-hero__panel', `landing-hero__panel_${openKey}`]"
        >
          <nav
            class="landing-hero__tags"
            :aria-label="openDropdown.label"
          >
            <NuxtLink
              v-for="tag in openDropdown.tags"
              :key="tag.to"
              :to="tag.to"
              class="landing-hero__tag"
              @click="closeDropdown"
            >
              {{ tag.label }}
            </NuxtLink>
          </nav>
        </div>
      </Transition>

      <div :class="['landing-hero__selector', { 'landing-hero__selector_highlighted': isHighlighted }]">
        <span class="landing-hero__word">Мы</span>

        <template
          v-for="(key, keyIndex) in ['direction', 'audience']"
          :key="key"
        >
          <span
            v-if="keyIndex > 0"
            class="landing-hero__word"
          >для</span>

          <button
            type="button"
            :class="['landing-hero__dropdown', `landing-hero__dropdown_${getElementState(key)}`]"
            :aria-expanded="openKey === key"
            :aria-controls="`landing-hero-panel-${key}`"
            :aria-label="`${landingHeroDropdowns[key].label}: ${activeSlide[key]}`"
            @click="toggleDropdown(key)"
            @pointerenter="onDropdownPointerEnter($event, key)"
            @pointerleave="hoveredKey = null"
          >
            <span
              class="landing-hero__roll"
              :style="getRollStyle(key)"
            >
              <Transition name="landing-hero-roll">
                <span
                  :key="activeSlide[key]"
                  class="landing-hero__roll-text"
                >{{ activeSlide[key] }}</span>
              </Transition>
              <span
                :ref="el => setRollMeasureRef(key, el)"
                class="landing-hero__roll-measure"
                :data-roll-key="key"
                aria-hidden="true"
              >{{ activeSlide[key] }}</span>
            </span>
            <span
              class="landing-hero__chevron"
              aria-hidden="true"
              v-html="dropdownIcon"
            />
          </button>
        </template>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
$hero-height: 42.5rem;
$hero-height-mobile: 34rem;
$selector-height: 3rem;
$controls-offset: 1.25rem;
$color-muted: rgba($color-base, 0.52);
$color-tag-hover: #f0f0f0;
$color-tag-pressed: #c3c6c8;
$ease: cubic-bezier(0.4, 0, 0.2, 1);
$roll-duration: 0.45s;

.landing-hero {
  --landing-hero-height: #{$hero-height};

  border-radius: 4rem;
  height: var(--landing-hero-height);
  margin: 0 auto;
  max-width: 69.125rem;
  overflow: hidden;
  position: relative;
  width: calc(100% - 32px);
}

.landing-hero__slides {
  inset: 0;
  position: absolute;
}

.landing-hero__slide {
  height: 100%;
  inset: 0;
  max-width: none;
  object-fit: cover;
  opacity: 0;
  position: absolute;
  transition: opacity 0.8s $ease;
  width: 100%;
}

.landing-hero__slide_active {
  opacity: 1;
}

.landing-hero__caption {
  bottom: 2.5rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 600;
  gap: 0.25rem;
  left: 4rem;
  line-height: 1.25rem;
  position: absolute;
  text-shadow: -0.5px 1px 5.4px rgba(0, 0, 0, 0.32);
  width: min(27.875rem, calc(100% - 8rem));
  z-index: 1;
}

.landing-hero__caption-title,
.landing-hero__caption-text {
  margin: 0;
}

.landing-hero__bullets {
  bottom: 2.75rem;
  display: flex;
  gap: 0.25rem;
  position: absolute;
  right: 4rem;
  z-index: 1;
}

.landing-hero__bullet {
  background: none;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 1.25rem;
  opacity: 0.4;
  padding: 0;
  transition: opacity 0.3s $ease;
  width: 1.25rem;

  img {
    display: block;
    height: 1.25rem;
    width: 1.25rem;
  }

  &:hover {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 1px;
  }
}

.landing-hero__bullet_active,
.landing-hero__bullet_active:hover {
  opacity: 1;
}

.landing-hero__overlay {
  backdrop-filter: blur(4px);
  background: rgba(217, 217, 217, 0.01);
  inset: 0;
  position: absolute;
  z-index: 2;
}

.landing-hero__controls {
  display: flex;
  flex-direction: column;
  left: 50%;
  position: absolute;
  top: calc(50% - 2.5rem);
  transform: translateX(-50%);
  transition: top 0.4s $ease;
  z-index: 3;
}

.landing-hero_open .landing-hero__controls {
  top: calc(100% - #{$selector-height + $controls-offset});
}

.landing-hero__panel {
  align-items: center;
  background: #fff;
  border-radius: 2rem;
  bottom: calc(100% - #{$controls-offset});
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: flex-end;
  left: 50%;
  max-height: calc(var(--landing-hero-height) - #{$selector-height + $controls-offset});
  max-width: calc(100vw - 32px);
  overflow-y: auto;
  padding: 2rem 1.5rem 2.5rem;
  position: absolute;
  transform: translateX(-50%);
}

.landing-hero__panel_direction {
  width: 43rem;
}

.landing-hero__panel_audience {
  width: 55rem;
}

.landing-hero__tags {
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  justify-content: center;
  width: 100%;
}

.landing-hero__tag {
  background: $color-input-bg;
  border-radius: 0.25rem;
  color: $color-base;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.375rem;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  transition: background-color 0.15s $ease;
  white-space: nowrap;

  &:hover {
    background: $color-tag-hover;
  }

  &:active {
    background: $color-tag-pressed;
  }

  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 1px;
  }
}

.landing-hero__selector {
  align-items: center;
  background: $color-input-bg;
  border-radius: 0.75rem;
  color: $color-base;
  display: flex;
  font-size: 1.25rem;
  font-weight: 700;
  gap: 0.4375rem;
  line-height: 1.5rem;
  padding: 0.75rem 0.875rem;
  position: relative;
  white-space: nowrap;
}

.landing-hero__word {
  transition: color 0.2s $ease;
}

.landing-hero__selector_highlighted .landing-hero__word {
  color: $color-muted;
}

.landing-hero__dropdown {
  align-items: center;
  background: none;
  border: 0;
  border-radius: 0.25rem;
  color: $color-base;
  cursor: pointer;
  display: flex;
  font: inherit;
  gap: 0.125rem;
  padding: 0;
  transition: color 0.2s $ease;

  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }
}

.landing-hero__dropdown_hovered {
  color: $color-purple-hover;
}

.landing-hero__dropdown_active {
  color: $color-primary;
}

.landing-hero__dropdown_muted {
  color: $color-muted;
}

.landing-hero__roll {
  display: inline-grid;
  height: 1.5rem;
  overflow: hidden;
  position: relative;
  transition: width $roll-duration $ease;
}

.landing-hero__roll-text {
  grid-area: 1 / 1;
  justify-self: start;
}

.landing-hero__roll-measure {
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  visibility: hidden;
}

.landing-hero__chevron {
  display: flex;
  padding-top: 0.25rem;

  :deep(svg) {
    display: block;
    height: 1rem;
    transition: transform 0.2s $ease;
    width: 1rem;
  }
}

.landing-hero__dropdown_active .landing-hero__chevron :deep(svg) {
  transform: scaleY(-1);
}

.landing-hero-roll-enter-active,
.landing-hero-roll-leave-active {
  transition: transform $roll-duration $ease, opacity $roll-duration $ease;
}

.landing-hero-roll-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.landing-hero-roll-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.landing-hero-fade-enter-active,
.landing-hero-fade-leave-active {
  transition: opacity 0.3s $ease;
}

.landing-hero-fade-enter-from,
.landing-hero-fade-leave-to {
  opacity: 0;
}

.landing-hero-panel-enter-active,
.landing-hero-panel-leave-active {
  transition: opacity 0.25s $ease, transform 0.25s $ease;
}

.landing-hero-panel-enter-from,
.landing-hero-panel-leave-to {
  opacity: 0;
  transform: translate(-50%, 0.5rem);
}

@media (max-width: 768px) {
  .landing-hero {
    --landing-hero-height: #{$hero-height-mobile};

    border-radius: 2rem;
    width: calc(100% - 24px);
  }

  .landing-hero__caption {
    bottom: 3.5rem;
    font-size: 0.875rem;
    left: 1.25rem;
    line-height: 1.125rem;
    width: calc(100% - 2.5rem);
  }

  .landing-hero__bullets {
    bottom: 1.25rem;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }

  .landing-hero__selector {
    flex-wrap: wrap;
    font-size: 1rem;
    justify-content: center;
    line-height: 1.25rem;
    max-width: calc(100vw - 48px);
    padding: 0.625rem 0.75rem;
    row-gap: 0.25rem;
  }

  .landing-hero__roll {
    height: 1.25rem;
  }

  .landing-hero_open .landing-hero__controls {
    bottom: $controls-offset;
    top: auto;
  }

  .landing-hero__panel {
    gap: 1.25rem;
    padding: 1.25rem 1rem 2rem;
  }

  .landing-hero__panel_direction,
  .landing-hero__panel_audience {
    width: calc(100vw - 48px);
  }

  .landing-hero__tag {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .landing-hero__slide,
  .landing-hero__controls,
  .landing-hero__roll,
  .landing-hero-roll-enter-active,
  .landing-hero-roll-leave-active,
  .landing-hero-panel-enter-active,
  .landing-hero-panel-leave-active {
    transition: none;
  }
}
</style>

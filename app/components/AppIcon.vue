<script setup>
import alert16 from '~/assets/icons/system/alert-16.svg?raw'
import arrowRight16 from '~/assets/icons/system/arrow-right-16.svg?raw'
import arrowRight24 from '~/assets/icons/system/arrow-right-24.svg?raw'
import basket12 from '~/assets/icons/system/basket-12.svg?raw'
import basket16 from '~/assets/icons/system/basket-16.svg?raw'
import basket24 from '~/assets/icons/system/basket-24.svg?raw'
import binky16 from '~/assets/icons/system/binky-16.svg?raw'
import calendar16 from '~/assets/icons/system/calendar-16.svg?raw'
import check12 from '~/assets/icons/system/check-12.svg?raw'
import cross12 from '~/assets/icons/system/cross-12.svg?raw'
import headerAccountAuthorized16 from '~/assets/icons/header-account-authorized.svg?raw'
import headerSignOutAuthorized16 from '~/assets/icons/header-sign-out-authorized.svg?raw'
import hide16 from '~/assets/icons/system/hide-16.svg?raw'
import mir32x62 from '~/assets/icons/system/mir-32x62.svg?raw'
import profileCheck10 from '~/assets/icons/profile/check-10.svg?raw'
import profileEdit12 from '~/assets/icons/profile/edit-12.svg?raw'
import profilePlus10 from '~/assets/icons/profile/plus-10.svg?raw'
import profileTrash12 from '~/assets/icons/profile/trash-12.svg?raw'
import puzzle16 from '~/assets/icons/system/puzzle-16.svg?raw'
import refresh16 from '~/assets/icons/system/refresh-16.svg?raw'
import ruble12 from '~/assets/icons/system/ruble-12.svg?raw'
import ruble16 from '~/assets/icons/system/ruble-16.svg?raw'
import show16 from '~/assets/icons/system/show-16.svg?raw'
import termLow12 from '~/assets/icons/system/term-low-12.svg?raw'
import termMedium12 from '~/assets/icons/system/term-medium-12.svg?raw'
import termShort12 from '~/assets/icons/system/term-short-12.svg?raw'

const ICONS = {
  'account': {
    kind: 'path',
    viewBox: '0 0 16 16',
    paths: [
      {
        d: 'M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM12.8 10.8571C12.8 12.1826 10.651 13.6 8 13.6C5.34903 13.6 3.2 12.1826 3.2 10.8571C3.2 9.53166 5.34903 8.8 8 8.8C10.651 8.8 12.8 9.53166 12.8 10.8571ZM8 7.2C9.32548 7.2 10.4 6.12548 10.4 4.8C10.4 3.47452 9.32548 2.4 8 2.4C6.67452 2.4 5.6 3.47452 5.6 4.8C5.6 6.12548 6.67452 7.2 8 7.2Z',
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      }
    ]
  },
  'header-account-authorized': {
    kind: 'svg',
    svgBySize: {
      16: headerAccountAuthorized16
    }
  },
  'header-sign-out-authorized': {
    kind: 'svg',
    svgBySize: {
      16: headerSignOutAuthorized16
    }
  },
  'favorite': {
    kind: 'path',
    viewBox: '0 0 16 14.4',
    paths: [
      {
        d: 'M8 1.86954C9.2 0 10.6955 0 11.6 0C14.0301 0 16 1.6 16 4.8C16 10 8.4 14.4 8 14.4C7.6 14.4 0 10 0 4.8C0 1.86954 1.96995 0 4.4 0C5.30455 0 6.8 0 8 1.86954Z'
      }
    ]
  },
  'orders': {
    kind: 'path',
    viewBox: '0 0 14.9544 13.459',
    paths: [
      {
        d: 'M1.49544 0C0.669533 0 0 0.669532 0 1.49544V10.4681C0 12.1199 1.33907 13.459 2.99089 13.459H10.4681V1.49544C10.4681 0.669533 9.79857 0 8.97266 0H1.49544ZM8.22493 2.99089H2.24316V4.48633H8.22493V2.99089ZM2.24316 5.98177H6.72949V7.47721H2.24316V5.98177Z',
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      },
      {
        d: 'M13.459 4.48633C14.2849 4.48633 14.9544 5.15586 14.9544 5.98177V10.4681C14.9544 12.1199 13.6154 13.459 11.9635 13.459V5.23405C11.9635 4.82109 12.2983 4.48633 12.7113 4.48633H13.459Z'
      }
    ]
  },
  'tg': {
    kind: 'path',
    viewBox: '0 0 17.3621 14.3975',
    paths: [
      {
        d: 'M10.5241 2.19C8.96407 2.84 5.85407 4.18 1.19407 6.21C0.434071 6.51 0.0440712 6.81 0.00407119 7.09C-0.0558014 7.57896 0.551485 7.76919 1.37879 8.02835L1.38407 8.03C1.49407 8.07 1.61407 8.1 1.73407 8.14C2.55407 8.41 3.65407 8.72 4.22407 8.73C4.74407 8.74 5.32407 8.53 5.96407 8.09C10.3241 5.15 12.5741 3.66 12.7141 3.63L12.72 3.62882C12.8195 3.60887 12.9558 3.58156 13.0441 3.66C13.1341 3.74 13.1241 3.9 13.1141 3.94C13.0541 4.2 10.6641 6.42 9.42407 7.57C9.03407 7.93 8.76407 8.18 8.70407 8.24C8.57407 8.37 8.45407 8.49 8.32407 8.61C7.56407 9.34 6.99407 9.89 8.35407 10.79C9.00407 11.22 9.53407 11.58 10.0541 11.93C10.6241 12.32 11.1941 12.7 11.9241 13.19C12.1141 13.31 12.2941 13.44 12.4641 13.56L12.4731 13.5665C13.1296 14.0339 13.7274 14.4597 14.4541 14.39C14.8841 14.35 15.3241 13.95 15.5441 12.75C16.0741 9.92 17.1141 3.78 17.3541 1.25C17.3741 1.03 17.3541 0.74 17.3241 0.62C17.3041 0.5 17.2541 0.320001 17.0941 0.190001C16.9041 0.0300005 16.6041 0 16.4741 0C15.8741 0.01 14.9441 0.33 10.5041 2.18L10.5241 2.19Z'
      }
    ]
  },
  'vk': {
    kind: 'path',
    viewBox: '0 0 21.35 13.32',
    paths: [
      {
        d: 'M0 0C0.17 8.32 4.33 13.32 11.63 13.32H12.04V8.56C14.72 8.83 16.75 10.79 17.56 13.32H21.35C20.31 9.53 17.58 7.44 15.87 6.64C17.58 5.65 19.98 3.25 20.55 0H17.11C16.36 2.64 14.15 5.04 12.04 5.27V0H8.6V9.23C6.47 8.7 3.77 6.11 3.65 0H0Z'
      }
    ]
  },
  'basket': {
    kind: 'svg',
    svgBySize: {
      12: basket12,
      16: basket16,
      24: basket24
    }
  },
  'arrow-right': {
    kind: 'svg',
    svgBySize: {
      16: arrowRight16,
      24: arrowRight24
    }
  },
  'ruble': {
    kind: 'svg',
    svgBySize: {
      12: ruble12,
      16: ruble16
    }
  },
  'cart': {
    kind: 'path',
    viewBox: '0 0 15.1904 15.1886',
    paths: [
      {
        d: 'M4.17193 10.5183L1.58142 2.08329C1.58142 2.08329 0.989952 2.02713 0.659995 2.01835C-0.0139601 2.00256 -0.338652 0.235182 0.507302 0.187795C0.763545 0.173754 2.90476 0 2.90476 0L3.74194 3.39961L15.1904 4.01389L13.8021 10.2023L4.17193 10.5183ZM4.37377 11.5292C6.72735 11.5292 6.78526 15.1254 4.53699 15.1254C1.86925 15.1306 2.06407 11.5292 4.37377 11.5292ZM12.3173 11.5941C14.6709 11.5941 14.7306 15.1886 12.4805 15.1886C9.8128 15.1886 10.0094 11.5941 12.3173 11.5941Z',
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      }
    ]
  },
  'check': {
    kind: 'svg',
    svgBySize: {
      12: check12
    }
  },
  'cross': {
    kind: 'svg',
    svgBySize: {
      12: cross12
    }
  },
  'refresh': {
    kind: 'svg',
    svgBySize: {
      16: refresh16
    }
  },
  'show': {
    kind: 'svg',
    svgBySize: {
      16: show16
    }
  },
  'hide': {
    kind: 'svg',
    svgBySize: {
      16: hide16
    }
  },
  'close': {
    kind: 'path',
    viewBox: '0 0 16 16',
    paths: [
      {
        d: 'M3.46967 3.46967C3.76256 3.17678 4.23744 3.17678 4.53033 3.46967L8 6.93934L11.4697 3.46967C11.7626 3.17678 12.2374 3.17678 12.5303 3.46967C12.8232 3.76256 12.8232 4.23744 12.5303 4.53033L9.06066 8L12.5303 11.4697C12.8232 11.7626 12.8232 12.2374 12.5303 12.5303C12.2374 12.8232 11.7626 12.8232 11.4697 12.5303L8 9.06066L4.53033 12.5303C4.23744 12.8232 3.76256 12.8232 3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L6.93934 8L3.46967 4.53033C3.17678 4.23744 3.17678 3.76256 3.46967 3.46967Z',
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      }
    ]
  },
  'reset': {
    kind: 'path',
    viewBox: '0 0 16 16',
    paths: [
      {
        d: 'M10.3336 2.84883L10.7947 5.34531L9.29702 5.6215L8.53556 1.49857C8.49706 1.29009 8.54734 1.07502 8.67428 0.905166C8.80123 0.735312 8.99334 0.626081 9.20431 0.603791L13.3923 0.161318L13.5525 1.67468L11.5521 1.88602C11.6061 1.93395 11.6592 1.98271 11.7116 2.03228C13.0295 3.27946 13.8531 5.04683 13.8531 7.0052C13.8531 10.7873 10.7849 13.8533 6.99999 13.8533C3.21511 13.8533 0.146847 10.7873 0.146847 7.0052C0.146847 4.13004 1.91977 1.67049 4.4299 0.655167L5.00132 2.06578C3.04651 2.85649 1.66977 4.7711 1.66977 7.0052C1.66977 9.94684 4.05619 12.3315 6.99999 12.3315C9.9438 12.3315 12.3302 9.94684 12.3302 7.0052C12.3302 5.4819 11.6913 4.10896 10.6644 3.13721C10.5582 3.03665 10.4478 2.94043 10.3336 2.84883Z',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        transform: 'translate(1 1)'
      }
    ]
  },
  'arrow-right-line': {
    kind: 'path',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M5 12H19M13 6L19 12L13 18',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }
    ]
  },
  'alert-circle': {
    kind: 'path',
    viewBox: '0 0 16 16',
    paths: [
      {
        d: 'M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z'
      },
      {
        d: 'M7.25 3.75H8.75V8.25H7.25V3.75ZM8 12C8.41421 12 8.75 11.6642 8.75 11.25C8.75 10.8358 8.41421 10.5 8 10.5C7.58579 10.5 7.25 10.8358 7.25 11.25C7.25 11.6642 7.58579 12 8 12Z',
        fill: 'white'
      }
    ]
  },
  'password-show': {
    kind: 'path',
    viewBox: '0 0 16 12',
    paths: [
      {
        d: 'M8 12C12.4183 12 16 8.31371 16 6C16 3.68629 12.4183 0 8 0C3.58172 0 0 3.68629 0 6C0 8.31371 3.58172 12 8 12ZM8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        fillOpacity: '0.64'
      },
      {
        d: 'M10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6C6.5 6 8 6 8 6C8 6 8 4.5 8 4C9.10457 4 10 4.89543 10 6Z',
        fillOpacity: '0.64'
      }
    ]
  },
  'password-hide': {
    kind: 'path',
    viewBox: '0 0 16 14.4',
    paths: [
      {
        d: 'M1.36569 0.234315C1.6781 -0.0781048 2.18464 -0.0781048 2.49706 0.234315L15.5078 13.2451C15.8202 13.5575 15.8202 14.064 15.5078 14.3764C15.1954 14.6889 14.6889 14.6889 14.3764 14.3764L12.873 12.873C11.6128 13.7678 9.9822 14.4 8 14.4C2.78172 14.4 0 10.0183 0 8C0 6.74838 1.06978 4.58784 3.12704 3.12704L1.36569 1.36569C1.05327 1.05327 1.05327 0.546734 1.36569 0.234315ZM5.17157 5.17157C4.44772 5.89543 4 6.89543 4 8C4 10.2091 5.79086 12 8 12C9.10457 12 10.1046 11.5523 10.8284 10.8284L9.69706 9.69706C9.24697 10.1471 8.63652 10.4 8 10.4C7.36348 10.4 6.75303 10.1471 6.30294 9.69706C5.85286 9.24697 5.6 8.63652 5.6 8C5.6 7.36348 5.85286 6.75303 6.30294 6.30294L5.17157 5.17157ZM6.12973 1.79836L8.34614 4.01477C10.2791 4.18045 11.8195 5.72086 11.9852 7.65386L15.0075 10.6761C15.6643 9.68737 16 8.70109 16 8C16 5.98172 13.2183 1.6 8 1.6C7.33701 1.6 6.71335 1.67073 6.12973 1.79836Z',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        fillOpacity: '0.64'
      }
    ]
  },
  'password-eye': {
    kind: 'path',
    viewBox: '0 0 16 12',
    paths: [
      {
        d: 'M8 12C12.4183 12 16 8.31371 16 6C16 3.68629 12.4183 0 8 0C3.58172 0 0 3.68629 0 6C0 8.31371 3.58172 12 8 12ZM8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        fillOpacity: '0.64'
      },
      {
        d: 'M10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6C6.5 6 8 6 8 6C8 6 8 4.5 8 4C9.10457 4 10 4.89543 10 6Z',
        fillOpacity: '0.64'
      }
    ]
  },
  'alert': {
    kind: 'svg',
    svgBySize: {
      16: alert16
    }
  },
  'chevron': {
    kind: 'path',
    viewBox: '0 0 16 16',
    paths: [
      {
        d: 'M4.47 6.47a.75.75 0 0 1 1.06 0L8 8.94l2.47-2.47a.75.75 0 1 1 1.06 1.06L8.53 10.53a.75.75 0 0 1-1.06 0L4.47 7.53a.75.75 0 0 1 0-1.06Z'
      }
    ]
  },
  'puzzle': {
    kind: 'svg',
    svgBySize: {
      16: puzzle16
    }
  },
  'binky': {
    kind: 'svg',
    svgBySize: {
      16: binky16
    }
  },
  'calendar': {
    kind: 'svg',
    svgBySize: {
      16: calendar16
    }
  },
  'term-short': {
    kind: 'svg',
    svgBySize: {
      12: termShort12
    }
  },
  'term-medium': {
    kind: 'svg',
    svgBySize: {
      12: termMedium12
    }
  },
  'term-low': {
    kind: 'svg',
    svgBySize: {
      12: termLow12
    }
  },
  'mir': {
    kind: 'svg',
    svgBySize: {
      32: mir32x62
    }
  },
  'profile-edit': {
    kind: 'svg',
    svgBySize: {
      12: profileEdit12
    }
  },
  'profile-check': {
    kind: 'svg',
    svgBySize: {
      10: profileCheck10
    }
  },
  'profile-plus': {
    kind: 'svg',
    svgBySize: {
      10: profilePlus10
    }
  },
  'profile-trash': {
    kind: 'svg',
    svgBySize: {
      12: profileTrash12
    }
  },
  'delivery-dot': {
    kind: 'dot',
    color: '#c3c6c8'
  },
  'pickup-dot': {
    kind: 'dot',
    color: '#c3c6c8'
  },
  'order-dot': {
    kind: 'dot',
    color: '#c3c6c8'
  }
}

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: undefined
  },
  width: {
    type: [Number, String],
    default: undefined
  },
  height: {
    type: [Number, String],
    default: undefined
  },
  decorative: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  }
})

const icon = computed(() => ICONS[props.name] || ICONS.account)

const parsedNumericSize = computed(() => {
  if (typeof props.size === 'number') return props.size
  if (typeof props.size !== 'string') return undefined

  const normalized = props.size.trim()
  if (!normalized) return undefined

  const value = Number.parseFloat(normalized)
  return Number.isFinite(value) ? value : undefined
})

function normalizeCssSize(value) {
  if (value === undefined || value === null || value === '') return undefined
  if (typeof value === 'number') return `${value}px`

  const normalized = value.trim()
  if (!normalized) return undefined

  return /^\d+(\.\d+)?$/.test(normalized) ? `${normalized}px` : normalized
}

const sizeStyle = computed(() => {
  const width = normalizeCssSize(props.width)
  const height = normalizeCssSize(props.height)

  if (width || height) {
    return {
      width: width || height,
      height: height || width
    }
  }

  const raw = normalizeCssSize(props.size)
  if (!raw) return undefined

  return {
    width: raw,
    height: raw
  }
})

const ariaLabel = computed(() => {
  if (props.decorative) return undefined
  return props.title || props.name
})

function resolveVariantBySize(variants, requestedSize) {
  const entries = Object.entries(variants)
    .map(([size, value]) => ({ size: Number(size), value }))
    .filter(({ size }) => Number.isFinite(size))

  if (entries.length === 0) return ''
  if (requestedSize === undefined) {
    const default16 = entries.find(({ size }) => size === 16)
    return (default16 || entries[0]).value
  }

  const exact = entries.find(({ size }) => size === requestedSize)
  if (exact) return exact.value

  return entries
    .slice()
    .sort((a, b) => Math.abs(a.size - requestedSize) - Math.abs(b.size - requestedSize))[0]
    .value
}

const svgMarkup = computed(() => {
  if (icon.value.kind !== 'svg') return ''
  return resolveVariantBySize(icon.value.svgBySize, parsedNumericSize.value)
})
</script>

<template>
  <span
    class="app-icon"
    :style="sizeStyle"
    :aria-hidden="decorative"
    :role="decorative ? undefined : 'img'"
    :aria-label="ariaLabel"
  >
    <svg
      v-if="icon.kind === 'path'"
      :viewBox="icon.viewBox"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="app-icon__svg"
    >
      <path
        v-for="(path, index) in icon.paths"
        :key="index"
        :d="path.d"
        :fill-rule="path.fillRule"
        :clip-rule="path.clipRule"
        :fill="path.fill || (path.stroke ? 'none' : 'currentColor')"
        :fill-opacity="path.fillOpacity"
        :stroke="path.stroke"
        :stroke-width="path.strokeWidth"
        :stroke-linecap="path.strokeLinecap"
        :stroke-linejoin="path.strokeLinejoin"
        :transform="path.transform"
      />
    </svg>

    <span
      v-else-if="icon.kind === 'svg'"
      class="app-icon__raw"
      v-html="svgMarkup"
    />

    <span
      v-else
      class="app-icon__dot"
      :style="{ backgroundColor: icon.color }"
    />
  </span>
</template>

<style scoped>
.app-icon {
  display: inline-flex;
  flex-shrink: 0;
}

.app-icon__svg,
.app-icon__dot {
  display: block;
  height: 100%;
  width: 100%;
}

.app-icon__raw {
  display: block;
  height: 100%;
  width: 100%;
}

.app-icon__raw :deep(svg) {
  display: block;
  height: 100%;
  width: 100%;
}

.app-icon__dot {
  border-radius: 62.4375rem;
}
</style>

export const FABRICS = [
  { label: 'Атлас', genitive: 'атласа', value: 'atlas' },
  { label: 'Нейлон', genitive: 'нейлона', value: 'nylon' },
  { label: 'Флажная сетка', genitive: 'флажной сетки', value: 'mesh' },
  { label: 'Габардин', genitive: 'габардина', value: 'gabardine' },
  { label: 'Купольный атлас', genitive: 'купольного атласа', value: 'dome-atlas' }
]

export const MOUNTINGS = [
  { label: 'Люверсы', value: 'grommets' },
  { label: 'Под древко', value: 'pocket' }
]

export const SIZES = [
  { label: '90\u00d7135 см', value: '90x135' },
  { label: '60\u00d790 см', value: '60x90' }
]

export const FABRIC_IMAGE_MAP = {
  atlas: 'satin',
  nylon: 'polyester',
  mesh: 'mesh',
  gabardine: 'dense_polyester',
  'dome-atlas': 'satin'
}

export const MOUNTING_IMAGE_MAP = {
  grommets: 'grommets',
  pocket: 'sleeve'
}

export const MAX_UPLOAD_SIZE = 50 * 1024 * 1024 // 50 MB

export const ALLOWED_EXTENSIONS = ['.tiff', '.tif', '.ai', '.cdr', '.jpg', '.jpeg', '.png']

export const RASTER_EXTENSIONS = ['.jpg', '.jpeg', '.png']

export function getFabricLabel(value) {
  return FABRICS.find(f => f.value === value)?.label ?? ''
}

export function getFabricGenitive(value) {
  return FABRICS.find(f => f.value === value)?.genitive ?? ''
}

export function getSizeLabel(value) {
  return SIZES.find(s => s.value === value)?.label ?? ''
}

export function getMountingLabel(value) {
  return MOUNTINGS.find(m => m.value === value)?.label ?? ''
}

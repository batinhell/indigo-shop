// Пресеты материалов полотна по ткани (данные, без three). Применяются в 3D
// (FlagModel) к MeshPhysicalMaterial. Значения подобраны на глаз, уточняем по месту.
// Ткань приходит в словаре приложения (atlas/nylon/mesh/gabardine/dome-atlas).

export interface FabricMaterial {
  color: string
  roughness: number
  metalness: number
  sheen: number // блеск ткани (physical sheen)
  sheenColor: string
  opacity: number // < 1 — полупрозрачная (флажная сетка — просвет)
}

const DEFAULT: FabricMaterial = {
  color: '#eef0f2', roughness: 0.7, metalness: 0, sheen: 0, sheenColor: '#ffffff', opacity: 1
}

export const FABRIC_MATERIALS: Record<string, FabricMaterial> = {
  // Атлас — гладкий, лёгкий блеск
  'atlas': { color: '#f4f4f6', roughness: 0.34, metalness: 0, sheen: 0.6, sheenColor: '#ffffff', opacity: 1 },
  // Купольный атлас — ещё более гладкий/блестящий
  'dome-atlas': { color: '#f4f4f6', roughness: 0.28, metalness: 0, sheen: 0.75, sheenColor: '#ffffff', opacity: 1 },
  // Нейлон — полуматовый
  'nylon': { color: '#eef0f2', roughness: 0.6, metalness: 0, sheen: 0.15, sheenColor: '#ffffff', opacity: 1 },
  // Габардин — матовый, плотный
  'gabardine': { color: '#e7e9ec', roughness: 0.95, metalness: 0, sheen: 0, sheenColor: '#ffffff', opacity: 1 },
  // Флажная сетка — просвечивает
  'mesh': { color: '#e9ebee', roughness: 0.8, metalness: 0, sheen: 0, sheenColor: '#ffffff', opacity: 0.62 }
}

export function fabricMaterial(fabric: string): FabricMaterial {
  return FABRIC_MATERIALS[fabric] ?? DEFAULT
}

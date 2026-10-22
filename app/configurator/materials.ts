// Пресеты тканей (данные, без three). Применяются в 3D (FlagModel):
// вид материала (MeshPhysicalMaterial) + поведение полотна на ветру.
// Ткань приходит в словаре приложения (atlas/nylon/mesh/gabardine/dome-atlas).

export interface FabricMaterial {
  color: string
  roughness: number
  metalness: number
  sheen: number // блеск ткани (physical sheen)
  sheenColor: string
  opacity: number // < 1 — полупрозрачная (флажная сетка — просвет)
  stiffness: number // 0..1: выше = меньше колышется (габардин жёсткий)
  drape: number // 0..1: провисание к свободному краю (мягкие ткани сильнее)
}

const DEFAULT: FabricMaterial = {
  color: '#eef0f2', roughness: 0.7, metalness: 0, sheen: 0, sheenColor: '#ffffff', opacity: 1, stiffness: 0.5, drape: 0.5
}

export const FABRIC_MATERIALS: Record<string, FabricMaterial> = {
  // Атлас — гладкий, лёгкий блеск, мягко драпируется
  'atlas': { color: '#f4f4f6', roughness: 0.34, metalness: 0, sheen: 0.6, sheenColor: '#ffffff', opacity: 1, stiffness: 0.35, drape: 0.85 },
  // Купольный атлас — ещё более гладкий/блестящий
  'dome-atlas': { color: '#f4f4f6', roughness: 0.28, metalness: 0, sheen: 0.75, sheenColor: '#ffffff', opacity: 1, stiffness: 0.4, drape: 0.75 },
  // Нейлон — полуматовый, средний
  'nylon': { color: '#eef0f2', roughness: 0.6, metalness: 0, sheen: 0.15, sheenColor: '#ffffff', opacity: 1, stiffness: 0.5, drape: 0.6 },
  // Габардин — матовый, плотный, жёсткий
  'gabardine': { color: '#e7e9ec', roughness: 0.95, metalness: 0, sheen: 0, sheenColor: '#ffffff', opacity: 1, stiffness: 0.8, drape: 0.3 },
  // Флажная сетка — лёгкая, просвечивает
  'mesh': { color: '#e9ebee', roughness: 0.8, metalness: 0, sheen: 0, sheenColor: '#ffffff', opacity: 0.6, stiffness: 0.4, drape: 0.7 }
}

export function fabricMaterial(fabric: string): FabricMaterial {
  return FABRIC_MATERIALS[fabric] ?? DEFAULT
}

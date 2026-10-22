// Пресеты тканей (данные, без three). Применяются в 3D (FlagModel):
// вид материала (MeshPhysicalMaterial) + поведение полотна на ветру.
// Отличия между тканями сделаны выраженными (глянец/матовость/просвет).

export interface FabricMaterial {
  color: string
  roughness: number
  metalness: number
  sheen: number // блеск ткани (physical sheen)
  sheenColor: string
  clearcoat: number // лаковый глянец (атлас)
  opacity: number
  net: boolean // флажная сетка — сквозной сетчатый паттерн (alphaMap)
  stiffness: number // 0..1: выше = меньше колышется (габардин жёсткий)
  drape: number // 0..1: провисание к свободному краю
}

const DEFAULT: FabricMaterial = {
  color: '#eef0f2', roughness: 0.7, metalness: 0, sheen: 0, sheenColor: '#ffffff', clearcoat: 0, opacity: 1, net: false, stiffness: 0.5, drape: 0.5
}

export const FABRIC_MATERIALS: Record<string, FabricMaterial> = {
  // Атлас — гладкий, выраженный глянец, мягко драпируется
  'atlas': { color: '#f6f4f2', roughness: 0.14, metalness: 0, sheen: 1, sheenColor: '#ffffff', clearcoat: 0.5, opacity: 1, net: false, stiffness: 0.35, drape: 0.9 },
  // Купольный атлас — почти зеркальный глянец
  'dome-atlas': { color: '#f7f6f8', roughness: 0.07, metalness: 0.05, sheen: 1, sheenColor: '#ffffff', clearcoat: 0.9, opacity: 1, net: false, stiffness: 0.4, drape: 0.8 },
  // Нейлон — полуматовый
  'nylon': { color: '#eceef1', roughness: 0.5, metalness: 0, sheen: 0.3, sheenColor: '#ffffff', clearcoat: 0.1, opacity: 1, net: false, stiffness: 0.5, drape: 0.6 },
  // Габардин — совсем матовый, плотный, жёсткий
  'gabardine': { color: '#dfe1e4', roughness: 1, metalness: 0, sheen: 0, sheenColor: '#ffffff', clearcoat: 0, opacity: 1, net: false, stiffness: 0.8, drape: 0.3 },
  // Флажная сетка — сквозная (сетчатый паттерн), лёгкая
  'mesh': { color: '#e9ebee', roughness: 0.75, metalness: 0, sheen: 0, sheenColor: '#ffffff', clearcoat: 0, opacity: 1, net: true, stiffness: 0.4, drape: 0.7 }
}

export function fabricMaterial(fabric: string): FabricMaterial {
  return FABRIC_MATERIALS[fabric] ?? DEFAULT
}

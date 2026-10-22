// Пресеты тканей (данные, без three). Применяются в 3D (FlagModel):
// реальные PBR-карты Poly Haven (нормали + шероховатость, CC0) + параметры вида.
// Базовый цвет держим светлым (флаг-заготовка), от текстуры берём плетение/рельеф.

export interface FabricMaterial {
  texture: string | null // базовое имя карт в /textures/fabrics (null — без текстуры)
  color: string
  roughness: number
  metalness: number
  sheen: number
  sheenColor: string
  clearcoat: number
  normalScale: number
  tile: number // размер повтора текстуры в метрах
  net: boolean // флажная сетка — сквозной сетчатый паттерн
  stiffness: number // 0..1: выше = меньше колышется
  drape: number // 0..1: провисание к свободному краю
}

const DEFAULT: FabricMaterial = {
  texture: null, color: '#eef0f2', roughness: 0.7, metalness: 0, sheen: 0, sheenColor: '#ffffff', clearcoat: 0, normalScale: 0.5, tile: 0.12, net: false, stiffness: 0.5, drape: 0.5
}

export const FABRIC_MATERIALS: Record<string, FabricMaterial> = {
  // Атлас — сатиновое плетение, выраженный глянец
  'atlas': { texture: 'crepe_satin', color: '#f6f5f3', roughness: 0.3, metalness: 0, sheen: 1, sheenColor: '#ffffff', clearcoat: 0.45, normalScale: 0.5, tile: 0.1, net: false, stiffness: 0.35, drape: 0.9 },
  // Купольный атлас — тот же сатин, почти зеркальный
  'dome-atlas': { texture: 'crepe_satin', color: '#f7f7f8', roughness: 0.18, metalness: 0.04, sheen: 1, sheenColor: '#ffffff', clearcoat: 0.85, normalScale: 0.4, tile: 0.1, net: false, stiffness: 0.4, drape: 0.8 },
  // Нейлон — полиэстер, гладкий, полуматовый
  'nylon': { texture: 'bi_stretch', color: '#eceef1', roughness: 0.6, metalness: 0, sheen: 0.3, sheenColor: '#ffffff', clearcoat: 0.08, normalScale: 0.6, tile: 0.1, net: false, stiffness: 0.5, drape: 0.6 },
  // Габардин — плотное матовое плетение (твил)
  'gabardine': { texture: 'denim_fabric_05', color: '#e3e5e8', roughness: 1, metalness: 0, sheen: 0, sheenColor: '#ffffff', clearcoat: 0, normalScale: 0.9, tile: 0.14, net: false, stiffness: 0.8, drape: 0.3 },
  // Флажная сетка — сквозной сетчатый паттерн, лёгкая
  'mesh': { texture: null, color: '#e9ebee', roughness: 0.8, metalness: 0, sheen: 0, sheenColor: '#ffffff', clearcoat: 0, normalScale: 0.5, tile: 0.1, net: true, stiffness: 0.4, drape: 0.7 }
}

export function fabricMaterial(fabric: string): FabricMaterial {
  return FABRIC_MATERIALS[fabric] ?? DEFAULT
}

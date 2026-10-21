import type { ProductModule } from '../core/types'
import { flag } from './flag'

// Реестр продуктов. Новый продукт = новый файл с schema + build + запись здесь.
// any осознанно: реестр стирает тип параметров продукта (у каждого свой P).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const products: Record<string, ProductModule<any>> = {
  [flag.id]: flag
}

export { flag }

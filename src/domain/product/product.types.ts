import type { ProductFormData } from './product.schema'

// Entidad persistida (shape del store)
export interface Product extends ProductFormData {
  id: string
  createdAt: string // ISO timestamp
}

export type { ProductFormData } from './product.schema'

import { create } from 'zustand'
import type { Product, ProductFormData } from '@/domain/product/product.types'

interface ProductState {
  products: Product[]
  addProduct: (data: ProductFormData) => Product
  removeProduct: (id: string) => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  addProduct: (data) => {
    const product: Product = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    set((state) => ({ products: [...state.products, product] }))
    return product
  },
  removeProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
}))

import { z } from 'zod'
import { TAX_CATEGORY_CODES, UNIT_OF_MEASURE_CODES } from './product.constants'

// Requerido: empty input llega como NaN desde el form boundary
const unitPrice = z
  .number()
  .refine((v) => !Number.isNaN(v), { message: 'El precio unitario es requerido' })
  .refine((v) => v > 0, { message: 'El precio unitario debe ser mayor a 0' })

// Opcional: 0-100%
const discount = z
  .number()
  .min(0, { message: 'El descuento no puede ser negativo' })
  .max(100, { message: 'El descuento no puede superar 100%' })
  .optional()

// Opcional: 4-8 dígitos UNSPSC
const unspscCode = z
  .string()
  .optional()
  .refine((v) => !v || /^\d{4,8}$/.test(v), {
    message: 'El código UNSPSC debe tener entre 4 y 8 dígitos',
  })

export const productSchema = z.object({
  code: z.string().trim().min(1, { message: 'El código del producto es requerido' }),
  description: z.string().trim().min(1, { message: 'La descripción es requerida' }),
  unitPrice,
  unitOfMeasure: z.enum(UNIT_OF_MEASURE_CODES, {
    message: 'Seleccione una unidad de medida',
  }),
  taxCategory: z.enum(TAX_CATEGORY_CODES, {
    message: 'Seleccione una categoría tributaria',
  }),
  standardCode: z.string().trim().optional(),
  brand: z.string().trim().optional(),
  model: z.string().trim().optional(),
  unspscCode,
  discount,
})

export type ProductFormData = z.infer<typeof productSchema>

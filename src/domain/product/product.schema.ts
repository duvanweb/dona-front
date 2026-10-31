import { z } from 'zod'
// Los mensajes son claves i18n; se traducen en FormMessage
import { TAX_CATEGORY_CODES, UNIT_OF_MEASURE_CODES } from './product.constants'

// Requerido: empty input llega como NaN desde el form boundary
const unitPrice = z
  .number()
  .refine((v) => !Number.isNaN(v), { message: 'validation.unitPriceRequired' })
  .refine((v) => v > 0, { message: 'validation.unitPricePositive' })

// Opcional: 0-100%
const discount = z
  .number()
  .min(0, { message: 'validation.discountMin' })
  .max(100, { message: 'validation.discountMax' })
  .optional()

// Opcional: 4-8 dígitos UNSPSC
const unspscCode = z
  .string()
  .optional()
  .refine((v) => !v || /^\d{4,8}$/.test(v), {
    message: 'validation.unspscFormat',
  })

export const productSchema = z.object({
  code: z.string().trim().min(1, { message: 'validation.productCodeRequired' }),
  description: z.string().trim().min(1, { message: 'validation.descriptionRequired' }),
  unitPrice,
  unitOfMeasure: z.enum(UNIT_OF_MEASURE_CODES, {
    message: 'validation.unitOfMeasureRequired',
  }),
  taxCategory: z.enum(TAX_CATEGORY_CODES, {
    message: 'validation.taxCategoryRequired',
  }),
  standardCode: z.string().trim().optional(),
  brand: z.string().trim().optional(),
  model: z.string().trim().optional(),
  unspscCode,
  discount,
})

export type ProductFormData = z.infer<typeof productSchema>

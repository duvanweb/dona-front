import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  TAX_CATEGORY_CODES,
  UNIT_OF_MEASURE_CODES,
} from '@/domain/product/product.constants'
import { productSchema, type ProductFormData } from '@/domain/product/product.schema'
import { useProductStore } from '@/stores/use-product-store'

export function ProductForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const addProduct = useProductStore((s) => s.addProduct)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      code: '',
      description: '',
      unitPrice: Number.NaN,
      unitOfMeasure: undefined,
      taxCategory: undefined,
      standardCode: '',
      brand: '',
      model: '',
      unspscCode: '',
      discount: undefined,
    },
    mode: 'onBlur',
  })

  const onSubmit = form.handleSubmit((data) => {
    addProduct(data)
    toast.success(t('productForm.created'), {
      description: t('productForm.createdDescription', { code: data.code }),
    })
    navigate('/products')
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Obligatorios: código + descripción */}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.code')} <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder={t('productForm.codePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.description')} <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder={t('productForm.descriptionPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Obligatorios: precio + unidad + IVA */}
        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="unitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.unitPrice')} <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={Number.isNaN(field.value) ? '' : field.value}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === '' ? Number.NaN : Number(e.target.value),
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unitOfMeasure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.unitOfMeasure')} <span className="text-destructive">*</span></FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('common.select')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {UNIT_OF_MEASURE_CODES.map((code) => (
                      <SelectItem key={code} value={code}>
                        {t(`dian.units.${code}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.taxCategory')} <span className="text-destructive">*</span></FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('common.select')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TAX_CATEGORY_CODES.map((code) => (
                      <SelectItem key={code} value={code}>
                        {t(`dian.tax.${code}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Opcionales */}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="standardCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.standardCode')} <OptionalMark /></FormLabel>
                <FormControl>
                  <Input placeholder={t('productForm.optionalPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unspscCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.unspscCode')} <OptionalMark /></FormLabel>
                <FormControl>
                  <Input placeholder={t('productForm.unspscPlaceholder')} inputMode="numeric" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.brand')} <OptionalMark /></FormLabel>
                <FormControl>
                  <Input placeholder={t('productForm.optionalPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.model')} <OptionalMark /></FormLabel>
                <FormControl>
                  <Input placeholder={t('productForm.optionalPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.discount')} <OptionalMark /></FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder={t('productForm.optionalPlaceholder')}
                    value={field.value === undefined ? '' : field.value}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === '' ? undefined : Number(e.target.value),
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/products')}
          >
            {t('common.cancel')}
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="size-4 animate-spin" />
            )}
            {t('productForm.submit')}
          </Button>
        </div>
      </form>
    </Form>
  )
}

function OptionalMark() {
  const { t } = useTranslation()
  return (
    <span className="ml-1 text-xs font-normal text-muted-foreground">{t('common.optional')}</span>
  )
}

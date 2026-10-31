import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

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
  TAX_CATEGORIES,
  UNIT_OF_MEASURES,
} from '@/domain/product/product.constants'
import { productSchema, type ProductFormData } from '@/domain/product/product.schema'
import { useProductStore } from '@/stores/use-product-store'

export function ProductForm() {
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
    toast.success('Producto creado', {
      description: `Código ${data.code} guardado correctamente.`,
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
                <FormLabel>Código <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Ej. PROD-001" {...field} />
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
                <FormLabel>Descripción <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Descripción del producto" {...field} />
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
                <FormLabel>Precio unitario <span className="text-destructive">*</span></FormLabel>
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
                <FormLabel>Unidad de medida <span className="text-destructive">*</span></FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {UNIT_OF_MEASURES.map((u) => (
                      <SelectItem key={u.code} value={u.code}>
                        {u.label}
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
                <FormLabel>Categoría IVA <span className="text-destructive">*</span></FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TAX_CATEGORIES.map((t) => (
                      <SelectItem key={t.code} value={t.code}>
                        {t.label}
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
                <FormLabel>Código estándar (GTIN/EAN) <OptionalMark /></FormLabel>
                <FormControl>
                  <Input placeholder="Opcional" {...field} />
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
                <FormLabel>Código UNSPSC <OptionalMark /></FormLabel>
                <FormControl>
                  <Input placeholder="4 a 8 dígitos" inputMode="numeric" {...field} />
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
                <FormLabel>Marca <OptionalMark /></FormLabel>
                <FormControl>
                  <Input placeholder="Opcional" {...field} />
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
                <FormLabel>Modelo <OptionalMark /></FormLabel>
                <FormControl>
                  <Input placeholder="Opcional" {...field} />
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
                <FormLabel>Descuento (%) <OptionalMark /></FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="Opcional"
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
            Cancelar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Guardar producto
          </Button>
        </div>
      </form>
    </Form>
  )
}

function OptionalMark() {
  return (
    <span className="ml-1 text-xs font-normal text-muted-foreground">(opcional)</span>
  )
}

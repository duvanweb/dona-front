import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ProductForm } from '@/presentation/components/product-form/product-form'

export function ProductCreatePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Nuevo producto</h1>
        <p className="text-sm text-muted-foreground">
          Registre el producto con los campos requeridos por la facturación
          electrónica DIAN.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Datos del producto</CardTitle>
          <CardDescription>
            Los campos marcados con * son obligatorios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  )
}

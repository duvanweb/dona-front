import { Link } from 'react-router-dom'
import { Package, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  taxCategoryLabel,
  unitOfMeasureLabel,
} from '@/domain/product/product.constants'
import { useProductStore } from '@/stores/use-product-store'

function taxBadgeVariant(code: string) {
  switch (code) {
    case '01':
      return 'default' as const
    case '02':
      return 'secondary' as const
    case '03':
      return 'outline' as const
    default:
      return 'secondary' as const
  }
}

export function ProductsPage() {
  const products = useProductStore((s) => s.products)
  const removeProduct = useProductStore((s) => s.removeProduct)

  const handleDelete = (id: string, code: string) => {
    removeProduct(id)
    toast.success('Producto eliminado', { description: `Código ${code}.` })
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Productos</h1>
          <p className="text-sm text-muted-foreground">
            {products.length} producto(s) registrado(s).
          </p>
        </div>
        <Button asChild>
          <Link to="/products/new">
            <Plus className="size-4" />
            Nuevo producto
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
          <CardDescription>Productos disponibles para facturación DIAN.</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <Package className="size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No hay productos registrados.
              </p>
              <Button asChild variant="outline">
                <Link to="/products/new">Crear el primer producto</Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead>Unidad</TableHead>
                  <TableHead>IVA</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.code}</TableCell>
                    <TableCell className="max-w-xs truncate">{p.description}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {p.unitPrice.toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                      })}
                    </TableCell>
                    <TableCell>{unitOfMeasureLabel(p.unitOfMeasure)}</TableCell>
                    <TableCell>
                      <Badge variant={taxBadgeVariant(p.taxCategory)}>
                        {taxCategoryLabel(p.taxCategory)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Eliminar ${p.code}`}
                        onClick={() => handleDelete(p.id, p.code)}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

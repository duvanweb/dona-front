import { Link } from 'react-router-dom'
import { Package, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

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
import { intlLocale } from '@/i18n'
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
  const { t, i18n } = useTranslation()
  const products = useProductStore((s) => s.products)
  const removeProduct = useProductStore((s) => s.removeProduct)

  const handleDelete = (id: string, code: string) => {
    removeProduct(id)
    toast.success(t('products.deleted'), {
      description: t('products.deletedDescription', { code }),
    })
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{t('products.title')}</h1>
          <p className="text-sm text-muted-foreground">
            {t('products.count', { count: products.length })}
          </p>
        </div>
        <Button asChild>
          <Link to="/products/new">
            <Plus className="size-4" />
            {t('products.new')}
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('products.listTitle')}</CardTitle>
          <CardDescription>{t('products.listDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <Package className="size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {t('products.empty')}
              </p>
              <Button asChild variant="outline">
                <Link to="/products/new">{t('products.createFirst')}</Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('products.columns.code')}</TableHead>
                  <TableHead>{t('products.columns.description')}</TableHead>
                  <TableHead className="text-right">{t('products.columns.price')}</TableHead>
                  <TableHead>{t('products.columns.unit')}</TableHead>
                  <TableHead>{t('products.columns.tax')}</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.code}</TableCell>
                    <TableCell className="max-w-xs truncate">{p.description}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {p.unitPrice.toLocaleString(intlLocale(i18n.language), {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                      })}
                    </TableCell>
                    <TableCell>{t(`dian.units.${p.unitOfMeasure}`)}</TableCell>
                    <TableCell>
                      <Badge variant={taxBadgeVariant(p.taxCategory)}>
                        {t(`dian.tax.${p.taxCategory}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={t('products.deleteAria', { code: p.code })}
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

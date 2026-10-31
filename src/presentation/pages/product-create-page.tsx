import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { ProductForm } from '@/presentation/components/product-form/product-form'

export function ProductCreatePage() {
  const { t } = useTranslation()
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t('productCreate.title')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('productCreate.subtitle')}
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('productCreate.cardTitle')}</CardTitle>
          <CardDescription>
            {t('productCreate.cardDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  )
}

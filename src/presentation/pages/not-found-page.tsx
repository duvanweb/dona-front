import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-6xl font-bold tabular-nums">404</p>
      <p className="text-muted-foreground">{t('notFound.message')}</p>
      <Link to="/" className="text-primary underline-offset-4 hover:underline">
        {t('notFound.back')}
      </Link>
    </div>
  )
}

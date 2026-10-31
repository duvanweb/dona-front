import { Settings as SettingsIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function SettingsPage() {
  const { t } = useTranslation()
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t('settings.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('settings.subtitle')}</p>
      </div>
      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex items-center gap-3">
          <SettingsIcon className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {t('settings.placeholder')}
          </p>
        </div>
      </div>
    </div>
  )
}

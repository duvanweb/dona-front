import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { RegisterForm } from '@/presentation/components/register-form/register-form'
import { LanguageSwitcher } from '@/presentation/components/language-switcher/language-switcher'

export function RegisterPage() {
  const { t } = useTranslation()

  return (
    <div className="relative grid min-h-screen place-items-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{t('register.title')}</CardTitle>
          <CardDescription>
            {t('register.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}

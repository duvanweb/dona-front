import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthCard } from '@/presentation/components/auth-card'
import { RegisterForm } from '@/presentation/components/register-form/register-form'

export function RegisterPage() {
  const { t } = useTranslation()

  return (
    <AuthCard
      title={t('register.title')}
      description={t('register.subtitle')}
      footer={
        <span>
          {t('register.haveAccount')}{' '}
          <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            {t('login.submit')}
          </Link>
        </span>
      }
    >
      <RegisterForm />
    </AuthCard>
  )
}

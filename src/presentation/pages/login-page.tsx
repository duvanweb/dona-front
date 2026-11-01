import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthCard } from '@/presentation/components/auth-card'
import { LoginForm } from '@/presentation/components/login-form/login-form'

export function LoginPage() {
  const { t } = useTranslation()

  return (
    <AuthCard
      title={t('login.title')}
      description={t('login.subtitle')}
      footer={
        <span>
          {t('login.noAccount')}{' '}
          <Link to="/register" className="font-medium text-primary underline-offset-4 hover:underline">
            {t('register.submit')}
          </Link>
        </span>
      }
    >
      <LoginForm />
    </AuthCard>
  )
}

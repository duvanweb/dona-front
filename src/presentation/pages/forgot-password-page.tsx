import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthCard } from '@/presentation/components/auth-card'
import { ForgotPasswordForm } from '@/presentation/components/forgot-password-form/forgot-password-form'

export function ForgotPasswordPage() {
  const { t } = useTranslation()

  return (
    <AuthCard
      title={t('forgotPassword.title')}
      description={t('forgotPassword.subtitle')}
      footer={
        <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
          {t('forgotPassword.backToLogin')}
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  )
}

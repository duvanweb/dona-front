import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { registerSchema, type RegisterFormData } from '@/domain/auth/register.schema'
import { DUPLICATE_EMAIL_MESSAGE } from '@/stores/use-account-store'
import { useRegister } from '@/presentation/hooks/use-auth'
import { PasswordInput } from '@/presentation/components/password-input/password-input'

export function RegisterForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useRegister()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  })

  const onSubmit = form.handleSubmit(async ({ email, password, companyName }) => {
    try {
      const session = await mutateAsync({ email, password, companyName })
      // El código de tienda es necesario para iniciar sesión: se muestra hasta cerrarlo
      void navigator.clipboard?.writeText(session.storeCode).catch(() => {})
      toast.success(t('register.success'), {
        description: t('register.storeCodeNotice', {
          company: session.companyName,
          storeCode: session.storeCode,
        }),
        duration: Infinity,
        closeButton: true,
      })
      navigate('/', { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : t('register.unexpectedError')
      if (message === DUPLICATE_EMAIL_MESSAGE) {
        form.setError('email', { message })
      } else {
        toast.error(t('register.failure'), { description: message })
      }
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('register.companyName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('register.companyNamePlaceholder')} autoComplete="organization" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('register.email')}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t('register.emailPlaceholder')}
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('register.password')}</FormLabel>
              <FormControl>
                <PasswordInput autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('register.confirmPassword')}</FormLabel>
              <FormControl>
                <PasswordInput autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-xs text-muted-foreground">
          {t('register.passwordHint')}
        </p>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {t('register.submit')}
        </Button>
      </form>
    </Form>
  )
}

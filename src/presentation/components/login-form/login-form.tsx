import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate, type Location } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import type { ParseKeys } from 'i18next'
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
import { loginSchema, type LoginFormData } from '@/domain/auth/login.schema'
import { INVALID_CREDENTIALS, useAccountStore } from '@/stores/use-account-store'
import { useLogin } from '@/presentation/hooks/use-auth'
import { PasswordInput } from '@/presentation/components/password-input/password-input'

export function LoginForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const lastStoreCode = useAccountStore((s) => s.lastStoreCode)
  const { mutateAsync, isPending } = useLogin()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { storeCode: lastStoreCode ?? '', email: '', password: '' },
    mode: 'onBlur',
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await mutateAsync(data)
      const from = (location.state as { from?: Location } | null)?.from?.pathname
      navigate(from ?? '/', { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      form.setError('root', {
        message: message === INVALID_CREDENTIALS ? message : 'register.unexpectedError',
      })
    }
  })

  const rootError = form.formState.errors.root?.message

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <FormField
          control={form.control}
          name="storeCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.storeCode')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('auth.storeCodePlaceholder')}
                  autoComplete="organization"
                  autoCapitalize="characters"
                  className="uppercase"
                  {...field}
                />
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
              <div className="flex items-center justify-between">
                <FormLabel>{t('register.password')}</FormLabel>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary underline-offset-4 hover:underline"
                >
                  {t('login.forgotPassword')}
                </Link>
              </div>
              <FormControl>
                <PasswordInput autoComplete="current-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {rootError && (
          <p role="alert" className="text-sm text-destructive">
            {t(rootError as ParseKeys)}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {t('login.submit')}
        </Button>
      </form>
    </Form>
  )
}

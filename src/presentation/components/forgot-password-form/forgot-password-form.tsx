import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
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
import {
  requestResetSchema,
  resetPasswordSchema,
  type RequestResetFormData,
  type ResetPasswordFormData,
} from '@/domain/auth/forgot-password.schema'
import { INVALID_RESET_CODE, useAccountStore } from '@/stores/use-account-store'
import { useRequestPasswordReset, useResetPassword } from '@/presentation/hooks/use-auth'
import { PasswordInput } from '@/presentation/components/password-input/password-input'

export function ForgotPasswordForm() {
  const [target, setTarget] = useState<RequestResetFormData | null>(null)

  return target ? (
    <ResetStep target={target} onBack={() => setTarget(null)} />
  ) : (
    <RequestStep onSent={setTarget} />
  )
}

function RequestStep({ onSent }: { onSent: (target: RequestResetFormData) => void }) {
  const { t } = useTranslation()
  const lastStoreCode = useAccountStore((s) => s.lastStoreCode)
  const { mutateAsync, isPending } = useRequestPasswordReset()

  const form = useForm<RequestResetFormData>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: { storeCode: lastStoreCode ?? '', email: '' },
    mode: 'onBlur',
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const code = await mutateAsync(data)
    // Mensaje neutro: no revela si la cuenta existe
    toast.success(t('forgotPassword.sent'))
    if (code) {
      toast.info(t('forgotPassword.demoCode', { code }), { duration: 30_000 })
    }
    onSent(data)
  })

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
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {t('forgotPassword.sendCode')}
        </Button>
      </form>
    </Form>
  )
}

function ResetStep({
  target,
  onBack,
}: {
  target: RequestResetFormData
  onBack: () => void
}) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useResetPassword()

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: '', password: '', confirmPassword: '' },
    mode: 'onBlur',
  })

  const onSubmit = form.handleSubmit(async ({ code, password }) => {
    try {
      await mutateAsync({ ...target, code, password })
      toast.success(t('forgotPassword.success'))
      navigate('/login', { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      if (message === INVALID_RESET_CODE) {
        form.setError('code', { message })
      } else {
        toast.error(t('register.unexpectedError'))
      }
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <p className="text-sm text-muted-foreground">
          {t('forgotPassword.codeSentTo', { email: target.email, storeCode: target.storeCode })}
        </p>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('forgotPassword.code')}</FormLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="000000"
                  className="tracking-[0.5em] tabular-nums"
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
              <FormLabel>{t('forgotPassword.newPassword')}</FormLabel>
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
        <p className="text-xs text-muted-foreground">{t('register.passwordHint')}</p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="size-4" />
            {t('forgotPassword.back')}
          </Button>
          <Button type="submit" className="flex-1" disabled={isPending}>
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {t('forgotPassword.reset')}
          </Button>
        </div>
      </form>
    </Form>
  )
}

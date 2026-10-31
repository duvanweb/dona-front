import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

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
import { useRegister } from '@/presentation/hooks/use-register'

export function RegisterForm() {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useRegister()
  const [showPassword, setShowPassword] = useState(false)

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
      const account = await mutateAsync({ email, password, companyName })
      toast.success('Cuenta creada', {
        description: `Bienvenido, ${account.companyName}.`,
      })
      navigate('/')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error inesperado'
      if (message === DUPLICATE_EMAIL_MESSAGE) {
        form.setError('email', { message })
      } else {
        toast.error('No se pudo crear la cuenta', { description: message })
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
              <FormLabel>Nombre de la empresa</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Acme S.A.S." autoComplete="organization" {...field} />
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
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="nombre@empresa.com"
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
              <FormLabel>Contraseña</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    className="pr-10"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 h-full"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-xs text-muted-foreground">
          Mínimo 8 caracteres, con mayúscula, minúscula y número.
        </p>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="size-4 animate-spin" />}
          Crear cuenta
        </Button>
      </form>
    </Form>
  )
}

import { z } from 'zod'

// Los mensajes son claves i18n; se traducen en FormMessage

const password = z
  .string()
  .min(8, { message: 'validation.passwordMin' })
  .regex(/[A-Z]/, { message: 'validation.passwordUppercase' })
  .regex(/[a-z]/, { message: 'validation.passwordLowercase' })
  .regex(/\d/, { message: 'validation.passwordNumber' })

export const registerSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(1, { message: 'validation.companyNameRequired' }),
    email: z.string().trim().pipe(z.email({ message: 'validation.invalidEmail' })),
    password,
    confirmPassword: z.string().min(1, { message: 'validation.confirmPasswordRequired' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'validation.passwordsMismatch',
  })

export type RegisterFormData = z.infer<typeof registerSchema>

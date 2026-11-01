import { z } from 'zod'
import {
  confirmPassword,
  email,
  passwordsMatch,
  passwordsMismatch,
  strongPassword,
} from './password.schema'

// Los mensajes son claves i18n; se traducen en FormMessage
export const registerSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(1, { message: 'validation.companyNameRequired' }),
    email,
    password: strongPassword,
    confirmPassword,
  })
  .refine(passwordsMatch, passwordsMismatch)

export type RegisterFormData = z.infer<typeof registerSchema>

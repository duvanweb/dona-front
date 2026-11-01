import { z } from 'zod'
import {
  confirmPassword,
  email,
  passwordsMatch,
  passwordsMismatch,
  storeCode,
  strongPassword,
} from './password.schema'

// Los mensajes son claves i18n; se traducen en FormMessage
export const requestResetSchema = z.object({ storeCode, email })
export type RequestResetFormData = z.infer<typeof requestResetSchema>

export const resetPasswordSchema = z
  .object({
    code: z.string().trim().regex(/^\d{6}$/, { message: 'validation.resetCodeFormat' }),
    password: strongPassword,
    confirmPassword,
  })
  .refine(passwordsMatch, passwordsMismatch)
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

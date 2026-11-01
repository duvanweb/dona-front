import { z } from 'zod'
import { email, storeCode } from './password.schema'

// Los mensajes son claves i18n; se traducen en FormMessage
export const loginSchema = z.object({
  storeCode,
  email,
  password: z.string().min(1, { message: 'validation.passwordRequired' }),
})

export type LoginFormData = z.infer<typeof loginSchema>

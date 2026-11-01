import { z } from 'zod'

// Regla de contraseña fuerte compartida (registro y restablecimiento)
export const strongPassword = z
  .string()
  .min(8, { message: 'validation.passwordMin' })
  .regex(/[A-Z]/, { message: 'validation.passwordUppercase' })
  .regex(/[a-z]/, { message: 'validation.passwordLowercase' })
  .regex(/\d/, { message: 'validation.passwordNumber' })

export const confirmPassword = z
  .string()
  .min(1, { message: 'validation.confirmPasswordRequired' })

export const email = z
  .string()
  .trim()
  .pipe(z.email({ message: 'validation.invalidEmail' }))

export const storeCode = z
  .string()
  .trim()
  .toUpperCase()
  .min(1, { message: 'validation.storeCodeRequired' })

export function passwordsMatch(data: { password: string; confirmPassword: string }) {
  return data.password === data.confirmPassword
}

export const passwordsMismatch = {
  path: ['confirmPassword'],
  message: 'validation.passwordsMismatch',
}

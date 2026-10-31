import { z } from 'zod'

const password = z
  .string()
  .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  .regex(/[A-Z]/, { message: 'Debe incluir al menos una letra mayúscula' })
  .regex(/[a-z]/, { message: 'Debe incluir al menos una letra minúscula' })
  .regex(/\d/, { message: 'Debe incluir al menos un número' })

export const registerSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(1, { message: 'El nombre de la empresa es requerido' }),
    email: z.string().trim().pipe(z.email({ message: 'Correo electrónico inválido' })),
    password,
    confirmPassword: z.string().min(1, { message: 'Confirme la contraseña' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  })

export type RegisterFormData = z.infer<typeof registerSchema>

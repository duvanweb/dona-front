import { useMutation } from '@tanstack/react-query'
import type {
  LoginInput,
  RegisterInput,
  RequestResetInput,
  ResetPasswordInput,
  Session,
} from '@/domain/auth/account.types'
import { sha256Hex } from '@/lib/hash'
import { useAccountStore } from '@/stores/use-account-store'

// Mocks: reemplazar por llamadas reales al API cuando exista
const latency = () => new Promise((resolve) => setTimeout(resolve, 600))
const store = () => useAccountStore.getState()

async function registerAccount({ password, ...rest }: RegisterInput): Promise<Session> {
  await latency()
  return store().register({ ...rest, passwordHash: await sha256Hex(password) })
}

async function login({ storeCode, email, password }: LoginInput): Promise<Session> {
  await latency()
  return store().login(storeCode, email, await sha256Hex(password))
}

// Devuelve el código solo porque es un mock (en real se envía por correo)
async function requestPasswordReset({
  storeCode,
  email,
}: RequestResetInput): Promise<string | null> {
  await latency()
  return store().requestPasswordReset(storeCode, email)
}

async function resetPassword({
  storeCode,
  email,
  code,
  password,
}: ResetPasswordInput): Promise<void> {
  await latency()
  store().resetPassword(storeCode, email, code, await sha256Hex(password))
}

export const useRegister = () => useMutation({ mutationFn: registerAccount })
export const useLogin = () => useMutation({ mutationFn: login })
export const useRequestPasswordReset = () => useMutation({ mutationFn: requestPasswordReset })
export const useResetPassword = () => useMutation({ mutationFn: resetPassword })

export const useSession = () => useAccountStore((s) => s.session)

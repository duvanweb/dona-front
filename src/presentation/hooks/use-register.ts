import { useMutation } from '@tanstack/react-query'
import type { Account, RegisterInput } from '@/domain/auth/account.types'
import { useAccountStore } from '@/stores/use-account-store'

// Mock: reemplazar por la llamada real al API cuando exista
async function registerAccount(input: RegisterInput): Promise<Account> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return useAccountStore.getState().register(input)
}

export function useRegister() {
  return useMutation({ mutationFn: registerAccount })
}

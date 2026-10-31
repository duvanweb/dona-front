import { create } from 'zustand'
import type { Account, RegisterInput } from '@/domain/auth/account.types'

export const DUPLICATE_EMAIL_MESSAGE = 'Ya existe una cuenta con este correo'

interface AccountState {
  accounts: Account[]
  currentAccount: Account | null
  register: (data: RegisterInput) => Account
}

export const useAccountStore = create<AccountState>((set, get) => ({
  accounts: [],
  currentAccount: null,
  register: ({ email, companyName }) => {
    const normalized = email.toLowerCase()
    if (get().accounts.some((a) => a.email.toLowerCase() === normalized)) {
      throw new Error(DUPLICATE_EMAIL_MESSAGE)
    }
    const account: Account = {
      id: crypto.randomUUID(),
      email,
      companyName,
      createdAt: new Date().toISOString(),
    }
    set((state) => ({
      accounts: [...state.accounts, account],
      currentAccount: account,
    }))
    return account
  },
}))

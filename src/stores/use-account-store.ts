import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Account, Session } from '@/domain/auth/account.types'
import { generateStoreCode } from '@/domain/auth/store-code'

// ⚠️ MOCK: cuentas y hashes en localStorage solo mientras no exista backend.
// Reemplazar por API real (el hash de contraseña nunca debe vivir en el cliente).

// Claves i18n de error
export const DUPLICATE_EMAIL_MESSAGE = 'register.errors.duplicateEmail'
export const INVALID_CREDENTIALS = 'auth.errors.invalidCredentials'
export const INVALID_RESET_CODE = 'auth.errors.invalidResetCode'

const RESET_CODE_TTL_MS = 10 * 60 * 1000

interface ResetRequest {
  code: string
  expiresAt: number
}

interface AccountState {
  accounts: Account[]
  session: Session | null
  lastStoreCode: string | null
  resetRequests: Record<string, ResetRequest>
  register: (data: { email: string; companyName: string; passwordHash: string }) => Session
  login: (storeCode: string, email: string, passwordHash: string) => Session
  logout: () => void
  requestPasswordReset: (storeCode: string, email: string) => string | null
  resetPassword: (
    storeCode: string,
    email: string,
    code: string,
    passwordHash: string,
  ) => void
}

const sameEmail = (a: string, b: string) => a.toLowerCase() === b.toLowerCase()
const resetKey = (storeCode: string, email: string) =>
  `${storeCode.toUpperCase()}|${email.toLowerCase()}`

function toSession(a: Account): Session {
  return {
    accountId: a.id,
    storeCode: a.storeCode,
    email: a.email,
    companyName: a.companyName,
  }
}

function sixDigitCode(): string {
  const [n] = crypto.getRandomValues(new Uint32Array(1))
  return String(n % 1_000_000).padStart(6, '0')
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => {
      const findAccount = (storeCode: string, email: string) =>
        get().accounts.find(
          (a) => a.storeCode === storeCode.toUpperCase() && sameEmail(a.email, email),
        )

      return {
        accounts: [],
        session: null,
        lastStoreCode: null,
        resetRequests: {},

        register: ({ email, companyName, passwordHash }) => {
          if (get().accounts.some((a) => sameEmail(a.email, email))) {
            throw new Error(DUPLICATE_EMAIL_MESSAGE)
          }
          const storeCode = generateStoreCode(companyName, (code) =>
            get().accounts.some((a) => a.storeCode === code),
          )
          const account: Account = {
            id: crypto.randomUUID(),
            storeCode,
            email,
            companyName,
            passwordHash,
            createdAt: new Date().toISOString(),
          }
          const session = toSession(account)
          set((state) => ({
            accounts: [...state.accounts, account],
            session,
            lastStoreCode: storeCode,
          }))
          return session
        },

        login: (storeCode, email, passwordHash) => {
          const account = findAccount(storeCode, email)
          if (!account || account.passwordHash !== passwordHash) {
            throw new Error(INVALID_CREDENTIALS)
          }
          const session = toSession(account)
          set({ session, lastStoreCode: account.storeCode })
          return session
        },

        logout: () => set({ session: null }),

        requestPasswordReset: (storeCode, email) => {
          if (!findAccount(storeCode, email)) return null
          const code = sixDigitCode()
          set((state) => ({
            resetRequests: {
              ...state.resetRequests,
              [resetKey(storeCode, email)]: {
                code,
                expiresAt: Date.now() + RESET_CODE_TTL_MS,
              },
            },
          }))
          return code
        },

        resetPassword: (storeCode, email, code, passwordHash) => {
          const key = resetKey(storeCode, email)
          const request = get().resetRequests[key]
          const account = findAccount(storeCode, email)
          if (
            !account ||
            !request ||
            request.code !== code ||
            request.expiresAt < Date.now()
          ) {
            throw new Error(INVALID_RESET_CODE)
          }
          set((state) => {
            const { [key]: _used, ...rest } = state.resetRequests
            return {
              resetRequests: rest,
              accounts: state.accounts.map((a) =>
                a.id === account.id ? { ...a, passwordHash } : a,
              ),
            }
          })
        },
      }
    },
    {
      name: 'dona-auth',
      partialize: ({ accounts, session, lastStoreCode, resetRequests }) => ({
        accounts,
        session,
        lastStoreCode,
        resetRequests,
      }),
    },
  ),
)

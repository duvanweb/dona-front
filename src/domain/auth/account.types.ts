// Entidad persistida (mock). Nunca guarda la contraseña en claro.
export interface Account {
  id: string
  storeCode: string // tenant
  email: string
  companyName: string
  passwordHash: string
  createdAt: string // ISO timestamp
}

export interface Session {
  accountId: string
  storeCode: string
  email: string
  companyName: string
}

export interface RegisterInput {
  email: string
  password: string
  companyName: string
}

export interface LoginInput {
  storeCode: string
  email: string
  password: string
}

export interface RequestResetInput {
  storeCode: string
  email: string
}

export interface ResetPasswordInput extends RequestResetInput {
  code: string
  password: string
}

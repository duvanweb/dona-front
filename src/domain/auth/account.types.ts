// Entidad persistida — nunca guarda la contraseña
export interface Account {
  id: string
  email: string
  companyName: string
  createdAt: string // ISO timestamp
}

export interface RegisterInput {
  email: string
  password: string
  companyName: string
}

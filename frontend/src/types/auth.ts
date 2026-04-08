type LoginCredentials = {
  email: string
  password: string
}

type RegisterData = {
  name: string
  email: string
  phone: string
  password: string
}

type AuthResponse = {
  message: string
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export type { LoginCredentials, RegisterData, AuthResponse }

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
    role: string
  }
}

type User = Pick<AuthResponse['user'], 'id' | 'name' | 'email' | 'role'>

export type { LoginCredentials, RegisterData, AuthResponse, User }

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
    phone: string
    provider: string
    role: string
  }
}

type User = Pick<AuthResponse['user'], 'id' | 'name' | 'email' | 'phone' | 'provider' | 'role'>

type UpdateProfileInputs = Partial<Pick<User, 'name' | 'email' | 'phone' >> & {
  currentPassword: string
  newPassword?: string
}

export type { LoginCredentials, RegisterData, UpdateProfileInputs, AuthResponse, User }

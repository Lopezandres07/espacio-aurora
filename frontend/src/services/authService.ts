import api from '../api/axios'
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from '../types/auth'

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post('/auth/login', credentials)
  console.log(response)
}

export const register = async (
  userData: RegisterData,
): Promise<AuthResponse> => {
  const { data } = await api.post('/auth/register', userData)
  return data
}

// Funcion para cerrar sesion
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/login'
}

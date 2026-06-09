import api from '../api/axios'
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from '../types/auth'

export const login = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    console.error('❌ Error capturado en el servicio:', error)
    throw error
  }
}

export const createUser = async (
  userData: RegisterData,
): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/register', userData)
    return response.data
  } catch (error) {
    console.error('❌ Error capturado en el servicio:', error)
    throw error
  }
}

export const validateToken = async () => {
  try {
    const response = await api.get('/auth/validate-token')
    return response.data
  } catch (error) {
    console.error('❌ Error capturado en el servicio:', error)
    throw error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

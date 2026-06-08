import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/auth'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  // Usamos un nombre genérico como setAuth porque sirve tanto para Login como Register
  setAuth: (user: User, token: string) => void
  logout: () => void
  checkoutSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

        checkoutSession: async () => {
          const {token, setAuth, logout, user} = get()
          if (!token) return
          
          try {
            console.log('Aca iria la consulta al endpoint de consulta del token');
            setAuth(user!, token)
          } catch (error) {
            logout()
          }
        }
    }),
    {
      name: 'aurora-auth', // Este es el nombre de la llave que verás en el localStorage
    },
  ),
)

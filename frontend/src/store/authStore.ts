import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/auth'
import { validateToken } from '../services/authService'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  // Nombre genérico como setAuth porque sirve tanto para Login como Register
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
          const {token, setAuth, logout} = get()
          if (!token) return
          try {
            const data = await validateToken()
            console.log(`Usuario: ${data.user}`);
            setAuth(data.user, token)
          } catch (error) {
            logout()
          }
        }
    }),
    {
      name: 'aurora-auth',
    },
  ),
)

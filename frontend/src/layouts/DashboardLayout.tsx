import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export const DashboardLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return (
    <div className='min-h-screen flex bg-aurora-light font-sans text-aurora-text'>
      {/* Sidebar Placeholder */}
      <aside className='w-64 bg-white border-r border-aurora-accent hidden md:flex flex-col'>
        <div className='h-16 flex items-center justify-center border-b border-aurora-accent'>
          <span className='font-serif font-bold text-xl text-aurora-dark'>
            Espacio Aurora
          </span>
        </div>
        <nav className='flex-grow p-4 space-y-2'>
          <a
            href='/dashboard'
            className='block px-4 py-2 rounded-md hover:bg-aurora-accent hover:text-aurora-dark transition-colors'
          >
            Inicio
          </a>
          <a
            href='/'
            className='block px-4 py-2 rounded-md hover:bg-aurora-accent hover:text-aurora-dark transition-colors'
          >
            Ir a Web
          </a>
        </nav>
        <div className='p-4 border-t border-aurora-accent'>
          <button
            onClick={logout}
            data-testid='logout-button'
            className='w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors'
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 flex flex-col'>
        <header className='h-16 bg-white border-b border-aurora-accent flex items-center px-4 md:px-8 shadow-sm'>
          <h1 className='font-serif font-semibold text-lg text-aurora-dark md:hidden'>
            Espacio Aurora
          </h1>
          <div className='ml-auto flex items-center gap-4'>
            <div className='w-8 h-8 rounded-full bg-aurora-primary/20 flex items-center justify-center text-aurora-dark font-medium'>
              U
            </div>
          </div>
        </header>
        <div className='p-4 md:p-8 flex-1 overflow-auto'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  // Ahora solo necesitamos una referencia para el perfil de escritorio
  const desktopProfileRef = useRef<HTMLDivElement>(null)

  // Ocultar menú de perfil cuando se hace click afuera (Solo Escritorio)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        desktopProfileRef.current &&
        !desktopProfileRef.current.contains(target)
      ) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    setIsOpen(false) // Cerrar menú móvil si está abierto
    navigate('/login')
  }

  const navLinks = [
    { name: 'Servicios', id: 'servicios' },
    { name: 'Sobre mi', id: 'sobre-mi' },
    { name: 'Contacto', id: 'contacto' },
  ]

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative'>
        {/* LOGO */}
        <div className='flex items-center gap-2'>
          <Link
            to='/'
            className='font-serif font-bold text-2xl text-aurora-dark'
          >
            Espacio Aurora
          </Link>
        </div>

        {/* BOTÓN MENÚ MÓVIL (Único botón en móvil) */}
        <div className='flex md:hidden items-center gap-4'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-aurora-dark hover:text-aurora-primary focus:outline-none transition-colors p-1'
            aria-label='Menú'
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* NAVEGACIÓN ESCRITORIO */}
        <nav className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className='text-aurora-dark font-medium hover:text-aurora-primary transition-colors cursor-pointer bg-transparent border-none'
            >
              {link.name}
            </button>
          ))}

          {isAuthenticated ? (
            <div
              className='relative'
              ref={desktopProfileRef}
            >
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className='flex items-center gap-2 text-aurora-dark font-medium hover:text-aurora-primary transition-colors focus:outline-none'
              >
                <div className='bg-gray-100 p-2 rounded-full'>
                  <User size={18} />
                </div>
                <span>Hola, {user?.name?.split(' ')[0] || 'Perfil'}</span>
              </button>

              {/* Menú Desplegable Escritorio */}
              {isProfileOpen && (
                <div className='absolute top-full mt-4 w-56 bg-white border border-gray-100 rounded-b-lg rounded-tl-lg shadow-xl py-2 z-50'>
                  <div className='px-4 py-3 border-b border-gray-50 mb-1'>
                    <p className='text-xs text-gray-500'>
                      Sesión iniciada como
                    </p>
                    <p className='text-sm font-semibold text-aurora-dark truncate'>
                      {user?.name || user?.email}
                    </p>
                  </div>

                  <Link
                    to={
                      user?.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'
                    }
                    className='flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-aurora-accent hover:text-aurora-dark transition-colors'
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <LayoutDashboard size={16} />
                    Mi perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors'
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to='/login'
              className='text-white bg-aurora-primary font-medium hover:bg-aurora-dark transition-colors px-6 py-2.5 rounded-full shadow-sm'
            >
              Iniciar Sesión
            </Link>
          )}
        </nav>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL (Todo Unificado) */}
      {isOpen && (
        <div className='md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl flex flex-col'>
          {/* Tarjeta de Perfil en Móvil (Solo si está logueado) */}
          {isAuthenticated && (
            <div className='bg-gray-50 px-6 py-4 flex items-center gap-3 border-b border-gray-100'>
              <div className='bg-white p-2 rounded-full border border-gray-200 shadow-sm'>
                <User
                  size={24}
                  className='text-aurora-primary'
                />
              </div>
              <div>
                <p className='text-sm font-bold text-gray-900'>
                  {user?.name || user?.email}
                </p>
                <p className='text-xs text-gray-500'>Sesión iniciada</p>
              </div>
            </div>
          )}

          <div className='flex flex-col py-2'>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className='text-left text-gray-700 font-medium hover:bg-aurora-accent hover:text-aurora-dark transition-colors px-6 py-3'
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className='border-t border-gray-100 p-4'>
            {isAuthenticated ? (
              <div className='flex flex-col gap-2'>
                <Link
                  to={
                    user?.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'
                  }
                  onClick={() => setIsOpen(false)}
                  className='flex items-center justify-center gap-2 w-full text-aurora-dark border border-aurora-primary bg-white font-medium hover:bg-aurora-accent transition-colors px-4 py-2.5 rounded-md'
                >
                  <LayoutDashboard size={18} />
                  Ir a mi perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className='flex items-center justify-center gap-2 w-full text-red-600 bg-red-50 font-medium hover:bg-red-100 transition-colors px-4 py-2.5 rounded-md'
                >
                  <LogOut size={18} />
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to='/login'
                onClick={() => setIsOpen(false)}
                className='flex justify-center text-white bg-aurora-primary font-medium hover:bg-aurora-dark transition-colors px-4 py-3 rounded-md shadow-sm'
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

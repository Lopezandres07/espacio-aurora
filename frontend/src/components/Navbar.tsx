import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()
  const profileMenuRef = useRef<HTMLDivElement>(null)

  // Ocultar menú de perfil cuando se hace click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
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
    navigate('/login')
  }

  // Las opciones de navegación
  const navLinks = [
    { name: 'Servicios', id: 'servicios' },
    { name: 'Sobre mi', id: 'sobre-mi' },
    { name: 'Contacto', id: 'contacto' },
  ]

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative'>
        <div className='flex items-center gap-2'>
          <Link
            to='/'
            className='font-serif font-bold text-2xl text-aurora-dark'
          >
            Espacio Aurora
          </Link>
        </div>

        {/* Mobile menu button and Profile icon for mobile */}
        <div className='flex md:hidden items-center gap-4'>
          {isAuthenticated && (
            <div
              className='relative'
              ref={profileMenuRef}
            >
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className='flex items-center justify-center p-2 rounded-full border border-gray-200 text-aurora-dark hover:bg-gray-50 focus:outline-none transition-colors'
                aria-label='Perfil'
              >
                <User size={20} />
              </button>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-aurora-dark hover:text-aurora-primary focus:outline-none transition-colors'
            aria-label='Menú'
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
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
              ref={profileMenuRef}
            >
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className='flex items-center gap-2 text-aurora-dark font-medium hover:text-aurora-primary transition-colors focus:outline-none'
              >
                <div className='bg-gray-100 p-1.5 rounded-full border border-gray-200'>
                  <User size={16} />
                </div>
                <span>¡Hola, {user?.name || 'Mi Perfil'}!</span>
              </button>

              {/* Desktop Profile Dropdown */}
              {isProfileOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-50 divide-y divide-gray-100'>
                  <div>
                    <Link
                      to={
                        user?.role === 'admin'
                          ? '/admin/dashboard'
                          : '/dashboard'
                      }
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-aurora-primary hover:text-white transition-colors'
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Mi perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors'
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to='/login'
              className='text-white bg-aurora-primary font-medium hover:bg-aurora-dark transition-colors px-5 py-2 rounded-md shadow-sm'
            >
              Iniciar Sesión
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className='md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-md py-4 px-4 flex flex-col gap-4 z-40'>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className='text-left text-aurora-dark font-medium hover:text-aurora-primary transition-colors py-2'
            >
              {link.name}
            </button>
          ))}
          {!isAuthenticated && (
            <Link
              to='/login'
              onClick={() => setIsOpen(false)}
              className='text-center text-white bg-aurora-primary font-medium hover:bg-aurora-dark transition-colors px-4 py-2 rounded-md mt-2 shadow-sm'
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      )}

      {/* Mobile Profile Dropdown */}
      {isAuthenticated && isProfileOpen && (
        <div className='md:hidden absolute top-[calc(100%-0.5rem)] right-4 mt-2 w-56 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-50 divide-y divide-gray-100'>
          <div className='px-4 py-2'>
            <p className='text-xs text-gray-500'>Sesión iniciada como</p>
            <p className='text-sm font-medium text-gray-900 truncate'>
              {user?.name || user?.email}
            </p>
          </div>
          <div>
            <Link
              to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-aurora-primary hover:text-white transition-colors'
              onClick={() => setIsProfileOpen(false)}
            >
              Mi perfil
            </Link>
            <button
              onClick={handleLogout}
              className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors'
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

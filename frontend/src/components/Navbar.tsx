export const Navbar = () => {
  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <a
            href='/'
            className='font-serif font-bold text-2xl text-aurora-dark'
          >
            Espacio Aurora
          </a>
        </div>
        <nav className='flex gap-4'>
          <a
            href='/login'
            className='text-aurora-dark font-medium hover:text-aurora-primary transition-colors'
          >
            Iniciar Sesión
          </a>
        </nav>
      </div>
    </header>
  )
}

import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col font-sans bg-aurora-light text-aurora-text'>
      <Navbar />

      <main className='flex-grow'>
        <Outlet />
      </main>

      {/* TODO: Footer Placeholder */}
      <footer className='bg-white border-t border-aurora-accent py-8 text-center text-sm text-gray-500'>
        <p>
          &copy; {new Date().getFullYear()} Espacio Aurora. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  )
}

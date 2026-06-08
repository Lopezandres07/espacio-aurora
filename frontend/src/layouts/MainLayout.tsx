import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col font-sans bg-aurora-light text-aurora-text'>
      <Navbar />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

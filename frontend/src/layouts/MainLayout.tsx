import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-aurora-light text-aurora-text">
      {/* TODO: Navbar Placeholder */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-2xl text-aurora-dark">Espacio Aurora</span>
          </div>
          <nav className="flex gap-4">
            <a href="/login" className="text-aurora-dark font-medium hover:text-aurora-primary transition-colors">
              Iniciar Sesión
            </a>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* TODO: Footer Placeholder */}
      <footer className="bg-white border-t border-aurora-accent py-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Espacio Aurora. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

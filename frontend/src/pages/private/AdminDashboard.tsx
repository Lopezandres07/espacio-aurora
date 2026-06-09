import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { Navigate } from 'react-router-dom'

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'disponibilidad' | 'leads'>(
    'disponibilidad',
  )
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const userRole = useAuthStore((state) => state.user?.role)

  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to='/login' />
  }

  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-2xl font-serif font-bold text-aurora-dark'>
          Panel Administradora (Aurora)
        </h2>
        <p className='text-aurora-text/80 mt-1'>
          Gestiona tus consultas y controla tu disponibilidad
        </p>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-aurora-accent/20 overflow-hidden'>
        <div className='border-b border-aurora-light flex px-4'>
          <button
            className={`px-4 py-4 text-sm font-medium transition-colors ${
              activeTab === 'disponibilidad'
                ? 'text-aurora-primary border-b-2 border-aurora-primary'
                : 'text-aurora-text hover:text-aurora-dark'
            }`}
            onClick={() => setActiveTab('disponibilidad')}
          >
            Gestión de Disponibilidad
          </button>
          <button
            className={`px-4 py-4 text-sm font-medium transition-colors ${
              activeTab === 'leads'
                ? 'text-aurora-primary border-b-2 border-aurora-primary'
                : 'text-aurora-text hover:text-aurora-dark'
            }`}
            onClick={() => setActiveTab('leads')}
          >
            Lista de Leads
          </button>
        </div>

        <div className='p-6'>
          {activeTab === 'disponibilidad' && (
            <div className='space-y-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-serif font-semibold text-aurora-dark'>
                  Días Bloqueados (Permisos / Vacaciones)
                </h3>
                <button
                  className='px-4 py-2 bg-aurora-primary text-white text-sm font-medium rounded-lg shadow-sm hover:bg-aurora-dark transition-colors'
                  data-testid='admin-block-day-btn'
                >
                  Bloquear Día
                </button>
              </div>

              {/* Placeholder calendar or list for blocked days */}
              <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
                <div className='p-4 rounded-xl border border-red-200 bg-red-50 flex justify-between items-center'>
                  <div>
                    <p className='font-medium text-red-800'>12 Octubre</p>
                    <p className='text-xs text-red-600'>Feriado - Cerrado</p>
                  </div>
                  <button
                    className='text-red-400 hover:text-red-600'
                    aria-label='Eliminar bloqueo'
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className='space-y-4'>
              <h3 className='text-lg font-serif font-semibold text-aurora-dark mb-4'>
                Nuevos Contactos (Pendientes)
              </h3>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-aurora-light'>
                  <thead className='bg-aurora-accent/20'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-aurora-text uppercase tracking-wider'
                      >
                        Nombre
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-aurora-text uppercase tracking-wider'
                      >
                        Tratamiento
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-aurora-text uppercase tracking-wider'
                      >
                        Fecha de Contacto
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-right text-xs font-medium text-aurora-text uppercase tracking-wider'
                      >
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-aurora-light'>
                    {/* Mock Lead */}
                    <tr className='hover:bg-aurora-accent/10 transition-colors'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='h-8 w-8 rounded-full bg-aurora-primary/20 flex items-center justify-center text-aurora-dark text-xs font-bold mr-3'>
                            LM
                          </div>
                          <div className='text-sm font-medium text-aurora-dark'>
                            Laura Mujica
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-aurora-text'>
                        Pink Glow
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-aurora-text'>
                        Hace 2 hrs
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <button className='text-green-600 hover:text-green-800 bg-green-50 px-3 py-1 rounded-full transition-colors'>
                          Contactar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

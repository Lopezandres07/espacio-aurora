import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export const UserDashboard = () => {
  const { user, token, isAuthenticated } = useAuthStore()

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    currentPassword: '',
  })

  const actualTreatment = [
    { id: 1, name: 'Limpieza Facial Profunda', date: '20 Agosto, 2023' },
  ]

  const nextAppointments = [
    { id: 1, name: 'Limpieza Facial Profunda', date: '01 Septiembre, 2023' },
  ]

  const treatmentHistory = [
    { id: 1, name: 'Limpieza Facial Profunda', date: '01 Septiembre, 2023' },
    { id: 2, name: 'Evaluación Inicial', date: '15 Agosto, 2023' },
    { id: 3, name: 'Masaje Descontracturante', date: '10 Julio, 2023' },
    { id: 4, name: 'Drenaje Linfático', date: '22 Junio, 2023' },
    { id: 5, name: 'Lifting de Pestañas', date: '05 Mayo, 2023' },
    { id: 6, name: 'Plasma', date: '18 Mayo, 2023' },
  ]

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!profileData.currentPassword) {
      alert('Debes ingresar tu contraseña actual para guardar los cambios.')
      return
    }

    console.log(
      'Validando contraseña en el backend...',
      profileData.currentPassword,
    )
    console.log('Actualizando datos de usuario:', {
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
    })

    alert(
      'Datos actualizados correctamente. Se ha enviado un correo de confirmación a tu bandeja de entrada.',
    )
    setProfileData((prev) => ({ ...prev, currentPassword: '' }))
  }

  if (!isAuthenticated && !token) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <div className='pb-4'>
        <h2 className='text-2xl font-serif font-bold text-aurora-dark'>
          ¡Hola, {user?.name || 'Usuario'}!
        </h2>
        <p className='text-aurora-text/80'>
          Este es el resumen de tus citas y perfil.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Tratamiento Actual */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-aurora-accent/20'>
          <h3 className='text-lg font-serif font-semibold text-aurora-dark mb-4 border-b border-aurora-light pb-2'>
            Tratamiento Actual
          </h3>
          {actualTreatment.length === 0 ? (
            <p className='text-sm text-aurora-text/80'>
              No tienes tratamientos activos en este momento.
            </p>
          ) : (
            actualTreatment.map((treatment) => (
              <div
                key={treatment.id}
                className='flex flex-col sm:flex-row gap-3 p-4 bg-aurora-light rounded-xl items-start sm:items-center justify-between group hover:bg-aurora-accent/30 transition-colors'
              >
                <div>
                  <p className='font-medium text-aurora-dark'>
                    {treatment.name}
                  </p>
                  <p className='text-sm text-aurora-text/80'>
                    Fecha de inicio: {treatment.date}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Próximas Citas */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-aurora-accent/20'>
          <h3 className='text-lg font-serif font-semibold text-aurora-dark mb-4 border-b border-aurora-light pb-2'>
            Mis Próximas Citas
          </h3>
          <ul className='space-y-4'>
            <li className='w-autogap-3   rounded-xl items-start sm:items-center justify-between group transition-colors'>
              {nextAppointments.length === 0 ? (
                <p className='text-sm text-aurora-text/80'>
                  No tienes citas próximas en este momento.
                </p>
              ) : (
                nextAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className='flex flex-col sm:flex-row gap-3 p-4 bg-aurora-light rounded-xl items-start sm:items-center justify-between group hover:bg-aurora-accent/30 transition-colors'
                  >
                    <div>
                      <p className='font-medium text-aurora-dark'>
                        {appointment.name}
                      </p>
                      <p className='text-sm text-aurora-text/80'>
                        {appointment.date}
                      </p>
                    </div>
                    <button
                      className='text-sm font-medium text-red-400 hover:text-red-500 transition-colors'
                      data-testid='cancel-appointment-button'
                    >
                      Cancelar Cita
                    </button>
                  </div>
                ))
              )}
            </li>
          </ul>
        </div>

        {/* Historial de Tratamientos */}
        <div className='md:col-span-2'>
          <h3 className='bg-white text-lg font-serif font-semibold text-aurora-dark  border-b border-aurora-light rounded-t-2xl px-6 pt-6 pb-2'>
            Historial de Tratamientos
          </h3>
          <div className='bg-white rounded-b-2xl p-6 shadow-sm border border-aurora-accent/20 md:col-span-2 min-h-[12rem] max-h-[19.5rem] overflow-y-auto'>
            <div className='relative flex flex-col md:flex-row md:overflow-x-auto md:pb-4 gap-6 custom-scrollbar'>
              {treatmentHistory.length === 0 ? (
                <div className='text-center text-aurora-text/80'>
                  No hay tratamientos registrados
                </div>
              ) : (
                treatmentHistory.map((item, index) => (
                  <div
                    key={item.id}
                    className='relative flex items-start md:flex-col group md:min-w-[14rem] z-10 shrink-0'
                  >
                    {/* LÍNEA DINÁMICA (SEGMENTO) */}
                    {/* Se renderiza en todos los elementos EXCEPTO en el último */}
                    {index !== treatmentHistory.length - 1 && (
                      <div className='absolute left-2 top-6 bottom-[-1.5rem] w-0.5 bg-aurora-accent md:left-2 md:top-[1.35rem] md:w-[calc(100%+1.5rem)] md:h-0.5 md:bottom-auto z-[-1]' />
                    )}

                    {/* Punto del Timeline */}
                    <div className='flex items-center justify-center w-4 h-4 rounded-full bg-aurora-primary border-4 border-white shadow mt-1 md:mt-3.5 shrink-0 z-10' />

                    {/* Tarjeta de contenido */}
                    <div className='flex-1 ml-6 md:ml-0 md:mt-6 p-4 bg-aurora-light rounded-xl w-full hover:shadow-md transition-shadow'>
                      <p className='font-medium text-aurora-dark text-sm'>
                        {item.name}
                      </p>
                      <span className='text-xs text-aurora-text/70 mt-1 block'>
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Configuración de Perfil */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-aurora-accent/20 md:col-span-2'>
          <h3 className='text-lg font-serif font-semibold text-aurora-dark mb-6 border-b border-aurora-light pb-2'>
            Mis Datos
          </h3>

          <form
            onSubmit={handleUpdateProfile}
            className='space-y-6'
          >
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium text-aurora-dark mb-1'>
                  Nombre Completo
                </label>
                <input
                  type='text'
                  name='name'
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className='w-full p-3 rounded-xl border border-aurora-accent/40 bg-aurora-light/50 focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 text-sm'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-aurora-dark mb-1'>
                  Correo Electrónico
                </label>
                <input
                  type='email'
                  name='email'
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className='w-full p-3 rounded-xl border border-aurora-accent/40 bg-aurora-light/50 focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 text-sm'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-aurora-dark mb-1'>
                  Teléfono (Opcional)
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className='w-full p-3 rounded-xl border border-aurora-accent/40 bg-aurora-light/50 focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 text-sm'
                  placeholder='+56 9 1234 5678'
                />
              </div>
            </div>

            <div className='flex flex-col md:flex-row justify-between items-center pt-4 border-t border-aurora-light space-y-6'>
              <div className='max-w-md'>
                <label className='block text-sm font-medium text-aurora-dark mb-1'>
                  Contraseña Actual <span className='text-red-400'>*</span>
                </label>
                <p className='text-xs text-aurora-text/60 mb-2'>
                  Por tu seguridad, ingresa tu contraseña actual para confirmar
                  los cambios.
                </p>
                <input
                  type='password'
                  name='currentPassword'
                  value={profileData.currentPassword}
                  onChange={handleProfileChange}
                  className='w-full p-3 rounded-xl border border-aurora-accent/40 bg-aurora-light/50 focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 text-sm'
                  placeholder='••••••••'
                  required
                />
              </div>
              <button
                type='submit'
                className='px-6 py-3 bg-aurora-primary text-white rounded-xl font-medium hover:bg-aurora-primary/90 transition-colors text-sm shadow-sm'
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

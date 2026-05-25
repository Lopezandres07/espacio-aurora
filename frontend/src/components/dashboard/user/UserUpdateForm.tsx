import { useState } from "react"
import { useAuthStore } from "../../../store/authStore"

export const UserUpdateForm = () => {
const {user} = useAuthStore()

const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    currentPassword: '',
  })

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

  return (
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
  )
}

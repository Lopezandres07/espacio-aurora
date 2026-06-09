import { useAuthStore } from "../../../store/authStore"
import { useForm } from 'react-hook-form'
import type { UpdateProfileInputs } from "../../../types/auth"

/* 
Pendiente: Cambiar a PATCH el endpoint de actualizar usuario
Pendiente: Implementar sweetalert2 para mostrar errores y success
Pendiente: Implementar en el backend una columna de provider en el usuario para validar si se loguea desde google o con correo y clave
*/


export const UserUpdateForm = () => {
const {user} = useAuthStore()

const {register, handleSubmit, formState: {errors, isSubmitting, dirtyFields}} = useForm<UpdateProfileInputs>({defaultValues: {name: user?.name, email: user?.email, phone: user?.phone}})

const isSocialProvider = false

const onSubmit = handleSubmit((data) => {
  const isProfileChanged = !!(dirtyFields.name || dirtyFields.email || dirtyFields.phone)
  const isPasswordChanged = !!data.newPassword

  if (!isProfileChanged && !isPasswordChanged) {
    console.log("No se ha modificado nada");
    return
  }

  const patchData: Partial<UpdateProfileInputs> = {
    currentPassword: data.currentPassword,
  }

  if (dirtyFields.name) patchData.name = data.name
  if (dirtyFields.email) patchData.email = data.email
  if (dirtyFields.phone) patchData.phone = data.phone
  if (data.newPassword) patchData.newPassword = data.newPassword

  console.log(patchData);
})

  return (
     <div className='bg-white rounded-2xl p-6 mb-6 shadow-sm border border-aurora-accent/20 md:col-span-2'>
          <h3 className='text-lg font-serif font-semibold text-aurora-dark mb-6 border-b border-aurora-light pb-2'>
            Mis Datos
          </h3>
          {
            isSocialProvider ? (
              <div className='bg-red-500/10 border border-red-400 rounded-lg p-4 mb-4'>
                <p className='text-red-700'>No puedes actualizar tu correo tus datos ya que tu cuenta está vinculada a {user?.provider}</p>
              </div>
            ) : (
              <form
            onSubmit={onSubmit}
            className='space-y-6'
          >
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium text-aurora-dark mb-1'>
                  Nombre Completo
                </label>
                <input
                  {...register('name')}
                  className='w-full p-3 rounded-xl border border-aurora-accent/40 bg-aurora-light/50 focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 text-sm'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-aurora-dark mb-1'>
                  Correo Electrónico
                </label>
                <input
                  {...register('email')}
                  className='w-full p-3 rounded-xl border border-aurora-accent/40 bg-aurora-light/50 focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 text-sm'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-aurora-dark mb-1'>
                  Teléfono (Opcional)
                </label>
                <input
                   {...register('phone', {pattern: { value: /^[6-9]\d{8}$/, message: "Formato de teléfono inválido" }})}
                  className='w-full p-3 rounded-xl border border-aurora-accent/40 bg-aurora-light/50 focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 text-sm'
                />
                {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
              </div>

              <div className='max-w-md'>
                <div className="flex flex-col items-start md:flex-row md:items-center md:gap-4">
                  <label className='text-sm font-medium text-aurora-dark mb-1'>
                    Contraseña Actual <span className='text-red-400'>*</span> 
                  </label> 
                  {errors.currentPassword && <p className="pb-2 text-xs text-red-400 md:pb-0">{errors.currentPassword.message}</p>}
                </div>
                <input
                  type='password'
                  {...register('currentPassword', { 
                    required: 'Campo requerido para actualizar', 
                    minLength: {
                      value: 8,
                      message: 'Debe tener al menos 8 caracteres'
                    }
                  })}
                  className='w-full p-3 rounded-xl border border-aurora-accent/40 bg-aurora-light/50 focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 text-sm'
                  placeholder='••••••••'
                />
              
              </div>

              <div>
                <div className='flex flex-col items-start md:flex-row md:items-center md:gap-4'>
                  <label className='block text-sm font-medium text-aurora-dark mb-1'>
                    Contraseña Nueva
                  </label>
                  {errors.newPassword && <p className="pb-2 text-xs text-red-400 md:pb-0">{errors.newPassword.message}</p>}
                </div>
                <input
                  type='password'
                  {...register('newPassword', {
                    minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
                    validate: (value, formValues) => {
                      if (!value) return true;
                      return value !== formValues.currentPassword || "Debe ser diferente a la actual";
                    }
                  })}
                  className='w-full p-3 rounded-xl border border-aurora-accent/40 bg-aurora-light/50 focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 text-sm'
                  placeholder='••••••••'
                />
              
              </div>

              <div className='flex justify-end items-end'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-8 py-3 bg-aurora-primary text-white rounded-xl font-medium hover:bg-aurora-primary/90 transition-colors text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed w-auto'
                  >
                  {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </div>

          </form>
            )
          }
        </div>
  )
}

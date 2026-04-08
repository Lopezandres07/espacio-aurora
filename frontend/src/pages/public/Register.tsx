import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FormError } from '../../components/FormError'
import { createUser } from '../../services/authService'
import { useAuthStore } from '../../store/authStore'

export const Register = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch('password')

  const onSubmit = async (data: any) => {
    try {
      const response = await createUser(data)
      setAuth(response.user, response.token)
      navigate('/dashboard')
    } catch (error) {
      console.error('❌ Error en crear usuario:', error)
    }
  }

  return (
    <div className='min-h-screen bg-aurora-light flex items-center justify-center p-4'>
      <div className='max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-aurora-accent/50'>
        <div className='p-8 sm:p-12'>
          {/* Brand/Logo Area */}
          <div className='text-center mb-10'>
            <h1 className='text-3xl font-serif font-bold text-aurora-dark'>
              Empieza tu Transformación
            </h1>
            <p className='text-aurora-text/80 mt-2 text-sm'>
              Crea tu perfil para agendar citas y descubrir tratamientos
              personalizados
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-aurora-text mb-2'
              >
                Nombre Completo
              </label>
              <input
                id='name'
                type='text'
                {...register('name', {
                  required: 'El nombre es requerido',
                })}
                className={`w-full px-4 py-3 rounded-xl border bg-aurora-light/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 transition-colors text-aurora-text ${errors.name ? 'border-aurora-error focus:border-aurora-error' : 'border-aurora-accent focus:border-aurora-primary'}`}
                placeholder='Tu nombre completo'
                data-testid='register-name-input'
              />
              <FormError message={errors.name?.message as string} />
            </div>

            {/* Aplicar formato de telefono a futuro */}
            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-aurora-text mb-2'
              >
                Teléfono
              </label>
              <input
                id='phone'
                type='text'
                {...register('phone', {
                  required: 'El teléfono es requerido',
                })}
                className={`w-full px-4 py-3 rounded-xl border bg-aurora-light/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 transition-colors text-aurora-text ${errors.phone ? 'border-aurora-error focus:border-aurora-error' : 'border-aurora-accent focus:border-aurora-primary'}`}
                placeholder='Tu teléfono'
                data-testid='register-phone-input'
              />
              <FormError message={errors.phone?.message as string} />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-aurora-text mb-2'
              >
                Correo Electrónico
              </label>
              <input
                id='email'
                type='email'
                {...register('email', {
                  required: 'El correo electrónico es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Dirección de correo electrónico inválida',
                  },
                })}
                className={`w-full px-4 py-3 rounded-xl border bg-aurora-light/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 transition-colors text-aurora-text ${errors.email ? 'border-aurora-error focus:border-aurora-error' : 'border-aurora-accent focus:border-aurora-primary'}`}
                placeholder='tu@email.com'
                data-testid='register-email-input'
              />
              <FormError message={errors.email?.message as string} />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-aurora-text mb-2'
              >
                Contraseña
              </label>
              <input
                id='password'
                type='password'
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres',
                  },
                })}
                className={`w-full px-4 py-3 rounded-xl border bg-aurora-light/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 transition-colors text-aurora-text ${errors.password ? 'border-aurora-error focus:border-aurora-error' : 'border-aurora-accent focus:border-aurora-primary'}`}
                placeholder='••••••••'
                data-testid='register-password-input'
              />
              <FormError message={errors.password?.message as string} />
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-aurora-text mb-2'
              >
                Confirmar Contraseña
              </label>
              <input
                id='confirmPassword'
                type='password'
                {...register('confirmPassword', {
                  required: 'Confirme su contraseña',
                  validate: (value) =>
                    value === password || 'Las contraseñas no coinciden',
                })}
                className={`w-full px-4 py-3 rounded-xl border bg-aurora-light/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 transition-colors text-aurora-text ${errors.confirmPassword ? 'border-aurora-error focus:border-aurora-error' : 'border-aurora-accent focus:border-aurora-primary'}`}
                placeholder='••••••••'
                data-testid='register-confirm-password-input'
              />
              <FormError message={errors.confirmPassword?.message as string} />
            </div>

            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-aurora-primary hover:bg-aurora-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aurora-primary transition-all duration-300 hover:scale-[1.02]'
                data-testid='register-submit-button'
              >
                Crear Perfil
              </button>
            </div>
          </form>

          <div className='mt-8 text-center text-sm text-aurora-text'>
            <span>¿Ya tienes cuenta? </span>
            <a
              href='/login'
              className='font-medium text-aurora-primary hover:text-aurora-dark transition-colors'
            >
              Iniciar Sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

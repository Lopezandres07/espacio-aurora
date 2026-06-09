import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FormError } from '../../components/FormError'
import { login } from '../../services/authService'
import { useAuthStore } from '../../store/authStore'

export const Login = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    try {
      const response = await login(data)
      setAuth(response.user, response.token)
      navigate('/')
    } catch (error) {
      console.error('❌ Error en Login:', error)
    }
  }

  return (
    <div className='min-h-screen bg-aurora-light flex items-center justify-center p-4'>
      <div className='max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-aurora-accent/50'>
        <div className='p-8 sm:p-12'>
          <div className='text-center mb-10'>
            <h1 className='text-3xl font-serif font-bold text-aurora-dark'>
              Bienvenida
            </h1>
            <p className='text-aurora-text/80 mt-2 text-sm'>
              Inicia sesión para gestionar tus citas
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-6'
          >
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
                data-testid='login-email-input'
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
                data-testid='login-password-input'
              />
              <FormError message={errors.password?.message as string} />
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  type='checkbox'
                  {...register('rememberMe')}
                  className='h-4 w-4 text-aurora-primary focus:ring-aurora-primary border-gray-300 rounded'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-aurora-text'
                >
                  Recordarme
                </label>
              </div>

              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-aurora-primary hover:text-aurora-dark transition-colors'
                >
                  ¿Olvidaste la contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-aurora-primary hover:bg-aurora-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aurora-primary transition-all duration-300 hover:scale-[1.02]'
                data-testid='login-submit-button'
              >
                Ingresar
              </button>
            </div>
          </form>

          <div className='mt-8 text-center text-sm text-aurora-text'>
            <span>¿No tienes cuenta? </span>
            <a
              href='/register'
              className='font-medium text-aurora-primary hover:text-aurora-dark transition-colors'
            >
              Regístrate
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

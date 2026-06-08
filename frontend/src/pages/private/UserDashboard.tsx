import { useAuthStore } from '../../store/authStore'
import {ActualTreatment} from '../../components/dashboard/user/ActualTreatment'
import {NextAppointments} from '../../components/dashboard/user/NextAppointments'
import {TreatmentHistory} from '../../components/dashboard/user/TreatmentHistory'
import { UserUpdateForm } from '../../components/dashboard/user/UserUpdateForm'


export const UserDashboard = () => {
  const { user } = useAuthStore()
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
        <ActualTreatment />
        <NextAppointments />
        <TreatmentHistory />
        <UserUpdateForm />
      </div>
    </>
  )
}

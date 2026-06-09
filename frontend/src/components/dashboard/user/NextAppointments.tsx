import { nextAppointments } from "../../../data/dataDashboard"

export const NextAppointments = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-aurora-accent/20'>
      <h3 className='text-lg font-serif font-semibold text-aurora-dark mb-4 border-b border-aurora-light pb-2'>
        Mis Próximas Citas
      </h3>
      <ul className='space-y-4'>
        <li className='w-autogap-3   rounded-xl items-start sm:items-center justify-between group transition-colors'>
          {nextAppointments.length === 0 ? (
            <p className='text-sm text-aurora-text/80'>
              No tienes citas próximas en este momento
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
  )
}

import { treatmentHistory } from '../../../data/dataDashboard'

export const TreatmentHistory = () => {
  return (
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
  )
}

import { actualTreatment } from '../../../data/dataDashboard'

export const ActualTreatment = () => {
  return (
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
  )
}

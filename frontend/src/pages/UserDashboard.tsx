export const UserDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-bold text-aurora-dark">Hola, Paciente</h2>
        <p className="text-aurora-text/80 mt-1">Este es el resumen de tus citas y tratamientos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Próximas Citas */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-aurora-accent/20">
          <h3 className="text-lg font-serif font-semibold text-aurora-dark mb-4 border-b border-aurora-light pb-2">
            Mis Próximas Citas
          </h3>
          <ul className="space-y-4">
            <li className="flex flex-col sm:flex-row gap-3 p-4 bg-aurora-light rounded-xl items-start sm:items-center justify-between group hover:bg-aurora-accent/30 transition-colors">
              <div>
                <p className="font-medium text-aurora-dark">Pink Glow</p>
                <p className="text-sm text-aurora-text/80">Martes 15, 14:00 hrs</p>
              </div>
              <button 
                className="text-sm font-medium text-red-400 hover:text-red-500 transition-colors"
                data-testid="cancel-appointment-button"
              >
                Cancelar Cita
              </button>
            </li>
            
            <li className="flex flex-col sm:flex-row gap-3 p-4 border border-dashed border-aurora-primary/30 rounded-xl items-center justify-center cursor-pointer hover:bg-aurora-accent/20 transition-colors">
              <span className="text-sm font-medium text-aurora-primary">
                + Agendar nueva cita
              </span>
            </li>
          </ul>
        </div>

        {/* Historial de Tratamientos */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-aurora-accent/20">
          <h3 className="text-lg font-serif font-semibold text-aurora-dark mb-4 border-b border-aurora-light pb-2">
            Historial de Tratamientos
          </h3>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:w-0.5 before:bg-aurora-accent">
            {/* Timeline item */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               {/* Timeline dot */}
               <div className="flex items-center justify-center w-4 h-4 rounded-full bg-aurora-primary border-4 border-white shadow absolute left-5 md:left-1/2 -translate-x-1/2" />
               <div className="w-full md:w-5/12 ml-12 md:ml-0 p-4 bg-aurora-light rounded-xl">
                 <p className="font-medium text-aurora-dark text-sm">Limpieza Facial</p>
                 <span className="text-xs text-aurora-text/70 mt-1 block">01 Septiembre, 2023</span>
               </div>
            </div>

            {/* Timeline item */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               {/* Timeline dot */}
               <div className="flex items-center justify-center w-4 h-4 rounded-full bg-aurora-primary border-4 border-white shadow absolute left-5 md:left-1/2 -translate-x-1/2" />
               <div className="w-full md:w-5/12 ml-12 md:ml-0 p-4 bg-aurora-light rounded-xl">
                 <p className="font-medium text-aurora-dark text-sm">Evaluación Inicial</p>
                 <span className="text-xs text-aurora-text/70 mt-1 block">15 Agosto, 2023</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

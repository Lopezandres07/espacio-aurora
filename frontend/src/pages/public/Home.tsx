import { WhatsAppModal } from '../../components/WhatsAppModal'

export const Home = () => {
  return (
    <div className='bg-aurora-light'>
      {/* Hero Section */}
      <section className='relative bg-white pt-24 pb-32 overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center'>
          <h1 className='text-5xl md:text-6xl font-serif font-bold text-aurora-dark mb-6 tracking-tight'>
            Realza tu esencia
          </h1>
          <p className='mt-4 text-xl text-aurora-text max-w-2xl mx-auto'>
            Descubre tratamientos no invasivos de vanguardia para cuidar tu piel
            y resaltar tu belleza natural con total seguridad.
          </p>
          <div className='mt-10 flex justify-center gap-4'>
            <button className='px-8 py-4 rounded-full bg-aurora-primary text-white font-medium hover:bg-aurora-dark transition-all duration-300 shadow-md'>
              Agendar Cita
            </button>
            <button className='px-8 py-4 rounded-full bg-aurora-accent text-aurora-dark font-medium hover:bg-white border border-aurora-primary/20 transition-all duration-300 shadow-sm'>
              Ver Tratamientos
            </button>
          </div>
        </div>

        {/* Soft decorative blob */}
        <div className='absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-aurora-accent/40 blur-3xl' />
        <div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-aurora-primary/10 blur-3xl' />
      </section>

      {/* Services Grid Section */}
      <section className='py-24 bg-aurora-light'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-aurora-dark'>
              Nuestros Servicios
            </h2>
            <p className='mt-4 text-aurora-text max-w-2xl mx-auto'>
              Tratamientos estéticos personalizados para resultados
              excepcionales.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Service Card */}
            <div className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='h-48 rounded-xl bg-aurora-accent/50 mb-6 flex items-center justify-center'>
                <span className='text-aurora-primary font-medium'>
                  [ Imagen Pink Glow ]
                </span>
              </div>
              <h3 className='text-xl font-serif font-semibold text-aurora-dark mb-2'>
                Pink Glow
              </h3>
              <p className='text-aurora-text text-sm leading-relaxed mb-4'>
                Exclusivo cóctel de vitaminas, aminoácidos y ácido hialurónico
                para hidratar y unificar el tono de la piel.
              </p>
              <button className='text-aurora-dark font-medium text-sm hover:text-aurora-primary transition-colors flex items-center gap-2'>
                Saber más →
              </button>
            </div>

            {/* Service Card 2 */}
            <div className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='h-48 rounded-xl bg-aurora-accent/50 mb-6 flex items-center justify-center'>
                <span className='text-aurora-primary font-medium'>
                  [ Imagen PRP ]
                </span>
              </div>
              <h3 className='text-xl font-serif font-semibold text-aurora-dark mb-2'>
                PRP (Plasma Rico en Plaquetas)
              </h3>
              <p className='text-aurora-text text-sm leading-relaxed mb-4'>
                Tratamiento autólogo estimulador de colágeno y elastina para
                rejuvenecimiento facial.
              </p>
              <button className='text-aurora-dark font-medium text-sm hover:text-aurora-primary transition-colors flex items-center gap-2'>
                Saber más →
              </button>
            </div>

            {/* Service Card 3 */}
            <div className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='h-48 rounded-xl bg-aurora-accent/50 mb-6 flex items-center justify-center'>
                <span className='text-aurora-primary font-medium'>
                  [ Imagen Toxina ]
                </span>
              </div>
              <h3 className='text-xl font-serif font-semibold text-aurora-dark mb-2'>
                Toxina Botulínica
              </h3>
              <p className='text-aurora-text text-sm leading-relaxed mb-4'>
                Prevención y tratamiento de arrugas dinámicas logrando un
                aspecto descansado artificial.
              </p>
              <button className='text-aurora-dark font-medium text-sm hover:text-aurora-primary transition-colors flex items-center gap-2'>
                Saber más →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className='py-24 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row items-center gap-12'>
            <div className='w-full md:w-1/2'>
              <div className='aspect-square rounded-3xl bg-aurora-accent/30 overflow-hidden relative'>
                <div className='absolute inset-0 flex items-center justify-center text-aurora-primary/70'>
                  [ Foto Profesional de Tu Esposa ]
                </div>
              </div>
            </div>
            <div className='w-full md:w-1/2 space-y-6'>
              <h2 className='text-3xl font-serif font-bold text-aurora-dark'>
                Sobre Mí
              </h2>
              <p className='text-aurora-text leading-relaxed'>
                Soy especialista en medicina estética dedicada a potenciar la
                belleza única de cada persona. Mi enfoque se basa en resultados
                naturales, la seguridad del paciente y la utilización de
                productos de la más alta calidad.
              </p>
              <p className='text-aurora-text leading-relaxed'>
                En Espacio Aurora creemos que cuidarte es un acto de amor propio
                y estamos aquí para acompañarte.
              </p>
              <div className='pt-4 border-t border-aurora-accent'>
                <p className='font-serif italic text-lg text-aurora-dark'>
                  "Tu bienestar es nuestra prioridad."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof (Placeholder) */}
      <section className='py-24 bg-aurora-light'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-3xl font-serif font-bold text-aurora-dark mb-12'>
            Síguenos en Instagram
          </h2>
          <div className='flex justify-center gap-4 flex-wrap'>
            {/* Carrusel placeholder */}
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className='w-48 h-48 bg-aurora-accent rounded-xl shadow-sm flex items-center justify-center'
              >
                <span className='text-aurora-primary text-sm'>
                  [ Post {idx} ]
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppModal />
    </div>
  )
}

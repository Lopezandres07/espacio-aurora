import { useState } from 'react'

// Soft Luxury Design aesthetics applied: minimal backdrop, soft shadow, rounded corners
export const WhatsAppModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        data-testid='whatsapp-floating-button'
        className='fixed bottom-6 right-6 z-50 p-4 bg-aurora-primary text-white rounded-full shadow-lg hover:bg-aurora-dark transition-all duration-300 hover:scale-105'
        aria-label='Contacto por WhatsApp'
      >
        <span className='font-sans font-medium'>Contactar</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
          <div
            className='bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden'
            data-testid='whatsapp-modal-content'
          >
            <div className='p-6 bg-aurora-accent border-b border-aurora-light'>
              <h3 className='font-serif text-xl font-bold text-aurora-dark text-center'>
                Espacio Aurora
              </h3>
              <p className='text-sm text-aurora-text text-center mt-1'>
                Realza tu esencia
              </p>
            </div>
            <div className='p-6 space-y-4'>
              <p className='text-aurora-text text-sm mb-4'>
                ¿En qué tratamiento estás interesado/a?
              </p>

              <div className='space-y-2'>
                <button className='w-full text-left p-3 rounded-xl hover:bg-aurora-accent border border-transparent hover:border-aurora-primary transition-colors text-sm'>
                  Pink Glow
                </button>
                <button className='w-full text-left p-3 rounded-xl hover:bg-aurora-accent border border-transparent hover:border-aurora-primary transition-colors text-sm'>
                  PRP (Plasma Rico en Plaquetas)
                </button>
                <button className='w-full text-left p-3 rounded-xl hover:bg-aurora-accent border border-transparent hover:border-aurora-primary transition-colors text-sm'>
                  Otro / Consultar
                </button>
              </div>
            </div>
            <div className='p-4 border-t border-aurora-accent flex justify-end'>
              <button
                onClick={() => setIsOpen(false)}
                className='px-4 py-2 text-sm text-aurora-text hover:text-aurora-dark transition-colors'
                data-testid='whatsapp-modal-close'
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

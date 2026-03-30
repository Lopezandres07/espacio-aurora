import { Request, Response } from 'express';
import { prisma } from '../server';

export const contactLead = async (req: Request, res: Response) => {
  try {
    const { name, serviceId, userId } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre es obligatorio para el contacto' });
    }

    // Ejecutar creación de lead y búsqueda de servicio en paralelo para optimizar
    const [lead, service] = await Promise.all([
      prisma.lead.create({
        data: {
          name,
          userId: userId || null,
          serviceId: serviceId || null,
        }
      }),
      serviceId ? prisma.service.findUnique({ where: { id: serviceId } }) : Promise.resolve(null)
    ]);

    const serviceName = service ? service.name : 'un servicio';

    // Generar el link para redirigir a WhatsApp
    const whatsappNumber = process.env.WHATSAPP_NUMBER || '1234567890'; 
    const message = `Hola, mi nombre es ${name} y me interesa agendar el servicio de ${serviceName}.`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

    res.status(200).json({ 
      message: 'Contacto registrado correctamente',
      leadId: lead.id,
      whatsappLink
    });

  } catch (error: any) {
    console.error('❌ Error al registrar el contacto:', error);
    if (error.code === 'P2003') { // Foreign key constraint failed
      return res.status(400).json({ error: 'El servicio o usuario especificado no existe' });
    }
    res.status(500).json({ error: 'Error interno del servidor al procesar el contacto' });
  }
};

import { Request, Response } from 'express';
import { prisma } from '../server';

export const contactLead = async (req: Request, res: Response) => {
  try {
    const { name, serviceId, userId } = req.body;
    let serviceName = 'un servicio';

    // Guardar el registro para métricas
    const lead = await prisma.lead.create({
      data: {
        name,
        userId: userId || null,
        serviceId: serviceId || null,
      }
    });

    if (serviceId) {
      const service = await prisma.service.findUnique({ where: { id: serviceId } });
      if (service) {
        serviceName = service.name;
      }
    }

    // Generar el link para redirigir a WhatsApp
    const whatsappNumber = process.env.WHATSAPP_NUMBER || '1234567890'; // Configurar en .env
    const message = `Hola, mi nombre es ${name} y me interesa agendar el servicio de ${serviceName}.`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

    res.status(200).json({ 
      message: 'Contacto registrado correctamente',
      leadId: lead.id,
      whatsappLink
    });

  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor al procesar el contacto' });
  }
};

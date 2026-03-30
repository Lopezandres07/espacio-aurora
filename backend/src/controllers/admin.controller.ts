import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const dateQuery = req.query.date ? new Date(req.query.date as string) : new Date();
    const skip = parseInt(req.query.skip as string) || 0;
    const take = parseInt(req.query.take as string) || 50;
    
    // Filtro por día si se pasa 'date' por query, sino todas o las de hoy
    // Simplificado temporalmente a traer citas
    const appointments = await prisma.appointment.findMany({
      skip,
      take,
      include: {
        user: { select: { id: true, name: true, phone: true } },
        service: true
      },
      orderBy: { date: 'asc' }
    });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("❌ Error al obtener la agenda:", error);
    res.status(500).json({ error: 'Error al obtener la agenda' });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // PENDING, COMPLETED, CANCELLED

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status }
    });

    res.status(200).json({ message: 'Estado actualizado', appointment: updated });
  } catch (error) {
    console.error("❌ Error al actualizar la cita:", error);
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
};

export const getClientHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // userId
    const skip = parseInt(req.query.skip as string) || 0;
    const take = parseInt(req.query.take as string) || 50;

    const history = await prisma.appointment.findMany({
      where: { userId: id, status: 'COMPLETED' },
      skip,
      take,
      include: { service: true },
      orderBy: { date: 'desc' }
    });

    res.status(200).json({ clientHistory: history });
  } catch (error) {
    console.error("❌ Error al buscar el historial del cliente:", error);
    res.status(500).json({ error: 'Error al buscar el historial del cliente' });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { userId, serviceId, date, evaluationNotes } = req.body;

    if (!userId || !serviceId || !date) {
      return res.status(400).json({ error: 'Faltan campos requeridos (userId, serviceId, date)' });
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId,
        serviceId,
        date: new Date(date),
        evaluationNotes: evaluationNotes || '',
      }
    });

    res.status(201).json({ message: 'Cita agendada correctamente', appointment });
  } catch (error) {
    console.error("❌ Error al agendar la cita manualmente:", error);
    res.status(500).json({ error: 'Error al agendar la cita manualmente' });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const skip = parseInt(req.query.skip as string) || 0;
    const take = parseInt(req.query.take as string) || 50;

    const clients = await prisma.user.findMany({
      where: { role: 'CLIENT' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        medicalHistory: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take
    });

    res.status(200).json({ clients });
  } catch (error) {
    console.error("❌ Error al obtener la lista de pacientes:", error);
    res.status(500).json({ error: 'Error al obtener la lista de pacientes' });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [totalLeads, totalAppointments, servicesStats] = await Promise.all([
      prisma.lead.count(),
      prisma.appointment.count(),
      prisma.service.findMany({
        include: {
          _count: {
            select: { leads: true, appointments: true }
          }
        }
      })
    ]);

    const statsByService = servicesStats.map((s: any) => ({
      id: s.id,
      name: s.name,
      leads: s._count.leads,
      appointments: s._count.appointments,
      conversionRate: s._count.leads > 0 
        ? ((s._count.appointments / s._count.leads) * 100).toFixed(2) + '%' 
        : '0%'
    }));

    res.status(200).json({
      totalLeads,
      totalAppointments,
      globalConversionRate: totalLeads > 0 
        ? ((totalAppointments / totalLeads) * 100).toFixed(2) + '%' 
        : '0%',
      statsByService
    });
  } catch (error) {
    console.error("❌ Error al generar estadísticas del dashboard:", error);
    res.status(500).json({ error: 'Error al generar estadísticas del dashboard' });
  }
};

export const getServicesAdmin = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ services });
  } catch (error) {
    console.error("❌ Error al obtener servicios:", error);
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
    }

    const service = await prisma.service.create({
      data: { name, description: description || '', price: parseFloat(price) }
    });

    res.status(201).json({ message: 'Servicio creado', service });
  } catch (error) {
    console.error("❌ Error al crear el servicio:", error);
    res.status(500).json({ error: 'Error al crear el servicio' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const service = await prisma.service.update({
      where: { id },
      data: { 
        name, 
        description, 
        price: price !== undefined ? parseFloat(price) : undefined 
      }
    });

    res.status(200).json({ message: 'Servicio actualizado', service });
  } catch (error) {
    console.error("❌ Error al actualizar el servicio:", error);
    res.status(500).json({ error: 'Error al actualizar el servicio' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id } });
    res.status(200).json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    console.error("❌ Error al eliminar el servicio:", error);
    res.status(500).json({ error: 'Error al eliminar el servicio' });
  }
};

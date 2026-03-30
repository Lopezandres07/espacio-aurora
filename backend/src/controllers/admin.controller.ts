import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const dateQuery = req.query.date ? new Date(req.query.date as string) : new Date();
    
    // Filtro por día si se pasa 'date' por query, sino todas o las de hoy
    // Simplificado temporalmente a traer citas
    const appointments = await prisma.appointment.findMany({
      include: {
        user: { select: { id: true, name: true, phone: true } },
        service: true
      },
      orderBy: { date: 'asc' }
    });

    res.status(200).json({ appointments });
  } catch (error) {
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
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
};

export const getClientHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // userId

    const history = await prisma.appointment.findMany({
      where: { userId: id, status: 'COMPLETED' },
      include: { service: true },
      orderBy: { date: 'desc' }
    });

    res.status(200).json({ clientHistory: history });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el historial del cliente' });
  }
};

import { Request, Response } from 'express';
import { prisma } from '../server';

interface AuthRequest extends Request {
  user?: any;
}

export const getMyAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const appointments = await prisma.appointment.findMany({
      where: { userId },
      include: { service: true },
      orderBy: { date: 'desc' }
    });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("❌ Error al obtener tus citas:", error);
    res.status(500).json({ error: 'Error al obtener tus citas' });
  }
};

export const getMyHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const history = await prisma.appointment.findMany({
      where: { userId, status: 'COMPLETED' },
      include: { service: true },
      orderBy: { date: 'desc' }
    });

    res.status(200).json({ history });
  } catch (error) {
    console.error("❌ Error al obtener tu historial:", error);
    res.status(500).json({ error: 'Error al obtener tu historial' });
  }
};

import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAllServices = async (req: Request, res: Response) => {
    try {
        const services = await prisma.service.findMany();
        res.status(200).json({ services });
    } catch (error) {
        console.error("❌ Error al obtener los servicios:", error);
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
}

export const getServiceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await prisma.service.findUnique({ where: { id } });

        if (!service) {
            return res.status(404).json({ error: 'El servicio solicitado no existe' });
        }

        res.status(200).json({ service });
    } catch (error) {
        console.error("❌ Error al obtener el servicio:", error);
        res.status(500).json({ error: 'Error al obtener el servicio' });
    }
}
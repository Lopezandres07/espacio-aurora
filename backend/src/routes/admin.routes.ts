import { Router } from 'express';
import { getAppointments, updateAppointmentStatus, getClientHistory, createAppointment, getClients, getDashboardStats, getServicesAdmin, createService, updateService, deleteService } from '../controllers/admin.controller';
import { authenticateToken, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken, requireAdmin);

router.get('/appointments', getAppointments);
router.post('/appointments', createAppointment);
router.patch('/appointments/:id/status', updateAppointmentStatus);

router.get('/clients', getClients);
router.get('/clients/:id/history', getClientHistory);

router.get('/services', getServicesAdmin);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

router.get('/dashboard/stats', getDashboardStats);

export default router;

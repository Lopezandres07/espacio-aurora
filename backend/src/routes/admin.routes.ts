import { Router } from 'express';
import { getAppointments, updateAppointmentStatus, getClientHistory } from '../controllers/admin.controller';
import { authenticateToken, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas de admin estarán protegidas por token y rol ADMIN
router.use(authenticateToken, requireAdmin);

router.get('/appointments', getAppointments);
router.patch('/appointments/:id/status', updateAppointmentStatus);
router.get('/clients/:id/history', getClientHistory);

export default router;

import { Router } from 'express';
import { getMyAppointments, getMyHistory } from '../controllers/appointment.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Rutas protegidas para Clientes
router.use(authenticateToken);

router.get('/me', getMyAppointments);
router.get('/me/history', getMyHistory);

export default router;

import { Router } from 'express';
import { register, login, validateUser } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/validate-token', authenticateToken, validateUser)

export default router;

import { Router } from 'express';
import { contactLead } from '../controllers/lead.controller';

const router = Router();

// Endpoint para el botón de WhatsApp
router.post('/contact', contactLead);

export default router;

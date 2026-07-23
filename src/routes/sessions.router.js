import { Router } from 'express';
import { sessionsController } from '../controllers/sessions.controller.js';

const router = Router();

/**
 * @route GET /api/sessions
 * @desc Estado inicial de la estructura de sesiones
 */
router.get('/', sessionsController.getSessionStatus);

export default router;

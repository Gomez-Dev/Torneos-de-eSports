import { Router } from 'express';
import { healthController } from '../controllers/health.controller.js';

const router = Router();

/**
 * @route GET /api/health
 * @desc Verificación del estado del servidor
 */
router.get('/', healthController.getHealth);

export default router;

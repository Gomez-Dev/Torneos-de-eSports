import { Router } from 'express';
import { eventsController } from '../controllers/events.controller.js';

const router = Router();

/**
 * @route GET /api/events
 * @desc Obtener lista de torneos de eSports
 */
router.get('/', eventsController.getAllEvents);

/**
 * @route GET /api/events/:id
 * @desc Obtener detalle de un torneo por ID
 */
router.get('/:id', eventsController.getEventById);

export default router;

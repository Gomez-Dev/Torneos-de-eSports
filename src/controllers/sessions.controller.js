import { sessionsService } from '../services/sessions.service.js';

/**
 * Controlador de Sesiones.
 * Estructura inicial preparada para futuras entregas (Registro, Login, Auth, JWT).
 */
export class SessionsController {
  constructor(service = sessionsService) {
    this.service = service;
  }

  getSessionStatus = async (req, res, next) => {
    try {
      const statusInfo = await this.service.getSessionStatus();
      res.status(200).json({
        status: 'success',
        payload: statusInfo,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const sessionsController = new SessionsController();
export default sessionsController;

import { eventsService } from '../services/events.service.js';

/**
 * Controlador de Eventos (Torneos de eSports).
 * Maneja las peticiones HTTP, extrae parámetros, invoca al servicio y formatea la respuesta.
 */
export class EventsController {
  constructor(service = eventsService) {
    this.service = service;
  }

  getAllEvents = async (req, res, next) => {
    try {
      const events = await this.service.getAllEvents();
      res.status(200).json({
        status: 'success',
        payload: events,
      });
    } catch (error) {
      next(error);
    }
  };

  getEventById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await this.service.getEventById(id);
      if (!event) {
        return res.status(404).json({
          status: 'error',
          error: 'Torneo no encontrado',
        });
      }
      res.status(200).json({
        status: 'success',
        payload: event,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const eventsController = new EventsController();
export default eventsController;

import { eventsRepository } from '../repositories/events.repository.js';

/**
 * Servicio de Eventos.
 * Contiene toda la lógica de negocio para torneos de eSports.
 * No conoce ni maneja detalles de HTTP (req, res) ni detalles de base de datos directa.
 */
export class EventsService {
  constructor(repository = eventsRepository) {
    this.repository = repository;
  }

  async getAllEvents() {
    // Aquí residirán validaciones, filtros y reglas de negocio
    return await this.repository.getAllEvents();
  }

  async getEventById(id) {
    return await this.repository.getEventById(id);
  }

  async createEvent(eventData) {
    return await this.repository.createEvent(eventData);
  }

  async updateEvent(id, eventData) {
    return await this.repository.updateEvent(id, eventData);
  }

  async deleteEvent(id) {
    return await this.repository.deleteEvent(id);
  }
}

export const eventsService = new EventsService();
export default eventsService;

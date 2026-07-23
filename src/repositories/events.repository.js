import { eventsDao } from '../dao/events.dao.js';

/**
 * Repositorio de Eventos.
 * Actúa como intermediario entre la capa de Servicios y el DAO.
 * Aplica el patrón Repository para desacoplar las reglas de negocio de la implementación de la base de datos.
 */
export class EventsRepository {
  constructor(dao = eventsDao) {
    this.dao = dao;
  }

  async getAllEvents() {
    return await this.dao.getAll();
  }

  async getEventById(id) {
    return await this.dao.getById(id);
  }

  async createEvent(eventData) {
    return await this.dao.create(eventData);
  }

  async updateEvent(id, eventData) {
    return await this.dao.update(id, eventData);
  }

  async deleteEvent(id) {
    return await this.dao.delete(id);
  }
}

export const eventsRepository = new EventsRepository();
export default eventsRepository;

import ticketsDao from "../dao/tickets.dao.js";

class TicketsRepository {
  constructor(dao = ticketsDao) {
    this.dao = dao;
  }

  async findById(id) {
    return await this.dao.findById(id);
  }

  async findByUser(userId) {
    return await this.dao.findByUser(userId);
  }

  async findByEvent(eventId) {
    return await this.dao.findByEvent(eventId);
  }

  async findActiveByUserAndEvent(userId, eventId) {
    return await this.dao.findActiveByUserAndEvent(userId, eventId);
  }

  async countActiveByEvent(eventId) {
    return await this.dao.countActiveByEvent(eventId);
  }

  async create(ticketData) {
    return await this.dao.create(ticketData);
  }

  async update(id, ticketData) {
    return await this.dao.update(id, ticketData);
  }
}

export const ticketsRepository = new TicketsRepository();

export default ticketsRepository;

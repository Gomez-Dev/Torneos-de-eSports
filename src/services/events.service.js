import eventsRepository from "../repositories/events.repository.js";

class EventsService {
  constructor() {
    this.eventsRepository = eventsRepository;
  }

  async getAllEvents() {
    return await this.eventsRepository.getAllEvents();
  }

  async getEventById(id) {
    const event = await this.eventsRepository.getEventById(id);

    if (!event) {
      throw new Error("Evento no encontrado");
    }

    return event;
  }

  async createEvent(eventData, userId) {
    return await this.eventsRepository.createEvent({
      ...eventData,
      organizer: userId,
    });
  }

  async updateEvent(id, eventData, user) {
    const event = await this.eventsRepository.getEventById(id);

    if (!event) {
      throw new Error("Evento no encontrado");
    }

    const isAdmin = user.role === "admin";
    const isOwner = event.organizer.toString() === user.id.toString();

    if (!isAdmin && !isOwner) {
      throw new Error("No tenés permisos para modificar este evento");
    }

    return await this.eventsRepository.updateEvent(id, eventData);
  }

  async deleteEvent(id, user) {
    const event = await this.eventsRepository.getEventById(id);

    if (!event) {
      throw new Error("Evento no encontrado");
    }

    const isAdmin = user.role === "admin";
    const isOwner = event.organizer.toString() === user.id.toString();

    if (!isAdmin && !isOwner) {
      throw new Error("No tenés permisos para eliminar este evento");
    }

    return await this.eventsRepository.deleteEvent(id);
  }
}

export default EventsService;

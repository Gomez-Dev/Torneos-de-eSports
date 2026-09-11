import eventsRepository from "../repositories/events.repository.js";

class EventsService {
  constructor() {
    this.eventsRepository = eventsRepository;
  }

  async getAllEvents(query = {}) {
    const {
      status,
      category,
      location,
      dateFrom,
      dateTo,
      page = 1,
      limit = 10,
      sort = "date",
    } = query;

    const filters = {};

    if (status) {
      filters.status = status;
    }

    if (category) {
      filters.category = category;
    }

    if (location) {
      filters.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (dateFrom || dateTo) {
      filters.date = {};

      if (dateFrom) {
        const from = new Date(dateFrom);

        if (Number.isNaN(from.getTime())) {
          const error = new Error("La fecha dateFrom no es válida");
          error.statusCode = 400;
          throw error;
        }

        filters.date.$gte = from;
      }

      if (dateTo) {
        const to = new Date(dateTo);

        if (Number.isNaN(to.getTime())) {
          const error = new Error("La fecha dateTo no es válida");
          error.statusCode = 400;
          throw error;
        }

        filters.date.$lte = to;
      }
    }

    const currentPage = Math.max(Number(page), 1);
    const currentLimit = Math.max(Number(limit), 1);

    const allowedSortFields = [
      "date",
      "title",
      "capacity",
      "price",
      "createdAt",
    ];

    let sortField = "date";
    let sortOrder = 1;

    if (sort) {
      const requestedSort = sort.startsWith("-") ? sort.substring(1) : sort;

      if (allowedSortFields.includes(requestedSort)) {
        sortField = requestedSort;
        sortOrder = sort.startsWith("-") ? -1 : 1;
      }
    }

    const total = await this.eventsRepository.countEvents(filters);

    const events = await this.eventsRepository.getAllEvents(filters, {
      page: currentPage,
      limit: currentLimit,
      sort: {
        [sortField]: sortOrder,
      },
    });

    const totalPages = Math.ceil(total / currentLimit);

    return {
      data: events,
      page: currentPage,
      limit: currentLimit,
      total,
      totalPages,
    };
  }

  async getEventById(id) {
    const event = await this.eventsRepository.getEventById(id);

    if (!event) {
      const error = new Error("Evento no encontrado");
      error.statusCode = 404;
      throw error;
    }

    return event;
  }

  async createEvent(eventData, userId) {
    const {
      title,
      description,
      category,
      date,
      location,
      capacity,
      price,
      status,
    } = eventData;

    if (!title || !description || !category || !date || !location) {
      const error = new Error("Faltan campos obligatorios");
      error.statusCode = 400;
      throw error;
    }

    const eventDate = new Date(date);

    if (Number.isNaN(eventDate.getTime())) {
      const error = new Error("La fecha del evento no es válida");
      error.statusCode = 400;
      throw error;
    }

    if (eventDate < new Date()) {
      const error = new Error(
        "No se puede crear un evento con una fecha pasada",
      );
      error.statusCode = 400;
      throw error;
    }

    if (capacity === undefined || Number(capacity) <= 0) {
      const error = new Error("La capacidad debe ser mayor a 0");
      error.statusCode = 400;
      throw error;
    }

    if (price === undefined || Number(price) < 0) {
      const error = new Error("El precio no puede ser menor a 0");
      error.statusCode = 400;
      throw error;
    }

    if (
      status &&
      !["draft", "published", "cancelled", "finished"].includes(status)
    ) {
      const error = new Error("El estado del evento no es válido");
      error.statusCode = 400;
      throw error;
    }

    return await this.eventsRepository.createEvent({
      title,
      description,
      category,
      date: eventDate,
      location,
      capacity,
      price,
      status: status || "published",
      organizer: userId,
    });
  }

  async updateEvent(id, eventData, user) {
    const event = await this.eventsRepository.getEventById(id);

    if (!event) {
      const error = new Error("Evento no encontrado");
      error.statusCode = 404;
      throw error;
    }

    const isAdmin = user.role === "admin";
    const isOwner = event.organizer.toString() === user.id.toString();

    if (!isAdmin && !isOwner) {
      const error = new Error("No tenés permisos para modificar este evento");
      error.statusCode = 403;
      throw error;
    }

    if (event.status === "cancelled") {
      const justification = eventData.justification;

      if (!justification || !justification.trim()) {
        const error = new Error(
          "Un evento cancelado solo puede modificarse presentando una justificación",
        );
        error.statusCode = 400;
        throw error;
      }
    }

    if (eventData.date !== undefined) {
      const eventDate = new Date(eventData.date);

      if (Number.isNaN(eventDate.getTime())) {
        const error = new Error("La fecha del evento no es válida");
        error.statusCode = 400;
        throw error;
      }

      if (eventDate < new Date()) {
        const error = new Error(
          "No se puede modificar el evento a una fecha pasada",
        );
        error.statusCode = 400;
        throw error;
      }

      eventData.date = eventDate;
    }

    if (eventData.capacity !== undefined && Number(eventData.capacity) <= 0) {
      const error = new Error("La capacidad debe ser mayor a 0");
      error.statusCode = 400;
      throw error;
    }

    if (eventData.price !== undefined && Number(eventData.price) < 0) {
      const error = new Error("El precio no puede ser menor a 0");
      error.statusCode = 400;
      throw error;
    }

    if (
      eventData.status === "published" &&
      (event.status === "finished" || event.status === "cancelled")
    ) {
      const error = new Error(
        "No se puede publicar un evento finalizado o cancelado",
      );
      error.statusCode = 400;
      throw error;
    }

    delete eventData.organizer;
    delete eventData.justification;

    return await this.eventsRepository.updateEvent(id, eventData);
  }

  async updateEventStatus(id, status, user, justification) {
    const event = await this.eventsRepository.getEventById(id);

    if (!event) {
      const error = new Error("Evento no encontrado");
      error.statusCode = 404;
      throw error;
    }

    const isAdmin = user.role === "admin";
    const isOwner = event.organizer.toString() === user.id.toString();

    if (!isAdmin && !isOwner) {
      const error = new Error("No tenés permisos para modificar este evento");
      error.statusCode = 403;
      throw error;
    }

    const allowedStatuses = ["draft", "published", "cancelled", "finished"];

    if (!allowedStatuses.includes(status)) {
      const error = new Error("El estado del evento no es válido");
      error.statusCode = 400;
      throw error;
    }

    if (
      status === "published" &&
      (event.status === "finished" || event.status === "cancelled")
    ) {
      const error = new Error(
        "No se puede publicar un evento finalizado o cancelado",
      );
      error.statusCode = 400;
      throw error;
    }

    if (event.status === "cancelled") {
      if (!justification || !justification.trim()) {
        const error = new Error(
          "Un evento cancelado solo puede modificarse presentando una justificación",
        );
        error.statusCode = 400;
        throw error;
      }
    }

    return await this.eventsRepository.updateEvent(id, {
      status,
    });
  }
}

export default EventsService;

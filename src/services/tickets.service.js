import crypto from "node:crypto";

import ticketsRepository from "../repositories/tickets.repository.js";
import eventsRepository from "../repositories/events.repository.js";
import { sendConfirmationEmail } from "../utils/mailer.js";

class TicketsService {
  constructor(ticketsRepo = ticketsRepository, eventsRepo = eventsRepository) {
    this.ticketsRepository = ticketsRepo;
    this.eventsRepository = eventsRepo;
  }

  async createTicket(eventId, user, quantity) {
    const event = await this.eventsRepository.getEventById(eventId);

    if (!event) {
      const error = new Error("Evento no encontrado");
      error.statusCode = 404;
      throw error;
    }

    if (event.status !== "published") {
      const error = new Error(
        "Solo es posible inscribirse a eventos publicados",
      );
      error.statusCode = 400;
      throw error;
    }

    if (new Date(event.date) <= new Date()) {
      const error = new Error(
        "No es posible inscribirse a un evento que ya comenzó o finalizó",
      );
      error.statusCode = 400;
      throw error;
    }

    const numericQuantity = Number(quantity);

    if (
      quantity === undefined ||
      quantity === null ||
      quantity === "" ||
      !Number.isInteger(numericQuantity) ||
      numericQuantity <= 0
    ) {
      const error = new Error(
        "La cantidad debe ser un número entero mayor a 0",
      );
      error.statusCode = 400;
      throw error;
    }

    const existingTicket =
      await this.ticketsRepository.findActiveByUserAndEvent(user.id, eventId);

    if (existingTicket) {
      const error = new Error(
        "El usuario ya tiene una inscripción activa para este evento",
      );
      error.statusCode = 409;
      throw error;
    }

    const occupiedSeats =
      await this.ticketsRepository.countActiveByEvent(eventId);

    const availableSeats = event.capacity - occupiedSeats;

    if (availableSeats < numericQuantity) {
      const error = new Error(
        `No hay cupos suficientes. Cupos disponibles: ${availableSeats}`,
      );
      error.statusCode = 409;
      throw error;
    }

    const reservationCode = crypto.randomUUID();

    const ticket = await this.ticketsRepository.create({
      user: user.id,
      event: eventId,
      status: "confirmed",
      quantity: numericQuantity,
      reservationCode,
      createdAt: new Date(),
    });

    await sendConfirmationEmail({
      to: user.email,
      reservationCode,
      event,
      quantity: numericQuantity,
    });

    return ticket;
  }

  async getMyTickets(userId) {
    return await this.ticketsRepository.findByUser(userId);
  }

  async getEventTickets(eventId, user) {
    const event = await this.eventsRepository.getEventById(eventId);

    if (!event) {
      const error = new Error("Evento no encontrado");
      error.statusCode = 404;
      throw error;
    }

    const isAdmin = user.role === "admin";

    const isOwner = event.organizer.toString() === user.id.toString();

    if (!isAdmin && !isOwner) {
      const error = new Error(
        "No tenés permisos para consultar los tickets de este evento",
      );
      error.statusCode = 403;
      throw error;
    }

    return await this.ticketsRepository.findByEvent(eventId);
  }

  async cancelTicket(ticketId, user) {
    const ticket = await this.ticketsRepository.findById(ticketId);

    if (!ticket) {
      const error = new Error("Ticket no encontrado");
      error.statusCode = 404;
      throw error;
    }

    const isAdmin = user.role === "admin";

    const isOwner = ticket.user.toString() === user.id.toString();

    if (!isAdmin && !isOwner) {
      const error = new Error("No tenés permisos para cancelar este ticket");
      error.statusCode = 403;
      throw error;
    }

    if (ticket.status === "cancelled") {
      const error = new Error("El ticket ya está cancelado");
      error.statusCode = 400;
      throw error;
    }

    return await this.ticketsRepository.update(ticketId, {
      status: "cancelled",
      cancelledAt: new Date(),
    });
  }
}

export default TicketsService;

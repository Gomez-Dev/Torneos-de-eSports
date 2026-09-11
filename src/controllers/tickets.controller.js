import TicketsService from "../services/tickets.service.js";
import { ticketDTO } from "../dto/ticket.dto.js";

const ticketsService = new TicketsService();

export const createTicket = async (req, res, next) => {
  try {
    const ticket = await ticketsService.createTicket(
      req.params.eid,
      req.user,
      req.body.quantity,
    );

    res.status(201).json({
      status: "success",
      payload: ticketDTO(ticket),
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTickets = async (req, res, next) => {
  try {
    const tickets = await ticketsService.getMyTickets(req.user.id);

    res.status(200).json({
      status: "success",
      payload: tickets.map((ticket) => ticketDTO(ticket)),
    });
  } catch (error) {
    next(error);
  }
};

export const getEventTickets = async (req, res, next) => {
  try {
    const tickets = await ticketsService.getEventTickets(
      req.params.eid,
      req.user,
    );

    res.status(200).json({
      status: "success",
      payload: tickets.map((ticket) => ticketDTO(ticket)),
    });
  } catch (error) {
    next(error);
  }
};

export const cancelTicket = async (req, res, next) => {
  try {
    const ticket = await ticketsService.cancelTicket(req.params.tid, req.user);

    res.status(200).json({
      status: "success",
      payload: ticketDTO(ticket),
    });
  } catch (error) {
    next(error);
  }
};

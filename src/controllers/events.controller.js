import EventsService from "../services/events.service.js";
import { eventDTO } from "../dto/event.dto.js";

const eventsService = new EventsService();

export const getEvents = async (req, res, next) => {
  try {
    const result = await eventsService.getAllEvents(req.query);

    res.status(200).json({
      status: "success",
      data: result.data.map((event) => eventDTO(event)),
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await eventsService.getEventById(req.params.id);

    res.status(200).json({
      status: "success",
      payload: eventDTO(event),
    });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const event = await eventsService.createEvent(req.body, req.user.id);

    res.status(201).json({
      status: "success",
      payload: eventDTO(event),
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await eventsService.updateEvent(
      req.params.id,
      req.body,
      req.user,
    );

    res.status(200).json({
      status: "success",
      payload: eventDTO(event),
    });
  } catch (error) {
    next(error);
  }
};

export const updateEventStatus = async (req, res, next) => {
  try {
    const event = await eventsService.updateEventStatus(
      req.params.id,
      req.body.status,
      req.user,
      req.body.justification,
    );

    res.status(200).json({
      status: "success",
      payload: eventDTO(event),
    });
  } catch (error) {
    next(error);
  }
};

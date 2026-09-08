import EventsService from "../services/events.service.js";

const eventsService = new EventsService();

export const getEvents = async (req, res) => {
  try {
    const result = await eventsService.getAllEvents(req.query);

    res.status(200).json({
      status: "success",
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await eventsService.getEventById(req.params.id);

    res.status(200).json({
      status: "success",
      payload: event,
    });
  } catch (error) {
    if (error.message === "Evento no encontrado") {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = await eventsService.createEvent(req.body, req.user.id);

    res.status(201).json({
      status: "success",
      payload: event,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await eventsService.updateEvent(
      req.params.id,
      req.body,
      req.user,
    );

    res.status(200).json({
      status: "success",
      payload: event,
    });
  } catch (error) {
    if (error.message === "Evento no encontrado") {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }

    if (error.message.includes("No tenés permisos")) {
      return res.status(403).json({
        status: "error",
        message: error.message,
      });
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateEventStatus = async (req, res) => {
  try {
    const event = await eventsService.updateEventStatus(
      req.params.id,
      req.body.status,
      req.user,
      req.body.justification,
    );

    res.status(200).json({
      status: "success",
      payload: event,
    });
  } catch (error) {
    if (error.message === "Evento no encontrado") {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }

    if (error.message.includes("No tenés permisos")) {
      return res.status(403).json({
        status: "error",
        message: error.message,
      });
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

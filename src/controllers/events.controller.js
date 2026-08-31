import EventsService from "../services/events.service.js";

const eventsService = new EventsService();

export const getEvents = async (req, res) => {
  try {
    const events = await eventsService.getAllEvents();

    res.status(200).json({
      status: "success",
      payload: events,
    });
  } catch (error) {
    res.status(500).json({
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

export const deleteEvent = async (req, res) => {
  try {
    await eventsService.deleteEvent(req.params.id, req.user);

    res.status(200).json({
      status: "success",
      message: "Evento eliminado correctamente",
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

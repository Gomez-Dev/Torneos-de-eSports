import { Router } from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  updateEventStatus,
} from "../controllers/events.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { ROLES } from "../constants/roles.constants.js";

const router = Router();

// Eventos públicos
router.get("/", getEvents);
router.get("/:id", getEventById);

// Crear eventos: organizer o admin
router.post("/", auth, authorize(ROLES.ORGANIZER, ROLES.ADMIN), createEvent);

// Modificar eventos: organizer o admin
// El Service valida además la propiedad del evento.
router.put("/:id", auth, authorize(ROLES.ORGANIZER, ROLES.ADMIN), updateEvent);

// Cambiar estado: organizer o admin
// El Service valida además la propiedad del evento.
router.patch(
  "/:id/status",
  auth,
  authorize(ROLES.ORGANIZER, ROLES.ADMIN),
  updateEventStatus,
);

export default router;

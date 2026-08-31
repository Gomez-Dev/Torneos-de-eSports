import { Router } from "express";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { ROLES } from "../constants/roles.constants.js";

const router = Router();

// Eventos públicos
router.get("/", getEvents);

// Crear eventos: organizer o admin
router.post("/", auth, authorize(ROLES.ORGANIZER, ROLES.ADMIN), createEvent);

// Modificar eventos: organizer o admin
router.put("/:id", auth, authorize(ROLES.ORGANIZER, ROLES.ADMIN), updateEvent);

// Eliminar eventos: organizer o admin
router.delete(
  "/:id",
  auth,
  authorize(ROLES.ORGANIZER, ROLES.ADMIN),
  deleteEvent,
);

export default router;

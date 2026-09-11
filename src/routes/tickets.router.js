import { Router } from "express";

import {
  getMyTickets,
  cancelTicket,
} from "../controllers/tickets.controller.js";

import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

// Consultar los propios tickets
router.get("/my-tickets", auth, getMyTickets);

// Cancelar un ticket
router.patch("/:tid/cancel", auth, cancelTicket);

export default router;

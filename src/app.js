import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";

import "./config/passport.config.js";

import { errorHandler } from "./middlewares/error.middleware.js";

import healthRouter from "./routes/health.router.js";
import eventsRouter from "./routes/events.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js";
import ticketsRouter from "./routes/tickets.router.js";

const app = express();

// Middlewares

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(passport.initialize());

// Routes

app.use("/api/health", healthRouter);

app.use("/api/events", eventsRouter);

app.use("/api/sessions", sessionsRouter);

app.use("/api/users", usersRouter);

app.use("/api/tickets", ticketsRouter);

// Error handler

app.use(errorHandler);

export default app;

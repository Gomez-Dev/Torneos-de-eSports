import express from "express";
import cookieParser from "cookie-parser";

import healthRouter from "./routes/health.router.js";
import eventsRouter from "./routes/events.router.js";
import sessionsRouter from "./routes/sessions.router.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/health", healthRouter);
app.use("/api/events", eventsRouter);
app.use("/api/sessions", sessionsRouter);

export default app;

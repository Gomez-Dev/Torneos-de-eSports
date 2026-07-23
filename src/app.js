import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Importación de enrutadores
import healthRouter from './routes/health.router.js';
import eventsRouter from './routes/events.router.js';
import sessionsRouter from './routes/sessions.router.js';

// Importación de middlewares
import { requestLogger } from './middlewares/logger.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares para el procesamiento del body de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de registro de peticiones
app.use(requestLogger);

// Servir archivos estáticos (Panel de inspección interactiva para la vista previa)
app.use(express.static(path.join(__dirname, 'public')));

// Registro de Rutas
app.use('/api/health', healthRouter);
app.use('/api/events', eventsRouter);
app.use('/api/sessions', sessionsRouter);

// Middleware centralizado para el manejo de errores
app.use(errorHandler);

export default app;

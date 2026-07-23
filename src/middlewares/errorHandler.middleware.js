import { logger } from '../utils/logger.utils.js';

/**
 * Middleware centralizado de manejo de errores de Express.
 */
export const errorHandler = (err, req, res, next) => {
  logger.error(`Error no controlado en [${req.method}] ${req.url}:`, err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    status: 'error',
    error: message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};

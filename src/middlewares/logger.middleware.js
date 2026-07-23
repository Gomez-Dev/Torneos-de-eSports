import { logger } from '../utils/logger.utils.js';

/**
 * Middleware para registrar peticiones HTTP entrantes.
 */
export const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};

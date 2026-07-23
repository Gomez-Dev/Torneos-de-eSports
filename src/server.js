import app from './app.js';
import { config } from './config/environment.config.js';
import { logger } from './utils/logger.utils.js';

const PORT = config.port || 3000;

app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Servidor escuchando en el puerto ${PORT} en modo [${config.env}]`);
  logger.info(`API Health Check: http://localhost:${PORT}/api/health`);
  logger.info(`API Events Endpoint: http://localhost:${PORT}/api/events`);
});

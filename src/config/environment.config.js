import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

/**
 * Configuración centralizada de la aplicación.
 * Abstrae process.env para proveer valores por defecto y evitar
 * acoplamiento directo a process.env en otras capas.
 */
export const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/esports',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_key',
  }
};

export default config;

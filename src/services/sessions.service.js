import { sessionsRepository } from '../repositories/sessions.repository.js';

/**
 * Servicio de Sesiones y Autenticación.
 * Preparado para incluir lógica de registro, login, generación de JWT y hashing de contraseñas.
 */
export class SessionsService {
  constructor(repository = sessionsRepository) {
    this.repository = repository;
  }

  async getSessionStatus() {
    return {
      active: false,
      message: 'Módulo de sesiones inicializado (sin autenticación activa aún)',
    };
  }

  async register(userData) {
    // Futura lógica de registro
    return await this.repository.createUser(userData);
  }

  async login(credentials) {
    // Futura lógica de login
    return null;
  }
}

export const sessionsService = new SessionsService();
export default sessionsService;

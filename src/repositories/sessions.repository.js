import { sessionsDao } from '../dao/sessions.dao.js';

/**
 * Repositorio de Sesiones / Usuarios.
 * Provee la abstracción de acceso a datos de usuario para el servicio de autenticación.
 */
export class SessionsRepository {
  constructor(dao = sessionsDao) {
    this.dao = dao;
  }

  async getUserByEmail(email) {
    return await this.dao.findByEmail(email);
  }

  async createUser(userData) {
    return await this.dao.create(userData);
  }

  async getUserById(id) {
    return await this.dao.findById(id);
  }
}

export const sessionsRepository = new SessionsRepository();
export default sessionsRepository;

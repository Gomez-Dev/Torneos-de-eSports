/**
 * Data Access Object (DAO) para Sesiones y Usuarios.
 * Capa de persistencia directa para operaciones de autenticación y usuarios.
 */
export class SessionsDao {
  async findByEmail(email) {
    return null;
  }

  async create(userData) {
    return { id: 'user-temp-id', ...userData };
  }

  async findById(id) {
    return null;
  }
}

export const sessionsDao = new SessionsDao();
export default sessionsDao;

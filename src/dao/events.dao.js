/**
 * Data Access Object (DAO) para Eventos.
 * Única capa encargada de interactuar directamente con el motor de persistencia (MongoDB/Mongoose en futuras entregas).
 */
export class EventsDao {
  async getAll() {
    // Estructura base sin persistencia todavía. Devuelve un array vacío.
    return [];
  }

  async getById(id) {
    return null;
  }

  async create(eventData) {
    return { id: 'temp-id', ...eventData };
  }

  async update(id, eventData) {
    return null;
  }

  async delete(id) {
    return false;
  }
}

export const eventsDao = new EventsDao();
export default eventsDao;

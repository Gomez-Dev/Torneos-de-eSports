/**
 * Estructura y esquema base para la entidad Event (Torneo de eSports).
 * Preparado para acoplar con Mongoose / MongoDB en la siguiente entrega.
 */
export const EventSchemaDefinition = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, default: 'Online' },
  capacity: { type: Number, required: true },
  status: { type: String, default: 'UPCOMING' },
  organizer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
};

export class Event {
  constructor({
    title,
    description,
    category,
    date,
    location = 'Online',
    capacity,
    status = 'UPCOMING',
    organizer,
    createdAt = new Date(),
  }) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.date = date;
    this.location = location;
    this.capacity = capacity;
    this.status = status;
    this.organizer = organizer;
    this.createdAt = createdAt;
  }
}

export default Event;

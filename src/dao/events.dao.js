import Event from "../models/Event.js";

class EventsDAO {
  async getAll() {
    return await Event.find();
  }

  async getById(id) {
    return await Event.findById(id);
  }

  async create(eventData) {
    return await Event.create(eventData);
  }

  async update(id, eventData) {
    return await Event.findByIdAndUpdate(id, eventData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Event.findByIdAndDelete(id);
  }
}

export const eventsDao = new EventsDAO();
export default EventsDAO;

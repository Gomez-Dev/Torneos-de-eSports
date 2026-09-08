import Event from "../models/Event.js";

class EventsDAO {
  async getAll(filters = {}, options = {}) {
    const { page = 1, limit = 10, sort } = options;

    const skip = (page - 1) * limit;

    let query = Event.find(filters).skip(skip).limit(limit);

    if (sort) {
      query = query.sort(sort);
    }

    return await query;
  }

  async count(filters = {}) {
    return await Event.countDocuments(filters);
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
export default eventsDao;

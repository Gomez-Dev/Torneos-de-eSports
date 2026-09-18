import mongoose from "mongoose";
import Ticket from "../models/Ticket.js";

class TicketsDAO {
  async findById(id) {
    return await Ticket.findById(id);
  }

  async findByUser(userId) {
    return await Ticket.find({ user: userId })
      .populate("event", "title date location")
      .sort({ createdAt: -1 });
  }

  async findByEvent(eventId) {
    return await Ticket.find({ event: eventId })
      .populate("user", "first_name last_name email role")
      .sort({ createdAt: -1 });
  }

  async findActiveByUserAndEvent(userId, eventId) {
    return await Ticket.findOne({
      user: userId,
      event: eventId,
      status: {
        $in: ["confirmed", "pending"],
      },
    });
  }

  async countActiveByEvent(eventId) {
    const result = await Ticket.aggregate([
      {
        $match: {
          event: new mongoose.Types.ObjectId(eventId),
          status: {
            $in: ["confirmed", "pending"],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$quantity",
          },
        },
      },
    ]);

    return result.length > 0 ? result[0].total : 0;
  }

  async create(ticketData) {
    return await Ticket.create(ticketData);
  }

  async update(id, ticketData) {
    return await Ticket.findByIdAndUpdate(id, ticketData, {
      new: true,
      runValidators: true,
    });
  }
}

export const ticketsDao = new TicketsDAO();

export default ticketsDao;

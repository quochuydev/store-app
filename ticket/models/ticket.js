const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  name: { type: String, null: true },
  image: { type: String, null: true },
  tags: { type: [String], default: [] },
  attributes: {
    type: [
      {
        key: String,
        value: String,
      },
    ],
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

const ticketModel = mongoose.model("Ticket", TicketSchema);

module.exports = { ticketModel };

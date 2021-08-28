const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    first_name: String,
    phone_number: String,
    email: String,
    address: String,
    lng: Number,
    lat: Number,
  },
  amount: Number,
  line_items: [],
  created_at: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = { orderModel };

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    firstName: String,
    phoneNumber: String,
    email: String,
    address: String,
    city: String,
    district: String,
    lng: Number,
    lat: Number,
  },
  amount: Number,
  status: String,
  note: String,
  lineItems: {
    type: [
      {
        productId: String,
        title: String,
        image: String,
        quantity: { type: Number, default: 0 },
        price: { type: Number, default: 0 },
        amount: { type: Number, default: 0 },
      },
    ],
    default: [],
  },
  payment: {
    type: { type: String, default: "cod" },
    note: { type: String, default: null },
  },
  createdAt: { type: Date, default: Date.now },
});

orderSchema.post("save", async function (order, next) {
  console.log("Event shop:order.saved published", order._id);
  next();
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = { OrderModel };

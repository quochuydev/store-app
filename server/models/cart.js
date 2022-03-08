const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  token: String,
  item_count: { type: Number, default: 0 },
  total_price: { type: Number, default: 0 },
  note: String,
  items: {
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
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = { CartModel };

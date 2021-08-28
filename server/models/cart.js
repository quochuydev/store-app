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
        quantity: Number,
      },
    ],
    default: [],
  },
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = { cartModel };

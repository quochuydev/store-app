const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, null: true },
  description: { type: String, null: true },
  sku: { type: String, null: true },
  barcode: { type: String, null: true },
  price: { type: Number, default: 0 },
  originalPrice: { type: Number, default: 0 },
  image: { type: String, null: true },
  categories: { type: [String], default: [] },
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

productSchema.post("save", async function (product, next) {
  console.log("Event shop:product.saved published", product._id);
  next();
});

const productModel = mongoose.model("Product", productSchema);

module.exports = { productModel };

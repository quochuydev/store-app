const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, null: true },
  sku: { type: String, null: true },
  barcode: { type: String, null: true },
  price: { type: Number, default: 0 },
  original_price: { type: Number, default: 0 },
  image: { type: String, null: true },
  created_at: { type: Date, default: Date.now },
});

productSchema.post("save", async function (product, next) {
  console.log("Event product:updated published", product._id);
  next();
});

const productModel = mongoose.model("Product", productSchema);

module.exports = { productModel };

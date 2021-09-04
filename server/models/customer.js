const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: { type: String, null: true },
  phoneNumber: { type: String, null: true },
  createdAt: { type: Date, default: Date.now },
});

customerSchema.post("save", async function (customer, next) {
  console.log("Event shop:customer.saved published", customer._id);
  next();
});

const customerModel = mongoose.model("Customer", customerSchema);

module.exports = { customerModel };

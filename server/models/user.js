const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  email: String,
  salt: String,
  password: [String],
  roleId: String,
  createdAt: { type: Date, default: Date.now },
});

Schema.post("save", async function (data, next) {
  console.log("Event user.saved published", data._id);
  next();
});

const UserModel = mongoose.model("User", Schema);

module.exports = { UserModel };

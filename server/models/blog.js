const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: String,
  body: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

Schema.post("save", async function (data, next) {
  console.log("Event blog.saved published", data._id);
  next();
});

const BlogModel = mongoose.model("Order", Schema);

module.exports = { BlogModel };

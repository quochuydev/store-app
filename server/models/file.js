const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  url: { type: String, null: true },
  created_at: { type: Date, default: Date.now },
});

const fileModel = mongoose.model("File", fileSchema);

module.exports = { fileModel };

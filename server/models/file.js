const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  url: { type: String, null: true },
  fileName: { type: String, null: true },
  createdAt: { type: Date, default: Date.now },
});

const FileModel = mongoose.model("File", fileSchema);

module.exports = { FileModel };

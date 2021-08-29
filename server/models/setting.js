const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  shop: {
    brand: { type: String, default: "" },
    logo: { type: String, default: "" },
  },
  banner: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  contents: {
    type: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        image: { type: String, default: "" },
        url: { type: String, default: "" },
      },
    ],
    default: [],
  },
  categories: {
    type: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        image: { type: String, default: "" },
        url: { type: String, default: "" },
      },
    ],
    default: [],
  },
  deal: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    url: { type: String, default: "" },
  },
});

const settingModel = mongoose.model("Setting", settingSchema);

module.exports = { settingModel };

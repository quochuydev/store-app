const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  shop: {
    brand: String,
    logo: String,
  },
  banner: {
    title: String,
    description: String,
    image: String,
    url: String,
  },
  contents: [
    {
      title: String,
      description: String,
      image: String,
      url: String,
    },
  ],
  categories: [
    {
      title: String,
      description: String,
      image: String,
      url: String,
    },
  ],
  deal: {
    title: String,
    description: String,
    url: String,
  },
});

const settingModel = mongoose.model("Setting", settingSchema);

module.exports = { settingModel };

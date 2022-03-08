const express = require("express");

const router = express.Router();
const { SettingModel } = require("../models/setting");

router.get("/api/settings", async (req, res) => {
  let result = await SettingModel.findOne({}).lean(true);

  if (result) {
    return res.json(result);
  }

  result = await SettingModel.create({});
  res.json(result);
});

router.put("/api/settings/:id", async (req, res) => {
  const result = await SettingModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { lean: true, new: true }
  );
  res.json(result);
});

module.exports = { settingRoute: router };

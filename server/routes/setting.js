const express = require("express");

const router = express.Router();
const { settingModel } = require("../models/setting");

router.get("/api/setting", async (req, res) => {
  let result = await settingModel.findOne({}).lean(true);

  if (result) {
    return res.json(result);
  }

  result = await settingModel.create({});
  res.json(result);
});

router.put("/api/setting/:id", async (req, res) => {
  const result = await settingModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { lean: true, new: true }
  );
  res.json(result);
});

module.exports = { settingRoute: router };

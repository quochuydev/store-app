const express = require("express");
const router = express.Router();

const { customerModel } = require("../models/customer");

router.post("/api/subscribe", async (req, res) => {
  const { phoneNumber } = req.body;

  let customer = await customerModel.findOne({ phoneNumber });
  if (!customer) {
    customer = await customerModel.create({ phoneNumber });
  }

  res.json(customer);
});

module.exports = { coreRoute: router };

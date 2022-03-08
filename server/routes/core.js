const express = require("express");
const router = express.Router();

const { CustomerModel } = require("../models/customer");

router.post("/api/subscribe", async (req, res) => {
  const { phoneNumber } = req.body;

  let customer = await CustomerModel.findOne({ phoneNumber });
  if (!customer) {
    customer = await CustomerModel.create({ phoneNumber });
  }

  res.json(customer);
});

module.exports = { coreRoute: router };

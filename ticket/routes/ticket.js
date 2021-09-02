const express = require("express");

const router = express.Router();
const { ticketModel } = require("../models/ticket");

router.get("/api/tickets", async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const page = req.query.page ? Number(req.query.page) : 1;
  const skip = limit * (page - 1);

  const items = await ticketModel
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);
  res.send({ items });
});

router.get("/api/tickets/:id", async (req, res) => {
  res.json({});
});

module.exports = { ticketRoute: router };

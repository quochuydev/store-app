const express = require("express");

const router = express.Router();
const { ticketModel } = require("../models/ticket");

router.get("/api/tickets", async (req, res) => {
  const { limit = 20, page = 1, ...criteria } = req.query;

  const skip = limit * (page - 1);
  const total = await ticketModel.count(criteria);

  const totalPage = Math.ceil(total / limit);
  const meta = { total, limit, page, skip, totalPage };
  console.log(meta, criteria);

  if (!total) {
    return res.json({ meta, items: [] });
  }

  const items = await ticketModel
    .find(criteria)
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip(Number(skip));

  res.json({ meta, items });
});

router.get("/api/tickets/:id", async (req, res) => {
  const result = await ticketModel.findOne({ _id: req.params.id }).lean(true);
  res.json(result);
});

router.post("/api/tickets", async (req, res) => {
  const result = await ticketModel.create(req.body);
  res.json(result);
});

module.exports = { ticketRoute: router };

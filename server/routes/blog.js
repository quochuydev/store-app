const express = require("express");

const router = express.Router();
const { OrderModel } = require("../models/order");

router.get("/api/orders", async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const page = req.query.page ? Number(req.query.page) : 1;
  const skip = limit * (page - 1);

  const items = await OrderModel.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);
  res.send({ items });
});

router.get("/api/orders/:id", async (req, res) => {
  const order = await OrderModel.findOne({ _id: req.params.id }).lean(true);
  res.json(order);
});

router.post("/api/orders", async (req, res) => {
  const data = req.body;

  const order = await OrderModel.create(data);
  res.json(order);
});

router.put("/api/orders/:id", async (req, res) => {
  const data = req.body;

  const order = await OrderModel.findByIdAndUpdate(
    req.params.id,
    { $set: data },
    { new: true, lean: true }
  );

  res.json(order);
});

router.post("/api/orders/:id/payment-info", async (req, res, next) => {
  const { note } = req.body;
  if (!note) {
    return next({ message: "invalid data" });
  }

  const order = await OrderModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        payment: {
          note,
        },
      },
    },
    { new: true, lean: true }
  );

  res.json(order);
});

module.exports = { orderRoute: router };

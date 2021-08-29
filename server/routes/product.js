const express = require("express");

const router = express.Router();
const { productModel } = require("../models/product");

router.get("/api/products", async (req, res) => {
  const { limit = 20, page = 1, ...criteria } = req.query;
  const skip = limit * (page - 1);
  console.log(limit, page, skip, criteria);

  const total = await productModel.count(criteria);
  if (!total) {
    return res.json({ total: 0, items: [] });
  }

  const items = await productModel
    .find(criteria)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);
  res.json({ total, items });
});

router.get("/api/products/:id", async (req, res) => {
  const result = await productModel.findOne({ _id: req.params.id }).lean(true);
  res.json(result);
});

router.post("/api/products", async (req, res) => {
  const title =
    req.body.title || "test " + String(Math.floor(Math.random() * 1000));

  const data = {
    title,
    price: req.body.price || Math.floor(Math.random() * 1000),
    original_price: req.body.original_price || Math.floor(Math.random() * 1000),
    image:
      req.body.image ||
      "https://ui-avatars.com/api/?name=" + title + "&size=600",
  };

  const product = await productModel.create(data);
  res.json(product);
});

router.put("/api/products/:id", async (req, res) => {
  const title =
    req.body.title || "test " + String(Math.floor(Math.random() * 1000));

  const data = {
    title,
    price: req.body.price || Math.floor(Math.random() * 1000),
    original_price: req.body.original_price || Math.floor(Math.random() * 1000),
    image:
      req.body.image ||
      "https://ui-avatars.com/api/?name=" + title + "&size=600",
  };

  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    { $set: data },
    { new: true, lean: true }
  );

  res.json(product);
});

module.exports = { productRoute: router };

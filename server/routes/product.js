const express = require("express");

const router = express.Router();
const { productModel } = require("../models/product");

router.get("/api/products", async (req, res) => {
  let { limit = 20, page = 1, ...filter } = req.query;
  limit = Number(limit);
  page = Number(page);

  const criteria = {};
  if (filter.q) {
    criteria.title = { $regex: filter.q };
  }

  const skip = limit * (page - 1);
  const total = await productModel.count(criteria);

  const totalPage = Math.ceil(total / limit);
  const meta = { total, limit, page, skip, totalPage };
  console.log("products", meta, criteria);

  if (!total) {
    return res.json({ meta, items: [] });
  }

  const items = await productModel
    .find(criteria)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  res.json({ meta, items });
});

router.get("/api/products/:id", async (req, res) => {
  const result = await productModel.findOne({ _id: req.params.id }).lean(true);
  res.json(result);
});

router.post("/api/products", async (req, res, next) => {
  try {
    const product = await productModel.create(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.put("/api/products/:id", async (req, res, next) => {
  try {
    const result = await productModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, lean: true }
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/api/products/:id", async (req, res, next) => {
  try {
    const result = await productModel.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = { productRoute: router };

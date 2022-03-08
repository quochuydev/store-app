const express = require("express");

const router = express.Router();
const { ProductModel } = require("../models/product");

router.get("/api/products", async (req, res) => {
  let { limit = 20, page = 1, ...filter } = req.query;
  limit = Number(limit);
  page = Number(page);

  const criteria = {};
  if (filter.q) {
    criteria.title = { $regex: filter.q };
  }

  const skip = limit * (page - 1);
  const total = await ProductModel.count(criteria);

  const totalPage = Math.ceil(total / limit);
  const meta = { total, limit, page, skip, totalPage };
  console.log("products", meta, criteria);

  if (!total) {
    return res.json({ meta, items: [] });
  }

  const items = await ProductModel.find(criteria)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  res.json({ meta, items });
});

router.get("/api/products/:id", async (req, res) => {
  const result = await ProductModel.findOne({ _id: req.params.id }).lean(true);
  res.json(result);
});

router.post("/api/products", async (req, res, next) => {
  try {
    const product = await ProductModel.create(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.put("/api/products/:id", async (req, res, next) => {
  try {
    const result = await ProductModel.findByIdAndUpdate(
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
    const result = await ProductModel.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = { productRoute: router };

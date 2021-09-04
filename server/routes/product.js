const express = require("express");

const router = express.Router();
const { productModel } = require("../models/product");

router.get("/api/products", async (req, res) => {
  let { limit = 20, page = 1, ...criteria } = req.query;
  limit = Number(limit);
  page = Number(page);

  const skip = limit * (page - 1);
  const total = await productModel.count(criteria);

  const totalPage = Math.ceil(total / limit);
  const meta = { total, limit, page, skip, totalPage };
  console.log(meta, criteria);

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

router.post("/api/products", async (req, res) => {
  const title = req.body.title;
  const image =
    req.body.image || `https://ui-avatars.com/api/?name=${title}&size=600`;
  const price = req.body.price || Math.floor(Math.random() * 100) * 1000;
  const original_price = req.body.original_price || price;

  const product = await productModel.create({
    title,
    price,
    original_price,
    image,
    description: req.body.description,
  });

  res.json(product);
});

router.put("/api/products/:id", async (req, res) => {
  const title = req.body.title;
  const image =
    req.body.image || `https://ui-avatars.com/api/?name=${title}&size=600`;
  const price = req.body.price || Math.floor(Math.random() * 100) * 1000;
  const original_price = req.body.original_price || price;

  const data = {
    title,
    price,
    original_price,
    image,
    description: req.body.description,
  };

  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    { $set: data },
    { new: true, lean: true }
  );

  res.json(product);
});

module.exports = { productRoute: router };

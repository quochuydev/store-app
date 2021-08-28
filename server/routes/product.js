const express = require("express");

const router = express.Router();
const { productModel } = require("../models/product");

router.get("/api/products", async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const page = req.query.page ? Number(req.query.page) : 1;
  const skip = limit * (page - 1);

  const items = await productModel
    .find({})
    .sort({ created_at: -1 })
    .limit(limit)
    .skip(skip);
  res.send({ items });
});

router.post("/api/products", async (req, res) => {
  const title = "test " + String(Math.floor(Math.random() * 1000));

  const data = {
    title,
    price: Math.floor(Math.random() * 1000),
    image:
      req.body.image ||
      "https://ui-avatars.com/api/?name=" + title + "&size=600",
  };

  const product = await productModel.create(data);
  res.json(product);
});

router.put("/api/products/:id", async (req, res) => {
  const title = "test " + String(Math.floor(Math.random() * 1000));
  const data = {
    title,
    price: Math.floor(Math.random() * 1000),
    image:
      req.body.image ||
      "https://ui-avatars.com/api/?name=" + title + "&size=600",
  };

  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    { $set: data },
    {
      new: true,
      lean: true,
    }
  );

  res.json(product);
});

module.exports = { productRoute: router };

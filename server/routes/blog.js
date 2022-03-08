const express = require("express");
const { BlogModel } = require("../models/blog");
const router = express.Router();

router.get("/api/blogs", async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const page = req.query.page ? Number(req.query.page) : 1;
  const skip = limit * (page - 1);

  const items = await BlogModel.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);
  res.send({ items });
});

router.get("/api/blogs/:id", async (req, res) => {
  const blog = await BlogModel.findOne({ _id: req.params.id }).lean(true);
  res.json(blog);
});

router.post("/api/blogs", async (req, res) => {
  const data = req.body;

  const blog = await BlogModel.create(data);
  res.json(blog);
});

router.put("/api/blogs/:id", async (req, res) => {
  const data = req.body;

  const blog = await BlogModel.findByIdAndUpdate(
    req.params.id,
    { $set: data },
    { new: true, lean: true }
  );

  res.json(blog);
});

module.exports = { blogRoute: router };

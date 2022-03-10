const express = require("express");
const router = express.Router();

const { FileModel } = require("../models/file");
const { storage, uploader, getFile } = require("../storageService");

router.post("/api/files", storage, async (req, res) => {
  try {
    if (!req.file) {
      throw { message: "empty file" };
    }
    const file = await uploader(req.file);
    res.send(file);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/api/files", async (req, res) => {
  const items = await FileModel.find({}).sort({ createdAt: -1 });
  res.status(200).json({ items });
});

router.get("/files/:filename", (req, res) => {
  getFile(req.params.filename, res, (error) => {
    console.log(error);
    return res.status(500).send(error);
  });
});

module.exports = { fileRoute: router };

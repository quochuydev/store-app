const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const { fileModel } = require("../models/file");
const { storage, uploader } = require("../uploader");

router.post("/api/files", storage, async (req, res) => {
  if (!req.file) {
    return res.status(400).send("empty file");
  }
  const file = await uploader(req.file);
  res.send(file);
});

router.get("/api/files", async (req, res) => {
  const items = await fileModel.find({}).sort({ createdAt: -1 });
  res.status(200).json({ items });
});

router.get("/files/:filename", (req, res) => {
  const fullPath = path.join(path.resolve("./files"), req.params.filename);

  fs.exists(fullPath, function (exists) {
    if (!exists) {
      return res.status(400).send({ message: "File not exist" });
    }
    const filestream = fs.createReadStream(fullPath);
    filestream.pipe(res);
  });
});

module.exports = { fileRoute: router };

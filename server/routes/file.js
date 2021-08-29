const express = require("express");
const multer = require("multer");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const { fileModel } = require("../models/file");

const server = process.env.SERVER_URL;

router.get("/api/files", async (req, res) => {
  const items = await fileModel.find({}).sort({ createdAt: -1 });
  res.status(200).json({ items });
});

router.get("/files/:filename", (req, res) => {
  var fullPath = path.join(path.resolve("./files"), req.params.filename);

  fs.exists(fullPath, function (exists) {
    if (!exists) {
      return res.status(400).send({ message: "File not exist" });
    }
    const filestream = fs.createReadStream(fullPath);
    filestream.pipe(res);
  });
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + slugify(file.originalname, { lower: true }));
  },
});

var upload = multer({ storage: storage });

router.post("/api/files", upload.single("files"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("empty file");
  }

  const file = await fileModel.create({
    url: server + "/" + req.file.path,
  });
  res.send(file);
});

module.exports = { fileRoute: router };

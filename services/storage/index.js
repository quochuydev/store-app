require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 5000;

const { fileModel } = require("./models/file");
const { storage, uploader } = require("./uploader");

console.log("*********************************");
console.log("started");
console.log("port: ", port);
console.log("env: ", process.env.NODE_ENV);
console.log("is production: ", process.env.NODE_ENV === "production");
console.log("database: ", process.env.DATABASE_URL);
console.log("*********************************");

mongoose.connect("mongodb://localhost:27017/storage", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = express();

server.use(cors({ credentials: true, origin: true }));
server.use(bodyParser.json({}));
server.use(bodyParser.urlencoded({ extended: false }));

server.get("/", async (req, res) => {
  res.send("File service");
});

server.get("/api/files", async (req, res) => {
  const items = await fileModel.find({}).sort({ createdAt: -1 });
  res.status(200).json({ items });
});

server.post("/api/files", storage, async (req, res) => {
  if (!req.file) {
    return res.status(400).send("empty file");
  }
  const file = await uploader(req.file);
  res.send(file);
});

server.get("/files/:filename", (req, res) => {
  const fullPath = path.join(path.resolve("./files"), req.params.filename);

  fs.exists(fullPath, function (exists) {
    if (!exists) {
      return res.status(400).send({ message: "File not exist" });
    }
    const filestream = fs.createReadStream(fullPath);
    filestream.pipe(res);
  });
});

server.use((err, req, res, next) => {
  if (err) {
    return res.status(400).send(err);
  }
  next();
});

server.listen(port, () => {
  console.log(`> Ready on port:${port}`);
});

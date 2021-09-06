require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 4000;

const { ticketRoute } = require("./routes/ticket");
const { fileRoute } = require("./routes/file");


console.log("*********************************");
console.log("port:", port);
console.log("env:", process.env.NODE_ENV);
console.log("is production:", process.env.NODE_ENV === "production");
console.log("database:", process.env.DATABASE_URL);
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
  res.send("service");
});

server.use(ticketRoute)
server.use(fileRoute)

server.use((err, req, res, next) => {
  if (err) {
    return res.status(400).send(err);
  }
  next();
});

server.listen(port, () => {
  console.log(`> Ready on port:${port}`);
});

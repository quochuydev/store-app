require("dotenv").config();
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uuid = require("uuid").v4;
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { fileRoute } = require("./routes/file");
const { cartRoute } = require("./routes/cart");
const { productRoute } = require("./routes/product");
const { orderRoute } = require("./routes/order");
const { coreRoute } = require("./routes/core");
const { settingRoute } = require("./routes/setting");

console.log("*********************************");
console.log("port:", port);
console.log("env:", process.env.NODE_ENV);
console.log("is production:", process.env.NODE_ENV === "production");
console.log("database:", process.env.DATABASE_URL);
console.log("server:", process.env.SERVER_URL);
console.log("*********************************");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected mongo success");
  })
  .catch((error) => {
    console.log("connected mongo failed", error);
  });

app.prepare().then(() => {
  const server = express();

  server.use(cors({ credentials: true, origin: true }));
  server.use(bodyParser.json({}));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());

  server.use(function (req, res, next) {
    const token = req.cookies.token;
    if (token === undefined) {
      res.cookie("token", uuid(), { maxAge: 9000000, httpOnly: true });
    }
    next();
  });

  server.use(fileRoute);
  server.use(cartRoute);
  server.use(productRoute);
  server.use(orderRoute);
  server.use(coreRoute);
  server.use(settingRoute);

  server.use((err, req, res, next) => {
    if (err) {
      return res.status(400).send(err);
    }
    next();
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`Ready on ${process.env.SERVER_URL}:${port}`);
  });
});

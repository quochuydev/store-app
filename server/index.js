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
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const { fileRoute } = require("./routes/file");
const { cartRoute } = require("./routes/cart");
const { productRoute } = require("./routes/product");
const { orderRoute } = require("./routes/order");
const { coreRoute } = require("./routes/core");
const { settingRoute } = require("./routes/setting");

console.log("*********************************");
console.log("dev:", dev);
console.log("port:", port);
console.log("env:", process.env.NODE_ENV);
console.log("isProduction:", process.env.NODE_ENV === "production");
console.log("database:", process.env.DATABASE_URL);
console.log("serverUrl:", process.env.SERVER_URL);
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

nextApp.prepare().then(() => {
  const app = express();

  app.use(cors({ credentials: true, origin: true }));
  app.use(bodyParser.json({}));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(function (req, res, next) {
    const token = req.cookies.token;
    if (token === undefined) {
      res.cookie("token", uuid(), { maxAge: 9000000, httpOnly: true });
    }
    next();
  });

  app.use(fileRoute);
  app.use(cartRoute);
  app.use(productRoute);
  app.use(orderRoute);
  app.use(coreRoute);
  app.use(settingRoute);
  require("./routes/product/index")({ app, di: { mongoose } });

  app.use((err, req, res, next) => {
    if (err) {
      return res.status(400).send(err);
    }
    next();
  });

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, () => {
    console.log(`Ready on ${process.env.SERVER_URL}:${port}`);
  });
});

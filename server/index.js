require("dotenv").config();
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const cron = require("node-cron");

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { fileRoute } = require("./routes/file");
const { cartRoute } = require("./routes/cart");
const { productRoute } = require("./routes/product");
const { orderRoute } = require("./routes/order");
const { coreRoute } = require("./routes/core");
const { settingRoute } = require("./routes/setting");

const { productModel } = require("./models/product");

console.log("*********************************");
console.log("port:", port);
console.log("env:", process.env.NODE_ENV);
console.log("is production:", process.env.NODE_ENV === "production");
console.log("database:", process.env.DATABASE_URL);
console.log("*********************************");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.prepare().then(() => {
  const server = express();

  cron.schedule("0 0 * * * *", async () => {
    console.log(new Date(), "create every hour", process.env.MESSAGE);

    await productModel.create({
      title: `Cà phê Mê Trang Arabica (A) - Hộp 250g rang xay hút chân không`,
      description: process.env.MESSAGE,
      image: "https://cf.shopee.vn/file/76698f5a72286c1f9aca14956b11d0db",
      price: 74000,
    });
  });

  server.use(cors({ credentials: true, origin: true }));
  server.use(bodyParser.json({}));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());

  server.use(function (req, res, next) {
    const token = req.cookies.token;
    if (token === undefined) {
      res.cookie("token", uuidv4(), { maxAge: 9000000, httpOnly: true });
    }
    next();
  });

  server.get("/test", async (req, res) => {
    const start = Date.now();
    res.send(`load: ${Date.now() - start}`, process.env.MESSAGE, "rebuild");
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
    console.log(`> Ready on ${process.env.SERVER_URL}:${port}`);
  });
});

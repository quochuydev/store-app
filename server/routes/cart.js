const express = require("express");

const router = express.Router();

const { cartModel } = require("../models/cart");
const { productModel } = require("../models/product");

const cartAssetCreate = async (token) => {
  if (!token) {
    throw "no token found";
  }

  const cart = await cartModel.findOne({ token });
  if (cart) {
    return cart;
  }

  return cartModel.create({ token });
};

router.get("/cart", async (req, res) => {
  const token = req.cookies.token;
  const cart = await cartAssetCreate(token);
  res.json(cart);
});

router.post("/cart/add", async (req, res) => {
  const { quantity, id } = req.body;
  const token = req.cookies.token;
  const cart = await cartAssetCreate(token);

  const product = await productModel.findOne({ _id: id }).lean(true);

  let items = [...cart.items];
  const found = items.find((e) => e.productId === id);
  if (found) {
    items = items.map((e) =>
      e.productId === id
        ? {
            ...e,
            quantity: e.quantity + quantity,
            amount: (e.quantity + quantity) * e.price,
          }
        : e
    );
  } else {
    items.push({
      productId: product._id,
      title: product.title,
      quantity,
      price: product.price,
      amount: quantity * product.price,
    });
  }

  const updated = await cartModel.findOneAndUpdate(
    { _id: cart._id },
    { $set: { items } },
    { new: true, lean: true }
  );
  res.json(updated);
});

module.exports = { cartRoute: router };

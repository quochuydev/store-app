const express = require("express");
const _ = require("lodash");

const router = express.Router();

const { cartModel } = require("../models/cart");
const { productModel } = require("../models/product");

const cartAssetCreate = async (token) => {
  if (!token) {
    throw "no token found";
  }

  const cart = await cartModel.findOne({ token }).lean(true);
  if (cart) {
    return cart;
  }

  await cartModel.create({ token });
  return cartModel.findOne({ token }).lean(true);
};

router.get("/api/cart", async (req, res) => {
  const token = req.cookies.token;
  const cart = await cartAssetCreate(token);
  res.json(cart);
});

const increase = async (items = [], productId, quantity = 0) => {
  const product = await productModel.findOne({ _id: productId }).lean(true);
  const foundItem = items.find((e) => e.productId === productId);

  if (!foundItem) {
    items.push({
      productId: productId,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity,
      amount: quantity * product.price,
    });

    return items;
  }

  return items.map((item) => {
    if (item.productId === productId) {
      const updated_quantity = item.quantity + quantity;
      const updated_amount = updated_quantity * item.price;

      return {
        ...item,
        quantity: updated_quantity,
        amount: updated_amount,
      };
    }

    return item;
  });
};

router.post("/api/cart/add", async (req, res) => {
  const { quantity, id } = req.body;
  const token = req.cookies.token;
  const cart = await cartAssetCreate(token);

  const items = await increase([...cart.items], id, Number(quantity));
  const total_price = _.sumBy(items, "amount");
  const item_count = _.sumBy(items, "quantity");

  const updated = await cartModel.findOneAndUpdate(
    { _id: cart._id },
    { $set: { items, item_count, total_price } },
    { new: true, lean: true }
  );
  res.json(updated);
});

router.post("/api/cart/update", async (req, res) => {
  const token = req.cookies.token;
  const cart = await cartAssetCreate(token);

  const { line_items, note } = req.body;
  let items = [...cart.items];

  for (let i = 0; i < line_items.length; i++) {
    const line_item = line_items[i];
    const { productId, quantity } = line_item;
    items = await increase([...items], productId, Number(quantity));
  }

  items = items.filter((e) => e.quantity >= 1);

  const total_price = _.sumBy(items, "amount");
  const item_count = _.sumBy(items, "quantity");

  const updated = await cartModel.findOneAndUpdate(
    { _id: cart._id },
    { $set: { items, item_count, total_price, note } },
    { new: true, lean: true }
  );
  res.json(updated);
});

router.post("/api/cart/remove/:productId", async (req, res) => {
  const token = req.cookies.token;
  const cart = await cartAssetCreate(token);
  const items = [...cart.items].filter(
    (e) => String(e.productId) !== req.params.productId
  );
  const total_price = _.sumBy(items, "amount");
  const item_count = _.sumBy(items, "quantity");

  const updated = await cartModel.findOneAndUpdate(
    { _id: cart._id },
    { $set: { items, item_count, total_price } },
    { new: true, lean: true }
  );
  res.json(updated);
});

module.exports = { cartRoute: router };

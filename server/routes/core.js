const express = require("express");
const router = express.Router();

router.get("/search", (req, res) => {
  res.json(req.query);
});

module.exports = { coreRoute: router };

const express = require("express");
const router = express.Router();

router.get("/api/search", (req, res) => {
  res.json(req.query);
});

module.exports = { coreRoute: router };

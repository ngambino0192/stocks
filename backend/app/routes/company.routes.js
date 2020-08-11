const express = require("express");
const router = express.Router();
const company = require("../controllers/company.controller.js");

// get target price info
router.get("/:symbol/target", company.targetPrice);

// get quote price info
router.get("/:symbol/quote", company.quotePrice);

// get company news
router.get("/:symbol/news", company.news);

module.exports = router;

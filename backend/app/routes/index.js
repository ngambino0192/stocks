require("dotenv").config();
const express = require("express");

const api = express.Router();
const user = require("./user");
const markets = require("./markets");

api.use("/user", user);
api.use("/markets", markets);

module.exports = api;

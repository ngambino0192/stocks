require("dotenv").config();
const express = require("express");
const axios = require("axios");
const iex = require("iexcloud_api_wrapper");
const { FINNHUB_TOKEN } = process.env;

const router = express.Router();

router.get("/symbols", async (req, res) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${FINNHUB_TOKEN}`
    );
    let { data } = response;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Server Error: ${err}` });
  }
});

// get info on company
router.get("/watchlist/:symbols", async (req, res) => {
  try {
    const { symbols } = req.params;
    let array = symbols.split(",");
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${FINNHUB_TOKEN}`
    );
    let { data } = response;
    const watchlist = data.filter((company) => {
      return array.includes(company.symbol);
    });
    res.status(200).json(watchlist);
  } catch (err) {
    res.status(500).json({ message: `Server Error: ${err}` });
  }
});

router.get("/target/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/price-target?symbol=${symbol}&token=${FINNHUB_TOKEN}`
    );
    let { data } = response;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Server Error: ${err}` });
  }
});

// get company news
router.get("/news/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await axios.get(
      `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=2020-04-30&to=2020-05-01&token=${FINNHUB_TOKEN}`
    );
    let { data } = response;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Server Error: ${err}` });
  }
});

// get current price
router.get("/quote/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_TOKEN}`
    );
    let { data } = response;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Server Error: ${err}` });
  }
});

// get info for banner
// TODO: cache results (redis?) to prevent excessive api calls on production
router.get("/promo", async (req, res) => {
  try {
    const gainers = await iex.list("gainers");
    const losers = await iex.list("losers");
    const mostactive = await iex.list("mostactive");
    const volume = await iex.list("iexvolume");
    const percent = await iex.list("iexpercent");

    let collection = [
      ...gainers,
      ...losers,
      ...mostactive,
      ...volume,
      ...percent,
    ];

    let uniqueMarketSymbols = {};

    collection.forEach((item) => {
      let symbol = item.symbol;
      if (!uniqueMarketSymbols[symbol]) {
        uniqueMarketSymbols[symbol] = item;
      }
    });

    let response = [];

    for (let key in uniqueMarketSymbols) {
      response.push(uniqueMarketSymbols[key]);
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: `Server Error: ${err}` });
  }
});

module.exports = router;

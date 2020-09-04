require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const user = require("./routes/user");

const app = express();

const { FINNHUB_TOKEN, BACKEND_PORT } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", user);

app.get("/symbols", async (req, res) => {
  const response = await axios.get(
    `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${FINNHUB_TOKEN}`
  );
  let { data } = response;
  res.json(data);
});

// get info on company
app.get("/watchlist/:symbols", async (req, res) => {
  const { symbols } = req.params;

  let array = symbols.split(",");

  const response = await axios.get(
    `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${FINNHUB_TOKEN}`
  );
  let { data } = response;

  const watchlist = data.filter((company) => {
    return array.includes(company.symbol);
  });
  res.json(watchlist);
});

app.get("/target/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const response = await axios.get(
    `https://finnhub.io/api/v1/stock/price-target?symbol=${symbol}&token=${FINNHUB_TOKEN}`
  );
  let { data } = response;
  res.json(data);
});

// get company news
app.get("/news/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const response = await axios.get(
    `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=2020-04-30&to=2020-05-01&token=${FINNHUB_TOKEN}`
  );
  let { data } = response;
  res.json(data);
});

// get current price
app.get("/quote/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const response = await axios.get(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_TOKEN}`
  );
  let { data } = response;
  res.json(data);
});

// get timeseries data needs paid plan
// app.get("/timeseries/:symbol", async (req, res) => {
//   const { symbol } = req.params;
//   const response = await axios.get(
//     `https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1572651390&to=1572910590`
//   );
//   let { data } = response;
//   res.json(data);
// });

app.listen(6969, () =>
  console.log(`express listening on port ${BACKEND_PORT}`)
);

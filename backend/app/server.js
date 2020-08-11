require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const companyRoutes = require("./routes/company.routes");

const { FINNHUB_TOKEN, BACKEND_PORT } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);

app.get("/ping", (req, res) => {
  res.json("pong");
});

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

// get timeseries data needs paid plan
// app.get("/timeseries/:symbol", async (req, res) => {
//   console.log("hit");
//   const { symbol } = req.params;
//   const response = await axios.get(
//     `https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1572651390&to=1572910590`
//   );
//   let { data } = response;
//   res.json(data);
// });

app.listen(BACKEND_PORT, () =>
  console.log(`express listening on port ${BACKEND_PORT}`)
);

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

const {
  FINNHUB_TOKEN,
  BACKEND_PORT,
  SALT_ROUNDS,
  JWT_SECRET_KEY,
} = process.env;

const database = require("./services/postgres");
const User = require("./services/postgres/User");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const jwtKey = JWT_SECRET_KEY;
const jwtExpirySeconds = 300;

app.get("/", (req, res) => {
  res.json("sanity check");
});

app.post("/api/user/create", async (req, res) => {
  await database.sync();
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
    const user = await User.create({ username, email, password: hash });
    res.json(user);
  } catch (err) {
    res.json(`an error occurred during registration: ${err}`);
  }
});

app.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const validated = await bcrypt.compare(password, user.password);
    if (validated) {
      let { id, username, email } = user;

      const token = jwt.sign({ username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
      });

      res.cookie("token", token, {
        maxAge: jwtExpirySeconds * 1000,
        httpOnly: false,
      });

      res.json({ token, user: { id, username, email } });
    }
  } catch (err) {
    console.log(err);
    res.json("an error occurred during login");
  }
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

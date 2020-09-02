require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

const {
  FINNHUB_TOKEN,
  BACKEND_PORT,
  SALT_ROUNDS,
  JWT_SECRET_KEY,
  SMTP_FROM,
  SMTP_PASS,
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
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.json("A user was already created with that email address");
    } else {
      const user = await User.create({
        username,
        email,
        password: hash,
        validated: false,
      });
      res.json(user);
    }
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

      res.status(200).json({ token, user: { id, username, email } });
    } else {
      res.status(401).json("Incorrect Password");
    }
  } catch (err) {
    res.json("an error occurred during login: ", err);
  }
});

app.post("/api/user/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const { username, email, password } = user;
      const token = jwt.sign({ password }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
      });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: SMTP_FROM,
          pass: SMTP_PASS,
        },
      });
      const mailOptions = {
        from: SMTP_FROM,
        to: email,
        viewEngine: "handlebars",
        viewPath: "./services/nodemailer/reset.hbs",
        subject: "Password Reset",
        html: `<!DOCTYPE html>
        <html>
          <head>
            <title>Forget Password Email</title>
          </head>
        
          <body>
            <div>
              <h3>Dear ${username},</h3>
              <p>
                You requested for a password reset, kindly use this
                <a href="http://localhost:3000?${token}&${email}">link</a> to reset your password
              </p>
              <br />
              <p>Cheers!</p>
            </div>
          </body>
        </html>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.status(200).json({ user: email });
    } else {
      res.status(404).json("email does not exist");
    }
  } catch (err) {
    res.json("an error occurred during reset process: ", err);
  }
});

app.post("/api/user/reset-password", async (req, res) => {
  const { queryString, password } = req.body;
  let str = queryString[0].split("?")[1].split("&");
  let token = str[0];
  let email = str[1];

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      let decoded = jwt.decode(token, { complete: true });
      if (decoded.payload.password === user.password) {
        const newHash = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
        await User.update(
          { password: newHash },
          {
            where: {
              email,
            },
          }
        );
        res.status(201).json("Password Updated");
      } else {
        res.status(500).json("Server Error");
      }
    }
  } catch (err) {
    res.json("no user found", err);
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

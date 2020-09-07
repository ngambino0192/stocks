require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { BACKEND_PORT } = process.env;

const app = express();
const api = require("./routes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", api);

app.listen(BACKEND_PORT, () =>
  console.log(`express listening on port ${BACKEND_PORT}`)
);

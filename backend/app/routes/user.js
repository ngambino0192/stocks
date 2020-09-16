require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const logger = require('../services/winston');
const {
  SALT_ROUNDS,
  HASH_ALGO,
  JWT_SECRET_KEY,
  SMTP_FROM,
  SMTP_PASS,
  SMTP_SERVICE_PROVIDER,
} = process.env;

const router = express.Router();

const database = require("../services/postgres");
const User = require("../services/postgres/User");

const jwtExpirySeconds = 300;

router.post("/create", async (req, res) => {
  try {
    await database.sync();
    const { username, email, password } = req.body;
    try {
      const hash = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({
          message: "A user was already created with that email address",
        });
      } else {
        const user = await User.create({
          username,
          email,
          password: hash,
          validated: false,
        });
        res.status(201).json({ message: `User Created: ${user}` });
      }
    } catch (err) {
      res
        .status(400)
        .json({ message: `An error occurred during registration: ${err}` });
    }
  } catch (err) {
    logger.log(`Error: ${err}`);
    res.status(500).json({ message: `Server Error: ${err}` });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const validated = await bcrypt.compare(password, user.password);
    if (user && validated) {
      let { id, username, email } = user;
      const token = jwt.sign({ username }, JWT_SECRET_KEY, {
        algorithm: HASH_ALGO,
        expiresIn: jwtExpirySeconds,
      });
      res.cookie("token", token, {
        maxAge: jwtExpirySeconds * 1000,
        httpOnly: false,
      });
      res.status(200).json({ token, user: { id, username, email } });
    } else {
      if (!user) {
        res.status(404).json({ message: "Invalid user" });
      }
      if (!password) {
        res.status(401).json({ message: "Invalid Password" });
      }
    }
  } catch (err) {
    logger.log(`Error: ${err}`);
    res.status(500).json({ message: `Server Error: ${err}` });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const { username, email, password } = user;
      const token = jwt.sign({ password }, JWT_SECRET_KEY, {
        algorithm: HASH_ALGO,
        expiresIn: jwtExpirySeconds,
      });
      const transporter = nodemailer.createTransport({
        service: SMTP_SERVICE_PROVIDER,
        auth: {
          user: SMTP_FROM,
          pass: SMTP_PASS,
        },
      });
      const mailOptions = {
        from: SMTP_FROM,
        to: email,
        subject: "Your Password Reset Link",
        html: `<!DOCTYPE html>
            <html>
              <head>
                <title>Forgot Password Email</title>
              </head>
              <body>
                <div>
                  <h3>Dear ${username},</h3>
                  <h4>
                    You requested for a password reset, kindly use this
                    <a href="http://localhost:3000?${token}&${email}">link</a> to reset your password
                  </h4>
                </div>
              </body>
            </html>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).json({ message: "Error sending email" });
        } else {
          res.status(200).json({ message: "Email sent: " + info.response });
        }
      });
    } else {
      res.status(404).json({
        message:
          "no user associated to that email address. Create account instead!",
      });
    }
  } catch (err) {
    logger.log(`Error: ${err}`);
    res.status(500).json({ message: `Server Error: ${err}` });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { queryString, password } = req.body;
    let str = queryString[0].split("?")[1].split("&");
    let token = str[0];
    let email = str[1];
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
        res.status(201).json({ message: "Password Updated" });
      } else {
        res.status(500).json({ message: "Unable to update password" });
      }
    } else {
      res
        .status(404)
        .json({ message: "No user found associated to email address." });
    }
  } catch (err) {
    logger.log(`Error: ${err}`);
    res.status(500).json({ message: `Server Error: ${err}` });
  }
});

module.exports = router;

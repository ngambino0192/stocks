require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const database = require("../services/postgres");
const User = require("../services/postgres/User");

const { SALT_ROUNDS, JWT_SECRET_KEY, SMTP_FROM, SMTP_PASS } = process.env;

const jwtExpirySeconds = 300;
const router = express.Router();

router.post("/create", async (req, res) => {
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

router.post("/login", async (req, res) => {
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

      const token = jwt.sign({ username }, JWT_SECRET_KEY, {
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

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const { username, email, password } = user;
      const token = jwt.sign({ password }, JWT_SECRET_KEY, {
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
        subject: "Your Password Reset Link",
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

router.post("/reset-password", async (req, res) => {
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
        res.status(201).json({ message: "Password Updated" });
      } else {
        res.status(500).json({ message: "Server Error" });
      }
    }
  } catch (err) {
    res.json("no user found", err);
  }
});

module.exports = router;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SALT_ROUNDS, JWT_SECRET_KEY } = process.env;

const jwtKey = JWT_SECRET_KEY;
const jwtExpirySeconds = 300;

const database = require("../services/postgres");
const User = require("../services/postgres/models/User.js");

// Create and Save a new User
exports.create = async (req, res) => {
  await database.sync();
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json("User already exists with this email address");
    } else {
      const user = await User.create({ username, email, password: hash });
      res.json(user);
    }
  } catch (err) {
    res.json(`an error occurred during registration: ${err}`);
  }
};

exports.authenticate = async (req, res) => {
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
};

// Retrieve and return all users from the database. unused
exports.findAll = (req, res) => {};

// Find a single user with an id unused
exports.findOne = (req, res) => {};

// Update a note identified by the id in the request unused
exports.update = (req, res) => {};

// Delete a note with the specified id in the request unused
exports.delete = (req, res) => {};

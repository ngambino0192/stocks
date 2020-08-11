const { Sequelize } = require("sequelize");
const database = require("./index");

const User = database.define("user", {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = User;

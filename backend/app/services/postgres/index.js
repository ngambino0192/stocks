const { Sequelize, Model, DataTypes } = require("sequelize");
// const User = require("./services/postgres/User");

const database = new Sequelize("postgres", "postgres", "postgres", {
  host: "db",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

module.exports = database;

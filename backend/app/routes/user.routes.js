const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller.js");

// Create a new User
router.post("/create", users.create);

// Authenticate, and log in user
router.post("/authenticate", users.authenticate);

// Retrieve all users
router.get("/", users.findAll);

// Retrieve a single Note with id
router.get("/:id", users.findOne);

// Update a User with id
router.put("/:id", users.update);

// Delete a Note with id
router.delete("/:id", users.delete);

module.exports = router;

const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller.js");

// Create a new User
router.post("/create", users.create);

// Authenticate, and log in user
router.post("/authenticate", users.authenticate);

// Retrieve all users unused
router.get("/", users.findAll);

// Retrieve a single Note with id unused
router.get("/:id", users.findOne);

// Update a User with id unused
router.put("/:id", users.update);

// Delete a Note with id unused
router.delete("/:id", users.delete);

module.exports = router;

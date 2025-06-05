const express = require("express");
const router = express.Router();
const { createUser, updatedUser } = require("../Controllers/UserController");
const { login, register } = require("../Controllers/authController");

// Routes for regular user actions
router.post("/createUser", createUser);
// router.delete("/deleteUser/:name", deleteUser);
router.put("/updatedUser/:name", updatedUser);
router.post("/login", login);
router.post("/register", register);

module.exports = router;

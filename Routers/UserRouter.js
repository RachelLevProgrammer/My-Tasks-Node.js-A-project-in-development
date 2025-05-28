const express = require("express");
const router = express.Router();
const verifyJWT = require("../Middleware/verifyJWT");

const { createUser, deleteUser, getUser, updatedUser } = require("../Controllers/UserController");
const { login, register } = require("../Controllers/authController");

// Routes that require JWT
router.get("/getUser", verifyJWT, getUser);
router.post("/createUser", verifyJWT, createUser);
router.delete("/deleteUser/:name", verifyJWT, deleteUser);
router.put("/updatedUser/:name", verifyJWT, updatedUser);

// Authentication routes - לא דורשים JWT
router.post("/login", login);
router.post("/register", register);

module.exports = router;

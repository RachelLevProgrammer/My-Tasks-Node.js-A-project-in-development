// const express = require("express");
// const router = express.Router();
// const { createUser, updatedUser } = require("../Controllers/UserController");
// const { login, register } = require("../Controllers/authController");

// router.post("/createUser", createUser);
// router.put("/updatedUser/:name", updatedUser);
// router.post("/login", login);
// router.post("/register", register);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { login, register } = require("../Controllers/authController");

router.post("/login", login);
router.post("/register", register);

module.exports = router;

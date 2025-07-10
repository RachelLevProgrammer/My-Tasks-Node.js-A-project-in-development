const express = require("express");
const router = express.Router();
const verifyJWT = require("../Middleware/VerifyJWT");
const taskController = require("../Controllers/TaskController");

router.use(verifyJWT);

router.post("/createTask", taskController.createTask);
router.get("/getTasks", taskController.getTasks);
router.put("/updateTask/:id", taskController.updatedTask);
router.delete("/deleteTask/:id", taskController.deleteTask);
router.get("/getTask/:id", taskController.getTaskById);

module.exports = router;

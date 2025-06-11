const express = require('express');
const router = express.Router();
const verifyJWT = require('../Middleware/VerifyJWT');
const taskController = require('../Controllers/TaskController');

router.use(verifyJWT); // כל הראוטים מחייבים JWT

router.post('/createTask', taskController.createTask);
// router.get('/', taskController.getTask);
router.get('/getTasksByEmail', taskController.getTasksByEmail);
router.put('/updateTask/:id', taskController.updatedTask);
router.delete('/deleteTask/:id', taskController.deleteTask);

module.exports = router;

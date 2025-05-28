const express = require('express');
const router = express.Router();
const verifyJWT = require('../Middleware/verifyJWT');
const taskController = require('../Controllers/TaskController');

router.use(verifyJWT); // כל הראוטים מחייבים JWT

router.post('/createTask', taskController.createTask);
router.get('/', taskController.getTask);
router.get('/getTaskByDate/:date', taskController.getTaskByDate);
router.put('/:id', taskController.updatedTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;

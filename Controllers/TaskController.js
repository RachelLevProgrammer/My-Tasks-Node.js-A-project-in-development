const User = require("../Models/UserModel");
const Task = require("../Models/TasksModel"); // שמור על ייבוא זה רק פעם אחת

const createTask = async (req, res) => {
    const { name, date, startTime, endTime, issueTask, typeTask, wayOfActing, userEmail } = req.body;

    try {
        // חיפוש המשתמש לפי המייל
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const task = new Task({
            name,
            date,
            startTime,
            endTime,
            issueTask,
            typeTask,
            wayOfActing,
            userEmail 
        });

        const savedTask = await task.save();

        // הוספת ה-ID של המשימה למערך ה-calendar של המשתמש
        user.calendar.push(task);
        await user.save(); // שמירה של המשתמש עם המשימה החדשה

        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const result = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!result) return res.status(404).json({ message: 'Task not found or unauthorized' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTaskByDate = async (req, res) => {
    try {
        const tasks = await Task.find({ date: req.params.date, userId: req.user._id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updatedTask = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!updatedTask) return res.status(404).json({ message: 'Task not found or unauthorized' });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { createTask, deleteTask, getTask, updatedTask, getTaskByDate };

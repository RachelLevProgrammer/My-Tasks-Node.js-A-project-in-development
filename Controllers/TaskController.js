const User = require("../Models/UserModel");
const Task = require("../Models/TasksModel");

const createTask = async (req, res) => {
  const {
    name,
    date,
    startTime,
    endTime,
    issueTask,
    typeTask,
    wayOfActing,
    time,
    emoji,
  } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = new Task({
      userId: user._id,
      name,
      date,
      startTime,
      endTime,
      issueTask,
      typeTask,
      wayOfActing,
      time,
      emoji,
    });

    const savedTask = await task.save();

    user.calendar.push(savedTask._id);
    await user.save();

    res.status(201).json({ message: "Task created", newTask: savedTask });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updatedTask = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    date,
    startTime,
    endTime,
    issueTask,
    typeTask,
    wayOfActing,
    time,
    emoji,
  } = req.body;

  try {
    // עדכון רק אם המשימה שייכת למשתמש הנכון:
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      {
        name,
        date,
        startTime,
        endTime,
        issueTask,
        typeTask,
        wayOfActing,
        time,
        emoji,
      },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task updated", newTask: task });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // מחיקת משימה רק אם שייכת למשתמש
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    // להסיר מהיומן של המשתמש
    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { calendar: task._id },
    });

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createTask, updatedTask, deleteTask, getTasks, getTaskById };


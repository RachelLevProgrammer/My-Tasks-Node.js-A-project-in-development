const User = require("../Models/UserModel");
const Task = require("../Models/TasksModel");

const createTask = async (req, res) => {
  const { userEmail,name,date,startTime,endTime,issueTask,typeTask,wayOfActing,time,emoji } = req.body;

  try {
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
      startTime,
      emoji,
      time
    //   userId: user._id, // שים לב לשם החדש
    });

    const savedTask = await task.save();

    user.calendar.push(savedTask);
    await user.save();

    // const updatedTasks = await Task.find({ userId: user._id });

    res.status(201).json({ message: "Task created", newTask: savedTask });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteTask = async (req, res) => {
  const { email } = req.query;
  const { id } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // מחיקת המשימה ממסד הנתונים
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

    // מחיקת הקישור מהיומן של המשתמש
    user.calendar = user.calendar.filter(taskId => taskId.toString() !== id);
    await user.save();

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updatedTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found or unauthorized' });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// בתוך קובץ הבקר שלך, לדוג' controllers/taskController.js
const getTasksByEmail = async (req, res) => {
  const { userEmail } = req.body;

  try {
    const user = await User.findOne({ email: userEmail }).populate('calendar');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const calendarTask = user.calendar;
    if (!calendarTask) return res.status(404).json({ message: 'Tasks not found for this user' });

    res.json(calendarTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTask, getTask, updatedTask, deleteTask,getTasksByEmail };

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("./Models/UserModel"); 
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// MongoDB connection
const mongoConnection = process.env.MONGO_URI;
console.log("MongoDB URI:", mongoConnection);

mongoose
  .connect(mongoConnection)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Your existing routes for tasks, users, etc.
const TaskRouter = require("./Routers/TaskRouter");
const UserRouter = require("./Routers/UserRouter");
app.use("/tasks", TaskRouter);
app.use("/users", UserRouter);

const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

// const { sendTaskEmail } = require('./services/emailService');

// sendTaskEmail('rl56748072@gmail.com', 'בדיקת שליחה', 'בודק אם המייל נשלח תקין');


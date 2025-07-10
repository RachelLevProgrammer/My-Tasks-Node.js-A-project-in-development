const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", // החלף לכתובת של הפרונטנד שלך
  credentials: true, // חשוב להעביר קוקיס
}));

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const TaskRouter = require("./Routers/TaskRouter");
const UserRouter = require("./Routers/UserRouter");


app.use("/tasks", TaskRouter);
app.use("/users", UserRouter);

const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

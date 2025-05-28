const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TaskRouter = require("./Routers/TaskRouter");
const UserRouter = require("./Routers/UserRouter");
const bodyParser = require("body-parser");
const cors = require("cors"); // הוסף את השורה הזו

require('dotenv').config();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // הוסף את ה-Middleware הזה

// MongoDB connection string מה .env
const mongoConnection = process.env.MONGO_URI;

console.log('MongoDB URI:', mongoConnection);

mongoose.connect(mongoConnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// שימוש בראוטרים
app.use("/tasks", TaskRouter);
app.use("/users", UserRouter);

const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

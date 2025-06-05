const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  name: { type: String, required: true, minlength: 2, trim: true },
  date: { type: Date, required: true },
  startTime: {
    type: String,
    required: true,
    match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  },
  endTime: {
    type: String,
    required: true,
    match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  },
  issueTask: { type: String, required: true, minlength: 5, trim: true },
  typeTask: { type: String },
  wayOfActing: { type: String, required: true },
});

module.exports = mongoose.model("Tasks", TaskSchema);



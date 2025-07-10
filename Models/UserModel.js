// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, minlength: 2, trim: true },
//   email: { type: String, required: true, trim: true, unique: true },
//   password: { type: String, required: true, minlength: 4, trim: true },
//   calendar: [{ type: mongoose.Schema.Types.Array, ref: 'Tasks' }] 
// });

// module.exports = mongoose.model("Users", UserSchema);
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 2, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, minlength: 4, trim: true },
  calendar: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }],
});

module.exports = mongoose.model("Users", UserSchema);

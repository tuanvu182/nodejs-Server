const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "user"
  }
});
const Task = mongoose.model("task", userSchema);
module.exports = Task;

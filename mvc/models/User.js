const mongoose = require("mongoose");

//Create the User model
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type:Date,
    default:Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);

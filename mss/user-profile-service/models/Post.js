const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  keywords: [
    {
      type: String,
      required: false,
    },
  ],
  comments: [
    {
      uid: {
        type: String,
        required: true,
      },
      user: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);

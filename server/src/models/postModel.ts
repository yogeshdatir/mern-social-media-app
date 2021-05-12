const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  message: { type: String, required: true, trim: true },
  creator: { type: String, required: true },
  tags: [String],
  selectedFile: { type: String, required: false },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Post", postSchema);

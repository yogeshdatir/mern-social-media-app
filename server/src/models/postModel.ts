const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  message: { type: String, required: true, trim: true },
  name: { type: String },
  creator: { type: String, required: true },
  tags: [String],
  selectedFile: { type: String, required: true },
  selectedFileId: { type: String, required: true },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Post", postSchema);

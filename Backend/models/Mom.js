const mongoose = require("mongoose");

const momSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  momLink: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
});

const Mom = mongoose.model("Mom", momSchema);

module.exports = Mom;

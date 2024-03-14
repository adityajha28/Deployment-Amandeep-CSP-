const mongoose = require("mongoose");

const projectUpdatesSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  generalUpdates: {
    type: String,
    required: true,
  },
});

const ProjectUpdates = mongoose.model("ProjectUpdates", projectUpdatesSchema);

module.exports = ProjectUpdates;

const mongoose = require("mongoose");

const projectOverviewSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  brief: {
    type: String,
    required: true,
  },
  Purpose: {
    type: String,
    required: true,
  },
  Goals: {
    type: String,
    required: true,
  },
  Objectives: {
    type: String,
    required: true,
  },
  Budget: {
    type: Number,
    required: true,
  },
});

const ProjectOverview = mongoose.model("ProjectOverview", projectOverviewSchema);

module.exports = ProjectOverview;

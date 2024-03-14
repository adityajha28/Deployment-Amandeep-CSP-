const mongoose = require("mongoose");

const clientFeedbackSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  feedbackType: {
    type: String,
    required: true,
  },
  dateReceived: {
    type: Date,
    required: true,
  },
  detailedFeedback: {
    type: String,
  },
  actionTaken: {
    type: String,
  },
  closureDate: {
    type: Date,
  },
});

const ClientFeedback = mongoose.model("ClientFeedback", clientFeedbackSchema);

module.exports = ClientFeedback;

const mongoose = require('mongoose');

const approvedTeamSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  phase: {
    type: Number,
    required: true
  },
  numberOfResources: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  availabilityPercentage: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
});

const ApprovedTeam = mongoose.model('ApprovedTeam', approvedTeamSchema);

module.exports = ApprovedTeam;

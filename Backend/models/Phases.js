const mongoose = require('mongoose');

const phasesSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  Title: { type: String,required:true},
  startDate: { type: Date, default: Date.now },
  completionDate: { type: Date, required: true },
  approvalDate: { type: Date, required: true },
  Status: { type: String },
  RevisedDate: { type: Date },
  Comments: { type: String }
});

const Phases = mongoose.model('Phases', phasesSchema);

module.exports = Phases;

const mongoose = require('mongoose');

const versionHistorySchema = new mongoose.Schema({
  version: { type: Number, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  Type:{type:String,required: true},
  change: { type: String, required: true },
  changeReason: { type: String, required: true },
  createdBy: { type: String, required: true },
  revisionDate: { type: Date, default: Date.now },
  approvalDate: { type: Date },
  approvedBy: { type: String }
});

const VersionHistory = mongoose.model('VersionHistory', versionHistorySchema);

module.exports = VersionHistory;

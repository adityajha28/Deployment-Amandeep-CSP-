const mongoose = require('mongoose');

const auditHistorySchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  DateofAudit: { type: Date, default: Date.now },
  reviewedBy: { type: String, required: true },
  status: { type: String, required: true },
  reviewedSection: { type: String, required: true },
  comment: { type: String },
  actionItem: { type: String }
});

const AuditHistory = mongoose.model('AuditHistory', auditHistorySchema);

module.exports = AuditHistory;

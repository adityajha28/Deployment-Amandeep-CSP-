// server/models/Project.js
const mongoose = require('mongoose');

const riskProfileSchema= new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  RiskType: { type: String, required: true },
  Description: { type: String},
  Severity: { type: String,required: true},
  Impact:{type:String, required:true},
  RemedialSteps:{type:String,required:true},
  Status: {type: String},
  closureDate: {type: Date}
}); 

const RiskProfile = mongoose.model('RiskProfile', riskProfileSchema);

module.exports = RiskProfile;

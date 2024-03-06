// server/models/Project.js
const mongoose = require('mongoose');

const sprintSchema= new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  sprint: { type: String, required: true },
  startDate: { type: Date, required: true},
  EndDate: { type: Date,required: true},
  Status:{type:String, required:true},
  Comments:{type:String,required:true}
}); 

const sprintDetails = mongoose.model('sprintDetails', sprintSchema);

module.exports = sprintDetails;

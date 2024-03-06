// server/models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  startDate: { 
    type: Date, 
    default:Date.now, 
    required: true 
  },
  name: { type: String, required: true },
  projectManagerName: { type: String},
  status: { type: String,default:"On Going", required: true},
  clientName:{type:String, required:true},
  clientEmail:{type:String,required:true},
  description: {type: Object},
  totalBudget: {type: String},
  projectMembers: {type: Number}
}); 

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

const mongoose = require('mongoose');

const projectBudgetSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  projectType: { type: String,required:true},
  Duration: { type: Number, required:true },
  budgetHours: { type: Number, required: true }
});

const ProjectBudget = mongoose.model('ProjectBudget', projectBudgetSchema);

module.exports = ProjectBudget;

// server/models/Project.js
const mongoose = require('mongoose');

const ScopeandStackschema= new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  projectStack: { type: String, required: true },
  projectScope: { type: String,required:true}
}); 

const ScopeandStack = mongoose.model('ScopeandStack', ScopeandStackschema);

module.exports = ScopeandStack;

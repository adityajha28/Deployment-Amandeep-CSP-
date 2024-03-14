const mongoose = require('mongoose');

const EscalationMatrixschema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  escalationType:{
    type:String,
    required:true
  },
  escaltionLevel:{
    type:Number,
    required:true
  },
  role:{
    type:String,
    required:true
  }
  
});

const EscalationMatrix = mongoose.model('EscalationMatrix', EscalationMatrixschema);

module.exports = EscalationMatrix;

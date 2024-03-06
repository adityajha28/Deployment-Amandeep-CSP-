const mongoose = require('mongoose');

const stakeHoldersSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  Title: {type: String,required:true},
  Name: {type: String, required: true},
  Contact: { type: String, required: true},
});

const StakeHolders = mongoose.model('StakeHolders', stakeHoldersSchema);

module.exports = StakeHolders;

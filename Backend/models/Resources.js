const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
    },
  resourceName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  comment: {
    type: String
  }
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;

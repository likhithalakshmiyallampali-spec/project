const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Associated job identifier link is mandatory']
  },
  fullName: {
    type: String,
    required: [true, 'Applicant name profile data is mandatory']
  },
  email: {
    type: String,
    required: [true, 'Contact email structure is mandatory'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Valid email formatting must be enforced']
  },
  phone: {
    type: String,
    required: [true, 'Contact phone record is mandatory']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', ApplicationSchema);
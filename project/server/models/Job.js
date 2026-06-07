const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is mandatory']
  },
  company: {
    type: String,
    required: [true, 'Company name is mandatory']
  },
  location: {
    type: String,
    required: [true, 'Job location is mandatory']
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Remote'],
    required: [true, 'Job classification type is mandatory']
  },
  salary: {
    type: Number,
    required: [true, 'Salary quantification is mandatory'],
    min: [0, 'Salary allocation must be a positive numeric value']
  },
  description: {
    type: String,
    required: [true, 'Job description text field is mandatory']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);
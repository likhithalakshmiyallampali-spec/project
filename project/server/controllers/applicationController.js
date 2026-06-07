const Application = require('../models/Application');
const Job = require('../models/Job');

exports.submitApplication = async (req, res) => {
  try {
    const targetJobExists = await Job.findById(req.params.id);
    if (!targetJobExists) {
      return res.status(404).json({ success: false, error: 'Target job allocation point does not exist' });
    }

    const applicationData = {
      jobId: req.params.id,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone
    };

    const newApplication = await Application.create(applicationData);
    res.status(201).json({ success: true, data: newApplication });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getApplicationsByJob = async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
  try {
    const { search, type, sort, page = 1, limit = 6 } = req.query;
    const queryObj = {};

    if (search) {
      queryObj.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    if (type && type !== 'All') {
      queryObj.type = type;
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'salary_asc') sortOption = { salary: 1 };
    if (sort === 'salary_desc') sortOption = { salary: -1 };

    const skipIndex = (parseInt(page) - 1) * parseInt(limit);
    const totalJobs = await Job.countDocuments(queryObj);
    const jobs = await Job.find(queryObj).sort(sortOption).limit(parseInt(limit)).skip(skipIndex);

    res.status(200).json({
      success: true,
      count: jobs.length,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: parseInt(page),
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const newJob = await Job.create(req.body);
    res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedJob) {
      return res.status(404).json({ success: false, error: 'Target record matching provided ID was not discovered' });
    }
    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const targetJob = await Job.findByIdAndDelete(req.params.id);
    if (!targetJob) {
      return res.status(404).json({ success: false, error: 'Target record matching provided ID was not discovered' });
    }
    res.status(200).json({ success: true, message: 'Data record successfully deleted from the portal cluster' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
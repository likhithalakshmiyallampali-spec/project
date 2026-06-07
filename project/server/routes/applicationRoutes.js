const express = require('express');
const router = express.Router();
const { submitApplication, getApplicationsByJob } = require('../controllers/applicationController');

router.route('/:id/apply').post(submitApplication);
router.route('/:id/applications').get(getApplicationsByJob);

module.exports = router;
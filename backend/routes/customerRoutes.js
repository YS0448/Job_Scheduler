const express = require('express');
const router = express.Router();
const { authenticate, authorize}  = require('../middleware/authMiddleware');
const taskController = require('../controllers/customer/taskController')

// Create a new job
router.post('/jobs', authenticate, authorize('customer'), taskController.createJob)
// Get my jobs
router.get('/jobs', authenticate, authorize('customer'), taskController.getJobs)
// Get job by ID
router.get('/job/:id', authenticate, authorize('customer'), taskController.getJobById)
// Update job status
router.post('/run-job/:id', authenticate, authorize('customer'), taskController.runJob)

// Get Dashboard
router.get('/dashboard/customer', authenticate, authorize('customer'), taskController.getDashboard)

module.exports = router
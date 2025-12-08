const express = require("express");
const router = express.Router();
const { executeQuery } = require("../../utils/db/dbUtils");
const { validateCreateJob } = require("../../utils/validation/createTask");
const axios = require("axios");
const { trimArrayValues } = require("../../utils/trimArrayValues");

const createJob = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    let { jobName, priority, description } = req.body;
    // trim
    [jobName, priority, description] = trimArrayValues([jobName, priority, description]);
    // validation
    const errors = validateCreateJob(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: errors });
    }
    
    let paylaod = {
      jobName,
      priority,
      description,
    };    
    paylaod = JSON.stringify(paylaod);

    const status = "pending";
    const insertQuery = `
      INSERT INTO jobs   
      (job_name, priority, description, status, created_by, payload) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [jobName, priority, description, status, userId, paylaod];

    const result = await executeQuery(insertQuery, values);

    res.status(201).json({ message: "Job created successfully" });
  } catch (error) {
    console.error("Error creating job:", error);
    next(error);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    let status = req.query.status || null;
    let priority = req.query.priority || null;
    // trim
    [status, priority] = trimArrayValues([status, priority]);

    let jobsQuery = `
      SELECT job_id, job_name, priority, created_at, status, description, payload
      FROM jobs
      WHERE created_by = ?
    `;

    const params = [userId];

    if (status) {
      jobsQuery += " AND status = ?";
      params.push(status);
    }
    if (priority) {
      jobsQuery += " AND priority = ?";
      params.push(priority);
    }

    jobsQuery += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const jobs = await executeQuery(jobsQuery, params);

    // Total Counts
    let countQuery = "SELECT COUNT(*) AS total FROM jobs WHERE created_by = ?";
    const countParams = [userId];
    if (status) {
      countQuery += " AND status = ?";
      countParams.push(status);
    }
    if (priority) {
      countQuery += " AND priority = ?";
      countParams.push(priority);
    }
    const countResult = await executeQuery(countQuery, countParams);
    const total = countResult[0].total;

    res.status(200).json({
      message: "Jobs fetched successfully",
      data: jobs,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    next(error);
  }
};

const runJob = async (req, res, next) => {
  try {
    const jobId = Number(req.params.id);
    const status = "running";

    if (!jobId) return res.status(400).json({ message: "Job ID is required" });

    // Set status to running
    const updateQuery = "UPDATE jobs SET status = ? WHERE job_id = ?";
    await executeQuery(updateQuery, [status, jobId]);

    // Emit live update: job started
    global.io.emit("runJob:updated", {
      job_id: jobId,
      status: "running",
    });

    // Simulate processing (3s delay)
    setTimeout(async () => {
      const jobsQuery = "SELECT * FROM jobs WHERE job_id = ?";
      const job = await executeQuery(jobsQuery, [jobId]);

      if (!job.length) return;

      // Trigger webhook
      const selectQuery =
        "SELECT job_id, job_name, priority, payload, created_at FROM jobs WHERE job_id = ?";
      const selectData = await executeQuery(selectQuery, [jobId]);

      const payload = {
        jobId: selectData[0].job_id,
        taskName: selectData[0].job_name,
        priority: selectData[0].priority,
        payload: selectData[0].payload,
        completedAt: selectData[0].completed_at,
      };

      const webhookUrl = process.env.WEBHOOK_URL;
      if(!webhookUrl) return res.status(400).json({ message: "Webhook URL is required" });
      try {
        const response = await axios.post(webhookUrl, payload);
        console.log("Webhook sent:", response.status);

        const updateQuery =
          "UPDATE jobs SET status = ? , completed_at = UTC_TIMESTAMP() WHERE job_id = ?";
        await executeQuery(updateQuery, ["Completed", jobId]);

        // Emit live update: job completed
        global.io.emit("runJob:updated", {
          job_id: jobId,
          status: "completed",
        });
        res.status(200).json({ message: "Job completed successfully" });
      } catch (error) {
        console.error("❌ Error in job processing:", error);
        // Set status to pending
        const updateQuery =
          "UPDATE jobs SET status = ? WHERE job_id = ?";
        await executeQuery(updateQuery, ["pending", jobId]);

        global.io.emit("runJob:updated", {
          job_id: jobId,
          status: "pending",
          error: "Webhook failed",
        });
        next(error);
      }
    }, 3000);
  } catch (error) {
    console.error("Error running job:", error);
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const jobId = Number(req.params.id);
    if (!jobId) return res.status(400).json({ message: "Job ID is required" });

    const selectQuery =
      "SELECT job_id, job_name, priority, payload, created_at, description, completed_at, status FROM jobs WHERE job_id = ? AND created_by = ?";
    const job = await executeQuery(selectQuery, [jobId, userId]);
    res.status(200).json({ data: job, message: "Job fetched successfully" });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    next(error);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    // Summary of job counts
    const summaryQuery = `
      SELECT 
        COUNT(*) AS total_jobs,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_jobs,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_jobs
      FROM jobs
      WHERE created_by = ?
    `;
    const summary = await executeQuery(summaryQuery, [userId]);

    // Recent jobs list
    const recentJobsQuery = `
      SELECT 
        job_id, job_name, priority, created_at, status, description
      FROM jobs
      WHERE created_by = ?
      ORDER BY created_at DESC
      LIMIT 5
    `;
    const recentJobs = await executeQuery(recentJobsQuery, [userId]);

    res.status(200).json({
      data: {
        summary: summary[0],
        recentJobs,
      },
      message: "Dashboard data fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    next(error);
  }
};

module.exports = {
  createJob,
  getJobs,
  runJob,
  getJobById,
  getDashboard,
};

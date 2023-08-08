const Job = require("../models/jobModel");

// Create a job posting
const createJob = async (req, res) => {
  try {
    const { title, description, files, skills, budget, schedule } = req.body;
    const userId = req.user._id; // Extracted from JWT token

    const job = new Job({
      userId,
      title,
      description,
      files,
      budget,
      schedule,
      skills,
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: "Error creating job posting" });
  }
};

// Get all job postings
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job postings" });
  }
};

module.exports = {
  createJob,
  getAllJobs,
};

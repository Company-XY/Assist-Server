const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");

const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const createJobs = asyncHandler(async (req, res) => {
  //will add code to ensure only auth'ed clients can post jobs
  try {
    const { title, description, budget, schedule, skills } = req.body;
    const newJob = await Job.create({
      title,
      description,
      budget,
      schedule,
      skills,
    });
    res.status(201).json(newJob);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
});

const getOneJob = asyncHandler(async (req, res) => {
  try {
    const oneJob = await Job.findById({ _id: req.params.id });
    res.status(200).json(oneJob);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const updateJob = asyncHandler(async (req, res) => {
  try {
    //Route not complete
    const oneJob = await Job.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json(oneJob);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const deleteJob = asyncHandler(async (req, res) => {
  try {
    const oneJob = await Job.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("Deleted Successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = { getJobs, createJobs, getOneJob, deleteJob, updateJob };

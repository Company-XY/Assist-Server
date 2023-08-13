const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");

const getAllJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getUserJobs = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const jobs = await Job.find({ user: userId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const createJobs = asyncHandler(async (req, res) => {
  try {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);

    if (!user || !user.email) {
      return res.status(400).json({ message: "User email not found." });
      
    } else {

      const { title, description } = req.body;

      const newJob = await Job.create({
        user_email: user.email,
        title,
        description,
      });
      res.status(201).json(newJob);
    }
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

module.exports = {
  getAllJobs,
  getUserJobs,
  createJobs,
  getOneJob,
  deleteJob,
  updateJob,
};

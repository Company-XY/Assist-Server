const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getUserJobs,
  createJob,
  getOneJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middlewares/jobMiddleware");

// Routes for handling all jobs
router.route("/jobs").get(getAllJobs).post(protect, createJob);

// Routes for handling individual job
router
  .route("/jobs/:id")
  .get(getOneJob)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

// Route for fetching user-specific jobs
router.get("/user-jobs", protect, getUserJobs);

module.exports = router;

const express = require("express");
const {
  getAllJobs,
  getUserJobs,
  createJobs,
  getOneJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middlewares/jobMiddleware");

const router = express.Router();
// Routes for handling all jobs
router.route("/jobs").get(protect, getAllJobs).post(protect, createJobs);

// Routes for handling individual job
router
  .route("/jobs/:id")
  .get(protect, getOneJob)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

// Route for fetching user-specific jobs
router.get("/user-jobs/:userEmail", protect, getUserJobs);

module.exports = router;

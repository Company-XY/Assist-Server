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
const { uploadFiles } = require("../controllers/uploadController");

const router = express.Router();

// Routes for handling all jobs
router.route("/jobs").get(getAllJobs).post(protect, uploadFiles, createJobs);

// Routes for handling individual job
router
  .route("/jobs/:id")
  .get(protect, getOneJob)
  .put(protect, uploadFiles, updateJob);

router.delete("/jobs/:id", protect, deleteJob);

// Route for fetching user-specific jobs
router.get("/user-jobs/:userEmail", protect, getUserJobs);

module.exports = router;

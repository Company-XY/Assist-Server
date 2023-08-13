const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getUserJobs,
  createJobs,
  getOneJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middlewares/jobMiddleware");

router.route("/jobs").get(protect, getAllJobs).post(protect, createJobs);
router
  .route("/jobs/:id")
  .get(protect, getOneJob)
  .get(protect, getUserJobs)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

module.exports = router;

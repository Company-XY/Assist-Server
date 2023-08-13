const express = require("express");
const router = express.Router();
const {
  getJobs,
  createJobs,
  getOneJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middlewares/jobMiddleware");

router.route("/jobs").get(protect, getJobs).post(protect, createJobs);
router
  .route("/jobs/:id")
  .get(protect, getOneJob)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

module.exports = router;

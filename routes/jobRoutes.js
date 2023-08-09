const express = require("express");
const router = express.Router();
const {
  getJobs,
  createJobs,
  getOneJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
//const { protect } = require("../middlewares/authMiddleware");

//router.route("/jobs").get(protect, jobController.getAllJobs).post(protect, jobController.createJob);

router.route("/jobs").get(getJobs).post(createJobs);
router.route("/jobs/:id").get(getOneJob).put(updateJob).delete(deleteJob);

module.exports = router;

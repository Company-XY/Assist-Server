const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { protect } = require("../middlewares/authMiddleware");

router
  .route("/jobs")
  .get(protect, jobController.getAllJobs)
  .post(protect, jobController.createJob);

module.exports = router;

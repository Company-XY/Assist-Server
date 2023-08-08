const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jobController = require("../controllers/jobController");
//const verifyToken = require("../middlewares/verifyToken");
const { protect } = require("../middlewares/authMiddleware");

// Create a job posting
//router.post("/", verifyToken, jobController.createJob);
// Get all job postings
//router.get("/", jobController.getAllJobs);

router
  .route("/")
  .get( jobController.getAllJobs)
  .post( jobController.createJob);

module.exports = router;

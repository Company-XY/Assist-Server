const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfile,
} = require("../controllers/profileController");

router.post("/profile/:id", createProfile);

router.get("/profile/:id", getProfile);

module.exports = router;

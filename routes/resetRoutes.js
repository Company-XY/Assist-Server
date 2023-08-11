const express = require("express");
const {
  resetPassword,
  sentResetLink,
} = require("../controllers/resetPasswordController");

const router = express.Router();

router.post("/", sentResetLink);
router.post("/password", resetPassword);

module.exports = router;

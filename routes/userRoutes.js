const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  home,
  getAll,
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", home);
router.get("/users", getAll);
router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;

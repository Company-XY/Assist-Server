const express = require("express");
//const { protect } = require("../middlewares/authMiddleware");
const {
  home,
  getAll,
  authUser,
  //registerUser,
  registerClient,
  registerFreelancer,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", home);
router.get("/users", getAll);
//router.post("/register", registerUser);
router.post("/register/client", registerClient);
router.post("/register/freelancer", registerFreelancer);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/profile/:id").get(getUserProfile).patch(updateUserProfile);

module.exports = router;

const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const asyncHandler = require("express-async-handler");

const createProfile = asyncHandler(async (req, res) => {
  try {
    //const { userId } = req.params;
    const { phone, location } = req.body;

    // Check if the user exists
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Create a new profile linked to the user
    const profile = new Profile({
      user: user._id,
      phone: phone,
      location: location,
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.json({ message: error.message });
  }
});

const getProfile = asyncHandler(async (req, res) => {
  try {
    const profileId = req.params.id; // Get the profileId from the URL parameter
    const profile = await Profile.findById(profileId).populate("user");

    if (!profile) {
      res.status(404).json("Profile not found");
    } else {
      res.status(200).json(profile);
      console.log(profile);
    }
  } catch (error) {
    res.json({ Message: error.message });
  }
});

module.exports = { getProfile, createProfile };

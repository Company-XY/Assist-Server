const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//@desc Auth user and get token
//@route POST ../api/v1/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id); // Generate a new token

    res.json({
      _id: user.id,
      role: user.role,
      token: token, // Include the generated token
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@desc Register new user
//@route POST ..api/v1/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { role, type, email, name, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Password validation using regular expression
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 8 characters long and include at least one letter, one number, and one special character.",
        });
    }

    const user = await User.create({
      role,
      type,
      name,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id);

      res.status(201).json({
        _id: user._id,
        role: user.role,
        type: user.type,
        name: user.name,
        email: user.email,
        token, // Include the token in the response
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//@desc Logout user
//@Route ../api/v1/logout
//@acess Public

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out Successfully" });
};

//@desc get User profile
//@Route ../api/v1/profile/:id
//@Access private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.params.id });

  if (user) {
    res.json({
      _id: user._id,
      role: user.role,
      type: user.type,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      experience: user.experience,
      skills: user.skills,
      schedule: user.schedule,
      tasks: user.tasks,
      hours: user.hours,
      portfolio: user.portfolio,
      sample_work: user.sample_work,
      payment_method: user.payment_method,
      payment_rate: user.payment_rate,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc update user profile
//@route ../api/v1/profile/:id
//@access private

const updateUserProfile2 = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc update user profile
//@route ../api/v1/profile/:id
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      experience,
      skills,
      schedule,
      tasks,
      hours,
      portfolio,
      sample_work,
      payment_method,
      payment_rate,
    } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        email,
        phone,
        location,
        experience,
        skills,
        schedule,
        tasks,
        hours,
        portfolio,
        sample_work,
        payment_method,
        payment_rate,
      }
    );
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//homepage
//@desc update user profile
//@route ../api/v1
//@access public
const home = (req, res) => {
  try {
    res.status(200).json("API is Working");
  } catch (error) {
    res.status(400);
    console.log({ message: error.message });
  }
};

//get all user
//@desc update user profile
//@route ../api/v1
//@access private
const getAll = async (req, res) => {
  //jwt should be decded to ensure user is authenticated befre viewing all users
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log({ message: error.message });
  }
};

module.exports = {
  home,
  getAll,
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};

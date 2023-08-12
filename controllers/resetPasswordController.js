const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const User = require("../models/userModel");

const ELASTIC_EMAIL_API_KEY = process.env.ELASTIC_EMAIL_API_KEY;

const sentResetLink = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a reset token and expiration time
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiration = Date.now() + 3600000; // 1 hour

    // Update user's reset token and expiration time in the database
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    // Send reset password email using Elastic Email API
    const resetLink = `https://assistafricatest.netlify.app/reset/password/${resetToken}`;
    const data = {
      from: "oloogeorge633@gmail.com",
      to: email,
      subject: "Password Reset",
      bodyText: `Click the link to reset your password: ${resetLink}`,
      apiKey: ELASTIC_EMAIL_API_KEY,
    };

    const response = await axios({
      method: "post",
      url: "https://api.elasticemail.com/v2/email/send",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.data.success) {
      res
        .status(200)
        .json({ message: "Password reset link sent successfully." });
    } else {
      res.status(500).json({ message: "Failed to send reset link." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetToken: resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token." });
    }

    // Update user's password and reset token fields
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
});

module.exports = { resetPassword, sentResetLink };
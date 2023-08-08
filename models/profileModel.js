const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    phone: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    skills: {
      type: Array,
      requried: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
    hours: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
    },
    sample_work: {
      type: File,
    },
    payment_method: {
      type: String,
      required: true,
    },
    payment_rate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;

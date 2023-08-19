const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    files: {
      type: [String], // Change to an array of strings
      validate: {
        validator: (files) => files.length <= 10, // Validate maximum 10 files
        message: "Maximum of 10 files allowed.",
      },
    },
    skills: {
      type: [String], //Array of strings
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;

const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    files: {
      type: String,
    },
    skills: {
      type: Array,
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

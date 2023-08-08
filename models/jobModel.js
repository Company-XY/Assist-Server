const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
      //required: true,
    },
    budget: {
      type: Number,
      //required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;

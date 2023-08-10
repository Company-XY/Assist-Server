const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["Client", "Freelancer"],
      required: true,
    },
    type: {
      type: String,
      enum: ["Individual", "Business"],
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      //required: true,
    },
    experience: {
      type: Number,
      //required: true,
    },
    skills: {
      type: Array,
      //requried: true,
    },
    schedule: {
      type: String,
      //required: true,
    },
    tasks: {
      type: Array,
      //required: true,
    },
    hours: {
      type: String,
      //required: true,
    },
    portfolio: {
      type: String,
    },
    sample_work: {
      type: String,
    },
    payment_method: {
      type: String,
      //required: true,
    },
    payment_rate: {
      type: String,
      //required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;

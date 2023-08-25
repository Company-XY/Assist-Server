const mongoose = require("mongoose");
const validator = require("validator");

const consultationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 10,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, "any", { strictMode: true });
      },
      message: "Invalid phone number format",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Invalid email format",
    },
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isDate(value);
      },
      message: "Invalid date format",
    },
  },
  time: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // You can add more specific time validation here if needed
        return /^[0-9]{2}:[0-9]{2}$/.test(value);
      },
      message: "Invalid time format",
    },
  },
  date_2: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isDate(value);
      },
      message: "Invalid date format",
    },
  },
  time_2: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // You can add more specific time validation here if needed
        return /^[0-9]{2}:[0-9]{2}$/.test(value);
      },
      message: "Invalid time 2 format",
    },
  },
  services: {
    type: String,
    required: true,
    minLength: 50,
  },
  promotionalServices: {
    type: Boolean,
    default: true,
  },
});

const Consultation = mongoose.model("Consultation", consultationSchema);

module.exports = Consultation;

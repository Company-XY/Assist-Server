const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

mongoose
  .connect(URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Mongo DB Connected and Server running on Port ${PORT}`)
    );
  })
  .catch((error) => console.log({ message: error.message }));

app.use("/api/v1", userRoutes);
app.use("/api/v1/jobs", jobRoutes);

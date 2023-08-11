const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const resetRoutes = require("./routes/resetRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

mongoose
  .connect(URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Mongo DB Connected Successfully & Server running on Port ${PORT}`
      )
    );
  })
  .catch((error) => console.log({ message: error.message }));

app.use("/api/v1", userRoutes);
app.use("/api/v1", jobRoutes);
app.use("/api/v1/reset", resetRoutes);

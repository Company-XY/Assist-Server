const multer = require("multer");
const path = require("path");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create a Multer instance with configured storage
const upload = multer({ storage: storage });

// Upload middleware
const uploadFiles = upload.array("files", 10);

module.exports = {
  uploadFiles,
};

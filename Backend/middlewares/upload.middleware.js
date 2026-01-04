const multer = require("multer");
const { v4: uuid } = require("uuid");

const allowedTypes = ["video/mp4", "video/webm", "video/mkv"];

const storage = multer.diskStorage({
  destination: "uploads/videos",
  filename: (req, file, cb) => {
    cb(null, `${uuid()}-${file.originalname}`);
  },
});

module.exports = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Invalid file type"));
    } else {
      cb(null, true);
    }
  },
});

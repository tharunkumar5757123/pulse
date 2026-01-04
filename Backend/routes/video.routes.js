const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const upload = require("../middlewares/uploadToCloudinary");
const { uploadVideo, stream, getVideos } = require("../controllers/video.controller");

// Upload video (editor/admin only)
router.post("/upload", auth, role(["editor", "admin"]), upload.single("video"), uploadVideo);

// Get video URL for playback
router.get("/stream/:id", auth, stream);

// Get all videos
router.get("/", auth, getVideos);

module.exports = router;

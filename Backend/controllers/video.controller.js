const Video = require("../models/Video");
const processVideoService = require("../services/videoProcessing.service");
const { emitProgress } = require("../sockets/socket");

// ------------------- UPLOAD VIDEO -------------------
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const video = await Video.create({
      userId: req.user.id,
      filename: req.file.originalname,
      url: req.file.path, // Cloudinary URL
      progress: 0,
      status: "processing",
    });

    // Process video (optional: Cloudinary video processing) + emit progress
    processVideoService(video, req.user.id);

    res.status(201).json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Video upload failed" });
  }
};


// ------------------- GET ALL VIDEOS -------------------
exports.getVideos = async (req, res) => {
  try {
    const { status, sort, page = 1, limit = 20 } = req.query;

    // No userId filter → all users see all videos
    const filter = {};
    if (status && ["processing", "safe", "flagged"].includes(status)) {
      filter.status = status;
    }

    let query = Video.find(filter);

    if (sort === "latest") query = query.sort({ createdAt: -1 });
    if (sort === "oldest") query = query.sort({ createdAt: 1 });

    const videos = await query.skip((page - 1) * limit).limit(parseInt(limit));
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};

// ------------------- STREAM VIDEO -------------------
exports.stream = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // All users can stream now
    res.json({ url: video.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching video URL" });
  }
};



const Video = require("../models/Video");
const { emitProgress } = require("../sockets/socket");

const processVideo = async (video) => {
  video.status = "processing";
  video.progress = 0;
  await video.save();

  for (let i = 10; i <= 100; i += 10) {
    await new Promise(r => setTimeout(r, 500));
    video.progress = i;
    await video.save();
    emitProgress(video.userId, { videoId: video._id, progress: i });
  }

  video.status = Math.random() > 0.7 ? "flagged" : "safe";
  await video.save();
};

module.exports = processVideo;

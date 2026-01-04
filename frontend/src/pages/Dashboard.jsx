import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import socket from "../socket/socket";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [videos, setVideos] = useState([]);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    // Fetch all videos
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchVideos();

    // Listen to progress updates
    socket.on(`progress-${userId}`, (data) => {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === data.videoId
            ? { ...v, progress: data.progress, status: data.status }
            : v
        )
      );
    });

    // Listen for newly uploaded videos
    socket.on("new-video", (video) => {
      setVideos((prev) => [video, ...prev]);
    });

    return () => {
      socket.off(`progress-${userId}`);
      socket.off("new-video");
    };
  }, [userId]);

  if (videos.length === 0) {
    return (
      <div className="container mt-5 text-center">
        No videos uploaded yet.
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Videos</h2>

      <div className="row">
        {videos.map((v) => (
          <div className="col-md-6 mb-3" key={v._id}>
            <div className="card shadow">
              <div className="card-body">
                <h5 className="mb-2">{v.filename}</h5>

                {/* Status badge */}
                <span
                  className={`badge ${
                    v.status === "safe"
                      ? "bg-success"
                      : v.status === "flagged"
                      ? "bg-danger"
                      : "bg-warning"
                  }`}
                >
                  {v.status || "pending"}
                </span>

                {/* Progress bar */}
                <div className="progress mt-2">
                  <div
                    className="progress-bar"
                    style={{ width: `${v.progress || 0}%` }}
                  >
                    {v.progress || 0}%
                  </div>
                </div>

                {/* Video: all users can play */}
                {v.url && (
                  <video
                    className="mt-3 w-100 rounded"
                    controls
                    src={v.url}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

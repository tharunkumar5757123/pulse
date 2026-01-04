import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const uploadVideo = async () => {
    if (!file) {
      setError("Please select a video to upload");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      setLoading(true);
      const res = await axios.post("/videos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Video uploaded successfully!");
      setFile(null);
      navigate("/dashboard"); // go back to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h4 className="mb-3 text-center">Upload Video</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <input
          type="file"
          accept="video/*"
          className="form-control mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="btn btn-primary w-100"
          onClick={uploadVideo}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}

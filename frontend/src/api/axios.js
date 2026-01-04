import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://pulse-backend-u4cm.onrender.com/api",
  headers: {
    "Content-Type": "application/json", // ensure JSON is sent
  },
});

// Add token to requests (if available)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;

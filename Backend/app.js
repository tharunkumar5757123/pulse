const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./utils/logger");

const authRoutes = require("./routes/auth.routes");
const videoRoutes = require("./routes/video.routes");
const userRoutes = require("./routes/user.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// Logging
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/users", userRoutes);

// Error handler (must be last)
app.use(errorMiddleware);

module.exports = app;

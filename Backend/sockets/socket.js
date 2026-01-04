let io;

const initSocket = (server) => {
  io = require("socket.io")(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

/**
 * Emit progress to a specific user
 * @param {string} userId - User ID
 * @param {Object} data - Progress data { videoId, progress }
 */
const emitProgress = (userId, data) => {
  if (!io) {
    console.error("Socket.io not initialized");
    return;
  }

  // emit to all sockets (simple version)
  io.emit(`progress-${userId}`, data);
};

module.exports = { initSocket, emitProgress };

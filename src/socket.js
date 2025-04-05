import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  //joining room
  socket.on("join-room", (roomId) => {
    console.log(`User ${socket.id} has joined ${roomId}`);
    socket.join(roomId);
  });

  //leaving room
  socket.on("leave-room", (roomId) => {
    console.log(`User ${socket.id} has left ${roomId}`);
    socket.leave(roomId);
  });

  //broadcast code changes
  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("receive-code", code);
  });

  // handle question changes
  socket.on("question-change", ({ roomId, questionId, code }) => {
    console.log(`User ${socket.id} changed question to ${questionId} in room ${roomId}`);
    socket.to(roomId).emit("question-changed", { questionId, code });
  });

  // handle language changes
  socket.on("language-change", ({ roomId, languageId, code }) => {
    console.log(`User ${socket.id} changed language to ${languageId} in room ${roomId}`);
    socket.to(roomId).emit("language-changed", { languageId, code });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

export default server;

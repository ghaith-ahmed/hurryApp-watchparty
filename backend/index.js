const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectDB");
const userRoutes = require("./routes/userRoutes.js");
const videoRoutes = require("./routes/videoRoutes.js");
const partyRoutes = require("./routes/partyRoutes.js");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(bodyParser({ limit: "50mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/party", partyRoutes);

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  socket.on("joined", (partyId, userId) => {
    socket.join(partyId);
    io.to(partyId).emit("joined", partyId, userId);
  });
  socket.on("leaved", (partyId, userId) => {
    io.to(partyId).emit("leaved", partyId, userId);
  });
  socket.on("paused", (partyId) => {
    io.to(partyId).emit("paused", partyId);
  });
  socket.on("play", (partyId) => {
    io.to(partyId).emit("play", partyId);
  });
  socket.on("timeline", (partyId, userId, currentTime, isPaused) => {
    io.to(partyId).emit("timeline", partyId, userId, currentTime, isPaused);
  });
  socket.on("message-sent", (message) => {
    io.to(message.partyId).emit("message-sent", message);
  });
});

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
